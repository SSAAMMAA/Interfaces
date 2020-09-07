let ctx = document.querySelector("#canvas").getContext("2d");
let width = 500;
let height = 500;
let imageData = ctx.createImageData(width, height);
let r = 255;
let g = 0;
let b = 0;
for (let x = 0; x < imageData.width; x++) {
    for (let y = 0; y < imageData.height; y++) {
        setPixel(imageData, x, y, r, g, b, 255);
    }
    if(x <= width / 4){
        g -= 1;
        b += 1;
        r += 1;
    }
    else{
        g += 1;
        b -= 1;
        r -= 1;
    }
}

ctx.putImageData(imageData, 0, 0);

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}