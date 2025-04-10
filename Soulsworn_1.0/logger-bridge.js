// logger-bridge.js - Integration between the SoulSworn game and the logging system
//
// This file provides automatic monitoring and logging for key game functions,
// while maintaining backward compatibility and ease of integration.

// Track the original functions we're monitoring
const originalFunctions = {};

// List of key game functions to monitor
const keyFunctions = [
  // Core game functions
  { name: 'startGame', category: 'Game' },
  { name: 'initializeGameBoard', category: 'Game' },
  { name: 'startEndGameSequence', category: 'Game' },
  { name: 'startSuperlativeVoting', category: 'Game' },
  { name: 'recordVote', category: 'Game' },
  
  // Deck functions
  { name: 'drawCards', category: 'Deck' },
  { name: 'dealInitialCards', category: 'Deck' },
  { name: 'shuffleDiscardIntoDeck', category: 'Deck' },
  { name: 'initializeDecks', category: 'Deck' },
  { name: 'initializeDeckTypeSelection', category: 'Deck' },
  
  // Rendering functions
  { name: 'renderMainDeck', category: 'UI' },
  { name: 'renderMainDiscard', category: 'UI' },
  { name: 'renderAltDeck', category: 'UI' },
  { name: 'renderAltDiscard', category: 'UI' },
  { name: 'renderHands', category: 'UI' },
  { name: 'updateInspector', category: 'UI' },
  { name: 'showNotification', category: 'UI' },
  
  // Interaction functions
  { name: 'handleDragStart', category: 'Interaction' },
  { name: 'handleDragEnd', category: 'Interaction' },
  { name: 'handleDragOver', category: 'Interaction' },
  { name: 'handleDrop', category: 'Interaction' },
  { name: 'preloadImage', category: 'Resource' }
];

// Initialize the logging system integration
window.addEventListener('DOMContentLoaded', () => {
  // Check if Logger is available
  if (!window.Logger) {
    console.error('Logging system not found. Make sure logger.js is loaded before logger-bridge.js');
    return;
  }
  
  // Log initialization
  Logger.info('Initializing logging system integration');
  
  // Wait for all scripts to load
  setTimeout(() => {
    // Monitor all key functions
    monitorKeyFunctions();
    
    // Set up error handling
    setupGlobalErrorHandling();
    
    // Set up performance monitoring
    setupPerformanceMonitoring();
    
    Logger.info('Logging system integration complete', {
      monitoredFunctions: Object.keys(originalFunctions)
    });
  }, 500); // Short delay to ensure all scripts are loaded
});

// Monitor key game functions
function monitorKeyFunctions() {
  keyFunctions.forEach(funcInfo => {
    const { name, category } = funcInfo;
    
    if (typeof window[name] === 'function') {
      // Store original function
      originalFunctions[name] = window[name];
      
      // Replace with monitored version
      window[name] = Logger.monitorFunction(
        originalFunctions[name],
        `${category}.${name}`,
        { profile: category }
      );
      
      Logger.debug(`Monitoring function: ${category}.${name}`);
    } else {
      Logger.warn(`Function not found for monitoring: ${name}`);
    }
  });
}

// Set up global error handling
function setupGlobalErrorHandling() {
  // Capture unhandled errors
  window.addEventListener('error', (event) => {
    Logger.error('Unhandled error', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error
    });
  });
  
  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    Logger.error('Unhandled promise rejection', {
      reason: event.reason
    });
  });
  
  Logger.debug('Global error handlers registered');
}

// Set up performance monitoring
function setupPerformanceMonitoring() {
  // Monitor network performance
  if (window.performance && window.performance.getEntriesByType) {
    // Function to analyze performance data
    function checkPerformance() {
      try {
        // Get resource timing entries
        const resources = performance.getEntriesByType('resource');
        
        // Log slow resource loads
        resources.forEach(resource => {
          const loadTime = resource.responseEnd - resource.startTime;
          
          if (loadTime > 1000) { // Threshold of 1 second
            Logger.warn('Slow resource load', {
              name: resource.name,
              loadTime: `${loadTime.toFixed(2)}ms`,
              type: resource.initiatorType
            });
          }
        });
        
        // Get navigation timing
        const navEntry = performance.getEntriesByType('navigation')[0];
        if (navEntry) {
          const pageLoadTime = navEntry.loadEventEnd - navEntry.startTime;
          Logger.info('Page load performance', {
            totalLoadTime: `${pageLoadTime.toFixed(2)}ms`,
            domInteractive: `${(navEntry.domInteractive - navEntry.startTime).toFixed(2)}ms`,
            domComplete: `${(navEntry.domComplete - navEntry.startTime).toFixed(2)}ms`
          });
        }
      } catch (e) {
        Logger.error('Error checking performance', e);
      }
    }
    
    // Check performance after page load
    window.addEventListener('load', () => {
      setTimeout(checkPerformance, 1000);
    });
  }
}

