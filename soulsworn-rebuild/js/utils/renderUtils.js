/**
 * @module renderUtils
 * @description Provides utility functions for common rendering tasks across components,
 * including element styling, validation, and creating/positioning slots and cards.
 * This module aims to reduce code duplication and standardize rendering logic.
 *
 * @requires module:utils
 * @requires module:components/Card
 */

import { createSlotElement, positionElement, handleElementError } from '../utils.js';
import { createCardElement } from '../components/Card.js';

/**
 * Applies standard absolute positioning and optional z-index styling to a DOM element.
 * Relies on the positionElement utility for setting top/left properties.
 *
 * @function applyElementStyling
 * @param {HTMLElement} element - The DOM element to style.
 * @param {object} coords - An object with numeric `X` and `Y` coordinates.
 * @param {number} [zIndex=1] - The z-index value to apply (defaults to 1).
 * @throws {Error} If element or coords are invalid (via positionElement).
 * @returns {void}
 *
 * @example
 * const div = document.createElement('div');
 * const coordinates = { X: 100, Y: 200 };
 * applyElementStyling(div, coordinates, 10);
 * // div.style.position is 'absolute'
 * // div.style.left is '100px'
 * // div.style.top is '200px'
 * // div.style.zIndex is '10'
 */
function applyElementStyling(element, coords, zIndex = 1) {
    if (!element || typeof element.style === 'undefined') {
        handleElementError("applyElementStyling: Invalid element provided.", null);
        return;
    }
    // Use positionElement for coordinates validation and setting top/left
    positionElement(element, coords); // This handles validation and positioning
    element.style.zIndex = zIndex;
}

/**
 * Validates if the provided data object is non-null and non-undefined.
 * Logs an error message using handleElementError if validation fails.
 *
 * @function validateRenderData
 * @param {*} dataObj - The data object to validate.
 * @param {string} errorMessage - The error message to log if validation fails.
 * @returns {boolean} True if the data is valid, false otherwise.
 *
 * @example
 * const slotData = { type: 'hand' };
 * if (!validateRenderData(slotData, "Missing slot data for rendering.")) {
 *   return; // Abort rendering
 * }
 * // Returns true
 *
 * const invalidData = null;
 * if (!validateRenderData(invalidData, "Invalid data received.")) {
 *   // This block will execute
 * }
 * // Returns false and logs error
 */
function validateRenderData(dataObj, errorMessage) {
    if (dataObj === null || typeof dataObj === 'undefined') {
        handleElementError(errorMessage, null);
        return false;
    }
    return true;
}

/**
 * Creates a card DOM element and positions it absolutely.
 * Requires the full card data object from the manifest/state.
 *
 * @function renderCardElement
 * @param {object} cardData - The card data object (containing id, manifestKey, etc.).
 * @param {string} manifestKey - The key used in state arrays (e.g., "item_1", "spell_6").
 * @param {string} slotId - The ID of the slot this card is associated with.
 * @param {object} coords - An object with numeric `X` and `Y` coordinates for positioning.
 * @param {number} [zIndex=10] - The z-index for the card element (defaults to 10).
 * @returns {HTMLElement|null} The created and positioned card element, or null on error.
 *
 * @example
 * const card = { id: "mirrorSnap", imageUrl: "..." };
 * const manifestKey = "spell_6"; // This is the key used in state management
 * const cardCoords = { X: 150, Y: 250 };
 * const cardElement = renderCardElement(card, manifestKey, "PLAYER1_HAND1", cardCoords);
 * if (cardElement) {
 *   parentElement.appendChild(cardElement);
 * }
 */
function renderCardElement(cardData, manifestKey, slotId, coords, zIndex = 10) {
    if (!validateRenderData(cardData, `renderCardElement: Invalid cardData for slot ${slotId}.`) ||
        !validateRenderData(coords, `renderCardElement: Invalid coords for slot ${slotId}.`)) {
        return null;
    }

    if (!validateRenderData(manifestKey, `renderCardElement: Missing manifestKey for card ${cardData.id} in slot ${slotId}`)) {
        console.error(`Missing manifestKey for card in slot ${slotId}. This is required for drag operations.`);
        return null;
    }

    // Add debug logging to see what's being passed
    console.log(`renderCardElement: Rendering card ${cardData.id} (manifestKey: ${manifestKey}) in slot ${slotId}`);
    
    // createCardElement expects a card object, manifestKey, and slotId
    const cardElement = createCardElement(cardData, manifestKey, slotId);
    
    if (!cardElement) {
        handleElementError(`renderCardElement: Failed to create card element for ${manifestKey} in slot ${slotId}.`, null);
        return null;
    }

    try {
        // applyElementStyling(cardElement, coords, zIndex);
        // Card elements should be positioned relative to their parent slot, not absolutely on the board.
        // The parent slot (created by renderSlotWithCard) is already positioned.
        return cardElement;
    } catch (error) {
        handleElementError(`renderCardElement: Error applying styles to card ${manifestKey} in slot ${slotId}: ${error.message}`, null);
        return null;
    }
}


