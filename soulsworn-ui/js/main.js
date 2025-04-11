/**
 * SoulSworn UI Main Entry Point
 * This is the entry point for the UI-only version of SoulSworn.
 * It initializes the UI renderer without any game logic.
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('SoulSworn UI starting up...');
  
  // Initialize the UI (async function defined in uiRenderer.js)
  if (window.initializeUI) {
    window.initializeUI()
      .then(() => {
        console.log('SoulSworn UI initialization completed successfully.');
      })
      .catch(error => {
        console.error('Error during UI initialization:', error);
        // Display error message on the page
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
          gameContainer.innerHTML = `
            <div style="color: red; padding: 20px; text-align: center;">
              <h2>Error Loading UI</h2>
              <p>${error.message || 'Failed to initialize the UI'}</p>
            </div>
          `;
        }
      });
  } else {
    console.error('UI initialization function not found. Make sure uiRenderer.js is loaded correctly.');
  }
}); 