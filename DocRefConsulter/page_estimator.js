// Page estimator for DocRefConsulter extention
function getCurrentUrl() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var activeTab = tabs[0];
			var activeTabUrl = activeTab.url;

			var targetRating = getRating(activeTabUrl);

			console.log(targetRating)
	});
};

async function getRatingLibrary() {
	const response = await fetch('rating_library.csv');
	const ratingLibrary = await response.text();
	//console.log(ratingLibrary);
	return ratingLibrary;
};

//console.log(getRatingLibrary());


async function getRating(page_url) {
	console.log("page_estimator_script");

	//var ratingLibrary = getRatingLibrary();
	//console.log(ratingLibrary);
	const response = await fetch('rating_library.csv');
	const ratingLibrary = await response.text();

	console.log(page_url);
	

	let pUrl = page_url.replace("https://", "").replace("http://", "").replace("www.", "");

	const rows = ratingLibrary.split('\n').slice(1);
	console.log(rows);

	let targetRating = -1;
	rows.forEach(elt => {
		const row = elt.split(',');
		if(row[0].replace("https://", "").replace("http://", "").replace("www.", "") == page_url.replace("https://", "").replace("http://", "").replace("www.", "")) {
			targetRating = row[1];
		};
		
	});
	//console.log(targetRating);
	return targetRating;

};

getCurrentUrl()