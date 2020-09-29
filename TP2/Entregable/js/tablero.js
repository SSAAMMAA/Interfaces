class Tablero {
    constructor(context, filas, columnas, size, win) {
        this.context = context;
        this.filas = filas;
        this.columnas = columnas;
        this.size = size;
        this.matriz = [];
        this.win = win;
    }

    updateWin(){
        this.win = document.querySelector('#tokenToWin').value;
    }

    iniciarTablero() {
        for (let x = 0; x < this.columnas; x++) {
            for (let y = 0; y < this.filas; y++) {
                let posX = (x * this.size) + 250;
                let posY = (y * this.size) + 100;
                let cuadrado = new Rectangulo();
                cuadrado.addImage("images/casillero.png", posX, posY, this.size);
            }
        }
    }

    iniciarFondo() {
        for (let x = 0; x < this.columnas; x++) {
            for (let y = 0; y < this.filas; y++) {
                let posX = (x * this.size) + 250;
                let posY = (y * this.size) + 100;
                let cuadrado = new Rectangulo();
                cuadrado.addImage("images/casillero-fondo.png", posX, posY, this.size);
            }
        }
    }

    iniciarMatriz() {
        for (let x = 0; x < this.columnas; x++) {
            this.matriz[x] = [];
            for (let y = 0; y < this.filas; y++) {
                this.matriz[x][y] = 0;
            }
        }
    }

    isGanador(columna, fila, jugador) {
        let total = -1;
        let f = fila;
        let c = columna;

        //compruebo a derecha
        while ((c < this.columnas) && (this.getFicha(c, f) == jugador)) {
            total++;
            c++;
        }

        //compruebo a izquierda
        f = fila;
        c = columna;
        while ((c >= 0) && (this.getFicha(c, f) == jugador)) {
            total++;
            c--;
        }

        if (total >= this.win) {
            return jugador;
        }

        //compruebo altura
        total = 0;
        f = fila;
        c = columna;
        while ((f >= 0) && (this.getFicha(c, f) == jugador)) {
            total++;
            f--;
        }
        if (total >= this.win) {
            return jugador;
        }

        //diagonal de izquierda hacia abajo
        total = -1;
        f = fila;
        c = columna;
        while ((f >= 0) && (c >= 0) && (this.getFicha(c, f) == jugador)) {
            total++;
            f--;
            c--;
        }

        //diagonal de derecha a arriba
        f = fila;
        c = columna;
        while ((c < this.columnas) && (f < this.filas) && (this.getFicha(c, f) == jugador)) {
            total++;
            c++;
            f++;
        }
        if (total >= this.win) {
            return jugador;
        }

        //IZQ ARRIBA
        total = -1;
        f = fila;
        c = columna;
        while ((f < this.filas) && (c >= 0) && (this.getFicha(c, f) == jugador)) {
            total++;
            f++;
            c--;
        }

        //DER ABAJO
        f = fila;
        c = columna;
        while ((c < this.columnas) && (f >= 0) && (this.getFicha(c, f) == jugador)) {
            total++;
            c++;
            f--;
        }

        if (total >= this.win) {
            return jugador;
        }
        return false;
    }

    setFicha(x, y, player) {
        this.matriz[x][y] = player;
    }

    getFicha(x, y) {
        return this.matriz[x][y];
    }

    getCantidad() {
        return this.columnas * this.filas;
    }

    getFila() {
        return this.columnas;
    }

    getColumna() {
        return this.filas;
    }
}