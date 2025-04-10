# SoulSworn Scratch Build Plan

## 1. Core Application Objective

*   **Primary Goal:** Rebuild the SoulSworn web application from scratch to create a highly intuitive and flexible user experience that closely mirrors the feel of playing with a physical deck of cards.
*   **User Experience Focus:**
    *   Prioritize direct manipulation (e.g., drag-and-drop for card movement).
    *   Minimize abstract UI elements (buttons, menus) where direct interaction is feasible.
    *   Digital features should primarily accelerate common physical actions (dealing, shuffling, setup) or enable necessary digital equivalents (card browsing, deck type assignment).
*   **Target User:** Primarily designed for a single host/operator managing the game board for a group playing together (potentially sharing a screen or in the same room). The UI should be clear and usable from this perspective.
*   **Maintainability & Scalability:** Build with modularity and clean code principles to facilitate future updates and feature additions. Follow scaffolding rules outlined in `CONTINUE.md`.

## 2. Guiding Principles & Standards

*   **Scaffolding Reference:** Adhere to the development process and documentation standards outlined in `CONTINUE.md` (Action Breaks, Code Cleanliness, Documentation Updates, Procedure).
*   **Architectural Principles:**
    *   **Modularity:** Break down functionality into distinct, reusable modules/components (e.g., DeckManager, PlayerState, CardComponent).
    *   **Separation of Concerns:** Keep UI rendering, application state, and game logic distinct.
    *   **Readability:** Write clear, well-formatted code with meaningful names. Avoid excessive or obvious comments.
    *   **Testability:** Design components and logic units that can be tested independently where feasible.
*   **"Physical Card Feel":** This principle guides UI/UX decisions, favoring direct interaction and minimizing unnecessary abstraction.

## 3. Gameplay Overview

*   **Reference:** Core gameplay mechanics, rules, and objectives are detailed in `Soulsworn Rules and Gameplay.md`.
*   **Core Loop Summary:** Players collaboratively build a story using cards drawn from various decks. Gameplay involves proposing scenes based on cards, voting on proposals, determining a "Storyteller," resolving "Skilled Actions" via d20 rolls + character tokens, and managing card hands/placements on a central Story Grid. The goal is to create a plausible narrative arc from an Origin card to an Objective card.

## 4. Proposed Technology Stack

*   **Frontend Framework/Library:** **Vanilla JavaScript (ES6+ Modules)**. Start simple and leverage native browser capabilities. Consider lightweight libraries or a micro-framework only if complexity demands it later.
*   **State Management:** **Custom State Management Module**. Begin with a simple object or class to hold the game state, potentially using events or callbacks for updates. Avoid complex libraries initially.
*   **Styling:** **CSS3 with CSS Variables**. Use standard CSS for styling and layout (Flexbox/Grid). Utilize CSS variables for theming and maintainability. Consider CSS Modules or a similar approach for component scoping if needed.
*   **Build Tools:** **None initially**. Rely on native ES Modules directly in the browser for development. Introduce a build tool (like Vite) later if needed for optimization, bundling, or transpilation.
*   **Testing:** **Manual Testing + Console Logging** initially. Introduce a testing framework (like Vitest or Jest) once core modules stabilize.
*   **Backend:** **None**. This is a purely client-side application. Notes persistence can be handled using `localStorage`.

## 5. High-Level Architecture

*   **Major Components:**
    *   **UI Layer:** Responsible for rendering the HTML structure based on the game state and capturing user interactions (clicks, drags, input). Composed of distinct UI components (e.g., `CardComponent`, `PlayerHandComponent`, `GameBoardComponent`).
    *   **State Manager:** A central module acting as the single source of truth for the entire application state (`GameState`). It provides methods to update the state and potentially notifies subscribers (UI components, logic modules) of changes.
    *   **Game Logic Modules:** Encapsulate specific game rules and actions (e.g., `DeckManager`, `TurnManager`, `ActionResolver`). These modules interact with the State Manager to read current state and trigger state updates based on game events or player actions.
    *   **Services:** Helper modules for cross-cutting concerns (e.g., `PersistenceService` for localStorage, `DragDropService` to manage card dragging logic).
