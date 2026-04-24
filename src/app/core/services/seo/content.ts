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
      title: 'Esser Web Engineering | Senior Angular Architekt',
      description:
        'Senior Angular Architekt & Web Engineering. Spezialisiert auf den Aufbau skalierbarer Enterprise-Anwendungen, die Optimierung von Performance-Engpässen und die Lieferung hochkarätiger Angular-Lösungen.',
      imageUrl:
        'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/esser-web-engineering-logo-text-og-moz.jpg',
      type: 'website',
    },
    en: {
      title: 'Esser Web Engineering | Senior Angular Architect',
      description:
        'Senior Angular Architect & Web Engineering. Specialized in building scalable enterprise applications, optimizing performance bottlenecks, and delivering high-quality Angular solutions.',
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
