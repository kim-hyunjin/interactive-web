const html = document.documentElement;
const body = document.querySelector("body");
const imgBox = document.getElementById("imgBox");
const img = document.getElementById("long-img");

body.style.height = `${img.clientHeight}px`;
let initialTop = -img.clientHeight + window.innerHeight;

imgBox.style.top = `${initialTop}px`;
window.addEventListener("scroll", () => {
  const scrollTop = html.scrollTop;
  imgBox.style.top = `${Math.min(0, initialTop + scrollTop)}px`;
});
