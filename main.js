import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.165.0/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://unpkg.com/three@0.165.0/examples/jsm/loaders/OBJLoader.js';



// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
// import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/OBJLoader.js';


// import * as THREE from "./js/three.module.js"
// import {OBJLoader} from "./js/loaders/OBJLoader.js"

// import * as THREE from 'https://unpkg.com/three@0.165.0/build/three.module.js';
// import { OrbitControls } from 'https://unpkg.com/three@0.165.0/examples/jsm/controls/OrbitControls.js';
// import { OBJLoader } from 'https://unpkg.com/three@0.165.0/examples/jsm/loaders/OBJLoader.js';

const KILBURN_GROUND_FLOOR_MAP = "Assets/kbgf.jpg"
const ROOMS_OBJECT = "Assets/rooms.obj"
const MAP_OBJECT = "Assets/map.obj"
const DOORFRAMES_OBJECT = "Assets/doorframes.obj"
const CORRIDORS_OBJECT = "Assets/corridors.obj"

let progress = 0;
function InitialiseSlider() {
    const slider = document.getElementById("slider")

    let isDragging = false
    let startX = 0
    let startProgress = 0
    slider.addEventListener("pointerdown", (e) => {
        startX = e.clientX
        startProgress = progress
        isDragging = true
        slider.setPointerCapture(e.pointerId)
        // console.log("down")
        // console.log("progress right now "+progress)
        // console.log("start progress now "+startProgress)
    })
    slider.addEventListener("pointerup", (e) => {
        startX = e.clientX
        // console.log("up")
        isDragging = false
    })
    slider.addEventListener("pointermove", (e) => {

        if (!isDragging) {
            return
        }
        // console.log("moving!")

        // console.log("start progress now "+startProgress)
        // console.log("progress now "+progress)
        progress = startProgress + (e.clientX - startX) / 1000
        // console.log("progress after move "+progress)
        if (progress < 0) {
            progress = 0
        } else if (progress > 0.999) {
            progress = 0.999
        }

    })
}
InitialiseSlider();


