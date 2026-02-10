/**
 * Name Generator Utilities
 * 
 * This file exports name generator functions for client-side use.
 * These functions can be used directly in React components without
 * requiring API routes, making them compatible with static export
 * (required for GitHub Pages deployment).
 * 
 * Architecture:
 * - Generator functions in src/utils/generators/names/ return Response objects
 * - This utility converts Response objects to Record<string, string[]> format
 * - The format supports gender-based name organization (neutral, male, female)
 * 
 * Benefits of client-side generation:
 * - No server required (works with static export)
 * - Faster response times (no network latency)
 * - Better for GitHub Pages deployment
 * - Simpler architecture (no API routes needed)
 * 
 * @module name-generators
 */

import AlienNames from "@/utils/generators/names/alien";
import AmazonNames from "@/utils/generators/names/amazon";
import AnansiNames from "@/utils/generators/names/anansi";
import AngelNames from "@/utils/generators/names/angel";
import AnimalSpeciesNames from "./generators/names/animal-species";

/**
 * Generator Registry
 * 
 * Maps name generator types (as strings) to their corresponding
 * generator functions. Each generator function returns a Response
 * object containing a Record<string, string[]> with gender keys.
 * 
 * Generator Function Requirements:
 * - Must return a Response object
 * - Response.json() should return Record<string, string[]>
 * - Should support at least "neutral" gender key
 * - May optionally support "male" and "female" keys
 * 
 * To add a new generator:
 * 1. Create the generator function in src/utils/generators/names/
 *    - Follow the pattern of existing generators
 *    - Return Response.json() with Record<string, string[]> format
 * 2. Import it at the top of this file
 * 3. Add it to this map with the appropriate key (lowercase, slugified)
 * 
 * @example
 * // Adding a new "elf" generator:
 * import ElfNames from "@/utils/generators/names/elf";
 * const generators = {
 *     // ... existing generators
 *     elf: ElfNames
 * };
 */
const generators: Record<string, () => Response> = {
    'alien': AlienNames,
    'amazon': AmazonNames,
    'anansi': AnansiNames,
    'angel': AngelNames,
    'animal-species': AnimalSpeciesNames
    // Add more generators here as they are created
};

/**
 * Generate names for a given type
 * 
 * This function calls the appropriate generator function based on the type
 * and returns the generated names as a Promise<Record<string, string[]>>.
 * 
 * The generator functions return Response objects (for API compatibility),
 * which we convert to objects with gender keys for client-side usage.
 * 
 * Process:
 * 1. Normalize the type to lowercase for case-insensitive matching
 * 2. Look up the generator function in the registry
 * 3. Execute the generator function (returns Response object)
 * 4. Extract JSON data from Response (returns Record<string, string[]>)
 * 5. Return the names object with gender keys
 * 
 * Return Format:
 * The function returns an object with gender keys, where each key contains
 * an array of generated names:
 * {
 *   "neutral": ["name1", "name2", ...],
 *   "male": ["name1", "name2", ...],    // Optional
 *   "female": ["name1", "name2", ...]   // Optional
 * }
 * 
 * @param type - The name generator type (e.g., "alien", "amazon", "anansi", "angel")
 *               Should match the key in the generators registry (case-insensitive)
 * @returns Promise<Record<string, string[]>> - Object with gender keys containing arrays of generated names
 * @throws {Error} If the generator type is not supported
 * @throws {Error} If name generation fails for any reason
 * 
 * @example
 * // Generate alien names
 * const names = await generateNames("alien");
 * // Returns: { "neutral": ["xkrath", "q'varn", "zthul", ...] }
 * 
 * @example
 * // Generate angel names (supports multiple genders)
 * const names = await generateNames("angel");
 * // Returns: {
 * //   "neutral": ["Gabriel", "Michael", ...],
 * //   "male": ["Michael", "Raphael", ...],
 * //   "female": ["Ariel", "Seraph", ...]
 * // }
 */
export async function generateNames(type: string): Promise<Record<string, string[]>> {
    // Normalize the type to lowercase for case-insensitive matching
    // This allows users to pass "Alien", "ALIEN", or "alien" - all will work
    const normalizedType = type.toLowerCase();

    // Check if the requested generator type exists in the registry
    // If not found, throw a descriptive error
    const generator = generators[normalizedType];

    if (!generator) {
        throw new Error(`Name generator type "${type}" is not supported. Available types: ${Object.keys(generators).join(", ")}`);
    }

    try {
        // Execute the generator function
        // Generator functions return Response objects (for consistency with API route format)
        const response = generator();

        // Extract the JSON data from the Response object
        // Response.json() returns a Promise<Record<string, string[]>>, so we await it
        // The format should be: { "neutral": [...], "male": [...], "female": [...] }
        const names = await response.json();

        // Validate that we received a valid object
        if (!names || typeof names !== 'object' || Array.isArray(names)) {
            throw new Error("Invalid response format from generator");
        }

        return names;
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error generating names:", error);

        // Re-throw with a user-friendly message
        // Don't expose internal error details for security reasons
        if (error instanceof Error) {
            throw error; // Re-throw if it's already an Error with a message
        }
        throw new Error("Failed to generate names. Please try again.");
    }
}

/**
 * Get list of available generator types
 * 
 * Returns an array of all registered generator type names.
 * Useful for:
 * - Dynamic UI generation (showing available options)
 * - Validation (checking if a type is supported)
 * - Debugging (seeing what generators are available)
 * 
 * @returns {string[]} Array of available generator type names (lowercase)
 * 
 * @example
 * const available = getAvailableGenerators();
 * // Returns: ["alien", "amazon", "anansi", "angel"]
 * 
 * @example
 * // Check if a generator exists
 * const types = getAvailableGenerators();
 * if (types.includes("elf")) {
 *     // Generator exists
 * }
 */
export function getAvailableGenerators(): string[] {
    return Object.keys(generators);
}

