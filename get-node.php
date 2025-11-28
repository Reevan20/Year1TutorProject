<?php
$db = new SQLite3("pathing_app.db");

if (isset($_GET["floor"]) && isset($_GET["room"])){
    $floor = $_GET["floor"];
    $number = $_GET["room"];
    $sql = $db->prepare("SELECT node FROM Rooms WHERE floor == :floor and number == :number");
    $sql->bindParam(":floor", $floor);
    $sql->bindParam(":number", $number);

    $sql->execute();

    $result = $db->query($sql->getSQL(true));

    $row = $result->fetchArray(SQLITE3_ASSOC);
    if ($row){
        echo $row["node"];
    }
    else{
        echo NULL;
    }
}
?>
