# **THIS SECTION IS READ-ONLY** - it will persist through each CONTINUE.md update and provide scaffolding (rules) to follow for clean performance.

## Scaffolding:

0. **Read the Project Directories**: You need to know what files are present.

1. **Action Breaks & Iteration Size**: Always make an action plan that's broken into **small, iterative chunks** before taking action. **Crucially, keep iterations minimal (e.g., modifying one function or implementing one small feature)** to manage context token usage effectively and maintain peak AI performance. Build-in natural stop-breaks and action delimiters, asking for permission to continue. This avoids runaway coding and capability overruns.

2. **Code Cleanliness**: For every prompted set of changes we make to code, always include a step in your plan to clean old code, removing old functions and unnecessary debugging statements and ensuring consistent formatting. This includes cleaning out old comments.

2.1 **Don't comment functions**: If you need to keep a record of old functions, place them in a partitioned section of your documentation.

3. **Documentation Updates**: Update documentation after code changes - 
    - solution_journal.md, to explain how you fixed a problem, 
    - change_log.md, to detail what you've changed and time-stamp it
    - function_registry.md, to keep track of all functions you create/modify
    - SCRATCH_BUILD_PLAN.md, every plan you architect before a build stage can be committed to this document, which can be overwritten as needed
    - continue.md, see below for detail
     These documents are your memory for best practices and debug references, so be meticulous. Always identify dependencies two-degrees of separation from a function you've changed. 

4. **'CONTINUE.md' Usage Rules**: This document serves as a continuity mechanism between chat sessions. This top section must remain unchanged, while the rest of the document is yours to update as we move from chat-to-chat. Our goal is to use language that rapidly resumes activity in a new chat.

5. **Leverage the Chrome Console**: While it's perfectly acceptable to build a debugging utility if we need one, please plan to use the Chrome console whenever feasable. It will save build time and keep us focused.

6. **PROCEDURE**: You'll subdivide these sections per item, but even simple changes to functionality should interate through the following:
    - Plan. 
    - Build.
    - Clean.
    - Test/Validate.
    - Optimize.
    - Clean.

**------READ-ONLY ABOVE THIS LINE------**

**------CURSOR AGENT BELOW THIS LINE------**

# Build Status and Next Steps (Soulsworn 2.0 - Scratch Build)

## Environment

*   **Project Root:** `soulsworn-rebuild/`
*   **Testing:** Python HTTP Server (`cd soulsworn-rebuild && python3 -m http.server`), access via `http://localhost:8000/index.html`
*   **Note:** Browser cache/hard refresh (Cmd/Ctrl+Shift+R) may be needed after changes.

## Completed Work

*   **Phase 1: Project Setup & Static Card Rendering (Complete)**
    *   Task 1: Initial directory structure created (`soulsworn-rebuild/`). Old project archived (`Soulsworn_1.0/`).
    *   Task 2 & 3: Basic `index.html` and `css/main.css` created.
    *   Task 4: Initial `js/state.js` with placeholder `GameState` implemented.
    *   Task 5: Basic `js/main.js` entry point implemented.
    *   Task 6: Card data loading via `assets/card-manifest.json` implemented in `js/state.js`.
    *   Task 7: Basic `js/components/Card.js` component implemented.
    *   Task 8: Debugged asset loading issues (CORS, path discrepancies).

*   **Phase 2: Core Board Layout & State Initialization (Complete)**
    *   Task 1: Defined all `BoardSlot` objects (hands, grid, decks, etc.) with unique IDs in `GameState` (`js/state.js`).
    *   Task 2: Implemented CSS (Flexbox/Grid) in `css/board.css` and updated `index.html` to visually structure the board layout (player areas, shared area, deck area).
    *   Task 3: Created UI components (`js/components/GameBoard.js`, `PlayerHand.js`, `CharacterSlot.js`, `StoryGrid.js`, `DeckPile.js`) to dynamically create HTML elements for each `BoardSlot` based on `GameState`.
    *   Task 4: Updated `js/main.js` to call `renderGameBoard()` to orchestrate the initial board rendering.
    *   Task 5: Verified the UI reflects the initial empty state of all `BoardSlot`s, including card backs on draw piles.

*   **Phase 3: Deck Initialization & Shuffling (Complete)**
    *   Task 1: Defined `assignedCardTypes` for main (`item`, `spell`) and alt (`location`, `monster`) decks in `GameState` (`js/state.js`).
    *   Task 2: Implemented logic in `initializeState` (`js/state.js`) to populate `drawPile` arrays based on card types.
    *   Task 3: Implemented Fisher-Yates shuffle (`shuffleArray` function) in `js/state.js` and applied it to both `drawPile` arrays within `initializeState`.
    *   Task 4: Verified deck initialization and shuffling via console logs in `initializeState`.

