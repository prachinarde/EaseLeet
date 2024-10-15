var show;
var popupButtonText = "Hide Tags"
chrome.storage.sync.set({ popupButton: popupButtonText, canShow: show }, function () {
    console.log("Button initiated to", popupButtonText)
})
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.tabs.sendMessage(tabId, { message: "yes-main", info: tab.url });

});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check if the message is to refresh the tab
    if (message.action === "refreshTab") {
        // Get the current active tab
        chrome.storage.sync.set({ canShow: message.changeCanShow }, async function () {
            show = message.changeCanShow
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                // Refresh the tab
                setTimeout(() => { chrome.tabs.reload(tabs[0].id); }, 1000)

            });
        });

        return true;
    }
});