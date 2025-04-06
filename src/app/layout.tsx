import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import DnsPrefetch from "@/components/DnsPrefetch";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CyberTrainer.in - Best Cybersecurity Training in Vizag, Vijayawada & Hyderabad",
  description: "Exclusive cybersecurity training by Goutham Kumar, the best trainer in Vizag, Vijayawada & Hyderabad with 8+ years of experience. Master ethical hacking, penetration testing & network security.",
  keywords: "cybersecurity training, ethical hacking, penetration testing, network security, cybersecurity certification, security+, CEH, OSCP, Goutham Kumar, Vizag, Visakhapatnam, Vijayawada, Hyderabad, Hyd, best trainer",
  authors: [{ name: 'Goutham Kumar', url: 'https://www.linkedin.com/in/chittigouthamkumar/' }],
  creator: 'Goutham Kumar',
  publisher: 'CyberTrainer.in',
  metadataBase: new URL('https://cybertrainer.in'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    title: 'CyberTrainer.in - Best Cybersecurity Training in Vizag, Vijayawada & Hyderabad',
    description: 'Exclusive cybersecurity training by Goutham Kumar, the best trainer in Vizag, Vijayawada & Hyderabad with 8+ years of experience.',
    url: 'https://cybertrainer.in',
    siteName: 'CyberTrainer.in',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CyberTrainer.in - Professional Cybersecurity Training',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CyberTrainer.in - Best Cybersecurity Training in Vizag, Vijayawada & Hyderabad',
    description: 'Exclusive cybersecurity training by Goutham Kumar, the best trainer in Vizag, Vijayawada & Hyderabad.',
    images: ['/images/twitter-image.jpg'],
    creator: '@CyberTrainerIn',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  manifest: '/site.webmanifest',
  category: 'education',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD will be added via page components */}
        <DnsPrefetch />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
