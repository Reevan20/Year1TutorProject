<?php
$database = new SQLite3('pathing_app.db');
$floor = $_GET["floor"];

if ($floor !== null) { 
    $rooms = [];
    $stmt = $database->prepare("SELECT number FROM Rooms WHERE floor = :floor");
    $stmt->bindValue(':floor', $floor, SQLITE3_TEXT);
    $results = $stmt->execute();

    while ($row = $results->fetchArray()){
        $rooms[] = $row["number"];
    }
    echo json_encode($rooms);

}
?>