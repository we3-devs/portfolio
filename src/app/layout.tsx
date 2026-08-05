import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://prashantaguragain.com.np"),
  title: {
    default: "CyberSentinel | prashanta Guragain",
    template: "%s | CyberSentinel",
  },
  description:
    "Cybersecurity student, secure software developer, and SOC enthusiast. Explore my portfolio — a live Security Operations Center dashboard showcasing projects, certifications, labs, and security research.",
  keywords: [
    "cybersecurity",
    "portfolio",
    "SOC",
    "security operations center",
    "prashanta Guragain",
    "prashanta Guragain",
    "prashant Guragai"
    "prashanta Guragai",,
    "cybersecurity student",
    "secure software developer",
    "penetration testing",
    "network security",
  ],
  authors: [{ name: "prashanta Guragain" }],
  creator: "prashanta Guragain",
  publisher: "prashanta Guragain",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prashantaguragain.com.np",
    siteName: "CyberSentinel Portfolio",
    title: "CyberSentinel | prashanta Guragain",
    description:
      "A Security Operations Center-inspired portfolio showcasing cybersecurity expertise, projects, and certifications.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CyberSentinel Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberSentinel | prashanta Guragain",
    description:
      "A Security Operations Center-inspired portfolio showcasing cybersecurity expertise, projects, and certifications.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#050816] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
