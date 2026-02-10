import SensitivityCheck from "@/utils/sensitivity-check"

/**
 * Configuration constants for name generation
 * These values control the behavior of the Anansi name generator
 */
const COUNT = 10 // Number of names to generate per request
const MAX_ATTEMPTS = 1000 // Maximum attempts to generate a safe (non-sensitive) name before giving up

/**
 * API Route Handler for generating random Anansi names
 * 
 * This endpoint generates a specified number of random Anansi-sounding names
 * using phonetic patterns inspired by Akan/Ghanaian names. Each generated name
 * is checked against a sensitivity filter to ensure it doesn't contain inappropriate content.
 * 
 * The algorithm combines parts of existing names to create new, culturally-inspired names.
 * 
 * @returns {Response} JSON response containing an array of generated names
 * 
 * @example
 * GET /api/names/anansi
 * Response: ["akwaboa", "kwamena", "abenaa", ...]
 */
const AnansiNames = (): Response => {
    /**
     * Character sets for name construction
     * 
     * Structure:
     * - Position 0: Array of full Anansi/Akan names used as source material
     * - Position 1: Array of vowels (including accented vowels) used for connecting name parts
     */
    const characters: string[][] = [
        // Position 0: Full Anansi/Akan names used as source material for name parts
        ["Ã¡kron","Ã¡mÌ€ma","Ã¡mmÃ¡","É”kwÃ¡n","abÃ©naa","aba","abaka","abeberese","abena","abenaa","abeyie","ablÃ¡","ablÃ£","aboagye","aboah","aborah","aborampah","abrafi","abrefa","abrema","achamfour","acheampong","ackon","acquah","adade","addai","addo","adiyiah","adjoa","adjowa","adjua","adofo","adomah","adomako","adusei","adwoa","adwubi","afÃ­","afÃºom","afful","afirÃ­yie","afirifa","afoakwah","afrakoma","afrakomah","afram","afrane","afreh","afrifa","afriyie","afua","agyapong","agyare","agyei","agyeman","agyemang","agyenim","ahinful","ajwoba","akÃºÃ¡","akÃº","akaminko","akenten","akenteng","akomeah","akomfrah","akosah","akosi","akosiwa","akosua","akoto","akrofi","akua","akuamoah","akuba","akuffo","akun","akwasi","akyaw","ama","amakye","amamfo","amankona","amankonah","amankwah","amba","ame","ameyaw","ameyo","ami","amissah","amoabeng","amoah","amoako","amoateng","amofah","ampadu","ampem","ampofo","amponsah","amponsem","anÃºm","ananÃ©","anan","andoh","ankobiah","ankomah","ankrah","annan","anokye","ansah","ansong","antÃ³","apau","appiah","araba","arko","arkorful","asÃ­","asÃ³n","asamoah","asante","asantewaa","asare","asenso","ashia","asiamah","asiedu","asomadu","asomaning","assifuah","asubonteng","atÃ¡","ataÃ¡","ato","awotwe","awotwie","awuah","ayawa","ayeh","ayensu","ayew","bÃ³twe","baaba","baafi","baah","baako","badÃº","badÃºwaa","baffoe","bafuor","baidoo","banahene","barwuah","bedÃ­Ã ká¹","bediako","bedu","beká¹e","bekoe","bemah","berko","boadi","boadu","boahen","boakye","boamah","boampong","boasiako","boatei","boateng","bonah","bonsra","bonsrah","bonsu","brempong","busia","busiah","cofie","crentsil","cudjoe","cuffee","dÃºkÅ©","dÃºnu","daako","dankwah","danquah","danso","dapaa","dapaah","darko","dede","dedei","diawuo","djan","djansi","domfe","donkor","dorkenoo","duah","dufie","duodu","dwamena","dwamenah","dwomoh","ebo","efia","efua","ekow","ekua","ekuoba","enninful","esi","essien","esson","farkyi","fiifi","firikyi","fofie","fokuo","fordjour","forobuor","fredua","freduah","fremah","frempon","frempong","frimpong","gaddo","gyaama","gyakari","gyamah","gyambibi","gyamera","gyamerah","gyamfi","gyan","gyasi","gyeabuor","gyimah","inkoom","jojo","kaakyire","kaku","kande","karikari","katakyie","kenu","kodjÃ³","koduah","kofÃ­","koffi","kofi","kojo","kokote","kokou","koku","komi","komlÃ¡","komlÃ£","komlan","konadu","koranten","koranteng","korsah","kosi","kouassi","kow","kuffour","kufuor","kumankama","kumi","kusi","kusiwaa","kuuku","kuwame","kwÃ¡mÃ¨","kwÇŽmÃ¨","kwaata","kwabenÃ¡","kwadwÃ³","kwakÃº","kwakye","kwamena","kwami","kwamina","kwarteng","kwasÃ­","kwasiba","kwateng","kwaw","kwayie","kweku","kwesi","kyei","kyekyeku","kyem","kyerematen","kyeremateng","kyereme","kyerewa","kyerewaa","mÃ¡anu","mÃ¡nsÃ£","mÇŽnu","mansah","manso","meÅ„sÃ£Ì","mensah","mintah","misa","mmorosa","mpong","munuo","nÃºm","narh","nduom","nimo","nimoh","nkansa","nkansah","nkrÃ³ma","nkrumah","nsÄ©Ã£Ì","nsá¹waa","nsiah","nsonwaa","nsonwah","nsor","ntiamoa","ntiamoah","ntim","ntow","nuamah","nyamÃ©ama","nyamÃ©kyÎµ","nyamekye","nyankÃ³mÃ gÃ³","nyankomago","nyantah","nyantakyi","nyarko","obÃ­mÌ€pÎ­","obeng","obuor","oduro","ofori","ofosu","ogyampah","ohemeng","ohene","okese","okoromansah","okyere","omenaa","omenah","opambuor","opare","opoku","oppong","opuni","osafo","osam","osei","oteng","otuo","owoahene","owusu","oyiakwan","pÃ­Ã¨sÃ­e","paintsil","pappoe","peprah","pinaman","poku","prempeh","quainoo","quansah","safo","sakyi","sarfo","sarkodie","sarpei","sarpon","sarpong","sasraku","siabuor","siaw","siisi","sika","sikafuo","sintim","siriboe","soadwa","soadwah","sowah","tÃ¡wia","tagoe","takyi","tandoh","tawiah","tuffour","twasam","tweneboa","tweneboah","twerefuo","twum","twumasi","vorsah","wiafe","wiredu","yÎµmpÎ­w","yaa","yaaba","yaba","yamoah","yankah","yao","yartei","yaw","yawo","yeboah","yiadom","yoofi"],
        // Position 1: Vowels (including accented vowels) used for connecting name parts
        ["a", "e", "i", "o", "u", "Ã¡", "Ã£", "Ã­", "Ãº", "Ã©", "Ã³"]
    ]

    /**
     * Generates a single random Anansi name by combining parts of existing names
     * 
     * This function attempts to generate a name that passes the sensitivity check.
     * It will retry up to MAX_ATTEMPTS times if the generated name
     * contains sensitive content.
     * 
     * Algorithm:
     * 1. Select two random names from the source material
     * 2. Extract a prefix from the first name and a suffix from the second name
     * 3. Ensure minimum length requirements for both parts
     * 4. Check if the connection point needs a vowel (to avoid awkward consonant clusters)
     * 5. Combine the parts with appropriate vowel connection if needed
     * 6. Check if name is safe (non-sensitive)
     * 7. If safe, return; otherwise retry
     * 
     * @returns {string} A randomly generated name that has passed sensitivity checks
     */
    const generate = (): string => {
        let name = ''
        let attempts = 0

        // Continue generating until we get a safe name or reach max attempts
        while (attempts < MAX_ATTEMPTS) {
            // Select two random names from the source material
            const firstNameIdx = Math.floor(Math.random() * characters[0].length)
            const secondNameIdx = Math.floor(Math.random() * characters[0].length)

            // Ensure both selected names have at least 4 characters
            // This ensures we have enough material to create meaningful name parts
            if (
                characters[0][firstNameIdx].length < 4 ||
                characters[0][secondNameIdx].length < 4
            ) {
                attempts++
                continue
            }

            // Determine split points for extracting name parts
            // random[0] = index of first name
            // random[1] = split point in first name (where prefix ends)
            // random[2] = index of second name
            // random[3] = split point in second name (where suffix starts)
            const random: number[] = []
            random[0] = firstNameIdx
            random[2] = secondNameIdx

            // Calculate split point for first name (prefix)
            // Ensure minimum length of 3 characters for prefix (or 1 if name is short)
            random[1] = Math.floor(Math.random() * characters[0][random[0]].length)
            
            if (random[1] === 0) {
                random[1] = 1 // Ensure at least 1 character
            }
            
            if (random[1] < 3 && characters[0][random[0]].length > 4) {
                random[1] = 3 // Ensure minimum 3 characters for longer names
            }
            
            if (random[1] > 5) {
                random[1] = 5 // Cap at 5 characters for prefix
            }

            // Calculate split point for second name (suffix)
            // Ensure minimum length of 3 characters for suffix (or 1 if name is short)
            random[3] = Math.floor(Math.random() * characters[0][random[2]].length)
            
            if (random[3] === 0) {
                random[3] = 1 // Ensure at least 1 character
            }
            
            if (random[3] < 3 && characters[0][random[2]].length > 4) {
                random[3] = 3 // Ensure minimum 3 characters for longer names
            }
            
            if (random[3] > 5) {
                random[3] = 5 // Cap at 5 characters for suffix start point
            }

            // Prevent both parts from being too short (both split at position 1)
            if (random[1] === 1 && random[3] === 1) {
                random[3] = 3 // Make suffix longer
            }

            // Extract name parts
            const start = characters[0][random[0]].slice(0, random[1])
            const end = characters[0][random[2]].slice(random[3])

            // Get the last character of prefix and first character of suffix
            const lastChar = start.slice(-1)
            const firstChar = end.slice(0, 1)

            /**
             * Vowel Connection Logic
             * 
             * If both connection points are vowels, we may need to skip one
             * to avoid awkward double vowels. If neither is a vowel, we insert
             * a connecting vowel. If one is a vowel, we can connect directly.
             */
            if (
                characters[1].includes(lastChar) &&
                characters[1].includes(firstChar)
            ) {
                // Both are vowels - check if second character of suffix is also a vowel
                const secondChar = end.slice(1, 2)
                if (characters[1].includes(secondChar)) {
                    // Skip both first and second characters to avoid triple vowels
                    name = start + end.slice(2)
                } else {
                    // Skip only the first character to avoid double vowels
                    name = start + end.slice(1)
                }
            } else if (characters[1].includes(lastChar) || characters[1].includes(firstChar)) {
                // One is a vowel - can connect directly
                name = start + end
            } else {
                // Neither is a vowel - insert a connecting vowel
                const vowelIdx = Math.floor(Math.random() * characters[1].length)
                name = start + characters[1][vowelIdx] + end
            }

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

export default AnansiNames