*   **Phase 4: Initial Hand Drawing & Rendering (Complete)**
    *   Task 1: Defined initial hand size (`initialHandSize = 5`) in `GameState` (`js/state.js`).
    *   Task 2: Implemented `drawCard` function in `js/state.js` to move cards from global draw piles to player hand arrays.
    *   Task 3: Called `drawCard` in `js/main.js` after `initializeState` to deal initial hands.
    *   Task 4: Updated `js/components/PlayerHand.js` to render cards from `GameState.players[playerId].hand`.
    *   Task 5: Verification assumed complete for planning purposes.

## Current Activity: Phase 5 Implementation (Partially Complete)

*   **Context:** Transitioned UI layout from Flexbox/Grid to absolute positioning based on `UIcoordinates.json`.
*   **Completed Steps:**
    1.  **CSS Modified:** `css/main.css` updated for `position: relative` on `#game-container` with fixed dimensions derived from `UIcoordinates.json`. `css/board.css` updated to remove old layout rules, set core elements/slots to `position: absolute`.
    2.  **HTML Placeholders Added:** `div` elements with appropriate IDs added to `index.html` for `MENU`, `INSPECTOR`, `D20`, `LOGO`, `TURN-TIMER`.
    3.  **Placeholder CSS Added:** Absolute positioning applied via CSS rules in `board.css` for the new placeholder elements.
    4.  **JS Refactored:**
        *   `js/state.js`: Updated to load `UIcoordinates.json`, store coordinates keyed by `LABEL`, and align `GameState.boardSlots` keys/content with `UIcoordinates.json` `LABEL`s.
        *   JS Components (`PlayerHand.js`, `CharacterSlot.js`, `StoryGrid.js`, `DeckPile.js`): Refactored to remove container parameters, append elements directly to `#game-container`, and apply absolute positioning (`top`, `left`, `width`, `height`) via inline styles based on `GameState.uiCoordinates`.
        *   `js/components/GameBoard.js`: Updated to clear dynamic elements correctly, call refactored components, and added rendering for `mutable` slots.
    5.  **Debugging:**
        *   Resolved Python HTTP server port conflict (`OSError: [Errno 48] Address already in use`) by switching to port 8001.
        *   Corrected label mismatches in `UIcoordinates.json` (e.g., `PLAYER 1_HAND1` vs `PLAYER1_HAND1`) to align with `GameState.boardSlots` expectations. This resolved the `initializeState` error and subsequent empty deck warnings.
        *   Identified and corrected systematic `imageUrl` path errors in `assets/card-manifest.json`:
            *   Changed filename prefixes from singular (`item_`, `spell_`, etc.) to plural (`items_`, `spells_`, etc.) to match actual image filenames.
            *   Fixed specific filename typos (e.g., `items_vampireKey.jpg`, `locations_oracleAvenue.jpg`, `spells_redTether.jpg`) and formatting (`characters_techSavant.jpg`).

## Next Steps (Test & Clean - Phase 5 Completion)

1.  **Test/Verify (Card Images):** Launch the application (`python3 -m http.server 8001`) and **hard refresh** the browser (`http://localhost:8001/index.html`, Cmd/Ctrl+Shift+R).
    *   Verify that all card images (hands, decks) now load correctly without `404 (File not found)` errors in the console.
2.  **Test/Verify (Layout):** Visually inspect the layout.
    *   Verify elements (placeholders, card slots, cards) are positioned according to `UIcoordinates.json`.
    *   Confirm initial hands are drawn and rendered correctly in their absolute positions.
3.  **Debug:** Address any remaining errors or visual inconsistencies found during testing.
4.  **Cleanup:**
    *   Remove obsolete container `div` elements (`player1-area`, `player2-area`, `shared-area`, `deck-area`, `p1-hand-area`, etc.) from `index.html`.
    *   Remove corresponding obsolete CSS rules (e.g., `.player-area`, `.shared-area`, `.player-hand-container`) from `board.css` and potentially `main.css`.
5.  **Documentation:** Update `change_log.md` and `function_registry.md` to reflect the refactoring. Add notes to `solution_journal.md` if significant issues were overcome.

**Action for Next Session:** Resume at **Next Steps - Step 1**, verifying the card image loading after the manifest corrections. Then proceed with layout verification, further debugging, cleanup, and documentation. 