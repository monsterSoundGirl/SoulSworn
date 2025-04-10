// state.js - Global state management for SoulSworn

/**
 * State Management Module
 * 
 * This module provides a centralized state management system for the 
 * SoulSworn game, encapsulating all global state variables and providing
 * controlled access through getter and setter methods.
 * 
 * Benefits:
 * - Prevents direct manipulation of global state
 * - Provides logging of state changes
 * - Enables validation rules for state updates
 * - Makes it easier to track state changes for debugging
 */

// Private state storage (not directly accessible from outside)
const _state = {
  // Deck state
  mainDeck: [],
  mainDiscard: [],
  altDeck: [],
  altDiscard: [],
  
  // UI Interaction state
  draggedCard: null,
  highlightedCard: null,
  isDragging: false,
  
  // Player state
  playerCount: 1,
  playerCharacters: [],
  playerHands: [],
  playerNames: [],
  playerTokens: [],
  playerAwards: {},
  
  // Game state
  gameStarted: false,
  selectedToken: null,
  currentSuperlativeIndex: 0,
  
  // Game configuration
  gameState: {
    selectedObjective: null,
    scenesCount: 10,
    finalSceneIndex: 9,
    deckDistribution: {
      main: [],
      alt: [],
      none: []
    }
  }
};

// State change listeners
const _listeners = [];

// Allow subscribing to state changes
function subscribe(callback) {
  if (typeof callback !== 'function') {
    console.error('Subscribe requires a function callback');
    return;
  }
  
  _listeners.push(callback);
  return () => {
    // Return unsubscribe function
    const index = _listeners.indexOf(callback);
    if (index > -1) {
      _listeners.splice(index, 1);
    }
  };
}

// Notify listeners about state changes
function _notifyListeners(path, oldValue, newValue) {
  for (const listener of _listeners) {
    try {
      listener(path, oldValue, newValue);
    } catch (err) {
      console.error('Error in state change listener:', err);
    }
  }
}

// State change history for debugging
const _stateHistory = [];
const MAX_HISTORY_SIZE = 100;

// Add an entry to the state change history
function _addToStateHistory(path, oldValue, newValue, timestamp = new Date()) {
  _stateHistory.push({
    path,
    oldValue: JSON.parse(JSON.stringify(oldValue)),
    newValue: JSON.parse(JSON.stringify(newValue)),
    timestamp
  });
  
  // Keep history at a reasonable size
  if (_stateHistory.length > MAX_HISTORY_SIZE) {
    _stateHistory.shift();
  }
}

// Get state history
function getStateHistory() {
  return [..._stateHistory];
}

// Clear state history
function clearStateHistory() {
  _stateHistory.length = 0;
}

// Validation rules for state changes
const _validationRules = {
  playerCount: (value) => {
    if (typeof value !== 'number' || value < 1 || value > 4) {
      throw new Error('playerCount must be a number between 1 and 4');
    }
    return true;
  },
  'gameState.scenesCount': (value) => {
    if (typeof value !== 'number' || value < 3 || value > 40) {
      throw new Error('scenesCount must be a number between 3 and 40');
    }
    return true;
  }
};

// Generic getter with path support (e.g., 'gameState.scenesCount')
function get(path) {
  if (!path) {
    // Return a deep copy of the entire state
    return JSON.parse(JSON.stringify(_state));
  }
  
  // Handle nested paths like 'gameState.scenesCount'
  const pathParts = path.split('.');
  let value = _state;
  
  for (const part of pathParts) {
    if (value === null || value === undefined) {
      console.warn(`Attempted to access ${path} but ${part} is ${value}`);
      return undefined;
    }
    value = value[part];
  }
  
  // Return a copy to prevent direct mutation
  return Array.isArray(value) || typeof value === 'object' ? 
    JSON.parse(JSON.stringify(value)) : value;
}

// Generic setter with path support
function set(path, value) {
  if (!path) {
    console.error('Cannot set state without a path');
    return false;
  }
  
  // Handle nested paths
  const pathParts = path.split('.');
  const lastPart = pathParts.pop();
  
  let target = _state;
  const oldValue = get(path);
  
  // Navigate to the correct object
  for (const part of pathParts) {
    if (target[part] === null || typeof target[part] !== 'object') {
      // Create the path if it doesn't exist
      target[part] = {};
    }
    target = target[part];
  }
  
  // Check validation rules if any
  if (_validationRules[path]) {
    try {
      _validationRules[path](value);
    } catch (err) {
      console.error(`Validation error for ${path}:`, err.message);
      return false;
    }
  }
  
  // Update the value
  target[lastPart] = value;
  
  // Log the change
  console.log(`State change: ${path} = `, value);
  
  // Add to history
  _addToStateHistory(path, oldValue, value);
  
  // Notify listeners
  _notifyListeners(path, oldValue, value);
  
  return true;
}

// Initialize the state with default values from the global scope
function initialize() {
  // If global variables are defined, use them to initialize state
  if (window.mainDeck) set('mainDeck', window.mainDeck);
  if (window.mainDiscard) set('mainDiscard', window.mainDiscard);
  if (window.altDeck) set('altDeck', window.altDeck);
  if (window.altDiscard) set('altDiscard', window.altDiscard);
  
  if (window.playerCount) set('playerCount', window.playerCount);
  if (window.playerCharacters) set('playerCharacters', window.playerCharacters);
  if (window.playerHands) set('playerHands', window.playerHands);
  if (window.playerNames) set('playerNames', window.playerNames);
  if (window.playerTokens) set('playerTokens', window.playerTokens);
  if (window.gameStarted !== undefined) set('gameStarted', window.gameStarted);
  
  if (window.gameState) {
    if (window.gameState.selectedObjective) set('gameState.selectedObjective', window.gameState.selectedObjective);
    if (window.gameState.scenesCount) set('gameState.scenesCount', window.gameState.scenesCount);
    if (window.gameState.finalSceneIndex) set('gameState.finalSceneIndex', window.gameState.finalSceneIndex);
  }
  
  console.log('State initialized from global variables');
}

