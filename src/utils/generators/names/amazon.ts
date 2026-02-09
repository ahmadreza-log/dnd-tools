import SensitivityCheck from "@/utils/sensitivity-check"

/**
 * Configuration constants for name generation
 * These values control the behavior of the Amazon name generator
 */
const COUNT = 10 // Number of names to generate per request
const MAX_ATTEMPTS = 1000 // Maximum attempts to generate a safe (non-sensitive) name before giving up
const PATTERN_COUNT = 2 // Number of different name construction patterns available

/**
 * Name construction patterns for Amazon names
 * Each pattern defines which character positions from the characters array to use
 * and which position needs conflict resolution (to avoid duplicate consecutive characters)
 * 
 * Pattern structure:
 * - indices: Array of character array indices to use in order
 * - conflictIdx: The index that needs conflict checking (cannot match adjacent characters)
 */
const PATTERNS = [
    { indices: [0, 1, 2, 4, 5], conflictIdx: 2 }, // Pattern 1: [start, vowel, consonant, vowel, ending]
    { indices: [0, 1, 3, 1, 5], conflictIdx: 3 }  // Pattern 2: [start, vowel, complex consonant, vowel, ending]
]

/**
 * Amazon Name Generator Function
 * 
 * Generates a specified number of random Amazon-sounding names
 * using phonetic patterns. Each generated name is checked against a sensitivity
 * filter to ensure it doesn't contain inappropriate content.
 * 
 * Amazon names typically have a Greek/Roman-inspired structure with
 * feminine endings and classical vowel patterns.
 * 
 * @returns {Response} JSON response containing an array of generated names
 * 
 * @example
 * AmazonNames()
 * Response: ["antadice", "cyraestris", "leianache", ...]
 */
const AmazonNames = (): Response => {
    /**
     * Character sets for Amazon name construction
     * Each inner array represents a position in the name structure
     * Empty strings ("") allow for optional characters at that position
     * 
     * Structure:
     * - Position 0: Name start (consonant clusters and single consonants)
     * - Position 1: Vowel set (single vowels and diphthongs)
     * - Position 2: Simple middle consonants
     * - Position 3: Complex middle consonants (clusters and combinations)
     * - Position 4: Optional middle vowels
     * - Position 5: Name endings (typically feminine Greek/Roman endings)
     */
    const characters: string[][] = [
        // Position 0: Name start (consonant clusters and single consonants)
        ["b", "bl", "br", "c", "chr", "cl", "cr", "d", "dr", "f", "g", "gl", "gr", "h", "j", "k", "kl", "kr", "m", "n", "p", "ph", "ps", "pr", "r", "rh", "s", "sm", "sc", "t", "th", "v", "x", "", "", "", "", "", "", ""],
        // Position 1: Vowel set (single vowels, diphthongs, and combinations)
        ["a", "e", "i", "o", "u", "y", "ou", "ei", "oe", "ao", "io", "eo", "a", "e", "i", "o", "u"],
        // Position 2: Simple middle consonants (for Pattern 1)
        ["c", "d", "k", "l", "m", "r", "s", "t", "x", "", "", "", "", "", "", "", "", "", "", ""],
        // Position 3: Complex middle consonants (clusters and combinations for Pattern 2)
        ["c", "d", "k", "l", "m", "r", "s", "t", "x", "nd", "nt", "lk", "lc", "ll", "ndr", "br", "st", "ch", "br", "cl", "ph", "rm", "pp", "pt", "rp", "nth", "th", "rg", "thr", "dm", "lth", "lc", "chr", "phn", "dr", "mn", "rr", "rrh"],
        // Position 4: Optional middle vowels
        ["a", "e", "i", "o", "u", "y", "", "", "", "", "", "", "", "", ""],
        // Position 5: Name endings (feminine Greek/Roman-style endings)
        ["adia", "ameia", "anta", "asca", "cabe", "ce", "cleia", "cyone", "cyra", "da", "dae", "dia", "dice", "dora", "enice", "esia", "estra", "estris", "gea", "gone", "haedra", "hyia", "ippe", "isbe", "ises", "leia", "lene", "lete", "liope", "lipe", "lyte", "mache", "meia", "nache", "nara", "neira", "nestra", "nia", "nippe", "noe", "nousa", "ope", "padia", "pedo", "peia", "pesia", "phale", "pyle", "pyte", "rera", "reto", "roe", "scyra", "ses", "sippe", "sose", "tane", "thippe", "thoe", "thya", "thye", "thyia", "ybe", "yche", "yle", "yme", "yne", "yope", "yrbe", "ytie"]
    ]

    /**
     * Generates a single random Amazon name based on predefined patterns
     * 
     * This function attempts to generate a name that passes the sensitivity check.
     * It will retry up to MAX_ATTEMPTS times if the generated name
     * contains sensitive content.
     * 
     * Algorithm:
     * 1. Randomly select a name pattern (1-2)
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
            // Randomly select one of the two name patterns (0-1)
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
             * Example: If pattern uses positions [0, 1, 2, 4, 5] and conflictIdx is 2,
             * we ensure position 2 doesn't match position 1 or position 4.
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
    const names: string[] = []
    for (let i = 0; i < COUNT; i++) {
        names[i] = generate()
    }

    // Return the list of generated names as JSON
    return Response.json(names)
}

export default AmazonNames