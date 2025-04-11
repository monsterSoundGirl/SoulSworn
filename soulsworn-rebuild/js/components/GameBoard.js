/**
 * Soulsworn GameBoard Component
 * 
 * Central orchestration component responsible for rendering the entire game board.
 * This component coordinates the rendering of all UI elements including:
 * - Player hand areas (for all players)
 * - Character slots (for all players)
 * - Story grid (shared play area)
 * - Deck and discard piles
 * - Mutable slots (flexible-purpose slots)
 * 
 * The GameBoard component uses absolute positioning based on coordinates from
 * UIcoordinates.json (loaded into GameState.uiCoordinates) to place all elements
 * in their designated positions on the game board.
 * 
 * @module GameBoard
 */

import { renderPlayerHand } from './PlayerHand.js';
import { renderCharacterSlot } from './CharacterSlot.js';
import { renderStoryGrid } from './StoryGrid.js';
import { renderDeckPile } from './DeckPile.js';
import { getState, GameState } from '../state.js'; // Import GameState
// Import utility functions
import { handleElementError } from '../utils.js'; // Keep for initial checks
// Import new render utility functions
import { renderSlotWithCard, validateRenderData } from '../utils/renderUtils.js';

/**
 * Renders the complete game board with all its components.
 * 
 * This function:
 * 1. Clears any existing game elements while preserving static containers
 * 2. Renders player hands and character slots for all players
 * 3. Renders the story grid for shared card placement
 * 4. Renders deck piles (main and alt) and their discard piles
 * 5. Renders mutable slots with any assigned cards
 * 
 * All rendering uses standardized utility functions for consistency:
 * - createSlotElement: Creates slot DOM elements
 * - positionElement: Applies absolute positioning
 * - handleElementError: Manages rendering errors
 * 
 * @returns {void} No return value; renders directly to the DOM
 * @throws {Error} Handled internally via handleElementError
 * 
 * @example
 * // Complete board render, typically called after state changes
 * renderGameBoard();
 * 
 * @example
 * // Typical usage after a card move
 * moveCard(cardId, originSlotId, targetSlotId);
 * renderGameBoard();
 */
export function renderGameBoard() {
    console.log("DEBUG: renderGameBoard started");
    const state = getState(); // Get state for checks if needed
    const gameContainer = document.getElementById('game-container');

    if (!validateRenderData(gameContainer, "#game-container not found!")) {
        console.error("DEBUG: Game container not found");
        return;
    }

    // Clear ONLY the dynamically generated card slots and cards inside the container
    console.log("DEBUG: Clearing existing elements from game container");
    const elementsToRemove = gameContainer.querySelectorAll('.game-slot, .card-image, .card-error-placeholder');
    console.log(`DEBUG: Found ${elementsToRemove.length} elements to remove`);
    elementsToRemove.forEach(el => el.remove());

    // Call render functions for each section (no container arguments needed)
    // Player hands contain cards from the players' hand arrays
    console.log("DEBUG: Rendering player hands");
    renderPlayerHand(1);
    renderPlayerHand(2);
    // TODO: Add logic to render P3/P4 based on game setup/player count
    renderPlayerHand(3);
    renderPlayerHand(4);

    // Character slots represent player avatars/roles
    console.log("DEBUG: Rendering character slots");
    renderCharacterSlot(1);
    renderCharacterSlot(2);
    // TODO: Add logic to render P3/P4 based on game setup/player count
    renderCharacterSlot(3);
    renderCharacterSlot(4);

    // The story grid is the main play area (multiple card slots in a grid layout)
    console.log("DEBUG: Rendering story grid");
    renderStoryGrid(); // Renders all grid slots based on GameState.boardSlots

    // Render main and alt draw/discard piles
    console.log("DEBUG: Rendering deck piles");
    renderDeckPile('main');
    renderDeckPile('alt');

    // --- Render Mutable Slots using Render Utils --- //
    console.log("DEBUG: Rendering mutable slots");
    // Iterate through the NEW cardSlots, but use OLD boardSlots temporarily to identify type
    Object.keys(GameState.cardSlots).forEach(slotId => {
        // Use old structure just to identify the type
        const slotTypeInfo = GameState.boardSlots[slotId]; 
        if (slotTypeInfo?.type !== 'mutable') {
            return; // Skip non-mutable slots
        }

        // Get coordinates (still needed)
        const coords = GameState.uiCoordinates[slotId];
        if (!validateRenderData(coords, `Mutable slot coordinates not found for ID: ${slotId}`)) {
            return; // Skip if no coords
        }

        // Get the card OBJECT directly from the NEW state structure
        const cardObject = GameState.cardSlots[slotId]; // This is either null or CardObject_New

        // Render the slot with the card object (or null)
        const mutableSlotElement = renderSlotWithCard(
            slotId,
            'mutable',
            null,       // playerId (mutable slots don't have a player)
            coords,
            cardObject, // Pass the card object directly (contains id, name, imageUrl, type, faceUp)
            5,          // slotZIndex
            10          // cardZIndex
        );

        // Append the resulting element
        if (mutableSlotElement) {
            // Set size based on coordinates
            mutableSlotElement.style.width = `${coords.W}px`;
            mutableSlotElement.style.height = `${coords.H}px`;
            // Add specific class if needed (optional, could be added in createSlotElement if standard)
            mutableSlotElement.classList.add('mutable-slot');
            gameContainer.appendChild(mutableSlotElement);
        } else {
            // Error handled by renderSlotWithCard
            console.error(`Failed to render mutable slot ${slotId}`);
        }
    });
    console.log("DEBUG: renderGameBoard completed");
} 