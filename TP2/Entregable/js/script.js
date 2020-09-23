let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let figures = [];

function addFigure(posX, posY,src) {
    addFicha(posX, posY,src);
    drawFigures();
}

let drawFigures = () => {
    clearCanvas();
    for (let i = 0; i < figures.length; i++) {
        if(figures[i] != lastClickedFigure) {
            figures[i].draw();
        }
    }
    if(lastClickedFigure != null) {
        lastClickedFigure.draw();
    }
}

let addFicha = (posX,posY,src) => {
    circle = new Ficha(posX, posY, 50, "#FFF", context,getImg(src));
    figures.push(circle);
}

let getImg = (src)=>{
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

let lastClickedFigure = null;
let isMouseDown = false;

function onMouseDown(event) {
    isMouseDown = true;

    // Se limpia la propiedad highlighted de la ultima figura clickeada
    if (lastClickedFigure != null) {
        lastClickedFigure = null;
    }

    // Buscar si hay una nueva figura clickeada
    let clickedFigure = findClickedFigure(event.layerX, event.layerY);
    if (clickedFigure != null) {
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

function onMouseUp() {
    isMouseDown = false;
}

function clearCanvas() {
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
}
let addFichas = (cant, src, width)=>{
    for (let index = 0; index <= cant; index++) {
        addFigure(width+( Math.random() * 150), (canvasHeight/2)+( Math.random() * 150), src);
    }
}

let iniciarJuego = () =>{
    let tablero = new Tablero(context,6,7);
    tablero.iniciarTablero();
    let cantidad = tablero.getCantidad() / 2;
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMoved, false);
    addFichas(cantidad,'images/ficha-roja.png', 30);
    addFichas(cantidad,'images/ficha-azul.png', canvasWidth-180);
    
}
let loadPage = () => {
    document.querySelector("#initGame").addEventListener("click", iniciarJuego);
    //iniciarJuego();
}
document.addEventListener("DOMContentLoaded", loadPage);