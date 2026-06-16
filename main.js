const createNewCookie = document.getElementById("create-new-cookie");
const deleteAllCookies = document.getElementById("delete-all-cookies");
const displayAllCookies = document.getElementById("display-all-cookies");
let x = document.cookie;

deleteAllCookies.addEventListener("click", clearAllCookies);
createNewCookie.addEventListener("click", createNewRandomCookie);

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
