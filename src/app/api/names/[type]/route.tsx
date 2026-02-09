import { NextRequest } from "next/server";
import AlienNames from "@/utils/generators/names/alien";
import AmazonNames from "@/utils/generators/names/amazon";
import AnansiNames from "@/utils/generators/names/anansi";

/**
 * API Route Handler for generating names by type
 * 
 * This endpoint dynamically routes to the appropriate name generator
 * based on the type parameter in the URL. It supports multiple name
 * generation types (e.g., alien, elf, dwarf) and can be easily extended
 * by adding new generators to the generators map.
 * 
 * Route: /api/names/[type]
 * Method: GET
 * 
 * @param request - The incoming HTTP request object (NextRequest)
 * @param params - Route parameters containing the name type as a Promise
 *                 In Next.js 16+, params is a Promise that must be awaited
 * @returns {Promise<Response>} JSON response containing:
 *          - Success: Array of generated names
 *          - Error: Error message with appropriate HTTP status code
 * 
 * @example
 * // Request
 * GET /api/names/alien
 * 
 * // Success Response (200)
 * ["xkrath", "q'varn", "zthul", "z'kral", "vxthar", ...]
 * 
 * // Error Response (404)
 * { "error": "Name generator type \"invalid\" is not supported" }
 * 
 * // Error Response (500)
 * { "error": "Internal server error" }
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ type: string }> }
) {
    try {
        // Extract the name type from route parameters
        // In Next.js 16+, params is a Promise that must be awaited
        const { type } = await params;

        /**
         * Generator Registry
         * 
         * Maps name generator types (as strings) to their corresponding
         * generator functions. Each generator function should return a Response
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
            // Example: "elf": ElfNames,
            // Example: "dwarf": DwarfNames,
        };

        // Normalize the type to lowercase for case-insensitive matching
        // Check if the requested type is supported
        const generator = generators[type.toLowerCase()];

        // Return 404 if the requested generator type doesn't exist
        if (!generator) {
            return Response.json(
                { error: `Name generator type "${type}" is not supported` },
                { status: 404 }
            );
        }

        // Execute the generator function and return the response
        // The generator function returns a Response object with the generated names
        return generator();
    } catch (error) {
        // Handle any unexpected errors during name generation
        // Log the error for debugging purposes
        console.error("Error generating names:", error);
        
        // Return a generic error message to the client
        // Don't expose internal error details for security reasons
        return Response.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}