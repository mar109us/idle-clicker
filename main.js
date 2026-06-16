const createNewCookie = document.getElementById("create-new-cookie");
const deleteAllCookies = document.getElementById("delete-all-cookies");
const el = document.getElementById("test");
let x = document.cookie;

deleteAllCookies.addEventListener("click", clearAllCookies);
createNewCookie.addEventListener("click", creatNewRandomCookie);

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
		.map((cookie) => cookie.split("=")[0].trim())
		.filter((name) => name.length > 0);
}

// Test it
function clearAllCookies() {
	const cookies = getAllCookieNames();
	cookies.forEach((cookieName) => {
		// Clear for current path
		document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;

		// Clear for current domain
		document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;

		// Clear for parent domain (handles subdomains)
		const domain = window.location.hostname.split(".").slice(-2).join(".");
		document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${domain}`;
	});

	console.log("Cleared all cookies");
	viewCookies();
}

function viewCookies() {
	console.log("Current cookies:", getAllCookieNames());
	el.innerHTML = getAllCookieNames();
}
viewCookies();

function creatNewRandomCookie() {
	setCookie(`KEY_${Math.random()}`, `VALUE_${Math.random()}`, 999);
	viewCookies();
}
