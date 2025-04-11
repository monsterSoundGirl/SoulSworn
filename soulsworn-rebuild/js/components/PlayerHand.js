/**
 * Soulsworn PlayerHand Component
 * 
 * Responsible for rendering player hand areas and the cards contained within them.
 * This component handles:
 * - Determining which hand slots belong to a specific player
 * - Rendering occupied hand slots with their corresponding cards
 * - Rendering empty hand slots as drop targets
 * - Positioning elements based on coordinates from UIcoordinates.json
 * 
 * The PlayerHand component is a critical part of the game UI that displays cards
 * that a player can use during their turn. Cards in hand are draggable and can be
 * moved to other valid zones on the board.
 * 
 * @module PlayerHand
 */

import { getState, GameState } from '../state.js';
// Import utility functions
import { handleElementError } from '../utils.js'; // Keep for initial checks
// Import new render utility functions
import { renderSlotWithCard, validateRenderData } from '../utils/renderUtils.js';

/**
 * Renders the hand slots and cards for a specific player.
 *
 * Fetches player hand data and corresponding slot definitions from GameState.
 * Renders card images for cards currently in hand, positioning them using utility functions.
 * Renders empty placeholder slots for unoccupied hand slots using utility functions.
 * Handles potential errors like missing container or data gracefully.
 *
 * @param {number} playerId - The ID of the player (1-4) whose hand to render.
 * @returns {void} - No return value; renders directly to the DOM.
 * @throws {Error} - Handled internally via handleElementError.
 * 
 * @example
 * // Render player 1's hand
 * renderPlayerHand(1);
 * 
 * @example
 * // Render all player hands
 * renderPlayerHand(1);
 * renderPlayerHand(2);
 * renderPlayerHand(3);
 * renderPlayerHand(4);
 */
export function renderPlayerHand(playerId) {
    console.log(`DEBUG: renderPlayerHand called for player ${playerId}`);
    
    const gameContainer = document.getElementById('game-container');
    if (!validateRenderData(gameContainer, "Game container element (#game-container) not found!")) {
        console.error("DEBUG: Game container not found!");
        return; // Exit if container not found
    }

    const playerKey = `player${playerId}`;
    const player = GameState.players[playerKey];
    if (!validateRenderData(player, `Player ${playerKey} not found in GameState.players`)) {
        console.error(`DEBUG: Player ${playerKey} data missing`);
        return; // Exit if player data missing
    }

    // Find all hand slot IDs for this player by filtering GameState.cardSlots
    const playerHandSlotIdPrefix = `PLAYER${playerId}_HAND`;
    const playerHandSlotIds = Object.keys(GameState.cardSlots).filter(slotId =>
        slotId.startsWith(playerHandSlotIdPrefix)
    );
    console.log(`DEBUG: Found ${playerHandSlotIds.length} hand slots for ${playerKey} in cardSlots:`, playerHandSlotIds);
    
    // Sort them numerically (e.g., PLAYER1_HAND1, PLAYER1_HAND2)
    playerHandSlotIds.sort((a, b) => {
        const numA = parseInt(a.match(/\d+$/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+$/)?.[0] || '0');
        return numA - numB;
    });

    // Iterate through all defined hand slots for the player
    playerHandSlotIds.forEach((slotId, index) => {
        console.log(`DEBUG: Rendering hand slot ${slotId}`);
        const coords = GameState.uiCoordinates[slotId];
        if (!validateRenderData(coords, `Coordinates not found for hand slot: ${slotId}`)) {
            console.error(`DEBUG: Coordinates missing for slot ${slotId}`);
            return; // Skip this slot if coords are missing
        }
        console.log(`DEBUG: Coords for ${slotId}:`, coords);

        // Directly get the card object (or null) from the new cardSlots state
        const cardData = GameState.cardSlots[slotId]; 
        
        // Log the card data found (or null)
        if (cardData) {
             console.log(`DEBUG: Card for slot ${slotId}, cardData from cardSlots:`, cardData);
             // Ensure manifestKey is present if needed by renderSlotWithCard or downstream drag logic
             // (Assuming cardObjects in cardSlots already have an 'id' property for the manifestKey)
             if (!cardData.id) {
                 console.warn(`DEBUG: Card object in cardSlots.${slotId} is missing 'id' property.`);
                 // Potentially handle this case, maybe log error and skip or try to find id?
             }
        } else {
            console.log(`DEBUG: No card for slot ${slotId} (empty slot in cardSlots)`);
        }

        // Render the slot, passing the card object (or null) obtained from cardSlots
        console.log(`DEBUG: Calling renderSlotWithCard for ${slotId}`);
        const handSlotElement = renderSlotWithCard(
            slotId,
            'hand',
            playerKey,
            coords,
            cardData, // Pass the card data object (or null) directly from cardSlots
            5,        // slotZIndex
            10        // cardZIndex
        );

        // Append the slot (with or without card) if successfully created
        if (handSlotElement) {
            console.log(`DEBUG: Successfully created hand slot element for ${slotId}`);
            // Set size based on coordinates (renderSlotWithCard doesn't handle size)
            handSlotElement.style.width = `${coords.W}px`;
            handSlotElement.style.height = `${coords.H}px`;
            gameContainer.appendChild(handSlotElement);
            console.log(`DEBUG: Appended hand slot element ${slotId} to game container`);
        } else {
            // Error logged by renderSlotWithCard, additional logging if needed
            console.error(`DEBUG: Failed to render hand slot ${slotId} for player ${playerId}`);
        }
    });
    
    console.log(`DEBUG: renderPlayerHand completed for player ${playerId}`);
} 