/**
 * Creates and positions a slot DOM element, optionally rendering a card within it.
 * Uses utility functions for element creation and positioning.
 *
 * @function renderSlotWithCard
 * @param {string} slotId - The unique ID for the slot.
 * @param {string} slotType - The type of slot (e.g., 'hand', 'grid').
 * @param {string|null} playerId - The player ID if applicable, otherwise null.
 * @param {object} coords - An object with numeric `X` and `Y` coordinates for positioning.
 * @param {object|null} cardData - The card data object if a card should be rendered in the slot, otherwise null.
 * @param {number} [slotZIndex=1] - The z-index for the slot element.
 * @param {number} [cardZIndex=10] - The z-index for the card element if rendered.
 * @returns {HTMLElement|null} The created slot element (potentially with a card), or null on error.
 *
 * @example
 * const slotCoords = { X: 50, Y: 100 };
 * const handSlot = renderSlotWithCard("PLAYER1_HAND1", "hand", "player1", slotCoords, null); // Empty slot
 * if (handSlot) container.appendChild(handSlot);
 *
 * const card = { id: "shieldBash" }; // The card data from the manifest
 * const cardSlot = renderSlotWithCard("GRID1", "grid", null, slotCoords, card, "spell_1", 1, 15); // Slot with card
 * if (cardSlot) container.appendChild(cardSlot);
 */
function renderSlotWithCard(slotId, slotType, playerId, coords, cardData, slotZIndex = 1, cardZIndex = 10) {
    if (!validateRenderData(coords, `renderSlotWithCard: Invalid coordinates for slot ${slotId}.`)) {
        return null; // Error handled by validateRenderData
    }

    console.log(`DEBUG: renderSlotWithCard for ${slotId}, type=${slotType}, playerId=${playerId}`);
    
    let slotElement;
    try {
        slotElement = createSlotElement(slotId, slotType, playerId, coords); // coords passed for validation in createSlotElement
        if (!slotElement) {
            console.error(`DEBUG: createSlotElement returned null for ${slotId}`);
            throw new Error("createSlotElement returned null"); // Should not happen if params are valid, but check anyway.
        }
        applyElementStyling(slotElement, coords, slotZIndex); // Apply positioning and z-index
        console.log(`DEBUG: Successfully created and styled slot ${slotId}`);
    } catch (error) {
        console.error(`DEBUG: Failed to create slot ${slotId}: ${error.message}`);
        return handleElementError(`renderSlotWithCard: Failed to create or style slot ${slotId}. ${error.message}`, null);
    }

    // If cardData is provided, render the card and append it to the slot
    if (cardData) {
        // Extract manifestKey from indexed data in state arrays - this is critical for drag-and-drop
        // GameState.allCards is indexed by manifestKeys, so we need to get the manifestKey from somewhere else
        let manifestKey = cardData.manifestKey; // This should be provided by the caller
        
        // Fallback: If manifestKey is missing but we have an id, use the id as the manifestKey
        if (!manifestKey && cardData.id) {
            manifestKey = cardData.id;
            console.log(`renderSlotWithCard: Adding missing manifestKey=${manifestKey} to card in slot ${slotId}`);
            cardData.manifestKey = manifestKey; // Update the object for future reference
        }
        
        if (!manifestKey) {
            console.error(`renderSlotWithCard: Missing manifestKey for card ${cardData.id} in slot ${slotId}. Card will not be draggable.`);
        }
        
        console.log(`DEBUG: Rendering card for slot ${slotId}:`, cardData.id, `(manifestKey: ${manifestKey})`);
        // Use the same coordinates for the card as the slot for absolute positioning
        const cardElement = renderCardElement(cardData, manifestKey, slotId, coords, cardZIndex);
        if (cardElement) {
            console.log(`DEBUG: Successfully created card for slot ${slotId}`);
            slotElement.appendChild(cardElement);
        } else {
            // Log error but return the slot element anyway? Or null? Return slot for partial success.
            console.error(`DEBUG: Failed to render card ${cardData.id} into slot ${slotId}`);
            handleElementError(`renderSlotWithCard: Failed to render card ${manifestKey || cardData.id} into slot ${slotId}. Slot created but card failed.`, null);
        }
    } else {
        console.log(`DEBUG: No card data for slot ${slotId}, creating empty slot`);
    }

    return slotElement;
}

export {
    applyElementStyling,
    validateRenderData,
    renderCardElement,
    renderSlotWithCard
}; 