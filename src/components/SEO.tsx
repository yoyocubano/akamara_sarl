import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from "react-i18next";

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    keywords?: string[] | string;
    schema?: any; // Add support for JSON-LD schema
}

/**
 * SEO Component based on best practices.
 * Handles standard meta tags, Open Graph (Facebook/WhatsApp), and Twitter cards.
 */
export const SEO: React.FC<SEOProps> = ({
    title,
    description,
    image,
    url,
    type = 'website',
    keywords,
    schema
}) => {
    const { t, i18n } = useTranslation();
    const siteTitle = 'Akamara S.U.R.L.';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const metaDescription = description || t('hero.description') || 'Innovación y Tecnología en Cuba.';
    const metaImage = image || 'https://akamara.cu/og-image-default.jpg'; // Placeholder url
    const metaUrl = url || 'https://akamara.cu';
    const currentLang = i18n.language || 'es';

    // Map i18next language to Open Graph locale format
    const localeMap: Record<string, string> = {
        'en': 'en_US',
        'es': 'es_ES',
    };
    const ogLocale = localeMap[currentLang] || 'es_ES';

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            {keywords && (
                <meta
                    name="keywords"
                    content={Array.isArray(keywords) ? keywords.join(', ') : keywords}
                />
            )}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#d97706" /> {/* Amber-600 approx */}

            {/* Open Graph / Facebook / WhatsApp */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:locale" content={ogLocale} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />

            {/* Canonical */}
            <link rel="canonical" href={metaUrl} />

            {/* JSON-LD Schema Rendering */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};
