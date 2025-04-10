import { getState, GameState } from '../state.js';
import { createCardElement } from './Card.js';

/**
 * Renders the draw and discard slots for a specific deck pile (e.g., main or alt).
 * @param {string} deckType - 'main' or 'alt'.
 */
export function renderDeckPile(deckType) {
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) {
        console.error("Game container element (#game-container) not found!");
        return;
    }

    // Get the correct slot IDs based on the JSON LABELs we use in GameState
    const drawSlotId = deckType === 'main' ? 'DECK' : 'ALTDECK';
    const discardSlotId = deckType === 'main' ? 'DISCARD' : 'ALTDISCARD';

    const drawSlotData = GameState.boardSlots[drawSlotId];
    const discardSlotData = GameState.boardSlots[discardSlotId];
    const drawCoords = GameState.uiCoordinates[drawSlotId];
    const discardCoords = GameState.uiCoordinates[discardSlotId];

    if (!drawSlotData || !discardSlotData) {
        console.error(`Deck slot data not found in GameState.boardSlots for deck type: ${deckType}`);
        return;
    }
    if (!drawCoords || !discardCoords) {
        console.error(`Deck slot coordinates not found in GameState.uiCoordinates for deck type: ${deckType}`);
        return;
    }

    // Create Draw Pile Slot
    const drawSlotElement = document.createElement('div');
    drawSlotElement.id = drawSlotData.id;
    drawSlotElement.classList.add('card-slot', 'deck-slot', 'deckDraw');
    drawSlotElement.dataset.slotId = drawSlotData.id;
    drawSlotElement.dataset.slotType = 'deckDraw';
    drawSlotElement.dataset.deckType = deckType;

    // Apply absolute positioning
    drawSlotElement.style.position = 'absolute';
    drawSlotElement.style.left = `${drawCoords.X}px`;
    drawSlotElement.style.top = `${drawCoords.Y}px`;
    drawSlotElement.style.width = `${drawCoords.W}px`;
    drawSlotElement.style.height = `${drawCoords.H}px`;

    // Render card back for draw pile
    if (drawSlotData.cardId && GameState.allCards[drawSlotData.cardId]) {
        const cardElement = createCardElement(GameState.allCards[drawSlotData.cardId]);
        drawSlotElement.appendChild(cardElement);
    } else {
        drawSlotElement.textContent = 'Draw'; // Placeholder if no card back found
    }
    gameContainer.appendChild(drawSlotElement);

    // Create Discard Pile Slot
    const discardSlotElement = document.createElement('div');
    discardSlotElement.id = discardSlotData.id;
    discardSlotElement.classList.add('card-slot', 'deck-slot', 'deckDiscard');
    discardSlotElement.dataset.slotId = discardSlotData.id;
    discardSlotElement.dataset.slotType = 'deckDiscard';
    discardSlotElement.dataset.deckType = deckType;

    // Apply absolute positioning
    discardSlotElement.style.position = 'absolute';
    discardSlotElement.style.left = `${discardCoords.X}px`;
    discardSlotElement.style.top = `${discardCoords.Y}px`;
    discardSlotElement.style.width = `${discardCoords.W}px`;
    discardSlotElement.style.height = `${discardCoords.H}px`;

    // Render top discard card if available (unlikely initially)
    if (discardSlotData.cardId && GameState.allCards[discardSlotData.cardId]) {
        const cardElement = createCardElement(GameState.allCards[discardSlotData.cardId]);
        discardSlotElement.appendChild(cardElement);
    } else {
        discardSlotElement.textContent = 'Discard'; // Placeholder text
    }
    gameContainer.appendChild(discardSlotElement);
}