// Main entry point for the SoulSworn application

import { initializeState, getState, drawCard, GameState } from './state.js';
// import { createCardElement } from './components/Card.js'; // No longer needed for direct sample rendering
// Import other modules (UI components, logic, services) as they are created
import { renderGameBoard } from './components/GameBoard.js'; // Import the main board renderer

// Make the listener async to use await for initializeState
document.addEventListener('DOMContentLoaded', async () => {
  console.log("SoulSworn application initializing...");

  // 1. Initialize the game state (await the async function)
  try {
    await initializeState();
    console.log("Game state initialized.");

    // --- Phase 4: Initial Hand Draw ---
    console.log("Drawing initial hands...");
    drawCard('player1', GameState.initialHandSize, 'main');
    drawCard('player2', GameState.initialHandSize, 'main');
    drawCard('player3', GameState.initialHandSize, 'main');
    drawCard('player4', GameState.initialHandSize, 'main');
    console.log("Initial hands drawn.");
    // Log state after draw to verify
    console.log("GameState after initial draw:", JSON.parse(JSON.stringify(GameState)));
    // --- End Phase 4 ---

  } catch (error) {
    console.error("Failed to initialize game state or draw initial hands:", error);
    // Display error to user in the UI if appropriate
    const container = document.getElementById('game-container') || document.body;
    container.innerHTML = '<p style="color: red;">Error loading game data or dealing initial hands. Please check the console.</p>';
    return; // Stop execution if state fails to load
  }

  // --- Remove Phase 1 Test Code ---
  // const sampleArea = document.getElementById('sample-card-area');
  // const gameContainer = document.getElementById('game-container');
  // if (sampleArea && gameContainer) {
    // ... sample rendering logic removed ...
  // }
  // --- End Phase 1 Test ---

  // 2. Initial rendering based on state
  // Render the main game board container using the new component system
  renderGameBoard();

  // 3. Set up event listeners for user interactions (Placeholder)
  setupEventListeners();
});

// Placeholder for event listener setup
function setupEventListeners() {
  console.log("Setting up event listeners... (Placeholder)");
  // Add event listeners for buttons, drag/drop, etc. in future phases
} 