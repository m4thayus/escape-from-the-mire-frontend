
function startButton() {
	return startButton = document.getElementById('start-button')
}

function message() {
	return message = document.getElementById('message')
}
let messageArray = ["Why do you even bother trying?", "Give up."]

startButton().addEventListener('click', startGame)

function startGame(event){
	levelObj = new Level(30, 30)
	level = levelObj.map
	message().innerText = messageArray[Math.floor(Math.random() * messageArray.length)];
	event.target.remove()
}

let levelObj
let level
let entrance = {}
let user
let exit = {}

document.addEventListener('keydown', () => {
	user.movement(event)
})