/**
 * Extract Utility Function
 * 
 * Copies properties from a source object to a target object.
 * This utility is useful for dynamically adding properties to objects
 * or global scope.
 * 
 * @template T - Type of the source data object
 * @param data - Source object containing properties to copy
 * @param where - Optional target object to copy properties into.
 *               If not provided, uses globalThis (global scope) or an empty object
 * @returns {void} This function mutates the target object and returns nothing
 * 
 * @example
 * const source = { name: "John", age: 30 };
 * const target = {};
 * extract(source, target);
 * // target now contains { name: "John", age: 30 }
 */
const extract = <T extends Record<string, unknown>>(
    data: T,
    where?: Record<string, unknown>
): void => {
    // Determine the target object: use provided 'where', or globalThis, or empty object
    const target = where || (typeof globalThis !== "undefined" ? globalThis : {})

    // Iterate through all properties in the source object
    for (const key in data) {
        // Only copy own properties (not inherited from prototype chain)
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            // Copy the property value to the target object
            (target as Record<string, unknown>)[key] = data[key]
        }
    }
}

export default extract