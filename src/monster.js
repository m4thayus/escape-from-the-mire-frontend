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
}
Monster.all = []