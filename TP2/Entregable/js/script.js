let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let tablero = new Tablero(context,6,7);
let cantidad = tablero.getCantidad() / 2;


let figures = [];

function addFigure(posX, posY,src,player) {
    addFicha(posX, posY,src,player);
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
    tablero.iniciarTablero();
}

let addFicha = (posX,posY,src,player) => {
    circle = new Ficha(posX, posY, 85, context,getImg(src), player);
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
    if(lastClickedFigure != null){
        let x = 320;
        let y = 540;
        if (event.layerX>280 && event.layerX<950 && event.layerY>=0 && event.layerY<100 ){
            for(let i=0; i<=7; i++){
                let inicio = 280+(100*i);
                for(let j=0; j<=6; j++){    
                    if(event.layerX >= inicio && event.layerX <= inicio+99){
                        console.log(`La ficha es : ${tablero.getFicha(i,j) == 0}`);

                        if(tablero.getFicha(i,j) == 0){
                            tablero.setFicha(i,j, lastClickedFigure.getJugador());
                            lastClickedFigure.setPosition(x+(100*i), y-(100*j));
                            drawFigures();
                            break;
                        }
                    }
                }
            }
            console.log("estoy donde quiero tirar")
            console.log(`${event.layerX} ${event.layerX} ${event.layerY} ${event.layerY} `);
        }else{
            console.log("estoy fuera") 
            console.log(`${event.layerX} ${event.layerX} ${event.layerY} ${event.layerY} `);
    
        }
    }  
}

function clearCanvas() {
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
}

let addFichas = (cant, src, width, player)=>{
    for (let index = 0; index <= cant; index++) {
        addFigure(width+( Math.random() * 150), (canvasHeight/2)+( Math.random() * 150), src,player);
    }
}

let juegoIniciado = false;
let iniciarJuego = () =>{
    if(juegoIniciado == false){
        juegoIniciado = true;
        tablero.iniciarTablero();
        tablero.iniciarMatriz();
        canvas.addEventListener('mousedown', onMouseDown, false);
        canvas.addEventListener('mouseup', onMouseUp, false);
        canvas.addEventListener('mousemove', onMouseMoved, false);
        drawFigures();
    }
}

let loadPage = () => {
    addFichas(cantidad,'images/ficha-roja.png', 30, 1);
    addFichas(cantidad,'images/ficha-azul.png', canvasWidth-180, 2);
    drawFigures();
    document.querySelector("#initGame").addEventListener("click", iniciarJuego);
}
document.addEventListener("DOMContentLoaded", loadPage);