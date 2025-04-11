/**
 * Soulsworn Main Application Entry Point
 * 
 * This is the primary entry point and controller for the Soulsworn card game application.
 * The module is responsible for:
 * - Initializing the game state and loading necessary assets
 * - Rendering the initial game board
 * - Setting up user interaction event handlers
 * - Coordinating between UI components and state management
 * 
 * The application uses an event-driven architecture where user actions (primarily
 * drag-and-drop operations) trigger state changes, which then cause UI updates.
 * 
 * @module Main
 */

import { initializeState, getState, drawCard, GameState, moveCard, moveCardNew } from './state.js';
// Import other modules (UI components, logic, services) as they are created
import { renderGameBoard } from './components/GameBoard.js'; // Import the main board renderer

// Make the listener async to use await for initializeState
document.addEventListener('DOMContentLoaded', async () => {
  console.log("DEBUG: SoulSworn application initializing...");

  // 1. Initialize the game state (await the async function)
  try {
    await initializeState();
    console.log("DEBUG: Game state initialized.");
    console.log("DEBUG: GameState after init:", GameState);

    // --- Phase 4: Initial Hand Draw ---
    console.log("DEBUG: Drawing initial hands...");
    drawCard('player1', GameState.initialHandSize, 'main');
    drawCard('player2', GameState.initialHandSize, 'main');
    drawCard('player3', GameState.initialHandSize, 'main');
    drawCard('player4', GameState.initialHandSize, 'main');
    console.log("DEBUG: Initial hands drawn.");
    // Log state after draw to verify player hands have cards
    console.log("DEBUG: Player1 hand:", GameState.players.player1.hand);
    console.log("DEBUG: Player2 hand:", GameState.players.player2.hand);
    // --- End Phase 4 ---

  } catch (error) {
    console.error("Failed to initialize game state or draw initial hands:", error);
    // Display error to user in the UI if appropriate
    const container = document.getElementById('game-container') || document.body;
    container.innerHTML = '<p style="color: red;">Error loading game data or dealing initial hands. Please check the console.</p>';
    return; // Stop execution if state fails to load
  }

  // 2. Initial rendering based on state
  // Render the main game board container using the new component system
  console.log("DEBUG: Calling renderGameBoard()...");
  renderGameBoard();
  console.log("DEBUG: renderGameBoard() completed.");

  // 3. Set up event listeners for user interactions
  setupEventListeners();
});

/**
 * @module main
 * @description Main entry point for the Soulsworn game UI. Initializes the game state,
 *              renders the initial game board, and sets up global event listeners
 *              using event delegation for drag-and-drop functionality.
 */

/**
 * Sets up global event listeners for drag-and-drop using event delegation.
 * Attaches listeners to the main game container (#game-container) to handle
 * drag start, drag over, and drop events originating from cards and slots.
 * This approach avoids the need to re-attach listeners after each render.
 */
