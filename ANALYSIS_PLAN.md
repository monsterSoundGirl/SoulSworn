# Codebase Analysis Plan

**Objective:** Systematically analyze the SoulSworn codebase to understand its structure, dependencies, and logic, informing the decision between further refactoring or a scratch build. Findings will be documented in `CODEBASE_ANALYSIS.md`.

**Process:** Analyze each file/module listed below. For each item, read the file content, summarize its purpose, identify key components/functions, document its dependencies (both internal and external libraries/globals), note interactions with the global state, and list any concerns or points of interest.

**Checklist:**

- [x] **`index.html`**: Analyze the main HTML structure, CSS links, script loading order, and key DOM elements.
- [x] **`style.css`**: Analyze the primary CSS file, identify major styling blocks, and note any potential conflicts or complexities.
- [x] **`utils.js`**: Analyze the extracted utility functions. (Already refactored - verify understanding).
- [x] **`state.js` / `state-bridge.js`**: Analyze the state management implementation and the compatibility bridge.
- [x] **`logger.js` / `logger-bridge.js`**: Analyze the logging system and its bridge.
- [x] **`notificationService.js`**: Analyze the notification system.
- [x] **`eventSystem.js`**: Analyze the partially implemented event system.
- [ ] **`script.js`**: Analyze the core script file. This is likely the most complex part. Break down the analysis by logical sections if needed:
    - [x] Global variable declarations (pre-state management).
    - [ ] Initialization functions (e.g., `startGame`): **Next Step:** Locate the definition of `startGame` (likely further down in `script.js` or in another file like `turn-timer-4-2.js`?) and analyze it along with related setup functions (`initializeMenuInteractions`, `initializeDeckTypeSelection`, `initializeCardTypeDropdowns`, etc.) called from `DOMContentLoaded`.
    - [ ] Core game logic functions (e.g., `