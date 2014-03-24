/**
* options.js
* This is used by the options page, where we can configure the extension.
* When the page loads, it loads the settings if there is any in the localStorage.
* If we click restore default, it will delete the existing login details.
* If we click save, it saves in the localStorage which is later used by the extension to get the HD tickets.
*/

// Default value is blank
var defaultValue = "";

// loadOptions will load the login details from the localstorage.
function loadOptions() {

	// load from localStorage and assign it to the corresponding variables
	var userEmail = localStorage["userEmail"];
	var userName = localStorage["userName"];
	var userPassword = localStorage["userPassword"];

	// if the contents of each variable is undefined, we then assign the blanks.
	if (userEmail == undefined || userName == undefined || userPassword == undefined) {
		userEmail = defaultValue;
		userName = defaultValue;
		userPassword = defaultValue;
	}

	// Allocate the inputs in variables
	var userEmailInput = document.getElementById("userEmail");
	var userNameInput = document.getElementById("userName");
	var userPasswordInput = document.getElementById("userPassword");

	// Assign a value to each input depending on the value of the variable
	userEmailInput.value = userEmail;
	userNameInput.value = userName;
	userPasswordInput.value = userPassword;
}

// saveOptions will save the settings to the localStorage
function saveOptions() {

	// get values from input
	var userEmail = document.getElementById("userEmail").value;
	var userName = document.getElementById("userName").value;
	var userPassword = document.getElementById("userPassword").value;

	document.getElementById('changes-saved').style.display = 'block';

	var changessaved = setInterval(function(){ document.getElementById('changes-saved').style.display = 'none'; }, 2500);

	// assign the values from the inputs into fields in localStorage
	localStorage["userEmail"] = userEmail;
	localStorage["userName"] = userName;
	localStorage["userPassword"] = userPassword;
}

// delete all options
function eraseOptions() {
	localStorage.removeItem("userEmail");
	localStorage.removeItem("userName");
	localStorage.removeItem("userPassword");
	location.reload();
}

// on page load we load the options using loadOptions
window.addEventListener("load", loadOptions);

// when clicking on btnsave we call saveOptions
document.getElementById("btnsave").addEventListener("click",saveOptions);

// when clicking on btnrestore we call eraseOptions
document.getElementById("btnrestore").addEventListener("click",eraseOptions);
