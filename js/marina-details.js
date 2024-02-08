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
//console.log(marina);
marina.renderMarinaDetails('marina-details');
//console.table('marina array =',marina);

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
