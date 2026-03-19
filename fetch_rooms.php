<?php
$database = new SQLite3('pathing_app.db');

// table structure:
// id number floor type node
// number - room name
// node - node id

$rooms = [];
$stmt = $database->prepare("SELECT id, number, floor, type FROM Rooms");
$results = $stmt->execute();

while ($row = $results->fetchArray(SQLITE3_ASSOC)){
    $rooms[] = $row;
}
echo json_encode($rooms);


?>