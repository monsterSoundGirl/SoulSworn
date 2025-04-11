/**
 * Soulsworn State Management Module
 * 
 * Central repository for game state storage and manipulation. This module handles:
 * - Loading and initializing card data and UI coordinates
 * - Managing deck creation, shuffling, and card distribution
 * - Tracking card locations across the board
 * - Processing card movement between game zones
 * - Maintaining player hands and character assignments
 * 
 * @module State
 */

// Placeholder for the central game state

export const GameState = {
  allCards: {}, // Object: { [cardId]: Card } - Filled by scanning assets later
  uiCoordinates: null, // Object: { [LABEL]: { W, H, X, Y, LABEL } } - Loaded from UIcoordinates.json
  
  // NEW REFACTORED STATE STRUCTURE (Phase 1)
  cardSlots: { 
    // Example: "PLAYER1_HAND1": {id: "spell_7", name: "Mirror Snap", ...} or null
    // This will be populated during initialization/migration
  },
  mainDeck: [], // Array of Card objects
  mainDiscard: [], // Array of Card objects
  altDeck: [], // Array of Card objects
  altDiscard: [], // Array of Card objects
  // END NEW REFACTORED STATE STRUCTURE

  // --- Existing State (To be gradually replaced) ---
  players: [], // Array of Player objects
  boardSlots: { // Object: { [slotId/LABEL]: BoardSlot } - All card locations - IDs MUST match UIcoordinates.json LABELs
    // Player 1 Hand Slots (Assuming JSON LABELs: PLAYER1_HAND1 to PLAYER1_HAND5)
    'PLAYER1_HAND1': { id: 'PLAYER1_HAND1', type: 'hand', playerId: 1, cardId: null },
    'PLAYER1_HAND2': { id: 'PLAYER1_HAND2', type: 'hand', playerId: 1, cardId: null },
    'PLAYER1_HAND3': { id: 'PLAYER1_HAND3', type: 'hand', playerId: 1, cardId: null },
    'PLAYER1_HAND4': { id: 'PLAYER1_HAND4', type: 'hand', playerId: 1, cardId: null },
    'PLAYER1_HAND5': { id: 'PLAYER1_HAND5', type: 'hand', playerId: 1, cardId: null },
    // Player 2 Hand Slots (Assuming JSON LABELs: PLAYER2_HAND1 to PLAYER2_HAND5)
    'PLAYER2_HAND1': { id: 'PLAYER2_HAND1', type: 'hand', playerId: 2, cardId: null },
    'PLAYER2_HAND2': { id: 'PLAYER2_HAND2', type: 'hand', playerId: 2, cardId: null },
    'PLAYER2_HAND3': { id: 'PLAYER2_HAND3', type: 'hand', playerId: 2, cardId: null },
    'PLAYER2_HAND4': { id: 'PLAYER2_HAND4', type: 'hand', playerId: 2, cardId: null },
    'PLAYER2_HAND5': { id: 'PLAYER2_HAND5', type: 'hand', playerId: 2, cardId: null },
    // Player Character Slots (Assuming JSON LABELs: PLAYER1_CHARCARD, PLAYER2_CHARCARD, etc.)
    'PLAYER1_CHARCARD': { id: 'PLAYER1_CHARCARD', type: 'character', playerId: 1, cardId: null },
    'PLAYER2_CHARCARD': { id: 'PLAYER2_CHARCARD', type: 'character', playerId: 2, cardId: null },
    'PLAYER3_CHARCARD': { id: 'PLAYER3_CHARCARD', type: 'character', playerId: 3, cardId: null }, // Added P3/P4 placeholders
    'PLAYER4_CHARCARD': { id: 'PLAYER4_CHARCARD', type: 'character', playerId: 4, cardId: null }, // Added P3/P4 placeholders
    // Player 3 Hand Slots (Added)
    'PLAYER3_HAND1': { id: 'PLAYER3_HAND1', type: 'hand', playerId: 3, cardId: null },
    'PLAYER3_HAND2': { id: 'PLAYER3_HAND2', type: 'hand', playerId: 3, cardId: null },
    'PLAYER3_HAND3': { id: 'PLAYER3_HAND3', type: 'hand', playerId: 3, cardId: null },
    'PLAYER3_HAND4': { id: 'PLAYER3_HAND4', type: 'hand', playerId: 3, cardId: null },
    'PLAYER3_HAND5': { id: 'PLAYER3_HAND5', type: 'hand', playerId: 3, cardId: null },
    // Player 4 Hand Slots (Added)
    'PLAYER4_HAND1': { id: 'PLAYER4_HAND1', type: 'hand', playerId: 4, cardId: null },
    'PLAYER4_HAND2': { id: 'PLAYER4_HAND2', type: 'hand', playerId: 4, cardId: null },
    'PLAYER4_HAND3': { id: 'PLAYER4_HAND3', type: 'hand', playerId: 4, cardId: null },
    'PLAYER4_HAND4': { id: 'PLAYER4_HAND4', type: 'hand', playerId: 4, cardId: null },
    'PLAYER4_HAND5': { id: 'PLAYER4_HAND5', type: 'hand', playerId: 4, cardId: null },
    // Story Grid Slots (Assuming JSON LABELs: GRID1 to GRID40)
    // Note: JSON has GRID1-40, previous state had 3x3 (9 slots). Will use JSON labels.
    'GRID1': { id: 'GRID1', type: 'storyGrid', playerId: null, cardId: null },
    'GRID2': { id: 'GRID2', type: 'storyGrid', playerId: null, cardId: null },
    'GRID3': { id: 'GRID3', type: 'storyGrid', playerId: null, cardId: null },
    'GRID4': { id: 'GRID4', type: 'storyGrid', playerId: null, cardId: null },
    'GRID5': { id: 'GRID5', type: 'storyGrid', playerId: null, cardId: null },
    'GRID6': { id: 'GRID6', type: 'storyGrid', playerId: null, cardId: null },
    'GRID7': { id: 'GRID7', type: 'storyGrid', playerId: null, cardId: null },
    'GRID8': { id: 'GRID8', type: 'storyGrid', playerId: null, cardId: null },
    'GRID9': { id: 'GRID9', type: 'storyGrid', playerId: null, cardId: null },
    'GRID10': { id: 'GRID10', type: 'storyGrid', playerId: null, cardId: null },
    'GRID11': { id: 'GRID11', type: 'storyGrid', playerId: null, cardId: null },
    'GRID12': { id: 'GRID12', type: 'storyGrid', playerId: null, cardId: null },
    'GRID13': { id: 'GRID13', type: 'storyGrid', playerId: null, cardId: null },
    'GRID14': { id: 'GRID14', type: 'storyGrid', playerId: null, cardId: null },
    'GRID15': { id: 'GRID15', type: 'storyGrid', playerId: null, cardId: null },
    'GRID16': { id: 'GRID16', type: 'storyGrid', playerId: null, cardId: null },
    'GRID17': { id: 'GRID17', type: 'storyGrid', playerId: null, cardId: null },
    'GRID18': { id: 'GRID18', type: 'storyGrid', playerId: null, cardId: null },
    'GRID19': { id: 'GRID19', type: 'storyGrid', playerId: null, cardId: null },
    'GRID20': { id: 'GRID20', type: 'storyGrid', playerId: null, cardId: null },
    'GRID21': { id: 'GRID21', type: 'storyGrid', playerId: null, cardId: null },
    'GRID22': { id: 'GRID22', type: 'storyGrid', playerId: null, cardId: null },
    'GRID23': { id: 'GRID23', type: 'storyGrid', playerId: null, cardId: null },
    'GRID24': { id: 'GRID24', type: 'storyGrid', playerId: null, cardId: null },
    'GRID25': { id: 'GRID25', type: 'storyGrid', playerId: null, cardId: null },
    'GRID26': { id: 'GRID26', type: 'storyGrid', playerId: null, cardId: null },
    'GRID27': { id: 'GRID27', type: 'storyGrid', playerId: null, cardId: null },
    'GRID28': { id: 'GRID28', type: 'storyGrid', playerId: null, cardId: null },
    'GRID29': { id: 'GRID29', type: 'storyGrid', playerId: null, cardId: null },
    'GRID30': { id: 'GRID30', type: 'storyGrid', playerId: null, cardId: null },
    'GRID31': { id: 'GRID31', type: 'storyGrid', playerId: null, cardId: null },
    'GRID32': { id: 'GRID32', type: 'storyGrid', playerId: null, cardId: null },
    'GRID33': { id: 'GRID33', type: 'storyGrid', playerId: null, cardId: null },
    'GRID34': { id: 'GRID34', type: 'storyGrid', playerId: null, cardId: null },
    'GRID35': { id: 'GRID35', type: 'storyGrid', playerId: null, cardId: null },
    'GRID36': { id: 'GRID36', type: 'storyGrid', playerId: null, cardId: null },
    'GRID37': { id: 'GRID37', type: 'storyGrid', playerId: null, cardId: null },
    'GRID38': { id: 'GRID38', type: 'storyGrid', playerId: null, cardId: null },
    'GRID39': { id: 'GRID39', type: 'storyGrid', playerId: null, cardId: null },
    'GRID40': { id: 'GRID40', type: 'storyGrid', playerId: null, cardId: null },
    // Deck and Discard Slots (Assuming JSON LABELs: DECK, DISCARD, ALTDECK, ALTDISCARD)
    'DECK': { id: 'DECK', type: 'deckDraw', deckType: 'main', playerId: null, cardId: 'cardBack' }, // Added deckType
    'DISCARD': { id: 'DISCARD', type: 'deckDiscard', deckType: 'main', playerId: null, cardId: null },
    'ALTDECK': { id: 'ALTDECK', type: 'deckDraw', deckType: 'alt', playerId: null, cardId: 'cardBack' },
    'ALTDISCARD': { id: 'ALTDISCARD', type: 'deckDiscard', deckType: 'alt', playerId: null, cardId: null },
    // Mutable Slots (Assuming JSON LABELs: MUTABLE1 to MUTABLE4)
    'MUTABLE1': { id: 'MUTABLE1', type: 'mutable', playerId: null, cardId: null },
    'MUTABLE2': { id: 'MUTABLE2', type: 'mutable', playerId: null, cardId: null },
    'MUTABLE3': { id: 'MUTABLE3', type: 'mutable', playerId: null, cardId: null },
    'MUTABLE4': { id: 'MUTABLE4', type: 'mutable', playerId: null, cardId: null },
    // Placeholders from JSON (Inspector, D20, Menu, Logo, Turn Timer) are not card slots, handled in HTML/CSS
  },
  gamePhase: 'setup', // String: 'setup', 'playing', 'ended'
  currentPlayerId: null, // Number | null
  currentStorytellerId: null, // Number | null
  lastD20Result: null, // Number | null
  timerState: {
    isRunning: false,
    currentTime: 0, // elapsed time in seconds or ms
    setTime: 300, // Default 5 minutes (300 seconds)
  },
  notesContent: '', // String for Notes Tray
  cardInspectorContent: null, // Card id | null
  initialHandSize: 5, // Initial hand size for each player
  cardData: {}, // To store loaded card details
  assignedCardTypes: { // Defines which card types go into which deck
    main: ['item', 'spell'],
    alt: ['location', 'monster']
  },
  players: {
    player1: {
      id: 1,
      hand: [], // Array of card IDs in hand
      characterSlotId: 'PLAYER1_CHARCARD', // Updated ID
      // Player-specific state like tokens can be added later
    },
    player2: {
      id: 2,
      hand: [], // Array of card IDs in hand
      characterSlotId: 'PLAYER2_CHARCARD', // Updated ID
    },
    // Add player 3 & 4 if needed based on JSON
    player3: {
      id: 3,
      hand: [],
      characterSlotId: 'PLAYER3_CHARCARD',
    },
    player4: {
      id: 4,
      hand: [],
      characterSlotId: 'PLAYER4_CHARCARD',
    }
  },
};

