'use client'

import { Autocomplete, AutocompleteItem, AutocompleteSection, Button, Listbox, ListboxItem } from '@heroui/react'
import { CategoryItem } from '@/types/types'
import slugify from 'slugify'
import { Key, useState, useMemo } from 'react'
import { LuCopy } from 'react-icons/lu'
import CopyToClipboard from '@/utils/copy-to-clipboard'
import { titleCase } from "title-case";
import { generateNames } from '@/utils/name-generators';

/**
 * Name Generator Component
 * 
 * A React component that allows users to select a name category and generate
 * random names for that category. The component displays generated names in a
 * list with copy-to-clipboard functionality.
 * 
 * Features:
 * - Category selection via autocomplete dropdown
 * - Dynamic name generation based on selected category
 * - Copy-to-clipboard for individual names
 * - Sorted category items for better UX
 */
const NameGenerator = () => {
    /**
     * State Management
     * 
     * items: Stores generated names organized by gender
     * Format: { neutral: string[], male?: string[], female?: string[] }
     * 
     * value: Stores the currently selected category (slugified name type)
     * Used for regenerating names and displaying in the button
     */
    const [items, SetItems] = useState<Record<string, string[]>>({ neutral: [] })
    const [value, SetValue] = useState<string>('')

    /**
     * Name Lookup Maps
     * 
     * Creates lookup maps to convert React keys to actual names for copy functionality.
     * 
     * Problem:
     * - React requires unique keys for list items
     * - We use format: "gender-index-name" (e.g., "male-0-Boamiel")
     * - But ListboxItem's onAction receives the key, not the name
     * - We need to convert the key back to the actual name for copying
     * 
     * Solution:
     * - Build maps that map keys to actual names
     * - Use useMemo to only rebuild when items change (performance optimization)
     * - Each map: Map<"gender-index-name", "actual-name">
     * 
     * Why useMemo?
     * - Maps are only rebuilt when items change
     * - Prevents unnecessary recalculations on every render
     * - Improves performance, especially with large name lists
     * 
     * @example
     * // Key: "male-0-Boamiel" -> Name: "Boamiel"
     * // Key: "neutral-5-Gabriel" -> Name: "Gabriel"
     */
    const nameMaps = useMemo(() => {
        const maleMap = new Map<string, string>()
        const neutralMap = new Map<string, string>()
        const femaleMap = new Map<string, string>()

        // Build male names map: "male-{index}-{name}" -> "name"
        items.male?.forEach((item, index) => {
            maleMap.set(`male-${index}-${item}`, item)
        })
        
        // Build neutral names map: "neutral-{index}-{name}" -> "name"
        items.neutral?.forEach((item, index) => {
            neutralMap.set(`neutral-${index}-${item}`, item)
        })
        
        // Build female names map: "female-{index}-{name}" -> "name"
        items.female?.forEach((item, index) => {
            femaleMap.set(`female-${index}-${item}`, item)
        })

        return { maleMap, neutralMap, femaleMap }
    }, [items.male, items.neutral, items.female])

    /**
     * Category definitions for name generation
     * Each category contains a list of name types that can be generated
     * Categories are organized by theme (e.g., "Fantasy & Folklores", "Real Names")
     */
    const categories: Record<string, CategoryItem[]> = {
        "Fantasy & Folklores": [
            "Alien",
            "Amazon",
            "Anansi",
            "Angel",
            "Animal Species",
            "Animatronic",
            "Anime Character",
            "Anthousai",
            "Anzû",
            "Apocalypse/Mutant",
            "Artificial Intelligence",
            "Bandit",
            "Banshee",
            "Barbarian",
            "Basilisk",
            "Birdfolk",
            "Bluecap",
            "Bounty Hunter",
            "Brownie",
            "Caladrius",
            "Cat People",
            "Cavemen",
            "Centaur",
            "Cerberus",
            "Christmas Elf",
            "Cockatrice",
            "Code",
            "Cowboy/Girl",
            "Cyberpunk",
            "Dark Elf",
            "Death",
            "Death Worm",
            "Demon"
        ],
        "Real Names": [
            "African-American",
            "Afrikaans",
            "Akan",
            "Algerian",
            "Amazigh",
            "Arabic / Muslim",
            "Basotho",
            "Biblical",
            "Cameroonian",
            "Egyptian (Ancient)",
            "Egyptian (Modern)",
            "Eritrean"
        ]
    }

    /**
     * Generates names based on the selected category
     * 
     * This function is called when a user selects a category from the autocomplete
     * or clicks the regenerate button. It uses client-side name generation (no API
     * routes required), making it compatible with static export.
     * 
     * Process:
     * 1. Validate that a category is selected
     * 2. Update the selected value state (for display and regeneration)
     * 3. Call the client-side generator function (generateNames)
     * 4. Update the items state with the generated names
     * 5. Handle errors gracefully (reset state and log error)
     * 
     * The generated names are organized by gender:
     * - neutral: Always present (array of names)
     * - male: Optional (if generator supports it)
     * - female: Optional (if generator supports it)
     * 
     * @param value - The selected category key (slugified name type from autocomplete)
     *                Examples: "alien", "amazon", "anansi", "angel"
     * 
     * @example
     * // User selects "Alien" from dropdown
     * // value = "alien" (slugified)
     * // Calls generateNames("alien")
     * // Updates items with: { neutral: ["xkrath", "q'varn", ...] }
     */
    const GetNames = async (value: Key | null) => {
        // Early return if no value is provided
        // This prevents unnecessary API calls and state updates
        if (!value) return

        // Update the selected value state
        // This is used for:
        // - Displaying in the regenerate button
        // - Regenerating names when button is clicked
        SetValue(String(value))

        try {
            // Generate names directly using the client-side generator function
            // The value is already slugified from the autocomplete key
            // generateNames returns Promise<Record<string, string[]>>
            // Format: { neutral: [...], male?: [...], female?: [...] }
            const names = await generateNames(String(value))

            // Update the items state with the generated names
            // This triggers a re-render and displays the names in the UI
            SetItems(names)

        } catch (error) {
            // Reset state on error to prevent showing stale data
            // Clear both items and selected value
            SetItems({ neutral: [] })
            SetValue('')
            
            // Log the error for debugging purposes
            // In production, you might want to show a user-friendly error message
            console.error('Error generating names:', error)
        }
    }

    return (
        <div className="container mx-auto px-5 py-8 items-center justify-center max-w-full">
            {/* Category Selection Section */}
            <div className="flex items-center gap-4 w-xl mx-auto max-md:flex-col max-w-full">
                {/* Autocomplete dropdown for selecting name category */}
                <Autocomplete
                    className="max-w-full"
                    label="Select Category"
                    size="sm"
                    variant="faded"
                    onSelectionChange={GetNames}>
                    {/* Render each category as a section */}
                    {Object.keys(categories).map((category) => (
                        <AutocompleteSection
                            title={category}
                            key={category}
                            classNames={{ heading: "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small" }}>
                            {/* Render sorted items within each category */}
                            {/* Sort items alphabetically for better UX */}
                            {[...categories[category]].sort().map((item) => (
                                <AutocompleteItem
                                    key={slugify(item, { replacement: '-', lower: true, strict: true })}>
                                    {item}
                                </AutocompleteItem>
                            ))}
                        </AutocompleteSection>
                    ))}
                </Autocomplete>
                {/* Regenerate button - only shown when names are available */}
                {items.neutral && items.neutral.length > 0 && (
                    <Button
                        className='shrink-0 max-md:w-full'
                        size='lg'
                        variant='faded'
                        radius='sm'
                        aria-label={`Regenerate ${value} names`}
                        onPress={() => GetNames(value)}>
                        Get {value} Names
                    </Button>
                )}
            </div>

            {/* Generated Names List Section */}
            {/* Only render when names have been generated */}
            {items.neutral && items.neutral.length > 0 && (
                <div className='flex justify-center gap-4 mt-4 max-md:flex-col'>
                    {items.neutral.length > 0 && (
                        <div className='w-xl max-md:w-full rounded-small border-medium border-default-200'>
                            <div className='px-4 py-3 border-b-medium border-b-default-200 bg-default-200'>Neutral Names</div>
                            {/* Render each generated name as a list item with copy functionality */}
                            <Listbox
                                aria-label="Actions"
                                className='p-2'
                                onAction={(key) => {
                                    const name = nameMaps.neutralMap.get(String(key)) || String(key)
                                    CopyToClipboard(titleCase(name))
                                }}>
                                {items.neutral.map((item, index) => (
                                    <ListboxItem
                                        key={`neutral-${index}-${item}`}
                                        classNames={{ title: 'text-lg' }}
                                        endContent={<LuCopy />}>
                                        {/* Display name in title case for better readability */}
                                        {titleCase(item)}
                                    </ListboxItem>
                                ))}
                            </Listbox>
                        </div>
                    )}

                    {items.male && items.male.length > 0 && (
                        <div className='w-xl max-md:w-full rounded-small border-medium border-sky-800'>
                            <div className='px-4 py-3 border-b-medium border-b-sky-800 bg-sky-800'>Male Names</div>
                            {/* Render each generated name as a list item with copy functionality */}
                            <Listbox
                                aria-label="Actions"
                                className='p-2'
                                onAction={(key) => {
                                    const name = nameMaps.maleMap.get(String(key)) || String(key)
                                    CopyToClipboard(titleCase(name))
                                }}>
                                {items.male.map((item, index) => (
                                    <ListboxItem
                                        key={`male-${index}-${item}`}
                                        classNames={{ title: 'text-lg' }}
                                        endContent={<LuCopy />}>
                                        {/* Display name in title case for better readability */}
                                        {titleCase(item)}
                                    </ListboxItem>
                                ))}
                            </Listbox>
                        </div>
                    )}



                    {items.female && items.female.length > 0 && (
                        <div className='w-xl max-md:w-full rounded-small border-medium border-fuchsia-800'>
                            <div className='px-4 py-3 border-b-medium border-b-fuchsia-800 bg-fuchsia-800'>Female Names</div>
                            {/* Render each generated name as a list item with copy functionality */}
                            <Listbox
                                aria-label="Actions"
                                className='p-2'
                                onAction={(key) => {
                                    const name = nameMaps.femaleMap.get(String(key)) || String(key)
                                    CopyToClipboard(titleCase(name))
                                }}>
                                {items.female.map((item, index) => (
                                    <ListboxItem
                                        key={`female-${index}-${item}`}
                                        classNames={{ title: 'text-lg' }}
                                        endContent={<LuCopy />}>
                                        {/* Display name in title case for better readability */}
                                        {titleCase(item)}
                                    </ListboxItem>
                                ))}
                            </Listbox>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default NameGenerator