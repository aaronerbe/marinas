import { loadHeaderFooter, showElement, convertCoordToLocation, splitCityStateCountry} from "./utils.mjs";
//import windyMap from "./windy.js";
import { updateOptions } from "./windy.mjs";

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
        console.log(coords);
        console.log(coords.lat, coords.lng);
        const lat = coords.lat;
        const lon = coords.lng;
        updateOptions(lat, lon);
        //windyMap.init()
        //initializeMap(lat, lon);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}