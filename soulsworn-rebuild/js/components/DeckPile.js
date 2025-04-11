/**
 * Soulsworn DeckPile Component
 * 
 * Responsible for rendering the draw and discard piles for each deck type.
 * This component handles:
 * - Creating and positioning draw pile slots with card back images
 * - Creating and positioning discard pile slots with top card visible
 * - Managing the visual representation of deck state
 * - Handling special cases like empty discard piles
 * 
 * The DeckPile component manages two critical game zones:
 * 1. Draw piles - Where new cards are drawn from during gameplay
 * 2. Discard piles - Where used/discarded cards are placed
 * 
 * Each deck type (main and alt) has its own separate draw and discard piles,
 * allowing for different card types to be managed independently.
 * 
 * @module DeckPile
 */

import { getState, GameState } from '../state.js';
// Keep createCardElement temporarily for non-standard card back rendering
import { createCardElement } from './Card.js';
// Import utility functions
import { handleElementError } from '../utils.js'; // Keep for initial checks
// Import new render utility functions
import { renderSlotWithCard, renderCardElement, validateRenderData } from '../utils/renderUtils.js';

/**
 * Renders the draw and discard slots/piles for a specific deck type (main or alt).
 *
 * This function:
 * 1. Determines the slot IDs based on the deck type
 * 2. Creates and positions the draw slot with a card back image
 * 3. Creates and positions the discard slot with the top card (if available)
 * 4. Sets appropriate styling and z-index values for proper layering
 * 5. Handles error cases for missing data or failed card creation
 *
 * @param {string} deckType - The type of deck pile to render ('main' or 'alt').
 * @returns {void} - No return value; renders directly to the DOM.
 * @throws {Error} - Handled internally via handleElementError.
 * 
 * @example
 * // Render the main deck pile (items and spells)
 * renderDeckPile('main');
 * 
 * @example
 * // Render both deck types
 * renderDeckPile('main');
 * renderDeckPile('alt');
 * 
 * @example
 * // Typical usage after discarding a card
 * moveCard(cardId, originSlotId, 'DISCARD');
 * renderGameBoard(); // Will call renderDeckPile internally
 */
