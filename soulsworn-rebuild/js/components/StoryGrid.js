import { getState, GameState } from '../state.js';
import { createCardElement } from './Card.js';
// Import utility functions
import { createSlotElement, positionElement, handleElementError } from '../utils.js';

/**
 * Renders the story grid slots and any cards placed within them.
 *
 * Fetches story grid slot definitions and their coordinates from GameState.
 * Creates and positions each slot element using utility functions.
 * If a slot has an assigned card, creates and positions the card element within that slot.
 * Handles potential errors gracefully.
 */
export function renderStoryGrid() {
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) {
        // Use standardized error handling
        return handleElementError("Game container element (#game-container) not found!");
    }

    // Get all board slots of type 'storyGrid'
    const gridSlotIds = Object.keys(GameState.boardSlots).filter(slotId =>
        GameState.boardSlots[slotId].type === 'storyGrid'
    );

    gridSlotIds.forEach(slotId => {
        const slotData = GameState.boardSlots[slotId];
        const coords = GameState.uiCoordinates[slotId];

        if (!slotData) {
            // Use standardized error handling and continue to the next iteration
            handleElementError(`Story grid slot data not found for ID: ${slotId}`);
            return; // Skips this iteration of forEach
        }
        if (!coords) {
            // Use standardized error handling and continue
            handleElementError(`Story grid coordinates not found for ID: ${slotId}`);
            return; // Skips this iteration of forEach
        }

        // Use utility function to create the slot element
        // PlayerId is null for grid slots
        const slotElement = createSlotElement(slotId, 'storyGrid', null, coords);

        // Use utility function for positioning the slot
        positionElement(slotElement, coords);
        // Set size based on coordinates
        slotElement.style.width = `${coords.W}px`;
        slotElement.style.height = `${coords.H}px`;
        slotElement.style.zIndex = '5'; // Slots below cards

        // Append the slot to the game container first
        gameContainer.appendChild(slotElement);

        // Check if a card is assigned to this slot in the GameState
        const cardManifestKey = slotData.cardId; // This should be the manifest key

        if (cardManifestKey) {
            const cardData = GameState.allCards[cardManifestKey];

            if (cardData) {
                // Create the card element
                const cardElement = createCardElement(cardData, cardManifestKey, slotId);

                // Check if card creation was successful before positioning
                if (cardElement && cardElement.tagName === 'IMG') {
                    // Use utility function to position the card at the same coords as the slot
                    positionElement(cardElement, coords);
                    // Set card size
                    cardElement.style.width = `${coords.W}px`;
                    cardElement.style.height = `${coords.H}px`;
                    cardElement.style.zIndex = '10'; // Cards above slots
                    cardElement.dataset.currentSlot = slotId; // Update current slot

                    // Append the card element directly to the game container
                    gameContainer.appendChild(cardElement);
                } else if (cardElement) {
                     // If createCardElement returned an error placeholder, append and position it
                    gameContainer.appendChild(cardElement);
                    positionElement(cardElement, coords);
                }
            } else {
                // Use standardized error handling if card data for the key is missing
                handleElementError(`Card data not found for manifest key: ${cardManifestKey} in story grid slot ${slotId}`);
                // Optionally, clear the cardId from the slotData in GameState if it's invalid?
                // GameState.boardSlots[slotId].cardId = null;
            }
        } // else: No card assigned to this slot, only the empty slot is rendered.
    });
} 