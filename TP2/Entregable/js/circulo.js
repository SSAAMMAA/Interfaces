class Ficha extends Figura {
    constructor(posX, posY, radius, fill, context, img) {
        super(posX, posY, fill, context);
        this.img = img;
        this.radius = radius;
    }

    draw() {
        super.draw();
        let imgSize = 70;
        this.context.drawImage(this.img, this.posX - (imgSize / 2), this.posY - (imgSize / 2), imgSize, imgSize);
        this.radius = imgSize / 2;
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