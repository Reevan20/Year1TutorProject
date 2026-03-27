obj = "assets/aligned_models/nodes/first_nodes.obj"


with open(obj, "r") as f:
    lines = f.read().split("\n")

nodes = {}
id = 1
idOffset = 190
for line in lines:
    words = line.split()
    if len(words) == 0:
        continue
    if words[0] == "v":
        nodes[str(id)] = {"position": [float(words[1]), float(words[2]), float(words[3])], "connections": [], "labels": []}
        id += 1
    elif words[0] == "l":
        nodes[words[1]]["connections"].append(words[2])
        nodes[words[2]]["connections"].append(words[1])


def add(d, increment=5):
    new_dict = {}
    for key, value in d.items():
        # New key as string
        new_key = str(int(key) + increment)

        # New connections as strings
        new_connections = [str(int(conn) + increment) for conn in value['connections']]

        # Copy other values
        new_dict[new_key] = {
            'position': value['position'],
            'connections': new_connections,
            'labels': value['labels']
        }
    return new_dict

print(add(nodes, increment=idOffset))

# print(nodes)
print(len(nodes) + idOffset)


# import matplotlib.pyplot as plt
# from mpl_toolkits.mplot3d import Axes3D
# import numpy as np
#
# # Example adjacency list
# graph = nodes
#
# fig = plt.figure()
# ax = fig.add_subplot(111, projection='3d')
#
# # Plot nodes
# for node, data in graph.items():
#     x, y, z = data['position']
#     ax.scatter(x, y, z, color='blue', s=50)
#     ax.text(x, y, z, node, fontsize=10, color='red')  # optional: label nodes
#
# # Plot edges
# for node, data in graph.items():
#     x1, y1, z1 = data['position']
#     for neighbor in data['connections']:
#         x2, y2, z2 = graph[neighbor]['position']
#         ax.plot([x1, x2], [y1, y2], [z1, z2], color='black')
#
# # Labels
# ax.set_xlabel('X')
# ax.set_ylabel('Y')
# ax.set_zlabel('Z')
# ax.set_title('3D Graph from Adjacency List')
#
# plt.show()
