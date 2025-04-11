# DEBUG NOTES

**------READ-ONLY SECTION START------**

## Purpose
This file documents debugging insights, solution approaches, and lessons learned when resolving issues in the codebase. It serves as a knowledge repository for recurring patterns, tricky bugs, and their solutions.

## Documentation Standards
1. Each entry must include:
   - Issue ID and title
   - Timestamp (ISO format: YYYY-MM-DD HH:MM)
   - Author (Model: Claude or Gemini)
   - Symptoms observed
   - Root cause analysis
   - Solution implemented
   - Verification method
   - Lessons learned

2. Format entries consistently:
   ```
   ## [YYYY-MM-DD HH:MM] - KI-### - Issue Title
   - **Author:** Model Name
   - **Symptoms:** Observable behavior indicating the problem
   - **Affected Components:** Component1, Component2
   - **Root Cause:** Detailed explanation of what caused the issue
   - **Solution:** How the issue was fixed
   - **Verification:** How the fix was verified
   - **Lessons Learned:** Key insights from debugging this issue
   - **Related Issues:** KI-### (if applicable)
   ```

3. Include code snippets when relevant (before/after)
4. Cross-reference related issues
5. Tag entries with categories for easier searching (e.g., #rendering, #state-management, #event-handling)

**------READ-ONLY SECTION END------**

# DEBUG HISTORY

## [2025-04-11 HH:MM] - Card ID Mismatch in Drag Operations
- **Author:** Claude
- **Symptoms:** Cards render in player hands but appear with positioning issues. When attempting to drag cards, console shows errors: `Move failed: Card amberSin not found in origin hand slot PLAYER1_HAND1 (Player 1). Hand: ['item_1', 'spell_7', 'item_7', 'item_26', 'item_18']`
- **Affected Components:** PlayerHand.js, Card.js, main.js (event handling), renderUtils.js
- **Root Cause Analysis:** After refactoring to use renderUtils.js and improving event delegation, there appears to be a mismatch between:
  1. How card IDs are stored in the game state (e.g., 'item_1', 'spell_7')
  2. How they're attached to DOM elements during rendering
  3. How they're captured during drag events (capturing "amberSin" instead of the actual item_X format)
  
  This suggests an inconsistency between manifestKey and cardId handling in the refactored code.
- **Proposed Investigative Steps:**
  1. Add detailed logging in dragstart event handler to identify exactly which element attributes are being captured
  2. Check how card data is passed from state to rendering functions to DOM elements
  3. Verify correct parent-child relationships for event delegation
  4. Ensure consistent ID format between state and UI elements
- **Verification Method:** Test drag operations between all zones after fixes
- **Related Issues:** Related to the refactoring work in I1.5, particularly the changes to event handling and rendering
- **Tags:** #drag-and-drop, #event-handling, #data-attributes, #refactoring

## [2025-04-11 HH:MM] - KI-004 - Player Hand Rendering Failure
- **Author:** Claude
- **Symptoms:** Player hands were not rendering on screen despite cards being properly drawn in the game state. Console logs showed: "DEBUG: player1 hand cards: (5) [...card ids...]" followed by "DEBUG: Found 0 hand slots for player1: []" for all players.
- **Affected Components:** PlayerHand.js
- **Root Cause:** In the `renderPlayerHand` function, the filter to find hand slots was looking for slots where `GameState.boardSlots[slotId].playerId === playerKey`, comparing a numeric value (1, 2, 3, 4) to a string ('player1', 'player2', etc.). This type mismatch caused no slots to be found.
- **Solution:** Modified the filter to use `player.id` (numeric) instead of `playerKey` (string): 
  ```javascript
  const playerHandSlotIds = Object.keys(GameState.boardSlots).filter(slotId =>
      GameState.boardSlots[slotId]?.type === 'hand' && GameState.boardSlots[slotId]?.playerId === player.id
  );
  ```
- **Verification:** Fixed the code and tested - player hands now render correctly and show all cards.
- **Lessons Learned:** When refactoring code, pay close attention to data types in comparisons, especially between IDs represented in different formats across the codebase. Add more type checking or standardize ID formats throughout the application.
- **Related Issues:** This bug was introduced during I1.5 refactoring.
- **Tags:** #rendering, #type-mismatch, #filter, #refactoring

## [2025-04-10 17:10] - Drag and Drop Failure After Standardization
- **Author:** Gemini
- **Symptoms:** UI rendered correctly after standardizing `GameBoard.js`, but drag-and-drop functionality was completely broken. No console errors were initially observed when attempting to drag.
- **Affected Components:** `main.js`, `utils.js`, all component files using utilities.
- **Root Cause Analysis:** 
    1.  **Module Export Error:** The utility functions in `utils.js` (`createSlotElement`, `positionElement`, `handleElementError`) were defined but not exported. The `export { ... }` line was commented out, causing `import` statements in other components to fail and throw a `SyntaxError: The requested module '../utils.js' does not provide an export named '...'`.
    2.  **Coordinate Property Mismatch:** The `positionElement` utility function in `utils.js` expected coordinate objects with lowercase `x` and `y` properties, but `GameState.uiCoordinates` (populated from `UIcoordinates.json`) uses uppercase `X` and `Y`. This caused an `Error: Invalid parameters for positionElement` when rendering components tried to position elements.
    3.  **Incorrect Event Listener Selector:** The `setupEventListeners` function in `main.js` used `document.querySelectorAll('.card-slot')` to find elements to attach drop listeners. However, the refactored components now use the `createSlotElement` utility, which assigns the class `game-slot`. The selector was therefore finding no elements, and no listeners were being attached.
- **Solution:**
    1.  Uncommented the `export { createSlotElement, positionElement, handleElementError };` line in `utils.js`.
    2.  Modified `positionElement` in `utils.js` to check for and use `coords.X` and `coords.Y`.
    3.  Changed the selector in `setupEventListeners` in `main.js` to `document.querySelectorAll('.game-slot')` and updated the `closest()` call similarly.
- **Verification:** Refreshed the browser and confirmed that the UI rendered without errors and drag-and-drop functionality was restored between valid slots.
- **Lessons Learned:** Ensure modules correctly export functions intended for use elsewhere. Be meticulous about data structure consistency (e.g., property names like X/Y vs x/y). When refactoring CSS classes used by JavaScript selectors, update the selectors accordingly.
- **Related Issues:** Directly followed standardization of `GameBoard.js` (I1.3 Step 7).
- **Tags:** #drag-and-drop, #event-handling, #modules, #exports, #selectors, #coordinates, #refactoring

## [2025-04-10 16:45] - Component Structure Analysis for Standardization
- **Author:** Claude
- **Symptoms:** Inconsistent component structure, duplicate code patterns, and varying error handling approaches across components.
- **Affected Components:** `Card.js`, `PlayerHand.js`, `StoryGrid.js`, `CharacterSlot.js`, `DeckPile.js`, `GameBoard.js`, `main.js`
- **Root Cause Analysis:** Code was developed incrementally without standardized patterns, leading to:
  1. Inconsistent parameter handling (e.g., `createCardElement` called with 1-3 parameters)
  2. Different error handling strategies (some using immediate returns, others continuing execution)
  3. Duplicate DOM element creation patterns in every component
  4. Inconsistent documentation (some functions with JSDoc, others without)
  5. Repeated positioning code across components
- **Solution Plan:** 
  1. Create a utilities module with shared functions
  2. Standardize parameter handling and error approaches
  3. Systematically refactor each component to use utility functions
  4. Improve documentation with consistent JSDoc comments
  5. Extract common UI operations to reduce duplication
- **Verification Method:** Test functionality after updating each component
- **Lessons Learned:** Establishing standardized patterns early in development is crucial for maintainability. Refactoring becomes more complex as the codebase grows.
- **Related Issues:** Part of Code Cleanup Plan (I1.3, I1.4, I1.5)
- **Tags:** #structure, #refactoring, #standardization, #documentation

## [2025-04-10 14:25] - KI-002 - Image Path Inconsistency Fixed
- **Author:** Claude
- **Symptoms:** Console showing numerous 404 errors for card images. The error paths were of the form `/assets/jpg/cards/items/items_silverSpoon.jpg` (with plural directory names).
- **Affected Components:** `Card.js`, `DeckPile.js`
- **Root Cause:** The `transformImageUrl` function in `Card.js` was incorrectly modifying correct image paths from the card manifest. The manifest had the right paths using singular directory names (e.g., `assets/jpg/cards/item/items_silverSpoon.jpg`), but the transformation function was changing the directory name from singular to plural, creating nonexistent paths (e.g., `assets/jpg/cards/items/items_silverSpoon.jpg`).
- **Solution:** Modified the `transformImageUrl` function to simply return the original URL without transformation, and updated the `createCardElement` function to use the original URL directly:
  ```javascript
  // Before:
  function transformImageUrl(originalUrl, cardType) {
      // Complex logic that modified directory names from singular to plural
  }
  // After:
  function transformImageUrl(originalUrl, cardType) {
      // The file paths in the manifest are already correct
      // Do not transform singular directory names to plural
      return originalUrl;
  }
  ```
- **Verification:** The fix was verified by checking if card images load correctly after the change.
- **Lessons Learned:** Asset path structures should be carefully documented and tested. In this case, the correct structure was `assets/jpg/cards/<singular_type>/<plural_type>_*.jpg` (e.g., `item/items_silverSpoon.jpg`), but code was trying to "fix" what wasn't broken.
- **Related Issues:** KI-001 (Discard Pile Rendering) - This issue was likely caused by the same root problem, as cards weren't rendering in the discard pile due to the image loading failures.
- **Tags:** #assets, #paths, #rendering

## [2025-04-10 00:00] - Initial Documentation Creation
- **Author:** Claude
- **Symptoms:** N/A
- **Affected Components:** N/A
- **Root Cause:** N/A
- **Solution:** Created the debug notes documentation file with template
- **Verification:** N/A
- **Lessons Learned:** Maintaining structured debug notes aids troubleshooting and prevents repeating past mistakes
- **Related Issues:** N/A
- **Tags:** #documentation

## [YYYY-MM-DD HH:MM] - Card Rendering Position Fix
- **Author:** Gemini
- **Symptoms:** Card images rendered offset from their parent slots (down and to the right), instead of being centered within them.
- **Affected Components:** `renderUtils.js`
- **Root Cause:** The `renderCardElement` function was calling `applyElementStyling` on the card image, applying the same absolute coordinates as the parent slot. An absolutely positioned element (card) inside another absolutely positioned element (slot) with the same coordinates results in the inner element aligning its top-left corner with the parent's top-left, rather than being positioned relative to the parent.
- **Solution:** Removed the `applyElementStyling` call from within `renderCardElement`. Card elements now have default positioning and rely on the parent slot's Flexbox properties (`display: flex`, `justify-content: center`, `align-items: center`) to center them.
- **Verification:** Refreshed the application and confirmed cards render correctly centered within their slots.
- **Lessons Learned:** Nested absolute positioning requires careful consideration of the coordinate reference point. Often, relying on parent layout (like Flexbox or Grid) for child positioning is simpler and more robust.
- **Tags:** #rendering, #positioning, #css, #absolute-positioning, #refactoring

## [2025-04-11 HH:MM] - KI-005 - Card ID Mismatch in Drag Operations
- **Author:** Claude / Gemini
- **Symptoms:** Cards render correctly after positioning fix. When attempting to drag cards (e.g., hand to grid), console shows `Move failed: Target container not found for slot [TargetSlotId] with type [TargetSlotType]` error originating from `state.js`, and the move is rejected (`Move rejected by state logic...`).
- **Affected Components:** `state.js` (`moveCard` function), potentially `main.js` (data transfer format - though seems correct now), `Card.js` (data attributes - seems correct now).
- **Root Cause Analysis (Updated):** 
    - Added detailed console logging throughout the drag-and-drop flow (`Card.js`, `main.js`, `state.js`).
    - Logs confirm that the correct `manifestKey` (e.g., 'item_14') is correctly captured during `dragstart`, stored in `event.dataTransfer`, retrieved during `drop`, and passed to `moveCard`.
    - The failure occurs specifically within the `moveCard` function when determining the **target container**. 
    - The current logic attempts to find a container based on `targetSlot.cardId` for types like 'storyGrid', 'character', 'mutable'. When the target slot is empty (`cardId` is `null`), this incorrectly leads to a "Target container not found" error.
    - The logic fails to distinguish between target types requiring array manipulation (hands, discards) and types requiring direct property assignment (`cardId` on the slot object itself).
- **Proposed Investigative Steps (Revised):**
    1.  Refactor the target handling logic within `state.js` -> `moveCard`.
    2.  Correctly identify the target based on `targetSlot.type`.
    3.  For array-based targets (hand, discard), push `manifestKey` to the appropriate array.
    4.  For slot-based targets (storyGrid, character, mutable), assign `manifestKey` directly to `targetSlot.cardId`.
    5.  Implement logic to handle already occupied target slots (currently warns, should potentially prevent or swap based on rules).
- **Verification Method:** Test drag operations between all valid zones after refactoring `moveCard`.
- **Related Issues:** Related to the refactoring work in I1.5, specifically changes in `state.js`.
- **Tags:** #drag-and-drop, #event-handling, #state-management, #refactoring, #logic-error

## [2025-04-11 HH:MM] - KI-004 - Player Hand Rendering Failure
- **Author:** Claude
- **Symptoms:** Player hands were not rendering on screen despite cards being properly drawn in the game state. Console logs showed: "DEBUG: player1 hand cards: (5) [...card ids...]" followed by "DEBUG: Found 0 hand slots for player1: []" for all players.
- **Affected Components:** PlayerHand.js
- **Root Cause:** In the `renderPlayerHand` function, the filter to find hand slots was looking for slots where `GameState.boardSlots[slotId].playerId === playerKey`, comparing a numeric value (1, 2, 3, 4) to a string ('player1', 'player2', etc.). This type mismatch caused no slots to be found.
- **Solution:** Modified the filter to use `player.id` (numeric) instead of `playerKey` (string): 
  ```javascript
  const playerHandSlotIds = Object.keys(GameState.boardSlots).filter(slotId =>
      GameState.boardSlots[slotId]?.type === 'hand' && GameState.boardSlots[slotId]?.playerId === player.id
  );
  ```
- **Verification:** Fixed the code and tested - player hands now render correctly and show all cards.
- **Lessons Learned:** When refactoring code, pay close attention to data types in comparisons, especially between IDs represented in different formats across the codebase. Add more type checking or standardize ID formats throughout the application.
- **Related Issues:** This bug was introduced during I1.5 refactoring.
- **Tags:** #rendering, #type-mismatch, #filter, #refactoring

## [2025-04-12 HH:MM] - KI-006 - Missing manifestKey Property in Card Objects
- **Author:** Claude
- **Symptoms:** Cards rendered in player hands, but couldn't be dragged. Console showed errors: `renderSlotWithCard: Missing manifestKey for card item_X in slot PLAYERY_HANDZ. Card will not be draggable.` followed by `renderCardElement: Missing manifestKey for card item_X in slot PLAYERY_HANDZ` and `Error: renderCardElement: Missing manifestKey for card item_X in slot PLAYERY_HANDZ`.
- **Affected Components:** `state.js`, `PlayerHand.js`, `renderUtils.js`
- **Root Cause:** While the `createCardObject` function in `state.js` had been updated to include the `manifestKey` property, there were cases where card objects in `GameState.cardSlots` were missing this property. The `manifestKey` property is essential for making cards draggable as it's required by the drag-and-drop handlers.
- **Solution:** Added defensive checks in three locations to ensure card objects always have the `manifestKey` property:
  1. In `PlayerHand.js`: Added code to check if a card has an ID but is missing the `manifestKey` property, and add it if needed
  2. In `renderUtils.js`: Enhanced `renderSlotWithCard` to provide a fallback that sets `manifestKey = id` if `manifestKey` is missing
  3. In `state.js`: Added a defensive check in the `drawCard` function to ensure card objects have a `manifestKey` property before placement
- **Verification:** The fixes were implemented and the application was tested. Cards now render properly and are draggable.
- **Lessons Learned:** Even with central functions like `createCardObject` correctly setting properties, defensive checks at key points in the rendering pipeline provide important fallbacks to ensure consistent behavior. This is especially important for properties that are critical to core functionality like drag-and-drop.
- **Related Issues:** Part of the state management refactoring (KI-005)
- **Tags:** #drag-and-drop, #state-management, #refactoring

<!-- Add new entries ABOVE this line -->

# Debug Notes (formerly Solution Journal)

This document records specific problems encountered and how they were solved during the development of SoulSworn 2.0.

## 2024-07-26: Initial Project Setup & CORS

*   **Problem:** Loading `card-manifest.json` via `fetch` failed due to CORS policy when opening `index.html` directly from the filesystem (`file:///`).
*   **Solution:** Ran a simple local HTTP server (`python3 -m http.server`) in the project root directory (`soulsworn-rebuild/`) and accessed the game via `http://localhost:8000`. This served the files over HTTP, satisfying the browser's same-origin policy for `fetch` requests.
*   **Reference:** `CONTINUE.md` - Environment section.

## 2024-07-26: Asset Path Issues

*   **Problem:** Card images referenced in `card-manifest.json` (e.g., `assets/cards/items/item_scroll.jpg`) were not loading. The paths were incorrect relative to where the CSS or JS expected them.
*   **Solution:** Ensured all asset paths within the JSON and used by the JS components (`Card.js`) were relative to the `index.html` root (e.g., `assets/cards/items/item_scroll.jpg`). No leading `/` was needed when served via the local HTTP server.
*   **Reference:** `js/components/Card.js`, `assets/card-manifest.json`.

## 2024-07-27: Incorrect `GameState.players` Definition

*   **Problem:** The initial attempt to define `GameState.players` involved trying to reference `GameState.boardSlots` within the `GameState` object literal itself before `boardSlots` was fully defined, leading to errors.
*   **Solution:** Restructured `GameState.players` to hold simple data (like `id`, `hand` array, `characterSlotId` string) and removed direct references to `boardSlots` within its definition. The link between a player and their slots is now maintained through IDs (e.g., `characterSlotId`) and handled by rendering logic.
*   **Reference:** `js/state.js` (commit history showing the change).

## 2024-07-27: Incorrect `drawCard` Logic

*   **Problem:** The first implementation of `drawCard` incorrectly assumed player-specific draw piles referenced within the `GameState.players` object. It should have used the global `mainDeck` and `altDeck`.
*   **Solution:** Modified `drawCard` to access `GameState.mainDeck.drawPile` or `GameState.altDeck.drawPile` based on the `drawPileType` argument. Card IDs are popped from the global deck and pushed into the specific `player.hand` array.
*   **Reference:** `js/state.js` (commit history or diff).

## 2024-07-27: Adapting `UIcoordinates.json` for Current Scope

*   **Problem:** The provided `UIcoordinates.json` defines layout for 4 players and a large (10x4) grid, while the current build focuses on 2 players and a 3x3 grid.
*   **Solution:** Planned adaptation strategy for Phase 5 (UI Layout Refactoring): Use only Player 1/2 coordinates, map the 3x3 grid conceptually within the larger defined grid space (initially aligning top-left with `GRID1`), and use specific deck/discard coordinates. Also noted the need to correct the Inspector's aspect ratio.
*   **Reference:** `CONTINUE.md` (Phase 5 plan), `SCRATCH_BUILD_PLAN.md` (Phase 5 Strategy).

## [2025-04-09] - GameState/UIcoordinate Label Mismatch

*   **Problem:** Console errors during `initializeState` (`Board slot '...' defined in GameState has no matching LABEL in UIcoordinates.json!`) and subsequent `drawCard` failures (`...draw pile is empty`).
*   **Cause:** Inconsistent labeling between `GameState.boardSlots` object keys (e.g., `PLAYER1_HAND1`) and the corresponding `LABEL` values in `UIcoordinates.json` (e.g., `PLAYER 1_HAND1` with a space).
*   **Solution:** Standardized all player-related `LABEL`s in `UIcoordinates.json` to use the `PLAYER<N>_...` format (no spaces) to match the keys used in `GameState.boardSlots`.

## [2025-04-09] - Card Image Loading Errors (404 Not Found)

*   **Problem:** Console showing `404 (File not found)` errors for card images (e.g., `GET .../item/item_marinersFlask.jpg`). Card images failed to display.
*   **Cause:** Mismatch between `imageUrl` paths defined in `assets/card-manifest.json` and the actual image filenames in `assets/jpg/cards/` subdirectories.
    *   The manifest used singular prefixes (e.g., `item_`, `spell_`) while the actual filenames used plural prefixes (e.g., `items_`, `spells_`).
    *   Several specific typos and incorrect filenames were also present in the manifest `imageUrl` paths.
*   **Solution:**
    1.  Verified actual filename prefixes in image directories (`items_`, `spells_`, `locations_`, `monsters_`, `characters_`, `NPCs_`, `objectives_`).
    2.  Edited `assets/card-manifest.json`, correcting all `imageUrl` paths to use the correct plural prefixes.
    3.  Corrected specific filename typos and errors within the `imageUrl` paths in the manifest.

## Debugging Drag and Drop (2025-04-10)

*   **Problem 1: One Drag Limit:** After successfully dragging one card, subsequent drags failed. 
    *   **Root Cause:** The `renderGameBoard` function, called after a successful drop in `main.js`, was removing and recreating board elements. The `dragstart`, `dragover`, and `drop` listeners were attached directly to these elements and were thus removed. `setupEventListeners` was only called once on initial load, so listeners weren't re-attached to the new elements.
    *   **Solution:** Added a call to `setupEventListeners()` inside the `drop` listener in `main.js`, immediately after the `renderGameBoard()` call. This ensures listeners are re-attached after every render triggered by a drop. (Note: This recursive call is potentially problematic and may be refactored later using event delegation).

*   **Problem 2: Deck Drag Warning/Error:** Console showed `Missing slotId for card: cardBack` and `Drag Start: Card Key undefined ...`. 
    *   **Root Cause:** `createCardElement` in `Card.js` unconditionally set `draggable=true` and added a `dragstart` listener. `renderDeckPile` called `createCardElement` for the deck back image without providing `manifestKey` or `slotId`, leading to the element being wrongly draggable and having incomplete drag data.
    *   **Solution:** Modified `createCardElement` to only set `draggable=true` and add the listener if both `manifestKey` and `slotId` are present. Also commented out the `console.warn` for missing `slotId` as it's now expected for non-draggable elements.

*   **Problem 3: Mutable Slot Render Error:** Dragging a card *to* a mutable slot caused a `ReferenceError: createCardElement is not defined`.
    *   **Root Cause:** The `renderGameBoard` function was calling `createCardElement` within its loop for rendering mutable slots, but the function was not imported into `GameBoard.js`.
    *   **Solution:** Added `import { createCardElement } from './Card.js';` to `GameBoard.js`.

*   **Problem 4: Drag FROM Mutable Error:** Attempting to drag a card *from* a mutable slot resulted in a `SyntaxError: Unexpected end of JSON input` in `main.js` during the `drop` event.
    *   **Root Cause:** When `renderGameBoard` created the card element inside a mutable slot, it called `createCardElement` without providing the `manifestKey` and `slotId` arguments. Consequently, the conditional logic in `createCardElement` prevented the `dragstart` listener (which sets the JSON data) from being attached to the card. The `drop` handler then received empty data from `event.dataTransfer.getData`, causing `JSON.parse` to fail.
    *   **Solution:** Modified the call to `createCardElement` within the mutable slot rendering loop in `GameBoard.js` to pass the correct `manifestKey` (which is `