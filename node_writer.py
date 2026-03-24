import sqlite3 as sql

con = sql.connect('pathing_app.db')
cur = con.cursor()

res = cur.execute('SELECT * FROM Rooms')
records = res.fetchall()

for r in records:
	print(r)
	floor = r[2]
	node = input()
	if node != '':
		node = int(node)
		match floor:
			case 'Ground'     : node += 1
			case 'Lower First': node += 86
			case 'First'      : node += 191
			case 'Second'     : node += 277
		cur.execute(f'UPDATE Rooms SET node = {node} WHERE id = {r[0]}')
		con.commit()
