// Orchestrates the rendering of the entire game board

import { renderPlayerHand } from './PlayerHand.js';
import { renderCharacterSlot } from './CharacterSlot.js';
import { renderStoryGrid } from './StoryGrid.js';
import { renderDeckPile } from './DeckPile.js';
import { getState, GameState } from '../state.js'; // Import GameState

/**
 * Renders the complete game board by calling individual component render functions.
 * Assumes absolute positioning based on GameState.uiCoordinates.
 */
export function renderGameBoard() {
    console.log("Rendering game board...");
    const state = getState(); // Get state for checks if needed
    const gameContainer = document.getElementById('game-container');

    if (!gameContainer) {
        console.error("#game-container not found!");
        return;
    }

    // Clear ONLY the dynamically generated card slots and cards inside the container
    // Preserve the static placeholders (Menu, Inspector, etc.) added via HTML
    const elementsToRemove = gameContainer.querySelectorAll('.card-slot, .card-image');
    elementsToRemove.forEach(el => el.remove());

    // Call render functions for each section (no container arguments needed)
    // Render components that create card slots
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
    
    // Render mutable slots (assuming they are standard card slots)
    const mutableSlotIds = Object.keys(GameState.boardSlots).filter(slotId =>
        GameState.boardSlots[slotId].type === 'mutable'
    );
    mutableSlotIds.forEach(slotId => {
        const slotData = GameState.boardSlots[slotId];
        const coords = GameState.uiCoordinates[slotId];
        if (slotData && coords) {
            const slotElement = document.createElement('div');
            slotElement.id = slotId;
            slotElement.classList.add('card-slot', 'mutable-slot');
            slotElement.dataset.slotId = slotId;
            slotElement.dataset.slotType = 'mutable';
            // Positioning
            slotElement.style.position = 'absolute';
            slotElement.style.left = `${coords.X}px`;
            slotElement.style.top = `${coords.Y}px`;
            slotElement.style.width = `${coords.W}px`;
            slotElement.style.height = `${coords.H}px`;
            // Content (if any card assigned)
            if (slotData.cardId && GameState.allCards[slotData.cardId]) {
                const cardElement = createCardElement(GameState.allCards[slotData.cardId]);
                slotElement.appendChild(cardElement);
            }
            gameContainer.appendChild(slotElement);
        } else {
            console.warn(`Data or coordinates missing for mutable slot: ${slotId}`);
        }
    });


    console.log("Game board rendering complete.");
} 