chrome.runtime.onStartup.addListener(() => {
    chrome.storage.sync.get('popupButton', function (data) {
        document.getElementById("removeTagsButton").innerHTML = data.popupButton
    })
})


document.addEventListener("DOMContentLoaded", function () {
    // Get the button state from Chrome storage
    chrome.storage.sync.get('canShow', function (data) {
        // Update the button text based on the canShow value
        document.getElementById("removeTagsButton").innerHTML = (data.canShow || data.canShow === undefined) ? "Activate" : "Disactivate";
    });

    var toggleButton = document.getElementById("removeTagsButton");
    toggleButton.addEventListener("click", (e) => {
        chrome.storage.sync.get("canShow", function (data) {
            var show = !data.canShow; // Toggle the value
            toggleButton.innerHTML = show ? "Activate" : "Disactivate";
            // Store the updated value in Chrome storage
            chrome.storage.sync.set({ canShow: show }, function () {
                // Send message to content script to show/hide tags after the value is updated
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, { message: show ? "show" : "hide" });
                });
            });
        });
    });
});