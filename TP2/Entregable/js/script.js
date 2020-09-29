let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let generalSize = 100;
let tokenToWin = document.querySelector('#tokenToWin').value;
let tablero = new Tablero(context, 5, 10, generalSize);
let cantidad = tablero.getCantidad() / 2;
let turno = 1;
let lastClickedFigure = null;
let isMouseDown = false;
let figures = [];
let lastFigurePlayedX = null;
let lastFigurePlayedY = null;
let gano = -1;
let juegoIniciado = false;
let player1 = null;
let player2 = null;
let pointPlayer1 = 0;
let pointPlayer2 = 0;

let initPlayers = () => {
    if (document.querySelector('#player1-input').value == "") {
        player1 = "Jugador 1";
    } else {
        player1 = document.querySelector('#player1-input').value;
    }

    if (document.querySelector('#player2-input').value == "") {
        player2 = "Jugador 2";
    } else {
        player2 = document.querySelector('#player2-input').value;
    }
}

let addFigure = (posX, posY, src, player) => {
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
    puntajeYTurno();
    if (gano != -1) {
        setGanador(gano);
    }
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
    if (clickedFigure != null && turno == clickedFigure.getJugador() && gano == -1) {
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
                            lastFigurePlayedX = i;
                            lastFigurePlayedY = j;
                            cambiaTurno();
                            drawFigures();
                            if (tablero.isGanador(i, j, lastClickedFigure.getJugador())) {
                                setGanador(lastClickedFigure.getJugador());
                                if (lastClickedFigure.getJugador() == 1) {
                                    pointPlayer1++;
                                } else {
                                    pointPlayer2++;
                                }
                            }
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

let setGanador = (player) => {
    gano = player;
    context.strokeStyle = "#FF0";
    context.font = "150px Comic Sans MS";
    if (player == 1) {
        context.fillStyle = "red";
        context.fillText("Ganó " + player1, 300, 300);
        context.strokeText("Ganó " + player1, 300, 300);
        context.stroke();
    }
    else {
        context.fillStyle = "blue";
        context.fillText("Ganó " + player2, 300, 300);
        context.strokeText("Ganó " + player2, 300, 300);
        context.stroke();
    }
}

let puntajeYTurno = () => {
    if (juegoIniciado == true) {
        context.strokeStyle = "#FF0";
        context.font = "20px Comic Sans MS";
        if (turno == 1) {
            context.fillStyle = "#F00";
            context.fillText(player1 + ": " + pointPlayer1 + " pts.", 20, 25);
            context.fillStyle = "#000";
            context.fillText(player2 + ": " + pointPlayer2 + " pts.", 20, 50);
        } else {
            context.fillStyle = "#000";
            context.fillText(player1 + ": " + pointPlayer1 + " pts.", 20, 25);
            context.fillStyle = "#00F";
            context.fillText(player2 + ": " + pointPlayer2 + " pts.", 20, 50);
        }
    }
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

let volverUltimaFicha = () => {
    if (lastClickedFigure != null) {
        lastClickedFigure.setJugo(false);
        lastClickedFigure.volverAOrigen();
    }
    lastClickedFigure = null;
    drawFigures();
}

let reiniciarJuego = () => {
    if (juegoIniciado == true) {
        gano = -1;
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
        gano = -1;
        tablero.setFicha(lastFigurePlayedX, lastFigurePlayedY, 0);
        cambiaTurno();
        volverUltimaFicha();
    }
}

let iniciarJuego = () => {
    if (juegoIniciado == false) {
        initPlayers();
        juegoIniciado = true;
        gano = -1;
        tablero.updateWin();
        tablero.iniciarFondo();
        tablero.iniciarTablero();
        tablero.iniciarMatriz();
        document.querySelector("#initGame").disabled = true;
        document.querySelector('#player1-input').disabled = true;
        document.querySelector('#player2-input').disabled = true;
        document.querySelector('#tokenToWin').disabled = true;
        document.querySelector("#restartGame").disabled = false;
        document.querySelector("#undoPlayed").disabled = false;
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
    document.querySelector("#restartGame").disabled = true;
    document.querySelector("#undoPlayed").disabled = true;


}
document.addEventListener("DOMContentLoaded", loadPage);