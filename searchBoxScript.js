var searchOpen = false;
var container = document.getElementById("searchBox")
var expandButton = document.getElementById("searchExpand")
var searchArrow = document.getElementById("searchArrow")
var searchBar1 = document.getElementById("searchBar1")
var searchBar2 = document.getElementById("searchBar2")

function expand() {
	searchOpen = !searchOpen
	if (searchOpen) {
		container.style.width = "500px"
		container.style.height = "200px"
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




document.getElementById("searchExpand").addEventListener("click", expand);