// --- Data Structure Definitions (for reference) ---

/**
 * @typedef {Object} CardObject_New
 * @property {string} id - Unique identifier (manifestKey, e.g., "spell_7")
 * @property {string} name - Display name (e.g., "Mirror Snap")
 * @property {string} imageUrl - Path to image
 * @property {string} type - Card type
 * @property {boolean} faceUp - Orientation
 */

/**
 * @typedef {Object} Card
 * @property {string} id - Unique identifier with descriptive name (e.g., 'boneReaper')
 * @property {string} type - Card type category ('item', 'spell', 'location', 'monster', etc.)
 * @property {string} imageUrl - Path to the card image file
 */

/**
 * @typedef {Object} Player
 * @property {number} id - Player number (1-4)
 * @property {Array<string>} hand - Array of card IDs in player's hand
 * @property {string} characterSlotId - ID of the slot holding player's character card
 */

/**
 * @typedef {Object} Deck
 * @property {string} type - Deck identifier ('main' or 'alt')
 * @property {Array<string>} assignedCardTypes - Types of cards included in this deck
 * @property {Array<string>} drawPile - Array of card IDs in the draw pile
 * @property {Array<string>} discardPile - Array of card IDs in the discard pile
 */

/**
 * @typedef {Object} BoardSlot
 * @property {string} id - Unique identifier matching UIcoordinates.json LABEL
 * @property {string} type - Slot type ('hand', 'storyGrid', 'character', 'deckDraw', 'deckDiscard', 'mutable')
 * @property {number|null} playerId - Player ID if applicable, null for shared board slots
 * @property {string|null} cardId - Card ID currently in slot, or null if empty
 * @property {string} [deckType] - For deck slots, identifies which deck ('main' or 'alt')
 */

