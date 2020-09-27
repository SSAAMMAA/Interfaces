let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let generalSize = 100;
let tablero = new Tablero(context, 5, 10, generalSize);
let cantidad = tablero.getCantidad() / 2;
let turno = 1;
let lastClickedFigure = null;
let isMouseDown = false;
let figures = [];

function addFigure(posX, posY, src, player) {
    addFicha(posX, posY, src, player);
    drawFigures();
}

let drawFigures = () => {
    clearCanvas();
    tablero.iniciarFondo();
    for (let i = 0; i < figures.length; i++) {
        if (figures[i] != lastClickedFigure) {
            figures[i].draw();
        }
    }
    if (lastClickedFigure != null) {
        lastClickedFigure.draw();
    }
    tablero.iniciarTablero();
}

let addFicha = (posX, posY, src, player) => {
    circle = new Ficha(posX, posY, generalSize - (generalSize * 0.15), context, getImg(src), player);
    figures.push(circle);
}

let getImg = (src) => {
    let img = new Image();
    img.src = src;
    return img;
}

function findClickedFigure(x, y) {
    for (let index = 0; index < figures.length; index++) {
        const element = figures[index];
        if (element.isPointInside(x, y)) {
            return element;
        }
    }
}

function onMouseDown(event) {
    isMouseDown = true;
    if (lastClickedFigure != null) {
        lastClickedFigure = null;
    }
    let clickedFigure = findClickedFigure(event.layerX, event.layerY);
    if (clickedFigure != null && turno == clickedFigure.getJugador()) {
        lastClickedFigure = clickedFigure;
    }
    drawFigures();
}

function onMouseMoved(event) {
    if (isMouseDown && lastClickedFigure != null) {
        lastClickedFigure.setPosition(event.layerX, event.layerY);
        drawFigures();
    }
}
let lastFigurePlayed = null;
let lastFigurePlayedX = null;
let lastFigurePlayedY = null;
function onMouseUp(event) {
    isMouseDown = false;
    if (lastClickedFigure != null) {
        let x = 300;
        let y = 550;
        if (event.layerX > 250 && event.layerX < (250 * tablero.getFila()) && event.layerY >= 0 && event.layerY < generalSize) {
            for (let i = 0; i <= tablero.getFila(); i++) {
                let inicio = 250 + (generalSize * i);
                for (let j = 0; j <= tablero.getColumna(); j++) {
                    if (event.layerX >= inicio && event.layerX <= inicio + 99) {
                        if (tablero.getFicha(i, j) == 0) {
                            tablero.setFicha(i, j, lastClickedFigure.getJugador());
                            lastClickedFigure.setPosition(x + (generalSize * i), y - (generalSize * j));
                            lastClickedFigure.setJugo(true);
                            lastFigurePlayed = lastClickedFigure;
                            lastFigurePlayedX = i;
                            lastFigurePlayedY = j;
                            drawFigures();
                            cambiaTurno();
                            console.log('Gano el: ' + tablero.isGanador(i, j, lastClickedFigure.getJugador()));
                            break;
                        }
                    }
                }
            }
        } else {
            volverUltimaFicha();
        }
    }
}

let volverUltimaFicha = () => {
    if (lastClickedFigure != null) {
        lastClickedFigure.setJugo(false);
        lastClickedFigure.volverAOrigen();
    }
    lastClickedFigure = null;
    drawFigures();
}

let clearCanvas = () => {
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
}

let addFichas = (cant, src, width, player) => {
    for (let index = 0; index <= cant; index++) {
        addFigure(width + (Math.random() * 150), (canvasHeight / 2) + (Math.random() * 150), src, player);
    }
}

let cambiaTurno = () => {
    if (turno != 0) {
        if (turno == 2) {
            turno = 1;
        }
        else {
            turno = 2;
        }
    }
}

let reiniciarJuego = () => {
    if (lastClickedFigure != null) {
        lastClickedFigure = null;
        turno = 1;
        figures = [];
        tablero.iniciarMatriz();
        addFichas(cantidad, 'images/ficha-roja.png', 30, 1);
        addFichas(cantidad, 'images/ficha-azul.png', canvasWidth - 180, 2);
        volverUltimaFicha();
    }
}

let deshacerUltimaJugada = () => {
    if (lastFigurePlayedX != null) {
        volverUltimaFicha();
        tablero.setFicha(lastFigurePlayedX, lastFigurePlayedY, 0);
        cambiaTurno();
        drawFigures();
    }
}

let juegoIniciado = false;
let iniciarJuego = () => {
    if (juegoIniciado == false) {
        juegoIniciado = true;
        tablero.iniciarFondo();
        tablero.iniciarTablero();
        tablero.iniciarMatriz();
        canvas.addEventListener('mousedown', onMouseDown, false);
        canvas.addEventListener('mouseup', onMouseUp, false);
        canvas.addEventListener('mousemove', onMouseMoved, false);
        drawFigures();
    }
}

let loadPage = () => {
    addFichas(cantidad, 'images/ficha-roja.png', 30, 1);
    addFichas(cantidad, 'images/ficha-azul.png', canvasWidth - 180, 2);
    drawFigures();
    document.querySelector("#initGame").addEventListener("click", iniciarJuego);
    document.querySelector("#restartGame").addEventListener("click", reiniciarJuego);
    document.querySelector("#undoPlayed").addEventListener("click", deshacerUltimaJugada);


}
document.addEventListener("DOMContentLoaded", loadPage);