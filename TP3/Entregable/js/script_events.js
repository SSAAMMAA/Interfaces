function disableScroll() {
	window.scrollTo(0, 0);
}

let loading = () => {
	document.querySelector(".acordeon").style.filter = `blur(4px)`;
	document.querySelector(".burger-menu").style.filter = `blur(4px)`;
	document.querySelector(".transition-container").style.filter = `blur(4px)`;
	document.querySelector("#forum").style.filter = `blur(4px)`;
	document.querySelector(".loading").classList.remove("hidden");
	setTimeout(function () { stopLoading(); }, 6000);
}

let stopLoading = () => {
	document.querySelector(".acordeon").style.filter = `blur(0px)`;
	document.querySelector(".burger-menu").style.filter = `blur(0px)`;
	document.querySelector(".transition-container").style.filter = `blur(0px)`;
	document.querySelector("#forum").style.filter = `blur(0px)`;
	document.querySelector(".loading").classList.add("hidden");
	window.removeEventListener('scroll', disableScroll);
}

//MENU HAMBURGESA
function abrirMenu() {
	document.querySelector("#myLinks").classList.toggle("transform-active");
	document.querySelector("#forum-link").addEventListener("click", loading);
}
document.querySelector("#menu-input").addEventListener("click", abrirMenu);
document.querySelector(".cajaPar").style.transform = "translateX(-1000 px)";
document.querySelector(".cajaImpar").style.transform = "translateX(1000 px)";

//animar entrada de comentarios
let changeOpacity = (className, opacity) => {
	var elems = document.querySelectorAll(className);
	var index = 0, length = elems.length;
	for (; index < length; index++) {
		elems[index].style.transition = "opacity 2s linear 0s";
		elems[index].style.opacity = opacity;
	}
}
window.onscroll = function () {
	let pos = window.pageYOffset || document.documentElement.scrollTop;
	changeOpacity(".cajaPar", pos * 0.001);
	changeOpacity(".cajaImpar", pos * 0.001);
	changeOpacity(".form-coment", (pos - 300) * 0.001);
}

//animar boton de send
document.querySelector("#button-send").addEventListener("click", function (e) {
	e.preventDefault();
	document.querySelector(".button-text").style.transition = "opacity .5s linear 0s";
	document.querySelector(".button-img").style.transition = "opacity .5s linear 0s";
	document.querySelector(".button-text").style.display = "none";
	document.querySelector(".button-text").innerHTML = "Enviado exitosamente";
	document.querySelector(".button-img").style.display = "block";
	setTimeout(function () { 
		document.querySelector("#button-send").style.background = "#329b3f";
		document.querySelector(".button-text").style.display = "block";
		document.querySelector(".button-img").style.display = "none";
		setTimeout(function () { 
			document.querySelector("#button-send").style.background = "#854aaf";
			document.querySelector(".button-text").innerHTML = "Enviar comentario";
		}, 3000);
	}, 3000);

});
//document.addEventListener("DOMContentLoaded", loading);