// Orchestrates the rendering of the entire game board

import { renderPlayerHand } from './PlayerHand.js';
import { renderCharacterSlot } from './CharacterSlot.js';
import { renderStoryGrid } from './StoryGrid.js';
import { renderDeckPile } from './DeckPile.js';
import { createCardElement } from './Card.js';
import { getState, GameState } from '../state.js'; // Import GameState
// Import utility functions
import { createSlotElement, positionElement, handleElementError } from '../utils.js';

/**
 * Renders the complete game board by clearing previous elements and calling
 * individual component render functions for hands, character slots, grid, decks,
 * and mutable slots. Uses utility functions for element creation, positioning,
 * and error handling.
 * Assumes absolute positioning based on GameState.uiCoordinates.
 */
export function renderGameBoard() {
    // console.log("Rendering game board...");
    const state = getState(); // Get state for checks if needed
    const gameContainer = document.getElementById('game-container');

    if (!gameContainer) {
        // Use standardized error handling
        return handleElementError("#game-container not found!");
    }

    // Clear ONLY the dynamically generated card slots and cards inside the container
    // Preserve the static placeholders (Menu, Inspector, etc.) added via HTML
    // Query for specific classes assigned by utility functions or card creation
    const elementsToRemove = gameContainer.querySelectorAll('.game-slot, .card-image, .card-error-placeholder');
    elementsToRemove.forEach(el => el.remove());

    // Call render functions for each section (no container arguments needed)
    renderPlayerHand(1);
    renderPlayerHand(2);
    // TODO: Add logic to render P3/P4 based on game setup/player count
    renderPlayerHand(3);
    renderPlayerHand(4);

    renderCharacterSlot(1);
    renderCharacterSlot(2);
    // TODO: Add logic to render P3/P4 based on game setup/player count
    renderCharacterSlot(3);
    renderCharacterSlot(4);

    renderStoryGrid(); // Renders all grid slots based on GameState.boardSlots

    renderDeckPile('main');
    renderDeckPile('alt');

    // Render mutable slots using standardized utility functions
    const mutableSlotIds = Object.keys(GameState.boardSlots).filter(slotId =>
        GameState.boardSlots[slotId].type === 'mutable'
    );

    mutableSlotIds.forEach(slotId => {
        const slotData = GameState.boardSlots[slotId];
        const coords = GameState.uiCoordinates[slotId];

        // Validate data and coordinates first
        if (!slotData) {
            return handleElementError(`Mutable slot data not found for ID: ${slotId}`);
        }
        if (!coords) {
            return handleElementError(`Mutable slot coordinates not found for ID: ${slotId}`);
        }

        // Create the slot element using the utility function (playerId is null)
        const slotElement = createSlotElement(slotId, 'mutable', null, coords);
        // Add specific class if needed
        slotElement.classList.add('mutable-slot');

        // Position the slot element using the utility function
        positionElement(slotElement, coords);
        // Set size based on coordinates
        slotElement.style.width = `${coords.W}px`;
        slotElement.style.height = `${coords.H}px`;
        slotElement.style.zIndex = '5'; // Ensure slots are below cards

        // Append the slot element
        gameContainer.appendChild(slotElement);

        // Render the card if one is assigned
        const cardManifestKey = slotData.cardId;
        if (cardManifestKey) {
            const cardData = GameState.allCards[cardManifestKey];
            if (cardData) {
                const cardElement = createCardElement(cardData, cardManifestKey, slotId);

                // Check if card creation was successful
                if (cardElement && cardElement.tagName === 'IMG') {
                    // Position the card element (same position as the slot)
                    positionElement(cardElement, coords);
                    // Set card size
                    cardElement.style.width = `${coords.W}px`;
                    cardElement.style.height = `${coords.H}px`;
                    cardElement.style.zIndex = '10'; // Cards above slots
                    cardElement.dataset.currentSlot = slotId; // Update current slot

                    // Append the card element
                    gameContainer.appendChild(cardElement);
                } else if (cardElement) {
                    // If createCardElement returned an error placeholder, append and position it
                    gameContainer.appendChild(cardElement);
                    positionElement(cardElement, coords);
                    // Apply size to error placeholder as well
                    cardElement.style.width = `${coords.W}px`;
                    cardElement.style.height = `${coords.H}px`;
                }
                // else: createCardElement handled the error logging internally
            } else {
                // Handle case where cardId exists but data doesn't
                handleElementError(`Card data not found for manifest key: ${cardManifestKey} in mutable slot ${slotId}`);
                // Clear the invalid cardId from the slot in GameState?
                // GameState.boardSlots[slotId].cardId = null;
            }
        } // else: No card assigned, only the empty slot is rendered.
    });

    // console.log("Game board rendering complete.");
} 