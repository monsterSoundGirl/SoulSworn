# Card State Management Refactoring Plan

## Core Concept
The refactoring simplifies the state management by treating every card location uniformly and emulating how physical card games work. Each card exists in exactly one place at a time, eliminating the complexity of tracking the same card across multiple state arrays/objects.

## Data Structure

### Card Object
```javascript
{
  id: "spell_7",          // Unique identifier (manifestKey)
  name: "Mirror Snap",    // Display name
  imageUrl: "path/to/img.jpg", // Image path
  type: "spell",          // Card type
  faceUp: true           // Orientation
}
```

### Game State
```javascript
const GameState = {
  // Single slots (null or contains one card object)
  slots: {
    // Player hands
    "PLAYER1_HAND1": null,
    "PLAYER1_HAND2": {id: "spell_7", name: "Mirror Snap", /*...*/},
    
    // Story grid
    "GRID1": {id: "item_3", name: "Silver Spoon", /*...*/},
    "GRID2": null,
    
    // Character slots
    "PLAYER1_CHARACTER": {id: "character_2", name: "The Wanderer", /*...*/},
    
    // Mutable slots
    "MUTABLE1": null
  },
  
  // Arrays of card objects
  mainDeck: [
    {id: "monster_1", name: "Shadow Beast", /*...*/, faceUp: false},
    // Additional cards...
  ],
  
  mainDiscard: [
    {id: "spell_2", name: "Frost Nova", /*...*/, faceUp: true},
    // Additional cards...
  ],
  
  altDeck: [ /*...*/ ],
  altDiscard: [ /*...*/ ],
  
  // Additional state as needed...
}
```

## Key Functions

### 1. moveCard(sourceId, targetId)
Move a card from one location to another.

```javascript
function moveCard(sourceId, targetId) {
  // Handle array sources (decks/discards)
  if (isArraySource(sourceId)) {
    const card = getCardFromArray(sourceId);
    if (!card) return false;
    
    // Place in target
    return placeCardAt(card, targetId);
  } 
  // Handle slot sources
  else {
    const card = GameState.slots[sourceId];
    if (!card) return false;
    
    // Remove from source
    GameState.slots[sourceId] = null;
    
    // Place in target
    return placeCardAt(card, targetId);
  }
}
```

### 2. isArraySource(locationId)
Check if a location is an array (deck/discard) or a slot.

```javascript
function isArraySource(locationId) {
  return ["mainDeck", "altDeck", "mainDiscard", "altDiscard"].includes(locationId);
}
```

### 3. getCardFromArray(arrayId)
Get the top card from a deck or discard pile.

```javascript
function getCardFromArray(arrayId) {
  if (GameState[arrayId].length === 0) return null;
  return GameState[arrayId].pop(); // Take the top card
}
```

### 4. placeCardAt(card, targetId)
Place a card at the target location (slot or deck/discard).

```javascript
function placeCardAt(card, targetId) {
  // Handle array targets (decks/discards)
  if (isArraySource(targetId)) {
    GameState[targetId].push(card);
    return true;
  } 
  // Handle slot targets
  else {
    if (GameState.slots[targetId] !== null) {
      // Target slot is occupied
      return false;
    }
    GameState.slots[targetId] = card;
    return true;
  }
}
```

### 5. dealCard(deckId, targetSlotId)
Deal a card from a deck to a specific slot.

```javascript
function dealCard(deckId, targetSlotId) {
  if (GameState.slots[targetSlotId] !== null) {
    // Target slot is occupied
    return false;
  }
  
  const card = getCardFromArray(deckId);
  if (!card) return false;
  
  GameState.slots[targetSlotId] = card;
  return true;
}
```

### 6. shuffleDeck(deckId)
Shuffle a deck of cards.

```javascript
function shuffleDeck(deckId) {
  const deck = GameState[deckId];
  
  // Fisher-Yates algorithm
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}
```

## Refactoring Strategy

### Phase 1: State Structure Refactoring
1. Create a new `slots` object in GameState
2. Convert player hands, character slots, grid slots to use the new structure
3. Ensure decks and discard piles remain as arrays
4. Update initialization to populate the new structure

### Phase 2: Core Function Implementation
1. Implement `moveCard` and supporting functions
2. Implement `dealCard` and `shuffleDeck`
3. Update any dependent functions to use the new structure

### Phase 3: UI Integration
1. Update drag-and-drop handlers to use the new functions
2. Ensure rendering functions display the correct card state
3. Fix any visual feedback issues

### Phase 4: Testing
1. Test base functionality (moving cards between slots)
2. Test deck operations (drawing, discarding)
3. Test edge cases (empty decks, invalid moves)

## Implementation Plan

### Step 1: Refactor GameState Structure
Create the new data structure while preserving compatibility with existing code.

### Step 2: Implement Core Functions
Build the simplified card manipulation functions.

### Step 3: Update Initialization
Modify how the initial state is set up to work with the new structure.

### Step 4: Update Event Handlers
Modify drag-and-drop logic to use the new functions.

### Step 5: Update Rendering
Ensure UI correctly reflects the new state structure.

### Step 6: Testing & Debugging
Verify all functionality works correctly.

## Change Management

To minimize disruption, we'll implement this refactoring gradually:

1. First implement the new state structure alongside the old one
2. Write adapter functions to keep both in sync temporarily
3. Migrate components one by one to use the new structure
4. Remove old structure and adapter functions when migration is complete

This approach ensures we can test incrementally and roll back if necessary. 