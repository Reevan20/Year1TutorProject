import pygame
import numpy as np
import copy

pygame.init()

pygame.font.init()
fontBig = pygame.font.SysFont("Arial", 50)
fontSmall = pygame.font.SysFont("Arial", 20)


# zoomFactor = 1
clock = pygame.time.Clock()
camCoords = np.array([0, 0])


screen = pygame.display.set_mode((1800,1000))



image = pygame.image.load("Assets/kbgf.jpg")

groundSurface = pygame.Surface(image.get_size())


# def addTuple(a, b):
#     return tuple([a[i] + b[i] for i in range(len(a))])
#
# def subTuple(a, b):
#     return tuple([a[i] - b[i] for i in range(len(a))])
#
# def scaleTuple(a, b):
#     return tuple([a[i] * b for i in range(len(a))])
#
# def roundTuple(a):
#     return tuple([round(i) for i in a])

status = True
clicking = False
offset = np.array([0,0])
mouseDownPos = np.array([0,0])
mouseUpPos = np.array([0,0])

dots = {'0': {'position': [1458, 2006], 'connections': ['1'], 'labels': ['Main Entrance']}, '1': {'position': [1458, 1969], 'connections': ['0', '2', '7'], 'labels': []}, '2': {'position': [1392.75, 1969], 'connections': ['1', '3', '4'], 'labels': []}, '3': {'position': [1392.75, 2006], 'connections': ['2'], 'labels': ['Main Entrance']}, '4': {'position': [1392.75, 1923.5], 'connections': ['2', '5'], 'labels': []}, '5': {'position': [1392.75, 1872.5], 'connections': ['4', '6'], 'labels': []}, '6': {'position': [1458, 1872.5], 'connections': ['5', '7', '8'], 'labels': []}, '7': {'position': [1458, 1923.5], 'connections': ['6', '1'], 'labels': []}, '8': {'position': [1534, 1872.5], 'connections': ['6', '9', '10'], 'labels': []}, '9': {'position': [1535, 1907.2222222222222], 'connections': ['8'], 'labels': ['G6']}, '10': {'position': [1616, 1872.5], 'connections': ['8', '11', '12', '59'], 'labels': []}, '11': {'position': [1616, 1907.2222222222222], 'connections': ['10'], 'labels': ['G7']}, '12': {'position': [1679, 1872.5], 'connections': ['10', '13', '14'], 'labels': []}, '13': {'position': [1679, 1907.2222222222222], 'connections': ['12'], 'labels': ['G8']}, '14': {'position': [1752, 1872.5], 'connections': ['12', '15', '17'], 'labels': []}, '15': {'position': [1753, 1907.2222222222222], 'connections': ['14'], 'labels': ['G11']}, '17': {'position': [1906, 1872.5], 'connections': ['14', '18', '19'], 'labels': []}, '18': {'position': [1907, 1907.2222222222222], 'connections': ['17'], 'labels': ['G12']}, '19': {'position': [1954, 1872.5], 'connections': ['17', '20', '21'], 'labels': []}, '20': {'position': [1956, 1907.2222222222222], 'connections': ['19'], 'labels': ['G13']}, '21': {'position': [2153.5454545454545, 1872.5], 'connections': ['19', '22', '25', '26'], 'labels': []}, '22': {'position': [2153.5454545454545, 1907.2222222222222], 'connections': ['21', '23', '24'], 'labels': []}, '23': {'position': [2105, 1907.2222222222222], 'connections': ['22'], 'labels': ['G14']}, '24': {'position': [2197, 1907.2222222222222], 'connections': ['22'], 'labels': ['G16']}, '25': {'position': [2197, 1872.5], 'connections': ['21'], 'labels': ['G6']}, '26': {'position': [2153.5454545454545, 1738.6666666666667], 'connections': ['21', '27', '33'], 'labels': []}, '27': {'position': [2108.3333333333335, 1738.6666666666667], 'connections': ['26', '28', '29', '30'], 'labels': []}, '28': {'position': [2108.3333333333335, 1780], 'connections': ['27'], 'labels': []}, '29': {'position': [2108.3333333333335, 1697], 'connections': ['27'], 'labels': ['Toilet']}, '30': {'position': [2029, 1738.6666666666667], 'connections': ['27', '31'], 'labels': []}, '31': {'position': [1854, 1639], 'connections': ['30', '32'], 'labels': ['G23', 'Computer Lab']}, '32': {'position': [1677, 1530], 'connections': ['31', '58'], 'labels': []}, '33': {'position': [2153.5454545454545, 1720], 'connections': ['26', '34', '35'], 'labels': []}, '34': {'position': [2197, 1720], 'connections': ['33'], 'labels': ['G18']}, '35': {'position': [2153.5454545454545, 1687.5], 'connections': ['33', '36', '37'], 'labels': []}, '36': {'position': [2197, 1687.5], 'connections': ['35'], 'labels': ['G20']}, '37': {'position': [2153.5454545454545, 1651], 'connections': ['35', '38'], 'labels': []}, '38': {'position': [2153.5454545454545, 1600], 'connections': ['37', '39'], 'labels': []}, '39': {'position': [2153.5454545454545, 1551], 'connections': ['38', '40'], 'labels': []}, '40': {'position': [2153.5454545454545, 1440], 'connections': ['39', '41', '42'], 'labels': []}, '41': {'position': [2119, 1440], 'connections': ['40'], 'labels': ['G33a']}, '42': {'position': [2153.5454545454545, 1303.5555555555557], 'connections': ['40', '43', '44'], 'labels': ['G33', 'Research Lab']}, '43': {'position': [2153.5454545454545, 1192], 'connections': ['42', '62'], 'labels': []}, '44': {'position': [1821, 1303.5555555555557], 'connections': ['42', '45'], 'labels': []}, '45': {'position': [1800, 1303.5555555555557], 'connections': ['44', '46', '47'], 'labels': []}, '46': {'position': [1799, 1335], 'connections': ['45'], 'labels': ['G35']}, '47': {'position': [1740, 1303.5555555555557], 'connections': ['45', '48'], 'labels': ['G36']}, '48': {'position': [1716, 1303.5555555555557], 'connections': ['47', '49', '50'], 'labels': []}, '49': {'position': [1718, 1335], 'connections': ['48'], 'labels': ['G37']}, '50': {'position': [1623.6666666666667, 1303.5555555555557], 'connections': ['48', '51', '54', '60'], 'labels': []}, '51': {'position': [1587, 1303.5555555555557], 'connections': ['50', '52'], 'labels': []}, '52': {'position': [1507, 1303.5555555555557], 'connections': ['51', '53'], 'labels': ['G105']}, '53': {'position': [1405, 1303.5555555555557], 'connections': ['52', '64'], 'labels': []}, '54': {'position': [1623.6666666666667, 1403], 'connections': ['50', '55', '56'], 'labels': []}, '55': {'position': [1587, 1403], 'connections': ['54'], 'labels': ['Toilet', 'Women']}, '56': {'position': [1623.6666666666667, 1454], 'connections': ['54', '57', '58'], 'labels': []}, '57': {'position': [1582, 1454], 'connections': ['56'], 'labels': []}, '58': {'position': [1623.6666666666667, 1530], 'connections': ['56', '32', '59'], 'labels': []}, '59': {'position': [1623.6666666666667, 1838], 'connections': ['58', '10'], 'labels': []}, '60': {'position': [1623.6666666666667, 1170], 'connections': ['50', '61'], 'labels': []}, '61': {'position': [1863, 1170], 'connections': ['60', '62'], 'labels': ['G41', 'Collab Space']}, '62': {'position': [2130, 1170], 'connections': ['61', '43'], 'labels': []}, '64': {'position': [1405, 1340], 'connections': ['53', '65'], 'labels': []}, '65': {'position': [1434, 1340], 'connections': ['64'], 'labels': ['Toilet', 'Men']}}
dotNum = 66
workingNum = "-1"
isTyping = False
dHeld = False
selected = []
undoStack = []
typedText = ""

