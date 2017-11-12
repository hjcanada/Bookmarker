angular.module('myApp', ['ngMessages'])

.controller('myCtrl', ['$scope', "$window", function($scope, $window) {

	$scope.switchBool = function(value) {
		$scope[value] = !$scope[value];
	}

	$scope.submit = function() {
		if ($scope.myForm.$valid) {
			var bookmark = {
				siteName: $scope.site.name,
				siteUrl: $scope.site.url,
			}

			var bookmarks = [];

			if (localStorage.getItem("bookmarks")) {
				bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
			}
		
			bookmarks.push(bookmark);
			localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
			$scope.showSuccess = true;

			$scope.site = null;
			$scope.myForm.$setPristine();
			$scope.myForm.$setUntouched();
			fetchBookmarks();
		} else {
			$scope.showSuccess = false;
		}
	}


	$scope.delete = function(url) {
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

	$scope.visit = function(url) {
		$window.open(url);
	}

	function fetchBookmarks() {
		if (localStorage.getItem("bookmarks")) {
			$scope.bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
		}
	}

	fetchBookmarks();
	
}])
