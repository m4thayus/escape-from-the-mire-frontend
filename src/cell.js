class Cell {
    constructor(type){
        this.status = 'show' 
        this.type = type
        if (type === 'wall') {
            this.texture = (Math.random() < 0.75) ? "water" : "tree"
        } else {
            this.texture = null
        }
    }
}