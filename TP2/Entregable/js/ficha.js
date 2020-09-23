class Ficha {
    constructor(posX, posY, imgSize, fill, context, img) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.imgSize = imgSize;
        this.context = context;
        this.img = img;
        this.radius = imgSize/2;
    }

    setFill(fill) {
        this.fill = fill;
    }

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }

    getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        };
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    getFill() {
        return this.fill;
    }
    
    draw() {
        this.context.fillStyle = this.fill;
        this.context.drawImage(this.img, this.posX - this.radius, this.posY - this.radius, this.imgSize, this.imgSize);
    }

    isPointInside(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

    getRadius() {
        return this.radius;
    }

}