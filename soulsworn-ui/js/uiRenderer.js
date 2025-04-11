/**
 * SoulSworn UI Renderer
 * This script is responsible for rendering the UI elements based on coordinates data.
 * It creates placeholder elements for all game components without any game logic.
 */

// Global coordinates data
let uiCoordinates = {};

/**
 * Loads the UI coordinates from the JSON file
 */
async function loadUICoordinates() {
  try {
    const response = await fetch('data/UIcoordinates.json');
    if (!response.ok) {
      throw new Error(`Failed to load UI coordinates: ${response.status}`);
    }
    const data = await response.json();
    
    // Extract the coordinates and convert to a key-value format
    // where the key is the LABEL and the value is the coordinate object
    uiCoordinates = {};
    if (data.UIcoordinates && Array.isArray(data.UIcoordinates)) {
      data.UIcoordinates.forEach(coord => {
        if (coord.LABEL) {
          uiCoordinates[coord.LABEL] = {
            W: coord.W,
            H: coord.H,
            X: coord.X,
            Y: coord.Y
          };
        }
      });
    }
    
    console.log(`Loaded ${Object.keys(uiCoordinates).length} UI coordinates`);
    return true;
  } catch (error) {
    console.error('Error loading UI coordinates:', error);
    return false;
  }
}

/**
 * Creates a slot element for the given slot type and ID
 */
function createSlotElement(slotId, slotType, coords) {
  // Create the slot element
  const slotElement = document.createElement('div');
  slotElement.id = slotId;
  slotElement.dataset.slotId = slotId;
  slotElement.className = `card-slot ${slotType}-slot`;
  
  // Set position and size based on coordinates
  slotElement.style.width = `${coords.W}px`;
  slotElement.style.height = `${coords.H}px`;
  slotElement.style.left = `${coords.X}px`;
  slotElement.style.top = `${coords.Y}px`;
  
  return slotElement;
}

/**
 * Renders player hand slots
 */
function renderPlayerHands() {
  const gameContainer = document.getElementById('game-container');
  if (!gameContainer) return;
  
  // Render player hands (1-4) with slots (1-5)
  for (let playerId = 1; playerId <= 4; playerId++) {
    for (let slotId = 1; slotId <= 5; slotId++) {
      const coordKey = `PLAYER${playerId}_HAND${slotId}`;
      const coords = uiCoordinates[coordKey];
      
      if (coords) {
        const slotElement = createSlotElement(
          coordKey,
          'player-hand', 
          coords
        );
        gameContainer.appendChild(slotElement);
      }
    }
    
    // Also add character card slot
    const charCoordKey = `PLAYER${playerId}_CHARCARD`;
    const charCoords = uiCoordinates[charCoordKey];
    if (charCoords) {
      const charSlotElement = createSlotElement(
        charCoordKey, 
        'character',
        charCoords
      );
      gameContainer.appendChild(charSlotElement);
    }
  }
}

/**
 * Renders the story grid slots
 */
function renderStoryGrid() {
  const gameContainer = document.getElementById('game-container');
  if (!gameContainer) return;
  
  // Render story grid slots (GRID1-GRID40)
  for (let gridId = 1; gridId <= 40; gridId++) {
    const coordKey = `GRID${gridId}`;
    const coords = uiCoordinates[coordKey];
    
    if (coords) {
      const slotElement = createSlotElement(
        coordKey,
        'story-grid',
        coords
      );
      gameContainer.appendChild(slotElement);
    }
  }
}

/**
 * Renders deck and mutable slots
 */
function renderDeckAndMutableSlots() {
  const gameContainer = document.getElementById('game-container');
  if (!gameContainer) return;
  
  // Render deck and discard slots
  const deckSlots = ['DECK', 'DISCARD', 'ALTDECK', 'ALTDISCARD'];
  deckSlots.forEach(slotId => {
    const coords = uiCoordinates[slotId];
    if (coords) {
      const slotElement = createSlotElement(
        slotId,
        'deck',
        coords
      );
      gameContainer.appendChild(slotElement);
    }
  });
  
  // Render mutable slots (MUTABLE1-MUTABLE4)
  for (let mutId = 1; mutId <= 4; mutId++) {
    const coordKey = `MUTABLE${mutId}`;
    const coords = uiCoordinates[coordKey];
    
    if (coords) {
      const slotElement = createSlotElement(
        coordKey,
        'mutable',
        coords
      );
      gameContainer.appendChild(slotElement);
    }
  }
}

/**
 * Initializes the UI and renders all elements
 */
async function initializeUI() {
  console.log('Initializing SoulSworn UI...');
  
  // Load the UI coordinates
  const loaded = await loadUICoordinates();
  if (!loaded) {
    console.error('Failed to load UI coordinates. UI cannot be rendered.');
    return;
  }
  
  // Render all UI elements
  renderPlayerHands();
  renderStoryGrid();
  renderDeckAndMutableSlots();
  
  console.log('UI rendering complete.');
}

// Export the initialization function
window.initializeUI = initializeUI; 