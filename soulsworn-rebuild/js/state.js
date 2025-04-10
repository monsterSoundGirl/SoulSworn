// Placeholder for the central game state

export const GameState = {
  allCards: {}, // Object: { [cardId]: Card } - Filled by scanning assets later
  uiCoordinates: null, // Object: { [LABEL]: { W, H, X, Y, LABEL } } - Loaded from UIcoordinates.json
  players: [], // Array of Player objects
  mainDeck: {
    type: 'main',
    assignedCardTypes: ['item', 'spell'],
    drawPile: [], // Array of Card ids
    discardPile: [], // Array of Card ids
  },
  altDeck: {
    type: 'alt',
    assignedCardTypes: ['location', 'monster'],
    drawPile: [], // Array of Card ids
    discardPile: [], // Array of Card ids
  },
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

/*
Card: {
  id: String (unique identifier, e.g., 'character_knight.jpg'),
  type: String (e.g., 'Character', 'Objective', 'Spell'),
  imageUrl: String (path to image)
}

Player: {
  id: Number (1-4),
  name: String,
  handSlotIds: Array<String> (references to BoardSlot IDs),
  characterCardSlotId: String (reference to BoardSlot ID),
  tokens: { physical: number, emotional: number, rational: number }
}

Deck: {
  type: String ('main' or 'alt'),
  assignedCardTypes: Array<String>,
  drawPile: Array<String> (Card ids),
  discardPile: Array<String> (Card ids)
}

BoardSlot: {
  id: String (unique identifier, e.g., 'storyGrid-0-0'),
  type: String (e.g., 'hand', 'storyGrid', 'character'),
  playerId: Number | null,
  cardId: String | null (Card id)
}
*/

// --- Helper Functions ---

// Fisher-Yates (Knuth) Shuffle
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

// --- State Management Functions ---

// Marked as async because fetching the manifest is an asynchronous operation
export async function initializeState() {
  console.log("Initializing game state...");

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
    console.log(`Loaded ${Object.keys(GameState.uiCoordinates).length} UI coordinate definitions.`);

    // Store card data
    GameState.allCards = cardData;
    console.log(`Loaded ${Object.keys(GameState.allCards).length} card definitions.`);

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
    console.log(`Initialized ${Object.keys(GameState.boardSlots).length} board slots, coordinates verified.`);

    // Initialize decks (Phase 3)
    GameState.mainDeck.drawPile = []; // Ensure piles are empty before populating
    GameState.altDeck.drawPile = [];

    for (const cardId in GameState.allCards) {
        const card = GameState.allCards[cardId];
        // Skip the placeholder cardBack
        if (cardId === 'cardBack') continue;

        if (GameState.mainDeck.assignedCardTypes.includes(card.type)) {
            GameState.mainDeck.drawPile.push(cardId);
        } else if (GameState.altDeck.assignedCardTypes.includes(card.type)) {
            GameState.altDeck.drawPile.push(cardId);
        }
        // Cards not matching either deck (e.g., 'character', 'objective') are currently ignored
    }
    console.log(`Populated main deck with ${GameState.mainDeck.drawPile.length} cards.`);
    console.log(`Populated alt deck with ${GameState.altDeck.drawPile.length} cards.`);

    // Shuffle decks
    shuffleArray(GameState.mainDeck.drawPile);
    shuffleArray(GameState.altDeck.drawPile);
    console.log("Main and Alt decks shuffled.");

    // Log shuffled decks for verification (optional, can be removed later)
    console.log("Shuffled Main Deck:", [...GameState.mainDeck.drawPile]); // Log a copy to see order
    console.log("Shuffled Alt Deck:", [...GameState.altDeck.drawPile]);   // Log a copy to see order

    // TODO: 4. Initialize players (Phase 5)

  } catch (error) {
    console.error("Error initializing game state:", error);
    // Handle initialization error appropriately (e.g., show error message to user)
  }
}

export function updateState(newState) {
  // TODO: Implement logic to merge or replace parts of the state
  // TODO: Add mechanism to notify subscribers (UI components) of changes
  console.log("Updating state:", newState);
  Object.assign(GameState, newState); // Simple merge for now
}

export function getState() {
  // TODO: Potentially add cloning or immutability later if needed
  return GameState;
}

// Method to draw cards for a player
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

  console.log(`Player ${player.id} drawing ${numberOfCards} cards from ${drawPileType} deck.`);

  for (let i = 0; i < numberOfCards; i++) {
    if (deck.drawPile.length > 0) {
      const cardId = deck.drawPile.pop(); // Remove card ID from the correct deck's draw pile
      hand.push(cardId); // Add card ID to the player's hand array
      console.log(`  Drew card: ${cardId}`);
    } else {
      console.warn(`Player ${player.id}'s ${drawPileType} draw pile is empty. Cannot draw more cards.`);
      break; // Stop drawing if the deck is empty
    }
  }
   console.log(`Player ${player.id} hand after draw:`, hand);
}

