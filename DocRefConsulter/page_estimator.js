// Page estimator for DocRefConsulter extention


chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var activeTabUrl = tabs[0].url;
			console.log("in_query");
			var targetRating = getRating(activeTabUrl);
			console.log("find_3");
			console.log(targetRating);
			//

			//console.log(targetRating)
	});


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


	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var activeTabUrl = tabs[0].url;
			console.log("in_query");
			//var targetRating = getRating(activeTabUrl);

			let pUrl = activeTabUrl.replace("https://", "").replace("http://", "").replace("www.", "");

			const rows = ratingLibrary.split('\n').slice(1);
			let targetRating = -1;
	


			rows.forEach(elt => {
				const row = elt.split(',');
				let a = row[0].replace("https://", "").replace("http://", "").replace("www.", "");
				a = a.split('/')[0];
				let b = pUrl.replace("https://", "").replace("http://", "").replace("www.", "");
				b = b.split('/')[0];
				console.log(a + "vs." + b);
				if(a == b) {
					console.log("find");
					targetRating = row[1];
					//console.log(targetRating);
				};
		
			});
			console.log("find_2");
			console.log(targetRating);

			console.log("find_3");
			console.log(targetRating);
			document.getElementById("rating").textContent = targetRating
			document.write("<h4>" + targetRating + "</h4>");

			//

			//console.log(targetRating)
	});

	console.log(page_url);
	

	
	return targetRating;

};

//getCurrentUrl()