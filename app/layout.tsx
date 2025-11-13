import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./providers/theme-provider";

export const metadata: Metadata = {
  title: "AI Code Explainer - Understand Code in Simple Terms",
  description:
    "Free AI tool that explains any programming code in simple English or Bengali. Perfect for students and developers. No signup required.",
  keywords: [
    "code explainer",
    "AI programming",
    "code explanation",
    "learn programming",
    "Bangladeshi developers",
    "free AI tool",
  ],
  authors: [{ name: "Muhammad Shihab Uddin" }],
  creator: "Muhammad Shihab Uddin",
  publisher: "Muhammad Shihab Uddin",
  robots: "index, follow",
  openGraph: {
    title: "AI Code Explainer - Understand Any Code Instantly",
    description:
      "Free AI-powered code explanation tool. Get simple explanations for any programming code.",
    url: "https://aicodexp.vercel.app/",
    siteName: "AI Code Explainer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Code Explainer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Code Explainer - Understand Any Code Instantly",
    description: "Free AI-powered code explanation tool for developers.",
    creator: "@makershihab",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#3B82F6" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('code-explainer-theme') || 'system';
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const currentTheme = theme === 'system' ? systemTheme : theme;
                  document.documentElement.classList.add(currentTheme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
