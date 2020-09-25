class Rectangulo {
    constructor() {

    }
    
    addImage(src, posX, posY, size){
        let img = new Image();
        img.src = src;
        context.drawImage(img, posX, posY, size, size);
    }

}