document.addEventListener("DOMContentLoaded", () => {
  // Find and store the checkbox status
  const toggle = document.getElementById("toggleFont");
  chrome.storage.sync.get("fontActive", (data) => {
    toggle.checked = data.fontActive || false;
    updateBadge(toggle.checked);
  });

  // Add eventListner to the change event to toggle the extension
  toggle.addEventListener("change", () => {
    chrome.storage.sync.set({ fontActive: toggle.checked });
    updateBadge(toggle.checked);
  });

  // Update badge in the browser action
  function updateBadge(isActive) {
    chrome.action.setBadgeText({ text: isActive ? " ✓" : "" });
    chrome.action.setBadgeTextColor({ color: "#FFFFFF" });
    chrome.action.setBadgeBackgroundColor({ color: "#4CAF50" });
  }

  // Function to fetch the translations from the /_locales/messages.json file
  function getTranslations() {
    var popupSwitch = chrome.i18n.getMessage("popupSwitch");
    document.querySelector(".title").textContent = popupSwitch;

    var popupFooter = chrome.i18n.getMessage("popupFooter");
    document.querySelector(".footer-text").textContent = popupFooter;
  }

  // Call the translations at the end of the file
  getTranslations();
});
