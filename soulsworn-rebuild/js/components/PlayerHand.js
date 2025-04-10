import { getState, GameState } from '../state.js';
import { createCardElement } from './Card.js';

/**
 * Renders the hand for a specific player, positioning cards absolutely.
 * @param {number} playerId - The ID of the player (1, 2, 3, or 4).
 * // Removed handContainerElement parameter
 */
export function renderPlayerHand(playerId) {
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) {
        console.error("Game container element (#game-container) not found!");
        return;
    }

    const playerKey = `player${playerId}`;
    const player = GameState.players[playerKey];
    if (!player) {
        console.error(`Player ${playerKey} not found in GameState.players`);
        return;
    }
    const handCardIds = player.hand; // Array of card IDs for the current player

    // Find all hand slot IDs for this player defined in boardSlots
    // These define the potential locations for hand cards.
    const playerHandSlotIds = Object.keys(GameState.boardSlots).filter(slotId =>
        GameState.boardSlots[slotId].type === 'hand' && GameState.boardSlots[slotId].playerId === playerId
    );
    // Sort them numerically (PLAYER1_HAND1, PLAYER1_HAND2, ...)
    playerHandSlotIds.sort((a, b) => {
        const numA = parseInt(a.match(/\d+$/)[0]);
        const numB = parseInt(b.match(/\d+$/)[0]);
        return numA - numB;
    });

    // Render cards currently in hand, placing them in the corresponding slots
    handCardIds.forEach((cardId, index) => {
        const manifestKey = cardId; // The ID in the hand IS the manifest key
        if (index < playerHandSlotIds.length) {
            const targetSlotId = playerHandSlotIds[index];
            const cardData = GameState.allCards[manifestKey];
            const coords = GameState.uiCoordinates[targetSlotId];

            if (cardData && coords) {
                const cardElement = createCardElement(cardData, manifestKey, targetSlotId);
                cardElement.dataset.cardId = manifestKey; // Set dataset based on manifestKey
                cardElement.dataset.currentSlot = targetSlotId; // Track where the card is

                // Apply absolute positioning directly to the card image
                cardElement.style.position = 'absolute';
                cardElement.style.left = `${coords.X}px`;
                cardElement.style.top = `${coords.Y}px`;
                cardElement.style.width = `${coords.W}px`;
                cardElement.style.height = `${coords.H}px`;
                cardElement.style.zIndex = '10'; // Ensure cards are above slots

                gameContainer.appendChild(cardElement);
            } else {
                console.warn(`Card data or coordinates missing for card key ${manifestKey} in slot ${targetSlotId}`);
            }
        } else {
            console.warn(`Player ${playerId} has more cards (${handCardIds.length}) than defined hand slots (${playerHandSlotIds.length}). Card key ${manifestKey} not rendered.`);
        }
    });

    // Render empty placeholder slots for remaining hand slots
    for (let i = handCardIds.length; i < playerHandSlotIds.length; i++) {
        const slotId = playerHandSlotIds[i];
        const slotData = GameState.boardSlots[slotId];
        const coords = GameState.uiCoordinates[slotId];

        if (slotData && coords) {
            const slotElement = document.createElement('div');
            slotElement.id = slotId;
            slotElement.classList.add('card-slot', 'hand-slot', 'empty-hand-slot');
            slotElement.dataset.slotId = slotId;
            slotElement.dataset.slotType = 'hand';
            slotElement.dataset.playerId = playerId;

            // Apply absolute positioning
            slotElement.style.position = 'absolute';
            slotElement.style.left = `${coords.X}px`;
            slotElement.style.top = `${coords.Y}px`;
            slotElement.style.width = `${coords.W}px`;
            slotElement.style.height = `${coords.H}px`;
            slotElement.style.zIndex = '5'; // Ensure slots are below cards

            gameContainer.appendChild(slotElement);
        } else {
             console.warn(`Data or coordinates missing for empty hand slot: ${slotId}`);
        }
    }
} 