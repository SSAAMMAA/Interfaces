class Tablero{
    constructor(context, filas, columnas, size) {
        this.context = context;
        this.filas = filas;
        this.columnas = columnas;
        this.size = size;
        this.matriz = [];
    }

    iniciarTablero(){
        for (let x = 0; x < this.columnas; x++) {
            for(let y = 0; y< this.filas; y++ ){
                let posX = (x * this.size)+250;
                let posY = (y * this.size)+90;
                let cuadrado = new Rectangulo();
                cuadrado.addImage("images/casillero.png",posX,posY,this.size);
            }
        }
    }

    iniciarFondo(){
        for (let x = 0; x < this.columnas; x++) {
            for(let y = 0; y< this.filas; y++ ){
                let posX = (x * this.size)+250;
                let posY = (y * this.size)+90;
                let cuadrado = new Rectangulo();
                cuadrado.addImage("images/casillero-fondo.png",posX,posY,this.size);
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