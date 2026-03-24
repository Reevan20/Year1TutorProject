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

// var nodes_ground = {'1': {'position': [-1.050261, 7.387952, 4.462231], 'connections': ['2'], 'labels': []}, '2': {'position': [-1.078215, 7.387952, 3.801803], 'connections': ['1', '3', '51', '56'], 'labels': []}, '3': {'position': [-0.316452, 7.387952, 3.801803], 'connections': ['2', '4', '5'], 'labels': []}, '4': {'position': [-0.319946, 7.387952, 4.110469], 'connections': ['3'], 'labels': []}, '5': {'position': [0.200709, 7.387952, 3.787826], 'connections': ['3', '6', '7', '49'], 'labels': []}, '6': {'position': [0.19372, 7.387952, 4.110469], 'connections': ['5'], 'labels': []}, '7': {'position': [0.611292, 7.387952, 3.798309], 'connections': ['5', '8', '9'], 'labels': []}, '8': {'position': [0.611292, 7.387952, 4.110469], 'connections': ['7'], 'labels': []}, '9': {'position': [1.07429, 7.387952, 3.794814], 'connections': ['7', '10'], 'labels': []}, '10': {'position': [2.056197, 7.387952, 3.798309], 'connections': ['9', '11'], 'labels': []}, '11': {'position': [2.416112, 7.387952, 3.794814], 'connections': ['10', '12'], 'labels': []}, '12': {'position': [3.667082, 7.387952, 3.81578], 'connections': ['11', '13', '14', '17'], 'labels': []}, '13': {'position': [3.660093, 7.387952, 4.018451], 'connections': ['12', '15', '16'], 'labels': []}, '14': {'position': [3.667082, 7.387952, 2.945856], 'connections': ['12', '18', '19', '25'], 'labels': []}, '15': {'position': [3.089039, 7.387952, 4.018451], 'connections': ['13'], 'labels': []}, '16': {'position': [4.307964, 7.387952, 4.018451], 'connections': ['13'], 'labels': []}, '17': {'position': [4.26864, 7.387952, 3.81578], 'connections': ['12'], 'labels': []}, '18': {'position': [4.25338, 7.387952, 2.945856], 'connections': ['14'], 'labels': []}, '19': {'position': [3.414034, 7.387952, 2.945856], 'connections': ['14', '20', '21', '22'], 'labels': []}, '20': {'position': [2.44309, 7.387952, 2.945856], 'connections': ['19', '23'], 'labels': []}, '21': {'position': [3.414034, 7.387952, 3.368481], 'connections': ['19'], 'labels': []}, '22': {'position': [3.414034, 7.387952, 2.416037], 'connections': ['19'], 'labels': []}, '23': {'position': [1.190024, 7.387952, 1.550508], 'connections': ['20', '24'], 'labels': []}, '24': {'position': [0.205467, 7.387952, 1.550508], 'connections': ['23', '45', '48', '54', '55'], 'labels': []}, '25': {'position': [3.667082, 7.387952, 2.607853], 'connections': ['14', '26', '27'], 'labels': []}, '26': {'position': [4.148324, 7.387952, 2.607853], 'connections': ['25'], 'labels': []}, '27': {'position': [3.667082, 7.387952, 2.075161], 'connections': ['25', '28', '31'], 'labels': []}, '28': {'position': [4.50017, 7.549944, 2.075161], 'connections': ['27', '29'], 'labels': []}, '29': {'position': [4.50017, 7.586222, 1.874122], 'connections': ['28', '30'], 'labels': []}, '30': {'position': [3.906811, 7.734508, 1.874122], 'connections': ['29'], 'labels': []}, '31': {'position': [3.667082, 7.387952, 1.058662], 'connections': ['27', '32', '33'], 'labels': []}, '32': {'position': [3.21619, 7.387952, 1.058662], 'connections': ['31'], 'labels': []}, '33': {'position': [3.667082, 7.387952, -0.035217], 'connections': ['31', '34', '35'], 'labels': []}, '34': {'position': [3.667082, 7.387952, -1.015767], 'connections': ['33', '36'], 'labels': []}, '35': {'position': [1.328005, 7.387952, -0.035217], 'connections': ['33', '37', '38'], 'labels': []}, '36': {'position': [2.694469, 7.387952, -1.015767], 'connections': ['34', '41'], 'labels': []}, '37': {'position': [0.882847, 7.387952, -0.035217], 'connections': ['35', '39', '40'], 'labels': []}, '38': {'position': [1.328005, 7.387952, 0.453724], 'connections': ['35'], 'labels': []}, '39': {'position': [0.882847, 7.387952, 0.469706], 'connections': ['37'], 'labels': []}, '40': {'position': [0.235171, 7.387952, -0.035217], 'connections': ['37', '41', '42', '44'], 'labels': []}, '41': {'position': [0.235171, 7.387952, -1.086185], 'connections': ['40', '36'], 'labels': []}, '42': {'position': [-0.495755, 7.387952, -0.035217], 'connections': ['40', '43'], 'labels': []}, '43': {'position': [-1.661067, 7.387952, -0.035217], 'connections': ['42', '64', '66'], 'labels': []}, '44': {'position': [0.235171, 7.387952, 0.717001], 'connections': ['40', '45', '46'], 'labels': []}, '45': {'position': [0.235171, 7.387952, 1.046819], 'connections': ['44', '47', '24'], 'labels': []}, '46': {'position': [-0.008975, 7.387952, 0.717001], 'connections': ['44'], 'labels': []}, '47': {'position': [-0.233572, 7.387952, 1.046819], 'connections': ['45'], 'labels': []}, '48': {'position': [-1.345205, 7.387952, 1.550508], 'connections': ['24', '55', '62', '54'], 'labels': []}, '49': {'position': [0.200709, 7.387952, 3.484699], 'connections': ['5', '50', '54'], 'labels': []}, '50': {'position': [-0.167696, 7.387952, 3.484699], 'connections': ['49', '51'], 'labels': []}, '51': {'position': [-1.014196, 7.387952, 3.577403], 'connections': ['50', '2', '52'], 'labels': []}, '52': {'position': [-0.94915, 7.54065, 3.199147], 'connections': ['51', '53'], 'labels': []}, '53': {'position': [-0.547771, 7.819461, 3.199147], 'connections': ['52'], 'labels': []}, '54': {'position': [0.200709, 7.387952, 2.943581], 'connections': ['49', '24', '55', '48'], 'labels': []}, '55': {'position': [-1.31124, 7.387952, 2.943581], 'connections': ['54', '58', '48', '24'], 'labels': []}, '56': {'position': [-1.301666, 7.387952, 3.801803], 'connections': ['2', '57', '58'], 'labels': []}, '57': {'position': [-1.734313, 7.387952, 3.801803], 'connections': ['56'], 'labels': []}, '58': {'position': [-1.301666, 7.387952, 3.409767], 'connections': ['56', '55', '59'], 'labels': []}, '59': {'position': [-1.921339, 7.387952, 3.409767], 'connections': ['58', '60'], 'labels': []}, '60': {'position': [-1.921339, 7.387952, 1.690627], 'connections': ['59', '61'], 'labels': []}, '61': {'position': [-1.921339, 7.387952, 0.968237], 'connections': ['60', '62'], 'labels': []}, '62': {'position': [-1.412673, 7.387952, 0.968237], 'connections': ['61', '48', '63', '64'], 'labels': []}, '63': {'position': [-0.905712, 7.387952, 0.968237], 'connections': ['62'], 'labels': []}, '64': {'position': [-1.412673, 7.387952, 0.304906], 'connections': ['62', '65', '43'], 'labels': []}, '65': {'position': [-0.84301, 7.387952, 0.304906], 'connections': ['64'], 'labels': []}, '66': {'position': [-1.661067, 7.387952, -3.133946], 'connections': ['43', '67', '68', '69'], 'labels': []}, '67': {'position': [-1.661067, 7.387952, -5.065349], 'connections': ['66', '70', '71', '73'], 'labels': []}, '68': {'position': [-2.427854, 7.387952, -3.133946], 'connections': ['66'], 'labels': []}, '69': {'position': [-1.106712, 7.387952, -3.133946], 'connections': ['66'], 'labels': []}, '70': {'position': [-0.841156, 7.387952, -5.205326], 'connections': ['67'], 'labels': []}, '71': {'position': [-1.661067, 7.387952, -6.214759], 'connections': ['67', '72', '74'], 'labels': []}, '72': {'position': [-1.661067, 7.387952, -7.067205], 'connections': ['71'], 'labels': []}, '73': {'position': [-2.533756, 7.387952, -5.316903], 'connections': ['67', '74', '77', '79', '80'], 'labels': []}, '74': {'position': [-2.267821, 7.387952, -6.214759], 'connections': ['71', '73', '75'], 'labels': []}, '75': {'position': [-2.94592, 7.387952, -7.21629], 'connections': ['74', '76'], 'labels': []}, '76': {'position': [-3.460473, 7.387952, -6.355108], 'connections': ['75', '77'], 'labels': []}, '77': {'position': [-3.460473, 7.387952, -5.202911], 'connections': ['76', '78', '73', '79'], 'labels': []}, '78': {'position': [-3.786189, 7.387952, -5.202911], 'connections': ['77'], 'labels': []}, '79': {'position': [-2.923396, 7.387952, -5.583168], 'connections': ['73', '77'], 'labels': []}, '80': {'position': [-2.244756, 7.387952, -5.383342], 'connections': ['73', '81'], 'labels': []}, '81': {'position': [-2.013757, 7.387952, -5.383342], 'connections': ['80', '82'], 'labels': []}, '82': {'position': [-2.013757, 7.793231, -5.919527], 'connections': ['81'], 'labels': []}}
// var nodes_lower = {'83': {'position': [-0.645782, 0.546111, 0.067027], 'connections': ['84', '85', '115', '122'], 'labels': []}, '84': {'position': [-3.130596, 1.820676, 0.067027], 'connections': ['83'], 'labels': []}, '85': {'position': [-0.645782, 0.546111, 1.911154], 'connections': ['83', '86', '87'], 'labels': []}, '86': {'position': [2.355835, 0.546111, 1.911154], 'connections': ['85'], 'labels': []}, '87': {'position': [-2.170134, 0.546111, 1.911154], 'connections': ['85', '88', '116'], 'labels': []}, '88': {'position': [-2.170134, 0.546111, 4.927918], 'connections': ['87', '89'], 'labels': []}, '89': {'position': [-5.455824, 0.546111, 12.376391], 'connections': ['88', '90'], 'labels': []}, '90': {'position': [-8.779146, 0.546111, 12.376391], 'connections': ['89', '91'], 'labels': []}, '91': {'position': [-15.451717, 0.546111, 12.376391], 'connections': ['90', '92'], 'labels': []}, '92': {'position': [-22.504673, 0.546111, 12.376391], 'connections': ['91', '93'], 'labels': []}, '93': {'position': [-22.504673, 0.546111, 3.774303], 'connections': ['92', '94', '100'], 'labels': []}, '94': {'position': [-25.130524, 1.057943, 3.774303], 'connections': ['93', '95'], 'labels': []}, '95': {'position': [-28.758514, 1.057943, 2.681222], 'connections': ['94', '96', '99'], 'labels': []}, '96': {'position': [-28.758514, 1.017232, 4.68328], 'connections': ['95', '97'], 'labels': []}, '97': {'position': [-28.758514, 0.11376, 5.385676], 'connections': ['96', '98'], 'labels': []}, '98': {'position': [-28.758514, 0.11376, 8.996711], 'connections': ['97'], 'labels': []}, '99': {'position': [-28.758514, 1.810546, 0.256207], 'connections': ['95'], 'labels': []}, '100': {'position': [-20.176853, 0.546111, 3.774303], 'connections': ['93', '101', '102'], 'labels': []}, '101': {'position': [-20.176853, 0.546111, 2.611921], 'connections': ['100'], 'labels': []}, '102': {'position': [-18.216293, 0.546111, 3.774303], 'connections': ['100', '103', '105'], 'labels': []}, '103': {'position': [-18.216293, 0.546111, 5.272831], 'connections': ['102', '104'], 'labels': []}, '104': {'position': [-17.175018, 0.546111, 5.272831], 'connections': ['103'], 'labels': []}, '105': {'position': [-16.326145, 0.546111, 3.774303], 'connections': ['102', '106', '107'], 'labels': []}, '106': {'position': [-13.949747, 0.546111, 3.774303], 'connections': ['105'], 'labels': []}, '107': {'position': [-16.326145, 0.546111, 2.513965], 'connections': ['105', '108'], 'labels': []}, '108': {'position': [-11.182433, 0.546111, 2.513965], 'connections': ['107', '109'], 'labels': []}, '109': {'position': [-11.182433, 0.546111, -3.211166], 'connections': ['108', '111', '117'], 'labels': []}, '110': {'position': [-3.772083, 0.546111, -3.211166], 'connections': ['117', '115', '116'], 'labels': []}, '111': {'position': [-11.182433, 0.546111, -6.603554], 'connections': ['109', '112'], 'labels': []}, '112': {'position': [-7.952843, 0.546111, -15.890968], 'connections': ['111', '113', '114'], 'labels': []}, '113': {'position': [-7.952843, 0.546111, -21.083427], 'connections': ['112', '139'], 'labels': []}, '114': {'position': [-3.094793, 0.546111, -15.890968], 'connections': ['112', '124'], 'labels': []}, '115': {'position': [-0.583399, 0.546111, -3.211166], 'connections': ['110', '83'], 'labels': []}, '116': {'position': [-3.752945, 0.546111, 1.911154], 'connections': ['87', '110'], 'labels': []}, '117': {'position': [-7.050107, 0.546111, -3.211166], 'connections': ['110', '109', '118'], 'labels': []}, '118': {'position': [-2.993927, 0.546111, -5.225808], 'connections': ['117', '119'], 'labels': []}, '119': {'position': [-2.993927, 0.546111, -9.879124], 'connections': ['118', '120'], 'labels': []}, '120': {'position': [0.768667, 0.546111, -11.04478], 'connections': ['119', '121', '123', '124'], 'labels': []}, '121': {'position': [0.768667, 0.546111, -3.002362], 'connections': ['120', '122'], 'labels': []}, '122': {'position': [0.729174, 0.546111, 0.067027], 'connections': ['83', '121', '133'], 'labels': []}, '123': {'position': [3.016315, 0.546111, -11.04478], 'connections': ['120', '125'], 'labels': []}, '124': {'position': [0.768667, 0.546111, -15.881039], 'connections': ['120', '114', '138'], 'labels': []}, '125': {'position': [9.297056, 0.546111, -11.04478], 'connections': ['123', '126', '127'], 'labels': []}, '126': {'position': [12.289902, 0.546111, -11.04478], 'connections': ['125', '131'], 'labels': []}, '127': {'position': [9.297056, 0.546111, -5.711398], 'connections': ['125', '128', '129'], 'labels': []}, '128': {'position': [9.297056, 0.546111, -2.036911], 'connections': ['127', '133'], 'labels': []}, '129': {'position': [12.197464, 0.546111, -5.711398], 'connections': ['127', '130'], 'labels': []}, '130': {'position': [12.197464, 0.546111, -2.772952], 'connections': ['129'], 'labels': []}, '131': {'position': [12.289902, 0.546111, -16.197559], 'connections': ['126', '132'], 'labels': []}, '132': {'position': [1.943443, 0.546111, -22.158558], 'connections': ['131', '138'], 'labels': []}, '133': {'position': [9.384602, 0.546111, 0.067027], 'connections': ['122', '128', '134'], 'labels': []}, '134': {'position': [11.667599, 0.546111, 0.067027], 'connections': ['133', '135', '136'], 'labels': []}, '135': {'position': [11.667599, 0.546111, 2.526969], 'connections': ['134'], 'labels': []}, '136': {'position': [13.66077, 0.546111, 0.521299], 'connections': ['134', '137'], 'labels': []}, '137': {'position': [16.425053, 1.824975, 0.521299], 'connections': ['136'], 'labels': []}, '138': {'position': [0.768667, 0.546111, -22.267418], 'connections': ['124', '132', '140'], 'labels': []}, '139': {'position': [-4.4084, 0.546111, -24.316414], 'connections': ['113', '140'], 'labels': []}, '140': {'position': [0.805912, 0.546111, -24.316414], 'connections': ['139', '138', '141'], 'labels': []}, '141': {'position': [0.805912, 0.546111, -27.902477], 'connections': ['140', '142', '145'], 'labels': []}, '142': {'position': [-0.695498, 0.546111, -27.902477], 'connections': ['141', '143', '144'], 'labels': []}, '143': {'position': [-0.695498, 0.546111, -34.912609], 'connections': ['142'], 'labels': []}, '144': {'position': [-5.203815, 0.546111, -27.902477], 'connections': ['142'], 'labels': []}, '145': {'position': [0.805912, 0.546111, -31.279015], 'connections': ['141', '146', '147'], 'labels': []}, '146': {'position': [0.805912, 0.546111, -42.901558], 'connections': ['145', '164', '174'], 'labels': []}, '147': {'position': [2.347326, 0.546111, -31.279015], 'connections': ['145', '148', '150', '151'], 'labels': []}, '148': {'position': [9.264963, 0.546111, -31.279015], 'connections': ['147', '149'], 'labels': []}, '149': {'position': [9.264963, 0.546111, -27.969582], 'connections': ['148'], 'labels': []}, '150': {'position': [2.347326, 0.546111, -28.4543], 'connections': ['147'], 'labels': []}, '151': {'position': [2.347326, 0.546111, -34.425255], 'connections': ['147', '152'], 'labels': []}, '152': {'position': [2.347326, 0.546111, -35.666981], 'connections': ['151', '153', '154'], 'labels': []}, '153': {'position': [7.426891, 0.546111, -35.666981], 'connections': ['152', '155', '159'], 'labels': []}, '154': {'position': [2.347326, 0.546111, -40.560543], 'connections': ['152'], 'labels': []}, '155': {'position': [8.788553, 0.546111, -35.666981], 'connections': ['153', '156', '158'], 'labels': []}, '156': {'position': [13.538509, 0.546111, -35.666981], 'connections': ['155', '157'], 'labels': []}, '157': {'position': [13.538509, 0.546111, -37.989117], 'connections': ['156'], 'labels': []}, '158': {'position': [8.788553, 0.546111, -38.444317], 'connections': ['155', '160'], 'labels': []}, '159': {'position': [7.426891, 0.546111, -40.462959], 'connections': ['153'], 'labels': []}, '160': {'position': [9.35998, 0.546111, -38.444317], 'connections': ['158', '161', '162'], 'labels': []}, '161': {'position': [12.041252, 0.546111, -38.444317], 'connections': ['160', '163'], 'labels': []}, '162': {'position': [9.35998, 0.546111, -40.943218], 'connections': ['160'], 'labels': []}, '163': {'position': [12.041252, 0.546111, -40.369282], 'connections': ['161', '178'], 'labels': []}, '164': {'position': [-1.558193, 0.546111, -42.901558], 'connections': ['146', '165', '173'], 'labels': []}, '165': {'position': [-5.456581, 0.546111, -42.901558], 'connections': ['164', '166', '172'], 'labels': []}, '166': {'position': [-9.6163, 0.546111, -42.901558], 'connections': ['165', '167', '171'], 'labels': []}, '167': {'position': [-14.20619, 0.546111, -42.901558], 'connections': ['166', '168', '170'], 'labels': []}, '168': {'position': [-15.554582, 0.546111, -42.901558], 'connections': ['167', '169'], 'labels': []}, '169': {'position': [-17.10393, 0.546111, -41.961887], 'connections': ['168', '185'], 'labels': []}, '170': {'position': [-14.20619, 0.546111, -44.333832], 'connections': ['167'], 'labels': []}, '171': {'position': [-9.6163, 0.546111, -44.100357], 'connections': ['166'], 'labels': []}, '172': {'position': [-5.456581, 0.546111, -44.414742], 'connections': ['165'], 'labels': []}, '173': {'position': [-1.558193, 0.546111, -44.484772], 'connections': ['164'], 'labels': []}, '174': {'position': [2.494667, 0.546111, -42.901558], 'connections': ['146', '175', '184'], 'labels': []}, '175': {'position': [6.597855, 0.546111, -42.901558], 'connections': ['174', '176', '183'], 'labels': []}, '176': {'position': [10.770319, 0.546111, -42.901558], 'connections': ['175', '177', '182'], 'labels': []}, '177': {'position': [12.271103, 0.546111, -42.901558], 'connections': ['176', '178', '181'], 'labels': []}, '178': {'position': [12.041252, 0.546111, -41.38308], 'connections': ['163', '177', '179'], 'labels': []}, '179': {'position': [13.956306, 0.546111, -41.38308], 'connections': ['178', '180'], 'labels': []}, '180': {'position': [16.615055, 2.479241, -41.38308], 'connections': ['179'], 'labels': []}, '181': {'position': [14.842873, 0.546111, -42.901558], 'connections': ['177'], 'labels': []}, '182': {'position': [10.770319, 0.546111, -44.94614], 'connections': ['176'], 'labels': []}, '183': {'position': [6.597855, 0.546111, -44.543594], 'connections': ['175'], 'labels': []}, '184': {'position': [2.494667, 0.546111, -44.833416], 'connections': ['174'], 'labels': []}, '185': {'position': [-17.365225, 0.546111, -40.879436], 'connections': ['169', '186'], 'labels': []}, '186': {'position': [-18.650406, 0.546111, -40.636837], 'connections': ['185', '187'], 'labels': []}, '187': {'position': [-18.650406, 2.069588, -38.24263], 'connections': ['186'], 'labels': []}}


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
    const geometry = new THREE.BoxGeometry(.25, .5, .25);
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

