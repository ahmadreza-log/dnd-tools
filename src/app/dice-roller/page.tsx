import DiceRoller from "@/components/dice-roller";
import Header from "@/components/header";
import { Metadata } from "next";

/**
 * Page Metadata
 * 
 * Defines the SEO metadata for the Dice Roller page.
 * This information is used for page titles, descriptions, and social media sharing.
 */
export const metadata: Metadata = {
    title: "Dice Roller",
    description: "Roll any dice you need",
};

/**
 * Dice Roller Page Component
 * 
 * The page component for the Dice Roller tool. It displays:
 * - Application header with navigation
 * - Page title with dice icon
 * - The DiceRoller component with input fields for D&D modifiers and bonuses
 * 
 * This page allows players to input their character's ability modifiers,
 * proficiency bonuses, and other D&D-related values for dice rolling calculations.
 */
export default function Page() {
    return (
        <>
            {/* Application header with navigation */}
            <Header />

            {/* Page Title Section */}
            <div className="container mx-auto mt-8 text-center flex flex-col items-center justify-center">
                <h2 className="text-5xl flex items-center gap-4">
                    {/* Dice icon SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216" width={64} height={64}>
                        <path fill="none" stroke="#ffffff" strokeLinejoin="round" strokeWidth="8" d="M191.14,60 L191.14,156 L159.96,78z M159.96,78 L191.14,156 L108,168z M191.14,60 L159.96,78 L108,12z M191.14,156 L108,204 L108,168z M108,12 L159.96,78 L56.04,78z M159.96,78 L108,168 L56.04,78z M108,168 L108,204 L24.86,156z M108,12 L56.04,78 L24.86,60z M56.04,78 L108,168 L24.86,156z M56.04,78 L24.86,156 L24.86,60z" />
                    </svg>
                    Dice Roller
                </h2>
            </div>

            {/* Main Dice Roller Component */}
            <DiceRoller />
        </>
    );
}