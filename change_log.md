# Change Log

## [YYYY-MM-DD] - Phase 1 Complete

*   **Phase 1: Project Setup & Static Card Rendering**
    *   Task 1: Initial directory structure created (`soulsworn-rebuild/`). Old project archived (`Soulsworn_1.0/`).
    *   Task 2 & 3: Basic `index.html` and `css/main.css` created.
    *   Task 4: Initial `js/state.js` with placeholder `GameState` implemented.
    *   Task 5: Basic `js/main.js` entry point implemented.
    *   Task 6: Card data loading via `assets/card-manifest.json` implemented in `js/state.js`.
    *   Task 7: Basic `js/components/Card.js` component implemented.
    *   Task 8: Debugged asset loading issues (CORS, path discrepancies).

## [YYYY-MM-DD] - Phase 2 Complete

*   **Phase 2: Core Board Layout & State Initialization**
    *   Task 1: Defined all `BoardSlot` objects (hands, grid, decks, etc.) with unique IDs in `GameState` (`js/state.js`).
    *   Task 2: Implemented CSS (Flexbox/Grid) in `css/board.css` and updated `index.html` to visually structure the board layout (player areas, shared area, deck area).
    *   Task 3: Created UI components (`js/components/GameBoard.js`, `PlayerHand.js`, `CharacterSlot.js`, `StoryGrid.js`, `DeckPile.js`) to dynamically create HTML elements for each `BoardSlot` based on `GameState`.
    *   Task 4: Updated `js/main.js` to call `renderGameBoard()` to orchestrate the initial board rendering.
    *   Task 5: Verified the UI reflects the initial empty state of all `BoardSlot`s, including card backs on draw piles.

## [YYYY-MM-DD] - Phase 3 Complete

*   **Phase 3: Deck Initialization & Shuffling**
    *   Defined `assignedCardTypes` for main and alt decks in `js/state.js`.
    *   Implemented logic in `initializeState` to populate draw piles based on card types.
    *   Implemented Fisher-Yates shuffle and applied it to draw piles in `initializeState`.
    *   Added console logs for verification.

## [2025-04-09] - Phase 4 Complete

*   **Phase 4: Initial Hand Drawing & Rendering**
    *   Defined `initialHandSize` in `GameState` (`js/state.js`).
    *   Implemented `drawCard` function in `js/state.js` to move cards to player hands.
    *   Called `drawCard` in `js/main.js` to deal initial hands.
    *   Updated `js/components/PlayerHand.js` to render cards from player hand state.

## [2025-04-09] - Phase 5: Absolute Positioning Refactor & Debugging

*   **Refactoring (Previous Session):**
    *   Updated CSS (`main.css`, `board.css`) for absolute positioning based on `UIcoordinates.json`.
    *   Added placeholder elements to `index.html`.
    *   Refactored JS components (`state.js`, `GameBoard.js`, `PlayerHand.js`, `CharacterSlot.js`, `StoryGrid.js`, `DeckPile.js`) to use coordinates from `GameState.uiCoordinates` for positioning.
*   **Debugging (Current Session):**
    *   Resolved server port conflict (`OSError: [Errno 48] Address already in use`).
    *   Fixed label mismatches between `GameState.boardSlots` and `UIcoordinates.json`.
    *   Corrected systematic `imageUrl` path errors (pluralization, typos) in `assets/card-manifest.json`.

## [2025-04-09] - Phase 5: Code Cleanup

*   **HTML Cleanup:**
    *   Removed obsolete container `div` elements from `index.html` that are no longer needed with absolute positioning.
    *   Simplified document structure to only include required placeholder elements.
*   **CSS Cleanup:**
    *   Removed obsolete CSS rules from `board.css` related to removed container elements.
    *   Fixed placeholder styling by replacing incorrect `content` property with proper `::after` pseudo-elements.
    *   Added CSS rules to display slot IDs for story grid and mutable slots to improve debugging.
*   **Layout Fixes:**
    *   Corrected the Y coordinate for `GRID30` in `UIcoordinates.json` to resolve overlap.
    *   Enabled rendering for Player 3 & 4 character slots and hands in `js/components/GameBoard.js`.
    *   Added initial state definitions for Player 3 & 4 in `js/state.js`.
    *   Added initial hand draw calls for Player 3 & 4 in `js/main.js`.
    *   Added `boardSlots` definitions for Player 3 & 4 hand slots in `js/state.js`.
*   **Validation:**
    *   Verified that all card images are loading correctly (fixed in previous session).
    *   Confirmed that all UI elements (GRID30, Player 3/4 hands/chars) are properly positioned and rendered.

## [YYYY-MM-DD] - Phase 6: Basic Drag & Drop Implementation (Part 1)

*   **Step 1: Draggable Attribute**
    *   Verified `draggable="true"` attribute and basic `dragstart` listener were already present in `js/components/Card.js`.
*   **Step 2: Event Listeners & State Update (Partial)**
    *   Added `dragover` and `drop` event listeners to `.card-slot` elements in `js/main.js` within the `setupEventListeners` function.
    *   Modified `js/components/Card.js` (`createCardElement`) to accept `slotId` parameter and store both `cardId` and `originSlotId` in `event.dataTransfer` during `dragstart`.
    *   Updated calling locations (`PlayerHand.js`, `CharacterSlot.js`, `StoryGrid.js`) to pass the correct `slotId` to `createCardElement`.
    *   Modified the `drop` listener in `js/main.js` to parse the transferred data (`cardId`, `originSlotId`) and identify the `targetSlotId`.
    *   Added a new function `moveCard(cardId, originSlotId, targetSlotId)` to `js/state.js` to handle basic state updates for moves between slots with a `cardId` property (grid, character).
    *   Updated the `drop` listener in `js/main.js` to call `moveCard` and then `renderGameBoard` to update the state and UI.
*   **Note:** Current implementation of `moveCard` does not yet handle moves involving player hands or discard piles (arrays). 