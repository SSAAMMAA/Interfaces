let loadPage = () => {
    let progressBtn = document.querySelector(".progress-btn");
    progressBtn.addEventListener("click", function (e) {
        progressBtn.classList.remove("active");
        progressBtn.classList.add("active");
        setTimeout(function () {
            progressBtn.classList.remove("active");
        }, 10000);
    })
}
document.addEventListener("DOMContentLoaded", loadPage);