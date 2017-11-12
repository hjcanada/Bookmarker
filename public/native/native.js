document.getElementById("myForm").addEventListener("submit", saveBookmark, false);

fetchBookmarks();

function saveBookmark(e) {

	e.preventDefault();

	var siteName = document.getElementById("siteName").value;
	var siteUrl = document.getElementById("siteUrl").value;

	if (!validateForm(siteName, siteUrl)) {
		return false;
	}

	var bookmark = {
		siteName: siteName,
		siteUrl: siteUrl,
	}

	if (localStorage.getItem("bookmarks") === null) {
		var bookmarks = [];
		bookmarks.push(bookmark);
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	} else {
		var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
		bookmarks.push(bookmark);
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	}

	document.getElementById("myForm").reset();
	fetchBookmarks();
}

function deleteBookmark(url) {
	var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
	for (var i = 0; i < bookmarks.length; i++) {
		if (bookmarks[i].siteUrl === url) {
			bookmarks.splice(i, 1);
			break;
		}
	}
	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	fetchBookmarks();
}

function fetchBookmarks() {
	var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
	var bookmark = document.getElementById("bookmark");
	bookmark.innerHTML = "";

	for (var i = 0; i < bookmarks.length; i++) {
		bookmark.innerHTML += '<div class="well">' +
			'<h3>' + bookmarks[i].siteName +
			'<a class="btn btn-lg btn-danger pull-right" target="_blank" onclick="deleteBookmark(\'' + bookmarks[i].siteUrl + '\')">Delete</a>' +
			'<a class="btn btn-lg btn-default pull-right" target="_blank" href="' + bookmarks[i].siteUrl +'">Visit</a>' +
			'</h3>' +
			'</div>';
	}
}

function validateForm(siteName, siteUrl) {
	if (!siteName || !siteUrl) {
		alert("Please fill in the form!");
		return false;
	}

	var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if (!siteUrl.match(regex)) {
		alert("Invalid Site URL!");
		return false;
	}

	return true;
}
