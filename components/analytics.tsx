'use client';

import Script from 'next/script';

export function Analytics() {
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    if (!GA_MEASUREMENT_ID) {
        console.warn('Google Analytics Measurement ID is not set');
        return null;
    }

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}');
                    `
                }}
            />
        </>
    );
} 