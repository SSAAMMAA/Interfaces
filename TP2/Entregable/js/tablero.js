class Tablero{
    constructor(context, filas, columnas) {
        this.context = context;
        this.filas = filas;
        this.columnas = columnas;
        this.tablero = [];
        this.matriz = [];
    }

    iniciarTablero(){
        for (let x = 0; x < this.columnas; x++) {
            this.tablero[x] = [];
            for(let y = 0; y< this.filas; y++ ){
                let posX = (x * 100)+270;
                let posY = (y * 100)+90;
                let cuadrado = new Rectangulo();
                cuadrado.addImage("images/casillero.png",posX,posY,100);
                this.tablero[x][y] = cuadrado;
            }
        }
    }
    
    iniciarMatriz(){
        for (let x = 0; x < this.columnas; x++) {
            this.matriz[x] = [];
            for(let y = 0; y< this.filas; y++ ){
                this.matriz[x][y] = 0;
            }
        }
    }
    setFicha(x,y,player){
        this.matriz[x][y] = player;
    }
    
    getFicha(x,y){
        return this.matriz[x][y];
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