function walk(path) {
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
    var opacity = 1 / (1 + ((userHeight - height) / 1) ** 2)
    if (opacity < 0.5) {
        object.visible = false
    } else {
        object.visible = true
    }
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

const cameraHeight = 1.5
const tug1Length = 1
const tug2Length = 1

var objects = { "base": false, "ground": false, "stairs": false, "lower": false }
const objectHeights = { "ground": 1.76793, "lower": 3.046111, "first": 4.840171, "second":6.621951 }

// loadObject("assets/models/base.obj", 0x888888, 0xaaaaaa, 0.3, (object) => {
//     objects["base"] = object
// });
// /*loadObject("assets/models/ground.obj", 0x00aa00, 0x00ff00, 0.9, (object) => {
//     objects["ground"] = object
// });*/
// loadObject("assets/models/stairs.obj", 0x008800, 0x00ff00, 0.3, (object) => {
//     objects["stairs"] = object
// });
// loadObject("assets/models/lower.obj", 0x008800, 0x00ff00, 0.3, (object) => {
//     objects["lower"] = object
// });

loadGLTF("assets/aligned_models/glb/second.glb", (object) => {
    objects["second"] = object;
});

loadGLTF("assets/aligned_models/glb/first.glb", (object) => {
    objects["first"] = object;
});

loadGLTF("assets/aligned_models/glb/lower.glb", (object) => {
    objects["lower"] = object;
});

loadGLTF("assets/aligned_models/glb/ground.glb", (object) => {
    objects["ground"] = object;
});


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

export function initialisePath(origin, target) {
    try {
        var path = aStar(origin, target)
        drawPath(path)
        console.log("Path: " + path)
        localStorage.setItem("path", JSON.stringify(path))
    } catch {
        alert("unable to find path");
        url.searchParams.set("target", 2)
        url.searchParams.set("origin", 1)
        url.searchParams.set("wheelchair", false)

        var path = aStar(1, 2)
        drawPath(path)
        console.log("Path: " + path)
        localStorage.setItem("path", JSON.stringify(path))
        // window.location.replace(url.href)
        // drawPath(path)
    }
}

initialisePath(origin, target);

function animate() {
    requestAnimationFrame(animate);



    for (var o of Object.keys(objects)) {
        if (objects[o] != false) {
            adjustOpacity(objects[o], objectHeights[o], user.position.y)
        }
    }
    console.log("y")
    console.log(user.position.y)
    // adjustOpacity(object_base, 0, user.position.y)
    // adjustOpacity(object_ground, 0, user.position.y)
    // adjustOpacity(object_stairs, 6, user.position.y)
    // adjustOpacity(object_lower, 12, user.position.y)

    walk(JSON.parse(localStorage.getItem("path")));
    moveCamera()


    renderer.render(scene, camera);
}
animate();