const PathFinder = {
    aStar(start, end) {
        open = {} // {0:[cost, heuristic, parent]}
        open[start] = [0, this.dist(start, end), -1]
        //console.log(open)
        close = {}
        while (Object.keys(open).length >= 1) {
            var lowest = Object.entries(open).sort(([, a], [, b]) => { // sort by total cost (low to high)
                return a[0] + a[1] - b[0] - b[1]
            })[0]

            close[lowest[0]] = lowest[1]
            delete open[lowest[0]]


            for (var conn of PathFinder.nodes[lowest[0]]["connections"]) {
                if (!Object.keys(close).includes(conn)) {
                    var c = lowest[1][0] + this.dist(lowest[0], conn)
                    if (!Object.keys(open).includes(conn)) {
                        // add to open
                        open[conn] = [c, this.dist(conn, end), lowest[0]]
                    } else if (c >= open[conn][0]) {
                        continue // this path is worse
                    }

                }
            }
            if (lowest[0] == end) {
                console.log("reached")
                break
            }
        }
        return close

    },

    trace(start, end, path) {
        var jeff = [end]
        var curr = end
        while (true) {
            var prev = path[curr][2]
            jeff.push(parseInt(prev))
            if (prev == start) {
                break
            }
            curr = prev
        }
        return jeff.reverse()
    },

    dist(start, end) {
        var p1 = this.nodes[start]["position"]
        var p2 = this.nodes[end]["position"]
        return ((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2) ** 0.5
    },

    points: [],
    distances: [],
    totalDistance: 0,

    resetCamera(camera, user, smoother, tugLength, smootherLength, cameraHeight) {
        smoother.position.copy(user.position)
        smoother.z += smootherLength
        camera.position.copy(smoother.position)
        camera.z += tugLength
        camera.translateY(2.5)
    },

    start(scene, scale, begin, end) {
        const nodeGeometry = new THREE.BoxGeometry(.1, .1, .1)
        const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff })

        var cl = this.aStar(begin, end)
        var path = this.trace(begin, end, cl)
        // points = []
        // distances = []
        var first = true
        var lastPoint = []

        for (var n of path) {
            var posX = this.nodes[n].position[0] * scale
            var posZ = this.nodes[n].position[1] * scale
            if (!first) {
                this.distances.push(((posX - lastPoint[0]) ** 2 + (posZ - lastPoint[1]) ** 2) ** 0.5)
            }

            var first = false
            const nodeCube = new THREE.Mesh(nodeGeometry, nodeMaterial)
            nodeCube.position.x = posX
            nodeCube.position.z = posZ
            this.points.push(new THREE.Vector3(posX, .025, posZ))
            scene.add(nodeCube)
            lastPoint = [posX, posZ]
        }

        const lineGeometry = new THREE.BufferGeometry().setFromPoints(this.points)
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 })
        const line = new THREE.Line(lineGeometry, lineMaterial)
        scene.add(line)
        this.totalDistance = this.distances.reduce((sum, i) => sum + i, 0)
        console.log(this.distances)
        console.log(this.totalDistance)


    },

    //const nodes = {'0': {'position': [1459, 2005], 'connections': ['1'], 'labels': ['Main Entrance']}, '1': {'position': [1459, 1969], 'connections': ['0', '2', '7'], 'labels': []}, '2': {'position': [1393, 1969], 'connections': ['1', '3', '4'], 'labels': []}, '3': {'position': [1394, 2007], 'connections': ['2'], 'labels': ['Main Entrance']}, '4': {'position': [1392, 1923], 'connections': ['2', '5'], 'labels': []}, '5': {'position': [1392, 1872], 'connections': ['4', '6'], 'labels': []}, '6': {'position': [1456, 1871], 'connections': ['5', '7', '8'], 'labels': []}, '7': {'position': [1458, 1924], 'connections': ['6', '1'], 'labels': []}, '8': {'position': [1534, 1871], 'connections': ['6', '9', '10'], 'labels': []}, '9': {'position': [1535, 1907], 'connections': ['8'], 'labels': ['G6']}, '10': {'position': [1616, 1872], 'connections': ['8', '11', '12', '59'], 'labels': []}, '11': {'position': [1616, 1907], 'connections': ['10'], 'labels': ['G7']}, '12': {'position': [1679, 1872], 'connections': ['10', '13', '14'], 'labels': []}, '13': {'position': [1679, 1906], 'connections': ['12'], 'labels': ['G8']}, '14': {'position': [1752, 1873], 'connections': ['12', '15', '17'], 'labels': []}, '15': {'position': [1753, 1908], 'connections': ['14'], 'labels': ['G11']}, '17': {'position': [1906, 1873], 'connections': ['14', '18', '19'], 'labels': []}, '18': {'position': [1907, 1903], 'connections': ['17'], 'labels': ['G12']}, '19': {'position': [1954, 1874], 'connections': ['17', '20', '21'], 'labels': []}, '20': {'position': [1956, 1903], 'connections': ['19'], 'labels': ['G13']}, '21': {'position': [2153, 1874], 'connections': ['19', '22', '25', '26'], 'labels': []}, '22': {'position': [2154, 1909], 'connections': ['21', '23', '24'], 'labels': []}, '23': {'position': [2105, 1910], 'connections': ['22'], 'labels': ['G14']}, '24': {'position': [2198, 1912], 'connections': ['22'], 'labels': ['G16']}, '25': {'position': [2192, 1873], 'connections': ['21'], 'labels': ['G6']}, '26': {'position': [2152, 1740], 'connections': ['21', '27', '33'], 'labels': []}, '27': {'position': [2108, 1738], 'connections': ['26', '28', '29', '30'], 'labels': []}, '28': {'position': [2109, 1780], 'connections': ['27'], 'labels': []}, '29': {'position': [2108, 1697], 'connections': ['27'], 'labels': ['Toilet']}, '30': {'position': [2029, 1738], 'connections': ['27', '31'], 'labels': []}, '31': {'position': [1854, 1639], 'connections': ['30', '32'], 'labels': ['G23', 'Computer Lab']}, '32': {'position': [1677, 1530], 'connections': ['31', '58'], 'labels': []}, '33': {'position': [2152, 1720], 'connections': ['26', '34', '35'], 'labels': []}, '34': {'position': [2200, 1720], 'connections': ['33'], 'labels': ['G18']}, '35': {'position': [2153, 1687], 'connections': ['33', '36', '37'], 'labels': []}, '36': {'position': [2198, 1688], 'connections': ['35'], 'labels': ['G20']}, '37': {'position': [2155, 1651], 'connections': ['35', '38'], 'labels': []}, '38': {'position': [2153, 1600], 'connections': ['37', '39'], 'labels': []}, '39': {'position': [2153, 1551], 'connections': ['38', '40'], 'labels': []}, '40': {'position': [2154, 1439], 'connections': ['39', '41', '42'], 'labels': []}, '41': {'position': [2119, 1441], 'connections': ['40'], 'labels': ['G33a']}, '42': {'position': [2155, 1310], 'connections': ['40', '43', '44'], 'labels': ['G33', 'Research Lab']}, '43': {'position': [2155, 1192], 'connections': ['42', '62'], 'labels': []}, '44': {'position': [1821, 1306], 'connections': ['42', '45'], 'labels': []}, '45': {'position': [1800, 1306], 'connections': ['44', '46', '47'], 'labels': []}, '46': {'position': [1799, 1335], 'connections': ['45'], 'labels': ['G35']}, '47': {'position': [1740, 1305], 'connections': ['45', '48'], 'labels': ['G36']}, '48': {'position': [1716, 1305], 'connections': ['47', '49', '50'], 'labels': []}, '49': {'position': [1718, 1335], 'connections': ['48'], 'labels': ['G37']}, '50': {'position': [1626, 1302], 'connections': ['48', '51', '54', '60'], 'labels': []}, '51': {'position': [1587, 1300], 'connections': ['50', '52'], 'labels': []}, '52': {'position': [1507, 1299], 'connections': ['51', '53'], 'labels': ['G105']}, '53': {'position': [1405, 1299], 'connections': ['52', '64'], 'labels': []}, '54': {'position': [1623, 1404], 'connections': ['50', '55', '56'], 'labels': []}, '55': {'position': [1587, 1402], 'connections': ['54'], 'labels': ['Toilet', 'Women']}, '56': {'position': [1623, 1454], 'connections': ['54', '57', '58'], 'labels': []}, '57': {'position': [1582, 1454], 'connections': ['56'], 'labels': []}, '58': {'position': [1622, 1530], 'connections': ['56', '32', '59'], 'labels': []}, '59': {'position': [1623, 1838], 'connections': ['58', '10'], 'labels': []}, '60': {'position': [1625, 1171], 'connections': ['50', '61'], 'labels': []}, '61': {'position': [1863, 1170], 'connections': ['60', '62'], 'labels': ['G41', 'Collab Space']}, '62': {'position': [2130, 1169], 'connections': ['61', '43'], 'labels': []}, '64': {'position': [1405, 1340], 'connections': ['53', '65'], 'labels': []}, '65': {'position': [1434, 1340], 'connections': ['64'], 'labels': ['Toilet', 'Men']}}

    nodes: { '0': { 'position': [1459.5, 2006], 'connections': ['1'], 'labels': ['Main Entrance'] }, '1': { 'position': [1459.5, 1969], 'connections': ['0', '2', '7'], 'labels': [] }, '2': { 'position': [1394.3333333333333, 1969], 'connections': ['1', '3', '4'], 'labels': [] }, '3': { 'position': [1394.3333333333333, 2006], 'connections': ['2'], 'labels': ['Main Entrance'] }, '4': { 'position': [1394.3333333333333, 1923.5], 'connections': ['2', '5'], 'labels': [] }, '5': { 'position': [1394.3333333333333, 1872.5], 'connections': ['4', '6', '66'], 'labels': [] }, '6': { 'position': [1459.5, 1872.5], 'connections': ['5', '7', '8'], 'labels': [] }, '7': { 'position': [1459.5, 1923.5], 'connections': ['6', '1'], 'labels': [] }, '8': { 'position': [1534.5, 1872.5], 'connections': ['6', '9', '10'], 'labels': [] }, '9': { 'position': [1534.5, 1907.2222222222222], 'connections': ['8'], 'labels': ['G6'] }, '10': { 'position': [1616.0, 1872.5], 'connections': ['8', '11', '12', '59'], 'labels': [] }, '11': { 'position': [1616.0, 1907.2222222222222], 'connections': ['10'], 'labels': ['G7'] }, '12': { 'position': [1679.0, 1872.5], 'connections': ['10', '13', '14'], 'labels': [] }, '13': { 'position': [1679.0, 1907.2222222222222], 'connections': ['12'], 'labels': ['G8'] }, '14': { 'position': [1752.5, 1872.5], 'connections': ['12', '15', '17'], 'labels': [] }, '15': { 'position': [1752.5, 1907.2222222222222], 'connections': ['14'], 'labels': ['G11'] }, '17': { 'position': [1906.5, 1872.5], 'connections': ['14', '18', '19'], 'labels': [] }, '18': { 'position': [1906.5, 1907.2222222222222], 'connections': ['17'], 'labels': ['G12'] }, '19': { 'position': [1955.0, 1872.5], 'connections': ['17', '20', '21'], 'labels': [] }, '20': { 'position': [1955.0, 1907.2222222222222], 'connections': ['19'], 'labels': ['G13'] }, '21': { 'position': [2153.5454545454545, 1872.5], 'connections': ['19', '22', '25', '26'], 'labels': [] }, '22': { 'position': [2153.5454545454545, 1907.2222222222222], 'connections': ['21', '23', '24'], 'labels': [] }, '23': { 'position': [2105, 1907.2222222222222], 'connections': ['22'], 'labels': ['G14'] }, '24': { 'position': [2197, 1907.2222222222222], 'connections': ['22'], 'labels': ['G16'] }, '25': { 'position': [2197, 1872.5], 'connections': ['21'], 'labels': ['G6'] }, '26': { 'position': [2153.5454545454545, 1738.6666666666667], 'connections': ['21', '27', '33'], 'labels': [] }, '27': { 'position': [2108.3333333333335, 1738.6666666666667], 'connections': ['26', '28', '29', '30'], 'labels': [] }, '28': { 'position': [2108.3333333333335, 1780], 'connections': ['27'], 'labels': [] }, '29': { 'position': [2108.3333333333335, 1697], 'connections': ['27'], 'labels': ['Toilet', 'Men'] }, '30': { 'position': [2029, 1738.6666666666667], 'connections': ['27', '31'], 'labels': [] }, '31': { 'position': [1854, 1639], 'connections': ['30', '32'], 'labels': ['G23', 'Computer Lab'] }, '32': { 'position': [1677, 1531.0], 'connections': ['31', '58'], 'labels': [] }, '33': { 'position': [2153.5454545454545, 1720], 'connections': ['26', '34', '35'], 'labels': [] }, '34': { 'position': [2197, 1720], 'connections': ['33'], 'labels': ['G18'] }, '35': { 'position': [2153.5454545454545, 1687.5], 'connections': ['33', '36', '37'], 'labels': [] }, '36': { 'position': [2197, 1687.5], 'connections': ['35'], 'labels': ['G20'] }, '37': { 'position': [2153.5454545454545, 1651], 'connections': ['35'], 'labels': [] }, '38': { 'position': [2153.5454545454545, 1600], 'connections': [], 'labels': [] }, '39': { 'position': [2153.5454545454545, 1551], 'connections': ['40'], 'labels': [] }, '40': { 'position': [2153.5454545454545, 1440], 'connections': ['39', '41', '42'], 'labels': [] }, '41': { 'position': [2119, 1440], 'connections': ['40'], 'labels': ['G33a'] }, '42': { 'position': [2153.5454545454545, 1303.4], 'connections': ['40', '43', '44'], 'labels': ['G33', 'Research Lab'] }, '43': { 'position': [2153.5454545454545, 1192], 'connections': ['42'], 'labels': [] }, '44': { 'position': [1821, 1303.4], 'connections': ['42', '45'], 'labels': [] }, '45': { 'position': [1799.5, 1303.4], 'connections': ['44', '46', '47'], 'labels': [] }, '46': { 'position': [1799.5, 1335], 'connections': ['45'], 'labels': ['G35'] }, '47': { 'position': [1740, 1303.4], 'connections': ['45', '48'], 'labels': ['G36'] }, '48': { 'position': [1717.0, 1303.4], 'connections': ['47', '49', '50'], 'labels': [] }, '49': { 'position': [1717.0, 1335], 'connections': ['48'], 'labels': ['G37'] }, '50': { 'position': [1626.4285714285713, 1303.4], 'connections': ['48', '51', '54', '92'], 'labels': [] }, '51': { 'position': [1587, 1303.4], 'connections': ['50', '52'], 'labels': [] }, '52': { 'position': [1507, 1303.4], 'connections': ['51', '53'], 'labels': ['G105'] }, '53': { 'position': [1394.3333333333333, 1303.4], 'connections': ['52', '64', '74'], 'labels': [] }, '54': { 'position': [1626.4285714285713, 1403], 'connections': ['50', '55', '56'], 'labels': [] }, '55': { 'position': [1587, 1403], 'connections': ['54'], 'labels': ['Toilet', 'Women'] }, '56': { 'position': [1626.4285714285713, 1454], 'connections': ['54', '57', '58'], 'labels': [] }, '57': { 'position': [1582, 1454], 'connections': ['56'], 'labels': [] }, '58': { 'position': [1626.4285714285713, 1531.0], 'connections': ['56', '32', '59', '67'], 'labels': [] }, '59': { 'position': [1626.4285714285713, 1838], 'connections': ['58', '10'], 'labels': [] }, '60': { 'position': [1626.4285714285713, 1170], 'connections': ['61'], 'labels': [] }, '61': { 'position': [1863, 1170], 'connections': ['60', '62'], 'labels': ['G41', 'Collab Space'] }, '62': { 'position': [2130, 1170], 'connections': ['61'], 'labels': [] }, '64': { 'position': [1394.3333333333333, 1340.6666666666667], 'connections': ['53', '65', '68', '75', '69'], 'labels': [] }, '65': { 'position': [1434, 1340.6666666666667], 'connections': ['64'], 'labels': ['Toilet', 'Men'] }, '66': { 'position': [1394.3333333333333, 1817.5], 'connections': ['5', '67', '72'], 'labels': [] }, '67': { 'position': [1394.3333333333333, 1531.0], 'connections': ['66', '68', '58'], 'labels': [] }, '68': { 'position': [1394.3333333333333, 1448.3333333333333], 'connections': ['67', '69', '73', '64', '75'], 'labels': [] }, '69': { 'position': [1296.6666666666667, 1448.3333333333333], 'connections': ['68', '70', '75', '64'], 'labels': [] }, '70': { 'position': [1296.6666666666667, 1498], 'connections': ['69', '71'], 'labels': [] }, '71': { 'position': [1296.6666666666667, 1675], 'connections': ['70', '72'], 'labels': ['ITS Help Desk'] }, '72': { 'position': [1351, 1817.5], 'connections': ['71', '66'], 'labels': [] }, '73': { 'position': [1429, 1448.3333333333333], 'connections': ['68'], 'labels': ['Toilet'] }, '74': { 'position': [1328.0, 1303.4], 'connections': ['53', '75', '76'], 'labels': [] }, '75': { 'position': [1328.0, 1340.6666666666667], 'connections': ['74', '64', '69', '68'], 'labels': [] }, '76': { 'position': [1328.0, 817.6666666666666], 'connections': ['74', '77', '78', '79'], 'labels': [] }, '77': { 'position': [1397, 817.6666666666666], 'connections': ['76'], 'labels': ['ITS Office 2'] }, '78': { 'position': [1277, 817.6666666666666], 'connections': ['76'], 'labels': ['ITS Office 1'] }, '79': { 'position': [1328.0, 505.0], 'connections': ['80', '80', '90', '76'], 'labels': [] }, '80': { 'position': [1218.2, 505.0], 'connections': ['79', '81', '87'], 'labels': [] }, '81': { 'position': [1218.2, 351.0], 'connections': ['80', '82'], 'labels': [] }, '82': { 'position': [1218.2, 317.0], 'connections': ['81', '83'], 'labels': [] }, '83': { 'position': [1218.2, 249.33333333333334], 'connections': ['82', '93'], 'labels': [] }, '84': { 'position': [1082.9874999999997, 249.33333333333334], 'connections': ['85', '93'], 'labels': [] }, '85': { 'position': [1082.9874999999997, 317.0], 'connections': ['84', '86'], 'labels': [] }, '86': { 'position': [1082.9874999999997, 405], 'connections': ['85', '87'], 'labels': [] }, '87': { 'position': [1082.9874999999997, 505.0], 'connections': ['86', '88', '80'], 'labels': [] }, '88': { 'position': [1020, 505.0], 'connections': ['87'], 'labels': [] }, '90': { 'position': [1481, 505.0], 'connections': ['79'], 'labels': [] }, '92': { 'position': [1626.4285714285713, 1200], 'connections': ['50'], 'labels': [] }, '93': { 'position': [1150, 249.33333333333334], 'connections': ['83', '84'], 'labels': ['Back Entrance'] } }

}

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x87ceeb);


