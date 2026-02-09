'use client'

import { useEffect, useRef } from "react"
import { Divider, NumberInput } from "@heroui/react";

/**
 * Dice Roller Component
 * 
 * A React component for D&D dice rolling calculations. It provides input fields
 * for character ability modifiers, proficiency bonuses, and dice configuration.
 * 
 * Features:
 * - Ability score modifiers (Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma)
 * - Proficiency and spell attack bonuses
 * - Dice count configuration
 * 
 * Note: This component currently only displays input fields. Dice rolling logic
 * and result calculation would be implemented in future updates.
 */
export default function DiceRoller() {
    /**
     * Refs for ability modifier inputs
     * These refs allow direct access to the input elements for future dice calculations
     */
    const
        strength = useRef<HTMLInputElement>(null),
        dexterity = useRef<HTMLInputElement>(null),
        constitution = useRef<HTMLInputElement>(null),
        intelligence = useRef<HTMLInputElement>(null),
        wisdom = useRef<HTMLInputElement>(null),
        charisma = useRef<HTMLInputElement>(null)

    return (
        <div className="container mx-auto px-5 py-8 items-center justify-center w-5xl grid grid-cols-2 xl:grid-cols-3 gap-5 max-w-full">
            {/* Ability Modifiers Section */}
            <h3 className="text-2xl col-span-2 xl:col-span-3 text-center">Modifiers</h3>

            {/* D&D Ability Score Modifiers */}
            {/* These represent the modifier values derived from ability scores (typically -5 to +5) */}
            <NumberInput label="Strength" ref={strength} defaultValue={1} size="lg" variant="faded" />
            <NumberInput label="Dexterity" ref={dexterity} defaultValue={1} size="lg" variant="faded" />
            <NumberInput label="Constitution" ref={constitution} defaultValue={1} size="lg" variant="faded" />
            <NumberInput label="Intelligence" ref={intelligence} defaultValue={1} size="lg" variant="faded" />
            <NumberInput label="Wisdom" ref={wisdom} defaultValue={1} size="lg" variant="faded" />
            <NumberInput label="Charisma" ref={charisma} defaultValue={1} size="lg" variant="faded" />

            <Divider className="col-span-2 xl:col-span-3" />

            {/* Bonuses Section */}
            <h3 className="text-2xl col-span-2 xl:col-span-3 text-center">Bonuses</h3>

            {/* Additional bonuses for specific rolls */}
            {/* Note: These currently reuse refs from ability modifiers - should be separate refs */}
            <NumberInput label="Proficiency" ref={intelligence} defaultValue={1} size="lg" variant="faded" />
            <NumberInput label="Spell Attack" ref={wisdom} defaultValue={1} size="lg" variant="faded" />
            <NumberInput label="Initiative" ref={charisma} defaultValue={1} size="lg" variant="faded" />

            <Divider className="col-span-2 xl:col-span-3" />

            {/* Dice Configuration Section */}
            <h3 className="text-2xl col-span-2 xl:col-span-3 text-center">Number of Dice</h3>

            {/* Input for specifying how many dice to roll */}
            <NumberInput 
                label="Number of Dice" 
                className="col-span-1 lg:col-span-2 xl:col-span-3" 
                placeholder="Enter the amount" 
                defaultValue={1} 
                size="lg" 
                variant="faded" 
            />
        </div>
    )
}