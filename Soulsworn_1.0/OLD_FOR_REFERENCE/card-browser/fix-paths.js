/**
 * Card Browser Path Fix Utility
 * 
 * This script will help diagnose image path issues in the card browser
 */

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const outputDiv = document.getElementById('output');
    if (!outputDiv) return;
    
    // Load card data
    const response = await fetch('../../assets/card-data.json');
    const cardData = await response.json();
    
    // Extract a sample card from each type for path analysis
    const cardTypes = ['location', 'NPC', 'item', 'spell', 'monster'];
    const sampleCards = {};
    
    outputDiv.innerHTML += '<h2>Analyzing Card Data</h2>';
    
    let pathProblems = false;
    
    // Check each card type for sample cards and path issues
    cardTypes.forEach(type => {
      const cards = cardData.deck[type] || [];
      if (cards.length > 0) {
        sampleCards[type] = cards[0];
        
        // Output the real file path vs. the path in card data
        outputDiv.innerHTML += `<h3>${type.charAt(0).toUpperCase() + type.slice(1)} Cards</h3>`;
        
        // Check if cards use the right path pattern
        const expectedPattern = `assets/JPG/cards/deck/${type}/${type}s_`;
        const actualPath = cards[0].imageUrl;
        
        if (!actualPath.includes(expectedPattern)) {
          pathProblems = true;
          outputDiv.innerHTML += `
            <div class="error">
              <p>Path mismatch detected!</p>
              <p>Expected pattern: <code>${expectedPattern}[cardname].jpg</code></p>
              <p>Actual path: <code>${actualPath}</code></p>
            </div>
          `;
          
          // Suggest corrected path for the first card
          const cardName = cards[0].name.toLowerCase().replace(/\s+/g, '');
          const correctedPath = `assets/JPG/cards/deck/${type}/${type}s_${cardName}.jpg`;
          outputDiv.innerHTML += `
            <div class="suggestion">
              <p>Suggested corrected path: <code>${correctedPath}</code></p>
            </div>
          `;
        } else {
          outputDiv.innerHTML += `
            <div class="success">
              <p>Path format looks correct: <code>${actualPath}</code></p>
            </div>
          `;
        }
        
        outputDiv.innerHTML += `<p>Found ${cards.length} ${type} cards</p>`;
      } else {
        outputDiv.innerHTML += `
          <div class="warning">
            <h3>${type.charAt(0).toUpperCase() + type.slice(1)} Cards</h3>
            <p>No cards found for this type!</p>
          </div>
        `;
      }
    });
    
    if (pathProblems) {
      outputDiv.innerHTML += `
        <div class="path-fix">
          <h2>Path Resolution</h2>
          <p>The paths in your card-data.json don't match the actual file structure. Let's create a path mapping function:</p>
          <pre>
function fixCardPath(card) {
  if (!card || !card.imageUrl) return card;
  
  // Check if path already correct
  if (card.imageUrl.includes(\`/cards/deck/\${card.type}/\${card.type}s_\`)) {
    return card;
  }
  
  // Extract card name for path construction
  const namePart = card.name.toLowerCase().replace(/\\s+/g, '');
  
  // Construct correct path
  card.imageUrl = \`assets/JPG/cards/deck/\${card.type}/\${card.type}s_\${namePart}.jpg\`;
  
  return card;
}
          </pre>
        </div>
      `;
    }
    
    // Add button to apply fix
    const fixButton = document.createElement('button');
    fixButton.textContent = 'Fix Image Paths and Open Browser';
    fixButton.className = 'fix-button';
    fixButton.addEventListener('click', () => {
      window.location.href = 'fix-browser.html';
    });
    
    outputDiv.appendChild(fixButton);
    
  } catch (error) {
    const outputDiv = document.getElementById('output');
    if (outputDiv) {
      outputDiv.innerHTML = `<div class="error">Error analyzing card data: ${error.message}</div>`;
    }
    console.error('Error:', error);
  }
}); 