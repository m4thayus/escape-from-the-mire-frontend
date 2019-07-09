class User {
    constructor(){
        this.y = Math.floor(Math.random() * 30)
        this.x = Math.floor(Math.random() * 30)
        this.moveX = 0
        this.moveY = 0
    }
    
    movement(event) {
        this.moveX = 0
        this.moveY = 0
        switch (event.key){
            case 'w':
                this.moveY = -1
                break;
            case 's':
                this.moveY = 1
                break;
            case 'a':
                this.moveX = -1
                break;
            case 'd':
                this.moveX = 1
                break;
        }
    
        if (this.y + this.moveY === exit.y && this.x + this.moveX === exit.x)  {
            this.x += this.moveX
            this.y += this.moveY
    
            levelObj.generateMap()
    
            this.y = Math.floor(Math.random() * 20)
            this.x = Math.floor(Math.random() * 20)
            exit.y = Math.floor(Math.random() * 20)
            exit.x = Math.floor(Math.random() * 20)
            levelObj = new Level(30, 30)
            level = levelObj.map
            levelObj.generateMap()
        } else if (level[this.y + this.moveY][this.x + this.moveX].type != 'wall') {
            
            try {
                this.x += this.moveX
                this.y += this.moveY
                levelObj.generateMap()
            }
            catch(err) {
            }
        }			
    }
}