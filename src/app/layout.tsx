import type { Metadata } from "next";
import { MedievalSharp } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/providers";

/**
 * Root Layout Component
 * 
 * This is the root layout for the Next.js application. It wraps all pages
 * and provides global configuration including fonts, metadata, and providers.
 * 
 * The layout uses a medieval-themed font to match the D&D theme and applies
 * dark mode styling by default.
 */

/**
 * Font Configuration
 * 
 * Loads the MedievalSharp font from Google Fonts with weight 400.
 * The font variable is used to apply the font to the entire application.
 */
const font = MedievalSharp({
  weight: ['400'],
  variable: "--font-medieval-sharp",
});

/**
 * Page Metadata
 * 
 * Defines the default metadata for all pages in the application.
 * Individual pages can override these values.
 */
export const metadata: Metadata = {
  title: "D&D Tools",
  description: "Some Useful Tools For Dungeons & Dragons Players",
};

/**
 * Root Layout Component
 * 
 * The root layout component that wraps all pages in the application.
 * It sets up the HTML structure, applies global styles, and provides
 * context providers for the entire app.
 * 
 * @param children - The page content to be rendered inside the layout
 * @returns The root HTML structure with providers and global styles
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* Apply font, dark theme, and global background styles */}
      <body className={`${font.className} text-zinc-50 bg-zinc-800 dark min-h-screen`}>
        {/* Wrap children with providers for UI components and toast notifications */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
