let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let figures = [];

function addFigure() {
    addRectangle();
    drawFigures();
}

function drawFigures() {
    clearCanvas();
    for (let i = 0; i < figures.length; i++) {
        figures[i].draw(context);
    }
}

function addRectangle() {
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = imageOnFigure();
    let rect = new Rectangulo(0, 0, 100, 100, color, context);
    figures.push(rect);
}

let getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let randomGradiente = () => {
    let gradiente = context.createLinearGradient(0, 0, 200, 0);
    gradiente.addColorStop(0, getRandomColor());
    gradiente.addColorStop(1, getRandomColor());
    return gradiente;
}

let imageOnFigure = () => {
    let image = new Image();
    image.src = 'images/caja-300x300.jpg';
    image.width=100;
    image.height=100;
    return context.createPattern(image, 'repeat');
}

function randomRGBA() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function clearCanvas() {
    context.fillStyle = '#F8F8FF';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
}

let loadPage = () => {
    document.querySelector('#canvas').addEventListener("click", addFigure);
}
document.addEventListener("DOMContentLoaded", loadPage);