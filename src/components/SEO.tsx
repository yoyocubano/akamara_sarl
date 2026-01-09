
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../contexts/ConfigContext';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

export const SEO = ({ title, description, image, url }: SEOProps) => {
    const { t, i18n } = useTranslation();
    const { config } = useConfig();

    const siteTitle = (title ? `${title} | ${config.site_title}` : (config.site_title || 'Akamara S.U.R.L.')) as string;
    const siteDesc = (description || t('hero.desc') || 'Ecosistema de servicios integrales en Cuba.') as string;
    const siteUrl = (url || 'https://akamara-surl.pages.dev') as string;
    const siteImage = (image || 'https://akamara-surl.pages.dev/og-image.jpg') as string;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{siteTitle}</title>
            <meta name="description" content={siteDesc} />
            <meta name="keywords" content="Cuba, SURL, Negocios, Mobiliario, Construcción, Logística, Akamara, La Habana" />
            <meta name="author" content="Akamara S.U.R.L." />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="Content-Language" content={i18n.language} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="business.business" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={siteDesc} />
            <meta property="og:image" content={siteImage} />
            <meta property="og:site_name" content="Akamara S.U.R.L." />
            <meta property="og:locale" content={i18n.language === 'es' ? 'es_ES' : 'en_US'} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={siteDesc} />
            <meta name="twitter:image" content={siteImage} />

            {/* Security & PWA */}
            <meta name="theme-color" content="#0f172a" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        </Helmet>
    );
};
