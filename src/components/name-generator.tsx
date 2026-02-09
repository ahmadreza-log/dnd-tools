'use client'

import { Autocomplete, AutocompleteItem, AutocompleteSection, Button, Listbox, ListboxItem } from '@heroui/react'
import { CategoryItem } from '@/types/types'
import slugify from 'slugify'
import { Key, useState } from 'react'
import { LuCopy } from 'react-icons/lu'
import CopyToClipboard from '@/utils/copy-to-clipboard'
import { titleCase } from "title-case";

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
    // State for storing generated names
    const [items, SetItems] = useState<string[]>([])
    // State for storing the currently selected category value
    const [value, SetValue] = useState<string>('')

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
     * Fetches generated names from the API based on the selected category
     * 
     * This function is called when a user selects a category from the autocomplete.
     * It makes a request to the API endpoint with the slugified category name,
     * then updates the component state with the generated names.
     * 
     * @param value - The selected category key (slugified name type)
     */
    const GetNames = async (value: Key | null) => {
        // Early return if no value is provided
        if (!value) return

        // Update the selected value state
        SetValue(String(value))

        try {
            // Fetch names from the API endpoint
            // The value is already slugified from the autocomplete key
            const request = await fetch(`/api/names/${value}`)

            // Check if the request was successful
            if (!request.ok) {
                console.error('Failed to fetch:', request.statusText)
                return
            }

            // Parse the JSON response containing the generated names
            const response = await request.json()

            console.log(response)

            // Update the items state with the generated names
            SetItems(response)

        } catch (error) {
            // Reset state on error and log the error
            SetItems([])
            SetValue('')
            console.error('Error fetching names:', error)
        }
    }

    return (
        <div className="container mx-auto px-5 py-8 items-center justify-center w-xl max-w-full">
            {/* Category Selection Section */}
            <div className="flex w-full items-center gap-2">
                {/* Autocomplete dropdown for selecting name category */}
                <Autocomplete
                    className="max-w-full"
                    label="Select an animal"
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
                {items.length > 0 && (
                    <Button 
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
            {items.length > 0 && (
                <div className='w-full px-1 py-2 mt-2 rounded-small border-medium border-default-200 dark:border-default-100'>
                    {/* Render each generated name as a list item with copy functionality */}
                    {Object.values(items).map((item, index) => (
                        <Listbox 
                            key={index} 
                            aria-label="Actions" 
                            onAction={(key) => CopyToClipboard(String(key))}>
                            <ListboxItem 
                                key={titleCase(item)} 
                                classNames={{ title: 'text-lg' }} 
                                endContent={<LuCopy />}>
                                {/* Display name in title case for better readability */}
                                {titleCase(item)}
                            </ListboxItem>
                        </Listbox>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NameGenerator