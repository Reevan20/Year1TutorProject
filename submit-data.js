// replace this with the correct names
const LINKED_WEBPAGE = "pathfinder.html"
const PHP_SERVER = "get-node.php"

const button = document.getElementById("locate");

button.onclick = () => {
    const floor = document.getElementById("floor_option").value;
    const room = document.getElementById("room_option").value;

    const data = {floor:floor, room:room};

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }

    xmlhttp.open("GET", PHP_SERVER + "?floor="+floor+"&room="+room);
    xmlhttp.send()

    xmlhttp.onload = function(){
        alert(this.responseText);
    }

    window.location.replace(LINKED_WEBPAGE);
};
