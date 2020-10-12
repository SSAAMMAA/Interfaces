const img = document.querySelector("#toy_story_logo");

window.addEventListener("mousemove", (e) => {
    const x = e.pageX;
    const y = e.pageY;

    let width = window.innerWidth;    
    let height = window.innerHeight;

    const maxYAngle = 50;
    const maxXAngle = maxYAngle * height / width;

    const horizontalFactor = maxXAngle * (x / width - 0.5);
    const verticalFactor = -maxYAngle * (y / height - 0.5);
    img.style.transformStyle = `preserve-3d`;
    img.style.transform = `scale(0.8) translate3d(0,0,-100px) rotateY(${horizontalFactor}deg) rotateX(${verticalFactor}deg)`;
});

// let loading = () =>{

// }

//COUNTDOWN
let countDownDate = new Date("Dec 10, 2020 18:00:00").getTime();

let x = setInterval(function() {

  let now = new Date().getTime();

  let distance = countDownDate - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.querySelector("#countdown").innerHTML = "El estreno sera en " + days + " dias, " + hours + " horas, "
  + minutes + " minutos, " + seconds + " segundos";

  if (distance < 0) {
    clearInterval(x);
    document.querySelector("#countdown").innerHTML = "Ya podes ir a buscar tu entrada";
  }
}, 1000);

//MENU HAMBURGESA
function abrirMenu() {
    let x = document.querySelector("#myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  document.querySelector("#menu-input").addEventListener("click",abrirMenu);