const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//const image = new THREE.TextureLoader().load("kbgf.jpg")
function loadImage(imageFile) {
    return new THREE.TextureLoader().load(imageFile, (tex) => {
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.NearestFilter;
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        tex.generateMipmaps = false;
    });
}

function createPlane(scene) {
    const image = loadImage(KILBURN_GROUND_FLOOR_MAP);
    const mapMaterial = new THREE.MeshBasicMaterial({ map: image })
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(130, 100), mapMaterial)

    plane.position.x = 65
    plane.position.z = 50
    plane.rotation.x = -Math.PI / 2
    scene.add(plane)
}

createPlane(scene);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

function loadObject(loader, objectFile, materialColor, lineColor) {
    loader.load(objectFile, (object) => {
        object.scale.set(.65, .65, .65)
        object.position.set(0, 0, 100)
        object.traverse((child) => {
            if (child.isMesh) {

                child.material = new THREE.MeshStandardMaterial({
                    color: materialColor,
                    transparent: true,
                    opacity: 0.3,
                    side: THREE.DoubleSide,
                });

                const edges = new THREE.EdgesGeometry(child.geometry);
                const line = new THREE.LineSegments(
                    edges,
                    new THREE.LineBasicMaterial({ color: lineColor })
                );
                child.add(line);
            }
        });
        scene.add(object)
    },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error('An error occurred:', error);
        })
}

