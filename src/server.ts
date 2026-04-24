import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import compression from 'compression';
import fs from 'node:fs';
// import helmet from 'helmet';
import { environment } from './environments/environment';

const browserDistFolder = join(
  dirname(fileURLToPath(import.meta.url)),
  '../browser',
);

const app = express();

// Essential for Cloudflare / Proxy deployments
app.set('trust proxy', true);

// Fix for SSRF protection on localhost
const angularApp = new AngularNodeAppEngine({
  allowedHosts: ['localhost', '127.0.0.1', 'janesser.net', 'www.janesser.net']
});

const LOGO_URL = 'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/esser-web-engineering-logo-text-cropped-transparent.webp';

app.use(compression());
app.disable('x-powered-by');

const locales = ['de', 'en'];
const defaultLocale = 'de';

/**
 * Middleware to detect locale from the URL or browser settings
 */
app.use((req, res, next) => {
  const urlParts = req.url.split('/');
  // 1. Try to detect from URL
  let locale = locales.find((l) => l === urlParts[1]);

  // 2. If no URL locale, try to detect from Accept-Language header
  if (!locale) {
    const acceptLanguage = req.headers['accept-language'] || '';
    const preferredLocales = acceptLanguage
      .split(',')
      .map((l) => l.split(';')[0].trim());

    for (const pref of preferredLocales) {
      const match = locales.find(
        (supported) =>
          supported.toLowerCase() === pref.toLowerCase() ||
          supported.split('-')[0].toLowerCase() === pref.toLowerCase(),
      );
      if (match) {
        locale = match;
        break;
      }
    }
  }

  (req as any).locale = locale || defaultLocale;
  
  // Performance: Preload critical assets
  res.setHeader('Link', `<${LOGO_URL}>; rel=preload; as=image; fetchpriority=high`);
  
  next();
});

/**
 * Trailing Slash Enforcer for Locales (Production only)
 */
app.use((req, res, next) => {
  if (req.get('host')?.includes('localhost')) {
    return next();
  }

  const [path, query] = req.url.split('?');
  if (locales.includes(path.substring(1)) && !path.endsWith('/')) {
    const redirectUrl = `${path}/${query ? '?' + query : ''}`;
    return res.redirect(301, redirectUrl);
  }
  next();
});

/**
 * SEO & Redirection Middleware for Root (Production only)
 */
app.get('/', (req, res, next) => {
  if (req.get('host')?.includes('localhost')) {
    return next();
  }

  const locale = (req as any).locale || defaultLocale;
  const queryString = req.url.split('?')[1];
  const redirectUrl = `/${locale}/${queryString ? '?' + queryString : ''}`;
  return res.redirect(302, redirectUrl);
});

/**
 * Serve static SEO files from root (mapping to default locale)
 */
['robots.txt', 'sitemap.xml', 'sitemap.txt'].forEach((file) => {
  app.get(`/${file}`, (req, res) => {
    const filePath = join(browserDistFolder, defaultLocale, file);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).end();
    }
  });
});

app.get('/favicon.ico', (req, res) => {
  const filePath = join(browserDistFolder, defaultLocale, 'assets', 'favicon.ico');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).end();
  }
});

/**
 * Handle Service Worker files
 */
app.get('/ngsw-worker.js', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.sendFile(join(browserDistFolder, defaultLocale, 'ngsw-worker.js'));
});

app.get('/ngsw.json', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.sendFile(join(browserDistFolder, defaultLocale, 'ngsw.json'));
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Guard for malformed URIs
 */
app.use((req, res, next) => {
  try {
    decodeURIComponent(req.originalUrl);
    next();
  } catch (e) {
    if (e instanceof URIError) {
      res.status(400).send('Bad Request: Malformed URI');
    } else {
      next(e);
    }
  }
});

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => {
      if (response) {
        return writeResponseToNodeResponse(response, res);
      }
      return next();
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * Fallback 404 Handler
 */
app.use((req, res) => {
  res.status(404).send(`Seite nicht gefunden: ${req.url}`);
});

/**
 * Start the server
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler for Angular CLI
 */
export const reqHandler = createNodeRequestHandler(app);
