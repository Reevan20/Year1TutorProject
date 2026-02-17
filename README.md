# Year1TutorProject

## Initial Idea:
- Pathfinding/guidance app for uni buildings and rooms
  	- landmarks
  	- fire estinguishers
  	- posters?
  	- https://studentnet.cs.manchester.ac.uk/resources/floorplans/index.php?view=staff
    - https://en.wikipedia.org/wiki/Wi-Fi_positioning_system (Wi-Fi positioning for indoor tracking?)
 
## Key Features:
- Maps all rooms + entrances
- Select start/end points
	- Search using attributes? (type of room?)
	- accessibility options
	- warnings for room restrictions
- Finds the best route from start to end point
	- Displays route on a map
	- Textual description of route?
		- Include pictures?
	- Live updates position on route?
 - Use QR codes to pass where starting points are (using URL param)

 ## Database Schema:
 **Table: Rooms**
 - id: int (PK)
 - number: string
 - name: string
 - floor: string
 - type: string (FK?)

**Table: Office?**
This is a possible table
- id: int (PK)
- staff: string
- office_hours??: date-time

# TODO:
- redoing assets
- split pathfinder.php into multiple files then put into index.html
- check if anything is using corriders.obj
- check if submit.js can be merged
