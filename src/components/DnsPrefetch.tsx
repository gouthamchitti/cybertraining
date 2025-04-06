import React from 'react';
import Head from 'next/head';

interface DnsPrefetchProps {
  domains?: string[];
}

/**
 * Component to add DNS prefetch and preconnect hints for faster loading
 */
const DnsPrefetch: React.FC<DnsPrefetchProps> = ({ 
  domains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'www.googletagmanager.com',
    'www.google-analytics.com',
    'cdn.jsdelivr.net',
    'api.cybertrainer.in'
  ] 
}) => {
  return (
    <Head>
      {/* DNS Prefetch */}
      {domains.map(domain => (
        <link key={`dns-prefetch-${domain}`} rel="dns-prefetch" href={`//${domain}`} />
      ))}
      
      {/* Preconnect */}
      {domains.map(domain => (
        <link key={`preconnect-${domain}`} rel="preconnect" href={`https://${domain}`} crossOrigin="anonymous" />
      ))}
      
      {/* Preload critical fonts */}
      <link 
        rel="preload" 
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
        as="style" 
      />
      
      {/* Preload critical images */}
      <link 
        rel="preload" 
        href="/images/trainers/goutham.png" 
        as="image" 
        type="image/png" 
      />
    </Head>
  );
};

export default DnsPrefetch;
