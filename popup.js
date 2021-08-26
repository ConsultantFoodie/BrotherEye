// When the button is clicked, inject setPageBackgroundColor into current page
toggleButton.addEventListener("change", async (event) => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	if(toggleButton.checked){
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			function: setCheck,
		});
		chrome.storage.sync.set({"isChecked": true}, function(){});
	}
	else{
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			function: setUncheck,
		});
		chrome.storage.sync.set({"isChecked": false}, function(){});
	}
  
});

// The body of this function will be executed as a content script inside the
// current page
function setCheck() {
	var button = document.createElement("button");
	var mainDiv = document.createElement("div");
	var mainSpan = document.createElement("span");
	mainDiv.setAttribute("class","r6xAKc");
	mainDiv.id = "MyDiv";
	mainSpan.setAttribute("data-is-tooltip-wrapper", "true");
	button.setAttribute("class", "VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc");
	button.setAttribute("jscontroller", "soHxf");
	button.setAttribute("jsaction","click:cOuCgd; mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue; touchstart:p6p2H; touchmove:FwuNnf; touchend:yfqBxc; touchcancel:JMtRjd; focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef");
	button.setAttribute("jsname","A5il2e");
	button.setAttribute("data-disable-idom","true");
	button.setAttribute("aria-label","My Button");
	button.setAttribute("data-tooltip-enabled","true");
	button.setAttribute("data-tooltip-id","tt-c6");
	button.setAttribute("data-panel-id","2");
	button.setAttribute("aria-pressed","false");
	button.setAttribute("data-id","o3HEdc");
	button.innerHTML = "BTP";
	mainSpan.appendChild(button);
	mainDiv.appendChild(mainSpan);
	var panelButtons = document.querySelector("#ow3 > div.T4LgNb > div > div:nth-child(9) > div.crqnQb > div.rG0ybd.xPh1xb.P9KVBf > div.TqwH9c > div.SZfyod > div > div")
	panelButtons.insertBefore(mainDiv, panelButtons.childNodes[0]);
}

function setUncheck() {
	var mainDiv = document.getElementById("MyDiv");
	mainDiv.remove();
}