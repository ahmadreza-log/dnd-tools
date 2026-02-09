import { Tool } from "@/types/types"

/**
 * Tools Configuration
 * 
 * Defines the list of available tools in the D&D Tools application.
 * Each tool object contains the display name, description, and route path.
 * 
 * This array is used throughout the application for:
 * - Home page tool grid display
 * - Header navigation links
 * - Tool listings and navigation
 * 
 * To add a new tool:
 * 1. Create the tool page/component
 * 2. Add a new object to this array with name, description, and href
 * 3. The tool will automatically appear in navigation and listings
 */
const tools: Tool[] = [
    {
        name: "Dice Roller",
        description: "Roll any dice you need.",
        href: "/dice-roller",
    },
    {
        name: "Character Generator",
        description: "Generate a fantastic character for your campaign.",
        href: "/character-generator",
    },
    {
        name: "Name Generator",
        description: "Generate names randomly for your Characters.",
        href: "/name-generator",
    },
    {
        name: "Monster Generator",
        description: "Generate monsters randomly for your Dungeons & Dragons campaign.",
        href: "#", // Placeholder href - tool not yet implemented
    },
]

export default tools
