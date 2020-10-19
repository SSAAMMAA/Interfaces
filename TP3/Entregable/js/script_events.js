function disableScroll() {
	window.scrollTo(0, 0);
}

let loading = () => {
	document.querySelector(".acordeon").style.filter = `blur(4px)`;
	document.querySelector(".burger-menu").style.filter = `blur(4px)`;
	document.querySelector(".transition-container").style.filter = `blur(4px)`;
	document.querySelector("#forum").style.filter = `blur(4px)`;
	document.querySelector(".loading").classList.remove("hidden");
	setTimeout(function () { stopLoading(); }, 3000);
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

//animar boton de send y validacones de que los campos no esten vacios
let btn = document.querySelector(".btn");

btn.addEventListener("click", function (e) {
	e.preventDefault();
	let nombre = document.querySelector("#fname");
	let apellido = document.querySelector("#lname");
	let mensaje = document.querySelector("#subject");
	if (nombre.value == "") {
		nombre.style.background = "#d17f7f";
		nombre.addEventListener("click", function () {
			nombre.style.background = "#FFF";
		});
		setTimeout(function () {
			nombre.style.background = "#FFF";
		}, 4000);
	}
	if (apellido.value == "") {
		apellido.style.background = "#d17f7f";
		apellido.addEventListener("click", function () {
			apellido.style.background = "#FFF";
		});
		setTimeout(function () {
			apellido.style.background = "#FFF";
		}, 4000);
	}
	if (mensaje.value == "") {
		mensaje.style.background = "#d17f7f";
		mensaje.addEventListener("click", function () {
			mensaje.style.background = "#FFF";
		});
		setTimeout(function () {
			mensaje.style.background = "#FFF";
		}, 4000);
	}
	if ((nombre.value != "") && (apellido.value != "") && (mensaje.value != "")) {
		btn.classList.add('btn-progress');
		setTimeout(function () {
			btn.classList.add('btn-fill')
		}, 500);
		setTimeout(function () {
			btn.classList.remove('btn-fill')
		}, 4100);
		setTimeout(function () {
			btn.classList.add('btn-complete');
			document.querySelector("#user-coment").innerHTML = nombre.value + " " + apellido.value + ": ";
			document.querySelector("#new-coment").innerHTML = mensaje.value;
			document.querySelector(".new-box").classList.remove("hidden");
		}, 4100);
	}
});
document.addEventListener("DOMContentLoaded", loading);