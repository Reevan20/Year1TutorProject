var searchOpen = false;
var container = document.getElementById("searchBox")
var expandButton = document.getElementById("searchExpand")
var searchArrow = document.getElementById("searchArrow")
var searchBar1 = document.getElementById("searchBar1")
var searchBar2 = document.getElementById("searchBar2")
var advancedSearchOpen = document.getElementById("advancedSearchOpen")
var advancedOptions = document.getElementById("advancedOptions")
// var startFloorFilterButton = document.getElementById("startFloorFilter")
var advancedOpen = false

function expand() {
	searchOpen = !searchOpen
	advancedOpen = false
	advancedOptions.style.height = "0px"
	advancedOptions.style.opacity = "0"
	if (searchOpen) {
		container.style.width = "550px"
		container.style.height = "180px"
		searchArrow.style.transform = "rotate(180deg)"
		searchArrow.top = "-150%"
		searchBar1.style.opacity = "1"
		searchBar2.style.opacity = "1"

	} else {
		container.style.width = "50px"
		container.style.height = "50px"
		searchArrow.style.transform = "rotate(0deg)"
		searchArrow.top = "-50%"

		searchBar1.style.opacity = "0"
		searchBar2.style.opacity = "0"
	}

}

function expandAdvanced() {
	advancedOpen = !advancedOpen
	if (advancedOpen) {
		container.style.height = "320px"
		advancedOptions.style.height = "140px"
		advancedOptions.style.opacity = "100"
	} else {
		container.style.height = "180px"
		advancedOptions.style.height = "0px"
		advancedOptions.style.opacity = "0"

	}
}

// var startFilterOpen = false
// function expandStartFilter() {
// 	console.log("click")
// 	startFilterOpen = !startFilterOpen
// 	if (startFilterOpen) {
// 		startFloorFilterButton.style.height = "45px"
// 	} else {
// 		startFloorFilterButton.style.height = "300px"
// 	}
// }



expandButton.addEventListener("click", expand);
advancedSearchOpen.addEventListener("click", expandAdvanced);
// startFloorFilterButton.addEventListener("click", expandStartFilter)


