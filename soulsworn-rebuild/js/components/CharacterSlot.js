import { getState, GameState } from '../state.js';
import { createCardElement } from './Card.js';
// Import utility functions
import { createSlotElement, positionElement, handleElementError } from '../utils.js';

/**
 * Renders the character slot for a specific player, including any assigned card.
 *
 * Fetches the character slot definition and coordinates based on the playerId.
 * Creates and positions the slot element using utility functions.
 * If a card is assigned to the slot, creates and positions the card element.
 * Handles potential errors gracefully.
 *
 * @param {number} playerId - The ID of the player (1 or 2) whose character slot to render.
 */
export function renderCharacterSlot(playerId) {
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) {
        // Use standardized error handling
        return handleElementError("Game container element (#game-container) not found!");
    }

    const playerKey = `player${playerId}`;
    const player = GameState.players[playerKey];
    if (!player) {
        // Use standardized error handling
        return handleElementError(`Player data for ${playerKey} not found.`);
    }
    const characterSlotId = player.characterSlotId;

    if (!characterSlotId) {
        // Use standardized error handling
        return handleElementError(`Character slot ID not found for player ${playerId}`);
    }

    const slotData = GameState.boardSlots[characterSlotId];
    const coords = GameState.uiCoordinates[characterSlotId];

    if (!slotData) {
        // Use standardized error handling
        return handleElementError(`Character slot data not found for ID: ${characterSlotId}`);
    }
    if (!coords) {
        // Use standardized error handling
        return handleElementError(`Character slot coordinates not found for ID: ${characterSlotId}`);
    }

    // Use utility function to create the slot element
    const slotElement = createSlotElement(characterSlotId, 'character', playerId, coords);

    // Use utility function for positioning the slot
    positionElement(slotElement, coords);
    // Set size based on coordinates
    slotElement.style.width = `${coords.W}px`;
    slotElement.style.height = `${coords.H}px`;
    slotElement.style.zIndex = '5'; // Slots below cards

    // Append the slot element to the game container
    gameContainer.appendChild(slotElement);

    // Check if a card is assigned to this character slot
    const cardManifestKey = slotData.cardId; // This should be the manifest key

    if (cardManifestKey) {
        const cardData = GameState.allCards[cardManifestKey];

        if (cardData) {
            // Create the card element
            const cardElement = createCardElement(cardData, cardManifestKey, characterSlotId);

            // Check if card creation was successful
            if (cardElement && cardElement.tagName === 'IMG') {
                // Use utility function to position the card (same position as the slot)
                positionElement(cardElement, coords);
                // Set card size
                cardElement.style.width = `${coords.W}px`;
                cardElement.style.height = `${coords.H}px`;
                cardElement.style.zIndex = '10'; // Cards above slots
                cardElement.dataset.currentSlot = characterSlotId; // Update current slot

                // Append the card element directly to the game container
                gameContainer.appendChild(cardElement);
            } else if (cardElement) {
                // If createCardElement returned an error placeholder, append and position it
                gameContainer.appendChild(cardElement);
                positionElement(cardElement, coords);
            }
        } else {
            // Use standardized error handling if card data for the key is missing
            handleElementError(`Card data not found for manifest key: ${cardManifestKey} in character slot ${characterSlotId}`);
            // Potentially clear the invalid cardId from the GameState slot
            // GameState.boardSlots[characterSlotId].cardId = null;
        }
    } // else: No card assigned, only the empty slot is rendered.
} 