// --- Helper Functions ---

/**
 * Creates a standard card object from the manifest data.
 * @param {string} manifestKey - The unique key from the card manifest (e.g., 'item_1')
 * @returns {CardObject_New | null} The card object or null if manifestKey not found.
 */
function createCardObject(manifestKey) {
  const cardData = GameState.allCards[manifestKey];
  if (!cardData) {
    console.error(`createCardObject: Card data not found for key ${manifestKey}`);
    return null;
  }
  // Assume card manifest has id, name, imageUrl, type
  // Default faceUp to true, can be adjusted by placement logic if needed (e.g., for decks)
  return {
    id: manifestKey, 
    name: cardData.id || manifestKey, // Use manifest id as name if available, else key
    imageUrl: cardData.imageUrl,
    type: cardData.type,
    faceUp: true 
  };
}

/**
 * Checks if a given location ID refers to an array-based location (deck/discard).
 * @param {string} locationId - The ID to check (e.g., 'mainDeck', 'PLAYER1_HAND1')
 * @returns {boolean} True if it's an array location.
 */
function isArrayLocation(locationId) {
  return ['mainDeck', 'mainDiscard', 'altDeck', 'altDiscard'].includes(locationId);
}

/**
 * Retrieves the card object from a given location ID (slot or array).
 * Does not remove the card.
 * @param {string} locationId - The ID of the slot or array (e.g., 'GRID1', 'mainDeck')
 * @returns {CardObject_New | null} The card object, or null if empty/not found.
 */
function getCardFromLocation(locationId) {
  if (isArrayLocation(locationId)) {
    const deck = GameState[locationId];
    if (deck && deck.length > 0) {
      // Return the last card (top of deck/discard)
      return deck[deck.length - 1];
    }
  } else {
    // Check the refactored cardSlots object
    return GameState.cardSlots[locationId] || null;
  }
  return null;
}

/**
 * Removes a card object from a given location ID (slot or array).
 * @param {string} locationId - The ID of the slot or array (e.g., 'GRID1', 'mainDeck')
 * @returns {CardObject_New | null} The removed card object, or null if empty/not found.
 */
function removeCardFromLocation(locationId) {
  if (isArrayLocation(locationId)) {
    const deck = GameState[locationId];
    if (deck && deck.length > 0) {
      return deck.pop(); // Remove and return the last card
    }
  } else {
    const card = GameState.cardSlots[locationId];
    if (card) {
      GameState.cardSlots[locationId] = null; // Clear the slot
      return card;
    }
  }
  console.warn(`removeCardFromLocation: No card found at location ${locationId}`);
  return null;
}

/**
 * Places a card object at a target location ID (slot or array).
 * @param {CardObject_New} cardObject - The card object to place.
 * @param {string} targetId - The ID of the target slot or array.
 * @returns {boolean} True if placement was successful, false otherwise (e.g., slot occupied).
 */
