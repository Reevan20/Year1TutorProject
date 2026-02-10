<?php
$database = new SQLite3('pathing_app.db');
$floor_start_data = $_POST['floor_option1'] ?? null;
$floor_data = $_POST['floor_option'] ?? null;

$grab  = null;
$grab1 = null;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UOMaps</title>
</head>
<style>
body{
    background-image: url('Kilburn.jpg');
    background-size:cover;
    background-repeat: no-repeat;
    font-family: 'Trebuchet MS', sans-serif;
}
img{
    width:180px;
    height:80px;
}
.content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    position: absolute;
    background-color: purple;
    width: 530px;
    height: 610px;
    top: 0;
    bottom:0;
    left: 0;
    right: 0;
    margin: auto;
}
button{
    width: 100px;
    height: 35px;
    border: 0;
    border-radius: 20px;
}
button:hover{
    background-color: aqua;
}
input{
    width: 350px;
    height: 35px;
    border-radius: 10px;
}
.floor_option{
    width: 350px;
    height: 35px;
    border-radius: 10px;
}
.floor_option1{
    width: 350px;
    height: 35px;
    border-radius: 10px;
}
.start_point{
    width: 350px;
    height: 35px;
    border-radius: 10px;
}
.Rooms{
    width: 350px;
    height: 35px;
    border-radius: 10px;
}
</style>
<body>
<form action="" method="POST">
<div class="content">
<img src="uomaps.jpg" alt='Logo'>
<h1>Which floor is your start point?</h1>
<select class="floor_option1" name="floor_option1" onchange="this.form.submit()">
    <option id="ground_floor" name="ground_floor" value="Ground">Ground</option>
    <option id="first_floor" name="first_floor" value="First">First</option>
    <option id="second_floor" name="second_floor" value="Second">Second</option>
</select>
<br>
<h1>Where is your start point?</h1>
<?php
if ($floor_start_data !== null) { 
    $stmt = $database->prepare("SELECT id,number,floor FROM Rooms WHERE floor = :floor");
    $stmt->bindValue(':floor', $floor_start_data, SQLITE3_TEXT);
    $grab = $stmt->execute();
    }
?>
<select id="start-point" class="start_point" name="start">
<?php if ($grab): ?>
<?php while ($room = $grab->fetchArray(SQLITE3_ASSOC)) : ?>
    <option value="<?= $room['id'] ?>">
        <?= htmlspecialchars($room['number']) ?>
    </option>
<?php endwhile; ?>
<?php endif ?>
</select>
<a href="QRCode.html">Or Scan QR Code near you</a>
<br>
<h1>Which floor is your destination?</h1>
<select class="floor_option" name="floor_option" onchange="this.form.submit()">
    <option id="ground_floor" name="ground_floor" value="Ground">Ground</option>
    <option id="first_floor" name="first_floor" value="First">First</option>
    <option id="second_floor" name="second_floor" value="Second">Second</option>
</select>
<h1>Select the room you want to go</h1>
<?php
if ($floor_data !== null) {
    $stmt1 = $database->prepare("SELECT id, number, floor FROM Rooms WHERE floor = :floor");
    $stmt1->bindValue(':floor', $floor_data, SQLITE3_TEXT);
    $grab1 = $stmt1->execute();}
?>
<select class="Rooms" name="room">
<?php if ($grab1): ?>
 <?php while ($room = $grab1->fetchArray(SQLITE3_ASSOC)) : ?>
    <option value="<?= $room['id'] ?>">
        <?= htmlspecialchars($room['number']) ?>
    </option>
<?php endwhile; ?>
<?php endif ?>
</select>
<br>
<button type="submit" id="locate">Locate</button>
</div>
</form>
</body>
</html>