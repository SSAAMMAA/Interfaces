let paintTool = (tool, ctx) => {
    let c = document.querySelector("#canvas");
    let isPainting = false;

    c.onmousedown = function (e) {
        isPainting = true;
        if (tool) {
            ctx.moveTo(e.pageX - c.offsetLeft, e.pageY - c.offsetTop);
        }
    }

    c.onmouseup = function () {
        isPainting = false;
        ctx.beginPath();
    }

    c.onmousemove = function (e) {
        if (isPainting) {
            if (tool) {
                ctx.lineTo(e.pageX - c.offsetLeft, e.pageY - c.offsetTop);
                ctx.lineWidth = document.querySelector("#range").value;
                ctx.strokeStyle = document.querySelector("#muestrario").value;
                ctx.stroke();
            }
            else {
                ctx.beginPath();
                ctx.clearRect(e.pageX - c.offsetLeft, e.pageY - c.offsetTop, document.querySelector("#range").value, document.querySelector("#range").value);
            }
        }
    }

    c.onmouseout = function () {
        isPainting = false;
    };
}

let deleteAll = (ctx) => {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
}

let downloadImg = () => {
    let link = document.querySelector("#download");
    let filename = prompt("Guardar como...", "Nombre del archivo");
    filename = filename + ".jpg";
    link.href = document.querySelector("#canvas").toDataURL("image/jpg");
    link.download = filename;
}

let loadPage = () => {


    let ctx = document.querySelector("#canvas").getContext("2d");

    let width = document.querySelector("#canvas").width;
    let height = document.querySelector("#canvas").height;

    let imageData = ctx.createImageData(width, height);

    let btnPencil = document.querySelector("#btnPencil");
    btnPencil.addEventListener("click", function (e) { paintTool(true, ctx) });
    let btnEraser = document.querySelector("#btnEraser");
    btnEraser.addEventListener("click", function (e) { paintTool(false, ctx) });
    let btnDelete = document.querySelector("#btnDelete");
    btnDelete.addEventListener("click", function (e) { deleteAll(ctx) });
    let btnDownload = document.querySelector("#btnDownload");
    btnDownload.addEventListener("click", downloadImg);

}
document.addEventListener("DOMContentLoaded", loadPage);