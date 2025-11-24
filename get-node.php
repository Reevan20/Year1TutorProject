<?php
$db = new SQLite3("pathing_app.db");

if (isset($_GET["floor"]) && isset($_GET["room"])){
    $floor = $_GET["floor"];
    $number = $_GET["room"];
    $sql = "SELECT node FROM Rooms WHERE floor == ? and room == ?";
    $bind_sql = $sql->bind_param($floor, $room);
    $result = $db->query($bind_sql);

    if ($result->num_rows == 1){
        echo $result->fetch_assoc()["node"];
    }
}
?>
