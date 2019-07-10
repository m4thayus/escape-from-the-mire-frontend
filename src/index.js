function title() {
    return document.querySelector("h1");
}

function message() {
	return message = document.getElementById('message')
}

function createUserForm() {
	return document.getElementById('create-user')
}
let messageArray = ["Why do you even bother trying?", "Give up."]

createUserForm().addEventListener('submit', handleFormSubmit)

function handleFormSubmit(event){
	event.preventDefault()

	// create user
	fetch('http://127.0.0.1:3000/users', {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json',
			}, 
			body: JSON.stringify({name: this.username.value, score: 0, character_class: "paladin"})
		})
		.then(resp => resp.json())
		.then(newUser => {
			levelObj = new Level(30, 30)
			level = levelObj.map
			user = new User(newUser.character_class, newUser.name, newUser.id)
			console.log(newUser)
		})
		.catch(err => console.log(err))

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