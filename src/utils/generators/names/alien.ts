import SensitivityCheck from "@/utils/sensitivity-check"

/**
 * Configuration constants for name generation
 * These values control the behavior of the alien name generator
 */
const COUNT = 10 // Number of names to generate per request
const MAX_ATTEMPTS = 1000 // Maximum attempts to generate a safe (non-sensitive) name before giving up
const PATTERN_COUNT = 3 // Number of different name construction patterns available

/**
 * Name construction patterns
 * Each pattern defines which character positions from the characters array to use
 * and which position needs conflict resolution (to avoid duplicate consecutive characters)
 * 
 * Pattern structure:
 * - indices: Array of character array indices to use in order
 * - conflictIdx: The index that needs conflict checking (cannot match adjacent characters)
 */
const PATTERNS = [
    { indices: [0, 1, 2, 3, 4], conflictIdx: 2 }, // Pattern 1: [start, vowel, consonant, vowel, end]
    { indices: [5, 6, 7, 8, 9], conflictIdx: 7 }, // Pattern 2: Similar structure, different character sets
    { indices: [10, 11, 12, 13, 14], conflictIdx: 12 } // Pattern 3: Similar structure, different character sets
]

/**
 * API Route Handler for generating random Alien names
 * 
 * This endpoint generates a specified number of random alien-sounding names
 * using phonetic patterns. Each generated name is checked against a sensitivity
 * filter to ensure it doesn't contain inappropriate content.
 * 
 * @param gender - The gender type for name generation (default: 'neutral')
 * @returns {Response} JSON response containing an object with gender keys and arrays of generated names
 * 
 * @example
 * GET /api/names/alien
 * Response: { "neutral": ["xkrath", "q'varn", "zthul", ...] }
 */
