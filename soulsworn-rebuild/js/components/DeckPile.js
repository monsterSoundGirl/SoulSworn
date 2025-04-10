import { getState, GameState } from '../state.js';
import { createCardElement } from './Card.js';
// Import utility functions
import { createSlotElement, positionElement, handleElementError } from '../utils.js';

/**
 * Renders the draw and discard slots/piles for a specific deck type (main or alt).
 *
 * Fetches slot definitions and coordinates from GameState.
 * Creates and positions the draw and discard slot elements using utility functions.
 * Renders a card back image inside the draw slot (if specified in GameState).
 * Renders the top card image inside the discard slot if the discard pile is not empty.
 * Handles potential errors gracefully.
 *
 * @param {string} deckType - The type of deck pile to render ('main' or 'alt').
 */
export function renderDeckPile(deckType) {
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) {
        // Use standardized error handling
        return handleElementError("Game container element (#game-container) not found!");
    }

    // Determine slot IDs based on deck type
    const drawSlotId = deckType === 'main' ? 'DECK' : 'ALTDECK';
    const discardSlotId = deckType === 'main' ? 'DISCARD' : 'ALTDISCARD';

    const drawSlotData = GameState.boardSlots[drawSlotId];
    const discardSlotData = GameState.boardSlots[discardSlotId];
    const drawCoords = GameState.uiCoordinates[drawSlotId];
    const discardCoords = GameState.uiCoordinates[discardSlotId];

    // Validate necessary data
    if (!drawSlotData || !discardSlotData) {
        return handleElementError(`Deck slot data not found for deck type: ${deckType}`);
    }
    if (!drawCoords || !discardCoords) {
        return handleElementError(`Deck slot coordinates not found for deck type: ${deckType}`);
    }

    // --- Render Draw Pile --- //

    // Use utility function to create the draw slot element (playerId is null)
    const drawSlotElement = createSlotElement(drawSlotId, 'deckDraw', null, drawCoords);
    drawSlotElement.dataset.deckType = deckType; // Add specific deck type

    // Use utility function for positioning
    positionElement(drawSlotElement, drawCoords);
    // Set size based on coordinates
    drawSlotElement.style.width = `${drawCoords.W}px`;
    drawSlotElement.style.height = `${drawCoords.H}px`;
    drawSlotElement.style.zIndex = '5'; // Slots below cards

    // Render card back image inside the draw pile slot
    // Assuming drawSlotData.cardId holds the key for the card back in allCards
    const cardBackKey = drawSlotData.cardId; // e.g., 'card_back'
    if (cardBackKey && GameState.allCards[cardBackKey]) {
        const cardBackData = GameState.allCards[cardBackKey];
        // Create card element for the back image. Pass null for manifestKey as it's not a draggable game piece.
        const cardBackElement = createCardElement(cardBackData, null, drawSlotId);

        if (cardBackElement && cardBackElement.tagName === 'IMG') {
            // Position card back within the slot (usually 0,0 relative or handled by CSS)
            cardBackElement.style.position = 'relative'; // Let CSS handle alignment within slot
            cardBackElement.style.width = '100%'; // Fill slot
            cardBackElement.style.height = '100%';
            drawSlotElement.innerHTML = ''; // Clear any placeholder text
            drawSlotElement.appendChild(cardBackElement);
        } else if (cardBackElement) {
            drawSlotElement.appendChild(cardBackElement); // Append error placeholder
        } else {
            handleElementError(`Failed to create card back element for key: ${cardBackKey}`);
            drawSlotElement.textContent = 'Draw'; // Fallback text
        }
    } else {
        drawSlotElement.textContent = 'Draw'; // Placeholder text if no card back specified
    }
    gameContainer.appendChild(drawSlotElement);

    // --- Render Discard Pile --- //

    // Use utility function to create the discard slot element (playerId is null)
    const discardSlotElement = createSlotElement(discardSlotId, 'deckDiscard', null, discardCoords);
    discardSlotElement.dataset.deckType = deckType; // Add specific deck type

    // Use utility function for positioning
    positionElement(discardSlotElement, discardCoords);
    // Set size based on coordinates
    discardSlotElement.style.width = `${discardCoords.W}px`;
    discardSlotElement.style.height = `${discardCoords.H}px`;
    discardSlotElement.style.zIndex = '5'; // Slots below cards

    // Render top discard card if available
    const discardPileArray = deckType === 'main' ? GameState.mainDeck.discardPile : GameState.altDeck.discardPile;
    if (discardPileArray && discardPileArray.length > 0) {
        const topCardManifestKey = discardPileArray[discardPileArray.length - 1];
        const topCardData = GameState.allCards[topCardManifestKey];

        if (topCardData) {
            // Create the card element for the top discard card
            const topCardElement = createCardElement(topCardData, topCardManifestKey, discardSlotId);

            if (topCardElement && topCardElement.tagName === 'IMG') {
                 // Position card within the slot (usually 0,0 relative or handled by CSS)
                topCardElement.style.position = 'relative';
                topCardElement.style.width = '100%';
                topCardElement.style.height = '100%';
                discardSlotElement.innerHTML = ''; // Clear placeholder/previous card
                discardSlotElement.appendChild(topCardElement);
            } else if (topCardElement) {
                discardSlotElement.appendChild(topCardElement); // Append error placeholder
            } else {
                 handleElementError(`Failed to create top card element for key: ${topCardManifestKey}`);
                 discardSlotElement.textContent = 'Discard'; // Fallback text
            }
        } else {
            handleElementError(`Card data not found for top discard card key: ${topCardManifestKey}`);
            discardSlotElement.textContent = 'Discard'; // Fallback text
        }
    } else {
        discardSlotElement.textContent = 'Discard'; // Placeholder text if discard pile is empty
    }
    gameContainer.appendChild(discardSlotElement);
}