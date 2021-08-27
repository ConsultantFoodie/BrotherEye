import * as listeners from "./listeners.js";

document.addEventListener("DOMContentLoaded", async () => {
	chrome.storage.sync.get(["isChecked"], (result) => {
		toggleButton.checked = result.isChecked;
	});
});

// When the button is clicked, inject setPageBackgroundColor into current page
toggleButton.addEventListener("change", async (event) => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	if(toggleButton.checked){
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			function: listeners.setCheck,
		});
		chrome.storage.sync.set({"isChecked": true}, function(){});
	}
	else{
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			function: listeners.setUncheck,
		});
		chrome.storage.sync.set({"isChecked": false}, function(){});
	}
  
});