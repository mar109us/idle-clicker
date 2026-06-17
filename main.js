const initStats = document.getElementById("init-stats");
const createNewCookie = document.getElementById("create-new-cookie");
const deleteAllCookies = document.getElementById("delete-all-cookies");
const displayAllCookies = document.getElementById("display-all-cookies");
let x = document.cookie;

initStats.addEventListener("click", doInitStats);
createNewCookie.addEventListener("click", createNewRandomCookie);
deleteAllCookies.addEventListener("click", clearAllCookies);

function setCookie(setCookieKey, setCookieValue, setCookieExpire) {
	const localDate = new Date();
	localDate.setTime(
		localDate.getTime() + setCookieExpire * 24 * 60 * 60 * 1000,
	);
	let expires = "expires=" + localDate.toUTCString();
	document.cookie =
		setCookieKey + "=" + setCookieValue + ";" + expires + ";path=/";
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

function createNewRandomCookie() {
	setCookie(`KEY_${Math.random()}`, `VALUE_${Math.random()}`, 999);
	viewCookies();
}

let goMaxCookieSize = "0";

function doInitStats() {
	clearAllCookies();

	// max = 15 691
	// max cookie = 4096
	// max cookies(safari) = 50

	//max per cookie
	/* 	setCookie(
		goMaxCookieSize.repeat(2048),
		goMaxCookieSize.repeat(2048),
		3650000,
	); */
	/* 	setCookie(
		`${goMaxCookieSize.repeat(1000)}`,
		goMaxCookieSize.repeat(1000),
		3650000,
	);
	setCookie(
		`1${goMaxCookieSize.repeat(999)}`,
		goMaxCookieSize.repeat(1000),
		3650000,
	);
	setCookie(
		`11${goMaxCookieSize.repeat(998)}`,
		goMaxCookieSize.repeat(1000),
		3650000,
	);
	setCookie(
		`111${goMaxCookieSize.repeat(997)}`,
		goMaxCookieSize.repeat(1000),
		3650000,
	);
	setCookie(
		`1111${goMaxCookieSize.repeat(996)}`,
		goMaxCookieSize.repeat(1000),
		3650000,
	);
	setCookie(
		`11111${goMaxCookieSize.repeat(995)}`,
		goMaxCookieSize.repeat(1000),
		3650000,
	);
	setCookie(
		`111111${goMaxCookieSize.repeat(994)}`,
		goMaxCookieSize.repeat(1000),
		3650000,
	);
	setCookie(
		`1111111${goMaxCookieSize.repeat(493)}`,
		goMaxCookieSize.repeat(500),
		3650000,
	);
	setCookie(
		`11111111${goMaxCookieSize.repeat(100)}`,
		goMaxCookieSize.repeat(100),
		3650000,
	);
	setCookie(
		`${goMaxCookieSize.repeat(200)}`,
		goMaxCookieSize.repeat(283),
		3650000,
	); */

	viewCookies();
}