export function renderDeckPile(deckType) {
    const gameContainer = document.getElementById('game-container');
    if (!validateRenderData(gameContainer, "Game container element (#game-container) not found!")) {
        return; // Exit if container not found
    }

    // Determine slot IDs based on deck type
    const drawSlotId = deckType === 'main' ? 'DECK' : 'ALTDECK';
    const discardSlotId = deckType === 'main' ? 'DISCARD' : 'ALTDISCARD';

    const drawSlotData = GameState.boardSlots[drawSlotId];
    const discardSlotData = GameState.boardSlots[discardSlotId];
    const drawCoords = GameState.uiCoordinates[drawSlotId];
    const discardCoords = GameState.uiCoordinates[discardSlotId];

    // Validate necessary data
    if (!validateRenderData(drawSlotData, `Draw slot data not found for ${deckType} deck.`) ||
        !validateRenderData(discardSlotData, `Discard slot data not found for ${deckType} deck.`) ||
        !validateRenderData(drawCoords, `Draw coordinates not found for ${deckType} deck.`) ||
        !validateRenderData(discardCoords, `Discard coordinates not found for ${deckType} deck.`)) {
        return; // Exit if essential data is missing
    }

    // --- Render Draw Pile Slot --- //
    const drawSlotElement = renderSlotWithCard(
        drawSlotId,
        'deckDraw',
        null,       // playerId
        drawCoords,
        null,       // cardData (render empty slot first)
        5,          // slotZIndex
        10          // cardZIndex (placeholder)
    );

    if (drawSlotElement) {
        drawSlotElement.dataset.deckType = deckType;
        // Set size based on coordinates
        drawSlotElement.style.width = `${drawCoords.W}px`;
        drawSlotElement.style.height = `${drawCoords.H}px`;
        gameContainer.appendChild(drawSlotElement);

        // --- Render Card Back inside Draw Pile Slot (Non-standard rendering) --- //
        const cardBackKey = drawSlotData.cardId; // e.g., 'cardBack'
        if (cardBackKey) {
            const cardBackData = GameState.allCards[cardBackKey];
            if (validateRenderData(cardBackData, `Card back data not found for key: ${cardBackKey}`)) {
                // Add console.log to debug card back data
                console.log('Card back data:', cardBackKey, cardBackData);
                
                try {
                    // Create a simple IMG element instead of using createCardElement
                    const cardBackElement = document.createElement('img');
                    cardBackElement.src = cardBackData.imageUrl;
                    cardBackElement.alt = 'Card Back';
                    cardBackElement.title = 'Card Back';
                    cardBackElement.classList.add('card-back-image');
                    
                    // Style and append inside the slot element
                    cardBackElement.style.position = 'relative';
                    cardBackElement.style.width = '100%';
                    cardBackElement.style.height = '100%';
                    drawSlotElement.innerHTML = ''; // Clear placeholder text/previous
                    drawSlotElement.appendChild(cardBackElement);
                } catch (error) {
                    console.error('Error creating card back element:', error);
                    drawSlotElement.textContent = 'Draw'; // Fallback text
                }
            } else {
                drawSlotElement.textContent = 'Draw'; // Fallback text
            }
        } else {
            drawSlotElement.textContent = 'Draw'; // Placeholder text if no card back specified
        }
    } else {
        console.error(`Failed to render draw slot ${drawSlotId}`);
    }

    // --- Render Discard Pile Slot --- //
    const discardSlotElement = renderSlotWithCard(
        discardSlotId,
        'deckDiscard',
        null,           // playerId
        discardCoords,
        null,           // cardData (render empty slot first)
        5,              // slotZIndex
        10              // cardZIndex (placeholder)
    );

    if (discardSlotElement) {
        discardSlotElement.dataset.deckType = deckType;
        // Set size based on coordinates
        discardSlotElement.style.width = `${discardCoords.W}px`;
        discardSlotElement.style.height = `${discardCoords.H}px`;
        gameContainer.appendChild(discardSlotElement);

        // --- Render Top Discard Card (Absolutely Positioned - KI-003 Fix) --- //
        const discardPileArray = deckType === 'main' ? GameState.mainDeck.discardPile : GameState.altDeck.discardPile;
        if (discardPileArray && discardPileArray.length > 0) {
            const topCardManifestKey = discardPileArray[discardPileArray.length - 1];
            const topCardData = GameState.allCards[topCardManifestKey];

            if (validateRenderData(topCardData, `Card data not found for top discard card key: ${topCardManifestKey}`)) {
                // Add manifestKey to cardData for drag operations
                topCardData.manifestKey = topCardManifestKey;
                
                // Use renderCardElement to create/position absolutely on gameContainer
                const topCardElement = renderCardElement(
                    topCardData,
                    topCardManifestKey,  // Pass the manifestKey as second parameter
                    discardSlotId,
                    discardCoords,
                    10 // cardZIndex
                );

                if (topCardElement) {
                    // Append the absolutely positioned card to the main container
                    gameContainer.appendChild(topCardElement);
                } else {
                    // Error logged by renderCardElement
                    console.error(`Failed to render top discard card ${topCardManifestKey}`);
                    // Optionally add fallback text to the *slot* element
                    discardSlotElement.textContent = 'Discard Err';
                }
            } else {
                // Card key is invalid, but discard pile isn't empty
                discardSlotElement.textContent = 'Discard (?)'; // Indicate issue
            }
        } else {
             // Discard pile is empty, slot element already rendered
             // Optionally add placeholder text
             // discardSlotElement.textContent = 'Discard';
        }
    } else {
        console.error(`Failed to render discard slot ${discardSlotId}`);
    }
}