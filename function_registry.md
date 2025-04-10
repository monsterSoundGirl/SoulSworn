# Function Registry

This document lists all major functions, their purpose, parameters, return values, and dependencies.

## Phase 1-4 Functions (See Git History for Details)

*   `initializeState()` (js/state.js): Loads card manifest, initializes decks, shuffles.
*   `shuffleArray()` (js/state.js): Helper for shuffling.
*   `drawCard()` (js/state.js): Moves cards from draw pile to player hand state.
*   `createCardElement()` (js/components/Card.js): Creates HTML element for a card.
*   `renderGameBoard()` (js/components/GameBoard.js): Orchestrates board rendering.
*   `renderPlayerHand()` (js/components/PlayerHand.js): Renders player hand slots/cards.
*   `renderCharacterSlot()` (js/components/CharacterSlot.js): Renders player character slot.
*   `renderStoryGrid()` (js/components/StoryGrid.js): Renders story grid slots.
*   `renderDeckPile()` (js/components/DeckPile.js): Renders deck draw/discard piles.

## Phase 5 Refactoring (Absolute Positioning - [2025-04-09])

*   **Focus:** Transitioned from CSS Flexbox/Grid layout to absolute positioning based on `UIcoordinates.json`.
*   **Key Changes:**
    *   `initializeState()`: Now also loads `UIcoordinates.json` and stores it in `GameState.uiCoordinates`.
    *   `render*` functions (`PlayerHand`, `CharacterSlot`, `StoryGrid`, `DeckPile`): Modified to read coordinates from `GameState.uiCoordinates` and apply `position: absolute` styles directly to elements, appending them to `#game-container` instead of specific sub-containers.
    *   `renderGameBoard()`: Updated to clear old elements correctly and call refactored component functions. Added rendering for `mutable` slots and Players 3/4.
    *   `GameState` (`js/state.js`): Board slot IDs (`boardSlots`) updated to match `LABEL`s in `UIcoordinates.json`. Player state objects (`players`) simplified. Player 3/4 state and hand slots added.
    *   `index.html`: Obsolete layout containers removed.
    *   `css/board.css`: Old layout rules removed, placeholder UI element styling added/fixed.
    *   `main.js`: Added draw calls for Player 3/4 initial hands. 

## Phase 6: Drag and Drop ([Current Date])

*   **`moveCard(cardId, originSlotId, targetSlotId)`** (`js/state.js`)
    *   **Purpose:** Updates the `GameState` to reflect a card being moved between two board slots.
    *   **Parameters:** `cardId`, `originSlotId`, `targetSlotId`.
    *   **Side Effects:** Modifies `GameState.boardSlots`, `GameState.players[playerId].hand`, or `GameState.mainDeck/altDeck.discardPile`.
    *   **Notes:** Reviewed and cleaned [Current Date]. Handles slot-to-slot, hand-to-slot/slot-to-hand, hand-to-hand, and slot/hand-to-discard moves. Includes basic validation and error logging. Minimal debug logs remain.
*   **`setupEventListeners()`** (`js/main.js`)
    *   **Purpose:** Sets up global event listeners, specifically `dragover` and `drop` for `.card-slot` elements.
    *   **Side Effects:** The `drop` listener parses drag data, calls `moveCard()`, triggers `renderGameBoard()`, and now recursively calls `setupEventListeners()` to re-attach listeners after the render.
*   **`createCardElement(card, manifestKey, slotId)`** (`js/components/Card.js`)
    *   **Purpose:** Creates a card element, making it draggable only if `manifestKey` and `slotId` are provided.
    *   **Parameters:** `card` object, `manifestKey` (the manifest key used for state arrays), `slotId` (ID of the card's current slot).
    *   **Side Effects:** If draggable, adds a `dragstart` listener that stores `manifestKey` (as `cardId`) and `originSlotId`.
    *   **Notes:** Renamed `cardKey` parameter to `manifestKey` for clarity. Draggable attribute and listener are now conditional. `console.warn` for missing `slotId` removed.
*   **`renderPlayerHand(playerId)`**, **`renderCharacterSlot(playerId)`**, **`renderStoryGrid()`** (`js/components/*`)
    *   **Purpose:** Render specific parts of the board.
    *   **Side Effects:** Calls `createCardElement`.
    *   **Notes:** Updated to pass the appropriate `slotId` and `cardKey` to `createCardElement`.
*   **`renderGameBoard()`** (`js/components/GameBoard.js`)
    *   **Purpose:** Orchestrates board rendering.
    *   **Dependencies:** Now imports `createCardElement` to render cards in mutable slots.