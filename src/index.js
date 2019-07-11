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
selectedClass().innerHTML = "Current Selection: Ranger <br> Rangers are masters of nature. Rangers have <strong> increased vision </strong> compared to their allies."

function handleClassSelection(){
	switch (this.id) {
		case 'select-archer':
			selectedClass().innerHTML = "Current Selection: Ranger <br> Rangers are masters of nature. Rangers have <strong> increased vision </strong> compared to their allies."
			selectedClassInput().value = 'archer'
			break;
		case 'select-thief':
			selectedClass().innerHTML = "Current Selection: Thief <br> Thieves are masters of chance. Thieves have <strong> increased luck </strong> aganst monsters."
			selectedClassInput().value = 'thief'
			break;
		case 'select-sage':
			selectedClass().innerHTML = "Current Selection: Sage <br> Sages are masters of the elements. Sages have <strong> increased attack range. </strong>"
			selectedClassInput().value = 'sage'
			break;
		case 'select-paladin':
			selectedClass().innerHTML = "Current Selection: Paladin <br> Paladins are knights of renown. Paladins have <strong> increased health </strong> because God loves them."
			selectedClassInput().value = 'paladin'
			break;
	}	
}

selectSage().addEventListener('click', handleClassSelection)
selectThief().addEventListener('click', handleClassSelection)
selectArcher().addEventListener('click', handleClassSelection)
selectPaladin().addEventListener('click', handleClassSelection)
createUserForm().addEventListener('submit', User.createUser)
showScores().addEventListener('click', handleShowScores)

function handleShowScores(){
	app().innerHTML = ""
	User.getUsers()
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
	"You imagined you would be more succesful, didn't you?",
	"Why even bother?",
	"You are behind your peers",
	"You disappoint your parents",
	"You embarrass your friends",
	"You am not good at anything",
	"You cannot sleep at night",
	"You will never accomplish anything of value in this life",
]

let levelObj
let level
let entrance = {}
let user
let exit = {}

