import { loadHeaderFooter, showElement, convertCoordToLocation, splitCityStateCountry} from "./js/utils.mjs";
//import windyMap from "./windy.js";
import { updateMapOptions } from "./js/windy.mjs";
import { getMarinaInfoFromSearch } from "./js/marinas.mjs";
import { populateFavoritesMenu, saveFavorite } from "./js/favorites.mjs";

//had to do it this way to address timing of the header being loaded before I grab the hamburger and make it visible.  
loadHeaderFooter().then(() => {
    const hamburger = document.getElementById('hamburger');
    console.log(hamburger);
    showElement(hamburger);
    //TODO add an event listener to the hamburger to open a menu for favorites
    hamburger.addEventListener('click', () => {
        //populateMenu();
        populateFavoritesMenu();
        //showMenu();
    });
});

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput')
const favButton = document.getElementById('favButton');
const mapElement = document.getElementById('windy');

/* 
░█▀▀░█▀▀░█▀█░█▀▄░█▀▀░█░█
░▀▀█░█▀▀░█▀█░█▀▄░█░░░█▀█
░▀▀▀░▀▀▀░▀░▀░▀░▀░▀▀▀░▀░▀
*/
searchButton.addEventListener('click', async () => {
    search(searchInput);
});
searchInput.addEventListener('keydown', async(event) => {
    if (event.key ==='Enter'){
        search(searchInput)
    }
})

favButton.addEventListener('click', () => {
    saveFavorite(searchInput.value);
});


async function search(){
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
