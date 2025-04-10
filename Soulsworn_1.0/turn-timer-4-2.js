/**
 * Turn Timer v4.2
 * A countdown timer for the game board
 */

// Timer state variables
let timerInterval = null;
let timerRunning = false;
let timerCompleted = false;
let timerDuration = 120; // Default 2 minutes in seconds
let timerRemaining = 120;

// Audio elements
let timerCompleteSound = null;
let timerTickSound = null;

// DOM elements (to be initialized when the page loads)
let timerDisplay = null;
let toggleBtn = null;
let resetBtn = null;
let minutesInput = null;
let secondsInput = null;
let timerContainer = null;

// Function to initialize the timer UI references
function initializeTimerUI() {
  // Get references to the timer UI elements
  timerDisplay = document.getElementById('timerDisplay');
  toggleBtn = document.getElementById('timerToggleBtn');
  resetBtn = document.getElementById('timerResetBtn');
  timerContainer = document.getElementById('turnTimer');
  
  // Set fixed timer duration - always use the default
  timerDuration = 120; // 2 minutes
  timerRemaining = timerDuration;
  updateTimerDisplay();
  
  // Create audio elements
  createAudioElements();
  
  // Add event listeners
  toggleBtn.addEventListener('click', function() {
    if (timerRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  });
  
  resetBtn.addEventListener('click', resetTimer);
  
  console.log('Timer UI initialized with fixed 2-minute duration');
}

// Function to start the timer
function startTimer() {
  if (timerRunning) return;
  
  // If timer is already completed, reset it first
  if (timerCompleted) {
    resetTimer();
  }
  
  timerRunning = true;
  timerCompleted = false;
  
  // Update UI
  toggleBtn.textContent = 'Pause';
  timerContainer.className = 'running';
  
  // Calculate the end time
  const startTime = Date.now();
  const endTime = startTime + timerRemaining * 1000;
  
  // Start the interval
  timerInterval = setInterval(function() {
    // Calculate remaining time
    const currentTime = Date.now();
    const remainingMs = endTime - currentTime;
    
    if (remainingMs <= 0) {
      // Timer has completed
      timerRemaining = 0;
      timerCompleted = true;
      timerRunning = false;
      clearInterval(timerInterval);
      
      // Update UI
      toggleBtn.textContent = 'Time Up!';
      toggleBtn.className = 'times-up';
      timerContainer.className = 'completed';
      
      updateTimerDisplay();
      
      // Play sound
      playTimerCompleteSound();
      
      // Show notification that time is up
      showTimerNotification('Time is up!');
    } else {
      // Update the remaining time
      timerRemaining = Math.ceil(remainingMs / 1000);
      updateTimerDisplay();
      
      // Play tick sound for last 10 seconds
      if (timerRemaining <= 10 && timerRemaining > 0) {
        playTickSound();
        
        // Add warning pulse effect
        timerDisplay.classList.add('pulse-warning');
      } else if (timerRemaining > 10) {
        // Remove warning pulse if not in last 10 seconds
        timerDisplay.classList.remove('pulse-warning');
      }
    }
  }, 100); // Update more frequently for smoother countdown
}

// Function to pause the timer
function pauseTimer() {
  if (!timerRunning) return;
  
  timerRunning = false;
  clearInterval(timerInterval);
  
  // Update UI
  toggleBtn.textContent = 'Start';
  toggleBtn.className = '';
  timerContainer.className = 'paused';
}

// Function to reset the timer
function resetTimer() {
  // Stop the timer if it's running
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
  }
  
  // Reset state
  timerCompleted = false;
  timerRemaining = timerDuration;
  
  // Update UI
  toggleBtn.textContent = 'Start';
  toggleBtn.className = '';
  timerContainer.className = '';
  
  // Remove any warning effects
  timerDisplay.classList.remove('pulse-warning');
  
  updateTimerDisplay();
}

// Function to update the timer display
function updateTimerDisplay() {
  if (timerDisplay) {
    timerDisplay.textContent = formatTime(timerRemaining);
  }
}

// Function to format time as MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Function to update the timer duration
function updateTimerDuration() {
  // In the simplified version, we just use the default duration
  if (!timerRunning) {
    timerRemaining = timerDuration;
    updateTimerDisplay();
    toggleBtn.textContent = 'Start';
    toggleBtn.className = '';
  }
}

