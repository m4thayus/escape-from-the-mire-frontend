const minZoneSize = 5
const minRoomSize = 4
const splitChance = 0.95

class Zone {
    constructor(x1,x2,y1,y2){
        this.x1 = x1 
        this.x2 = x2 
        this.y1 = y1 
        this.y2 = y2

        if (x2 - x1 <= minZoneSize || y2 - y1 <= minZoneSize){
            return
        }

        if (Math.random() > splitChance) {
            return
        }

        let splitX = Math.floor(Math.random() * (x2 - x1)) + x1 
        let splitY = Math.floor(Math.random() * (y2 - y1)) + y1
        let splitVertical = Math.random() > 0.50 ? true : false

        if (splitVertical) {
            this.left = new Zone(x1, splitX, y1, y2)
            this.right = new Zone(splitX, x2, y1, y2)
        } else {
            this.left = new Zone(x1, x2, y1, splitY)
            this.right = new Zone(x1, x2, splitY, y2)
        }
    }

    createRooms() {
        if (!this.left && !this.right && (this.x2 - this.x1 > minRoomSize && this.y2 - this.y1 > minRoomSize)) {
            this.room = {x1: this.x1 + 1, x2: this.x2 - 1, y1: this.y1 + 1, y2: this.y2 - 1}
            return
        }
        if (this.left) this.left.createRooms();
        if (this.right) this.right.createRooms();
    }

    createHallways() {
        if (this.left && this.right) {
            this.hall = { 
                x1: Math.floor((this.left.x2 - this.left.x1) / 2 + this.left.x1),
                x2: Math.floor((this.right.x2 - this.right.x1) / 2 + this.right.x1),
                y1: Math.floor((this.left.y2 - this.left.y1) / 2 + this.left.y1),
                y2: Math.floor((this.right.y2 - this.right.y1) / 2 + this.right.y1)
            }
        }

        if (this.left) this.left.createHallways();
        if (this.right) this.right.createHallways();
    }

    toObject(zoneObject = {}) {        
        if (this.room) {
            for (let y = this.room.y1; y <= this.room.y2; y++) {
                for (let x = this.room.x1; x < this.room.x2; x++) {
                    if (!zoneObject.hasOwnProperty(y)) zoneObject[y] = {}
                    zoneObject[y][x] = 'floor'                    
                }
            }
        }

        if (this.hall) {                                  
            for (let y = this.hall.y1; y <= this.hall.y2; y++) {
                for (let x = this.hall.x1; x < this.hall.x2; x++) {
                    if (!zoneObject.hasOwnProperty(y)) zoneObject[y] = {} 
                    zoneObject[y][x] = 'floor'
                
                }
            }
        }

        if (this.left) zoneObject = {...zoneObject, ...this.left.toObject() }
        if (this.right) zoneObject = {...zoneObject, ...this.right.toObject() }
        return zoneObject
    }

    static createMap(width, height) {
        const zone = new Zone(0, width, 0, height)
        zone.createRooms();
        zone.createHallways();
        return zone
    }
}
