import { getState, GameState } from '../state.js';
import { createCardElement } from './Card.js';

/**
 * Renders the story grid slots based on coordinates.
 */
export function renderStoryGrid() {
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) {
        console.error("Game container element (#game-container) not found!");
        return;
    }

    // Get all board slots of type 'storyGrid'
    const gridSlotIds = Object.keys(GameState.boardSlots).filter(slotId =>
        GameState.boardSlots[slotId].type === 'storyGrid'
    );

    // No need to sort based on old naming convention (e.g., 0-0)
    // We rely on the coordinates directly.

    gridSlotIds.forEach(slotId => {
        const slotData = GameState.boardSlots[slotId];
        const coords = GameState.uiCoordinates[slotId];

        if (!slotData) {
            console.error(`Story grid slot data not found for ID: ${slotId}`);
            return; // continue to next slot
        }
        if (!coords) {
            console.error(`Story grid coordinates not found for ID: ${slotId}`);
            return; // continue to next slot
        }

        const slotElement = document.createElement('div');
        slotElement.id = slotId; // Use the ID from the slot data (which matches JSON LABEL)
        slotElement.classList.add('card-slot', 'story-grid-slot');
        slotElement.dataset.slotId = slotId;
        slotElement.dataset.slotType = 'storyGrid';

        // Apply absolute positioning
        slotElement.style.position = 'absolute';
        slotElement.style.left = `${coords.X}px`;
        slotElement.style.top = `${coords.Y}px`;
        slotElement.style.width = `${coords.W}px`;
        slotElement.style.height = `${coords.H}px`;

        // If a card is assigned, render it
        const cardId = slotData.cardId; // This is the manifest key
        const cardData = GameState.allCards[cardId];

        if (cardData && coords) {
            const cardElement = createCardElement(cardData, cardId, slotId);
            slotElement.appendChild(cardElement);

            // Apply positioning to the card image itself
            cardElement.style.position = 'absolute';
        }

        gameContainer.appendChild(slotElement); // Append to game container
    });
} 