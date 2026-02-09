import { addToast } from "@heroui/react"

/**
 * Copy to Clipboard Utility Function
 * 
 * Copies a string value to the system clipboard and displays a success toast notification.
 * This function uses the modern Clipboard API with ClipboardItem for better browser support.
 * 
 * @param value - The string value to copy to the clipboard
 * @returns {Promise<void>} A promise that resolves when the copy operation completes
 * 
 * @example
 * // Copy a name to clipboard
 * await CopyToClipboard("Gandalf");
 * // Shows toast: "Copied! Now You Can Use It!"
 * 
 * @throws {Error} May throw an error if clipboard access is denied or unavailable
 */
const CopyToClipboard = async (value: string): Promise<void> => {
    // Display a success toast notification
    addToast({
        title: "Copied!",
        description: "Now You Can Use It!",
        variant: 'solid',
        classNames: {
            base: "bg-orange-700 dark:bg-background shadow-sm text-white",
            description: "text-white",
            icon: "w-6 h-6 fill-current",
        }
    })

    // Copy the value to clipboard using the Clipboard API
    // Using writeText for simplicity and better browser support
    await navigator.clipboard.writeText(value);
}

export default CopyToClipboard