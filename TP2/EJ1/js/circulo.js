class Circulo extends Figura {
    constructor(posX, posY, radius, fill, context) {
        super(posX, posY, fill, context);

        this.radius = radius;
    }

    draw() {
        super.draw();
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.closePath();
    }

    getRadius() {
        return this.radius;
    }
}