// Function to show a timer notification
function showTimerNotification(message) {
  // Check if another notification already exists and remove it
  const existingNotification = document.getElementById('timer-notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.id = 'timer-notification';
  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.left = '50%';
  notification.style.transform = 'translateX(-50%)';
  notification.style.backgroundColor = 'rgba(221, 44, 0, 0.9)';
  notification.style.color = 'white';
  notification.style.padding = '10px 20px';
  notification.style.borderRadius = '5px';
  notification.style.fontWeight = 'bold';
  notification.style.zIndex = '1000';
  notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
  notification.style.animation = 'fadeInOut 5s forwards';
  notification.textContent = message;
  
  // Add animation style
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInOut {
      0% { opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  
  // Add to document
  document.body.appendChild(notification);
  
  // Remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

// Function to create audio elements for timer sounds
function createAudioElements() {
  // Create timer complete sound
  timerCompleteSound = document.createElement('audio');
  timerCompleteSound.id = 'timer-complete-sound';
  timerCompleteSound.preload = 'auto';
  
  // Add a beep sound source (using a data URI for simplicity)
  const completeSource = document.createElement('source');
  completeSource.type = 'audio/mpeg';
  // This is a simple beep sound encoded as a data URI
  completeSource.src = 'data:audio/mpeg;base64,SUQzAwAAAAABb1RJVDIAAAAKAAAAQmVlcCBTb3VuZFRYWFgAAAAKAAAAQmVlcCBTb3VuZFRDT04AAAAFAAAAQmVlcHNUQUxCAAAACgAAAEJlZXAgU291bmRUWUVSAAAAAAAAAFRDT00AAAAPAAAAQmVlcCBzb3VuZCBiZWVwQ09NTQAAAAAAAP/7kGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEluZm8AAAAPAAAABAAADpgAODg4ODg4ODg4ODhVVVVVVVVVVVVVVXJycnJycnJycnJyj4+Pj4+Pj4+Pj4+srKysrKysrKysrMnJycnJycnJycnJ5ubm5ubm5ubm5ub///////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAABCAAAAAAAAA6YikywGAAAAAAAAAAAAAAAAAP/7wGQAAAdXRU0FMRAAhVJGomGIABSZFT407wACk6SmZp3gAAA0JUkiSMNJ0ggQGGLF4IRnkEA8EBAQEDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDT/+5JkQAP3olJPS4xFgJ6KWgloIgASxVlRtKGmAjQnZzaDNkq1NAQEAAIAOAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA//swZF8DxJJMyksDRgCbilnJoCjAEY1NPCyMeAKKKOUFgTcAA0NBAQEBAQEDx4HgeCAgICAgICAgICAg4+D4Pg+D4PnAQEBAQEBAwMDA0/wwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwP/7EmRgA8RuS8krAm4AsUm5SWGN0BHNLyDrRJICtCVjkYGLAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwDP/AABwYGFJJFCIJGUQYE3HJJmPIZKHRBQUU4RP/+xJkcgPEd0rGSwNOgKwpSSNhjdAR8Skc7Am4Ap0kYp2BPwEW4lhYtwiSpkKUg4JKmRYkaNRQ0UVEgQQNBoJECwMTR6q6UvY8Cw8FD5oUb/9QIIELTiiQiIJibmRkbiEIQhCEIQhf/gQhD/KfkRn/+xJkcIPErEnFGsEmgK0JOEdgT8ATWSkc7Am4AqgkopGCN0CiESMwIQhCEIQhCEIQhCEJ+EJ+RP8oQhCEIQhCEIQhCEI6RvlJG+Uk7/ySN8pQhCEIQhCEIQhCEIQhCEIQhCEUQhCQAAhELx1YtO7/+xBkeQvEdknFIwMegK0JGElhTcAU+SMS7Cu6AqgkIl2BdkBqKsXPAIvU9YgQOHjzQd2OwUjwWXP/EChB5PYjIiMQOHEBkU+LizMdzb+h0aDrUOyf/K4k2hADFpkCKFyxSQgVgJcwAAAAAA=';
  timerCompleteSound.appendChild(completeSource);
  
  // Create tick sound (for last 10 seconds)
  timerTickSound = document.createElement('audio');
  timerTickSound.id = 'timer-tick-sound';
  timerTickSound.preload = 'auto';
  
  // Add a tick sound source
  const tickSource = document.createElement('source');
  tickSource.type = 'audio/mpeg';
  // This is a simple tick sound encoded as a data URI
  tickSource.src = 'data:audio/mpeg;base64,SUQzAwAAAAABb1RJVDIAAAAJAAAAVGljayBTb3VuZFRYWFgAAAAJAAAAVGljayBTb3VuZFRDT04AAAAFAAAAVGlja3NUQUxCAAAACQAAAFRpY2sgU291bmRUWUVSAAAAAAAAAFRDT00AAAAOAAAAVGljayBzb3VuZCB0aWNrQ09NTQAAAAAAAP/7kGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEluZm8AAAAPAAAABAAADpgAODg4ODg4ODg4ODhVVVVVVVVVVVVVVXJycnJycnJycnJyj4+Pj4+Pj4+Pj4+srKysrKysrKysrMnJycnJycnJycnJ5ubm5ubm5ubm5ub///////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAABCAAAAAAAAA6YikywGAAAAAAAAAAAAAAAAAP/7wGQAAAdXRU0FMRAAhVJGomGIABSZFT407wACk6SmZp3gAAA0JUkiSMNJ0ggQGGLF4IRnkEA8EBAQEDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDT/+5JkQAP3K0xKS8x5gI9KSaV5jDgREUklrAxiglwpp7XxjcnAwBAAAAADg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg//swZF+D1FtLSAsMYYCX6YlBYMw4ED0vICyMZgJ1JiQFhjDg4ODg4ODgcDgcDgcDgcDgQCAQHAQCAQHHwfB8HwQEBAQEBAQYGGww+DBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYP/7EmRiA9RTSkgLDGFAq0lpAXmMMBHBMSAsMYYCUyXkBYMwwAGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGP/wAPDiQSOdoYgRlVHgbDQ4Sc5AQMUQQsZj0RlqRS/V7/+xJkcAPEfEtHCwxhgJ6JeOFhjDAR+S8gLJhmAnslI4WDDMFyIm7Vu/DUo5ZRKKqbMEHEogxINJwEDBpSlmrZ44SLmDgJFTR01XVdjh40aNGjR1dNn//8cOHDhw4cOHDhw4cOHDhw4cOHDv/8OH/+xJkdQPEfkrHCwYZgKcJSOFgwzAU4S0cLBhmAnslI4WDDMFbHDhw4cOHDhw4cOHDhw4cOHDhw4cOHDhw4cOHDhw4cOHDhw4cOHDhw4cOHCMQCEYgP/84cOExAPxAP/+ICYmIB+IB+cIB1l2AxR1j1Ipcf/7EmR5A8SUS0cLBhmApQlI4WDDMBRJLRwsGGYChCUjhYMMwvDN5SRkEMXmAoYBAUdyYNpbv1Yk+QaIpD4CW4qhgKNDp4yaY/C1Rw0ggFx3/I4CgeT04r54IibnQzjV6F///1zyB5KfIf/GaLCQMxBP/+xBkfQPEhkpHCwYZgKXJSOFgwzATwTEgLBjGAnglo4WGMMDYBKtU2YLrCuKyiDnfgBXGaXf+Py1Xec6Vmu8//iq75dz3Dzu+cX5///PP/+QEoECBWHDCigQIGClIl8DiFgIADAAAAAA=';
  timerTickSound.appendChild(tickSource);
  
  // Add to document
  document.body.appendChild(timerCompleteSound);
  document.body.appendChild(timerTickSound);
}

// Function to play the timer complete sound
function playTimerCompleteSound() {
  if (timerCompleteSound) {
    // Reset the sound to the beginning
    timerCompleteSound.currentTime = 0;
    
    // Play the sound
    timerCompleteSound.play().catch(error => {
      // Handle play() promise rejection (often due to user not interacting with page first)
      console.log('Could not play timer complete sound:', error);
    });
  }
}

// Function to play the tick sound
function playTickSound() {
  if (timerTickSound) {
    // Reset the sound to the beginning
    timerTickSound.currentTime = 0;
    
    // Play the sound
    timerTickSound.play().catch(error => {
      // Ignore errors for tick sound
    });
  }
}

// Initialize timer when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Timer script loaded - initializing timer');
  
  // Add the CSS for the pulse warning effect
  addTimerStyles();
  
  // Initialize the timer UI
  initializeTimerUI();
  
  // Set initial display
  updateTimerDisplay();
  
  // Add keyboard shortcuts
  addKeyboardShortcuts();
});

// Add keyboard shortcuts for timer control
function addKeyboardShortcuts() {
  document.addEventListener('keydown', function(e) {
    // Check if the game board is visible
    const gameBoard = document.getElementById('gameBoard');
    if (!gameBoard || gameBoard.style.display === 'none') {
      return; // Don't handle keys if game board isn't visible
    }
    
    // Don't trigger shortcuts if user is typing in an input or contenteditable
    if (e.target.tagName === 'INPUT' || e.target.getAttribute('contenteditable') === 'true') {
      return;
    }
    
    // Space bar - Toggle timer (start/pause)
    if (e.code === 'Space' && e.target.tagName !== 'BUTTON') {
      e.preventDefault(); // Prevent space from scrolling the page
      if (timerRunning) {
        pauseTimer();
      } else {
        startTimer();
      }
    }
    
    // R key - Reset timer
    if (e.code === 'KeyR' && !e.ctrlKey && !e.metaKey) {
      resetTimer();
    }
  });
}

// Add timer-specific styles
function addTimerStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* Timer warning pulse effect */
    @keyframes pulseWarning {
      0% { color: #ffffff; }
      50% { color: #ff5555; }
      100% { color: #ffffff; }
    }
    
    .pulse-warning {
      animation: pulseWarning 0.5s infinite;
    }
    
    /* Timer state transitions */
    #timerDisplay {
      transition: color 0.3s ease;
    }
    
    #timerToggleBtn, #timerResetBtn {
      transition: background-color 0.3s ease;
    }
    
    /* Improve focus styles for accessibility */
    #timerToggleBtn:focus, #timerResetBtn:focus {
      outline: 2px solid #4a90e2;
    }
  `;
  document.head.appendChild(style);
} 