// Page estimator for DocRefConsulter extention
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var activeTabUrl = tabs[0].url;
			console.log("in_query");
			var targRat = getRating(activeTabUrl);
			console.log("find_3");
			console.log(targRat);
});

async function getRating(page_url) {
	console.log("page_estimator_script");

	const response = await fetch('rating_library.csv');
	const ratingLibrary = await response.text();


	let pUrl = page_url.replace("https://", "").replace("http://", "").replace("www.", "");
	pUrl = pUrl.split('/')[0];
	const rows = ratingLibrary.split('\n').slice(1);
	let targRat = [0,0,0,0];
	rows.forEach(elt => {
		const row = elt.split(',');
		let a = row[0].replace("https://", "").replace("http://", "").replace("www.", "");
		a = a.split('/')[0];
		if(a == pUrl) {
			console.log("find");
			targRat = [parseInt(row[1], 10), parseInt(row[2], 10),
				parseInt(row[3], 10), parseInt(row[4], 10)];
		};
	});
	console.log(targRat);
	targRat.push((targRat[0]+ targRat[1]+targRat[2]+targRat[3])/4);

	document.getElementById("page_domen").innerHTML = pUrl;
	if(targRat[4] > 0) {
		document.getElementById("curated_score_inf").innerHTML = targRat[0];
		document.getElementById("curated_score_supp").innerHTML = targRat[1];
		document.getElementById("community_score_inf").innerHTML = targRat[2];
		document.getElementById("community_score_supp").innerHTML = targRat[3];
		document.getElementById("tot_score").innerHTML = targRat[4];
	}
	
	
	console.log(page_url);
}