function setupEventListeners() {
  // console.log("Setting up event listeners using delegation...");
  const gameContainer = document.getElementById('game-container');

  if (!gameContainer) {
    console.error("Fatal: Game container #game-container not found. Event listeners cannot be attached.");
    return;
  }

  // --- Event Delegation for Drag and Drop ---

  // DRAG START: Fired when the user starts dragging a card
  gameContainer.addEventListener('dragstart', (event) => {
    // Ensure the dragged element is a card image
    const cardElement = event.target.closest('.card-image[draggable="true"]');
    if (cardElement) {
      // KI-005 Debugging: Log the element being dragged and its dataset
      console.log(`[main.js->dragstart] Drag started on element:`, cardElement);
      console.log(`[main.js->dragstart] Element dataset:`, cardElement.dataset);

      const cardId = cardElement.dataset.manifestKey; // Use manifestKey for state
      // Find the parent slot to determine the origin
      const originSlotElement = cardElement.closest('.game-slot');
      const originSlotId = originSlotElement ? (originSlotElement.id || originSlotElement.dataset.slotId) : null;

      if (cardId && originSlotId) {
        const dragData = JSON.stringify({ cardId, originSlotId }); // Use cardId (which is manifestKey here)
        // KI-005 Debugging: Log the data being set
        console.log(`[main.js->dragstart] Setting dataTransfer:`, { cardId, originSlotId });
        event.dataTransfer.setData('application/json', dragData);
        event.dataTransfer.effectAllowed = 'move';
        // console.log(`Drag started: Card ${cardId} from ${originSlotId}`);
        // Optional: Add styling to the dragged element or source slot
      } else {
        console.warn("Drag start ignored: Could not determine cardId or originSlotId for", cardElement);
        event.preventDefault(); // Prevent dragging if data is missing
      }
    }
  });

  // DRAG OVER: Fired continuously while a dragged item is over a valid drop target
  gameContainer.addEventListener('dragover', (event) => {
    // Check if the element being dragged over is a valid drop zone (.game-slot)
    const targetSlotElement = event.target.closest('.game-slot');
    if (targetSlotElement) {
      event.preventDefault(); // Allow the drop by preventing default behavior
      // Optional: Add visual feedback to the drop target
      // targetSlotElement.classList.add('drag-over-active'); // Example class
    }
  });

  // Optional: Add dragleave or dragend listeners for cleanup (e.g., removing hover styles)
  // gameContainer.addEventListener('dragleave', (event) => {
  //   const targetSlotElement = event.target.closest('.game-slot');
  //   if (targetSlotElement) {
  //     targetSlotElement.classList.remove('drag-over-active');
  //   }
  // });

  // DROP: Fired when a dragged item is dropped onto a valid drop target
  gameContainer.addEventListener('drop', (event) => {
    event.preventDefault(); // Prevent default browser behavior (e.g., opening as link)
    // Optional: Remove visual feedback from drop target
    // const dropTarget = event.target.closest('.game-slot');
    // if (dropTarget) { dropTarget.classList.remove('drag-over-active'); }

    // Find the closest parent that is a game slot and get its ID
    const targetSlotElement = event.target.closest('.game-slot');
    if (!targetSlotElement) {
      // console.warn("Drop ignored: Target is not a valid game slot.", event.target);
      return;
    }

    // Get the data transferred during drag start
    const jsonData = event.dataTransfer.getData('application/json');
    let dragData;
    try {
      dragData = JSON.parse(jsonData);
      // KI-005 Debugging: Log the parsed data
      console.log(`[main.js->drop] Received dataTransfer:`, dragData);
    } catch (error) {
      console.error("Error parsing drag data on drop:", error);
      return;
    }

    const { cardId, originSlotId } = dragData; // cardId here should be the manifestKey
    // Use dataset.id or fallback to element id if dataset is not explicitly set
    const targetSlotId = targetSlotElement.id || targetSlotElement.dataset.slotId;

    // KI-005 Debugging: Log the identified IDs before calling moveCard
    console.log(`[main.js->drop] Attempting move:`, { cardId, originSlotId, targetSlotId });

    if (!targetSlotId) {
      console.error("Drop error: Could not determine target slot ID from element:", targetSlotElement);
      return;
    }

    if (cardId && originSlotId && targetSlotId) {
      // console.log(`Card ${cardId} from ${originSlotId} dropped onto slot ${targetSlotId}`);

      // Update the game state - USING THE NEW REFACTORED FUNCTION
      console.log(`[main.js->drop] Calling moveCardNew(${originSlotId}, ${targetSlotId})`);
      const moveSuccessful = moveCardNew(originSlotId, targetSlotId); // Use the new function

      if (moveSuccessful) {
        // Re-render the game board *only if* the move was successful
        // renderGameBoard(); // Temporarily commented out for debugging state updates
        // NO recursive call to setupEventListeners() needed due to delegation
      } else {
        console.log(`Move rejected by state logic: ${cardId} from ${originSlotId} to ${targetSlotId}`);
        // Optionally provide user feedback that the move was invalid
      }
    } else {
      console.error("Drop error: Missing cardId, originSlotId, or targetSlotId.");
      // console.log('Received Data on Drop:', { cardId, originSlotId, targetSlotId });
    }
  });

  // console.log("Event listeners setup complete.");
} 