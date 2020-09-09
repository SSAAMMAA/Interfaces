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
    let filename = prompt("Seleccione el nombre de la imagen", "Nombre de la imagen");
    filename = filename + ".jpg";
    link.href = document.querySelector("#canvas").toDataURL("image/jpg");
    link.download = filename;
}

let addImgToCanvas = (ctx,imageData) => {
    deleteAll(ctx);
    let canvas = document.querySelector("#canvas");

    let input = document.querySelector('.imgInput');

    input.onchange = e => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = readerEvent => {
            let content = readerEvent.target.result;
            let image = new Image();
            image.src = content;
            image.onload = function () {
                let imageAspectRatio = (1.0 * this.height) / this.width;
                let imageScaledWidth = canvas.width;
                let imageScaledHeight = canvas.width * imageAspectRatio;
                let startWidth = 0;
                let startHeigh = 0;
                if (this.width < this.height) {
                    imageAspectRatio = (1.0 * this.width) / this.height;
                    imageScaledWidth = canvas.height * imageAspectRatio;
                    imageScaledHeight = canvas.height;
                    startWidth = (canvas.width / 2) - (imageScaledWidth / 2);
                } else {
                    startHeigh = (canvas.height / 2) - (imageScaledHeight / 2);
                }
                ctx.drawImage(this, startWidth, startHeigh, imageScaledWidth, imageScaledHeight);
                imageOrigin = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
                imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
                ctx.putImageData(imageData, 0, 0);
            }
        }
    }
}

let loadOriginalImg = (ctx) =>{
    deleteAll(ctx);
    ctx.putImageData(imageOrigin, 0, 0);
}

let loadPage = () => {
    let ctx = document.querySelector("#canvas").getContext("2d");
    let imageData;
    let imageOrigin;
    let btnPencil = document.querySelector("#btnPencil");
    btnPencil.addEventListener("click", function (e) { paintTool(true, ctx) });
    let btnEraser = document.querySelector("#btnEraser");
    btnEraser.addEventListener("click", function (e) { paintTool(false, ctx) });
    let btnDelete = document.querySelector("#btnDelete");
    btnDelete.addEventListener("click", function (e) { deleteAll(ctx) });
    let btnDownload = document.querySelector("#btnDownload");
    btnDownload.addEventListener("click", downloadImg);

    let btnUpload = document.querySelector("#btnUpload");
    btnUpload.addEventListener("click", function (e) {
        document.querySelector('.imgInput').click();
        addImgToCanvas(ctx,imageData);
    });
}
document.addEventListener("DOMContentLoaded", loadPage);