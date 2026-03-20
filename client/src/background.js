// Create the right-click menu when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "clarimind-explain",
    title: "Explain '%s' with ClariMind",
    contexts: ["selection"]
  });
});

// Listen for the user clicking the menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "clarimind-explain") {
    // Send the text to our React app inside the current tab
    chrome.tabs.sendMessage(tab.id, {
      action: "SHOW_EXPLANATION",
      text: info.selectionText
    }).catch(err => console.log("Make sure to refresh the webpage first!", err));
  }
});