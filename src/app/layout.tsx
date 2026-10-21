import type { Metadata } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AudioPlayer from '@/components/AudioPlayer';
import SchemaOrg from '@/components/SchemaOrg';
import { BackgroundSlideshow } from '@/components/BackgroundSlideshow';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-heading',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Atropina',
    default: 'Atropina — Death Metal',
  },
  description: 'Portal oficial da horda Atropina. Death Metal cruel e blasfemo do Brasil.',
  keywords: ['atropina', 'death metal', 'black metal', 'banda', 'brasil'],
  openGraph: {
    title: 'Atropina — Death Metal',
    description:
      'Portal oficial da banda Atropina. Death Metal com nuancias de Black Metal.',
    url: 'https://atropina.com.br',
    siteName: 'Atropina',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
  },
  metadataBase: new URL('https://atropina.com.br'),
};

import { MusicProvider } from '@/context/MusicContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${bebas.variable} ${inter.variable}`}>
      <body className="text-[#c8ff00] min-h-screen font-body antialiased flex flex-col relative bg-black">
        <MusicProvider>
          <SchemaOrg />
          <BackgroundSlideshow />
          <Header />
          <main className="flex-grow pt-16 pb-24 relative z-10">
            {children}
          </main>
          <Footer />
          <AudioPlayer />
        </MusicProvider>
      </body>
    </html>
  );
}
