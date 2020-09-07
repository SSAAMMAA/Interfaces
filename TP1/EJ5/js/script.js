let ctx = document.querySelector("#canvas").getContext("2d");
let width = 255;
let height = 255;
let r;
let g;
let b=0;
let a = 255;
let color = 0;
let coeficiente = 255 / (width / 2) ;
let imageData = ctx.createImageData(width,height);
for (let x=0 ; x<width; x++){
    for (let y=0 ; y<height; y++){
        setPixel(imageData,x,y,r,g,b,a);
        if(x < width/2){
            r = coeficiente * x;
            g = coeficiente * x;
        }
        else{
            r = coeficiente * x;
            g = 510 - (coeficiente * x);
        }
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
