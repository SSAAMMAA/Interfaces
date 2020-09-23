class Rectangulo {
    constructor(context, size) {
        this.size = size;
        this.context = context;
    }
    
    addImage(posX,posY){
        let img = new Image();
        img.src = "images/casillero.png";
        img.onload = function(){
            context.drawImage(img, posX,posY,100,100);
        }
    }
}