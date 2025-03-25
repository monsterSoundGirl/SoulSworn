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
        this.element = document.getElementById(elementId);
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
            if (typeof this.callbacks.onTick === 'function') {
                this.callbacks.onTick(this.remaining);
            }
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            if (typeof this.callbacks.onStart === 'function') {
                this.callbacks.onStart();
            }
            
            this.timerId = setInterval(() => {
                if (this.remaining > 0) {
                    this.remaining--;
                    this.updateDisplay();
                } else {
                    this.pause();
                    if (typeof this.callbacks.onComplete === 'function') {
                        this.callbacks.onComplete();
                    }
                }
            }, 1000);
        }
    }

    pause() {
        if (this.isRunning) {
            clearInterval(this.timerId);
            this.isRunning = false;
            if (typeof this.callbacks.onPause === 'function') {
                this.callbacks.onPause();
            }
        }
    }

    reset() {
        this.pause();
        this.remaining = this.duration;
        this.updateDisplay();
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