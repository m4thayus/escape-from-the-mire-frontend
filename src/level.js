class Level {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.map = []
        Level.getLevel()
            .then(raw_maze => this.generateLevel(raw_maze))
            .then(() => this.generateMap())
    }

    static getLevel() {
        return fetch('http://localhost:3000/mazes')
            .then(response => response.json())
            .then(maze => {
                return maze.raw_maze
            })
            .catch(error => {
                window.alert(error.message);
            })
    }

    generateLevel(raw_maze) { 
        // for (let y = 0; y < this.height; y++) {
        //     const row = [];
        //     for (let x = 0; x < this.width; x++) {
        //         let type = (Math.random() < 0.75) ? "floor" : "wall"
        //         let newCell = new Cell(type)
        //         row.push(newCell)
        //     }
        // this.map.push(row)

        let last_row_end = 0;
        for (let i = 0; i < raw_maze.length; i++) {
            const char = raw_maze[i];
            if (char == "\n" || i == raw_maze.length - 1) {
                let row = raw_maze.slice(last_row_end, i);
                last_row_end = i + 1;
                let row_of_cells = [];
                for (let j = 0; j < row.length; j++) {
                    const row_char = row[j];
                    if (row_char == "+" || row_char == "-" || row_char == "|") {
                        row_of_cells.push(new Cell("wall"));
                    } else {
                        row_of_cells.push(new Cell("floor"));
                    }
                }
                this.map.push(row_of_cells);
            }
        }
        this.map[this.map.length - 1].push(new Cell("wall"));

        let entrance_row = this.map[this.map.length - 1];
        let exit_row = this.map[0];

        for (let k = 0; k < entrance_row.length; k++) {
            if (entrance_row[k].type === "floor" && entrance_row[k-1].type === "floor" && entrance_row[k+1].type === "floor") {
                entrance_row[k].type = "entrance";
                entrance.y = this.map.length - 2
                entrance.x = k;
                entrance_row[k-1].type = "wall";
                entrance_row[k+1].type = "wall";
            }
            if (exit_row[k].type === "floor" && exit_row[k-1].type === "floor" && exit_row[k+1].type === "floor") {
                exit_row[k].type = "exit";
                exit.y = 0;
                exit.x = k;
                exit_row[k+1].type = "wall";
                exit_row[k-1].type = "wall";
            }
        }
        for (let rowNumber = 1; rowNumber < this.map.length - 1; rowNumber++){
            for (let columnNumber = 1; columnNumber < this.map[rowNumber].length -1; columnNumber++) {
                let cell = this.map[rowNumber][columnNumber]
                if (cell.type === "wall") {
                    cell.type = (Math.random() < 0.08) ? "floor" : "wall"
                }
            }
        }
        user = new User();
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
                    // } else if (y === exit.y && x === exit.x) {
                    //     domMap += `<div class="tile exit"></div>`;
                    } else if (values.find(cord => cord[0] === x && cord[1] === y)) {
                        const tile = level[y][x];
                        level[y][x].status = 'show'
                        domMap += `<div class="tile ${tile.type} ${tile.texture}"></div>`;
                    } else if (level[y][x].status === 'show'){
                        const tile = level[y][x];
                        domMap += `<div class="tile ${tile.type} ${tile.texture}"></div>`;
                    } else {
                        domMap += `<div class="tile black"></div>`;
                    }
            }
            domMap += "</div>";
    
        domMap += "</div>";}
        
        document.getElementById("app").innerHTML = domMap;
        }
}