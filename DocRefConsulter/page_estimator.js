// Page estimator for DocRefConsulter extention
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var activeTabUrl = tabs[0].url;
			console.log("in_query");
			var targetRating = getRating(activeTabUrl);
			console.log("find_3");
			console.log(targetRating);
});

async function getRating(page_url) {
	console.log("page_estimator_script");

	const response = await fetch('rating_library.csv');
	const ratingLibrary = await response.text();


	let pUrl = page_url.replace("https://", "").replace("http://", "").replace("www.", "");
	pUrl = pUrl.split('/')[0];
	const rows = ratingLibrary.split('\n').slice(1);
	let targetRating = -1;
	rows.forEach(elt => {
		const row = elt.split(',');
		let a = row[0].replace("https://", "").replace("http://", "").replace("www.", "");
		a = a.split('/')[0];
		if(a == pUrl) {
			console.log("find");
			targetRating = row[1];
		};
	});
	document.getElementById("page_domen").innerHTML = pUrl;
	document.getElementById("inform_rating").innerHTML = targetRating;
	document.getElementById("support_rating").innerHTML = targetRating;
	console.log(page_url);
}