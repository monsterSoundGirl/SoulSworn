// notificationService.js

const NotificationService = (() => {
    let notificationQueue = [];
    let isDisplaying = false;
    let notificationContainer = null;

    function createContainer() {
        if (document.getElementById('notification-container')) {
            notificationContainer = document.getElementById('notification-container');
            return;
        }
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.top = '20px';
        notificationContainer.style.right = '20px';
        notificationContainer.style.zIndex = '1000';
        notificationContainer.style.display = 'flex';
        notificationContainer.style.flexDirection = 'column';
        notificationContainer.style.gap = '10px';
        document.body.appendChild(notificationContainer);
    }

    function displayNotification(message, type = 'info', duration = 3000) {
        if (!notificationContainer) {
            createContainer();
        }

        isDisplaying = true;
        const notificationElement = document.createElement('div');
        notificationElement.className = `notification notification-${type}`; // Allows styling via CSS
        notificationElement.textContent = message;

        // Basic styling (can be moved to CSS)
        notificationElement.style.padding = '10px 20px';
        notificationElement.style.borderRadius = '5px';
        notificationElement.style.color = 'white';
        notificationElement.style.opacity = '0.9';
        notificationElement.style.transition = 'opacity 0.5s ease-in-out';
        notificationElement.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';

        switch(type) {
            case 'error':
                notificationElement.style.backgroundColor = '#dc3545'; // Red
                break;
            case 'warning':
                notificationElement.style.backgroundColor = '#ffc107'; // Yellow
                notificationElement.style.color = 'black';
                break;
            case 'success':
                 notificationElement.style.backgroundColor = '#28a745'; // Green
                 break;
            case 'info':
            default:
                notificationElement.style.backgroundColor = '#17a2b8'; // Blue
                break;
        }

        notificationContainer.appendChild(notificationElement);

        // Auto-dismiss
        setTimeout(() => {
            notificationElement.style.opacity = '0';
            // Remove element after fade out transition
             setTimeout(() => {
                notificationElement.remove();
                processQueue(); // Check for next notification after removal
            }, 500); // Match transition duration
        }, duration);
    }

    function processQueue() {
        if (notificationQueue.length > 0) {
            const nextNotification = notificationQueue.shift();
            displayNotification(nextNotification.message, nextNotification.type, nextNotification.duration);
        } else {
            isDisplaying = false;
        }
    }

    // Public method to add a notification
    function show(message, type = 'info', duration = 3000) {
        notificationQueue.push({ message, type, duration });
        if (!isDisplaying) {
            processQueue();
        }
    }

    // Initialize the container on load
    document.addEventListener('DOMContentLoaded', createContainer);

    return {
        show: show
    };
})();

// Example Usage (can be removed or kept for testing):
// document.addEventListener('DOMContentLoaded', () => {
//     NotificationService.show('Welcome! This is an info notification.');
//     NotificationService.show('Careful! This is a warning.', 'warning', 5000);
//     NotificationService.show('Oops! Something went wrong.', 'error', 7000);
//     setTimeout(() => NotificationService.show('Success!', 'success'), 1000);
// }); 