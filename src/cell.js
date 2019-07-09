class Cell {
    constructor(type){
        this.status = 'show' 
        this.type = type
        if (type === 'wall') {
            if (Math.random() < 0.75) {
                this.texture = "water"
            } else if (Math.random() < 0.75) {
                this.texture = "tree"
            } else if (Math.random() < 0.80) {
                this.texture = "tree-alt"
            } else {
                this.texture = (Math.random() < 0.80) ? "rock" : "flame"
            }
        } else {
            this.texture = null
        }
    }
}