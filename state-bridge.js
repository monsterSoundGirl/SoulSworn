// state-bridge.js - Bridge between legacy code and state management
//
// This file provides compatibility functions to gradually migrate
// the codebase from direct global variable access to using the state
// management system.

// Initialize the state from existing global variables when the page loads
window.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing state management bridge...');
  
  // Initialize state with current global values
  if (window.GameState) {
    GameState.initialize();
    console.log('State management system initialized from global variables');
  } else {
    console.error('State management system not found');
  }
});

// Bridge functions for deck operations
// These override the existing functions with versions that use state management
// while maintaining the same API for compatibility

// Override the original drawCards function
const originalDrawCards = window.drawCards;
window.drawCards = function(deckType) {
  console.log(`Drawing card from ${deckType} deck (state managed)`);
  
  if (!window.GameState) {
    console.warn('State management not available, using original implementation');
    return originalDrawCards(deckType);
  }
  
  // Determine which deck to draw from
  const deck = GameState.get(deckType === 'main' ? 'mainDeck' : 'altDeck');
  
  if (deck.length === 0) {
    showNotification(`${deckType === 'main' ? 'Main' : 'Alt'} deck is empty. Shuffle discard pile first.`, 'warning');
    return;
  }
  
  // Find all empty hand slots
  const emptySlots = [];
  
  for (let playerIndex = 0; playerIndex < playerCount; playerIndex++) {
    const playerHand = document.getElementById(`player${playerIndex + 1}Hand`);
    if (!playerHand) continue;
    
    const handSlots = playerHand.querySelectorAll('.handCard:not(.charCard)');
    handSlots.forEach((slot, slotIndex) => {
      if (!slot.querySelector('.card')) {
        emptySlots.push({
          slot,
          playerIndex,
          slotIndex
        });
      }
    });
  }
  
  if (emptySlots.length === 0) {
    showNotification('No empty slots in player hands', 'info');
    return;
  }
  
  // Sort empty slots by player index and then slot index for round-robin dealing
  emptySlots.sort((a, b) => {
    if (a.playerIndex !== b.playerIndex) {
      return a.playerIndex - b.playerIndex;
    }
    return a.slotIndex - b.slotIndex;
  });
  
  // Deal cards to empty slots round-robin style
  let cardsToDeal = Math.min(emptySlots.length, deck.length);
  for (let i = 0; i < cardsToDeal; i++) {
    // Use the state management system to draw a card
    const card = deckType === 'main' 
      ? GameState.Decks.drawFromMainDeck() 
      : GameState.Decks.drawFromAltDeck();
      
    card.faceUp = false; // Make sure it's face down
    
    const targetSlot = emptySlots[i].slot;
    const playerIdx = emptySlots[i].playerIndex;
    const slotIdx = emptySlots[i].slotIndex;
    
    // Add card to player's hand using the state system
    GameState.Players.addCardToHand(playerIdx, card);
    
    // Sync with global variables for backward compatibility
    if (!playerHands[playerIdx]) {
      playerHands[playerIdx] = [];
    }
    while (playerHands[playerIdx].length <= slotIdx) {
      playerHands[playerIdx].push(null);
    }
    playerHands[playerIdx][slotIdx] = card;
    
    // Create a card element and add it to the slot
    const cardElement = createCardElement(card);
    targetSlot.appendChild(cardElement);
  }
  
  // Update deck display
  if (deckType === 'main') {
    renderMainDeck();
  } else {
    renderAltDeck();
  }
  
  showNotification(`Dealt ${cardsToDeal} card${cardsToDeal !== 1 ? 's' : ''} from ${deckType} deck`, 'success');
};

// Override the original shuffleDiscardIntoDeck function
const originalShuffleDiscardIntoDeck = window.shuffleDiscardIntoDeck;
window.shuffleDiscardIntoDeck = function(deckType) {
  console.log(`Shuffling ${deckType} discard into deck (state managed)`);
  
  if (!window.GameState) {
    console.warn('State management not available, using original implementation');
    return originalShuffleDiscardIntoDeck(deckType);
  }
  
  // Use the state management system for the operations
  if (deckType === 'main') {
    const discard = GameState.get('mainDiscard');
    if (discard.length === 0) {
      showNotification('Main discard pile is empty', 'warning');
      return;
    }
    
    GameState.Decks.shuffleDiscardIntoMainDeck();
  } else {
    const discard = GameState.get('altDiscard');
    if (discard.length === 0) {
      showNotification('Alt discard pile is empty', 'warning');
      return;
    }
    
    GameState.Decks.shuffleDiscardIntoAltDeck();
  }
  
  // Sync with global variables for backward compatibility
  if (deckType === 'main') {
    mainDeck = GameState.get('mainDeck');
    mainDiscard = GameState.get('mainDiscard');
  } else {
    altDeck = GameState.get('altDeck');
    altDiscard = GameState.get('altDiscard');
  }
  
  // Update displays
  if (deckType === 'main') {
    renderMainDeck();
    renderMainDiscard();
  } else {
    renderAltDeck();
    renderAltDiscard();
  }
  
  showNotification(`Shuffled ${deckType} discard pile into deck`, 'success');
};

// Add a state change subscriber to keep global variables in sync
// This helps with backward compatibility during the transition
const unsubscribe = GameState.subscribe((path, oldValue, newValue) => {
  // Update global variables when state changes
  if (path === 'mainDeck') {
    window.mainDeck = newValue;
  } else if (path === 'mainDiscard') {
    window.mainDiscard = newValue;
  } else if (path === 'altDeck') {
    window.altDeck = newValue;
  } else if (path === 'altDiscard') {
    window.altDiscard = newValue;
  } else if (path === 'playerHands') {
    window.playerHands = newValue;
  } else if (path === 'playerNames') {
    window.playerNames = newValue;
  } else if (path === 'playerCount') {
    window.playerCount = newValue;
  } else if (path === 'playerCharacters') {
    window.playerCharacters = newValue;
  } else if (path === 'gameStarted') {
    window.gameStarted = newValue;
  }
});

// Function to observe changes to the global variables and update state
// This helps catch changes made directly to globals
function syncGlobalsToState() {
  // Check if key variables have changed since last sync
  const currentState = GameState.get();
  
  // Update state if global variables have changed
  if (JSON.stringify(window.mainDeck) !== JSON.stringify(currentState.mainDeck)) {
    GameState.set('mainDeck', window.mainDeck);
  }
  
  if (JSON.stringify(window.mainDiscard) !== JSON.stringify(currentState.mainDiscard)) {
    GameState.set('mainDiscard', window.mainDiscard);
  }
  
  if (JSON.stringify(window.altDeck) !== JSON.stringify(currentState.altDeck)) {
    GameState.set('altDeck', window.altDeck);
  }
  
  if (JSON.stringify(window.altDiscard) !== JSON.stringify(currentState.altDiscard)) {
    GameState.set('altDiscard', window.altDiscard);
  }
  
  // Schedule next check
  setTimeout(syncGlobalsToState, 2000); // Check every 2 seconds
}

// Start monitoring global variables
syncGlobalsToState();

console.log('State bridge initialized successfully'); 