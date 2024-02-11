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

//destroy orig id=windy element so we can replace it with js built element structure
//was a rare case that popped up.  this seemed to fix it.  windy api really wants to see the windy element in the html structure before moving on.
const ogWindy = document.getElementById('windy');
ogWindy.remove();
//map object
const map = new Map()
await map.init(lat, lon, marina, webCams, "DETAIL");
