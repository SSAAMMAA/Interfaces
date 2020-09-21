let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let figures = [];

function addFigure(posX, posY) {
    addCircle(posX, posY);
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

let addCircle = (posX,posY) => {
    circle = new Ficha(posX, posY, 50, "#FFF", context,getImg('images/ficha-roja.png'));
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

function onMouseUp(event) {
    isMouseDown = false;
}

function clearCanvas() {
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
}

let loadPage = () => {

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMoved, false);
   // document.querySelector('#canvas').addEventListener("click", function(e){
        addFigure(200, 200);
        addFigure(500, 300);

    //    }    );
}
document.addEventListener("DOMContentLoaded", loadPage);