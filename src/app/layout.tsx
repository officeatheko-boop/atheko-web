import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/common/ClientLayout";
import WhatsAppIcon from "@/components/common/whatsapp/WhatsAppIcon";
import localFont from 'next/font/local';

const madeTommyBold = localFont({
  src: [
    {
      path: '../fonts/made/MADE Outer Sans Bold PERSONAL USE.otf',
      weight: '700', 
      style: 'normal',
    },
  ],
  variable: '--font-made-tommy', 
  display: 'swap', 
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Atheko Premium Laundry",
  description:
    "Atheko Premium Laundry is a flagship brand under Collective Core Venture LLP, built with a vision to redefine modern fabric care through precision, professionalism, and sustainability. At Atheko, we believe laundry is not just a service — it's an experience that combines quality, convenience, and care.",
  other: {
    keywords:
      "Laundry service in Kozhikode, Premium laundry Kozhikode, Dry cleaning Kozhikode, Steam ironing Kozhikode, Wash and fold service in Calicut, Best laundry in Kozhikode, Affordable laundry Kozhikode, Laundry pickup and delivery Kozhikode, Professional laundry Kozhikode, Laundry service in Calicut city, Top laundry in Calicut, Best dry cleaning in Calicut",
  },
  openGraph: {
    title: "Atheko Premium Laundry",
    description:
      "Atheko Premium Laundry is a flagship brand under Collective Core Venture LLP, built with a vision to redefine modern fabric care through precision, professionalism, and sustainability. At Atheko, we believe laundry is not just a service — it's an experience that combines quality, convenience, and care.",
    url: "https://www.atheko.com",
    siteName: "Atheko",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Atheko Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atheko Premium Laundry",
    description:
      "Premium laundry service in Kozhikode with dry cleaning, steam ironing, and pickup & delivery.",
    images: ["/og-image.png"], 
  },
  themeColor: "#ffffff",
  icons: {
    icon: [
      { url: "/16-x-16.png",   sizes: "16x16",   type: "image/png" }, 
      { url: "/32-x-32.png",   sizes: "32x32",   type: "image/png" },
      { url: "/48-x-48.png",   sizes: "48x48",   type: "image/png" },
      { url: "/180-x-180.png", sizes: "180x180", type: "image/png" },
      { url: "/512-x-512.png", sizes: "512x512", type: "image/png" }, 
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/favicon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${madeTommyBold.variable} antialiased`}>
        <ClientLayout>
          {children}
          <WhatsAppIcon />
        </ClientLayout>
      </body>
    </html>
  );
}
