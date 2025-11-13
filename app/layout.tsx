import "./globals.css";
import { ThemeProvider } from "./providers/theme-provider";

export const metadata = {
  title: "AI Code Explainer - Muhammad Shihab Uddin",
  description:
    "Advanced AI-powered code explanation tool with friendly responses",
  authors: [{ name: "Muhammad Shihab Uddin" }],
  keywords: ["code", "explainer", "AI", "programming", "developer tools"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
