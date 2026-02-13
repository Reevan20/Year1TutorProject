<?php
$database = new SQLite3('pathing_app.db');
$floor_start_data = $_POST['floor_option1'] ?? null;
$floor_data = $_POST['floor_option'] ?? null;

$grab  = null;
$grab1 = null;
?>
<meta name="viewport" content="width=device-width, initial-scale=1">

<head>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>

<body>
<button id="search" class="search"><i class="fas fa-search"></i></button>
  <div id="slider">
    <p>drag me left and right frfr</p>

  </div>
</body>
<style>
.container.active{
    left: 100px;
}
.search{
    width:30px;
    height:30px;
    border-radius: 15px;
    border: 0;
}
body{
    font-family: 'Trebuchet MS', sans-serif;
}
img{
    width:180px;
    height:80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: purple;
    width: 530px;
    height: 610px;
    top: 0;
    bottom:0;
    left: 0;
    right: 0;
    margin: auto;
    left: -1950px;
    transition: left 0.1s ease;
    position:fixed;
}
.locate{
    width: 350px;
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
<div class="container" id="container">
<form action="" method="POST">
<img src="uomaps.jpg" alt='Logo'>
<h3>Which floor is your start point?</h3>
<select class="floor_option1" name="floor_option1" onchange="this.form.submit()">
    <option id="ground_floor" name="ground_floor" value="Ground">Ground</option>
    <option id="first_floor" name="first_floor" value="First">First</option>
    <option id="second_floor" name="second_floor" value="Second">Second</option>
</select>
<br>
<h3>Where is your start point?</h3>
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
<br>
<h3>Which floor is your destination?</h3>
<select class="floor_option" name="floor_option" onchange="this.form.submit()">
    <option id="ground_floor" name="ground_floor" value="Ground">Ground</option>
    <option id="first_floor" name="first_floor" value="First">First</option>
    <option id="second_floor" name="second_floor" value="Second">Second</option>
</select>
<h3>Select the room you want to go</h3>
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
<br>
<button type="submit" class="locate" id="locate">Locate</button>
</form>
</div>
</style>
<!-- <script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script> -->
<script type="importmap">
{
  "imports": {
    "three": "https://unpkg.com/three@0.165.0/build/three.module.js"
  }
}
</script>
<!-- <script src="https://unpkg.com/three@0.165.0/build/three.min.js"></script> -->
<!-- <script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script> -->
<!-- OBJLoader -->
<!-- <script src="https://cdn.jsdelivr.net/npm/three@0.160.0/examples/js/loaders/OBJLoader.js"></script> -->

<script type="module" src="main.js"></script>
<script>
    const search = document.getElementById("search");
    const container = document.getElementById("container");
    search.addEventListener("click",() => {
        container.classList.toggle("active")
    });
</script>