// Helper method to get card data by ID (assuming cardData is populated)
export function getCardDataById(cardId) {
  // Implementation of getCardDataById method
  // Placeholder: should retrieve from GameState.allCards or similar
  return GameState.allCards ? GameState.allCards[cardId] : null;
}

// --- Phase 6: Card Movement Logic ---

/**
 * Moves a card between two board slots or between slots and player hands/discard piles in the GameState.
 * @param {string} cardId - The ID of the card being moved.
 * @param {string} originSlotId - The ID of the slot the card is moving from.
 * @param {string} targetSlotId - The ID of the slot the card is moving to.
 */
export function moveCard(cardId, originSlotId, targetSlotId) {
  console.log(`Attempting to move card ${cardId} from ${originSlotId} to ${targetSlotId}`);

  const originSlot = GameState.boardSlots[originSlotId];
  const targetSlot = GameState.boardSlots[targetSlotId];

  // --- Basic Validation ---
  if (!originSlot) {
    console.error(`Move failed: Origin slot ${originSlotId} not found.`);
    return;
  }
  if (!targetSlot) {
    console.error(`Move failed: Target slot ${targetSlotId} not found.`);
    return;
  }
  if (!cardId) {
      console.error(`Move failed: Invalid cardId provided.`);
      return;
  }

  // TODO: Add more validation based on game rules (e.g., is target slot occupied? Is move valid?)

  // --- Determine Origin/Target Types ---
  let originIsHand = originSlot.type === 'hand';
  let targetIsHand = targetSlot.type === 'hand';
  let targetIsDiscard = targetSlot.type === 'deckDiscard';

  let originPlayer = null;
  let targetPlayer = null;

  if (originIsHand) {
    originPlayer = GameState.players['player' + originSlot.playerId];
    if (!originPlayer) {
        console.error(`Move failed: Could not find player data for origin slot ${originSlotId} (PlayerID: ${originSlot.playerId})`);
        return;
    }
  }

  if (targetIsHand) {
    targetPlayer = GameState.players['player' + targetSlot.playerId];
     if (!targetPlayer) {
        console.error(`Move failed: Could not find player data for target slot ${targetSlotId} (PlayerID: ${targetSlot.playerId})`);
        return;
    }
  }


  // --- Handle Origin Slot ---
  let cardFoundInOrigin = false;
  if (originIsHand) {
      const hand = originPlayer.hand;
      const cardIndex = hand.indexOf(cardId);
      if (cardIndex > -1) {
          hand.splice(cardIndex, 1); // Remove card from hand array
          cardFoundInOrigin = true;
      } else {
          console.error(`Move failed: Card ${cardId} not found in origin hand slot ${originSlotId} (Player ${originSlot.playerId}). Hand:`, hand);
          return; // Card isn't in the expected hand
      }
  } else { // Assume origin is a slot with a cardId property
      if (originSlot.cardId === cardId) {
          originSlot.cardId = null; // Remove card from origin slot
          cardFoundInOrigin = true;
      } else {
          console.error(`Move failed: Card ${cardId} not found in origin slot ${originSlotId}. Found: ${originSlot.cardId}`);
          return; // Card isn't where we expect it
      }
  }

  // Ensure card was actually removed before proceeding
  if (!cardFoundInOrigin) {
       console.error(`Move failed: Could not verify card removal from origin ${originSlotId}.`);
       // Potentially revert state changes if necessary, but for now just stop.
       return;
  }

  // --- Handle Target Slot ---
  if (targetIsHand) { // Target is a Player Hand
      targetPlayer.hand.push(cardId); // Add card to target hand array
  } else if (targetIsDiscard) { // Target is a Discard Pile
      const deckType = targetSlot.deckType; // 'main' or 'alt'
      if (deckType === 'main') {
          GameState.mainDeck.discardPile.push(cardId);
      } else if (deckType === 'alt') {
          GameState.altDeck.discardPile.push(cardId);
      } else {
          console.error(`Move failed: Target discard slot ${targetSlotId} has invalid deckType: ${deckType}`);
          // Attempt to revert origin removal? Or rely on cardFoundInOrigin check?
          // For now, log error and potentially leave state inconsistent if origin was modified.
          return; // Stop processing
      }
  } else { // Assume target is a slot with a cardId property (Grid, Character, Mutable)
      if (targetSlot.cardId !== null) {
          console.warn(`Target slot ${targetSlotId} is already occupied by card ${targetSlot.cardId}. Overwriting.`);
          // TODO: Implement game logic for occupied slots (e.g., swap, return to hand?)
      }
      targetSlot.cardId = cardId; // Place card in target slot
  }

  console.log(`Successfully moved card ${cardId} from ${originSlotId} to ${targetSlotId}`);

  // Note: This function only updates the state. Re-rendering needs to be triggered separately.
} 