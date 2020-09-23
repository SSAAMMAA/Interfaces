class Tablero{
    constructor(context, filas, columnas) {
        this.context = context;
        this.filas = filas;
        this.columnas = columnas;
        this.tablero = [];
    }

    iniciarTablero(){
        for (let x = 0; x < this.columnas; x++) {
            this.tablero[x] = [];
            for(let y = 0; y< this.filas; y++ ){
                let posX = (x * 100)+270;
                let posY = (y * 100)+90;
                let cuadrado = new Rectangulo(this.context, 100);
                cuadrado.addImage(posX,posY);
                this.tablero[x][y] = cuadrado;
            }
        }
    }

    getCantidad(){
        return this.columnas * this.filas;
    }

    getFila(){
        return this.columnas;
    }

    getColumna(){
        return this.filas;
    }
}