*   **Data Flow:**
    1.  User interacts with a **UI Component** (e.g., clicks Draw Card button, drags card).
    2.  The **UI Component** calls a relevant method in a **Game Logic Module** or directly signals an intent to the **State Manager**.
    3.  The **Game Logic Module** processes the action (e.g., determines which card to draw, validates drop target), potentially reading from the **State Manager**.
    4.  The **Game Logic Module** requests a state update from the **State Manager** (e.g., move card ID from deck to hand).
    5.  The **State Manager** updates the `GameState`.
    6.  The **State Manager** notifies relevant **UI Components** that the state has changed.
    7.  **UI Components** re-render themselves based on the new `GameState`.
*   **Proposed Directory Structure:**
    ```
    /soulsworn-rebuild
    |-- index.html
    |-- css/
    |   |-- main.css
    |   |-- components/
    |       |-- card.css
    |       |-- board.css
    |       |-- ...
    |-- js/
    |   |-- main.js           # App entry point
    |   |-- state.js          # GameState manager
    |   |-- components/       # UI components (rendering, event listeners)
    |   |   |-- Card.js
    |   |   |-- PlayerHand.js
    |   |   |-- GameBoard.js
    |   |   |-- ...
    |   |-- logic/            # Game rules and actions
    |   |   |-- DeckManager.js
    |   |   |-- TurnManager.js
    |   |   |-- ActionResolver.js
    |   |   |-- ...
    |   |-- services/         # Helper modules
    |   |   |-- Persistence.js
    |   |   |-- DragDrop.js
    |   |   |-- ...
    |   |-- constants.js      # Game constants (e.g., slot IDs)
    |   |-- utils.js          # General utility functions
    |-- assets/
    |   |-- jpg/
    |   |   |-- cards/
    |   |   |   |-- character/
    |   |   |   |-- objective/
    |   |   |   |-- spell/
    |   |   |   |-- ... (other card types)
    |   |   |-- ui/
    |   |       |-- board-background.jpg
    |   |       |-- ...
    |   |-- audio/            # (Optional: Sound effects)
    ```

## 6. Core Feature List & Data Structures

*   **Core Features:**
    *   **Setup:** Player name input, assignment of card types to Alt Deck.
    *   **Board Rendering:** Display all static and dynamic elements (player areas, decks, grid, timer, etc.).
    *   **Card Management:**
        *   Visual representation of cards (using images from `assets`).
        *   Shuffling decks.
        *   Dealing initial hands.
        *   Drawing cards from Main/Alt deck.
        *   Discarding cards to Main/Alt discard.
    *   **Player State:** Display player names, hands, character cards, manage advantage tokens (increment/decrement up to sum of 7).
    *   **Card Interaction:**
        *   Drag-and-drop cards between valid zones (hand, grid, character slot, discard, mutable column).
        *   Click card to view in Card Inspector.
    *   **Game Zones:** Story Grid (10x4), Mutable Column (1x4), Player Hands (5 slots), Character Slots, Deck/Discard piles.
    *   **Gameplay Mechanics:**
        *   d20 Roller (click to roll, display result).
        *   Turn Timer (set, start/pause, reset, display).
    *   **Utilities:**
        *   Card Browser (view all cards, drag unassigned cards to board/hand).
        *   Notes Tray (text input, persistence via localStorage).
        *   Rules Tray (display static rules image).
    *   **Game Flow:** Manage transitions between Setup, Play, and End Game phases.
