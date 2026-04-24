import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import compression from 'compression';
import helmet from 'helmet';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BROWSER_DIST = resolve(__dirname, 'dist/personal-website/browser');

const app = express();

// Trust proxy for production environments (Cloudflare, Nginx, etc.)
app.set('trust proxy', true);

// 1. Enable Gzip compression
app.use(compression());

// 2. Security headers via Helmet
app.use(helmet({
  contentSecurityPolicy: false,
  frameguard: { action: 'deny' }
}));

// 3. Security: Prevent content sniffing
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

// Serve static assets with aggressive caching
app.use(express.static(BROWSER_DIST, {
  maxAge: '1y',
  index: false,
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    }
  }
}));

// Serve localized index files using Regex for maximum compatibility
const serveIndex = (lang) => (req, res) => {
  res.sendFile(join(BROWSER_DIST, lang, 'index.html'));
};

app.get(/^\/de/, serveIndex('de'));
app.get(/^\/en/, serveIndex('en'));

// Root redirect based on language preference
app.get('/', (req, res) => {
  const lang = req.acceptsLanguages('de', 'en') || 'de';
  res.redirect(`/${lang}`);
});

// Fallback for any other routes (default to DE index)
app.get(/.*/, (req, res) => {
  res.status(404).sendFile(join(BROWSER_DIST, 'de/index.html'));
});

const port = process.env['PORT'] || 4200;
app.listen(port, () => {
  console.log(`Static server listening on http://localhost:${port}`);
});
