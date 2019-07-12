// HTML selectors
function title() {
    return document.querySelector("h1");
}

function message() {
	return message = document.getElementById('message')
}

function createUserForm() {
	return document.getElementById('create-user')
}

function addMovementListener() {
	document.addEventListener('keydown', () => {
		user.movement(event)
	})
}

function currentScore(){
	return document.getElementById('score')
}

function showScores(){
	return document.getElementById('show-scores')
}

function showHealth(){
	return document.getElementById('health')
}

function app() {
	return document.getElementById("app")
}

function selectArcher(){
	return document.getElementById('select-archer')
}

function selectPaladin(){
	return document.getElementById('select-paladin')
}

function selectSage(){
	return document.getElementById('select-sage')
}

function selectThief(){
	return document.getElementById('select-thief')
}

function selectedClass(){
	return document.getElementById('selected-class')
}

function selectedClassInput(){
	return document.getElementById('selected-class-input')
}

function consoleContainer(){
	return document.getElementById('console-container')
}
selectedClass().innerHTML = "Current Selection: Ranger <br> Rangers are masters of nature. Rangers have <strong>increased vision</strong> compared to their allies."

function handleClassSelection(){
	switch (this.id) {
		case 'select-archer':
			selectedClass().innerHTML = "Current Selection: Ranger <br> Rangers are masters of nature. Rangers have <strong>increased vision</strong> compared to their allies."
			selectedClassInput().value = 'archer'
			break;
		case 'select-thief':
			selectedClass().innerHTML = "Current Selection: Rogue <br> Rogues are masters of chance. Rogues have <strong>a chance to dodge</strong> monsters."
			selectedClassInput().value = 'thief'
			break;
		case 'select-sage':
			selectedClass().innerHTML = "Current Selection: Sage <br> Sages are masters of the elements. Sages <strong>heal</strong> when they find treasure."
			selectedClassInput().value = 'sage'
			break;
		case 'select-paladin':
			selectedClass().innerHTML = "Current Selection: Paladin <br> Paladins are knights of renown. Paladins have <strong>increased health</strong> because God loves them."
			selectedClassInput().value = 'paladin'
			break;
	}	
}
function updateConsole(message) {
	let p = document.createElement('p')
	p.innerText = message
	consoleContainer().insertBefore(p, consoleContainer().childNodes[0])
	if (consoleContainer().childNodes.length > 5 ){
		consoleContainer().childNodes[5].remove()
	}
}

selectSage().addEventListener('click', handleClassSelection)
selectThief().addEventListener('click', handleClassSelection)
selectArcher().addEventListener('click', handleClassSelection)
selectPaladin().addEventListener('click', handleClassSelection)
createUserForm().addEventListener('submit', User.createUser)
showScores().addEventListener('click', handleShowScores)

function handleShowScores(){
	if (this.innerText === 'High Scores') {
		app().innerHTML = ""
		createUserForm().style.display = 'none'
		this.innerText = 'Back'
		User.getUsers()
	} else {
		app().innerHTML = ""
		createUserForm().style.display = ''
		this.innerText = 'High Scores'
	}
}

let messageArray = [
	"Why do you even bother trying?", 
	"Give up.", 
	"You are not even close.", 
	"Pathetic.", 
	"Nobody likes you",
	"Does anybody even like you?",
	"You can't reach your goals",
	"Is this your life?",
	"This is never what you wanted",
	"You imagined you would be more successful, didn't you?",
	"Why even bother?",
	"You are behind your peers",
	"You disappoint your parents",
	"You embarrass your friends",
	"You are not good at anything",
	"You cannot sleep at night",
	"You will never accomplish anything of value in this life",
]

let levelObj
let level
let entrance = {}
let user
let exit = {}

