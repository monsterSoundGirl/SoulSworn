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

*   **Project Root:** `/Users/christianwright/Documents/SoulSworn/`
*   **Working Directory:** `soulsworn-rebuild/`
*   **Testing:** Python HTTP Server (`cd soulsworn-rebuild && python3 -m http.server 8001`). Access via `http://localhost:8001/index.html` (Use port 8000 or another if 8001 is taken).
*   **Note:** Browser cache/hard refresh (Cmd/Ctrl+Shift+R) may be needed after changes.

## Session Summary & Completed Work

*   **Documentation Consolidation:** Resolved issue where documentation (`function_registry.md`, `change_log.md`) was duplicated in the `soulsworn-rebuild/` directory. Consolidated all documentation into the root project directory (`./`).
*   **Phase 6: Basic Card Interaction (Drag and Drop) (Implementation Complete, Testing Partially Complete)**
    *   **Goal:** Implement drag-and-drop functionality allowing players to move cards between valid slots (hand, grid, character, discard).
    *   **Completed Steps:**
        *   Verified `draggable="true"` on card elements (`js/components/Card.js`).
        *   Implemented `dragstart`, `dragover`, `drop` listeners (`js/main.js`, `js/components/Card.js`).
        *   Extended `moveCard` function (`js/state.js`) to handle moves involving:
            *   Slot-to-slot (grid, character, mutable)
            *   Hand-to-slot / Slot-to-hand
            *   Hand-to-hand
            *   Slot-to-discard / Hand-to-discard
        *   **Bug Fix:** Resolved critical bug where the `cardId` passed during `dragstart` (using internal card ID like "mirrorSnap") did not match the ID stored in state arrays like `player.hand` (which used the manifest key like "spell_6"). Updated `createCardElement` and its callers (`PlayerHand.js`, `CharacterSlot.js`, `StoryGrid.js`) to consistently use the manifest key for drag-and-drop operations.
        *   **Bug Fix:** Fixed error when dragging cards from mutable slots by properly passing the `manifestKey` and `slotId` when creating card elements in mutable slots.
    *   **Testing Status:**
        *   Successfully tested: Hand → Grid, Hand → Character Slot, Grid → Hand, Character → Hand, Intra-Hand movements
        *   Partially tested: Grid → Grid, Character → Grid, Grid → Character
        *   **Issue Identified:** Cards dragged to discard piles disappear instead of rendering in the discard pile

## Next Phase: Fix Discard Pile Rendering & Code Cleanup

*   **Goal 1: Fix Discard Pile Rendering**
    *   **Issue Description:** When a card is dragged to the discard pile, the card visually disappears rather than showing up as the top card of the discard pile.
    *   **Plan for Next Session:**
        1.  **Investigate:** Examine the `renderDeckPile` function in `js/components/DeckPile.js` to understand how it renders the discard pile card.
        2.  **Analyze:** Determine if the issue is with:
            *   How the discard pile accesses the card ID from `GameState.boardSlots`
            *   How the card's image path is constructed/retrieved
            *   How the card element is created and appended to the DOM for discard piles
        3.  **Fix Implementation:** Modify the appropriate code to correctly render the top card of the discard pile after a move.
        4.  **Test:** Verify the fix works for all discard scenarios:
            *   Hand → Discard
            *   Grid Slot → Discard
            *   Character Slot → Discard

*   **Goal 2: Code Cleanup**
    *   **Plan for Next Session:**
        1.  **Remove Debug Code:** Identify and remove unnecessary `console.log` statements, commented-out code, and redundant functions across all files.
        2.  **Standardize Component Code:** Ensure consistent parameter usage and naming conventions across all component files.
        3.  **Review Event Handling:** Check for any inefficiencies in the event handling code, particularly the drag and drop listeners.
        4.  **Documentation Updates:** Update function documentation to reflect recent changes and fixes.

**Action for Next Session (New Chat):**

1.  **Read Project Directory:** Ensure you have a complete overview of the project structure, including all subdirectories.
2.  **Understand Current State:** Read this `CONTINUE.md` file fully.
3.  **Focus on Discard Pile Fix:** First address the discard pile rendering issue by:
    *   Reading `js/components/DeckPile.js` to understand how the discard pile is currently rendered
    *   Analyzing the issue with card display in discard piles
    *   Implementing a fix to correctly show cards in the discard pile
    *   Testing the solution thoroughly
4.  **Cleanup Code:** After fixing the discard pile issue, clean up the codebase by removing debugging code, standardizing components, and improving documentation.

**Remember:** Pause after proposing your plan and after each significant step, waiting for user confirmation before proceeding. This ensures alignment and helps manage context efficiently. 