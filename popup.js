// Get elements
const toggleSwitch = document.getElementById('toggleSwitch');
const refreshButton = document.getElementById('refreshTabs');

// Set the toggle state on load
chrome.storage.local.get("isActive", (data) => {
  toggleSwitch.checked = data.isActive;
});

// Toggle on/off
toggleSwitch.addEventListener('change', () => {
  const isActive = toggleSwitch.checked;
  chrome.storage.local.set({ isActive: isActive });
});

// Refresh all tabs when button clicked
refreshButton.addEventListener('click', () => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (!tab.url.startsWith("chrome://") && !tab.url.startsWith("chrome-extension://")) {
        chrome.tabs.reload(tab.id);
      }
    });
  });
});
