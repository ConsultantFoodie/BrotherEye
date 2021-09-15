import * as listeners from "./listeners.js";

document.addEventListener("DOMContentLoaded", async () => {
	chrome.storage.local.get(["isChecked"], (result) => {
		toggleButton.checked = result.isChecked;
	});
});

toggleButton.addEventListener("change", async (event) => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	if(toggleButton.checked){
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			function: listeners.setCheck,
		});
		chrome.storage.local.set({"isChecked": true}, function(){});
	}
	else{
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			function: listeners.setUncheck,
		});
		chrome.storage.local.set({"isChecked": false}, function(){});
	}
  
});