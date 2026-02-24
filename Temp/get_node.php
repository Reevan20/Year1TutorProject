<?php
$database = new SQLite3('pathing_app.db');
$floor = $_GET["floor"];
$room = $_GET["room"];


if ($floor !== null && $room !== null) { 
    $rooms = [];
    $stmt = $database->prepare("SELECT node FROM Rooms WHERE floor = :floor AND number = :room");
    $stmt->bindValue(':floor', $floor, SQLITE3_TEXT);
    $stmt->bindValue(':room', $room, SQLITE3_TEXT);
    $results = $stmt->execute();


    echo $results->fetchArray()["node"];

}
?>