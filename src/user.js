class User {
    constructor(charClass, name, id){
        this.charClass = charClass
        this.score = 0
        this.name = name
        this.id = id
        this.health = 50
        this.status = null
        
        this.y = null
        this.x = null
        this.kublaiY = null
        this.kublaiX = null
        this.moveX = 0
        this.moveY = 0

        this.vision = {
        }
    }

    // User API calls

    static getUsers(){
        fetch('http://127.0.0.1:3000/users')
        .then(resp => resp.json())
        .then(users => {
            users.sort((a,b) => b.score - a.score)
            let ol = document.createElement('ol')
            users.forEach(user => User.addUserToDom(user, ol))
            app().appendChild(ol)
            console.log(users)
        })
        .catch(err => console.log(err))
    }

    // create new User
    static createUser(event){
        event.preventDefault()
    
        fetch('http://127.0.0.1:3000/users', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({name: this.username.value, score: 0, character_class: this.class.value})
            })
            .then(resp => resp.json())
            .then(newUser => {
                levelObj = new Level(30, 30)
                level = levelObj.map
                user = new User(newUser.character_class, newUser.name, newUser.id)
                currentScore().innerText = 'Current Score: 0'
                showScores().remove()
            })
            .catch(err => console.log(err))
            
        addMovementListener()
        message().innerText = messageArray[Math.floor(Math.random() * messageArray.length)];
        title().style = "display: none;" 
        event.target.remove()
    }

    // updates user score
    updateUser(){
        fetch(`http://127.0.0.1:3000/users/${this.id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({id: this.id, score: this.score})
        })
        .then(resp => resp.json())
        .then(json => {
            currentScore().innerText = `Current Score: ${json.score}`
        })
        .catch(err => console.log(err))
    }

    // update all user scores to dom
    static addUserToDom(user, ol){
        let li = document.createElement('li')
        li.innerText = `Username: ${user.name} | Score: ${user.score} | Class: ${user.character_class}`

        ol.appendChild(li)
    }

    // user rolls of d20
    static roll() {
        let min = Math.ceil(0);
        let max = Math.floor(20);
        return Math.ceil(Math.random() * (max - min)) + min;
    }

    // user movement and vision methods
    updateVision(){
       let normalVision = {
            // normal vision
            start: [this.x, this.y],
            top: [this.x,this.y-1],
            topRight: [this.x+1,this.y- 1],
            right: [this.x+ 1,this.y],
            bottomRight: [this.x+1,this.y+1],
            bottom: [this.x,this.y+1],
            bottomLeft: [this.x-1,this.y+1],
            left: [this.x-1,this.y],
            topLeft: [this.x-1,this.y-1],
        }
        
       let extendedVision = {
            // extended vision
            topLeftFar: [this.x-2,this.y-2],
            topLeftCenterFar: [this.x-1,this.y-2],
            topCenterFar: [this.x,this.y-2],
            topRightCenterFar: [this.x+1,this.y-2],
            topRightFar: [this.x+2,this.y-2],
            rightTopFar: [this.x+2,this.y-1],
            rightFar: [this.x+2,this.y],
            rightBottomFar: [this.x+2,this.y+1],
            bottomRightFar: [this.x+2,this.y+2],
            bottomRightCenter: [this.x+1,this.y+2],
            bottomCenterFar: [this.x,this.y+2],
            bottomLeftCenter: [this.x-1,this.y+2],
            bottomLeftFar: [this.x-2,this.y+2],
            leftBottomCenter: [this.x-2,this.y+1],
            leftFar: [this.x-2,this.y],
            leftCenterTop: [this.x-2,this.y-1],
        }

        if (this.charClass === 'archer') {
            this.vision = {...normalVision, ...extendedVision}
        } else {
            this.vision = {...normalVision}
        }
    }
    
    movement(event) {
        this.moveX = 0
        this.moveY = 0
        switch (event.key){
            case 'ArrowUp':
            case 'w':
                this.moveY = -1
                this.validateMovement()
                break;
            case 'ArrowDown':
            case 's':
                this.moveY = 1
                this.validateMovement()
                break;
            case 'ArrowLeft':
            case 'a':
                this.moveX = -1
                this.validateMovement()
                break;
            case 'ArrowRight':
            case 'd':
                this.moveX = 1
                this.validateMovement()
                break;
        }
    }

    checkMonsterCollision() {
        let mob = Monster.all.find(monster => monster.y === this.y && monster.x === this.x)
        if (!!mob) {
            let direction = null
            let move = null
            while (!(mob.validMove(direction, move))) {
                direction = Math.random() < 0.5 ? "y" : "x"
                move = Math.random() < 0.5 ? -1 : 1;
            }
            mob[direction] += move
            let roll = User.roll();
            console.log("Roll:", roll)
            if (roll === 1) {
                this.status = "splat"
                this.health = 0;
                console.log(`A ${mob.type} killed ${this.name}!`) 
            } else if (roll >= 10) {
                mob.status = "splat"
                this.score += 100
                console.log(`${this.name} killed a ${mob.type}!`) 
            } else {
                this.status = "splat"
                this.score += 50
                this.health -= 10;
                console.log(`A ${mob.type} hit ${this.name}!`) 
            }

            console.log("Health:", this.health)
            console.log("Score:", this.score)
            return !!mob
        }
    }

    checkStaticCollision() {
        let collision = false
        if (level[this.y][this.x].texture === 'chest') {
            this.score *= 2
            level[this.y][this.x].texture = null
            console.log("Score:", this.score)
            collision = true
        }
        if (level[this.y][this.x].texture === 'blood') {
            level[this.y][this.x].texture = 'tentacle'
            let roll = User.roll();
            if (roll !== 20) {
                this.health -= 10
                this.status = "splat"
            }
            this.score -= 50
            console.log("Score:", this.score)
            collision = true
        }
        return collision
    }

    validateMovement(){
        if (this.health === 0 ||
            (this.y + this.moveY === exit.y && this.x + this.moveX === exit.x) ||
            (this.y + this.moveY === entrance.y && this.x + this.moveX === entrance.x)){

            this.kublaiY = this.y
            this.kublaiX = this.x
            this.x += this.moveX
            this.y += this.moveY
            this.score += 500
            this.updateUser()
            levelObj.generateMap()
    
            // Unused until front-end controls map size
            levelObj = new Level(30, 30)
            level = levelObj.map

            this.updateVision()	
            Monster.all = []
            this.health = 50;
            this.status = null;
            levelObj.generateMap()
        } else if (level[this.y + this.moveY][this.x + this.moveX].type != 'wall') {
            try {
                this.status = null
                this.kublaiY = this.y
                this.kublaiX = this.x
                this.x += this.moveX
                this.y += this.moveY

                // Update tiles that user can see 
                this.updateVision()	

                //Check for static collisions and re-render map
                if (this.checkStaticCollision()) {
                    // re-render map
                    levelObj.generateMap()
                }

                // Give the mobs a turn to move and re-render map
                Monster.takeTurn(); 

                // Check for mob collision 
                if (this.checkMonsterCollision()) {
                    // re-render map
                    levelObj.generateMap()
                }

                levelObj.generateMap()
            }
            catch(err) {
                console.log(err)
                console.log(user.x, user.y)
            }
        }		
    }
}