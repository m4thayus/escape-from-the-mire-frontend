
let level 

function generateLevel(width = 30, height = 30) {
	level = [];
	const zone = Zone.createMap(width, height)
	const zoneObject = zone.toObject();
	console.log(zoneObject);
	
	for (let y = 0; y < height; y++) {
	const row = [];
		for (let x = 0; x < width; x++) {
			row.push({
			entities: [],
			status: 'hidden',
			// type: zoneObject[y] && zoneObject[y][x] ? "floor" : "wall"
			type: (Math.random() < 0.75) ? "floor" : "wall"
			});
		}
	level.push(row);
	}
}
generateLevel()

let user = {
	y: Math.floor(Math.random() * 30),
	x: Math.floor(Math.random() * 30),
	moveX: 0,
	moveY: 0
}

let exit = {
	y: Math.floor(Math.random() * 20),
	x: Math.floor(Math.random() * 20),
}

document.addEventListener('keydown', event => {
	user.moveX = 0
	user.moveY = 0
	switch (event.key){
		case 'w':
			user.moveY = -1
			break;
		case 's':
			user.moveY = 1
			break;
		case 'a':
			user.moveX = -1
			break;
		case 'd':
			user.moveX = 1
			break;
	}

	if (user.y + user.moveY === exit.y && user.x + user.moveX === exit.x)  {
		user.x += user.moveX
		user.y += user.moveY

		generateMap()

		user.y = Math.floor(Math.random() * 20)
		user.x = Math.floor(Math.random() * 20)
		exit.y = Math.floor(Math.random() * 20)
		exit.x = Math.floor(Math.random() * 20)
		generateLevel()
		generateMap()
	} else if (level[user.y + user.moveY][user.x + user.moveX].type != 'wall') {
		
		try {
			user.x += user.moveX
			user.y += user.moveY
			generateMap()
		}
		catch(err) {
		}
	}			
})

function generateMap(){
	let domMap = "<div>";
	let x = [user.x, user.y]
	let hash = {
		top: [x[0],x[1]-1],
		topRight: [x[0]+1,x[1]- 1],
		right: [x[0]+ 1,x[1]],
		bottomRight: [x[0]+1,x[1]+1],
		bottom: [x[0],x[1]+1],
		bottomLeft: [x[0]-1,x[1]+1],
		left: [x[0]-1,x[1]],
		topLeft: [x[0]-1,x[1]-1]
	}
	let values = Object.values(hash)
	for (let y = 0; y < level.length; y++) {
		const row = level[y];
		domMap += "<div class='row'>";
		
		for (let x = 0; x < level[y].length; x++) {
				if (y == user.y && x == user.x) {
					level[y][x].type = 'floor'
					domMap += `<div class="tile player"></div>`;
				} else if (y === exit.y && x === exit.x) {
					domMap += `<div class="tile exit"></div>`;
				} else if (values.find(cord => cord[0] === x && cord[1] === y)) {
					const tile = level[y][x];
					level[y][x].status = 'show'
					domMap += `<div class="tile ${tile.type}"></div>`;
				} else if (level[y][x].status === 'show'){
					const tile = level[y][x];
					domMap += `<div class="tile ${tile.type}"></div>`;
				} else {
					domMap += `<div class="tile black"></div>`;
				}
		}
		domMap += "</div>";

	domMap += "</div>";}
	
	document.getElementById("app").innerHTML = domMap;
	}
	generateMap()