const AlienNames = () => {
    /**
     * Character sets for name construction
     * Each inner array represents a position in the name structure
     * Empty strings ("") allow for optional characters at that position
     * 
     * Structure:
     * - Positions 0-4: First pattern (indices 0-4)
     * - Positions 5-9: Second pattern (indices 5-9)
     * - Positions 10-14: Third pattern (indices 10-14)
     */
    const characters: string[][] = [
        // Position 0: Name start (consonant clusters and single consonants)
        ["br", "c", "cr", "dr", "g", "gh", "gr", "k", "kh", "kr", "n", "q", "qh", "sc", "scr", "str", "st", "t", "tr", "thr", "v", "vr", "x", "z", "", "", "", "", ""],
        // Position 1: First vowel set (diphthongs and single vowels)
        ["ae", "aa", "ai", "au", "uu", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u"],
        // Position 2: Middle consonants (with repetition capability and complex clusters)
        ["c", "k", "n", "q", "t", "v", "x", "z", "c", "cc", "cr", "cz", "dr", "gr", "gn", "gm", "gv", "gz", "k", "kk", "kn", "kr", "kt", "kv", "kz", "lg", "lk", "lq", "lx", "lz", "nc", "ndr", "nkr", "ngr", "nk", "nq", "nqr", "nz", "q", "qr", "qn", "rc", "rg", "rk", "rkr", "rq", "rqr", "sc", "sq", "str", "t", "v", "vr", "x", "z", "q'", "k'", "rr", "r'", "t'", "tt", "vv", "v'", "x'", "z'", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        // Position 3: Middle vowels (optional, can be empty)
        ["", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "oi", "ie", "ai", "ei", "eo", "ui"],
        // Position 4: Name ending (consonant endings)
        ["d", "ds", "k", "ks", "l", "ls", "n", "ns", "ts", "x"],
        // Positions 5-9: Second pattern (similar structure to positions 0-4, different character sets)
        ["b", "bh", "ch", "d", "dh", "f", "h", "l", "m", "n", "ph", "r", "s", "sh", "th", "v", "y", "z", "", "", "", "", "", "", "", "", ""],
        ["ae", "ai", "ee", "ei", "ie", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u"],
        ["c", "d", "g", "h", "l", "m", "n", "r", "s", "v", "z", "c", "ch", "d", "dd", "dh", "g", "gn", "h", "hl", "hm", "hn", "hr", "l", "ld", "ldr", "lg", "lgr", "lk", "ll", "lm", "ln", "lph", "lt", "lv", "lz", "m", "mm", "mn", "mh", "mph", "n", "nd", "nn", "ng", "nk", "nph", "nz", "ph", "phr", "r", "rn", "rl", "rz", "s", "ss", "sl", "sn", "st", "v", "z", "s'", "l'", "n'", "m'", "f'", "h'"],
        ["a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "oi", "ie", "ai", "ea", "ae"],
        ["", "", "", "", "d", "ds", "h", "l", "ll", "n", "ns", "r", "rs", "s", "t", "th"],
        // Positions 10-14: Third pattern (similar structure to positions 0-4, different character sets)
        ["b", "bh", "br", "c", "ch", "cr", "d", "dh", "dr", "f", "g", "gh", "gr", "h", "k", "kh", "kr", "l", "m", "n", "q", "qh", "ph", "r", "s", "sc", "scr", "sh", "st", "str", "t", "th", "thr", "tr", "v", "vr", "y", "x", "z", "", "", "", "", "", "", ""],
        ["ae", "aa", "ai", "au", "ee", "ei", "ie", "uu", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u"],
        ["c", "d", "g", "h", "k", "l", "m", "n", "q", "r", "s", "t", "v", "z", "c", "d", "g", "h", "k", "l", "m", "n", "q", "r", "s", "t", "v", "z", "c", "cc", "ch", "cr", "cz", "d", "dd", "dh", "dr", "g", "gm", "gn", "gr", "gv", "gz", "h", "hl", "hm", "hn", "hr", "k", "k'", "kk", "kn", "kr", "kt", "kv", "kz", "l", "ld", "ldr", "lg", "lgr", "lk", "ll", "lm", "ln", "lph", "lq", "lt", "lv", "lx", "lz", "m", "mh", "mm", "mn", "mph", "n", "nc", "nd", "ndr", "ng", "ngr", "nk", "nkr", "nn", "nph", "nq", "nqr", "nz", "ph", "phr", "q", "q'", "qn", "qr", "r", "r'", "rc", "rg", "rk", "rkr", "rl", "rn", "rq", "rqr", "rr", "rz", "s", "sc", "sl", "sn", "sq", "ss", "st", "str", "t", "t'", "tt", "v", "v'", "vr", "vv", "x", "x'", "z", "z'", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "oi", "ie", "ai", "ea", "ae"],
        ["d", "ds", "k", "ks", "l", "ll", "ls", "n", "ns", "r", "rs", "s", "t", "ts", "th", "x", "", "", "", ""]
    ]

    /**
     * Generates a single random alien name based on predefined patterns
     * 
     * This function attempts to generate a name that passes the sensitivity check.
     * It will retry up to MAX_ATTEMPTS times if the generated name
     * contains sensitive content.
     * 
     * Algorithm:
     * 1. Randomly select a name pattern (1-3)
     * 2. Generate random indices for each character position
     * 3. Resolve conflicts (prevent duplicate consecutive characters)
     * 4. Construct the name by concatenating selected characters
     * 5. Check if name is safe (non-sensitive)
     * 6. If safe, return; otherwise retry
     * 
     * @returns {string} A randomly generated name that has passed sensitivity checks
     */
    const generate = (): string => {
        let name = ''
        let attempts = 0

        // Continue generating until we get a safe name or reach max attempts
        while (attempts < MAX_ATTEMPTS) {
            // Randomly select one of the three name patterns (0-2)
            const patternIdx = Math.floor(Math.random() * PATTERN_COUNT)
            const pattern = PATTERNS[patternIdx]

            // Generate random indices for each character position
            // Each index selects a character from the corresponding character array
            const indices: number[] = []
            for (let i = 0; i < characters.length; i++) {
                indices[i] = Math.floor(Math.random() * characters[i].length)
            }

            /**
             * Conflict Resolution
             * 
             * Prevents the conflict character (at conflictIdx) from matching
             * its adjacent characters in the pattern. This avoids awkward duplicate
             * consecutive characters that would make the name sound unnatural.
             * 
             * Example: If pattern uses positions [0, 1, 2, 3, 4] and conflictIdx is 2,
             * we ensure position 2 doesn't match position 1 or position 3.
             */
            const conflictIdx = pattern.conflictIdx
            const conflictPos = pattern.indices.indexOf(conflictIdx)
            const prev = pattern.indices[conflictPos - 1]
            const next = pattern.indices[conflictPos + 1]

            // Regenerate conflict character until it doesn't match adjacent characters
            while (
                characters[prev][indices[prev]] === characters[conflictIdx][indices[conflictIdx]] ||
                characters[conflictIdx][indices[conflictIdx]] === characters[next][indices[next]]
            ) {
                indices[conflictIdx] = Math.floor(Math.random() * characters[conflictIdx].length)
            }

            /**
             * Name Construction
             * 
             * Build the name by mapping each pattern index to its corresponding
             * character and joining them into a single string.
             * Empty strings in character arrays allow for optional characters.
             */
            name = pattern.indices
                .map(idx => characters[idx][indices[idx]])
                .join('')

            /**
             * Sensitivity Check
             * 
             * SensitivityCheck returns true if the name is safe (not in the sensitive words list).
             * If the name passes the check, we can exit the loop and return it.
             * Otherwise, increment attempts and try again.
             */
            if (SensitivityCheck(name)) {
                break
            }

            attempts++
        }

        return name
    }

    /**
     * Generate the requested number of names
     * Each name is generated independently and checked for sensitivity
     */
    const names: Record<string, string[]> = {
        neutral: []
    }
    for (let i = 0; i < COUNT; i++) {
        names.neutral[i] = generate()
    }

    // Return the list of generated names as JSON
    return Response.json(names)
}

export default AlienNames