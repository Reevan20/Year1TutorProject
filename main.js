import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.165.0/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://unpkg.com/three@0.165.0/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.165.0/examples/jsm/loaders/GLTFLoader.js';


function connect(n1, n2) {
    nodes[n1].connections.push(n2 + "")
    nodes[n2].connections.push(n1 + "")
}



var nodes_ground = { '1': { 'position': [-64.209732, 0.1, 67.535774], 'connections': ['2'], 'labels': [] }, '2': { 'position': [-64.209732, 0.1, 62.154221], 'connections': ['1', '3', '6'], 'labels': [] }, '3': { 'position': [-53.476265, 0.1, 61.968582], 'connections': ['2', '4', '5'], 'labels': [] }, '4': { 'position': [-53.535072, 0.1, 67.359467], 'connections': ['3'], 'labels': [] }, '5': { 'position': [-52.68301, 0.1, 44.899483], 'connections': ['3', '6', '8', '9'], 'labels': [] }, '6': { 'position': [-63.929295, 0.1, 44.747047], 'connections': ['5', '2', '7', '13'], 'labels': [] }, '7': { 'position': [-74.328735, 0.1, 44.730087], 'connections': ['6'], 'labels': [] }, '8': { 'position': [-45.977554, 0.1, 44.96344], 'connections': ['5', '10'], 'labels': [] }, '9': { 'position': [-54.576889, 0.1, 39.453423], 'connections': ['5'], 'labels': [] }, '10': { 'position': [-46.126762, 0.1, 38.47892], 'connections': ['8', '11'], 'labels': [] }, '11': { 'position': [-25.854958, 0.1, 38.773941], 'connections': ['10', '12', '24'], 'labels': [] }, '12': { 'position': [-27.035027, 0.1, 16.647758], 'connections': ['11', '13', '14'], 'labels': [] }, '13': { 'position': [-63.701271, 0.1, 15.678417], 'connections': ['12', '6', '15'], 'labels': [] }, '14': { 'position': [-26.740036, 0.1, -19.512749], 'connections': ['12', '15', '35'], 'labels': [] }, '15': { 'position': [-65.555679, 0.1, -19.934204], 'connections': ['14', '13', '16'], 'labels': [] }, '16': { 'position': [-65.387093, 0.1, -24.443733], 'connections': ['15', '17', '19', '22'], 'labels': [] }, '17': { 'position': [-80.095734, 0.1, -24.485878], 'connections': ['16', '18', '22'], 'labels': [] }, '18': { 'position': [-80.306458, 0.1, -19.428459], 'connections': ['17'], 'labels': [] }, '19': { 'position': [-65.429237, 0.1, -43.071869], 'connections': ['16', '20', '22'], 'labels': [] }, '20': { 'position': [-65.302803, 0.1, -50.278679], 'connections': ['19', '21'], 'labels': [] }, '21': { 'position': [-75.417625, 0.1, -50.362976], 'connections': ['20', '22', '23'], 'labels': [] }, '22': { 'position': [-75.417625, 0.1, -42.987579], 'connections': ['21', '17', '19', '16'], 'labels': [] }, '23': { 'position': [-75.037247, 0.1, -167.298737], 'connections': ['21'], 'labels': [] }, '24': { 'position': [-25.984295, 0.1, 44.881088], 'connections': ['11', '25', '26'], 'labels': [] }, '25': { 'position': [-41.004814, 0.1, 44.982239], 'connections': ['24'], 'labels': [] }, '26': { 'position': [-16.880947, 0.1, 44.931671], 'connections': ['24', '27'], 'labels': [] }, '27': { 'position': [-4.287991, 0.1, 45.285683], 'connections': ['26', '28'], 'labels': [] }, '28': { 'position': [21.504814, 0.1, 45.791428], 'connections': ['27', '29'], 'labels': [] }, '29': { 'position': [28.838066, 0.1, 45.437408], 'connections': ['28', '30'], 'labels': [] }, '30': { 'position': [61.205513, 0.1, 45.589134], 'connections': ['29', '31', '32'], 'labels': [] }, '31': { 'position': [61.256096, 0.1, 51.506302], 'connections': ['30'], 'labels': [] }, '32': { 'position': [62.014717, 0.1, 23.134216], 'connections': ['30', '33'], 'labels': [] }, '33': { 'position': [62.520454, 0.1, 9.479206], 'connections': ['32', '34'], 'labels': [] }, '34': { 'position': [62.217003, 0.1, -8.019447], 'connections': ['33'], 'labels': [] }, '35': { 'position': [-25.853897, 0.1, -66.877434], 'connections': ['14'], 'labels': [] } }
var nodes_stairs = { '36': { 'position': [-54.543598, 6.20344, 29.354958], 'connections': ['37', '38'], 'labels': [] }, '37': { 'position': [-54.557404, 0.0, 39.463318], 'connections': ['36'], 'labels': [] }, '38': { 'position': [-54.429298, 6.20344, 23.532436], 'connections': ['36', '39'], 'labels': [] }, '39': { 'position': [-50.136742, 6.20344, 23.556826], 'connections': ['38', '40'], 'labels': [] }, '40': { 'position': [-41.185783, 12.332638, 23.532436], 'connections': ['39'], 'labels': [] } }
var nodes_lower = { '41': { 'position': [-41.077282, 12.1, 23.497581], 'connections': ['43'], 'labels': [] }, '42': { 'position': [-68.316162, 12.099999, 12.533296], 'connections': ['45', '53'], 'labels': [] }, '43': { 'position': [-34.302414, 12.1, 23.343733], 'connections': ['41', '44'], 'labels': [] }, '44': { 'position': [-34.073257, 12.099999, 11.850384], 'connections': ['53', '43', '55'], 'labels': [] }, '45': { 'position': [-78.114624, 12.099999, 12.665486], 'connections': ['42', '46', '48'], 'labels': [] }, '46': { 'position': [-91.643204, 12.099999, 12.791923], 'connections': ['45', '47', '52'], 'labels': [] }, '47': { 'position': [-91.727493, 12.099999, 20.293755], 'connections': ['46', '48', '49', '51'], 'labels': [] }, '48': { 'position': [-78.493919, 12.099999, 20.251608], 'connections': ['47', '45'], 'labels': [] }, '49': { 'position': [-102.51664, 12.099999, 20.125172], 'connections': ['47', '50', '52'], 'labels': [] }, '50': { 'position': [-102.643074, 12.099999, 26.320503], 'connections': ['49', '51'], 'labels': [] }, '51': { 'position': [-92.359665, 12.099999, 26.362648], 'connections': ['50', '47'], 'labels': [] }, '52': { 'position': [-102.179482, 12.099999, 13.550536], 'connections': ['46', '49'], 'labels': [] }, '53': { 'position': [-56.849178, 12.099999, 12.016234], 'connections': ['44', '42', '54'], 'labels': [] }, '54': { 'position': [-56.378273, 12.099999, 7.281445], 'connections': ['53'], 'labels': [] }, '55': { 'position': [2.916393, 12.099999, 12.01925], 'connections': ['44', '56'], 'labels': [] }, '56': { 'position': [3.801445, 12.099999, -8.252547], 'connections': ['55', '57'], 'labels': [] }, '57': { 'position': [-9.600706, 12.099999, -7.283211], 'connections': ['56', '58'], 'labels': [] }, '58': { 'position': [-9.347836, 12.099999, -16.091541], 'connections': ['57', '59'], 'labels': [] }, '59': { 'position': [-17.650423, 12.099999, -15.670086], 'connections': ['58'], 'labels': [] } }

