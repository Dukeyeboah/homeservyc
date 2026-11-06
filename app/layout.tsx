import type React from 'react';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { AuthProvider } from '@/contexts/auth-context';
import './globals.css';
import { PageMotion } from '@/components/page-motion';

export const metadata: Metadata = {
  title: 'HomeServyc | Find home help in Ghana',
  description:
    'Browse community recommendations for household services in Ghana. Compare roles and find help for your home.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png?v=2',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png?v=2',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg?v=2',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png?v=2',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        {process.env.NEXT_PUBLIC_LOCAL_PREVIEW === 'true' && (
          <div className='bg-amber-100 text-amber-950 px-4 py-2 text-center text-sm'>Local preview · Directory browsing only. Sign-in, saves and submissions are disabled.</div>
        )}
        <AuthProvider><PageMotion/>{children}</AuthProvider>
        {process.env.NEXT_PUBLIC_LOCAL_PREVIEW !== 'true' && <Analytics />}
      </body>
    </html>
  );
}