function loadCorridors(loader) {
    loadObject(loader, CORRIDORS_OBJECT, 0x008800, 0x00ff00);
}

function loadRooms(loader) {
    loadObject(loader, ROOMS_OBJECT, 0x880088, 0xff00ff)
}

function loadDoorframes(loader) {
    loadObject(loader, DOORFRAMES_OBJECT, 0x000088, 0x0000ff);
}

function loadAllObjects(loader) {
    loadCorridors(loader);
    loadRooms(loader);
    loadDoorframes(loader);
}

const loader = new OBJLoader()
loadAllObjects(loader);

function createUser(origin) {
    const geometry = new THREE.BoxGeometry(.3, 1, .3);
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const user = new THREE.Mesh(geometry, boxMaterial);

    var originPos = PathFinder.nodes[origin + ""]["position"]

    user.position.x = originPos[0] * scale
    user.position.z = originPos[1] * scale
    scene.add(user);

    return user;
}

function createSmoother(origin, smootherLength) {
    const smootherMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    const smootherGeometry = new THREE.BoxGeometry(1, 1, 1);
    var smoother = new THREE.Mesh(smootherGeometry, smootherMaterial);
    var originPos = PathFinder.nodes[origin]["position"]
    smoother.position.x = originPos[0]
    smoother.position.z = originPos[1] + smootherLength
    console.log(smoother.position)
    return smoother
}





