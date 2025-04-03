// Import the card browser module (to be created)
import { openCardBrowser } from '../card-browser.js';

// DOM Elements
const openBrowserBtn = document.getElementById('openBrowser');
const selectedCardDisplay = document.getElementById('selectedCard');

// Test data - we'll use the actual card data from the main game
let cardData = null;

// Load card data
async function loadCardData() {
    try {
        const response = await fetch('../../assets/card-data.json');
        cardData = await response.json();
        console.log('Card data loaded successfully');
    } catch (error) {
        console.error('Error loading card data:', error);
        selectedCardDisplay.textContent = 'Error loading card data';
    }
}

// Display selected card details
function displaySelectedCard(card) {
    if (!card) {
        selectedCardDisplay.innerHTML = '<p>No card selected</p>';
        return;
    }
    
    if (card.action === 'drawFromHand') {
        selectedCardDisplay.innerHTML = '<p>Action: Draw from Hand</p>';
        return;
    }
    
    // Create a nice card display
    selectedCardDisplay.innerHTML = `
        <div class="selected-card-container">
            <h3>Selected Card</h3>
            <div class="selected-card-details">
                <div class="selected-card-image">
                    <img src="../../${card.imageUrl}" alt="${card.name}">
                </div>
                <div class="selected-card-info">
                    <p><strong>Name:</strong> ${card.name}</p>
                    <p><strong>Type:</strong> ${card.type}</p>
                    <p><strong>ID:</strong> ${card.id}</p>
                </div>
            </div>
        </div>
    `;
}

// Event Listeners
openBrowserBtn.addEventListener('click', async () => {
    if (!cardData) {
        await loadCardData();
    }
    
    if (!cardData) {
        selectedCardDisplay.textContent = 'Failed to load card data';
        return;
    }
    
    try {
        const selectedCard = await openCardBrowser({
            cardData,
            excludedTypes: ['objective'],
            onSelect: (card) => {
                console.log('Card selected:', card);
            }
        });
        
        displaySelectedCard(selectedCard);
    } catch (error) {
        console.error('Error opening card browser:', error);
        selectedCardDisplay.textContent = 'Error opening browser';
    }
});

// Initialize
loadCardData(); 