function placeCardAt(cardObject, targetId) {
  if (!cardObject) {
    console.error(`placeCardAt: Cannot place null cardObject at ${targetId}`);
    return false;
  }
  if (isArrayLocation(targetId)) {
    const deck = GameState[targetId];
    if (deck) {
      // Determine faceUp state based on target deck/discard
      cardObject.faceUp = targetId.includes('Discard'); // Face up in discard, face down in draw
      deck.push(cardObject);
      return true;
    } else {
       console.error(`placeCardAt: Target array location ${targetId} not found in GameState.`);
       return false;
    }
  } else {
    // Check if target slot exists and is empty
    if (GameState.cardSlots.hasOwnProperty(targetId)) {
      if (GameState.cardSlots[targetId] === null) {
        cardObject.faceUp = true; // Cards in slots are generally face up
        GameState.cardSlots[targetId] = cardObject;
        return true;
      } else {
        console.warn(`placeCardAt: Target slot ${targetId} is already occupied by card ${GameState.cardSlots[targetId].id}.`);
        return false; // Slot occupied
      }
    } else {
        console.error(`placeCardAt: Target slot location ${targetId} does not exist in GameState.cardSlots.`);
        return false; // Slot doesn't exist
    }
  }
}

/**
 * The refactored card movement function using the new state structure.
 * @param {string} sourceId - The ID of the source slot or array.
 * @param {string} targetId - The ID of the target slot or array.
 * @returns {boolean} True if the move was successful.
 */
function moveCardNew(sourceId, targetId) {
  console.log(`[moveCardNew] Attempting move from ${sourceId} to ${targetId}`);
  const card = removeCardFromLocation(sourceId);

  if (!card) {
    console.error(`[moveCardNew] Failed: Could not remove card from source ${sourceId}.`);
    return false;
  }

  console.log(`[moveCardNew] Successfully removed card ${card.id} from ${sourceId}.`);

  const success = placeCardAt(card, targetId);

  if (!success) {
    console.error(`[moveCardNew] Failed: Could not place card ${card.id} at target ${targetId}. Attempting rollback.`);
    // Attempt to place the card back at the origin
    const rollbackSuccess = placeCardAt(card, sourceId);
    if (!rollbackSuccess) {
      console.error(`[moveCardNew] CRITICAL FAILURE: Rollback failed for card ${card.id} to source ${sourceId}. State might be inconsistent.`);
      // Potentially throw an error or implement more robust recovery
    }
    return false;
  }

  console.log(`[moveCardNew] Successfully moved card ${card.id} from ${sourceId} to ${targetId}`);
  // TODO: Call syncNewToOldState() here during transition phase
  // syncNewToOldState(); 
  return true;
}

// --- Adapter/Synchronization Functions (Placeholders) ---

/**
 * Updates the new GameState.cardSlots based on the current state 
 * in GameState.boardSlots and GameState.players[x].hand.
 * To be called during initialization and potentially after old state modifications.
 */
function syncOldToNewState() {
  // TODO: Implement logic to iterate through boardSlots/hands and populate cardSlots
  // Needs createCardObject to function.
  console.warn('syncOldToNewState not implemented');
}

/**
 * Updates the old state (GameState.boardSlots, GameState.players[x].hand) 
 * based on the new GameState.cardSlots.
 * To be called after new state modifications during the transition period.
 */
function syncNewToOldState() {
  // TODO: Implement logic to iterate through cardSlots and update boardSlots/hands
  console.warn('syncNewToOldState not implemented');
}

/**
 * Shuffles an array in-place using the Fisher-Yates (Knuth) algorithm
 * Used for randomizing deck order in the game.
 * 
 * @param {Array} array - The array to shuffle
 * @returns {void} - The array is modified in-place
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

// --- State Management Functions ---

/**
 * Initializes the game state by loading assets, setting up decks, and preparing the board.
 * This must be called and awaited before the game can start.
 * The function:
 * 1. Loads UI coordinates and card data from JSON files
 * 2. Maps coordinates to board slots for positioning
 * 3. Sorts cards into appropriate decks based on type
 * 4. Shuffles decks to randomize game start
 * 
 * @async
 * @returns {Promise<void>} A promise that resolves when initialization is complete
 * @throws {Error} If asset loading fails or board slot definitions don't match coordinates
 */
