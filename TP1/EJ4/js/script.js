
let ctx = document.querySelector("#canvas").getContext("2d");
let width = 255;
let height = 255;
let r;
let g;
let b;
let a = 255;
let imageData = ctx.createImageData(width,height);
for (let x=0 ; x<width; x++){
    for (let y=0 ; y<height; y++){
        r = 255 / width * y;
        g = 255 / width * y;
        b = 255 / width * y;
        setPixel(imageData,x,y,r,g,b,a);
    }
}
ctx.putImageData(imageData,0,0);

function setPixel(imageData, x, y, r, g, b, a){
    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] =r;
    imageData.data[index + 1] =g;
    imageData.data[index + 2] =b;
    imageData.data[index + 3] =a;
}