function initialiseCamera(camera, cameraHeight, origin, tugLength, smootherLength) {
    // camera.lookAt(new THREE.Vector3(0, -1, 0))
    var originPos = PathFinder.nodes[origin]["position"]
    console.log(originPos)
    camera.position.x = originPos[0]
    camera.position.z = originPos[1] + smootherLength + tugLength
    camera.position.y = cameraHeight
    // camera.position.z=100
    // camera.position.x=130
    // camera.position.y=50
    console.log(camera.position)
    console.log("fr2")
    camera.lookAt(user.position)
    moveCamera()
}


function moveCamera() {

    var xDiff = user.position.x - smoother.position.x
    var zDiff = user.position.z - smoother.position.z
    var distance = (xDiff ** 2 + zDiff ** 2) ** 0.5

    var mult = smootherLength / distance
    // console.log(smoother.position)
    // console.log("xdiff "+xDiff)
    // console.log("zdiff "+zDiff)
    // console.log("distance "+distance)
    // console.log("mult "+mult)
    // console.log("userpos "+JSON.stringify(user.position))
    smoother.position.x = user.position.x - xDiff * mult
    smoother.position.z = user.position.z - zDiff * mult
    // console.log(smoother.position)
    // smoother.position.x +=(user.position.x-smoother.position.x)*0.1
    // smoother.position.z +=(user.position.z-smoother.position.z)*0.05



    xDiff = smoother.position.x - camera.position.x
    zDiff = smoother.position.z - camera.position.z

    distance = (xDiff ** 2 + zDiff ** 2) ** 0.5
    mult = tugLength / distance
    camera.position.x = smoother.position.x - xDiff * mult
    camera.position.z = smoother.position.z - zDiff * mult
    camera.lookAt(user.position)

    xDiff = smoother.position.x - camera.position.x
    zDiff = smoother.position.z - camera.position.z

    distance = (xDiff ** 2 + zDiff ** 2) ** 0.5
    mult = tugLength / distance
    // camera.position.x = smoother.position.x - xDiff*mult
    // camera.position.z = smoother.position.z - zDiff*mult
    // camera.lookAt(user.position)

}


