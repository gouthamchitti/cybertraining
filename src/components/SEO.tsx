'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { supabase } from '@/utils/supabase';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

export default function SEO({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage
}: SEOProps) {
  const pathname = usePathname();
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('seo_metadata')
          .select('*')
          .eq('page_path', pathname)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching SEO metadata:', error);
        }

        if (data) {
          setMetadata(data);
        }
      } catch (error) {
        console.error('Error fetching SEO metadata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [pathname]);

  // Use provided props or fallback to metadata from database
  const finalTitle = title || metadata?.title || 'CyberTrainer - Elite Cybersecurity Training';
  const finalDescription = description || metadata?.description || 'Exclusive access to premium cybersecurity training led by certified professionals with real-world experience.';
  const finalKeywords = keywords || metadata?.keywords || 'cybersecurity, training, ethical hacking, penetration testing, security';
  
  const finalOgTitle = ogTitle || metadata?.og_title || finalTitle;
  const finalOgDescription = ogDescription || metadata?.og_description || finalDescription;
  const finalOgImage = ogImage || metadata?.og_image || '/images/og-default.jpg';
  
  const finalTwitterTitle = twitterTitle || metadata?.twitter_title || finalTitle;
  const finalTwitterDescription = twitterDescription || metadata?.twitter_description || finalDescription;
  const finalTwitterImage = twitterImage || metadata?.twitter_image || '/images/twitter-default.jpg';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cybertrainer.in';
  const canonicalUrl = `${siteUrl}${pathname}`;

  return (
    <Head>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={`${siteUrl}${finalOgImage}`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={finalTwitterTitle} />
      <meta property="twitter:description" content={finalTwitterDescription} />
      <meta property="twitter:image" content={`${siteUrl}${finalTwitterImage}`} />

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="CyberTrainer" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
}
