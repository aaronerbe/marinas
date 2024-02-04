import { loadHeaderFooter, showElement, convertCoordToLocation, splitCityStateCountry} from "./utils.mjs";
//import windyMap from "./windy.js";
import { updateMapOptions } from "./windy.mjs";
import { getMarinaInfoFromSearch } from "./marinas.mjs";

//had to do it this way to address timing of the header being loaded before I grab the hamburger and make it visible.  
loadHeaderFooter().then(() => {
    const hamburger = document.getElementById('hamburger');
    console.log(hamburger);
    showElement(hamburger);
    //TODO add an event listener to the hamburger to open a menu for favorites
    hamburger.addEventListener('click', () => {
        // Call your function to dynamically populate the menu
        //populateMenu();
        //showMenu();
    });
});


const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput')
const favButton = document.getElementById('favButton');
console.log(favButton);
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
    // Get existing favorites from localStorage
    const existingFavorites = localStorage.getItem('favLocations') || '[]';

    // Parse the existing data into an array
    let dataArray = JSON.parse(existingFavorites);

    // Add the new location to the array with the key as the array length
    dataArray.push({ [dataArray.length]: searchInput.value });

    // Update localStorage with the modified array
    localStorage.setItem("favLocations", JSON.stringify(dataArray));

    console.log('Location added to favorites');
});



//favButton.addEventListener('click', () => {
//    // get existing favorites
//    const existingFavorites = JSON.parse(localStorage.getItem('favLocations')) || [];

//    // add the new location to the array
//    existingFavorites.push({ 'location': searchInput.value });

//    // save the updated array back to localStorage
//    localStorage.setItem('favLocations', JSON.stringify(existingFavorites));

//    console.log('Location set');
//});

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
