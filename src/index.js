function title() {
    return document.querySelector("h1");
}
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
    title().style = "display: none;" 
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

// create user
// fetch('http://127.0.0.1:3000/users', {
// 		method: 'POST', 
// 		headers: {
//             'Content-Type': 'application/json',
// 		}, 
// 		body: JSON.stringify({name: "Nick", score: 100, character_class: "creator"})
// 	})
// 	.then(resp => resp.json())
// 	.then(json => console.log(json))
// 	.catch(err => console.log(err))
// patch user
// fetch('http://127.0.0.1:3000/users/3', {
// 	method: 'PATCH', 
// 	headers: {
// 		'Content-Type': 'application/json',
// 	}, 
// 	body: JSON.stringify({id: 3, score: 150})
// })
// .then(resp => resp.json())
// .then(json => console.log(json))
// .catch(err => console.log(err))