# CHANGE LOG

**------READ-ONLY SECTION START------**

## Purpose
This file tracks all significant changes made to the codebase, providing a chronological history of modifications for reference and troubleshooting.

## Documentation Standards
1. Each entry must include:
   - Version/timestamp (ISO format: YYYY-MM-DD HH:MM)
   - Author (Model: Claude or Gemini)
   - Files modified
   - Brief description of changes
   - Related issue ID (if applicable)
   - Related functions affected

2. Format entries consistently:
   ```
   ## [YYYY-MM-DD HH:MM] - Change Title
   - **Author:** Model Name
   - **Files:** path/to/file.js, path/to/another.js
   - **Changes:** Brief description of what was modified
   - **Issue:** KI-### (if applicable)
   - **Functions Affected:** functionName(), anotherFunction()
   - **Reason:** Explanation of why the change was needed
   ```

3. Most recent changes should appear at the top of the file

4. Group related changes under a single timestamp when possible

**------READ-ONLY SECTION END------**

# CHANGE HISTORY

## [2025-04-10 00:00] - Initial Documentation Creation
- **Author:** Claude
- **Files:** change_log.md
- **Changes:** Created the change log documentation file with template
- **Issue:** N/A
- **Functions Affected:** N/A
- **Reason:** Establish consistent documentation standards for the project

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

## [Current Date] - Phase 6: Drag & Drop Cleanup (Part 1)

*   **Clean & Optimize:**
    *   Reviewed `moveCard` function (`js/state.js`).
    *   Removed unnecessary `console.log` statements and redundant comments from `moveCard`.

## [Current Date] - Phase 6: Drag & Drop Cleanup (Part 2)

*   **Clean & Optimize:**
    *   Reviewed `createCardElement` function (`js/components/Card.js`).
    *   Removed commented-out `setDragImage` line.

## [Current Date] - Phase 6: Drag & Drop Cleanup (Part 3)

*   **Clean & Optimize:**
    *   Reviewed drag/drop event listeners (`dragover`, `drop`) in `setupEventListeners` (`js/main.js`).
    *   Removed commented-out visual feedback lines and the `dragleave` listener.

## [Current Date] - Phase 6: Drag & Drop Cleanup (Part 4)

*   **Clean & Optimize:**
    *   Reviewed rendering components (`PlayerHand.js`, `CharacterSlot.js`, `StoryGrid.js`).
    *   Confirmed correct parameters (`cardData`, `manifestKey`, `slotId`) are passed to `createCardElement` in all three components.

## [Timestamp: 2025-04-10 approx 08:15 UTC]

*   **Fix:** Modified `js/components/Card.js` (`createCardElement`) to only set `draggable=true` and add `dragstart` listener if `manifestKey` and `slotId` are provided. This prevents non-card elements (like deck backs) rendered using this function from becoming inappropriately draggable.
*   **Fix:** Commented out `console.warn` for missing `slotId` in `js/components/Card.js` as it's expected for non-draggable elements.
*   **Fix:** Added call to `setupEventListeners()` after `renderGameBoard()` within the `drop` event listener in `js/main.js`. This re-attaches listeners to elements recreated during the board render, fixing the "one drag only" bug.
*   **Fix:** Added missing import for `createCardElement` in `js/components/GameBoard.js` to resolve a `ReferenceError` when rendering cards in mutable slots.
*   **Fix:** Modified `js/components/GameBoard.js` (`renderGameBoard`) to correctly pass the `manifestKey` and `slotId` when calling `createCardElement` for cards within mutable slots. This resolves the `SyntaxError: Unexpected end of JSON input` error when attempting to drag a card *from* a mutable slot. 