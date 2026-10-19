import type { Metadata, Viewport } from 'next';
import { generatePageMetadata } from '@/common/lib/Metadata';
import ClientProvider from '@/components/provider/ClientProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '@/common/lib/Dayjs';
import '@/styles/globals.scss';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata();
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body suppressHydrationWarning>
        <ClientProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