*   **Primary Data Structures:**
    *   **`Card`**: Represents a single card.
        *   `id`: Unique identifier (e.g., filename like `character_knight.jpg`).
        *   `type`: String (e.g., 'Character', 'Objective', 'Spell', 'Physical', 'Emotional', 'Rational', 'Location' - derived from asset subdirectory).
        *   `imageUrl`: String (path to the card's image, e.g., `assets/jpg/cards/character/knight.jpg`).
    *   **`Player`**: Represents a player.
        *   `id`: Number (1-4).
        *   `name`: String.
        *   `handSlotIds`: Array of Strings (references to `BoardSlot` IDs where hand cards are).
        *   `characterCardSlotId`: String (reference to `BoardSlot` ID for character card).
        *   `tokens`: Object `{ physical: number, emotional: number, rational: number }`.
    *   **`Deck`**: Represents a deck.
        *   `type`: String ('main' or 'alt').
        *   `assignedCardTypes`: Array of Strings (card types belonging exclusively to this deck, relevant for setup and Card Browser).
        *   `drawPile`: Array of `Card` `id`s.
        *   `discardPile`: Array of `Card` `id`s.
    *   **`BoardSlot`**: Represents a location on the board where a card can be placed.
        *   `id`: String (unique identifier, e.g., `storyGrid-0-0`, `player1Hand-2`, `mainDeckDraw`).
        *   `type`: String (e.g., 'hand', 'storyGrid', 'character', 'mutable', 'deck', 'discard').
        *   `playerId`: Number | null (if associated with a specific player, like a hand slot).
        *   `cardId`: String | null (ID of the `Card` currently in this slot, or null if empty).
    *   **`GameState`**: Central state object.
        *   `allCards`: Object `{ [cardId]: Card }` (lookup for all card definitions).
        *   `players`: Array of `Player` objects.
        *   `mainDeck`: `Deck` object.
        *   `altDeck`: `Deck` object.
        *   `boardSlots`: Object `{ [slotId]: BoardSlot }` (all card locations).
        *   `gamePhase`: String ('setup', 'playing', 'ended').
        *   `currentPlayerId`: Number | null.
        *   `currentStorytellerId`: Number | null.
        *   `lastD20Result`: Number | null.
        *   `timerState`: Object `{ isRunning: boolean, currentTime: number, setTime: number }`.
        *   `notesContent`: String.
        *   `cardInspectorContent`: `Card` `id` | null.

## 7. Development Phases/Iterations

*   **Phase 1: Project Setup & Static Card Rendering (Complete)**
    *   Goal: Basic HTML structure, CSS, state object, card loading, and rendering a single card type.
    *   Tasks:
        *   Create initial directory structure (`css`, `js`, `assets`).
        *   Create basic `index.html` with main container elements.
        *   Create `main.css` with basic layout styles (e.g., body, containers).
        *   Implement initial `state.js` with placeholder `GameState` structure.
        *   Implement `main.js` to initialize the app.
        *   Write a script/utility to scan `assets/jpg/cards/` and generate the `allCards` data structure within `GameState`.
        *   Implement a basic `Card.js` component that renders a card image given a `Card` object (`id`, `type`, `imageUrl`).
        *   Render a few sample cards statically on the page to verify CSS and JS setup.
*   **Phase 2: Core Board Layout & State Initialization (Complete)**
    *   Goal: Define all board slots in `GameState`, create basic UI structure using Flexbox/Grid, render components for each slot type.
    *   Tasks:
        *   Define all `BoardSlot` objects (hands, grid, decks, etc.) with unique IDs in `GameState`.
        *   Implement CSS (Flexbox/Grid) in `board.css` to visually lay out all the defined slots in `index.html`.
        *   Enhance UI components (`GameBoard.js`, `PlayerHand.js`, etc.) to dynamically create HTML elements for each `BoardSlot` based on `GameState`.
        *   Ensure the UI reflects the initial empty state of all `BoardSlot`s.
*   **Phase 3: Deck Initialization & Shuffling (Complete)**
    *   Goal: Populate and shuffle main/alt decks based on card types in `GameState`.
    *   Tasks:
        *   Implement logic in `initializeState` (`js/state.js`) to populate `drawPile` arrays based on card types.
        *   Implement Fisher-Yates shuffle (`shuffleArray` function) in `js/state.js` and applied it to both `drawPile` arrays within `initializeState`.
        *   Verified deck initialization and shuffling via console logs.
*   **Phase 4: Initial Hand Drawing & Rendering (Complete)**
    *   Goal: Implement card drawing logic, deal initial hands, render cards in player hand UI areas.
    *   Tasks:
        *   Define initial hand size (`initialHandSize = 5`) in `GameState` (`js/state.js`).
        *   Implement `drawCard` function in `js/state.js` to move cards from global draw piles to player hand arrays.
        *   Call `drawCard` in `js/main.js` after `initializeState` to deal initial hands.
        *   Update `js/components/PlayerHand.js` to render cards from `GameState.players[playerId].hand`.
        *   Verification assumed complete.
*   **Phase 5: UI Layout Refactoring (Planned)**
    *   Goal: Refactor the UI layout from the current flexible Flexbox/Grid system to use **absolute positioning** based on precise coordinates provided in `UIcoordinates.json`.
    *   Strategy:
        *   Set `#game-container` to `position: relative` and assign a fixed size based on JSON coordinate extents.
        *   Apply `position: absolute`, `top`, `left`, `width`, `height` to elements (hands, characters, grid, decks, inspector, menu, logo, timer, d20) using adapted values from `UIcoordinates.json`.
        *   Adapt JSON data for 2-player setup and 3x3 grid.
        *   Adjust Inspector aspect ratio.
        *   Add placeholder HTML elements for items currently missing but present in JSON.
        *   Refactor component rendering JS if needed to accommodate the new positioning approach.
*   **Phase 6: Card Drag-and-Drop Interaction (Planned - Was Phase 4)**
    *   Goal: Enable users to move cards between valid slots using drag-and-drop.
    *   Tasks:
        *   Implement `DragDropService.js` using native HTML Drag and Drop API.
        *   Make card elements draggable.
        *   Make `BoardSlot` elements valid drop targets.
        *   Implement logic within the service (or called by it) to:
            *   Identify the dragged `cardId` and the source/target `slotId`s.
            *   Validate if the move is allowed based on slot types (e.g., hand -> grid, grid -> discard).
            *   Update the `cardId` properties of the source and target `BoardSlot` objects in `GameState` on a valid drop.
        *   Ensure the UI re-renders correctly after a drag-and-drop state update.
*   **Phase 7: Player State & Comprehensive Setup Screen (Planned - Was Phase 5)**
    *   Goal: Implement the full game setup process and player-specific state management.
    *   Tasks:
        *   Create a dedicated Setup UI (can hide/show vs. the main board).
        *   Implement input fields for player names (1-4 players). Update `GameState`.
        *   **Character Card Selection:**
            *   Display available Character cards (potentially using a browser/inspector component).
            *   Allow host to drag/assign a Character card to each player's `characterCardSlotId`. Update `GameState`.
        *   **Advantage Token Setup:**
            *   Display selected Character cards side-by-side.
            *   Implement UI for player tokens (display, increment/decrement buttons) next to each character card.
            *   Pre-populate tokens based on card prerequisites (requires adding prerequisite data to `Card` structure or a lookup).
            *   Allow host to adjust remaining tokens, enforcing the sum-of-7 rule per player.
            *   Update `Player` objects in `GameState` with token values.
        *   **Deck Configuration:**
            *   Implement UI for assigning card types (excluding Character/Objective) to the Alt Deck. Update `altDeck.assignedCardTypes` in `GameState`.
        *   **Objective Card Selection & Placement:**
            *   Display available Objective cards.
            *   Allow host to select one Objective card.
            *   Allow host to place the selected Objective card onto a specific slot in the Story Grid's final row (e.g., `storyGrid-9-X`). Update `GameState`.
        *   **Origin Card Selection & Placement:**
            *   Allow host to select an Origin card (from deck, hand, or browser).
            *   Allow host to place the Origin card onto the first Story Grid slot (`storyGrid-0-0`). Update `GameState`.
        *   **Setup Finalization:** Button/action to transition `gamePhase` from 'setup' to 'playing', hiding the setup UI and revealing the main board with the configured state.
        *   Display player names on the main board UI.
*   **Phase 8: Core Gameplay Mechanics (Planned - Was Phase 6)**
    *   Goal: Implement the d20 roller and turn timer.
    *   Tasks:
        *   Create d20 UI element (button).
        *   Implement logic to generate a random number (1-20) on click and update `lastD20Result` in `GameState`.
        *   Display the result visually.
        *   Create Turn Timer UI (display, set fields, start/pause, reset buttons).
        *   Implement timer logic (countdown, start/pause functionality).
        *   Update `timerState` in `GameState`.
*   **Phase 9: Utility Features (Planned - Was Phase 7)**
    *   Goal: Implement the Card Browser, Notes Tray, Rules Tray, and Card Inspector.
    *   Tasks:
        *   Implement Card Browser UI (modal or dedicated area).
        *   Display all cards from `allCards`.
        *   Allow dragging cards from the browser to valid board slots (if the card is not already assigned to a slot/deck).
        *   Implement Notes Tray UI (sliding panel, textarea).
        *   Implement `PersistenceService.js` to save/load `notesContent` from `localStorage`.
        *   Implement Rules Tray UI (sliding panel, display static image).
        *   Implement Card Inspector UI (modal or dedicated area).
        *   Add click listeners to cards to update `cardInspectorContent` in `GameState` and show the inspector with the correct card image.
*   **Phase 10: Game Flow & Refinement (Planned - Was Phase 8)**
    *   Goal: Implement overall game state transitions and polish interactions.
    *   Tasks:
        *   Implement logic to manage `gamePhase` ('setup', 'playing', 'ended') transitions.
        *   Implement `TurnManager.js` (basic logic for tracking `currentPlayerId`, `currentStorytellerId` - detailed turn rules can be manual initially).
        *   Add any missing UI controls (e.g., Reset Game button).
        *   Refine CSS for better visual appeal and responsiveness (if needed).
        *   Review and improve drag-and-drop validation rules.
*   **Phase 11: Testing & Optimization (Planned - Was Phase 9)**
    *   Goal: Ensure stability and performance.
    *   Tasks:
        *   Conduct thorough manual testing across different scenarios and interactions.
        *   (Optional) Introduce a testing framework (e.g., Vitest) for critical logic (DeckManager, State updates).
        *   Optimize CSS and JS if any performance bottlenecks are observed.
        *   Final code cleanup and documentation updates (`change_log.md`, `function_registry.md`, etc.).

## 8. Risk Assessment & Mitigation

*   **Risk:** **Drag-and-Drop Complexity:** Implementing robust, intuitive drag-and-drop for various zones with validation can be tricky across browsers.
    *   **Mitigation:** Start with native HTML Drag and Drop API. If significant issues arise, evaluate lightweight, focused libraries. Implement clear visual feedback during drag/drop operations. Thoroughly test validation logic.
*   **Risk:** **State Management Brittleness:** As features grow, the custom state object and notification system could become complex and prone to bugs (e.g., UI not updating correctly).
    *   **Mitigation:** Keep the state structure normalized. Ensure state updates are centralized. Implement a clear notification/subscription pattern from the start. If complexity becomes unmanageable, reconsider a minimal state management library (e.g., Valtio, Nano Stores). Regularly refactor `state.js`.
*   **Risk:** **CSS Layout Challenges:** Positioning all the game elements accurately according to the desired layout using CSS Grid/Flexbox might require significant tweaking.
    *   **Mitigation:** Build the layout iteratively. Use browser developer tools heavily for inspection and debugging. Consult UI coordinate references provided by the user when needed. Keep CSS modular (component-based).
*   **Risk:** **Scope Creep:** Adding unplanned features or excessive visual polish during core development.
    *   **Mitigation:** Stick closely to the phased plan. Defer non-essential features (animations, sound) to "Future Considerations". Regularly review progress against the plan. Follow the `CONTINUE.md` process.
*   **Risk:** **Asset Handling:** Efficiently loading and managing potentially numerous card images.
    *   **Mitigation:** Ensure card data generation script runs once at build/setup. Use appropriate image dimensions. Consider lazy loading images if initial load time becomes an issue (likely not necessary initially).

## 9. Future Considerations

*   *(Post-Initial Build)*
*   **Visual Polish:** Add smooth animations/transitions for card movements, dealing, etc.
*   **Sound Effects:** Add subtle audio feedback for key actions (drawing, dropping, dice roll).
*   **Enhanced Responsiveness:** Improve layout adaptation for different screen sizes (if needed beyond initial desktop focus).
*   **Rule Enforcement:** Implement more automated game rule checks (e.g., validating skilled action proposals, tracking storyteller turns more strictly).
*   **Multiplayer:** Explore options for networked play (would require significant architectural changes, likely involving a backend).
*   **Saving/Loading Game State:** Allow users to save the entire game state locally and resume later.
*   **AI Opponent:** (Highly complex) Implement basic AI for solo play. 