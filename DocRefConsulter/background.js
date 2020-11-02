// Background script for DocRefConsulter

chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var activeTab = tabs[0];
			var activeTabId = activeTab.id;
			console.log(activeTabId)
			alert(activeTabId)
		})
}