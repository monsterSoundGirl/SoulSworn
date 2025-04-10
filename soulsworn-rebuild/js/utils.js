/**
 * Soulsworn Utilities Module
 * Provides shared helper functions for the Soulsworn game UI.
 */

/**
 * Creates a standard slot DOM element.
 * @param {string} slotId - The unique ID for the slot.
 * @param {string} slotType - The type of slot (e.g., 'hand', 'grid', 'character', 'deck', 'discard').
 * @param {string|null} playerId - The player ID ('player1', 'player2') if applicable, otherwise null.
 * @param {object} coords - An object with x and y coordinates for positioning.
 * @returns {HTMLElement} The created slot element.
 * @throws {Error} If required parameters are missing or invalid.
 */
function createSlotElement(slotId, slotType, playerId, coords) {
    // TODO: Implement standardized slot element creation logic.
    // Placeholder implementation:
    if (!slotId || !slotType || !coords) {
        throw new Error('Missing required parameters for createSlotElement');
    }
    const element = document.createElement('div');
    element.id = slotId;
    element.classList.add('game-slot', `${slotType}-slot`); // Add standard and specific classes
    if (playerId) {
        element.dataset.playerId = playerId; // Add player ID if provided
    }
    element.dataset.slotType = slotType; // Add slot type

    // Apply basic styling (positioning handled separately)
    element.style.border = '1px dashed grey'; // Example style
    element.style.width = '100px'; // Example width
    element.style.height = '150px'; // Example height

    console.log(`Created slot: ${slotId} of type ${slotType}`); // Basic log for now
    return element;
}

/**
 * Applies absolute positioning to a DOM element based on coordinates.
 * @param {HTMLElement} element - The DOM element to position.
 * @param {object} coords - An object with x and y coordinates.
 * @throws {Error} If the element or coordinates are invalid.
 */
function positionElement(element, coords) {
    // TODO: Implement standardized positioning logic.
    // Placeholder implementation:
    // Use uppercase X and Y to match UIcoordinates.json structure
    if (!element || !coords || typeof coords.X !== 'number' || typeof coords.Y !== 'number') {
        throw new Error('Invalid parameters for positionElement: requires element and coords object with numeric X and Y properties.');
    }
    element.style.position = 'absolute';
    element.style.left = `${coords.X}px`;
    element.style.top = `${coords.Y}px`;
    console.log(`Positioned element ${element.id || '(no id)'} at (${coords.X}, ${coords.Y})`);
}

/**
 * Handles errors consistently, logging a message and optionally returning a fallback value.
 * @param {string} message - The error message to log.
 * @param {*} [fallback=null] - An optional fallback value to return.
 * @returns {*} The fallback value.
 */
function handleElementError(message, fallback = null) {
    // TODO: Implement standardized error handling (e.g., user notification).
    // Placeholder implementation:
    console.error(`Error: ${message}`);
    // Potentially add logic here for user-facing error display
    return fallback;
}

// Export functions if using modules in the future, otherwise they are globally available
export { createSlotElement, positionElement, handleElementError }; 