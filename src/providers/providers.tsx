'use client'

import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/react";

/**
 * Providers Component
 * 
 * Wraps the application with necessary context providers for UI components.
 * This component must be a client component ('use client') because it uses
 * React context providers that require client-side rendering.
 * 
 * Providers included:
 * - HeroUIProvider: Provides theme and styling context for HeroUI components
 * - ToastProvider: Enables toast notification functionality throughout the app
 * 
 * @param children - The child components to be wrapped with providers
 * @returns The application wrapped with all necessary providers
 */
const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <HeroUIProvider>
      <ToastProvider />
      {children}
    </HeroUIProvider>
  )
}

export default Providers