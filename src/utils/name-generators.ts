/**
 * Name Generator Utilities
 * 
 * This file exports name generator functions for client-side use.
 * These functions can be used directly in React components without
 * requiring API routes, making them compatible with static export.
 * 
 * Note: Generator functions return Response objects, which we convert
 * to arrays for easier client-side usage.
 */

import AlienNames from "@/utils/generators/names/alien";
import AmazonNames from "@/utils/generators/names/amazon";
import AnansiNames from "@/utils/generators/names/anansi";

/**
 * Generator Registry
 * 
 * Maps name generator types (as strings) to their corresponding
 * generator functions. Each generator function returns a Response
 * object containing an array of generated names.
 * 
 * To add a new generator:
 * 1. Create the generator function in src/utils/generators/names/
 * 2. Import it at the top of this file
 * 3. Add it to this map with the appropriate key
 */
const generators: Record<string, () => Response> = {
    alien: AlienNames,
    amazon: AmazonNames,
    anansi: AnansiNames
    // Add more generators here as they are created
};

/**
 * Generate names for a given type
 * 
 * This function calls the appropriate generator function based on the type
 * and returns the generated names as a Promise<string[]>.
 * 
 * The generator functions return Response objects (for API compatibility),
 * which we convert to arrays for client-side usage.
 * 
 * @param type - The name generator type (e.g., "alien", "amazon", "anansi")
 * @returns Promise<string[]> - Array of generated names
 * @throws Error if the generator type is not supported
 * 
 * @example
 * const names = await generateNames("alien");
 * // Returns: ["xkrath", "q'varn", "zthul", ...]
 */
export async function generateNames(type: string): Promise<string[]> {
    // Normalize the type to lowercase for case-insensitive matching
    const normalizedType = type.toLowerCase();
    
    // Check if the requested generator type exists
    const generator = generators[normalizedType];
    
    if (!generator) {
        throw new Error(`Name generator type "${type}" is not supported`);
    }
    
    try {
        // Execute the generator function (returns Response object)
        const response = generator();
        
        // Extract the JSON data from the Response object
        // Response.json() returns a Promise, so we await it
        const names = await response.json();
        
        return names;
    } catch (error) {
        console.error("Error generating names:", error);
        throw new Error("Failed to generate names");
    }
}

/**
 * Get list of available generator types
 * 
 * @returns string[] - Array of available generator type names
 */
export function getAvailableGenerators(): string[] {
    return Object.keys(generators);
}

