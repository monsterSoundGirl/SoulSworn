import { BROWSER_CARDS } from '../hardcoded-cards.js';

/**
 * Open the card browser modal
 * @returns {Promise} Resolves with the selected card or null if canceled
 */
export function openCardBrowser() {
  return new Promise((resolve) => {
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
      
      // Get cards of current type from the hardcoded data
      const cards = BROWSER_CARDS[cardTypes[currentTypeIndex]] || [];
      console.log(`Loading ${cards.length} cards of type ${cardTypes[currentTypeIndex]}`);
      
      // Create card elements
      cards.forEach(card => {
        // Create card container
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-item';
        cardContainer.setAttribute('title', card.name);
        
        // Create and add the card image
        const cardImage = document.createElement('img');
        cardImage.src = `../../${card.imageUrl}`;
        cardImage.alt = card.name;
        cardImage.className = 'card-image';
        
        // Add error handling for image loading
        cardImage.onerror = () => {
          console.error(`Failed to load image for ${card.name}: ${card.imageUrl}`);
          cardImage.style.display = 'none';
          
          // Create a placeholder
          const errorDiv = document.createElement('div');
          errorDiv.style.width = '100%';
          errorDiv.style.height = '100%';
          errorDiv.style.display = 'flex';
          errorDiv.style.alignItems = 'center';
          errorDiv.style.justifyContent = 'center';
          errorDiv.style.background = '#2a2a2a';
          errorDiv.style.color = '#e74c3c';
          errorDiv.textContent = `Image Error: ${card.name}`;
          cardContainer.appendChild(errorDiv);
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
      });
      
      // Center align the grid items if they don't fill the entire row
      const gridItems = contentContainer.querySelectorAll('.card-item');
      if (gridItems.length > 0) {
        contentContainer.style.justifyItems = 'center';
      }
    }
    
    // Helper: Capitalize first letter
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // Navigation: Previous card type
    navPrevBtn.addEventListener('click', () => {
      currentTypeIndex = (currentTypeIndex - 1 + cardTypes.length) % cardTypes.length;
      console.log(`Navigating to: ${cardTypes[currentTypeIndex]}`);
      updateContent();
      selectCardBtn.disabled = true;
      selectedCard = null;
    });
    
    // Navigation: Next card type
    navNextBtn.addEventListener('click', () => {
      currentTypeIndex = (currentTypeIndex + 1) % cardTypes.length;
      console.log(`Navigating to: ${cardTypes[currentTypeIndex]}`);
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