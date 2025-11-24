// replace this with the correct names
const LINKED_WEBPAGE = "pathfinder.html"
const PHP_SERVER = "internal.php"

const button = document.getElementById("locate");

button.onclick = () => {
    const floor = document.getElementById("floor_option");
    const room = document.getElementById("room_option");
    $.ajax({
        type: "POST",
        url: PHP_SERVER,
        data: { floor: floor, room: room },
        success: (res) => sessionStorage.setItem("response", JSON.stringify(res)),
    })

    window.location.replace(LINKED_WEBPAGE);
};