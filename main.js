/* const initStats = document.getElementById("init-stats");
const deleteAllCookies = document.getElementById("delete-all-cookies");
const checkCookie = document.getElementById("check-cookie");

const displayAllCookies = document.getElementById("display-all-cookies"); */

const user = {
	creation: null,
	character: {
		experience: 100,
		health: 100,
		stamina: 100,
	},
};

const ui = {
	testing: {
		button: {
			initStats: document.getElementById("init-stats"),
			deleteAllCookies: document.getElementById("delete-all-cookies"),
			checkCookie: document.getElementById("check-cookie"),
		},
		output: {
			checkCookie: document.getElementById("display-all-cookies"),
		},
	},
};

ui.testing.button.initStats.addEventListener("click", doInitStats);
ui.testing.button.deleteAllCookies.addEventListener("click", clearAllCookies);
ui.testing.button.checkCookie.addEventListener("click", isCookieEmpty);

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
	console.log("Cookie: Cleared");
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

function setUserCreationTime() {
	const newTime = new Date();
	user.creation = newTime.getTime();
}

function isCookieEmpty() {
	console.log("Cookie: Check");
	if (document.cookie) {
		console.log("Cookie: Exist");
	} else (console.log("Cookie: Not found"), doInitStats());
}

function doInitStats() {
	clearAllCookies();

	console.log("Cookie: Set initial values");

	let characterKeys = "character=";
	Object.entries(user.character).forEach((entry) => {
		characterKeys += `[${entry}]`;
	});
	document.cookie = characterKeys;

	setUserCreationTime();
	setCookie("creationTime", user.creation);

	console.log("Cookie: Set creation time");
	setUserCreationTime();

	viewCookies();
}

function viewCookies() {
	console.log("Cookie:", getAllCookieNames());
	ui.testing.output.innerHTML = modifyCookieOutput();
}
viewCookies();

/* user.character.health + 5;
doInitStats(); */

/* setInterval(update, 1000)

function update() {
	console.log("mew")
} */

// max = 15 691
// max cookie = 4096
// max cookies(safari) = 50
// cookie deletion is restricting functionality very much
// apple default to 7 day deletion
// brave default to 6 months deletion
// chrome 700 day deletion

// i need to check if user has a cookie, if not, make one.
// i need to read data from cookie to modify
// new object for default stats
