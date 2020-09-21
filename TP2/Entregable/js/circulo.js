class Circulo extends Figura {
    constructor(posX, posY, radius, fill, context, src) {
        super(posX, posY, fill, context);
        this.src = src;
        this.radius = radius;
    }

    draw() {
        super.draw();
        let img = new Image();
        img.src = 'images/ficha-roja.png';
        let cargarImg = function () {
            let imgSize =70;
            this.context.drawImage(img, this.posX - (imgSize / 2), this.posY - (imgSize / 2), imgSize, imgSize);
            this.radius= imgSize / 2;
        }
        img.onload = cargarImg.bind(this);

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