import Marina from "./Marinas.mjs";
import { getParams, loadHeaderFooter } from "./utils.mjs";
import Map from "./Map.mjs";
/*
░█░░░█▀█░█▀█░█▀▄░░░█░█░█▀▀░█▀█░█▀▄░█▀▀░█▀▄░░░█░█▀▀░█▀█░█▀█░▀█▀░█▀▀░█▀▄
░█░░░█░█░█▀█░█░█░░░█▀█░█▀▀░█▀█░█░█░█▀▀░█▀▄░▄▀░░█▀▀░█░█░█░█░░█░░█▀▀░█▀▄
░▀▀▀░▀▀▀░▀░▀░▀▀░░░░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀░▀░░░▀░░░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀
*/
loadHeaderFooter();

/* 
░█▄█░█▀█░█▀▄░▀█▀░█▀█░█▀█░░░█▀█░█▀▄░▀▀█░█▀▀░█▀▀░▀█▀
░█░█░█▀█░█▀▄░░█░░█░█░█▀█░░░█░█░█▀▄░░░█░█▀▀░█░░░░█░
░▀░▀░▀░▀░▀░▀░▀▀▀░▀░▀░▀░▀░░░▀▀▀░▀▀░░▀▀░░▀▀▀░▀▀▀░░▀░
*/
const marinaID = getParams('marina');
const marina = new Marina(marinaID,0,0,"ID");
await marina.init();
marina.renderMarinaDetails('marina-details');

/* 
░█▀▄░█░█░▀█▀░█░░░█▀▄░░░█▄█░█▀█░█▀█
░█▀▄░█░█░░█░░█░░░█░█░░░█░█░█▀█░█▀▀
░▀▀░░▀▀▀░▀▀▀░▀▀▀░▀▀░░░░▀░▀░▀░▀░▀░░
*/
const lat = marina.data.location.lat;
const lon = marina.data.location.lon;
//map object
const map = new Map()
map.init(lat, lon, marina, "DETAIL");

/* 
░█▀▀░█▀█░█▀▄░█▀█░█░█░█▀▀░█▀▀░█░░░░░█░█░█▀█░█▀█░█▀▄░█░░░█▀▀░█▀▄
░█░░░█▀█░█▀▄░█░█░█░█░▀▀█░█▀▀░█░░░░░█▀█░█▀█░█░█░█░█░█░░░█▀▀░█▀▄
░▀▀▀░▀░▀░▀░▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀░░░▀░▀░▀░▀░▀░▀░▀▀░░▀▀▀░▀▀▀░▀░▀
*/
//carousel button handling
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    updateCarousel();
});
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    updateCarousel();
});
function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}


