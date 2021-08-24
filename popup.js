// When the button is clicked, inject setPageBackgroundColor into current page
toggleButton.addEventListener("change", async (event) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if(toggleButton.checked){
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: setCheck,
	  });
  }
  else{
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: setUncheck,
	  });
  }
  
});

// The body of this function will be executed as a content script inside the
// current page
function setCheck() {
	var button = document.createElement("Button");
	button.id = "MyButton";
	button.innerHTML = "Title";
	button.style = "top:0;right:0;position:absolute;z-index: 9999"
	document.body.appendChild(button);
}

function setUncheck() {
	var button = document.getElementById("MyButton");
	button.remove();
}