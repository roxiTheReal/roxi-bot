window.addEventListener("scroll", () => {
    const nav = document.querySelector(".topnav");
    if (window.scrollY > 0) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});