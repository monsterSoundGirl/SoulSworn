# CONTINUE

**------READ-ONLY SECTION START------**

## **ALWAYS READ THIS SUB-SECTION!**

### HOW TO USE THIS DOCUMENT
This document is the key mechanism of hand-off and continuity from chat to chat, agent to agent. It is updated when I call, "Prepare CONTINUE.md for a fresh chat", or any variation of this.

### KEY PRIORITY
- Maintain a codebase that is straightfoward to debug through purposeful, short iterations and documentation continuity

### SESSION AGENCY AND WORKFLOW SWITCHING

Session types
- Planning - analysis, planning, and breaking down complex problems
- Coding - plan implementation and initial documentation updates
- Evaluation - review the changes, identify edge cases, and refine documentation for clarity

Session Agency
- Planning -> Claude Model
- Coding -> Gemini Model
- Evaluation -> Claude Model

### CHAT SESSION PROCEDURE
- **Plan** the session after reading CONTINUE.md
- **Build** if applicable  
- **Document** each session activity
- **Review** the session objective, the progress, and the documentation to assure continuity

### DOCUMENTATION
- Every document has a read-only header detailing purpose
- Every document has a read-only sub-header detailing standards, should updates be required
- Every document entry should be versioned and timestamped
- The key project documents are:
    - CONTINUE.md
    - change_log.md
    - debug_notes.md (formerly solution_journal.md)
    - function_registry.md
- Also read the header for Soulsworn Rules and Gameplay.md. Reference the balance of this Read-Only document as-needed.

### ALWAYS...:
- read the header and purpose of every document called out in the CONTINUE.md file
- reference relevant documentation AND the project directory at the beginning of planning
- focus on one problem at a time
- document frequently for continuity
- document dead code and report
- explicity save context in CONTNUE.md before moving to a new chat

### NEVER...:
- leave code fragments
- leave code in comments
- leave dead code undocumented

### SESSION CHECKPOINTS
All sessions MUST incorporate the following pause points:

1. **After Plan Presentation** - After presenting the initial plan, pause for confirmation before beginning implementation.
   - Example prompt: "I've outlined the plan above. Should I proceed with the first step?"

2. **After Information Gathering** - After collecting necessary information (reading files, searching codebase), pause before proposing specific changes.
   - Example prompt: "Based on my analysis above, I'll now propose specific code changes. Ready to proceed?"

3. **Before Code Modifications** - Before making any actual code changes, outline the specific changes and pause.
   - Example prompt: "I'll make the following changes to fix the issue. Should I implement these changes now?"

4. **After Implementation Milestone** - After completing a logical unit of work (one function, one bug fix), pause to evaluate and confirm direction.
   - Example prompt: "I've implemented the changes described above. Would you like me to continue with the next step or test this implementation first?"

5. **Before Session Conclusion** - Before ending a session, summarize what was accomplished and what remains.
   - Example prompt: "Should I update the documentation to reflect these changes before concluding this session?"

The model MUST wait for explicit confirmation ("proceed", "continue", "yes", etc.) before moving past these checkpoints.

**------END READ-ONLY SECTION------**


# CURRENT STATE

## Project Overview
- **Project Name:** Soulsworn 2.0 - Scratch Build
- **Description:** Web-based card game UI with drag-and-drop functionality for cards between different game zones
- **Environment:** Python HTTP Server (`cd soulsworn-rebuild && python3 -m http.server 8001`)
- **Access URL:** http://localhost:8001/index.html

## Recent Completed Work
- Implemented basic drag-and-drop functionality for cards between various slots
- Fixed critical bug with cardId/manifestKey mismatch in drag-and-drop operations
- Fixed error when dragging cards from mutable slots
- Consolidated documentation files in the root project directory

## Current Implementation Status
- **Core Functionality:** Cards can be dragged between most zones (hand, grid, character slots)
- **Testing Status:** Partially tested drag-and-drop scenarios
- **Documentation Status:** Updated but needs continued maintenance
- **Issues Status:** One critical issue remains (discard pile rendering)

# NEXT TASKS

## Critical Tasks (Blocking Issues)
- **C1:** Fix discard pile rendering issue - Cards dragged to discard piles disappear instead of rendering
  - Priority: High
  - Estimate: 1 session
  - Dependencies: None

## Important Tasks (In-Progress Features)
- **I1:** Clean up codebase (remove debug code, standardize components)
  - Priority: Medium
  - Estimate: 1 session
  - Dependencies: None
  
- **I2:** Complete testing of all drag-and-drop scenarios
  - Priority: Medium
  - Estimate: 1 session
  - Dependencies: C1

## Enhancement Tasks (Nice-to-Have)
- **E1:** Add visual cues for drag-and-drop operations
  - Priority: Low
  - Estimate: 1 session
  - Dependencies: C1, I1, I2
  
- **E2:** Refactor event listeners for improved efficiency
  - Priority: Low
  - Estimate: 1 session
  - Dependencies: I1

# KNOWN ISSUES

## KI-001: Discard Pile Rendering Failure
- **Description:** When a card is dragged to a discard pile, the card visually disappears rather than showing as the top card of the discard pile.
- **Affected Components:** `DeckPile.js`, `state.js`
- **Current Understanding:** The issue likely involves how the discard pile accesses or renders the card ID from GameState after a move operation.
- **Potential Solutions:**
  1. Examine the `renderDeckPile` function in `DeckPile.js` to ensure it correctly accesses the card ID
  2. Verify the card image path construction for discard piles
  3. Check how the card element is created and appended to the DOM for discard piles

## KI-002: Missing Image Assets
- **Description:** Multiple 404 errors in the console for card image assets
- **Affected Components:** Card rendering system
- **Current Understanding:** Path to card images may be inconsistent or images might be missing
- **Potential Solutions:**
  1. Check for naming inconsistency between manifest references and actual file paths
  2. Verify all required assets exist in the correct directories

# HANDOFF NOTES

## Current Session Handoff (Claude → Gemini)
- **Session Type:** Planning completed, transitioning to Coding
- **Focus Areas for Next Model:**
  1. Implement fix for discard pile rendering (KI-001)
  2. Follow the investigative steps outlined in the Known Issues section
  3. Update documentation after code changes
- **Context Notes:**
  - Card image paths may be related to the discard issue (see server logs showing 404s)
  - Previously fixed similar issues with manifestKey vs cardId inconsistency
  - Remember to pause after analyzing the issue before implementing a fix

## Expected Return Handoff (Gemini → Claude)
- **Validation Requirements:**
  - Verify cards correctly render in discard pile after being moved there
  - Ensure fix doesn't break existing functionality
  - Document the changes in the appropriate files