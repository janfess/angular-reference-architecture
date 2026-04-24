export interface PageSeoContent {
  title: string;
  description: string;
  imageUrl: string;
  type: string;
}

const seoContent: {
  [key: string]: { de: PageSeoContent; en: PageSeoContent };
} = {
  '/': {
    de: {
      title: 'Esser Web Engineering | Freelance Senior Angular Architekt',
      description:
        'Freelance Senior Angular Architekt. Spezialisiert auf High-Performance Architekturen und die Rettung komplexer Legacy-Codebases. ROI-fokussierte technische Exzellenz für Enterprise-Projekte.',
      imageUrl:
        'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/esser-web-engineering-logo-text-og-moz.jpg',
      type: 'website',
    },
    en: {
      title: 'Esser Web Engineering | Freelance Senior Angular Architect',
      description:
        'Freelance Senior Angular Architect. Specialized in high-performance architectures and rescuing complex legacy codebases. ROI-focused technical excellence for enterprise projects.',
      imageUrl:
        'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/esser-web-engineering-logo-text-og-moz.jpg',
      type: 'website',
    },
  },
  '/inquiry': {
    de: {
      title: 'Projektanfrage | Esser Web Engineering',
      description:
        'Fragen Sie jetzt Ihr Angular-Projekt an. Spezialisierte Beratung und Entwicklung für skalierbare Enterprise-Lösungen.',
      imageUrl:
        'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/esser-web-engineering-logo-text-og-moz.jpg',
      type: 'website',
    },
    en: {
      title: 'Project Inquiry | Esser Web Engineering',
      description:
        'Request your Angular project now. Specialized consulting and development for scalable enterprise solutions.',
      imageUrl:
        'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/esser-web-engineering-logo-text-og-moz.jpg',
      type: 'website',
    },
  },
  '/impressum': {
    de: {
      title: 'Impressum | Esser Web Engineering',
      description:
        'Gesetzliche Anbieterkennzeichnung und rechtliche Hinweise für Esser Web Engineering.',
      imageUrl:
        'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/esser-web-engineering-logo-text-og-moz.jpg',
      type: 'website',
    },
    en: {
      title: 'Imprint | Esser Web Engineering',
      description:
        'Legal provider identification and legal notices for Esser Web Engineering.',
      imageUrl:
        'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/esser-web-engineering-logo-text-og-moz.jpg',
      type: 'website',
    },
  },
};

export { seoContent };
