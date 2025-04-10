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
    *   **Solution:** Modified the call to `createCardElement` within the mutable slot rendering loop in `GameBoard.js` to pass the correct `manifestKey` (which is `slotData.cardId`) and `slotId`. 