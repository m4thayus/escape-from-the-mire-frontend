class Monster {
    constructor(y, x){
        this.x = x 
        this.y = y
        if (Math.random() < 0.5) {
            this.type = "skeleton"
        } else if (Math.random()< 0.8) {
            this.type = "crawler"
        } else {
            this.type = "wraith"
        }
        Monster.all.push(this)
    }

    // static allMonsterCords(){
    //     return Monster.all.map(monster => [monster.x, monster.y, monster.type])
    // }
}
Monster.all = []