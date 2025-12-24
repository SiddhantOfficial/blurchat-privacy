/**
 * BlurChat - Privacy for WhatsApp Web
 * Background Service Worker
 * Handles extension installation and message routing
 */

// Set default values on installation
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        // Set defaults: Messages blur ON (free tier), Pro features OFF
        chrome.storage.local.set({
            blurMessages: true,
            blurNames: false,
            blurPhotos: false,
            isPro: false,
            extensionEnabled: true
        });
        console.log('[BlurChat] Extension installed with default settings');
    }
});

// Listen for messages from popup to relay to content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'BC_RELAY_TO_TAB') {
        // Find WhatsApp Web tabs and send message
        chrome.tabs.query({ url: 'https://web.whatsapp.com/*' }, (tabs) => {
            tabs.forEach((tab) => {
                chrome.tabs.sendMessage(tab.id, message.payload).catch(() => {
                    // Tab might not have content script loaded yet
                });
            });
            sendResponse({ success: true, tabCount: tabs.length });
        });
        return true; // Keep channel open for async response
    }
});
