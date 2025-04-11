/**
 * Soulsworn Utilities Module
 * Provides shared helper functions for the Soulsworn game UI components.
 * These utilities standardize common operations like element creation, positioning,
 * and error handling across the application.
 * 
 * @module Utils
 */

/**
 * Creates a standardized game slot DOM element with appropriate attributes and styling.
 * All game slots (hand slots, grid slots, character slots, etc.) should be created using
 * this function to ensure consistent structure and behavior.
 * 
 * @param {string} slotId - The unique ID for the slot (must match IDs in GameState.boardSlots).
 * @param {string} slotType - The type of slot ('hand', 'grid', 'storyGrid', 'character', 'deckDraw', 'deckDiscard', 'mutable').
 * @param {string|null} playerId - The player ID if applicable (1-4), otherwise null for shared board slots.
 * @param {object} coords - An object with X and Y coordinates from UIcoordinates.json.
 * @param {number} coords.X - The X coordinate for absolute positioning.
 * @param {number} coords.Y - The Y coordinate for absolute positioning.
 * @returns {HTMLElement} The created slot element ready to be added to the DOM.
 * @throws {Error} If required parameters are missing or invalid.
 * 
 * @example
 * // Create a player hand slot
 * const handSlot = createSlotElement('PLAYER1_HAND1', 'hand', '1', {X: 100, Y: 500});
 * 
 * @example
 * // Create a story grid slot
 * const gridSlot = createSlotElement('GRID1', 'storyGrid', null, {X: 300, Y: 200});
 */
function createSlotElement(slotId, slotType, playerId, coords) {
    if (!slotId || !slotType || !coords) {
        throw new Error('Missing required parameters for createSlotElement');
    }
    
    const element = document.createElement('div');
    element.id = slotId;
    element.classList.add('game-slot', `${slotType}-slot`); // Add standard and specific classes
    
    // Add data attributes for query selectors and event handling
    if (playerId) {
        element.dataset.playerId = playerId;
    }
    element.dataset.slotType = slotType;
    element.dataset.slotId = slotId;

    // Apply basic styling (positioning handled separately by positionElement)
    element.style.border = '1px dashed grey';
    element.style.width = '100px';
    element.style.height = '150px';

    return element;
}

/**
 * Applies absolute positioning to a DOM element based on coordinates from UIcoordinates.json.
 * Should be used after creating elements with createSlotElement to place them on the game board.
 * 
 * @param {HTMLElement} element - The DOM element to position.
 * @param {object} coords - An object with X and Y coordinates.
 * @param {number} coords.X - The X coordinate for absolute positioning.
 * @param {number} coords.Y - The Y coordinate for absolute positioning.
 * @throws {Error} If the element or coordinates are invalid.
 * 
 * @example
 * // Position an element using coordinates from UIcoordinates.json
 * const slot = createSlotElement('GRID5', 'storyGrid', null, coords);
 * positionElement(slot, coords);
 * gameBoard.appendChild(slot);
 */
function positionElement(element, coords) {
    if (!element || !coords || typeof coords.X !== 'number' || typeof coords.Y !== 'number') {
        throw new Error('Invalid parameters for positionElement: requires element and coords object with numeric X and Y properties.');
    }
    
    element.style.position = 'absolute';
    element.style.left = `${coords.X}px`;
    element.style.top = `${coords.Y}px`;
}

/**
 * Handles errors consistently throughout the application, logging an error message
 * and optionally providing a fallback value to maintain application flow.
 * 
 * Use this function for non-critical errors where the application can continue
 * with a fallback option rather than throwing exceptions.
 * 
 * @param {string} message - The error message to log.
 * @param {*} [fallback=null] - An optional fallback value to return.
 * @returns {*} The fallback value.
 * 
 * @example
 * // Handle an error when creating a card element
 * try {
 *   return createCardElement(cardData);
 * } catch (error) {
 *   return handleElementError(`Failed to create card ${cardData.id}: ${error.message}`, document.createElement('div'));
 * }
 * 
 * @example
 * // Handle missing data without crashing
 * const data = fetchData() || handleElementError('Data fetch failed', defaultData);
 */
function handleElementError(message, fallback = null) {
    console.error(`Error: ${message}`);
    
    // In the future, this could include:
    // - User-visible error notifications
    // - Error logging to server
    // - Specific fallback behaviors based on error types
    
    return fallback;
}

// Export functions for module use throughout the application
export { createSlotElement, positionElement, handleElementError }; 