// Monitor GameState object if it exists
function monitorGameState() {
  if (window.GameState) {
    // Don't re-monitor if already done
    if (window.GameState._isMonitored) return;
    
    // Monitor key methods in the GameState object
    if (GameState.Decks) {
      Logger.monitorMethods(GameState.Decks, [], 'GameState.Decks');
    }
    
    if (GameState.Players) {
      Logger.monitorMethods(GameState.Players, [], 'GameState.Players');
    }
    
    if (GameState.Game) {
      Logger.monitorMethods(GameState.Game, [], 'GameState.Game');
    }
    
    // Track state changes if possible
    if (typeof GameState.subscribe === 'function') {
      GameState.subscribe((path, oldValue, newValue) => {
        // Only log significant state changes
        const significantPaths = [
          'gameStarted',
          'playerCount',
          'gameState.scenesCount',
          'gameState.selectedObjective'
        ];
        
        if (significantPaths.includes(path)) {
          Logger.info(`State change: ${path}`, { 
            from: oldValue, 
            to: newValue 
          });
        }
      });
      
      Logger.debug('Subscribed to GameState changes');
    }
    
    // Mark as monitored to prevent double monitoring
    window.GameState._isMonitored = true;
    Logger.info('GameState monitoring enabled');
  }
}

// Log UI interactions
function setupUIInteractionLogging() {
  // Critical UI elements to monitor for clicks
  const criticalElements = [
    { selector: '#startGameBtn', name: 'Start Game Button' },
    { selector: '#mainDeckDraw', name: 'Main Deck Draw Button' },
    { selector: '#altDeckDraw', name: 'Alt Deck Draw Button' },
    { selector: '#mainDeckShuffle', name: 'Main Deck Shuffle Button' },
    { selector: '#altDeckShuffle', name: 'Alt Deck Shuffle Button' },
    { selector: '#d20Area', name: 'D20 Dice Area' },
    { selector: '#objectivesButton', name: 'Objectives Button' },
    { selector: '#completeGameBtn', name: 'Complete Game Button' }
  ];
  
  // Add click event listeners
  criticalElements.forEach(element => {
    const el = document.querySelector(element.selector);
    if (el) {
      el.addEventListener('click', () => {
        Logger.info(`UI Interaction: ${element.name} clicked`);
      });
    }
  });
  
  Logger.debug('UI interaction monitoring enabled');
}

// Create a custom logging console for third-party scripts
window.gameConsole = {
  log: (message, ...args) => Logger.info(message, args.length ? args : null),
  info: (message, ...args) => Logger.info(message, args.length ? args : null),
  warn: (message, ...args) => Logger.warn(message, args.length ? args : null),
  error: (message, ...args) => Logger.error(message, args.length ? args : null),
  debug: (message, ...args) => Logger.debug(message, args.length ? args : null)
};

// Setup everything once DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
  // Check again if Logger is available since the earlier check might be too early
  if (!window.Logger) return;
  
  // Setup monitoring after a short delay to ensure everything is loaded
  setTimeout(() => {
    // Monitor GameState
    monitorGameState();
    
    // Setup UI interaction logging
    setupUIInteractionLogging();
    
    // Create a button in the UI to view logs
    addLogViewerButton();
  }, 1000); // Delay to ensure everything is loaded
});

