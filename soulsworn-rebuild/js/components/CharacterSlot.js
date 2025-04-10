import { getState, GameState } from '../state.js';
import { createCardElement } from './Card.js';

/**
 * Renders the character slot for a specific player.
 * @param {number} playerId - The ID of the player (1, 2, 3, or 4).
 */
export function renderCharacterSlot(playerId) {
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) {
        console.error("Game container element (#game-container) not found!");
        return;
    }

    // Find the specific character slot ID from the player object
    const playerKey = `player${playerId}`;
    if (!GameState.players[playerKey]) {
        console.warn(`Player data for player ${playerId} not found.`);
        return;
    }
    const characterSlotId = GameState.players[playerKey].characterSlotId;

    if (!characterSlotId) {
        console.error(`Character slot ID not found for player ${playerId}`);
        return;
    }

    const slotData = GameState.boardSlots[characterSlotId];
    const coords = GameState.uiCoordinates[characterSlotId];

    if (!slotData) {
        console.error(`Character slot data not found in GameState.boardSlots for ID: ${characterSlotId}`);
        return;
    }
    if (!coords) {
        console.error(`Character slot coordinates not found in GameState.uiCoordinates for ID: ${characterSlotId}`);
        return;
    }

    const slotElement = document.createElement('div');
    slotElement.id = slotData.id;
    slotElement.classList.add('card-slot', 'character-slot');
    slotElement.dataset.slotId = slotData.id;
    slotElement.dataset.slotType = 'character';
    slotElement.dataset.playerId = playerId;

    // Apply absolute positioning
    slotElement.style.position = 'absolute';
    slotElement.style.left = `${coords.X}px`;
    slotElement.style.top = `${coords.Y}px`;
    slotElement.style.width = `${coords.W}px`;
    slotElement.style.height = `${coords.H}px`;

    // If a character card is assigned (unlikely initially, maybe later)
    const cardId = slotData.cardId;
    const cardData = GameState.allCards[cardId];

    if (cardData && coords) {
        const cardElement = createCardElement(cardData, cardId, slotData.id);
        slotElement.appendChild(cardElement);

        // Apply positioning to the card image itself
        cardElement.style.position = 'absolute';
        cardElement.style.left = `${coords.X}px`;
        cardElement.style.top = `${coords.Y}px`;
        cardElement.style.width = `${coords.W}px`;
        cardElement.style.height = `${coords.H}px`;
    }

    gameContainer.appendChild(slotElement);
} 