// Initialize toggle state
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ isActive: true }); // Default state: active
    chrome.contextMenus.create({
      id: "open-links-from-highlight",
      title: "Open links from highlight",
      contexts: ["selection"]
    });
  });
  
  // Listen for messages to open a tab
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openTab") {
      chrome.tabs.create({ url: message.url });
    }
  });
  
  // Right-click menu click handler
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "open-links-from-highlight") {
      chrome.storage.local.get("isActive", (data) => {
        if (data.isActive) {
          chrome.tabs.sendMessage(tab.id, { action: "openLinks" });
        } else {
          alert("The extension is turned off.");
        }
      });
    }
  });
  