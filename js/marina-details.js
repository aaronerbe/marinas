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
console.log(marina.data)
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
const map = new Map()
//map object
await map.init(lat, lon, marina, webCams, "DETAIL");