// Reset state to defaults
function reset() {
  set('mainDeck', []);
  set('mainDiscard', []);
  set('altDeck', []);
  set('altDiscard', []);
  set('draggedCard', null);
  set('highlightedCard', null);
  set('isDragging', false);
  set('playerCount', 1);
  set('playerCharacters', []);
  set('playerHands', []);
  set('playerNames', []);
  set('playerTokens', []);
  set('gameStarted', false);
  set('selectedToken', null);
  set('gameState', {
    selectedObjective: null,
    scenesCount: 10,
    finalSceneIndex: 9,
    deckDistribution: {
      main: [],
      alt: [],
      none: []
    }
  });
  
  clearStateHistory();
  console.log('State reset to defaults');
}

// Convenience methods for common operations
const Decks = {
  // Deck operations
  drawFromMainDeck: () => {
    const deck = get('mainDeck');
    if (deck.length === 0) return null;
    
    const card = deck[0];
    set('mainDeck', deck.slice(1));
    return card;
  },
  
  drawFromAltDeck: () => {
    const deck = get('altDeck');
    if (deck.length === 0) return null;
    
    const card = deck[0];
    set('altDeck', deck.slice(1));
    return card;
  },
  
  addToMainDiscard: (card) => {
    const discard = get('mainDiscard');
    set('mainDiscard', [...discard, card]);
  },
  
  addToAltDiscard: (card) => {
    const discard = get('altDiscard');
    set('altDiscard', [...discard, card]);
  },
  
  shuffleMainDeck: () => {
    const deck = get('mainDeck');
    // Using the utility function from utils.js
    set('mainDeck', window.shuffleArray ? window.shuffleArray([...deck]) : deck);
  },
  
  shuffleAltDeck: () => {
    const deck = get('altDeck');
    // Using the utility function from utils.js
    set('altDeck', window.shuffleArray ? window.shuffleArray([...deck]) : deck);
  },
  
  shuffleDiscardIntoMainDeck: () => {
    const deck = get('mainDeck');
    const discard = get('mainDiscard');
    const combinedDeck = [...deck, ...discard];
    set('mainDeck', window.shuffleArray ? window.shuffleArray(combinedDeck) : combinedDeck);
    set('mainDiscard', []);
  },
  
  shuffleDiscardIntoAltDeck: () => {
    const deck = get('altDeck');
    const discard = get('altDiscard');
    const combinedDeck = [...deck, ...discard];
    set('altDeck', window.shuffleArray ? window.shuffleArray(combinedDeck) : combinedDeck);
    set('altDiscard', []);
  }
};

// Player management convenience methods
const Players = {
  setPlayerName: (index, name) => {
    const names = get('playerNames');
    // Ensure array is large enough
    const updatedNames = [...names];
    while (updatedNames.length <= index) {
      updatedNames.push('');
    }
    updatedNames[index] = name;
    set('playerNames', updatedNames);
  },
  
  setPlayerCharacter: (index, character) => {
    const characters = get('playerCharacters');
    // Ensure array is large enough
    const updatedCharacters = [...characters];
    while (updatedCharacters.length <= index) {
      updatedCharacters.push(null);
    }
    updatedCharacters[index] = character;
    set('playerCharacters', updatedCharacters);
  },
  
  addCardToHand: (playerIndex, card) => {
    const hands = get('playerHands');
    // Ensure array is large enough
    const updatedHands = [...hands];
    while (updatedHands.length <= playerIndex) {
      updatedHands.push([]);
    }
    
    // Find an empty slot in the player's hand
    const hand = updatedHands[playerIndex] || [];
    let emptySlotIndex = hand.findIndex(c => !c);
    
    if (emptySlotIndex === -1 && hand.length < 5) {
      // Add to the end if hand isn't full
      emptySlotIndex = hand.length;
    }
    
    if (emptySlotIndex === -1) {
      console.warn(`Player ${playerIndex + 1}'s hand is full`);
      return false;
    }
    
    // Update the hand
    const updatedHand = [...hand];
    updatedHand[emptySlotIndex] = card;
    updatedHands[playerIndex] = updatedHand;
    
    set('playerHands', updatedHands);
    return true;
  },
  
  removeCardFromHand: (playerIndex, cardIndex) => {
    const hands = get('playerHands');
    if (!hands[playerIndex] || !hands[playerIndex][cardIndex]) {
      return null;
    }
    
    const card = hands[playerIndex][cardIndex];
    const updatedHands = [...hands];
    updatedHands[playerIndex] = [...hands[playerIndex]];
    updatedHands[playerIndex][cardIndex] = null;
    
    set('playerHands', updatedHands);
    return card;
  }
};

// Game setup and progression methods
const Game = {
  startGame: () => {
    set('gameStarted', true);
  },
  
  endGame: () => {
    set('gameStarted', false);
  },
  
  setSceneCount: (count) => {
    const validCount = Math.max(3, Math.min(40, count));
    set('gameState.scenesCount', validCount);
    set('gameState.finalSceneIndex', validCount - 1);
  },
  
  setObjective: (objective) => {
    set('gameState.selectedObjective', objective);
  }
};

// Expose the API globally
window.GameState = {
  // Core state management
  get,
  set,
  subscribe,
  initialize,
  reset,
  getStateHistory,
  clearStateHistory,
  
  // Convenience modules
  Decks,
  Players,
  Game
}; 