var nodes = { ...nodes_ground, ...nodes_stairs, ...nodes_lower }


var url = new URL(window.location);
if (url.searchParams.get("wheelchair") != "true") {
    connect(9, 37)
    connect(40, 41)
}





function loadObject(objectFile, materialColor, lineColor, opacity = 0.3, onLoad) {
    const loader = new OBJLoader();
    loader.load(
        objectFile,
        (object) => {
            object.traverse((child) => {
                if (child.isMesh) {
                    child.geometry.computeVertexNormals();
                    child.material = new THREE.MeshStandardMaterial({
                        color: materialColor,
                        transparent: true,
                        opacity: opacity,
                        side: THREE.DoubleSide//,
                        // depthWrite: false
                    });

                    const edges = new THREE.EdgesGeometry(child.geometry);
                    const line = new THREE.LineSegments(
                        edges,
                        new THREE.LineBasicMaterial({ color: lineColor })
                    );
                    child.add(line);
                }
            });

            scene.add(object);
            if (onLoad) onLoad(object);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        (error) => {
            console.error('An error occurred:', error);
        }
    );
}

function loadGLTF(objectFile, onLoad) {
    const loader = new GLTFLoader();

    loader.load(objectFile,
        (object) => {
            // Same process, except the actual object is now in object.scene
            scene.add(object.scene);
            if (onLoad) onLoad(object.scene);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        (error) => {
            console.error('An error occurred:', error);
        }
    );
}

function drawNodes() {
    const nodeGeometry = new THREE.BoxGeometry(.1, .1, .1)
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff })
    for (var n of Object.keys(nodes)) {
        const nodeCube = new THREE.Mesh(nodeGeometry, nodeMaterial)
        nodeCube.position.x = nodes[n].position[0]
        nodeCube.position.y = nodes[n].position[1]
        nodeCube.position.z = nodes[n].position[2]
        scene.add(nodeCube)
        createLabel(n, nodeCube.position)
    }
}

