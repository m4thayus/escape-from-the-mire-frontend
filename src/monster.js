class Monster {
    constructor(y, x){
        this.x = x 
        this.y = y
        if (Math.random() < 0.5) {
            this.type = "skeleton"
        } else if (Math.random()< 0.9) {
            this.type = "spider"
        } else {
            this.type = "lich"
        }
        this.status = null
        Monster.all.push(this)
    }

    static takeTurn() {
        Monster.all = Monster.all.filter(monster => monster.status !== "splat")
        for (let monster of Monster.all) {
            let direction = Math.random() < 0.5 ? "y" : "x"
            let move = 0
            if (user[direction] < monster[direction]) {
                move = -1;
            } else if (user[direction] > monster[direction]) {
                move = 1;
            }
            while (!monster.validMove(direction, move)) {
                direction = Math.random() < 0.5 ? "y" : "x"
                move =  Math.random() < 0.5 ? -1 : 1
            }
            monster[direction] += move
        }
    }

    validMove(direction, move) {
        try {
            if (direction === "y") {
                return (
                    level[this.y + move][this.x].type === "floor" && 
                    level[this.y + move][this.x].texture !== "exit" && 
                    level[this.y + move][this.x].texture !== "entrance");
            } else if (direction === "x"){
                return (
                    level[this.y][this.x + move].type === "floor" &&
                    level[this.y][this.x + move].texture !== "exit" &&
                    level[this.y][this.x + move].texture !== "entrance");
            }
        }
        catch(err) {
            console.log(level[this.y][this.x + move])
        }
    } 

}
Monster.all = []