def screenToWorld(coords):
    return coords + camCoords + offset

while (status):
    mousePos = np.array(pygame.mouse.get_pos())
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            status = False
        elif event.type == pygame.MOUSEBUTTONDOWN:
            clicking = True
            mouseDownPos = mousePos
        elif event.type == pygame.MOUSEBUTTONUP:
            clicking = False
            mouseUpPos = mousePos
            camCoords = camCoords - offset
            offset = (0, 0)
        elif event.type == pygame.KEYDOWN:
            # w to create dot
            # a to create dot that connects to working dot
            # s to set working dot to dot being moused over
            # d to move working dot to mouse position
            # e to delete working dot
            # q to connect working dot to moused over dot
            # r to add label to working dot (typed)
            # f to remove label from working dot
            # l to load from file ----- eh no need
            # t to select multiple dots
            # x to align dots horizontally
            # y to align dots vertically
            # u to undo
            if not isTyping:
                undoStack.append(copy.deepcopy(dots))
                if event.key == pygame.K_w:
                    dots[str(dotNum)] = {"position":screenToWorld(mousePos).tolist(), "connections": [], "labels": []}
                    workingNum = str(dotNum)
                    dotNum += 1
                elif event.key == pygame.K_a:
                    dots[str(dotNum)] = {"position":screenToWorld(mousePos).tolist(), "connections": [workingNum], "labels": []}
                    dots[workingNum]["connections"].append(str(dotNum))
                    workingNum = str(dotNum)
                    dotNum += 1
                elif event.key == pygame.K_s:
                    selected = []
                    coords = screenToWorld(mousePos)
                    lowest = 999999
                    lowestDot = -1
                    for dot in dots:
                        dist = np.linalg.norm(coords - dots[dot]["position"])
                        if dist < lowest:
                            lowest = dist
                            lowestDot = dot
                    if lowestDot != -1 and lowest <= 20:
                        workingNum = lowestDot
                elif event.key == pygame.K_d:
                    dHeld = True
                elif event.key == pygame.K_e:
                    if workingNum in dots:
                        dots.pop(workingNum)
                        for dot in dots:
                            if workingNum in dots[dot]["connections"]:
                                dots[dot]["connections"].remove(workingNum)
                        workingNum = -1
                elif event.key == pygame.K_q:
                    coords = screenToWorld(mousePos)
                    lowest = 999999
                    mousedDot = -1
                    for dot in dots:
                        dist = np.linalg.norm(coords - dots[dot]["position"])
                        if dist < lowest:
                            lowest = dist
                            mousedDot = dot
                    if mousedDot != -1 and lowest <= 20:
                        dots[mousedDot]["connections"].append(workingNum)
                        dots[workingNum]["connections"].append(mousedDot)
                        workingNum = mousedDot
                elif event.key == pygame.K_r:
                    isTyping = True
                    typedText = ""
                elif event.key == pygame.K_f:
                    if len(dots[workingNum]["labels"]) > 0:
                        dots[workingNum]["labels"].pop()
                elif event.key == pygame.K_t:
                    workingNum = "-1"
                    coords = screenToWorld(mousePos)
                    lowest = 999999
                    mousedDot = -1
                    for dot in dots:
                        dist = np.linalg.norm(coords - dots[dot]["position"])
                        if dist < lowest:
                            lowest = dist
                            mousedDot = dot
                    if mousedDot != -1 and lowest <= 20:
                        if mousedDot in selected:
                            selected.remove(mousedDot)
                        else:
                            selected.append(mousedDot)
                elif event.key == pygame.K_x:
                    exes = [dots[ex]["position"][0] for ex in selected]
                    avg = sum(exes)/len(exes)
                    for ex in selected:
                        dots[ex]["position"][0] = avg
                elif event.key == pygame.K_y:
                    ys = [dots[y]["position"][1] for y in selected]
                    avg = sum(ys)/len(ys)
                    for y in selected:
                        dots[y]["position"][1] = avg
                elif event.key == pygame.K_u:
                    undoStack.pop()
                    if len(undoStack) > 1:
                        dots = undoStack.pop()


            elif event.key == pygame.K_RETURN:
                isTyping = False
                dots[workingNum]["labels"].append(typedText)
            else:
                typedText += event.unicode





            # print(undoStack)
            print(dots)
        elif event.type == pygame.KEYUP:
            if event.key == pygame.K_d:
                dHeld = False



        if dHeld:
            dots[workingNum]["position"] = screenToWorld(mousePos).tolist()



        # elif event.type == pygame.MOUSEWHEEL:
        #     factor = 1.1**event.y
        #     oldZoom = zoomFactor
        #     zoomFactor *= factor
        #
        #     mouseWorldOld = addTuple(camCoords, scaleTuple(mousePos, 1 / oldZoom))
        #     mouseWorldNew = addTuple(camCoords, scaleTuple(mousePos, 1 / zoomFactor))
        #     diff = subTuple(mouseWorldNew,mouseWorldOld)
        #     print(roundTuple(diff))
        #     camCoords = subTuple(camCoords, diff)



    if clicking:
        offset = mousePos - mouseDownPos




    screen.fill((0,0,0))
    groundSurface.blit(image, (0, 0))

    for dot in dots:
        for conn in dots[dot]["connections"]:
            pygame.draw.line(groundSurface, (255,0,255), dots[dot]["position"], dots[conn]["position"], 2)


    for dot in dots:
        if dot in selected:
            pygame.draw.circle(groundSurface, (255, 165, 0), dots[dot]["position"], 8)
        elif dot == str(workingNum):
            pygame.draw.circle(groundSurface, (0, 0, 255), dots[dot]["position"], 8)
        else:
            pygame.draw.circle(groundSurface, (255, 0, 0), dots[dot]["position"], 6)
        if len(dots[dot]["labels"]) > 0:
            textSurface = fontSmall.render(dots[dot]["labels"][-1], True, (0,0,255))
            groundSurface.blit(textSurface, dots[dot]["position"] + np.array([-textSurface.get_width()/2, textSurface.get_height()/2]))
        textSurface = fontSmall.render(str(dot), True, (0, 255, 0))
        groundSurface.blit(textSurface, dots[dot]["position"]+np.array([-textSurface.get_width()/2, -textSurface.get_height()]))



    # transformed = pygame.transform.scale_by(groundSurface, zoomFactor)


    screen.blit(groundSurface, -camCoords + offset)
    if isTyping:
        textSurface = fontBig.render(f'Label: "{typedText}"', True, (0, 0, 255))
        screen.blit(textSurface, (900 - textSurface.get_width()/2, 600))
    pygame.display.flip()

    clock.tick(60)





pygame.quit()