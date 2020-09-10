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

let addImgToCanvas = (ctx, imageData) => {
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

let loadOriginalImg = (ctx) => {
    if (imageOrigin !== null) {
        deleteAll(ctx);
        ctx.putImageData(imageOrigin, 0, 0);
    }
}

let getRed = (imageData, x, y) => {
    let i = (x + y * imageData.width) * 4;
    return imageData.data[i + 0];
}

let getGreen = (imageData, x, y) => {
    let i = (x + y * imageData.width) * 4;
    return imageData.data[i + 1];
}

let getBlue = (imageData, x, y) => {
    let i = (x + y * imageData.width) * 4;
    return imageData.data[i + 2];
}

let applyNegativeFilter = (ctx) => {
    loadOriginalImg(ctx);
    let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let y = 0; y < ctx.canvas.width; y++) {
        for (let x = 0; x < ctx.canvas.width; x++) {
            index = (x + y * imageData.width) * 4;
            imageData.data[index + 0] = 255 - imageData.data[index + 0];
            imageData.data[index + 1] = 255 - imageData.data[index + 1];
            imageData.data[index + 2] = 255 - imageData.data[index + 2];
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

let applyBrightnessFilter = (ctx) => {
    loadOriginalImg(ctx);
    let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    let intensity = document.querySelector("#intensityBrightness").value;
    for (let y = 0; y < ctx.canvas.height; y++) {
        for (let x = 0; x < ctx.canvas.width; x++) {
            index = (x + y * imageData.width) * 4;
            imageData.data[index + 0] = getBrightness(imageData.data[index + 0] + 0.5 * intensity);
            imageData.data[index + 1] = getBrightness(imageData.data[index + 1] + 0.5 * intensity);
            imageData.data[index + 2] = getBrightness(imageData.data[index + 2] + 0.5 * intensity);
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

let getBrightness = (value) => {
    if (value < 0)
        return 0;
    if (value > 255)
        return 255;
    else
        return value;
}

let applyBlackAndWhiteFilter = (ctx) => {
    loadOriginalImg(ctx);
    let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    let intensity = document.querySelector("#intensityBlackAndWhite").value;
    let r;
    let b;
    let g;
    for (let y = 0; y < ctx.canvas.height; y++) {
        for (let x = 0; x < ctx.canvas.width; x++) {
            index = (x + y * imageData.width) * 4;
            r = getRed(imageData, x, y);
            g = getGreen(imageData, x, y);
            b = getBlue(imageData, x, y);
            let average = ((r + g + b) / 3) + (intensity - 127);
            imageData.data[index + 0] = average;
            imageData.data[index + 1] = average;
            imageData.data[index + 2] = average;
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

let applyBinaryFilter = (ctx) => {
    loadOriginalImg(ctx);
    let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    let intensity = document.querySelector("#intensityBinary").value;
    let r;
    let b;
    let g;
    for (let y = 0; y < ctx.canvas.height; y++) {
        for (let x = 0; x < ctx.canvas.width; x++) {
            index = (x + y * imageData.width) * 4;
            r = getRed(imageData, x, y);
            g = getGreen(imageData, x, y);
            b = getBlue(imageData, x, y);
            let average = ((r + g + b) / 3);
            if (average < (intensity)) {
                imageData.data[index + 0] = 0;
                imageData.data[index + 1] = 0;
                imageData.data[index + 2] = 0;
            } else {
                imageData.data[index + 0] = 255;
                imageData.data[index + 1] = 255;
                imageData.data[index + 2] = 255;
            }
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

let applySepiaFilter = () => {
    loadOriginalImg(ctx);
    let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    let intensity = document.querySelector("#intensitySepia").value;
    let red;
    let blue;
    let green;
    for (let y = 0; y < ctx.canvas.height; y++) {
        for (let x = 0; x < ctx.canvas.width; x++) {
            index = (x + y * imageData.width) * 4;
            red = 0.393 * imageData.data[index + 0] + 0.769 * imageData.data[index + 1] + 0.189 * imageData.data[index + 2];
            if (red > intensity)
                red = intensity;
            green = 0.349 * imageData.data[index + 0] + 0.686 * imageData.data[index + 1] + 0.168 * imageData.data[index + 2];
            if (green > intensity)
                green = intensity;
            blue = 0.272 * imageData.data[index + 0] + 0.534 * imageData.data[index + 1] + 0.131 * imageData.data[index + 2];
            if (blue > intensity)
                blue = intensity;
            imageData.data[index + 0] = red;
            imageData.data[index + 1] = green;
            imageData.data[index + 2] = blue;
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

let addRange = (filter) => {
    ocultAllRanges();
    document.querySelector(".intensity").classList.remove('hidden');
    document.querySelector("#intensity" + filter).classList.remove('hidden');
}

let ocultAllRanges = () => {
    document.querySelector("#intensityBrightness").classList.remove('hidden');
    document.querySelector("#intensityBrightness").classList.add('hidden');

    document.querySelector("#intensityBlackAndWhite").classList.remove('hidden');
    document.querySelector("#intensityBlackAndWhite").classList.add('hidden');

    document.querySelector("#intensityBinary").classList.remove('hidden');
    document.querySelector("#intensityBinary").classList.add('hidden');

    document.querySelector("#intensitySepia").classList.remove('hidden');
    document.querySelector("#intensitySepia").classList.add('hidden');
}

let ctx = document.querySelector("#canvas").getContext("2d");
let imageOrigin = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
let loadPage = () => {
    let imageData;
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
        addImgToCanvas(ctx, imageData);
    });
    let btnFilterNegative = document.querySelector("#btnFilterNegative");
    btnFilterNegative.addEventListener("click", function (e) { applyNegativeFilter(ctx) });

    let btnFilterBrightness = document.querySelector("#btnFilterBrightness");
    btnFilterBrightness.addEventListener("click", function (e) {
        applyBrightnessFilter(ctx);
        addRange("Brightness");
    });
    document.querySelector("#intensityBrightness").addEventListener("change", function (e) { applyBrightnessFilter(ctx) });

    let btnFilterBlackAndWhite = document.querySelector("#btnFilterBlackAndWhite");
    btnFilterBlackAndWhite.addEventListener("click", function (e) {
        applyBlackAndWhiteFilter(ctx);
        addRange("BlackAndWhite");
    });
    document.querySelector("#intensityBlackAndWhite").addEventListener("change", function (e) { applyBlackAndWhiteFilter(ctx) });

    let btnFilterBinary = document.querySelector("#btnFilterBinary");
    btnFilterBinary.addEventListener("click", function (e) {
        applyBinaryFilter(ctx);
        addRange("Binary");
    });
    document.querySelector("#intensityBinary").addEventListener("change", function (e) { applyBinaryFilter(ctx) });

    let btnFilterSepia = document.querySelector("#btnFilterSepia");
    btnFilterSepia.addEventListener("click", function (e) {
        applySepiaFilter(ctx)
        addRange("Sepia");
    });
    document.querySelector("#intensitySepia").addEventListener("change", function (e) { applySepiaFilter(ctx) });
}
document.addEventListener("DOMContentLoaded", loadPage);