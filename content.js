chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openLinks") {
      chrome.storage.local.get("isActive", (data) => {
        if (!data.isActive) {
          alert("The extension is turned off.");
          return;
        }
  
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) {
          alert("Please highlight some text that contains links!");
          return;
        }
  
        const range = selection.getRangeAt(0).cloneContents();
        const div = document.createElement("div");
        div.appendChild(range);
  
        const links = div.querySelectorAll("a[href]");
  
        if (links.length === 0) {
          alert("No full links found in the highlighted area.");
          return;
        }
  
        links.forEach(link => {
          chrome.runtime.sendMessage({ action: "openTab", url: link.href });
        });
      });
    }
  });
  