// Import styles - the CSS is added via the HTML, no need for import
// import './card-browser.css';

/**
 * Open the card browser modal
 * @param {Object} options - Configuration options
 * @param {Object} options.cardData - Card data from the game
 * @param {Array<string>} options.excludedTypes - Card types to exclude
 * @param {Function} options.onSelect - Callback for card selection
 * @returns {Promise} Resolves with the selected card or null if canceled
 */
export function openCardBrowser(options) {
  return new Promise((resolve) => {
    // Extract options
    const { cardData, excludedTypes = [], onSelect = () => {} } = options;
    
    console.log('Card Browser: Opening with card data', cardData);
    
    // Initial state
    let selectedCard = null;
    let currentCardType = 'location'; // Start with locations
    
    // Create modal elements
    const overlay = document.createElement('div');
    overlay.className = 'card-browser-overlay';
    
    // Build browser HTML
    overlay.innerHTML = `
      <div class="card-browser-container">
        <div class="card-browser-header">
          <h2 class="card-browser-title">Select Starting Card</h2>
          
          <div class="card-browser-navigate">
            <button class="nav-prev-btn">&lt;</button>
            <span class="current-type-label">Locations</span>
            <button class="nav-next-btn">&gt;</button>
          </div>
          
          <button class="card-browser-close">&times;</button>
        </div>
        
        <div class="card-browser-content"></div>
        
        <div class="card-browser-footer">
          <button class="cancel-btn">Cancel</button>
          <div>
            <button class="draw-hand-btn">Draw from Hand</button>
            <button class="select-card-btn" disabled>Select Card</button>
          </div>
        </div>
      </div>
    `;
    
    // Add to document
    document.body.appendChild(overlay);
    
    // Get DOM elements
    const contentContainer = overlay.querySelector('.card-browser-content');
    const closeBtn = overlay.querySelector('.card-browser-close');
    const cancelBtn = overlay.querySelector('.cancel-btn');
    const selectCardBtn = overlay.querySelector('.select-card-btn');
    const drawHandBtn = overlay.querySelector('.draw-hand-btn');
    const navPrevBtn = overlay.querySelector('.nav-prev-btn');
    const navNextBtn = overlay.querySelector('.nav-next-btn');
    const currentTypeLabel = overlay.querySelector('.current-type-label');
    
    // Card type sequence for carousel navigation
    const cardTypes = ['location', 'NPC', 'item', 'spell', 'monster'];
    let currentTypeIndex = cardTypes.indexOf(currentCardType);
    
    // Helper: Update content based on current card type
    function updateContent() {
      // Clear content
      contentContainer.innerHTML = '';
      currentTypeLabel.textContent = capitalize(cardTypes[currentTypeIndex]) + 's';
      
      // Get cards of current type
      const currentType = cardTypes[currentTypeIndex];
      console.log(`Card Browser: Loading cards of type "${currentType}"`);
      
      // Debugging card data structure
      console.log(`Card Browser: Card data structure:`, cardData);
      console.log(`Card Browser: Deck:`, cardData.deck);
      console.log(`Card Browser: Deck ${currentType}:`, cardData.deck[currentType]);
      
      // Get cards safely by adding extra checks
      const cards = cardData && cardData.deck && cardData.deck[currentType] ? cardData.deck[currentType] : [];
      console.log(`Card Browser: Found ${cards.length} cards of type "${currentType}"`, cards);
      
      // Debugging - add a placeholder if no cards found
      if (cards.length === 0) {
        const placeholder = document.createElement('div');
        placeholder.style.gridColumn = '1 / -1';
        placeholder.style.textAlign = 'center';
        placeholder.style.padding = '2rem';
        placeholder.style.color = '#e74c3c';
        placeholder.innerHTML = `
          <h3>No ${currentType} cards found</h3>
          <p>Check your card-data.json structure for this card type.</p>
        `;
        contentContainer.appendChild(placeholder);
        return;
      }
      
      // Create card elements
      cards.forEach((card, index) => {
        try {
          // Log card info for debugging
          console.log(`Card Browser: Creating card ${index + 1}/${cards.length}: ${card.name}`);
          
          // Create card container with proper aspect ratio for cards
          const cardContainer = document.createElement('div');
          cardContainer.className = 'card-item';
          cardContainer.setAttribute('title', card.name); // Add tooltip with card name
          cardContainer.dataset.cardId = card.id; // Store card ID for easy selection
          
          // Create and add the card image
          const cardImage = document.createElement('img');
          cardImage.src = `../../${card.imageUrl}`;
          cardImage.alt = card.name;
          cardImage.className = 'card-image';
          
          // Add error handling for image loading
          cardImage.onerror = () => {
            console.error(`Card Browser: Failed to load image for ${card.name} (${card.imageUrl})`);
            // Add fallback content
            cardImage.style.display = 'none';
            const errorMsg = document.createElement('div');
            errorMsg.style.width = '100%';
            errorMsg.style.height = '100%';
            errorMsg.style.display = 'flex';
            errorMsg.style.alignItems = 'center';
            errorMsg.style.justifyContent = 'center';
            errorMsg.style.background = '#2a2a2a';
            errorMsg.style.color = '#e74c3c';
            errorMsg.style.padding = '1rem';
            errorMsg.style.textAlign = 'center';
            errorMsg.textContent = `Could not load image: ${card.name}`;
            cardContainer.appendChild(errorMsg);
          };
          
          cardContainer.appendChild(cardImage);
          
          // Handle selection
          cardContainer.addEventListener('click', () => {
            // Remove selection from all cards
            document.querySelectorAll('.card-item').forEach(el => {
              el.classList.remove('selected');
              el.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
              el.style.margin = '0';
            });
            
            // Select this card
            cardContainer.classList.add('selected');
            cardContainer.style.boxShadow = '0 0 0 3px #e74c3c, 0 8px 16px rgba(0,0,0,0.5)';
            selectedCard = card;
            selectCardBtn.disabled = false;
          });
          
          contentContainer.appendChild(cardContainer);
        } catch (error) {
          console.error(`Card Browser: Error creating card ${index}:`, error);
        }
      });
      
      // Center align the grid items if they don't fill the entire row
      const gridItems = contentContainer.querySelectorAll('.card-item');
      const gridItemsArray = Array.from(gridItems);
      if (gridItemsArray.length > 0) {
        // Get computed styles
        const container = contentContainer.getBoundingClientRect();
        const firstItem = gridItemsArray[0].getBoundingClientRect();
        const cardsPerRow = Math.floor(container.width / firstItem.width);
        
        // If items don't fill the last row, center them
        if (gridItemsArray.length % cardsPerRow !== 0) {
          const lastRowStart = Math.floor(gridItemsArray.length / cardsPerRow) * cardsPerRow;
          const lastRowCount = gridItemsArray.length - lastRowStart;
          
          if (lastRowCount < cardsPerRow) {
            // Apply a class to the container for centering the last row
            contentContainer.style.justifyItems = 'center';
          }
        }
      }
    }
    
    // Helper: Capitalize first letter
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // Navigation: Previous card type
    navPrevBtn.addEventListener('click', () => {
      currentTypeIndex = (currentTypeIndex - 1 + cardTypes.length) % cardTypes.length;
      console.log(`Card Browser: Navigating to previous type: ${cardTypes[currentTypeIndex]}`);
      updateContent();
      selectCardBtn.disabled = true;
      selectedCard = null;
    });
    
    // Navigation: Next card type
    navNextBtn.addEventListener('click', () => {
      currentTypeIndex = (currentTypeIndex + 1) % cardTypes.length;
      console.log(`Card Browser: Navigating to next type: ${cardTypes[currentTypeIndex]}`);
      updateContent();
      selectCardBtn.disabled = true;
      selectedCard = null;
    });
    
    // Close browser (Cancel)
    function closeBrowser() {
      document.body.removeChild(overlay);
      resolve(null);
    }
    
    // Event: Close button
    closeBtn.addEventListener('click', closeBrowser);
    cancelBtn.addEventListener('click', closeBrowser);
    
    // Event: Select card
    selectCardBtn.addEventListener('click', () => {
      if (selectedCard) {
        document.body.removeChild(overlay);
        onSelect(selectedCard);
        resolve(selectedCard);
      }
    });
    
    // Event: Draw from hand
    drawHandBtn.addEventListener('click', () => {
      document.body.removeChild(overlay);
      resolve({ action: 'drawFromHand' });
    });
    
    // Initialize with location cards
    updateContent();
    
    // Close overlay when clicking outside the dialog
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeBrowser();
      }
    });
    
    // Close overlay when pressing escape
    setTimeout(() => {
      function handleEscKey(e) {
        if (e.key === 'Escape') {
          closeBrowser();
          document.removeEventListener('keydown', handleEscKey);
        }
      }
      
      document.addEventListener('keydown', handleEscKey);
    }, 100);
  });
} 