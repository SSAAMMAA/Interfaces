function disableScroll() {
  window.scrollTo(0, 0);
}

let loading = () => {
  document.querySelector(".acordeon").style.filter = `blur(4px)`;
  document.querySelector(".burger-menu").style.filter = `blur(4px)`;
  document.querySelector(".transition-container").style.filter = `blur(4px)`;
  document.querySelector(".forum").style.filter = `blur(4px)`;

  document.querySelector(".loading").classList.remove("hidden");
  window.addEventListener('scroll', disableScroll);
  setTimeout(function () { stopLoading(); }, 6000);
}

let stopLoading = () => {
  document.querySelector(".acordeon").style.filter = `blur(0px)`;
  document.querySelector(".burger-menu").style.filter = `blur(0px)`;
  document.querySelector(".transition-container").style.filter = `blur(0px)`;
  document.querySelector(".forum").style.filter = `blur(0px)`;
  document.querySelector(".loading").classList.add("hidden");
  window.removeEventListener('scroll', disableScroll);
}


//MENU HAMBURGESA
function abrirMenu() {
  document.querySelector("#myLinks").classList.toggle("transform-active");
}
document.querySelector("#menu-input").addEventListener("click", abrirMenu);

//document.addEventListener("DOMContentLoaded", loading);