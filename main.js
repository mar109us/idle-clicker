const initStats = document.getElementById("init-stats");
const deleteAllCookies = document.getElementById("delete-all-cookies");
const displayAllCookies = document.getElementById("display-all-cookies");

initStats.addEventListener("click", doInitStats);
deleteAllCookies.addEventListener("click", clearAllCookies);

function setCookie(setCookieKey, setCookieValue, setCookieExpire) {
	document.cookie =
		setCookieKey + "=" + setCookieValue + "; Max-Age=2000000000; Path=/";
}

function getAllCookieNames() {
	return document.cookie
		.split(";")
		.map((cookie) => cookie.split("=")[0].trim());
}

function clearAllCookies() {
	const cookies = getAllCookieNames();
	cookies.forEach((cookieName) => {
		document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
	});
	console.log("Cleared all cookies");
	viewCookies();
}

function modifyCookieOutput() {
	const cookies = document.cookie.split(";");
	let localString = "";
	cookies.forEach((cookieName) => {
		localString += `${cookieName}<br>`;
	});
	return localString;
}

function viewCookies() {
	console.log("Current cookies:", getAllCookieNames());
	displayAllCookies.innerHTML = modifyCookieOutput();
	console.log(document.cookie);
}
viewCookies();

function doInitStats() {
	clearAllCookies();

	// max = 15 691
	// max cookie = 4096
	// max cookies(safari) = 50
	// cookie deletion is restricting functionality very much
	// apple default to 7 day deletion
	// brave default to 6 months deletion

	Object.entries(user.character).forEach((element) => {
		let elementToString = `${element};`;

		setCookie(
			elementToString.replace(",", "="),
			"Max-Age=2000000000; Path=/",
		);
	});

	viewCookies();
}
const user = {
	character: {
		xp: 100,
		health: 100,
		stamina: 100,
	},
};
