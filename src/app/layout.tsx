import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import Layout from "@/components/Layout";
import "slick-carousel/slick/slick.css";
import Footer from "@/components/Footer";
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Al Wahab",
  description: "Clothing Brand",
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png']
  },
  manifest: '/site.webmanifest'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Google tag (gtag.js) */}
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-3EFFGY7S8X" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3EFFGY7S8X');
          `}
        </Script>
      </head>

      <body className="font-bodyFont w-full bg-main-bg text-darkText">
        <Layout>
          <Header />
          {children}
          <Footer />
        </Layout>
      </body>
    </html>
  );
}
