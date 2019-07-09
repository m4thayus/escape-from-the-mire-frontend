class Monster {
    constructor(y, x){
        this.x = x 
        this.y = y
        Monster.all.push(this)
    }

    static allMonsterCords(){
        return Monster.all.map(monster => [monster.x, monster.y])
    }
}
Monster.all = []