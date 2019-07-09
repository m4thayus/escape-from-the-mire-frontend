class User {
    constructor(){
        this.y = entrance.y
        this.x = entrance.x
        this.kublaiY = entrance.y +1
        this.kublaiX = entrance.x 
        this.moveX = 0
        this.moveY = 0
        this.vision = {
            start: [this.x, this.y],
            top: [this.x,this.y-1],
            topRight: [this.x+1,this.y- 1],
            right: [this.x+ 1,this.y],
            bottomRight: [this.x+1,this.y+1],
            bottom: [this.x,this.y+1],
            bottomLeft: [this.x-1,this.y+1],
            left: [this.x-1,this.y],
            topLeft: [this.x-1,this.y-1],
            // increases Field of view by 3 at top and 3 at bottom
            topFar: [this.x, this.y-2],
            topLeftFar: [this.x-1, this.y-2],
            topRightFar: [this.x+1, this.y-2],
            bottomFar: [this.x, this.y+2],
            bottomLeftFar: [this.x-1, this.y+2],
            bottomRightFar: [this.x+1, this.y+2],
        }
    }

    updateVision(){
        this.vision = {
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
    }
    
    movement(event) {
        this.moveX = 0
        this.moveY = 0
        switch (event.key){
            case 'ArrowUp':
            case 'w':
                this.moveY = -1
                break;
            case 'ArrowDown':
            case 's':
                this.moveY = 1
                break;
            case 'ArrowLeft':
            case 'a':
                this.moveX = -1
                break;
            case 'ArrowRight':
            case 'd':
                this.moveX = 1
                break;
        }
        
        if (this.y + this.moveY === exit.y && this.x + this.moveX === exit.x)  {
            this.kublaiY = this.y
            this.kublaiX = this.x
            this.x += this.moveX
            this.y += this.moveY
     
            levelObj.generateMap()
    
            this.y = Math.floor(Math.random() * 20)
            this.x = Math.floor(Math.random() * 20)
            exit.y = Math.floor(Math.random() * 20)
            exit.x = Math.floor(Math.random() * 20)
            levelObj = new Level(30, 30)
            level = levelObj.map
            this.updateVision()	
            levelObj.generateMap()
        } else if (level[this.y + this.moveY][this.x + this.moveX].type != 'wall') {
            
            try {
                this.kublaiY = this.y
                this.kublaiX = this.x
                this.x += this.moveX
                this.y += this.moveY
                this.updateVision()	
                levelObj.generateMap()
            }
            catch(err) {
            }
        }		
    }
}