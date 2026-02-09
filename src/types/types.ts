/**
 * Type definitions for the D&D Tools application
 * 
 * This file contains shared TypeScript type definitions used across
 * the application for type safety and better developer experience.
 */

/**
 * Tool type definition
 * 
 * Represents a tool/utility available in the D&D Tools application.
 * Used for navigation items and tool listings.
 * 
 * @property name - Display name of the tool
 * @property description - Brief description of what the tool does
 * @property href - URL path to the tool's page
 */
export type Tool = {
    name: string;
    description: string;
    href: string;
}

/**
 * Category Item type definition
 * 
 * Represents a single item within a name generation category.
 * Currently defined as a string (the name type identifier).
 * 
 * Example: "Alien", "Elf", "Dwarf", etc.
 */
export type CategoryItem = string