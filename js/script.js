document.querySelector(".menu_btn").addEventListener("click", () => {
    document.querySelector(".sidebar_menu").classList.remove("hidden");
})
document.querySelector(".sidebar .close").addEventListener("click", () => {
    document.querySelector(".sidebar_menu").classList.add("hidden");
})
hljs.highlightAll();