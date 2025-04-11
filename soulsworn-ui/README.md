# SoulSworn UI

This is a simplified UI-only version of the SoulSworn game, containing just the positioning and layout components without any game logic.

## Overview

This project extracts only the UI layout and positioning from the original SoulSworn game. It renders all the UI containers and placeholders in their exact positions based on the UIcoordinates.json file, which contains precise coordinates for all game elements.

## Structure

- `index.html` - Simple container structure with placeholder elements
- `css/main.css` - Basic styling for the game container
- `css/board.css` - Position-specific styling for UI elements
- `js/main.js` - Application entry point
- `js/uiRenderer.js` - UI rendering logic that positions elements based on coordinates
- `data/UIcoordinates.json` - Exact positioning data for all UI elements

## Running the Project

You can run this project by serving it through a local web server. For example:

```
cd soulsworn-ui
python -m http.server 8000
```

Then open your browser and navigate to `http://localhost:8000`.

## Development

This UI-only version can be used as the foundation for building a new implementation of the game without the complexity of the original codebase. The positioning data in UIcoordinates.json can be used to ensure that all elements are placed exactly where they should be. 