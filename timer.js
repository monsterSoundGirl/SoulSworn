/**
 * TurnTimer - A reusable timer class for turn-based games
 */
class TurnTimer {
    constructor(elementId, duration = 300) { // default 5 minutes (300 seconds)
        this.elementId = elementId;
        this.duration = duration;
        this.remaining = duration;
        this.isRunning = false;
        this.timerId = null;
        this.element = document.querySelector(`#${elementId} .timer-display`);
        this.toggleBtn = document.getElementById('toggleBtn');
        this.callbacks = {
            onTick: null,
            onComplete: null,
            onStart: null,
            onPause: null,
            onReset: null
        };
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    updateDisplay() {
        if (this.element) {
            this.element.textContent = this.formatTime(this.remaining);
            
            // Update display color based on state
            if (this.remaining === 0) {
                this.element.style.color = '#e55'; // Red at 0:00
                this.toggleBtn.textContent = 'TIME IS UP';
                this.toggleBtn.className = 'times-up';
            } else {
                this.element.style.color = '#ffffff'; // White otherwise
            }

            if (typeof this.callbacks.onTick === 'function') {
                this.callbacks.onTick(this.remaining);
            }
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.toggleBtn.textContent = 'Pause';
            this.toggleBtn.className = 'running';
            
            if (typeof this.callbacks.onStart === 'function') {
                this.callbacks.onStart();
            }
            
            this.timerId = setInterval(() => {
                if (this.remaining > 0) {
                    this.remaining--;
                    this.updateDisplay();
                    
                    if (this.remaining === 0) {
                        this.pause();
                        if (typeof this.callbacks.onComplete === 'function') {
                            this.callbacks.onComplete();
                        }
                    }
                }
            }, 1000);
        }
    }

    pause() {
        if (this.isRunning) {
            clearInterval(this.timerId);
            this.isRunning = false;
            if (this.remaining > 0) {
                this.toggleBtn.textContent = 'Start';
                this.toggleBtn.className = '';
            }
            if (typeof this.callbacks.onPause === 'function') {
                this.callbacks.onPause();
            }
        }
    }

    reset() {
        this.pause();
        this.remaining = this.duration;
        this.updateDisplay();
        this.toggleBtn.textContent = 'Start';
        this.toggleBtn.className = '';
        if (typeof this.callbacks.onReset === 'function') {
            this.callbacks.onReset();
        }
    }

    setDuration(seconds) {
        this.duration = seconds;
        this.reset();
    }

    getTimeRemaining() {
        return this.remaining;
    }

    isActive() {
        return this.isRunning;
    }

    // Event handlers
    on(event, callback) {
        if (this.callbacks.hasOwnProperty(event)) {
            this.callbacks[event] = callback;
        }
    }
}

// Make the class available globally
window.TurnTimer = TurnTimer; 