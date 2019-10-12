// HTML selectors
function title() {
    return document.querySelector("h1");
}

function createUserForm() {
	return document.getElementById('create-user')
}

function backToBlogButton() {
	return document.getElementById('to-blog')
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

function selectNecromancer(){
	return document.getElementById('select-necromancer')
}

function selectRanger(){
	return document.getElementById('select-ranger')
}

function selectPaladin(){
	return document.getElementById('select-paladin')
}

function selectSage(){
	return document.getElementById('select-sage')
}

function selectRogue(){
	return document.getElementById('select-rogue')
}

function selectNecromancer(){
	return document.getElementById('select-necromancer')
}

function selectedClass(){
	return document.getElementById('selected-class')
}

function selectedClassInput(){
	return document.getElementById('selected-class-input')
}

function usernameInput(){
	return document.getElementById('username')
}
function consoleContainer(){
	return document.getElementById('console-container')
}

function logContainer(){
	return document.getElementById('log-container')
}

selectedClass().innerHTML = "<strong>Ranger</strong><br>Rangers are masters of nature. Rangers have <strong>increased vision</strong> compared to their allies."

function handleClassSelection(){
	switch (this.id) {
		case 'select-ranger':
            selectRanger().setAttribute("selected", "true")
            selectRogue().setAttribute("selected", "false")
            selectSage().setAttribute("selected", "false")
            selectPaladin().setAttribute("selected", "false")
            selectNecromancer().setAttribute("selected", "false")
			selectedClass().innerHTML = "<strong>Ranger</strong><br>Rangers are masters of nature. Rangers have <strong>increased vision</strong> compared to their allies."
			selectedClassInput().value = 'ranger'
			break;
		case 'select-rogue':
            selectRanger().setAttribute("selected", "false")
            selectRogue().setAttribute("selected", "true")
            selectSage().setAttribute("selected", "false")
            selectPaladin().setAttribute("selected", "false")
            selectNecromancer().setAttribute("selected", "false")
			selectedClass().innerHTML = "<strong>Rogue</strong><br>Rogues are masters of chance. Rogues have <strong>a chance to dodge</strong> monsters."
			selectedClassInput().value = 'rogue'
			break;
		case 'select-sage':
            selectRanger().setAttribute("selected", "false")
            selectRogue().setAttribute("selected", "false")
            selectSage().setAttribute("selected", "true")
            selectPaladin().setAttribute("selected", "false")
            selectNecromancer().setAttribute("selected", "false")
			selectedClass().innerHTML = "<strong>Sage</strong><br>Sages are masters of the elements. Sages <strong>heal</strong> when they find treasure."
			selectedClassInput().value = 'sage'
			break;
		case 'select-paladin':
            selectRanger().setAttribute("selected", "false")
            selectRogue().setAttribute("selected", "false")
            selectSage().setAttribute("selected", "false")
            selectPaladin().setAttribute("selected", "true")
            selectNecromancer().setAttribute("selected", "false")
			selectedClass().innerHTML = "<strong>Paladin</strong><br> Paladins are knights of renown. Paladins have <strong>increased health</strong> because God loves them."
			selectedClassInput().value = 'paladin'
			break;
		case 'select-necromancer':
            selectRanger().setAttribute("selected", "false")
            selectRogue().setAttribute("selected", "false")
            selectSage().setAttribute("selected", "false")
            selectPaladin().setAttribute("selected", "false")
            selectNecromancer().setAttribute("selected", "true")
			selectedClass().innerHTML = "<strong>Necromancer</strong><br>Necromancers control the forces of life and death. Necromancers <strong> gain health after killing monsters </strong> through dark magic."
			selectedClassInput().value = 'necromancer'
	}	
}
function updateConsole(message) {
	let p = document.createElement('p')
	p.innerText = message
	consoleContainer().appendChild(p)
	if (consoleContainer().childNodes.length > 5 ){
		consoleContainer().childNodes[0].remove()
	}
}

selectSage().addEventListener('click', handleClassSelection)
selectRogue().addEventListener('click', handleClassSelection)
selectRanger().addEventListener('click', handleClassSelection)
selectPaladin().addEventListener('click', handleClassSelection)
selectNecromancer().addEventListener('click', handleClassSelection)

usernameInput().select()
createUserForm().addEventListener('submit', User.createUser)
showScores().addEventListener('click', handleShowScores)

function handleShowScores(){
	
	if (this.value === 'High Scores') {
		app().innerHTML = ""
		createUserForm().style.display = 'none'
		backToBlogButton().style.display = 'none'
		this.value = 'Back to Start Menu'
		User.getUsers()
	} else {
		app().innerHTML = ""
		createUserForm().style.display = ''
		backToBlogButton().style.display = ''
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

