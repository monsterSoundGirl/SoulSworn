/**
 * Soulsworn StoryGrid Component
 * 
 * Responsible for rendering the main story grid area of the game board.
 * This component handles:
 * - Creating and positioning all story grid slot elements
 * - Rendering cards placed in grid slots
 * - Maintaining proper z-index layering (slots below cards)
 * - Handling error cases for missing data
 * 
 * The story grid is the central play area where cards create the game narrative.
 * It consists of multiple slots arranged in a grid pattern, each capable of
 * holding a single card. Cards can be dragged to and from these slots during gameplay.
 * 
 * @module StoryGrid
 */

import { getState, GameState } from '../state.js';
// Import utility functions
import { handleElementError } from '../utils.js'; // Keep for initial checks
// Import new render utility functions
import { renderSlotWithCard, validateRenderData } from '../utils/renderUtils.js';

/**
 * Renders the story grid slots and any cards placed within them.
 *
 * This function:
 * 1. Identifies all slots of type 'storyGrid' in the GameState
 * 2. Creates DOM elements for each grid slot using utility functions
 * 3. Positions these elements based on coordinates from UIcoordinates.json
 * 4. Renders cards that are assigned to grid slots in the current state
 * 5. Sets appropriate z-index values to maintain proper layering
 * 
 * @returns {void} - No return value; renders directly to the DOM
 * @throws {Error} - Handled internally via handleElementError
 * 
 * @example
 * // Render the entire story grid
 * renderStoryGrid();
 * 
 * @example
 * // Typical usage after state changes
 * moveCard(cardId, originSlotId, 'GRID5');
 * renderGameBoard(); // Will call renderStoryGrid internally
 */
export function renderStoryGrid() {
    const gameContainer = document.getElementById('game-container');
    if (!validateRenderData(gameContainer, "Game container element (#game-container) not found!")) {
        return; // Exit if container not found
    }

    // Get all story grid slot IDs by filtering the new cardSlots state
    const gridSlotIds = Object.keys(GameState.cardSlots).filter(slotId =>
        slotId.startsWith('GRID') // Assuming grid slots are prefixed with 'GRID'
    );
    console.log(`DEBUG: Found ${gridSlotIds.length} story grid slots in cardSlots:`, gridSlotIds);

    gridSlotIds.forEach(slotId => {
        const coords = GameState.uiCoordinates[slotId];

        // Basic validation for coordinates
        if (!validateRenderData(coords, `Story grid coordinates not found for ID: ${slotId}`)) {
            console.error(`DEBUG: Coordinates missing for grid slot ${slotId}`);
            return; // Skip this iteration
        }

        // Retrieve card data directly from the new cardSlots state
        const cardData = GameState.cardSlots[slotId];

        // Log the card data found (or null)
        if (cardData) {
            console.log(`DEBUG: Card for slot ${slotId}, cardData from cardSlots:`, cardData);
            if (!cardData.id) {
                console.warn(`DEBUG: Card object in cardSlots.${slotId} is missing 'id' property.`);
            }
        } else {
            console.log(`DEBUG: No card for slot ${slotId} (empty slot in cardSlots)`);
        }

        // Use the new utility function to render the slot and potentially the card
        const gridSlotElement = renderSlotWithCard(
            slotId,
            'storyGrid',        // slotType
            null,             // playerId (null for grid slots)
            coords,
            cardData,           // Pass the retrieved cardData object or null
            5,                  // slotZIndex
            10                  // cardZIndex
        );

        // Append the resulting element (slot with or without card) to the container
        if (gridSlotElement) {
            // Set size based on coordinates (renderSlotWithCard doesn't handle size)
            gridSlotElement.style.width = `${coords.W}px`;
            gridSlotElement.style.height = `${coords.H}px`;
            gameContainer.appendChild(gridSlotElement);
        } else {
            // Error logged by renderSlotWithCard, additional logging if needed
            console.error(`Failed to render story grid slot ${slotId}`);
        }
    });
} 