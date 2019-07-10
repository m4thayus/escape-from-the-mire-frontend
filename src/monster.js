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
        Monster.all.push(this)
    }

    static takeTurn() {
        for (let monster of Monster.all) {
            let direction = Math.random() < 0.5 ? "y" : "x"
            let move =  Math.random() < 0.5 ? -1 : 1
            while (!monster.validMove(direction, move)) {
                direction = Math.random() < 0.5 ? "y" : "x"
                move =  Math.random() < 0.5 ? -1 : 1
            }
            monster[direction] += move
        }
    }

    validMove(direction, move) {
        if (direction === "y") {
            return level[this.y + move][this.x].type === "floor" && level[this.y][this.x + move].texture !== "exit" && level[this.y][this.x + move].texture !== "entrance";
        } else {
            return level[this.y][this.x + move].type === "floor" && level[this.y][this.x + move].texture !== "exit" && level[this.y][this.x + move].texture !== "entrance";
        }
    } 

}
Monster.all = []