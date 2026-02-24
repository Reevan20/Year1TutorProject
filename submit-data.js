// replace this with the correct names
const NODE_PHP = "get_node.php"
const ROOMS_PHP = "get_rooms.php"

function getNode(floorOptionElement, roomOptionElement) {
    const floor = floorOptionElement.value;
    const room = roomOptionElement.value;

    let phpServer = NODE_PHP + "?floor=" + floor + "&room=" + room;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", phpServer);
    xmlhttp.send()

    return xmlhttp;
};

function addRooms(floorOptionElement, listElement) {
    const floor = floorOptionElement.value;
    console.log(floor)

    let phpServer = ROOMS_PHP + "?floor=" + floor;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", phpServer);
    xmlhttp.send()

    xmlhttp.onload = function () {
        let rooms = JSON.parse(this.responseText);
        console.log(rooms);
        addOptions(listElement, rooms)
    }
}

function addOptions(element, rooms) {
    element.innerHTML = "";
    rooms.forEach(room => {
        let string = "<option>" + room + "</option>";
        element.insertAdjacentHTML("beforeend", string);
    });
}

const search = document.getElementById("search");
const container = document.getElementById("container");
search.addEventListener("click", () => {
    container.classList.toggle("active")
});

const start_floor = document.getElementById("start-floor");
const start_points = document.getElementById("start-point-list");
const end_floor = document.getElementById("dest-floor");
const end_points = document.getElementById("end-point-list");

const start_point = document.getElementById("start-point");
const end_point = document.getElementById("end-point");

const wheelchair = document.getElementById("wheelchair");

start_floor.onchange = () => { addRooms(start_floor, start_points); start_point.value = ""; }
end_floor.onchange = () => { addRooms(end_floor, end_points); end_point.value = ""; }

addRooms(start_floor, start_points);
addRooms(end_floor, end_points);

const button = document.getElementById("locate");

button.onclick = () => {
    let startNodeResponse = new Promise((resolve, reject) => {
        let response = getNode(start_floor, start_point);
        response.onload = function () {
            if (this.responseText) {
                //alert("start" + this.responseText);
                resolve(this.responseText);
            }
            else {
                alert("Start node not found");
                reject("Start node not found");
            }
        }
    });

    let endNodeResponse = new Promise((resolve, reject) => {
        let response = getNode(end_floor, end_point);
        response.onload = function () {
            if (this.responseText) {
                //alert("end" + this.responseText);
                resolve(this.responseText);
            }
            else {
                alert("End node not found");
                reject("End node not found");
            }
        }
    });

    // TODO: Better to not redirect here, maybe use sessionStorage and then re-trigger the pathfinding algorithm somehow.
    Promise.all([startNodeResponse, endNodeResponse]).then((responses) => {
        const url = new URL(window.location);
        url.searchParams.set("origin", responses[0]);
        url.searchParams.set("target", responses[1]);
        url.searchParams.set("wheelchair", wheelchair.checked);
        window.location.replace(url.href);
    })

}