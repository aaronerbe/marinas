import { loadHeaderFooter, showElement, convertCoordToLocation, splitCityStateCountry, hideElement, renderMessage, hideMessage} from "./utils.mjs";
//import windyMap from "./windy.js";
import { updateMapOptions } from "./windy.mjs";
import { getMarinaInfoFromSearch } from "./marinas.mjs";
import { populateFavoritesMenu, saveFavorite } from "./favorites.mjs";

const mapElement = document.getElementById('windy');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput')
const saveFavElement = document.getElementById('saveFavButton');
const bookmarksElement = document.getElementById('bookmarkButton');
const menuClass = document.getElementById('favoritesMenu').classList


/* 
░█░░░█▀█░█▀█░█▀▄░░░█░█░█▀▀░█▀█░█▀▄░█▀▀░█▀▄░░░█░█▀▀░█▀█░█▀█░▀█▀░█▀▀░█▀▄
░█░░░█░█░█▀█░█░█░░░█▀█░█▀▀░█▀█░█░█░█▀▀░█▀▄░▄▀░░█▀▀░█░█░█░█░░█░░█▀▀░█▀▄
░▀▀▀░▀▀▀░▀░▀░▀▀░░░░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀░▀░░░▀░░░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀
*/
loadHeaderFooter()

/* 
░█▀█░█▀█░█▀▀░█▀█░░░█▀▄░█▀█░█▀█░█░█░█▄█░█▀█░█▀▄░█░█
░█░█░█▀▀░█▀▀░█░█░░░█▀▄░█░█░█░█░█▀▄░█░█░█▀█░█▀▄░█▀▄
░▀▀▀░▀░░░▀▀▀░▀░▀░░░▀▀░░▀▀▀░▀▀▀░▀░▀░▀░▀░▀░▀░▀░▀░▀░▀
*/
bookmarksElement.addEventListener('click', () => {
    populateFavoritesMenu('favoritesMenu', 'favLocations');
});
//generate & hide popup message
bookmarksElement.addEventListener('mouseenter', () => {
    if (menuClass == 'hidden'){
        renderMessage("Open A Saved Location", 'search-container')
        //needed to make it display over the top of the map
        mapElement.style.zIndex='-1';
    }
});
bookmarksElement.addEventListener('mouseleave', () => {
    if(menuClass =='hidden'){
        //needed to make the map functional again after displaying the msg
        mapElement.style.zIndex='100';
    }
    hideMessage();
});

/* 
░█▀▀░█▀█░█░█░█▀▀░░░█▀▀░█▀█░█░█░█▀█░█▀▄░▀█▀░▀█▀░█▀▀
░▀▀█░█▀█░▀▄▀░█▀▀░░░█▀▀░█▀█░▀▄▀░█░█░█▀▄░░█░░░█░░█▀▀
░▀▀▀░▀░▀░░▀░░▀▀▀░░░▀░░░▀░▀░░▀░░▀▀▀░▀░▀░▀▀▀░░▀░░▀▀▀
*/
saveFavElement.addEventListener('click', () => {
    saveFavorite(searchInput.value);
});
//generate & hide popup message
saveFavElement.addEventListener('mouseenter', () => {
    //needed to make it display over the top of the map
    mapElement.style.zIndex='-1';
    renderMessage("Save Location to Favorites", 'search-container')
});
saveFavElement.addEventListener('mouseleave', () => {
    //needed to make the map functional again after displaying the msg
    mapElement.style.zIndex='100';
    hideMessage();
});
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
async function search(){
    const imgContainer = document.getElementById('img-container');
    const searchContainer = document.getElementById('search-container');
    if (searchInput.value != ""){
        if (mapElement.classList.contains('hidden')) {
            showElement(mapElement);
            //imgContainer.setAttribute('id','shrink');
            imgContainer.classList.add('shrink');
            searchContainer.classList.add('slide-up');
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

}