export async function initializeState() {
  // console.log("Initializing game state...");

  // Fetch Coordinates and Card Manifest concurrently
  try {
    const [coordsResponse, cardsResponse] = await Promise.all([
        fetch('../UIcoordinates.json'), // Correct path relative to js/ folder?
        fetch('assets/card-manifest.json')
    ]);

    if (!coordsResponse.ok) {
      throw new Error(`HTTP error loading UI coordinates! status: ${coordsResponse.status}`);
    }
    if (!cardsResponse.ok) {
      throw new Error(`HTTP error loading card manifest! status: ${cardsResponse.status}`);
    }

    const coordsData = await coordsResponse.json();
    const cardData = await cardsResponse.json();

    // Store coordinates, indexed by LABEL for easy lookup
    GameState.uiCoordinates = coordsData.UIcoordinates.reduce((acc, coord) => {
        acc[coord.LABEL] = coord;
        return acc;
    }, {});
    // console.log(`Loaded ${Object.keys(GameState.uiCoordinates).length} UI coordinate definitions.`);

    // Store card data
    GameState.allCards = cardData;
    // console.log(`Loaded ${Object.keys(GameState.allCards).length} card definitions.`);

    // Initialize board slots using the defined structure (already done above)
    // Verify all defined boardSlot IDs exist in uiCoordinates
    let missingCoords = false;
    for (const slotId in GameState.boardSlots) {
        if (!GameState.uiCoordinates[slotId]) {
            console.error(`Board slot '${slotId}' defined in GameState has no matching LABEL in UIcoordinates.json!`);
            missingCoords = true;
        }
    }
    if (missingCoords) {
        throw new Error("Mismatch between GameState.boardSlots and UIcoordinates.json LABELs.");
    }
    // console.log(`Initialized ${Object.keys(GameState.boardSlots).length} board slots, coordinates verified.`);

    // --- REFACTORING: Initialize new cardSlots structure ---
    GameState.cardSlots = {}; // Ensure it's empty
    for (const slotId in GameState.boardSlots) {
        GameState.cardSlots[slotId] = null; // Initialize all slots in the new structure as empty
    }
    console.log(`[Refactor] Initialized new GameState.cardSlots with ${Object.keys(GameState.cardSlots).length} null entries.`);
    // --- END REFACTORING ---

    // --- DECK INITIALIZATION ---

    // -- Existing Logic (Populate OLD deck structures with IDs) --
    // Keep this temporarily for compatibility with drawCard/moveCard
    const oldMainDeckDrawPile = [];
    const oldAltDeckDrawPile = [];

    for (const cardId in GameState.allCards) {
        const card = GameState.allCards[cardId];
        if (cardId === 'cardBack') continue; // Skip placeholder

        if (GameState.assignedCardTypes.main.includes(card.type)) {
            oldMainDeckDrawPile.push(cardId);
        } else if (GameState.assignedCardTypes.alt.includes(card.type)) {
            oldAltDeckDrawPile.push(cardId);
        }
    }
    shuffleArray(oldMainDeckDrawPile);
    shuffleArray(oldAltDeckDrawPile);
    // Assign to the old structure (if it still existed) - This part is effectively removed by the structure change, 
    // but we keep the shuffled ID arrays for drawCard reference if needed.
    // GameState.mainDeck.drawPile = oldMainDeckDrawPile;
    // GameState.altDeck.drawPile = oldAltDeckDrawPile;
    console.log(`[Compatibility] Prepared old deck IDs: Main ${oldMainDeckDrawPile.length}, Alt ${oldAltDeckDrawPile.length}`);
    // -- End Existing Logic --

    // -- New Logic (Populate NEW deck arrays with Card Objects) --
    GameState.mainDeck = []; // Ensure new arrays are empty
    GameState.altDeck = [];
    GameState.mainDiscard = [];
    GameState.altDiscard = [];

    for (const cardId in GameState.allCards) {
        if (cardId === 'cardBack') continue;

        const cardObject = createCardObject(cardId);
        if (cardObject) {
            cardObject.faceUp = false; // Cards in draw piles start face down
            const card = GameState.allCards[cardId]; // Get type from original data

            if (GameState.assignedCardTypes.main.includes(card.type)) {
                GameState.mainDeck.push(cardObject);
            } else if (GameState.assignedCardTypes.alt.includes(card.type)) {
                GameState.altDeck.push(cardObject);
            }
            // Else: Card type not assigned to a deck (e.g., character), not added.
        } else {
            console.warn(`[Refactor] Failed to create card object for ${cardId} during deck initialization.`);
        }
    }

    // Shuffle the new deck arrays containing card objects
    shuffleArray(GameState.mainDeck);
    shuffleArray(GameState.altDeck);
    console.log(`[Refactor] Initialized and shuffled new decks: Main ${GameState.mainDeck.length} objects, Alt ${GameState.altDeck.length} objects.`);
    // -- End New Logic --

    // --- END DECK INITIALIZATION ---


    // TODO: 4. Initialize players (Phase 5) - Need to decide how hands integrate with new/old state
    // For now, players object still uses IDs in hand array, compatible with old drawCard.

  } catch (error) {
    console.error("Error initializing game state:", error);
    // Handle initialization error appropriately (e.g., show error message to user)
  }
}

/**
 * Updates the game state with new properties.
 * Simple implementation that merges the provided state object with the current GameState.
 * 
 * @param {Object} newState - An object containing state properties to update
 */
export function updateState(newState) {
  // TODO: Implement logic to merge or replace parts of the state
  // TODO: Add mechanism to notify subscribers (UI components) of changes
  // console.log("Updating state:", newState);
  Object.assign(GameState, newState); // Simple merge for now
}

/**
 * Returns the current game state.
 * 
 * @returns {Object} The current GameState object
 */
export function getState() {
  // TODO: Potentially add cloning or immutability later if needed
  return GameState;
}

/**
 * Draws cards from a deck into a player's hand.
 * Adds cards to the player's hand array and removes them from the appropriate deck's drawPile.
 * 
 * @param {string} playerId - The player identifier (e.g., 'player1', 'player2')
 * @param {number} numberOfCards - How many cards to draw
 * @param {string} [drawPileType='main'] - Which deck to draw from ('main' or 'alt')
 * @returns {void}
 */
export function drawCard(playerId, numberOfCards, drawPileType = 'main') {
  const player = GameState.players[playerId]; // Get the correct player object ('player1' or 'player2')
  if (!player) {
    console.error(`Invalid playerId: ${playerId}`);
    return;
  }

  const deck = drawPileType === 'main' ? GameState.mainDeck : GameState.altDeck;
  const hand = player.hand; // Player's hand is an array of card IDs

  if (!deck) {
     console.error(`Invalid draw pile type "${drawPileType}"`);
     return;
  }

  // console.log(`Player ${player.id} drawing ${numberOfCards} cards from ${drawPileType} deck.`);

  for (let i = 0; i < numberOfCards; i++) {
    if (deck.length > 0) {
      const cardId = deck.pop().id; // Remove card ID from the correct deck's draw pile
      hand.push(cardId); // Add card ID to the player's hand array
      // console.log(`  Drew card: ${cardId}`);
    } else {
      console.warn(`Player ${player.id}'s ${drawPileType} draw pile is empty. Cannot draw more cards.`);
      break; // Stop drawing if the deck is empty
    }
  }
   // console.log(`Player ${player.id} hand after draw:`, hand);
}

/**
 * Retrieves card data for a specific card ID.
 * 
 * @param {string} cardId - The ID of the card to look up
 * @returns {Card|null} The card data object or null if not found
 */
export function getCardDataById(cardId) {
  // Implementation of getCardDataById method
  // Placeholder: should retrieve from GameState.allCards or similar
  return GameState.allCards ? GameState.allCards[cardId] : null;
}

