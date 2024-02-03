import { loadHeaderFooter, showElement, convertCoordToLocation, splitCityStateCountry} from "./utils.mjs";
//import windyMap from "./windy.js";
import { updateMapOptions } from "./windy.mjs";
import { getMarinaInfoFromSearch } from "./marinas.mjs";

loadHeaderFooter();

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput')
const mapElement = document.getElementById('windy');
//const map = new windyMap();

searchButton.addEventListener('click', async () => {
    search(searchInput);
});
searchInput.addEventListener('keydown', async(event) => {
    if (event.key ==='Enter'){
        search(searchInput)
    }
})

async function search(){
    //const searchInput = document.getElementById('searchInput').value;

    if (mapElement.classList.contains('hidden')) {
        showElement(mapElement);
    }

    console.log(searchInput.value);

    try {
        // break it up into 3 vars to pass into the conversion function
        let { city, state, country } = splitCityStateCountry(searchInput.value);
        console.log(city, state, country);
        // convert to coords
        const coords = await convertCoordToLocation(city, state, country);
        const lat = coords.lat;
        const lon = coords.lng;
        const marinas = await getMarinaInfoFromSearch(lat, lon)
        console.log(marinas);
        updateMapOptions(lat, lon, marinas);

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

//const lat = '39.259790916124274';
//const lon = '-76.6135644707624';
////const url = buildBaseURL(lat, lon)
//    console.log(`list = `, marinas);