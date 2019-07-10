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
        this.parseRawMaze(raw_maze)
        this.findEntranceAndExit()
        this.randomWallToFloor()
        this.randomFloorToUniq()
        user = new User
        this.randomUserPosition()
    }

    // parses raw string from HTML into cells
    parseRawMaze(raw_maze) {
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
    }

    // defines entrance and exit of maze
    findEntranceAndExit(){
        let entrance_row = this.map[this.map.length - 1];
        let exit_row = this.map[0];

        for (let k = 0; k < entrance_row.length; k++) {
            if (entrance_row[k].type === "floor" && entrance_row[k-1].type === "floor" && entrance_row[k+1].type === "floor") {
                entrance_row[k].texture = "entrance";
                entrance.y = this.map.length - 1
                entrance.x = k;
                entrance_row[k-1].type = "wall";
                entrance_row[k+1].type = "wall";
            }
            if (exit_row[k].type === "floor" && exit_row[k-1].type === "floor" && exit_row[k+1].type === "floor") {
                exit_row[k].texture = "exit";
                exit.y = 0;
                exit.x = k;
                exit_row[k+1].type = "wall";
                exit_row[k-1].type = "wall";
            }
        }
    }

    // random chance to convert an interior wall to floor
    randomWallToFloor(){
        for (let rowNumber = 1; rowNumber < this.map.length - 1; rowNumber++){
            for (let columnNumber = 1; columnNumber < this.map[rowNumber].length -1; columnNumber++) {
                let cell = this.map[rowNumber][columnNumber]
                if (cell.type === "wall") {
                    cell.type = (Math.random() < 0.08) ? "floor" : "wall"
                    if (cell.type === 'floor') {
                        cell.texture = null
                    }
                }
            }
        }
    }

    // random chance for chest
    randomFloorToUniq(){
        for (let rowNumber = 1; rowNumber < this.map.length - 1; rowNumber++){
            for (let columnNumber = 1; columnNumber < this.map[rowNumber].length -1; columnNumber++) {
                let cell = this.map[rowNumber][columnNumber]
                if (cell.type === "floor") {
                    cell.texture = (Math.random() < 0.001) ? "chest" : null
                }
                if (cell.type === "floor" && cell.texture === null) {
                    cell.texture = (Math.random() < 0.001) ? "blood" : null
                }
                if (cell.type === "floor" && cell.texture === null) {
                    if (Math.random() < 0.01) {
                        new Monster(rowNumber, columnNumber)
                    }
                }
            }
        }
    }

    randomUserPosition(){
        while (user.x === null && user.y === null) {
            for (let rowNumber = Math.floor(this.map.length / 2 - 10); rowNumber < Math.floor(this.map.length / 2 + 10); rowNumber++){
                for (let columnNumber = Math.floor(this.map[rowNumber].length / 2 - 10); columnNumber < Math.floor(this.map[rowNumber].length / 2 + 10); columnNumber++) {
                    let cell = this.map[rowNumber][columnNumber]
                    if (cell.type === "floor") {
                        if (Math.random() < 0.01) {
                            user.x = columnNumber
                            user.y = rowNumber
                            user.kublaiX = columnNumber
                            user.kublaiY = rowNumber
                            user.updateVision()
                            return 
                        }
                    }
                }
            }
        }
    }

    // Converts map into HTML elements
    generateMap(){
        let domMap = "<div>";
        let userVisionCords = Object.values(user.vision)
        // let monsterCords = Monster.allMonsterCords()
        let monsters = Monster.all

        for (let y = user.y - 9; y < user.y + 9; y++) {
            domMap += "<div class='row'>";
            for (let x = user.x - 9; x < user.x + 9; x++) {
                if (!!level[y] && !!level[y][x]) {
                    if (y == user.y && x == user.x) {
                        domMap += `<div class="tile player"></div>`;
                    } else if (y == user.kublaiY && x == user.kublaiX){
                        level[y][x].status = 'show'
                        domMap += `<div class="tile kublai"></div>`;
                    } else if (userVisionCords.find(cord => cord[0] === x && cord[1] === y)) {
                        const tile = level[y][x];
                        level[y][x].status = 'show'
                        if (monsters.some(monster => monster.x === x && monster.y === y)) {
                            let monster = monsters.find(monster => monster.x === x && monster.y === y)
                            domMap += `<div class="tile ${tile.type} ${tile.texture} ${monster.type}"></div>`;
                        } else {
                            domMap += `<div class="tile ${tile.type} ${tile.texture}"></div>`;
                        }
                    } else if (level[y][x].status === 'show'){
                        const tile = level[y][x];
                        if (monsters.some(monster => monster.x === x && monster.y === y)) {
                            let monster = monsters.find(monster => monster.x === x && monster.y === y)
                            domMap += `<div class="tile ${tile.type} ${tile.texture} ${monster.type}"></div>`;
                        } else {
                            domMap += `<div class="tile ${tile.type} ${tile.texture}"></div>`;
                        }
                    } else {
                        const tile = level[y][x];
                        domMap += `<div class="tile ${tile.type} fog"></div>`;
                    }
                } else {
                    domMap += `<div class="tile black"></div>`;
                }
            }
            domMap += "</div>";
            domMap += "</div>";
        }
        document.getElementById("app").innerHTML = domMap;
    }
}