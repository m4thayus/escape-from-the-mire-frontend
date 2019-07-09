class Level {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.map = []
        this.generateLevel()
    }

    generateLevel() { 
        for (let y = 0; y < this.height; y++) {
            const row = [];
            for (let x = 0; x < this.width; x++) {
                let type = (Math.random() < 0.75) ? "floor" : "wall"
                let newCell = new Cell(type)
                row.push(newCell)
            }
        this.map.push(row);
        }
    }

     generateMap(){
        let domMap = "<div>";
        let x = [user.x, user.y]
        let hash = {
            top: [x[0],x[1]-1],
            topRight: [x[0]+1,x[1]- 1],
            right: [x[0]+ 1,x[1]],
            bottomRight: [x[0]+1,x[1]+1],
            bottom: [x[0],x[1]+1],
            bottomLeft: [x[0]-1,x[1]+1],
            left: [x[0]-1,x[1]],
            topLeft: [x[0]-1,x[1]-1]
        }
        let values = Object.values(hash)
        for (let y = 0; y < level.length; y++) {
            const row = level[y];
            domMap += "<div class='row'>";
            
            for (let x = 0; x < level[y].length; x++) {
                    if (y == user.y && x == user.x) {
                        level[y][x].type = 'floor'
                        domMap += `<div class="tile player"></div>`;
                    } else if (y === exit.y && x === exit.x) {
                        domMap += `<div class="tile exit"></div>`;
                    } else if (values.find(cord => cord[0] === x && cord[1] === y)) {
                        const tile = level[y][x];
                        level[y][x].status = 'show'
                        domMap += `<div class="tile ${tile.type}"></div>`;
                    } else if (level[y][x].status === 'show'){
                        const tile = level[y][x];
                        domMap += `<div class="tile ${tile.type}"></div>`;
                    } else {
                        domMap += `<div class="tile black"></div>`;
                    }
            }
            domMap += "</div>";
    
        domMap += "</div>";}
        
        document.getElementById("app").innerHTML = domMap;
        }
}