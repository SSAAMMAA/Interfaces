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