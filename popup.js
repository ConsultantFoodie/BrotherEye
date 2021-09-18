import * as listeners from "./listeners.js";

document.addEventListener("DOMContentLoaded", async () => {
	chrome.storage.local.get(["isChecked"], (result) => {
		toggleButton.checked = result.isChecked;
	});
});

window.onload = (event) => {
	alert("Loaded.");
}

toggleButton.addEventListener("change", async (event) => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	if(toggleButton.checked){
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			function: setCheck,
		});
		chrome.storage.local.set({"isChecked": true}, function(){});
	}
	else{
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			function: setUncheck,
		});
		chrome.storage.local.set({"isChecked": false}, function(){});
	}
  
});

export function setCheck() {
	var button = document.createElement("button");
	button.addEventListener("click", listeners.viewPanel);
	var mainDiv = document.createElement("div");
	mainDiv.id = "MyDiv";
	button.setAttribute("class", "VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc");
	button.setAttribute("jscontroller", "soHxf");
	button.setAttribute("jsaction","click:cOuCgd; mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue; touchstart:p6p2H; touchmove:FwuNnf; touchend:yfqBxc; touchcancel:JMtRjd; focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef");
	button.setAttribute("aria-label","My Button");
	button.setAttribute("data-panel-id","7");
	button.innerHTML = "BE";
	mainDiv.appendChild(button);
	var panelButtons = document.getElementsByClassName("SGP0hd kunNie")[0];
	panelButtons.insertBefore(mainDiv, panelButtons.childNodes[0]);
}

function setUncheck() {
	var mainDiv = document.getElementById("MyDiv");
	mainDiv.remove();
}