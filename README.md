# SoulSworn Webapp

A card-based rapid role-playing game web application.

## Description

SoulSworn is an interactive web-based card game that combines elements of traditional role-playing games with modern web technologies. The application features a dynamic game board, card management system, and real-time gameplay mechanics.

## Features

- Interactive game board
- Card management system
- Turn timer functionality
- Rules and notes trays
- Responsive design
- Local game state management

## Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/SoulSworn.git
cd SoulSworn
```

2. For local development with Python server:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

### GitHub Pages

The application is also available on GitHub Pages at:
`https://yourusername.github.io/SoulSworn/`

## Project Structure

```
SoulSworn/
├── assets/           # Game assets (images, etc.)
├── index.html        # Main HTML file
├── style.css         # Stylesheet
├── script.js         # Main JavaScript file
├── turn-timer-4-2.js # Turn timer functionality
└── instructions.json # Game instructions data
```

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Python (for local development server)

## License

This project is licensed under the terms included in the LICENSE file.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request 