// --- Phase 6: Card Movement Logic ---

/**
 * Moves a card with the given manifestKey from the origin slot to the target slot.
 * Handles moves between different container types (hand, character, grid, deck/discard).
 * 
 * @param {string} manifestKey - The unique key of the card to move (e.g., 'item_1').
 * @param {string} originSlotId - The ID of the slot the card is moving from.
 * @param {string} targetSlotId - The ID of the slot the card is moving to.
 * @returns {boolean} True if the move was successful, false otherwise.
 */
export function moveCard(manifestKey, originSlotId, targetSlotId) {
  // KI-005 Debugging: Log parameters received
  console.log(`[state.js->moveCard] Called with:`, { manifestKey, originSlotId, targetSlotId });

  // --- FIX: Re-declare singleCardTargetTypes --- 
  const singleCardTargetTypes = ['character', 'storyGrid', 'mutable'];

  const originSlot = GameState.boardSlots[originSlotId];
  const targetSlot = GameState.boardSlots[targetSlotId];

  if (!originSlot || !targetSlot) {
    console.error(`Move failed: Invalid originSlotId (${originSlotId}) or targetSlotId (${targetSlotId})`);
    return false;
  }

  // KI-005 Debugging: Log slot info
  console.log(`[state.js->moveCard] Origin Slot Info:`, JSON.parse(JSON.stringify(originSlot))); // Log deep copy
  console.log(`[state.js->moveCard] Target Slot Info:`, JSON.parse(JSON.stringify(targetSlot))); // Log deep copy

  // Check if the target slot is occupied
  if (targetSlot.cardId) {
    console.log(`DEBUG moveCard: Target slot ${targetSlotId} (${targetSlot.type}) is occupied by ${targetSlot.cardId}. Checking rules...`);

    // --- BEGIN MODIFICATION: Implement Swap Logic for Story Grid ---
    if (targetSlot.type === 'storyGrid') {
      console.log(`DEBUG moveCard: Initiating SWAP for storyGrid target slot ${targetSlotId}.`);
      const cardInTargetSlot = targetSlot.cardId; // Card B (ID of card originally in target)
      const draggedCardId = manifestKey; // Card A (ID of card being dragged)

      // --- Find Origin ---
      const originSlot = GameState.boardSlots[originSlotId];
      let originPlayerHand = null;
      let isOriginHand = false;

      if (originSlot && originSlot.type === 'hand') {
        // --- FIX: Access hand directly from GameState instead of non-existent getPlayerHand --- 
        originPlayerHand = GameState.players['player' + originSlot.playerId]?.hand;
        isOriginHand = true;
         if (!originPlayerHand) {
             console.error(`ERROR moveCard (Swap): Origin player hand array not found for Player ${originSlot.playerId} (slot ${originSlotId}). Aborting swap.`);
             return false;
         }
      } else if (!originSlot) {
         console.error(`ERROR moveCard (Swap): Origin slot object not found for ${originSlotId} (and not a hand). Aborting swap.`);
         return false;
      }
      // At this point, originSlot is valid if !isOriginHand, and originPlayerHand is valid if isOriginHand

      // --- Perform Swap ---
      console.log(`DEBUG moveCard (Swap): Swapping ${draggedCardId} (from ${originSlotId}) with ${cardInTargetSlot} (in ${targetSlotId})`);

      // 1. Place dragged card (A) into target slot
      console.log(`DEBUG moveCard (Swap): Before Swap Target Update (A) - Target ${targetSlotId} Before: ${targetSlot.cardId}`);
      targetSlot.cardId = draggedCardId; // A -> Target
      console.log(`DEBUG moveCard (Swap): After Swap Target Update (A) - Target ${targetSlotId} After: ${targetSlot.cardId}`);

      // 2. Remove dragged card (A) from origin slot
      console.log(`DEBUG moveCard (Swap): Before Swap Origin Removal (A) - Origin ${originSlotId} Before: ${isOriginHand ? JSON.stringify(originPlayerHand) : originSlot.cardId}`);
      if (isOriginHand) { // Origin is hand
        const indexA = originPlayerHand.indexOf(draggedCardId);
        if (indexA > -1) {
          originPlayerHand.splice(indexA, 1); // Remove A from hand
        } else { console.warn(`WARN moveCard (Swap): Dragged card ${draggedCardId} not found in origin hand ${originSlotId}`); }
      } else { // Origin is a slot (storyGrid, character, mutable)
        if (originSlot.cardId === draggedCardId) {
          originSlot.cardId = null; // Clear A from origin slot (temporarily)
        } else { console.warn(`WARN moveCard (Swap): Dragged card ${draggedCardId} mismatch in origin slot ${originSlotId} (contains ${originSlot.cardId})`); }
      }
      console.log(`DEBUG moveCard (Swap): After Swap Origin Removal (A) - Origin ${originSlotId} After: ${isOriginHand ? JSON.stringify(originPlayerHand) : originSlot.cardId}`);

      // 3. Place original target card (B) into origin slot
      console.log(`DEBUG moveCard (Swap): Before Swap Origin Placement (B) - Origin ${originSlotId} Before: ${isOriginHand ? JSON.stringify(originPlayerHand) : originSlot.cardId}`);
       if (isOriginHand) { // Origin is hand
         originPlayerHand.push(cardInTargetSlot); // B -> Hand
       } else { // Origin is a slot
         originSlot.cardId = cardInTargetSlot; // B -> Origin Slot
       }
       console.log(`DEBUG moveCard (Swap): After Swap Origin Placement (B) - Origin ${originSlotId} After: ${isOriginHand ? JSON.stringify(originPlayerHand) : originSlot.cardId}`);

      console.log(`DEBUG moveCard: Swap complete for ${targetSlotId}.`);
      return true; // Swap successful

    } else {
      // Original logic for non-storyGrid occupied slots (prevent move)
      console.warn(`Move failed: Target slot ${targetSlotId} (${targetSlot.type}) is already occupied by card ${targetSlot.cardId}. Move prevented as it's not a storyGrid.`);
      console.warn(`DEBUG moveCard: Move prevented (occupied, non-grid) - Origin: ${originSlotId}, Target: ${targetSlotId}, Card: ${manifestKey}`);
      return false;
    }
    // --- END MODIFICATION ---

  } else {
     // Target slot is empty, proceed with normal move (Property assignment)
     console.log(`DEBUG moveCard: Target slot ${targetSlotId} (${targetSlot.type}) is empty. Assigning cardId.`);
     // Existing logic for empty property-based slots...
     // logStateModification('Before Target Update (Empty)', ...) etc.

    // --- Find and Remove Card from Origin ---
    if (originSlot.type === 'hand') {
      const playerHand = GameState.players['player' + originSlot.playerId]?.hand;
      const originBoardSlot = GameState.boardSlots[originSlotId]; // Get the specific slot object

      if (playerHand) {
        const cardIndex = playerHand.indexOf(manifestKey);
        if (cardIndex !== -1) {
          console.log(`[state.js->moveCard] BEFORE Hand Splice: Player ${originSlot.playerId} Hand is [${playerHand.join(', ')}], attempting to remove ${manifestKey} at index ${cardIndex}`);
          playerHand.splice(cardIndex, 1);
          console.log(`[state.js->moveCard] AFTER Hand Splice: Player ${originSlot.playerId} Hand is NOW [${playerHand.join(', ')}`);
          // Also clear the specific hand slot's cardId in boardSlots for consistency
          if (originBoardSlot) {
              console.log(`[state.js->moveCard] BEFORE Origin Hand Slot Clear: Slot ${originSlotId}.cardId is ${originBoardSlot.cardId}`);
              originBoardSlot.cardId = null;
              console.log(`[state.js->moveCard] AFTER Origin Hand Slot Clear: Slot ${originSlotId}.cardId is NOW ${originBoardSlot.cardId}`);
          } else {
               console.warn(`[state.js->moveCard] Could not find origin board slot ${originSlotId} to clear cardId.`);
          }
          console.log(`[state.js->moveCard] Card ${manifestKey} removed from Player ${originSlot.playerId} hand array.`);
        } else {
          console.error(`Move failed: Card ${manifestKey} not found in origin hand slot ${originSlotId} (Player ${originSlot.playerId}). Hand:`, playerHand);
          return false;
        }
      } else {
          console.error(`Move failed: Origin player hand not found for player ${originSlot.playerId}`);
          return false;
      }
    } else if (originSlot.type === 'deckDiscard') {
        const discardPile = (originSlot.deckType === 'main' ? GameState.mainDeck : GameState.altDeck)?.discardPile;
        const discardBoardSlot = GameState.boardSlots[originSlotId];
        if (discardPile) {
            // Only the top card of the discard pile can be dragged (implicitly handled by UI event listeners)
            // Verify the card being dragged IS the top card for safety
            if (discardPile.length > 0 && discardPile[discardPile.length - 1] === manifestKey) {
                console.log(`[state.js->moveCard] BEFORE Discard Pop: ${originSlot.deckType} Discard is [${discardPile.join(', ')}], attempting to pop ${manifestKey}`);
                discardPile.pop(); // Remove the top card
                console.log(`[state.js->moveCard] AFTER Discard Pop: ${originSlot.deckType} Discard is NOW [${discardPile.join(', ')}]`);
                console.log(`[state.js->moveCard] Card ${manifestKey} removed from ${originSlot.deckType} discard pile.`);
                // Clear the board slot's cardId
                if (discardBoardSlot) {
                    console.log(`[state.js->moveCard] BEFORE Origin Discard Slot Clear: Slot ${originSlotId}.cardId is ${discardBoardSlot.cardId}`);
                    discardBoardSlot.cardId = null;
                    console.log(`[state.js->moveCard] AFTER Origin Discard Slot Clear: Slot ${originSlotId}.cardId is NOW ${discardBoardSlot.cardId}`);
                }
            } else {
                console.error(`Move failed: Card ${manifestKey} is not the top card of the ${originSlot.deckType} discard pile or pile is empty. Pile:`, discardPile);
                return false;
            }
        } else {
             console.error(`Move failed: Origin discard pile not found for deck type ${originSlot.deckType}`);
             return false;
        }
    } else if (singleCardTargetTypes.includes(originSlot.type)) { // Character, StoryGrid, Mutable
      if (originSlot.cardId === manifestKey) {
        console.log(`[state.js->moveCard] BEFORE Origin Single Slot Clear: Slot ${originSlotId}.cardId is ${originSlot.cardId}`);
        originSlot.cardId = null; // Clear the card ID from the slot
        console.log(`[state.js->moveCard] AFTER Origin Single Slot Clear: Slot ${originSlotId}.cardId is NOW ${originSlot.cardId}`);
        console.log(`[state.js->moveCard] Card ${manifestKey} removed from origin ${originSlot.type} slot ${originSlotId}.`);
      } else {
        console.error(`Move failed: Card ${manifestKey} not found in origin ${originSlot.type} slot ${originSlotId}. Slot contains: ${originSlot.cardId}`);
        return false;
      }
    } else {
      console.error(`Move failed: Invalid or unhandled origin slot type "${originSlot.type}" for slot ${originSlotId}.`);
      return false;
    }

    // --- Add Card to Target ---
    let cardAdded = false;
    if (targetSlot.type === 'hand') {
      // Find the first empty hand slot for the target player
      const targetPlayerHand = GameState.players['player' + targetSlot.playerId]?.hand;
      if (!targetPlayerHand) {
          console.error(`Move failed: Target player hand not found for player ${targetSlot.playerId}`);
          // Attempt to rollback removal? Complex. For now, fail the move.
          // TODO: Implement rollback logic if necessary.
          return false; 
      }

      // Find the *specific* empty hand slot targeted by the drop event (targetSlotId)
      const targetBoardSlot = GameState.boardSlots[targetSlotId];
      if (targetBoardSlot && targetBoardSlot.cardId === null) {
          console.log(`[state.js->moveCard] BEFORE Target Hand Slot Update: Slot ${targetSlotId}.cardId is ${targetBoardSlot.cardId}, attempting to set to ${manifestKey}`);
          targetBoardSlot.cardId = manifestKey; // Assign card to the specific board slot
          console.log(`[state.js->moveCard] AFTER Target Hand Slot Update: Slot ${targetSlotId}.cardId is NOW ${targetBoardSlot.cardId}`);
          console.log(`[state.js->moveCard] BEFORE Hand Push: Target Player ${targetSlot.playerId} Hand is [${targetPlayerHand.join(', ')}], attempting to push ${manifestKey}`);
          targetPlayerHand.push(manifestKey); // Add to the player's hand array (source of truth)
          console.log(`[state.js->moveCard] AFTER Hand Push: Target Player ${targetSlot.playerId} Hand is NOW [${targetPlayerHand.join(', ')}`);
          cardAdded = true;
          console.log(`[state.js->moveCard] Card ${manifestKey} added to Player ${targetSlot.playerId} hand slot ${targetSlotId}.`);
      } else {
          console.warn(`Move failed: Target hand slot ${targetSlotId} is already occupied or invalid.`);
          // Attempt rollback?
          return false;
      }

    } else if (targetSlot.type === 'deckDiscard') {
      const discardPile = (targetSlot.deckType === 'main' ? GameState.mainDeck : GameState.altDeck)?.discardPile;
      const discardBoardSlot = GameState.boardSlots[targetSlotId];
      if (discardPile) {
          console.log(`[state.js->moveCard] BEFORE Discard Push: ${targetSlot.deckType} Discard is [${discardPile.join(', ')}], attempting to push ${manifestKey}`);
          discardPile.push(manifestKey); // Add to the end of the discard pile
          console.log(`[state.js->moveCard] AFTER Discard Push: ${targetSlot.deckType} Discard is NOW [${discardPile.join(', ')}]`);
          cardAdded = true;
          console.log(`[state.js->moveCard] Card ${manifestKey} added to ${targetSlot.deckType} discard pile.`);
          // Update the board slot's cardId to reflect the new top card
          if (discardBoardSlot) {
               console.log(`[state.js->moveCard] BEFORE Target Discard Slot Update: Slot ${targetSlotId}.cardId is ${discardBoardSlot.cardId}`);
               discardBoardSlot.cardId = manifestKey;
               console.log(`[state.js->moveCard] AFTER Target Discard Slot Update: Slot ${targetSlotId}.cardId is NOW ${discardBoardSlot.cardId}`);
          }
      } else {
          console.error(`Move failed: Target discard pile not found for deck type ${targetSlot.deckType}`);
          // Rollback needed?
          return false;
      }
    } else if (singleCardTargetTypes.includes(targetSlot.type)) { // Character, StoryGrid, Mutable
        if (targetSlot.cardId === null) { // Double check it's still empty
            console.log(`[state.js->moveCard] BEFORE Target Single Slot Update: Target ${targetSlotId}.cardId is ${targetSlot.cardId}, attempting to set to ${manifestKey}`);
            targetSlot.cardId = manifestKey; // Assign the card ID to the slot
            console.log(`[state.js->moveCard] AFTER Target Single Slot Update: Target ${targetSlotId}.cardId is NOW ${targetSlot.cardId}`);
            cardAdded = true;
            console.log(`[state.js->moveCard] Card ${manifestKey} added to target ${targetSlot.type} slot ${targetSlotId}.`);
        } else {
            // This should have been caught earlier, but defensive check.
             console.error(`Move failed: Target slot ${targetSlotId} (${targetSlot.type}) became occupied unexpectedly.`);
             // Rollback needed?
             return false;
        }
    } else {
      console.error(`Move failed: Invalid or unhandled target slot type "${targetSlot.type}" for slot ${targetSlotId}.`);
      // Rollback needed?
      return false;
    }

    if (!cardAdded) {
         console.error(`Move failed: Card ${manifestKey} could not be added to target ${targetSlotId} after removal from origin.`);
        // Rollback needed?
         return false;
    }

    // KI-005 Debugging: Log state after move
    console.log(`[state.js->moveCard] State after successful move:`, {
        originSlotAfter: JSON.parse(JSON.stringify(GameState.boardSlots[originSlotId])), 
        targetSlotAfter: JSON.parse(JSON.stringify(GameState.boardSlots[targetSlotId])),
        // Log relevant hand/discard pile if involved
        player1Hand: targetSlot.type === 'hand' && targetSlot.playerId === 1 ? GameState.players.player1.hand : (originSlot.type === 'hand' && originSlot.playerId === 1 ? GameState.players.player1.hand : 'N/A'),
        mainDiscard: targetSlot.type === 'deckDiscard' && targetSlot.deckType === 'main' ? GameState.mainDeck.discardPile : (originSlot.type === 'deckDiscard' && originSlot.deckType === 'main' ? GameState.mainDeck.discardPile : 'N/A')
        // Add other relevant logs as needed
    });


    console.log(`Successfully moved card ${manifestKey} from ${originSlotId} to ${targetSlotId}`);
    return true;
  }
} 