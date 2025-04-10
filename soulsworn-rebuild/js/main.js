// Main entry point for the SoulSworn application

import { initializeState, getState, drawCard, GameState, moveCard } from './state.js';
// Import other modules (UI components, logic, services) as they are created
import { renderGameBoard } from './components/GameBoard.js'; // Import the main board renderer

// Make the listener async to use await for initializeState
document.addEventListener('DOMContentLoaded', async () => {
  // console.log("SoulSworn application initializing...");

  // 1. Initialize the game state (await the async function)
  try {
    await initializeState();
    // console.log("Game state initialized.");

    // --- Phase 4: Initial Hand Draw ---
    // console.log("Drawing initial hands...");
    drawCard('player1', GameState.initialHandSize, 'main');
    drawCard('player2', GameState.initialHandSize, 'main');
    drawCard('player3', GameState.initialHandSize, 'main');
    drawCard('player4', GameState.initialHandSize, 'main');
    // console.log("Initial hands drawn.");
    // Log state after draw to verify
    // console.log("GameState after initial draw:", JSON.parse(JSON.stringify(GameState)));
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
  renderGameBoard();

  // 3. Set up event listeners for user interactions (Placeholder)
  setupEventListeners();
});

// Placeholder for event listener setup
function setupEventListeners() {
  // console.log("Setting up event listeners...");
  // Add event listeners for buttons, drag/drop, etc. in future phases

  // --- Phase 6: Drag and Drop Event Listeners ---
  // Use the standardized class '.game-slot' added by createSlotElement utility
  const slots = document.querySelectorAll('.game-slot'); // Select all potential drop targets

  if (slots.length === 0) {
    console.warn("setupEventListeners: No elements found with class '.game-slot'. Drag and drop targets may not be initialized correctly.");
  }

  slots.forEach(slot => {
    // Allow dropping onto the slot
    slot.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    // Handle the actual drop
    slot.addEventListener('drop', (event) => {
      event.preventDefault();

      // Get the JSON data string
      const jsonData = event.dataTransfer.getData('application/json');
      let dragData;
      try {
        dragData = JSON.parse(jsonData);
      } catch (error) {
        console.error("Error parsing drag data:", error);
        return;
      }

      const { cardId, originSlotId } = dragData; // Extract cardId and originSlotId

      // Find the closest parent that is a game slot and get its ID
      const targetSlotElement = event.target.closest('.game-slot');
      if (!targetSlotElement) {
          console.error("Drop target is not a valid slot:", event.target);
          return;
      }
      // Use dataset.id or fallback to element id if dataset is not explicitly set
      const targetSlotId = targetSlotElement.id || targetSlotElement.dataset.slotId;

      if (!targetSlotId) {
          console.error("Could not determine target slot ID from element:", targetSlotElement);
          return;
      }

      if (cardId && originSlotId && targetSlotId) { // Check all three IDs
        // console.log(`Card ${cardId} from ${originSlotId} dropped onto slot ${targetSlotId}`);

        // Update the game state
        moveCard(cardId, originSlotId, targetSlotId);

        // Re-render the game board to reflect the state change
        renderGameBoard();

        // *** Re-attach listeners to the newly rendered elements ***
        setupEventListeners();

      } else {
        console.error("Missing cardId, originSlotId, or targetSlotId during drop.");
        // console.log('Received Data:', { cardId, originSlotId, targetSlotId }); // Log what was received
      }
    });
  });
  // --- End Phase 6 ---
} 