function createCamera() {
    return new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000);
}

function createSmoother() {
    return new THREE.Object3D()
}

function createUser() {
    const geometry = new THREE.BoxGeometry(.5, 1, .5);
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const user = new THREE.Mesh(geometry, boxMaterial);
    scene.add(user)
    return user
}

function initialiseUser() {
    user.position.x = nodes["1"]["position"][0]
    user.position.y = nodes["1"]["position"][1] + 0.25
    user.position.z = nodes["1"]["position"][2]


    smoother.position.x = user.position.x
    smoother.position.y = user.position.y
    smoother.position.z = user.position.z + tug1Length


    camera.position.x = smoother.position.x
    camera.position.y = smoother.position.y + cameraHeight
    camera.position.z = smoother.position.z + tug2Length

    camera.lookAt(user.position)
}

function distance(p1, p2) {
    return ((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2 + (p1[2] - p2[2]) ** 2) ** 0.5
}

function moveCamera() {
    var smootherToUserVector = user.position.clone().sub(smoother.position)
    var s2uLength = smootherToUserVector.length()
    smoother.position.add(smootherToUserVector.multiplyScalar((s2uLength - tug1Length) / s2uLength))

    camera.position.y = camera.position.y - cameraHeight

    var cameraToSmootherVector = smoother.position.clone().sub(camera.position)
    var c2sLength = cameraToSmootherVector.length()
    camera.position.add(cameraToSmootherVector.multiplyScalar((c2sLength - tug2Length) / c2sLength))

    camera.position.y = camera.position.y + cameraHeight
    camera.lookAt(user.position)
}

var distances = []
var totalDistance = 0
function aStar(start, end) {
    open = {} // {0:[cost, heuristic, parent]}
    open[start] = [0, distance(nodes[start].position, nodes[end].position), -1]
    close = {}
    while (Object.keys(open).length >= 1) {
        var lowest = Object.entries(open).sort(([, a], [, b]) => { // sort by total cost (low to high)
            return a[0] + a[1] - b[0] - b[1]
        })[0]

        close[lowest[0]] = lowest[1]
        delete open[lowest[0]]


        for (var conn of nodes[lowest[0]]["connections"]) {
            if (!Object.keys(close).includes(conn)) {
                var c = lowest[1][0] + distance(nodes[lowest[0]].position, nodes[conn].position)
                if (!Object.keys(open).includes(conn)) {
                    // add to open
                    open[conn] = [c, distance(nodes[conn].position, nodes[end].position), lowest[0]]
                } else if (c >= open[conn][0]) {
                    continue // this path is worse
                }

            }
        }
        if (lowest[0] == end) {
            console.log("Pathfinding complete")
            break
        }
    }
    // return close

    var path = [end]
    var curr = end
    while (true) {
        var prev = close[curr][2]
        path.push(parseInt(prev))
        var d = distance(nodes[curr].position, nodes[prev].position)
        distances.push(d)
        totalDistance = totalDistance + d
        if (prev == start) {
            break
        }
        curr = prev
    }
    distances.reverse()
    return path.reverse()
}

function drawPath(path) {
    const nodeGeometry = new THREE.BoxGeometry(.1, .1, .1)
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    var points = []
    for (var node of path) {
        const nodeCube = new THREE.Mesh(nodeGeometry, nodeMaterial)
        nodeCube.position.x = nodes[node].position[0]
        nodeCube.position.y = nodes[node].position[1] + 0.1
        nodeCube.position.z = nodes[node].position[2]
        points.push(nodeCube.position)
        scene.add(nodeCube)
    }

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 })
    const line = new THREE.Line(lineGeometry, lineMaterial)
    scene.add(line)
}

