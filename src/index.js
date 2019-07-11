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
	"You imagined you would be more successful, didn't you?",
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

