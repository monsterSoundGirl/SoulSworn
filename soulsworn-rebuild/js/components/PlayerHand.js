import { getState, GameState } from '../state.js';
import { createCardElement } from './Card.js';
// Import utility functions
import { createSlotElement, positionElement, handleElementError } from '../utils.js';

/**
 * Renders the hand slots and cards for a specific player.
 *
 * Fetches player hand data and corresponding slot definitions from GameState.
 * Renders card images for cards currently in hand, positioning them using utility functions.
 * Renders empty placeholder slots for unoccupied hand slots using utility functions.
 * Handles potential errors like missing container or data gracefully.
 *
 * @param {number} playerId - The ID of the player (1 or 2) whose hand to render.
 */
export function renderPlayerHand(playerId) {
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) {
        // Use standardized error handling
        return handleElementError("Game container element (#game-container) not found!");
    }

    const playerKey = `player${playerId}`;
    const player = GameState.players[playerKey];
    if (!player) {
        // Use standardized error handling
        return handleElementError(`Player ${playerKey} not found in GameState.players`);
    }
    const handCardManifestKeys = player.hand; // Array of card manifest keys

    // Find all hand slot IDs for this player defined in boardSlots
    const playerHandSlotIds = Object.keys(GameState.boardSlots).filter(slotId =>
        GameState.boardSlots[slotId].type === 'hand' && GameState.boardSlots[slotId].playerId === playerId
    );
    // Sort them numerically (e.g., PLAYER1_HAND1, PLAYER1_HAND2)
    playerHandSlotIds.sort((a, b) => {
        const numA = parseInt(a.match(/\d+$/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+$/)?.[0] || '0');
        return numA - numB;
    });

    // Render cards currently in hand
    handCardManifestKeys.forEach((manifestKey, index) => {
        if (index < playerHandSlotIds.length) {
            const targetSlotId = playerHandSlotIds[index];
            const cardData = GameState.allCards[manifestKey];
            // Get coordinates from the SLOT definition in uiCoordinates
            const coords = GameState.uiCoordinates[targetSlotId];

            if (cardData && coords) {
                // Create the card element using the Card component function
                const cardElement = createCardElement(cardData, manifestKey, targetSlotId);
                // Ensure cardElement is valid before positioning (createCardElement might return an error div)
                if (cardElement && cardElement.tagName === 'IMG') {
                    // Use utility function for positioning
                    positionElement(cardElement, coords); // Position based on slot coords
                    // Adjust card size based on coordinate dimensions (W/H)
                    cardElement.style.width = `${coords.W}px`;
                    cardElement.style.height = `${coords.H}px`;
                    cardElement.style.zIndex = '10'; // Keep cards above slots
                    cardElement.dataset.currentSlot = targetSlotId;

                    gameContainer.appendChild(cardElement);
                } else if (cardElement) {
                    // If createCardElement returned an error placeholder, append it
                    gameContainer.appendChild(cardElement);
                    // Optionally position the error placeholder too
                    positionElement(cardElement, coords);
                }
            } else {
                // Use standardized warning/error handling
                handleElementError(`Card data or coordinates missing for card key ${manifestKey} in slot ${targetSlotId}`);
            }
        } else {
            // Use standardized warning/error handling
            handleElementError(`Player ${playerId} has more cards (${handCardManifestKeys.length}) than defined hand slots (${playerHandSlotIds.length}). Card key ${manifestKey} not rendered.`);
        }
    });

    // Render empty placeholder slots for the remaining hand positions
    for (let i = handCardManifestKeys.length; i < playerHandSlotIds.length; i++) {
        const slotId = playerHandSlotIds[i];
        const slotData = GameState.boardSlots[slotId];
        const coords = GameState.uiCoordinates[slotId];

        if (slotData && coords) {
            // Use utility function to create the slot element
            const slotElement = createSlotElement(slotId, 'hand', playerId, coords);

            // Add specific classes for empty hand slots if needed
            slotElement.classList.add('empty-hand-slot');

            // Use utility function for positioning
            positionElement(slotElement, coords);
            // Set size based on coordinates
            slotElement.style.width = `${coords.W}px`;
            slotElement.style.height = `${coords.H}px`;
            slotElement.style.zIndex = '5'; // Ensure slots are below cards

            gameContainer.appendChild(slotElement);
        } else {
            // Use standardized warning/error handling
            handleElementError(`Slot data or coordinates missing for empty hand slot: ${slotId}`);
        }
    }
} 