var progress = 0
function initialiseSlider() {
    const slider = document.getElementById("slider")
    var isDragging = false
    var startX = 0
    var startProgress = 0
    slider.addEventListener("pointerdown", (e) => {
        startX = e.clientX
        startProgress = progress
        isDragging = true
        slider.setPointerCapture(e.pointerId)
    })
    slider.addEventListener("pointerup", (e) => {
        startX = e.clientX
        isDragging = false
    })
    slider.addEventListener("pointermove", (e) => {
        if (!isDragging) {
            return
        }
        progress = startProgress + (e.clientX - startX) / totalDistance / 20
        if (progress < 0) {
            progress = 0
        } else if (progress > 0.999) {
            progress = 0.999
        }
    })
}

function interpolate(a, b, p) {
    var dX = b[0] - a[0]
    var dY = b[1] - a[1]
    var dZ = b[2] - a[2]
    return [a[0] + p * dX, a[1] + p * dY, a[2] + p * dZ]
}

function walk() {
    var currentDist = totalDistance * progress

    var count = 0
    var sum = 0
    for (var i of distances) {
        if (currentDist < sum + i) {
            var between = count
            break
        }
        sum += i
        count += 1
    }
    console.log(count)
    var p = (currentDist - sum) / distances[between]

    var pos = interpolate(nodes[path[between]].position, nodes[path[between + 1]].position, p)

    user.position.x = pos[0]
    user.position.y = pos[1] + 0.5
    user.position.z = pos[2]
}


function createLabel(text, position) {
    var canvas = document.createElement("canvas")
    var context = canvas.getContext("2d")
    canvas.width = 512
    canvas.height = 100
    context.fillStyle = 'white';
    context.font = '48px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2)


    var texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    var material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, depthTest: false });
    var sprite = new THREE.Sprite(material);

    sprite.renderOrder = 6767
    sprite.position.copy(position)
    sprite.scale.set(canvas.width / canvas.height, 1, 1)
    scene.add(sprite)
}



function adjustOpacity(object, height, userHeight) {
    //console.log(object)
    var opacity = 1 / (1 + ((userHeight - height) / 5) ** 2)
    object.traverse((child) => {
        if (child.isMesh) {
            child.material.transparent = true;
            child.material.opacity = opacity;
            child.material.needsUpdate = true;
        }
    });
}


const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x87ceeb);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 5);
dirLight.position.set(10, 10, 10);
scene.add(dirLight);

const camera = createCamera()
const smoother = createSmoother()
const user = createUser()

const cameraHeight = 3
const tug1Length = 2
const tug2Length = 2

var objects = { "base": false, "ground": false, "stairs": false, "lower": false }
const objectHeights = { "base": 0, "ground": 0, "stairs": 6, "lower": 12 }

loadObject("assets/models/base.obj", 0x888888, 0xaaaaaa, 0.3, (object) => {
    objects["base"] = object
});
/*loadObject("assets/models/ground.obj", 0x00aa00, 0x00ff00, 0.9, (object) => {
    objects["ground"] = object
});*/
loadObject("assets/models/stairs.obj", 0x008800, 0x00ff00, 0.3, (object) => {
    objects["stairs"] = object
});
loadObject("assets/models/lower.obj", 0x008800, 0x00ff00, 0.3, (object) => {
    objects["lower"] = object
});

loadGLTF("assets/models/ground.glb", (object) => { objects["ground"] = object; });


drawNodes()
initialiseUser()
initialiseSlider()


var url = new URL(window.location)
if (url.searchParams.get("origin")) {
    var origin = url.searchParams.get("origin")
} else {
    var origin = 1
}
if (url.searchParams.get("target")) {
    var target = url.searchParams.get("target")
} else {
    var target = 2
}

try {
    var path = aStar(origin, target)
    drawPath(path)
    console.log(path)
} catch {
    alert("unable to find path");
    url.searchParams.set("target", 2)
    url.searchParams.set("origin", 1)
    url.searchParams.set("wheelchair", false)
    window.location.replace(url.href)

    // drawPath(path)
}




function animate() {
    requestAnimationFrame(animate);



    for (var o of Object.keys(objects)) {
        if (objects[o] != false) {
            adjustOpacity(objects[o], objectHeights[o], user.position.y)
        }
    }
    // adjustOpacity(object_base, 0, user.position.y)
    // adjustOpacity(object_ground, 0, user.position.y)
    // adjustOpacity(object_stairs, 6, user.position.y)
    // adjustOpacity(object_lower, 12, user.position.y)
    
    walk()
    moveCamera()
    
    
    renderer.render(scene, camera);
}
animate();