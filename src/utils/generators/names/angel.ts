/**
 * Configuration constants for name generation
 * These values control the behavior of the Angel name generator
 */
const COUNT = 10 // Number of names to generate per gender

/**
 * API Route Handler for generating random Angel names
 * 
 * This endpoint generates a specified number of random angel names
 * organized by gender (male, female, neutral). Unlike other generators,
 * this uses pre-defined lists of angel names rather than generating
 * them algorithmically.
 * 
 * The generator supports three gender categories:
 * - Male: Masculine angel names
 * - Female: Feminine angel names  
 * - Neutral: Gender-neutral angel names
 * 
 * @returns {Response} JSON response containing an object with gender keys and arrays of generated names
 * 
 * @example
 * GET /api/names/angel
 * Response: {
 *   "neutral": ["Gabriel", "Michael", ...],
 *   "male": ["Michael", "Raphael", ...],
 *   "female": ["Ariel", "Seraph", ...]
 * }
 */
const AngelNames = (): Response => {
    /**
     * Pre-defined lists of angel names organized by gender
     * 
     * Structure:
     * - Position 0: Male angel names
     * - Position 1: Neutral/gender-neutral angel names
     * - Position 2: Female angel names
     * 
     * These lists contain traditional and mythological angel names
     * from various religious and cultural sources.
     */
    const list: string[][] = [
        ["Aarin", "Abaddon", "Abalim", "Abasdarhon", "Abbadon", "Abdiel", "Abrariel", "Abraxos", "Adellum", "Adimus", "Adnachiel", "Adoel", "Adonael", "Adriel", "Afriel", "Aithen", "Akhazriel", "Akriel", "Ambriel", "Amitiel", "Amnayelth", "Amriel", "Anael", "Anahel", "Anaiel", "Anak", "Anakim", "Anaphiel", "Anapiel", "Anauel", "Anpiel", "Ansiel", "Aphaeleon", "Appoloin", "Appolyon", "Arael", "Arakiba", "Aralim", "Araqiel", "Araquiel", "Arariel", "Araton", "Archon", "Arioch", "Ariuk", "Armaros", "Asmodei", "Asmodel", "Asteraoth", "Atheed", "Azazel", "Azrael", "Azriel", "Baglis", "Ballaton", "Balthial", "Balthioul", "Barachiel", "Baradiel", "Barakiel", "Baraqiel", "Barattiel", "Barbelo", "Barbiel", "Barchiel", "Bariel", "Barquiel", "Barrattiel", "Bartholomew", "Baruchiel", "Bazazath", "Bethor", "Boamiel", "Boel", "Briathos", "Cadriel", "Cahethal", "Camael", "Camiel", "Caphriel", "Cassiel", "Castiel", "Cathetel", "Cerviel", "Chamuel", "Charoum", "Chasan", "Chayliel", "Cherubim", "Conah", "Dabriel", "Dagiel", "Dalquiel", "Damabiath", "Daniel", "Dardariel", "Diniel", "Domiel", "Douma", "Dubbiel", "Ecanus", "Elijah", "Elyon", "Emmanuel", "Empyrean", "Erathaol", "Erelim", "Eremiel", "Ezekiel", "Ezequiel", "Forcas", "Forfax", "Gabriel", "Gadiel", "Gadreel", "Gadriel", "Gagallim", "Gagiel", "Galgaliel", "Galizur", "Gazardiel", "Geburatiel", "Germael", "Gibborim", "Grigori", "Habriel", "Hadariel", "Hadramiel", "Hadraniel", "Hadriel", "Hamael", "Hamaliel", "Hamied", "Hamon", "Haniel", "Harahel", "Haroth", "Harut", "Hasdiel", "Hashmal", "Hasmal", "Hayliel", "Hayyel", "Heman", "Herchel", "Hermesiel", "Hochmael", "Hofniel", "Humatiel", "Humiel", "Iahhel", "Iaoel", "Iaoth", "Inian", "Inias", "Ishim", "Israfel", "Israfiel", "Israfil", "Ithuriel", "Izrail", "Jabril", "Jael", "Jahoel", "Jamaerah", "Jaoel", "Jeduthun", "Jehoel", "Jehudiel", "Jerahmeel", "Jeremiel", "Joshua", "Kabshiel", "Kadmiel", "Kafziel", "Kakabel", "Kalaziel", "Karael", "Karlel", "Kasbiel", "Kemuel", "Kerubiel", "Kezef", "Khamael", "Labbiel", "Lahabiel", "Leo", "Machidiel", "Madan", "Mahanaim", "Malachi", "Malakh", "Malchediel", "Malik", "Manakel", "Mariuk", "Maro", "Melkyal", "Mendrion", "Micah", "Michael", "Mihael", "Mihr", "Mikhal", "Mitatron", "Morael", "Morieshal", "Munkar", "Munkir", "Mydaiel", "Naaririel", "Nahaliel", "Nakir", "Nanael", "Narcariel", "Nasargiel", "Nathanael", "Nathaniel", "Nelchael", "Nephilim", "Nisroc", "Omael", "Omniel", "Onafiel", "Ongkanon", "Onoel", "Ophaniel", "Ophanim", "Ophiel", "Orphamiel", "Osmadiel", "Pahadron", "Pamyel", "Paschar", "Pathiel", "Peliel", "Peniel", "Perpetiel", "Phaleg", "Phanuel", "Phul", "Pravuil", "Prentum", "Qaphsiel", "Qaspiel", "Quabriel", "Rabdos", "Rachmiel", "Radueriel", "Raduriel", "Rahatiel", "Rahmiel", "Ramiel", "Rampel", "Raphael", "Rasiel", "Rathanael", "Razael", "Raziel", "Rehael", "Remiel", "Remliel", "Rhamiel", "Ridwan", "Rikbiel", "Risnuch", "Rizoel", "Rogziel", "Rostiello", "Rufeal", "Ruhiel", "Ruman", "Sabaoth", "Sabathiel", "Sablo", "Sabrael", "Sabrathan", "Sachael", "Sachiel", "Salathiel", "Samael", "Samandiriel", "Samandriel", "Samkiel", "Sammael", "Samuel", "Sandalphon", "Sandolphon", "Saniel", "Sarandiel", "Sareash", "Sariel", "Satqiel", "Sealtiel", "Semalion", "Semangelaf", "Semsapiel", "Semyaza", "Seraph", "Seraphiel", "Shamsiel", "Shepherd", "Shoftiel", "Sidqiel", "Sidriel", "Simiel", "Sizouze", "Sorath", "Sorush", "Stadiel", "Suriel", "Tabbris", "Tabris", "Tadhiel", "Tagas", "Tamiel", "Tarshishim", "Tartys", "Tatrasiel", "Tearney", "Telantes", "Temeluch", "Temlakos", "Teriesh", "Theliel", "Theo", "Tubiel", "Turiel", "Tzadkiel", "Usiel", "Usiu", "Uzziel", "Valoel", "Varhmiel", "Vequaniel", "Verchiel", "Virgil", "Vohamanah", "Vretiel", "Xaphan", "Xathanael", "Yabbashael", "Yahoel", "Yefefiah", "Yehudiah", "Yerachmiel", "Yeshamiel", "Yofiel", "Zaapiel", "Zaazenach", "Zabkiel", "Zacharael", "Zachariah", "Zachariel", "Zachriel", "Zadkeil", "Zadkiel", "Zagzagel", "Zakum", "Zakzakiel", "Zambrim", "Zaphiel", "Zaphkiel", "Zaphreal", "Zarall", "Zazriel", "Zehanpuryu", "Zephon", "Zerachiel", "Zophiel", "Zuphlas", "Zuriel"],
        ["Aarin", "Adellum", "Adoel", "Adriel", "Ambriel", "Amitiel", "Amnayel", "Amriel", "Anael", "Anahel", "Anaiel", "Anaphiel", "Anapiel", "Anauel", "Arael", "Araqiel", "Araquiel", "Arariel", "Ariuk", "Asteraoth", "Azazel", "Azrael", "Azriel", "Barbiel", "Boamiel", "Boel", "Cadriel", "Caphriel", "Cassiel", "Cathetel", "Cerviel", "Chasan", "Conah", "Dabriel", "Dardariel", "Diniel", "Domiel", "Douma", "Dubbiel", "Empyrean", "Gabriel", "Gadiel", "Gadreel", "Gadriel", "Gagiel", "Galgaliel", "Geburatiel", "Germael", "Habriel", "Hadariel", "Hadramiel", "Hadraniel", "Hadriel", "Hamaliel", "Haniel", "Harahel", "Hayliel", "Hayyel", "Humatiel", "Humiel", "Iahhel", "Iaoel", "Iaoth", "Ithuriel", "Izrail", "Jabril", "Jamaerah", "Jaoel", "Kakabel", "Karael", "Karlel", "Labbiel", "Lahabiel", "Madan", "Mahanaim", "Maroth", "Micah", "Mihr", "Morael", "Mydaiel", "Naaririel", "Nahaliel", "Nanael", "Omniel", "Onoel", "Ophanim", "Ophiel", "Pamyel", "Peliel", "Peniel", "Perpetiel", "Quabriel", "Radueriel", "Raduriel", "Rahatiel", "Rahmiel", "Ramiel", "Rehael", "Remiel", "Remliel", "Rhamiel", "Ruhiel", "Sabrael", "Sachael", "Sachiel", "Salathiel", "Saniel", "Sarandiel", "Sareash", "Sariel", "Semyaza", "Seraph", "Shoftiel", "Sizouze", "Suriel", "Tabbris", "Tabris", "Tadhiel", "Tartys", "Tatrasiel", "Telantes", "Theliel", "Usiel", "Usiu", "Valoel", "Vequaniel", "Verchiel", "Virgil", "Vohamanah", "Vretiel", "Xathanael", "Yahoel", "Yofiel", "Zarall", "Zazriel", "Zophiel", "Zuriel"],
        ["Aarin", "Adellum", "Adelphi", "Adoel", "Adriel", "Aeshma", "Agla", "Ahiah", "Aliyah", "Amaliel", "Ambriel", "Amitiel", "Amnayel", "Amriel", "Anael", "Anahel", "Anahita", "Anaiel", "Anaphiel", "Anapiel", "Anauel", "Andromeda", "Arael", "Araqiel", "Araquiel", "Arariel", "Ariel", "Ariuk", "Armaita", "Asaph", "Asariel", "Asheal", "Ashliel", "Asteraoth", "Asuriel", "Atrugiel", "Ayil", "Azazel", "Azrael", "Azriel", "Barbiel", "Boamiel", "Boel", "Breenelle", "Cadriel", "Caphriel", "Cassiel", "Cathetel", "Cerviel", "Charmeine", "Chasan", "Conah", "Coretha", "Dabriel", "Dahlia", "Daphiel", "Dardariel", "Dazielle", "Dina", "Diniel", "Domiel", "Douma", "Dubbiel", "Duma", "Dumah", "Eae", "Eiael", "Elemiah", "Empyrean", "Ephemera", "Eshreal", "Esme", "Esther", "Exousia", "Felice", "Feota", "Gabriel", "Gadiel", "Gadreel", "Gadriel", "Gagiel", "Galgaliel", "Gamaliel", "Gatriel", "Gavreel", "Geburatiel", "Germael", "Gezuriya", "Guriel", "Gzrel", "Haamiah", "Habriel", "Hadariel", "Hadramiel", "Hadraniel", "Hadriel", "Hael", "Hagith", "Halaliel", "Hamaliel", "Haniel", "Hannah", "Hanniah", "Harahel", "Hayliel", "Hayyel", "Haziel", "Hecca", "Hemah", "Hester", "Humatiel", "Humiel", "Iahhel", "Iaoel", "Iaoth", "Inasyah", "Iofiel", "Irin", "Isda", "Ithuriel", "Izrail", "Jabril", "Jamaerah", "Jaoel", "Jefischa", "Jophiel", "Kakabel", "Kalmiya", "Karael", "Karlel", "Kasdeja", "Kristiel", "Labbiel", "Lahabiel", "Lailah", "Laurette", "Lavina", "Layla", "Laylah", "Liel", "Liwet", "Madan", "Mahanaim", "Maion", "Malaliel", "Maliel", "Mariel", "Marmaroth", "Maroth", "Mastema", "Matariel", "Mattia", "Micah", "Michelle", "Mihr", "Minda", "Miniel", "Morael", "Mumiah", "Mumiel", "Muriel", "Mydaiel", "Naaririel", "Nahaliel", "Nanael", "Naomi", "Naya'il", "Nemamiah", "Neriah", "Nuriel", "Omniel", "Onoel", "Ooniemme", "Ophanim", "Ophiel", "Oriash", "Oriel", "Orifiel", "Oriphiel", "Ouriel", "Pahaliah", "Pamyel", "Peliel", "Penemu", "Penemuel", "Peniel", "Perpetiel", "Pesagniyah", "Phounebiel", "Portia", "Pronoia", "Purah", "Puriel", "Qaddisin", "Quabriel", "Rachel", "Rachiel", "Radueriel", "Raduriel", "Raguel", "Rahatiel", "Rahmiel", "Ramiel", "Rehael", "Remiel", "Remliel", "Rhamiel", "Ruhiel", "Sabrael", "Sachael", "Sachiel", "Sahaqiel", "Salathiel", "Saniel", "Sansanvi", "Sanvi", "Sarakiel", "Sarandiel", "Saraqael", "Saraquiel", "Sareash", "Sariel", "Semyaza", "Seraph", "Shoftiel", "Sizouze", "Sofiel", "Sopheriel", "Sophia", "Sraosha", "Suriel", "Sybil", "Tabbris", "Tabris", "Tadhiel", "Taharial", "Tartys", "Tatrasiel", "Telantes", "Temperance", "Theliel", "Ubaviel", "Umabel", "Uriel", "Usiel", "Usiu", "Valoel", "Vequaniel", "Verchiel", "Virgil", "Vohamanah", "Vretiel", "Xathanael", "Yahoel", "Yofie", "Zarall", "Zazriel", "Zophiel", "Zuriel"]
    ]

    /**
     * Generates a single random angel name based on gender
     * 
     * This function selects a random name from the appropriate gender list.
     * Unlike other generators, this does not use algorithmic generation or
     * sensitivity checks since all names are pre-approved.
     * 
     * @param gender - The gender type for name generation ("male", "female", or "neutral")
     * @returns {string} A randomly selected angel name from the appropriate list
     * 
     * @example
     * generate("male") // Returns: "Michael"
     * generate("female") // Returns: "Ariel"
     * generate("neutral") // Returns: "Gabriel"
     */
    const generate = (gender: string): string => {
        let name = ''
        let number

        switch (gender) {
            case "male":
                // Select random name from male angel names list
                number = Math.floor(Math.random() * list[0].length)
                name = list[0][number]
                break
            case "female":
                // Select random name from female angel names list
                number = Math.floor(Math.random() * list[2].length)
                name = list[2][number]
                break
            default:
                // Select random name from neutral angel names list
                number = Math.floor(Math.random() * list[1].length)
                name = list[1][number]
        }

        return name
    }

    /**
     * Generate the requested number of names for each gender
     * Each gender gets COUNT names, selected randomly from their respective lists
     */
    const names: Record<string, string[]> = {
        neutral: [],
        male: [],
        female: []
    }
    
    // Generate neutral names
    for (let i = 0; i < COUNT; i++) {
        names.neutral[i] = generate('neutral')
    }
    
    // Generate male names
    for (let i = 0; i < COUNT; i++) {
        names.male[i] = generate('male')
    }
    
    // Generate female names
    for (let i = 0; i < COUNT; i++) {
        names.female[i] = generate('female')
    }

    // Return the list of generated names as JSON
    return Response.json(names)
}

export default AngelNames