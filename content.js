/**
 * BlurChat - Privacy for WhatsApp Web
 * Content Script
 * 🔍 CrimeMaster DOM: Blur engine with MutationObserver resilience
 */

(function () {
    'use strict';

    const BC_PREFIX = '[BlurChat]';

    // State
    let currentState = {
        blurMessages: true,
        blurNames: false,
        blurPhotos: false,
        isPro: false,
        extensionEnabled: true
    };

    // Throttle helper
    function throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Apply blur classes to body based on state
    function applyBlurClasses() {
        const body = document.body;
        if (!body) return;

        // Remove all blur classes first
        body.classList.remove('bc-blur-messages', 'bc-blur-names', 'bc-blur-photos', 'bc-disabled');

        if (!currentState.extensionEnabled) {
            body.classList.add('bc-disabled');
            console.log(`${BC_PREFIX} Extension disabled`);
            return;
        }

        // Apply blur classes based on state
        if (currentState.blurMessages) {
            body.classList.add('bc-blur-messages');
        }

        // Pro features - only apply if user has pro license
        if (currentState.isPro) {
            if (currentState.blurNames) {
                body.classList.add('bc-blur-names');
            }
            if (currentState.blurPhotos) {
                body.classList.add('bc-blur-photos');
            }
        }

        console.log(`${BC_PREFIX} Applied classes:`, body.className);
    }

    // Load state from storage
    function loadState() {
        chrome.storage.local.get(['blurMessages', 'blurNames', 'blurPhotos', 'isPro', 'extensionEnabled'], (result) => {
            currentState = {
                blurMessages: result.blurMessages !== undefined ? result.blurMessages : true,
                blurNames: result.blurNames !== undefined ? result.blurNames : false,
                blurPhotos: result.blurPhotos !== undefined ? result.blurPhotos : false,
                isPro: result.isPro !== undefined ? result.isPro : false,
                extensionEnabled: result.extensionEnabled !== undefined ? result.extensionEnabled : true
            };
            console.log(`${BC_PREFIX} Loaded state:`, currentState);
            applyBlurClasses();
        });
    }

    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log(`${BC_PREFIX} Received message:`, message);

        if (message.type === 'BC_SET_STATE') {
            currentState = { ...currentState, ...message.payload };
            applyBlurClasses();
            sendResponse({ success: true });
        }

        if (message.type === 'BC_GET_STATE') {
            sendResponse({ success: true, state: currentState });
        }

        if (message.type === 'BC_PING') {
            sendResponse({ success: true, loaded: true });
        }

        return true;
    });

    // MutationObserver to handle dynamic WhatsApp DOM changes
    const observerCallback = throttle((mutations) => {
        // Re-apply blur classes if body class got modified by WhatsApp
        const body = document.body;
        if (!body) return;

        const hasOurClasses = body.classList.contains('bc-blur-messages') ||
            body.classList.contains('bc-blur-names') ||
            body.classList.contains('bc-blur-photos') ||
            body.classList.contains('bc-disabled');

        // If extension is enabled but our classes are missing, reapply
        if (currentState.extensionEnabled && !hasOurClasses) {
            applyBlurClasses();
        }
    }, 200);

    // Initialize observer
    function initObserver() {
        const observer = new MutationObserver(observerCallback);

        // Observe body for class changes and subtree for new elements
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class'],
            subtree: false
        });

        console.log(`${BC_PREFIX} MutationObserver initialized`);
    }

    // Wait for body to be available
    function init() {
        if (document.body) {
            loadState();
            initObserver();
            console.log(`${BC_PREFIX} Initialized successfully on WhatsApp Web`);
        } else {
            // Retry after a short delay
            setTimeout(init, 100);
        }
    }

    // Storage change listener for real-time updates
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'local') {
            let stateChanged = false;

            if (changes.blurMessages !== undefined) {
                currentState.blurMessages = changes.blurMessages.newValue;
                stateChanged = true;
            }
            if (changes.blurNames !== undefined) {
                currentState.blurNames = changes.blurNames.newValue;
                stateChanged = true;
            }
            if (changes.blurPhotos !== undefined) {
                currentState.blurPhotos = changes.blurPhotos.newValue;
                stateChanged = true;
            }
            if (changes.isPro !== undefined) {
                currentState.isPro = changes.isPro.newValue;
                stateChanged = true;
            }
            if (changes.extensionEnabled !== undefined) {
                currentState.extensionEnabled = changes.extensionEnabled.newValue;
                stateChanged = true;
            }

            if (stateChanged) {
                console.log(`${BC_PREFIX} Storage changed, reapplying:`, currentState);
                applyBlurClasses();
            }
        }
    });

    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
