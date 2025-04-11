/**
 * Soulsworn CharacterSlot Component
 * 
 * Responsible for rendering character slots that represent player avatars/roles.
 * This component handles:
 * - Creating and positioning character slot elements for each player
 * - Rendering character cards assigned to these slots
 * - Managing slot and card layering through z-index
 * - Error handling for missing slot data or coordinates
 * 
 * Character slots are special areas of the game board that represent a player's
 * avatar or role in the game. These slots can hold character cards that define
 * a player's abilities and attributes during gameplay.
 * 
 * @module CharacterSlot
 */

import { getState, GameState } from '../state.js';
// Removed createCardElement import as it's handled by renderUtils
// Import utility functions
import { handleElementError } from '../utils.js'; // Keep handleElementError for initial checks
// Import new render utility functions
import { renderSlotWithCard, validateRenderData } from '../utils/renderUtils.js';

/**
 * Renders the character slot for a specific player, including any assigned card.
 *
 * This function:
 * 1. Retrieves the character slot ID for the specified player
 * 2. Fetches the slot data and coordinates from GameState
 * 3. Creates the slot element using utility functions
 * 4. If a character card is assigned to the slot, renders and positions it
 * 5. Maintains proper layering with z-index values
 *
 * @param {number} playerId - The ID of the player (1-4) whose character slot to render.
 * @returns {void} - No return value; renders directly to the DOM.
 * @throws {Error} - Handled internally via handleElementError.
 * 
 * @example
 * // Render player 1's character slot
 * renderCharacterSlot(1);
 * 
 * @example
 * // Render all player character slots
 * for (let i = 1; i <= 4; i++) {
 *   renderCharacterSlot(i);
 * }
 */
export function renderCharacterSlot(playerId) {
    const gameContainer = document.getElementById('game-container');
    if (!validateRenderData(gameContainer, "Game container element (#game-container) not found!")) {
        return; // Exit if container is not found
    }

    const playerKey = `player${playerId}`;
    const player = GameState.players[playerKey];
    if (!validateRenderData(player, `Player data for ${playerKey} not found.`)) {
        return; // Exit if player data is missing
    }
    const characterSlotId = player.characterSlotId;
    if (!validateRenderData(characterSlotId, `Character slot ID not found for player ${playerId}`)) {
        return; // Exit if slot ID is missing
    }

    // Retrieve card data directly from the new cardSlots state using the characterSlotId
    const cardData = GameState.cardSlots[characterSlotId]; 

    // Still need coordinates
    const coords = GameState.uiCoordinates[characterSlotId];
    if (!validateRenderData(coords, `Character slot coordinates not found for ID: ${characterSlotId}`)) {
        return; // Exit if coords are missing
    }

    // Log the card data found (or null)
    if (cardData) {
         console.log(`DEBUG: Card for slot ${characterSlotId}, cardData from cardSlots:`, cardData);
         if (!cardData.id) {
             console.warn(`DEBUG: Card object in cardSlots.${characterSlotId} is missing 'id' property.`);
         }
    } else {
        console.log(`DEBUG: No card for slot ${characterSlotId} (empty slot in cardSlots)`);
    }

    // Use the new utility function to render the slot and potentially the card
    const characterSlotElement = renderSlotWithCard(
        characterSlotId,
        'character',        // slotType
        playerKey,          // Pass playerKey (e.g., 'player1') instead of just ID
        coords,
        cardData,           // Pass the retrieved cardData object or null
        5,                  // slotZIndex (slots below cards)
        10                  // cardZIndex (cards above slots)
    );

    // Append the resulting element (slot with or without card) to the container
    if (characterSlotElement) {
        // Set size based on coordinates (renderSlotWithCard doesn't handle size)
        characterSlotElement.style.width = `${coords.W}px`;
        characterSlotElement.style.height = `${coords.H}px`;
        gameContainer.appendChild(characterSlotElement);
    } else {
        // Error handled by renderSlotWithCard, but log here if needed
        console.error(`Failed to render character slot ${characterSlotId}`);
    }
} 