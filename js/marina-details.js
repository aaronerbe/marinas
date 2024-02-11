import Marina from "./Marinas.mjs";
import { getParams, loadHeaderFooter } from "./utils.mjs";
import Map from "./Map.mjs";
import WebCams from "./WebCams.mjs";

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
//webcam object
const webCams = new WebCams(lat, lon)
await webCams.init();
//map object
const map = new Map()
map.init(lat, lon, marina, webCams, "DETAIL");






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

//handle case when there are no buttons (becuase the marina has no images)
if(prevBtn && nextBtn){
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
}


