class Ficha {
    constructor(posX, posY, size, context, img, jugador) {
        this.posX = posX;
        this.posY = posY;
        this.fill = "#FFF";
        this.size = size;
        this.context = context;
        this.img = img;
        this.radius = size/2;
        this.jugador = jugador;
        this.jugo = false;
    }

    getJugador(){
        return this.jugador;
    }

    setFill(fill) {
        this.fill = fill;
    }

    setPosition(x, y) {
        if(this.jugo == false){
            this.posX = x;
            this.posY = y;
        }
    }

    setJugo(bool){
        this.jugo = bool;
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
        this.context.drawImage(this.img, this.posX - this.radius, this.posY - this.radius, this.size, this.size);
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