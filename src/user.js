class User {
    constructor(charClass, name, id){
        this.charClass = charClass
        this.score = 0
        this.name = name
        this.id = id

        this.health = 50
        this.status = null
        if (this.charClass === 'paladin') this.health += 30

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
        fetch('http://mire-backend.conceptualsoup.blog/users')
        .then(resp => resp.json())
        .then(users => {
            console.log(users)
            users.sort((a,b) => b.score - a.score)
            let table = document.createElement('table')
            table.classList.add('table', 'table-dark')
            table.id = "high-scores"
            
            let thead = document.createElement('thead')

            let tr = document.createElement('tr')

            let th1 = document.createElement('th')
            th1.scope = 'col'
            th1.innerText = "#"

            let th2 = document.createElement('th')
            th2.scope = 'col'
            th2.innerText = "Username"

            let th3 = document.createElement('th')
            th3.scope = 'col'
            th3.innerText = "Score"

            let th4 = document.createElement('th')
            th4.scope = 'col'
            th4.innerText = "Class"

            tr.append(th1, th2, th3, th4)
            thead.append(tr)

            let tbody = document.createElement('tbody')
            for (let i = 0; i < users.length; i++) {
                if (i < 20) {
                    User.addUserToDom(users[i], tbody, i)
                }
            }
            table.append(tbody,thead)
            app().appendChild(table)
        })
        .catch(err => console.log(err))
    }

    // create new User
    static createUser(event){
        let name = this.username.value 

        if (name.length === 0 || !name.trim()) name = "Dweeb"
        
        event.preventDefault()
        fetch('http://mire-backend.conceptualsoup.blog/users', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({name: name, score: 0, character_class: this.class.value})
            })
            .then(resp => resp.json())
            .then(newUser => {
                levelObj = new Level(30, 30)
                level = levelObj.map
                user = new User(newUser.character_class, newUser.name, newUser.id)
                currentScore().innerText = 'Current Score: 0'
                showHealth().innerText = `Health: ${user.health}`
                showScores().remove()
            })
            .catch(err => console.log(err))
            
        addMovementListener()
        logContainer().style = "display: flex;"
        //.innerText = messageArray[Math.floor(Math.random() * messageArray.length)];
        title().style = "display: none;" 
        event.target.remove()
    }

    // updates user score
    updateUser(){
        if (this.score < 1) return
        
        fetch(`http://mire-backend.conceptualsoup.blog/users/${this.id}`, {
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
    static addUserToDom(user, tbody, position){
        let tr = document.createElement('tr')
        
        let th1 = document.createElement('th')
        th1.scope = 'row'
        th1.innerText = position + 1

        let td1 = document.createElement('td')
        td1.innerText = user.name

        let td2 = document.createElement('td')
        td2.innerText = user.score

        let td3 = document.createElement('td')
        td3.innerText = user.character_class[0].toUpperCase() + user.character_class.slice(1)

        tr.append(th1, td1, td2, td3)
        tbody.append(tr)
    }

    // user rolls of d20
    static roll(mob) {
        let min = Math.ceil(0);
        let max = Math.floor(20);
        let roll = Math.ceil(Math.random() * (max - min)) + min;
        if (!!mob) {
            roll = mob.type === "skeleton" ? roll + 2 : roll;
            roll = mob.type === "lich" ? roll - 5 : roll;
        } 
        roll = roll < 1 ? 1 : roll;
        roll = roll > 20 ? 20 : roll;
        return roll;
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

            // extended
            topLeftFar: [this.x-2,this.y-2],
            topLeftCenterFar: [this.x-1,this.y-2],
            topCenterFar: [this.x,this.y-2],
            topCenterFar: [this.x,this.y-2],
            topRightFar: [this.x+2,this.y-2],
            topRightCenterFar: [this.x+1,this.y-2],
            rightTopFar: [this.x+2,this.y-1],
            rightFar: [this.x+2,this.y],
            rightBottomFar: [this.x+2,this.y+1],
            bottomRightFar: [this.x+2,this.y+2],
            bottomRightCenter: [this.x+1,this.y+2],
            leftCenterTop: [this.x-2,this.y-1],
            leftBottomCenter: [this.x-2,this.y+1],
            bottomLeftFar: [this.x-2,this.y+2],
            bottomLeftCenter: [this.x-1,this.y+2],
            leftFar: [this.x-2,this.y],
            bottomCenterFar: [this.x,this.y+2],

        }
        
       let extendedVision = {
            // extended vision
            topLeftSuperFar: [this.x-3, this.y-2],
            topLeftCenterSuperFar: [this.x-1, this.y-3],
            topCenterSuperFar: [this.x, this.y-3],
            topRightCenterSuperFar: [this.x+1, this.y-3],
            topRightSuperFar: [this.x+2, this.y-3],
            rightTopSuperFar: [this.x+3, this.y-1],
            rightSuperFar: [this.x+3, this.y],
            rightBottomSuperFar: [this.x+3, this.y+1],
            bottomRightSuperFar: [this.x+3, this.y+2],
            bottomRightCenterSuper: [this.x+1, this.y+3],
            bottomCenterSuperFar: [this.x, this.y+3],
            bottomLeftCenterSuper: [this.x-1, this.y+3],
            bottomLeftSuperFar: [this.x-3, this.y+3],
            leftBottomCenterSuper: [this.x-3, this.y+1],
            leftSuperFar: [this.x-3, this.y],
            leftCenterTopSuper: [this.x-3, this.y-1],

            bottomLeftCenterSuperFar: [this.x-2, this.y+3],
            bottomRightCenterSuperFar: [this.x+2, this.y+3],
            bottomRightSuperFarCorner: [this.x+3, this.y+3],

            leftBottomCenterSuperFar: [this.x-3, this.y+2],
            topLeftSuperFarCorner: [this.x-3, this.y-3],
            topLeftCenterSuperFarCorner: [this.x-2, this.y-3],
            topRightSuperFarCorner: [this.x+3, this.y-3],
            rightTopCenterSuperFar: [this.x+3, this.y-2]
        }

        if (this.charClass === 'ranger') {
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
            let roll = User.roll(mob);
            console.log("Roll:", roll)
            
            if (roll === 1) {
                this.status = "splat"
                this.health = 0;
                console.log(`A ${mob.type} killed ${this.name}!`)
                updateConsole(`A ${mob.type} killed ${this.name}!`) 
            } else if (roll === 20) {
                mob.status = "splat"
                this.score += 100
                console.log(`${this.name} killed a ${mob.type}!`)
                updateConsole(`${this.name} killed a ${mob.type}!`) 
                console.log(`Kublai licks ${this.name}'s wounds...`)
                updateConsole(`Kublai licks ${this.name}'s wounds...`) 
                console.log(`${this.name} feels a little better!`)
                updateConsole(`${this.name} feels a little better!`) 
                this.health += 10
            } else if (roll >= 10) {
                mob.status = "splat"
                this.score += 100
                console.log(`${this.name} killed a ${mob.type}!`)
                updateConsole(`${this.name} killed a ${mob.type}!`)
                if (this.charClass === 'necromancer') {
                    this.health += 5
                    console.log(`...and absorbs the ${mob.type}'s energy!`)
                    updateConsole(`...and absorbs the ${mob.type}'s energy!`)
                    showHealth().innerText = `Health: ${this.health}`
                } 
            } else {
                console.log(`A ${mob.type} hit ${this.name}!`)
                updateConsole(`A ${mob.type} hit ${this.name}!`) 
                this.score += 50
                if (
                    this.charClass === "rogue" && 
                    Math.random() < 0.33
                    ) {
                    console.log(`But ${this.name} dodges the attack!`)
                    updateConsole(`But ${this.name} dodges the attack!`)
                } else {
                    this.status = "splat"
                    this.health -= 10;
                }
            }
            console.log("Health:", this.health)
            console.log("Score:", this.score)
            showHealth().innerText = `Health: ${this.health}`
            currentScore().innerText = `Current Score: ${this.score}`
            return !!mob
        }
    }

    checkStaticCollision() {
        let collision = false
        if (level[this.y][this.x].texture === 'chest') {
            console.log(`${this.name} found a treasure chest...`)
            updateConsole(`${this.name} found a treasure chest...`) 
            if (this.charClass === 'sage') {
                this.health += 30
                console.log(`It heals ${this.name}!`)
                updateConsole(`It heals ${this.name}!`)
                console.log("Health:", this.health)
                showHealth().innerText = `Health: ${this.health}`
            }
            this.score += 300
            level[this.y][this.x].texture = null
            console.log("Score:", this.score)
            currentScore().innerText = `Current Score: ${this.score}`
            collision = true
        }
        if (level[this.y][this.x].texture === 'blood') {
            console.log(`${this.name} steps through a pool of blood...`)
            updateConsole(`${this.name} steps through a pool of blood...`) 
            level[this.y][this.x].texture = 'tentacle'
            console.log(`a tentacle appears and attacks ${this.name}...`)
            updateConsole(`a tentacle appears and attacks ${this.name}...`)
            let roll = User.roll();
            if (roll !== 20) {
                console.log(`the tentacle hits ${this.name}!`)
                updateConsole(`the tentacle hits ${this.name}!`)
                this.health -= 10
                console.log("Health:", this.health)
                showHealth().innerText = `Health: ${this.health}`
                this.status = "splat"
            } else {
                console.log(`the tentacle misses ${this.name}!`)
                updateConsole(`the tentacle misses ${this.name}!`)
            }
            this.score -= 50
            console.log("Score:", this.score)
            currentScore().innerText = `Current Score: ${this.score}`
            collision = true
        }
        return collision
    }

    validateMovement(){
        if (this.health <= 0) {
            alert(`You died. ${messageArray[Math.floor(Math.random() * messageArray.length)]}`)
            this.updateUser()
            window.location.reload()
            return 
        }
        if (
            (this.y + this.moveY === exit.y && this.x + this.moveX === exit.x) ||
            (this.y + this.moveY === entrance.y && this.x + this.moveX === entrance.x)
            )  {

            this.kublaiY = this.y
            this.kublaiX = this.x
            this.x += this.moveX
            this.y += this.moveY

            // Show the player move into exit
            levelObj.generateMap()

            // Update score and send to backend
            this.score += 500
            this.updateUser()

            // Clear monsters 
            Monster.all = Monster.all.filter(monster => Math.random() < 0.25)
    
            // Make new level
            levelObj = new Level(30, 30)
            level = levelObj.map

            // Show tiles where player spawns
            this.updateVision()	
        
            // Reset status and heal player
            this.health += 50;
            this.status = null;
            showHealth().innerText = `Health: ${this.health}`
            currentScore().innerText = `Current Score: ${this.score}`

            // Show new map
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