// Add a log viewer button to the UI
function addLogViewerButton() {
  // Only add if we're on the game board
  const gameBoard = document.getElementById('gameBoard');
  if (!gameBoard) return;
  
  // Create a container for log buttons
  const logButtonContainer = document.createElement('div');
  logButtonContainer.id = 'logButtonContainer';
  logButtonContainer.style.position = 'absolute';
  logButtonContainer.style.top = '200px';
  logButtonContainer.style.left = '1504px';
  logButtonContainer.style.zIndex = '1000';
  logButtonContainer.style.display = 'flex';
  logButtonContainer.style.flexDirection = 'column';
  logButtonContainer.style.gap = '10px';
  
  // Log viewer button
  const logButton = document.createElement('div');
  logButton.id = 'logViewerBtn';
  logButton.className = 'icon';
  logButton.textContent = 'Logs';
  logButton.style.padding = '8px 12px';
  logButton.style.backgroundColor = '#3498db';
  logButton.style.color = 'white';
  logButton.style.borderRadius = '4px';
  logButton.style.cursor = 'pointer';
  
  logButton.addEventListener('click', () => {
    // Open a new window with the logger-test.html page
    window.open('logger-test.html', '_blank', 'width=1200,height=800');
  });
  
  // Log analysis dashboard button
  const analyzeButton = document.createElement('div');
  analyzeButton.id = 'logAnalysisBtn';
  analyzeButton.className = 'icon';
  analyzeButton.textContent = 'Analysis';
  analyzeButton.style.padding = '8px 12px';
  analyzeButton.style.backgroundColor = '#27ae60';
  analyzeButton.style.color = 'white';
  analyzeButton.style.borderRadius = '4px';
  analyzeButton.style.cursor = 'pointer';
  
  analyzeButton.addEventListener('click', () => {
    // Open a new window with the logger-test.html page and automatically switch to analysis tab
    const win = window.open('logger-test.html', '_blank', 'width=1200,height=800');
    
    // Once the window is loaded, switch to the analysis tab
    win.addEventListener('load', () => {
      const analysisTab = win.document.querySelector('.tab[data-tab="log-analysis"]');
      if (analysisTab) {
        analysisTab.click();
      }
    });
  });
  
  // Add buttons to container
  logButtonContainer.appendChild(logButton);
  logButtonContainer.appendChild(analyzeButton);
  
  // Add container to game board
  gameBoard.appendChild(logButtonContainer);
}

// Log game-specific events
window.logGameEvent = function(eventName, data = null) {
  Logger.info(`Game Event: ${eventName}`, data);
};

// Expose a monitoring API for manual monitoring
window.LogMonitor = {
  // Monitor a specific function
  monitorFunction: function(obj, functionName, category = 'Custom') {
    if (!obj || typeof obj[functionName] !== 'function') {
      Logger.warn(`Cannot monitor function: ${functionName} - not found`);
      return false;
    }
    
    if (obj[functionName]._isMonitored) {
      Logger.warn(`Function ${functionName} is already monitored`);
      return false;
    }
    
    const originalFn = obj[functionName];
    obj[functionName] = Logger.monitorFunction(
      originalFn,
      `${category}.${functionName}`,
      { profile: category }
    );
    
    // Mark as monitored
    obj[functionName]._isMonitored = true;
    
    Logger.debug(`Manually monitoring function: ${category}.${functionName}`);
    return true;
  },
  
  // Monitor methods of an object
  monitorMethods: function(obj, methodNames = [], category = 'Custom') {
    if (!obj) {
      Logger.warn(`Cannot monitor methods - object not provided`);
      return false;
    }
    
    Logger.monitorMethods(
      obj, 
      methodNames, 
      category, 
      { profile: category }
    );
    
    Logger.debug(`Manually monitoring methods of ${category}`, { methods: methodNames });
    return true;
  },
  
  // Performance monitoring utilities
  getPerformanceProfiles: function() {
    return Logger.getPerformanceProfiles();
  },
  
  resetPerformanceStats: function(profileName = null) {
    Logger.resetPerformanceStats(profileName);
    return true;
  },
  
  measurePerformance: function(fn, label, category = null) {
    return Logger.measure(fn, label, category);
  },
  
  // Memory monitoring
  getMemoryUsage: function() {
    return Logger.getMemoryUsage();
  },
  
  // Log analysis and aggregation
  getLogSummary: function() {
    return Logger.getLogSummary();
  },
  
  searchLogs: function(options) {
    return Logger.searchLogs(options);
  },
  
  generateChartData: function(field) {
    return Logger.generateChartData(field);
  },
  
  analyzeUsagePatterns: function() {
    return Logger.analyzeUsagePatterns();
  },
  
  // Export logs
  exportLogs: function() {
    return Logger.exportLogs();
  },
  
  downloadLogs: function() {
    Logger.downloadLogs();
  },
  
  // Open analysis dashboard
  openAnalysisDashboard: function() {
    const win = window.open('logger-test.html', '_blank', 'width=1200,height=800');
    
    // Once the window is loaded, switch to the analysis tab
    win.addEventListener('load', () => {
      const analysisTab = win.document.querySelector('.tab[data-tab="log-analysis"]');
      if (analysisTab) {
        analysisTab.click();
      }
    });
  }
}; 