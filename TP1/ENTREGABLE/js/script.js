let paintTool = (tool, ctx)=>{
    let c = document.querySelector("#canvas");
    let isPainting = false;
        
    c.onmousedown = function (e){
        isPainting = true;
        if(tool){
            ctx.moveTo(e.pageX - c.offsetLeft, e.pageY - c.offsetTop);
        }
    }   

    c.onmouseup = function(){
        isPainting = false;
        ctx.beginPath();
    }
    
    c.onmousemove = function(e){
        if (isPainting) {
            if (tool) {
                ctx.lineTo(e.pageX - c.offsetLeft, e.pageY - c.offsetTop);
                ctx.lineWidth = document.querySelector("#range").value;
                ctx.strokeStyle = document.querySelector("#muestrario").value;
                ctx.stroke();
            }
            else{
                ctx.beginPath();
                ctx.clearRect(e.pageX - c.offsetLeft, e.pageY - c.offsetTop, document.querySelector("#range").value, document.querySelector("#range").value);
            }
        }
    }
    
    c.onmouseout = function(){
        isPainting = false;
    };
}

function actualizarPrimero(event) {
    var p = document.querySelector("p");
  
    if (p) {
      p.style.color = event.target.value;
    }
  }

let loadPage = () => {


    let ctx = document.querySelector("#canvas").getContext("2d");

    let width = document.querySelector("#canvas").width;
    let height = document.querySelector("#canvas").height;
    let imageData = ctx.createImageData(width, height);

    let btnPencil = document.querySelector("#btnPencil");
    btnPencil.addEventListener("click", function(e){paintTool(true,ctx)});
    let btnEraser = document.querySelector("#btnEraser");
    btnEraser.addEventListener("click", function(e){paintTool(false,ctx)});

    
}
document.addEventListener("DOMContentLoaded", loadPage);