function interpolate(a, b, p) {
    var dX = b.x - a.x
    var dZ = b.z - a.z
    return [a.x + p * dX, a.z + p * dZ]
}

function walk() {
    var currentDist = PathFinder.totalDistance * progress

    var count = 0
    var sum = 0
    for (var i of PathFinder.distances) {
        if (currentDist < sum + i) {
            var between = parseInt(count)

            break
        }
        sum += i
        count += 1
    }
    var p = (currentDist - sum) / PathFinder.distances[between]

    var pos = interpolate(PathFinder.points[between], PathFinder.points[between + 1], p)

    user.position.x = pos[0]
    user.position.z = pos[1]



}

function getNodeInputs() {
    // Use sessionStorage for start and end nodes?
    origin = sessionStorage.getItem("start");
    target = sessionStorage.getItem("end");

    return (origin, target)
}

var origin = 84
var target = 23
const scale = 130 / 3008;
const tugLength = 2.5;
const smootherLength = 1;

const cameraHeight = 2.5

const user = createUser(origin);
const smoother = createSmoother(origin, smootherLength);

console.log(scale)

// scene.add(smoother)


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000);
camera.position.set(0, 0, 0)
console.log(camera.position)
initialiseCamera(camera, cameraHeight, origin, tugLength, smootherLength);
console.log(camera.position)


PathFinder.start(scene, scale, origin, target)
// PathFinder.resetCamera(camera, user, smoother, tugLength, smootherLength, cameraHeight)
console.log("resetted")
function animate() {
    // console.log(camera.position)
    requestAnimationFrame(animate);
    // user.position.x += 0.01
    // progress += 0.0004
    // if (progress >=1) {
    //   progress = 0
    // }
    walk()
    moveCamera()
    // console.log(progress)
    renderer.render(scene, camera);
}
animate();

