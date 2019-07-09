
let levelObj = new Level(30, 30)
let level = levelObj.map
let user = new User
let exit = {
	y: Math.floor(Math.random() * 20),
	x: Math.floor(Math.random() * 20),
}
document.addEventListener('keydown', () => {
	user.movement(event)
})

levelObj.generateMap()


