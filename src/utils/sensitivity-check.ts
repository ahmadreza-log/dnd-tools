/**
 * Sensitivity Check Utility
 * 
 * Checks if a word is safe to use by verifying it's not in a list of
 * inappropriate or sensitive words. This is used to filter generated names
 * to ensure they don't contain offensive content.
 * 
 * @param word - The word to check for sensitivity
 * @returns {boolean} Returns true if the word is safe (not in the sensitive words list),
 *                    false if the word is sensitive and should be filtered out
 * 
 * @example
 * SensitivityCheck("xkrath") // returns true (safe)
 * SensitivityCheck("ass") // returns false (sensitive)
 */
const SensitivityCheck = (word: string): boolean => {
    /**
     * List of sensitive/inappropriate words that should be filtered out
     * This list includes profanity, slurs, and other inappropriate terms
     */
    const words = ["alah", "allah", "anal", "anilingus", "anus", "apeshit", "arse", "arsehole", "ass", "asshole", "assmunch", "autoerotic", "babeland", "balls", "ballsack", "bangbros", "bareback", "barenaked", "bastard", "bastardo", "bastinado", "beaner", "beaners", "bestiality", "biatch", "bigtits", "bimbos", "birdlock", "bitch", "bitches", "black", "bloody", "blowjob", "blumpkin", "bollock", "bollocks", "bollok", "bondage", "boner", "boob", "boobs", "bugger", "bukkake", "bulldyke", "bullshit", "bum", "bunghole", "busty", "butt", "buttcheeks", "butthole", "buttplug", "cameltoe", "camgirl", "camslut", "camwhore", "clit", "clitbeard", "clitoris", "cloaka", "clusterfuck", "cock", "cocks", "coon", "coons", "cornhole", "crap", "creampie", "crystalnight", "crystal night", "cum", "cumming", "cunt", "damn", "darkie", "daterape", "deepthroat", "dick", "dildo", "doggy", "dolcett", "domination", "dominatrix", "dommes", "dryhump", "dyke", "ecchi", "ejaculation", "erotic", "erotism", "escort", "eunuch", "fag", "fags", "fagget", "faggets", "faggit", "faggits", "faggot", "faggots", "faggut", "faghet", "faghit", "faghot", "faghut", "fecal", "feck", "felch", "felching", "fellate", "fellatio", "feltch", "femdom", "fetish", "figging", "fingerbang", "fingering", "fisting", "flange", "footjob", "frotting", "fuck", "fuckin", "fucking", "fucktard", "fucktards", "fudgepacker", "futanari", "gangbang", "gaysex", "genitals", "goatcx", "goatse", "god", "goddamn", "gokkun", "goodpoop", "googirl", "gook", "goregasm", "grope", "groupsex", "guro", "handjob", "hardcore", "hell", "hentai", "homo", "homoerotic", "honkey", "hooker", "humping", "incest", "intercourse", "jackoff", "jailbait", "jerk", "jerkoff", "jigaboo", "jiggaboo", "jiggerboo", "jizz", "juggs", "kike", "kinbaku", "kinkster", "kinky", "knobbing", "knobend", "kum", "labia", "lmao", "lmfao", "lolita", "maleass", "masturbate", "milf", "muff", "nambla", "nawashi", "nazi", "neeger", "neegger", "negger", "negro", "neonazi", "nieger", "niegger", "nig", "niga", "nigar", "niger", "nigga", "nighar", "nigah", "niggah", "nyg", "nyga", "nygah", "nygger", "nyggah", "nyggar", "nyger", "nygra", "niggar", "niggas", "nigir", "niggir", "nigirr", "niggirr", "niggaz", "nigger", "niggers", "nigges", "niggir", "niggis", "niggor", "niggos", "niggur", "niggus", "niggrer", "niggret", "nigher", "nighes", "nignog", "nigra", "nimphomania", "nipple", "nipples", "nude", "nudity", "nympho", "nymphomania", "obama", "octopussy", "omg", "omorashi", "oral", "orgasm", "orgy", "paedo", "paki", "panties", "panty", "pedo", "pegging", "penis", "pis", "piss", "pissing", "pisspig", "playboy", "ponyplay", "poof", "poon", "poontang", "poop", "porn", "porno", "prick", "pube", "pubes", "punany", "pussy", "queaf", "queef", "queer", "quim", "raghead", "rape", "raping", "rapist", "rectum", "rimjob", "rimming", "sadism", "santorum", "scat", "schlong", "scissoring", "scrotum", "semen", "sex", "sexo", "sexy", "sexx", "sexxy", "sexei", "sexxei", "shaved", "shemale", "shibari", "shit", "shitblimp", "shitty", "shota", "shrimping", "skeet", "slanteye", "slut", "smegma", "smut", "snatch", "sodomize", "sodomy", "spic", "splooge", "spooge", "spunk", "squaw", "strapon", "suck", "sucks", "suicide", "sultry", "swastika", "swinger", "threesome", "throating", "tiits", "tit", "tits", "titties", "titty", "topless", "tosser", "towelhead", "trani", "tranie", "tranni", "trannie", "tranny", "trany", "trennie", "tubgirl", "turd", "tushy", "twat", "twink", "twinkie", "upskirt", "urethra", "urophilia", "vagina", "vibrator", "voyeur", "vulva", "wank", "wetback", "whore", "wtf", "yaoi", "yiffy", "stillborn"];
    
    // Convert word to lowercase for case-insensitive comparison
    const name = word.toLowerCase()
    
    // Return true if word is NOT in the sensitive words list (safe to use)
    // Return false if word IS in the list (should be filtered out)
    return words.indexOf(name) === -1
}

export default SensitivityCheck