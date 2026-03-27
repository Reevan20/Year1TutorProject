var searchOpen = false;
var container = document.getElementById("searchBox")
var expandButton = document.getElementById("searchExpand")
var searchArrow = document.getElementById("searchArrow")
var searchBar1 = document.getElementById("searchBar1")
var searchBar2 = document.getElementById("searchBar2")
var advancedSearchOpen = document.getElementById("advancedSearchOpen")
var advancedOptions = document.getElementById("advancedOptions")

var suggestionsContainer1 = document.getElementById("suggestionsContainer1")
var suggestionsContainer2 = document.getElementById("suggestionsContainer2")

var startFilter = document.getElementById("startSelect")
var targetFilter = document.getElementById("targetSelect")

var wheelchairCheckbox = document.getElementById("wheelchairCheckbox")


var url = new URL(window.location)

// var startFloorFilterButton = document.getElementById("startFloorFilter")
var advancedOpen = false

var rooms = {}

async function fetchRooms() {
	var response = await fetch("fetch_rooms.php")
	var data = await response.json()

	rooms = data
	initSearch()
}


// fetch("/fetch_rooms.php").then(response => {var rooms = response.json()})





// var options = ["antimony","arsenic","aluminum","selenium","hydrogen","oxygen","nitrogen","rhenium"]

function expand() {
	var width = window.innerWidth

	searchOpen = !searchOpen
	advancedOpen = false
	advancedOptions.style.height = "0px"
	advancedOptions.style.opacity = "0"
	if (searchOpen) {
		//start shrinking if width-20 < 550
		container.style.width = Math.min(550,width - 20)
		container.style.height = "180px"
		searchArrow.style.transform = "rotate(180deg)"
		searchArrow.top = "-150%"
		searchBar1.style.opacity = "1"
		searchBar2.style.opacity = "1"


		searchBar1.style.width = Math.min(400, width - 160)
		searchBar2.style.width = Math.min(400, width - 160)
		advancedSearchOpen.style.left = 430 - Math.max(0, 550-(width-20))



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
	var width = window.innerWidth

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


function suggest1() {
	console.log(rooms)
	var search = searchBar1.value.toLowerCase()
	// var searchContainer = document.getElementById("searchContainer")
	suggestionsContainer1.innerHTML = ""
	suggestionsContainer2.innerHTML = ""
	if (search == "") {
		return
	}
	var foundNum = 0
	console.log(startFilter.value.toLowerCase())

	for (var room of rooms) {
	console.log(room["floor"])

		if (room["floor"].toLowerCase() == startFilter.value.toLowerCase() || startFilter.value.toLowerCase() == "any") {
			if (foundNum >= 7) {
				break
			}
			var roomName = room["name"]
			// if (room["name"].toLowerCase().startsWith(search)) {
			if (roomName.toLowerCase().includes(search)) {
				foundNum += 1
				var pos = roomName.toLowerCase().indexOf(search)
				var suggestBox = document.createElement("div")
				suggestBox.classList.add("suggestBox")
				suggestBox.setAttribute("value",roomName)
				suggestBox.innerHTML = "<p class='suggestionText'>"+roomName.substring(0,pos)+"<b>"+roomName.substring(pos,pos+search.length)+"</b>"+roomName.substring(pos+search.length, roomName.length)+"</p>"
				suggestBox.addEventListener("click", function() {
					searchBar1.value = event.currentTarget.getAttribute("value")
					searchBar1.validVal = searchBar1.value;checkStart()
				})
				suggestionsContainer1.appendChild(suggestBox)
			}
		}


		// console.log(room["name"])
		
		

	}
}


function suggest2() {
	var search = searchBar2.value.toLowerCase()
	// var searchContainer = document.getElementById("searchContainer")
	suggestionsContainer1.innerHTML = ""
	suggestionsContainer2.innerHTML = ""
	if (search == "") {
		return
	}
	var foundNum = 0
	for (var room of rooms) {
	console.log(room["floor"])

		if (room["floor"].toLowerCase() == targetFilter.value.toLowerCase() || targetFilter.value.toLowerCase() == "any") {
			if (foundNum >= 7) {
				break
			}
			var roomName = room["name"]
			// if (room["name"].toLowerCase().startsWith(search)) {
			if (roomName.toLowerCase().includes(search)) {
				foundNum += 1
				var pos = roomName.toLowerCase().indexOf(search)
				var suggestBox = document.createElement("div")
				suggestBox.classList.add("suggestBox")
				suggestBox.setAttribute("value",roomName)
				suggestBox.innerHTML = "<p class='suggestionText'>"+roomName.substring(0,pos)+"<b>"+roomName.substring(pos,pos+search.length)+"</b>"+roomName.substring(pos+search.length, roomName.length)+"</p>"
				suggestBox.addEventListener("click", function() {
					searchBar2.value = event.currentTarget.getAttribute("value")
					searchBar2.validVal = searchBar2.value;checkStart()
				})
				suggestionsContainer2.appendChild(suggestBox)
			}
		}


		// console.log(room["name"])
		
		

	}
}

import {begin} from "./main.js"

function checkStart() {
	if (searchBar1.validVal && searchBar2.validVal) {

		console.log(rooms)
		for (var n of rooms) {
			if (n["name"] == searchBar1.validVal) {
				var a = n["node"]
				break
			}
		}
		for (var n of rooms) {
			if (n["name"] == searchBar2.validVal) {
				var b = n["node"]
				break
			}
		}

		var wheelchair = wheelchairCheckbox.checked


		console.log("going from" + a)
		console.log("to" + b)

		begin(a, b, wheelchair)
	}
}




function hideSuggestions() {
	suggestionsContainer1.innerHTML = ""
	suggestionsContainer2.innerHTML = ""
}

function initSearch() {
	if (url.searchParams.get("origin") != null) {
		for (var room of rooms) {
			if (room.node == url.searchParams.get("origin")) {
				searchBar1.value = room.name
				searchBar1.validVal = room.name
				break
			}
		}
	}
	if (url.searchParams.get("target") != null) {
		for (var room of rooms) {
			if (room.node == url.searchParams.get("target")) {
				searchBar2.value = room.name
				searchBar2.validVal = room.name
				break
			}
		}
	}

	console.log(wheelchairCheckbox)
	console.log(url.searchParams.get("wheelchair"))
	if (url.searchParams.get("wheelchair") != null) {
		wheelchairCheckbox.checked = url.searchParams.get("wheelchair") == "true"
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


searchBar1.addEventListener("keyup", suggest1)
searchBar2.addEventListener("keyup", suggest2)

wheelchairCheckbox.addEventListener("change", checkStart)

document.body.addEventListener("click", hideSuggestions)
document.body.onload=function() {
	container.style.transition = "0s"
	searchArrow.style.transition = "0s"
	searchBar1.style.transition = "0s"
	searchBar2.style.transition = "0s"
	expand()
	setTimeout(function() {
		container.style.transition = "0.5s"
		searchArrow.style.transition = "0.5s"
		searchBar1.style.transition = "0.5s"
		searchBar2.style.transition = "0.5s"
	}, 500)
	
	fetchRooms()
}

// startFloorFilterButton.addEventListener("click", expandStartFilter)


