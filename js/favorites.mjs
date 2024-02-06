//todo create a list from localStorage that loads saved locations
//if it's empty, give a message to add a city to favorites
//todo need to find a spot to save favorites
//todo change the current favorites drop down on the search to give a filter list for the types of marinas

import { hideElement, showElement, loadSearch, capitalizeLocation, renderMessage, hideMessage } from "./utils.mjs";


export function saveFavorite(searchInputValue) {
    console.log(searchInputValue)
    // Get existing favorites from localStorage
    const existingFavorites = localStorage.getItem('favLocations') || '[]';
    // Parse the existing data into an array
    let dataArray = JSON.parse(existingFavorites);
    // Check if the searchInput value already exists in the array
    const exists = dataArray.some(item => Object.values(item)[0].toLowerCase() === searchInputValue.toLowerCase());

    // If it doesn't exist, add the new location to the array with the key as the array length
    //also make sure it's not an empty string
    if (!exists && searchInputValue!="" && searchInputValue != null) {
        dataArray.push({ [dataArray.length]: searchInputValue });
        // Update localStorage with the modified array
        localStorage.setItem("favLocations", JSON.stringify(dataArray));
        renderMessage(`${capitalizeLocation(searchInputValue)} Saved to Favorites`, 'search-container')
    } else {
        if(exists){
            renderMessage(`${capitalizeLocation(searchInputValue)} Already Saved to Favorites`, 'search-container')
        }else{
        }
    }
}

export function populateFavoritesMenu(elementContainer, key) {
    //first hide the tooltip
    hideMessage()

    // Get existing favorites from localStorage then parse it
    const existingFavorites = localStorage.getItem(key) || '[]';
    const dataArray = JSON.parse(existingFavorites);
    const menuContainer = document.getElementById(elementContainer);
    const map = document.getElementById('windy');
    const bookmarksElement = document.getElementById('bookmarkButton');

    //see if it's alrady shown, if so, toggle it hidden
    if(menuContainer.classList.contains('visible')){
        hideElement(menuContainer);
        //hack to make the menu display over the map when it's showing
        map.style.zIndex='100';
    }
    else{
        menuContainer.innerHTML = 'Saved Location Searches';
        if (dataArray.length === 0){
            const msg = document.createElement('div');
            msg.innerText = "No Saved Locations"
            menuContainer.appendChild(msg);
        }
        else{
            //create an event listener to click anywhere on doc and close the menu.  
            //have to include the bookmarksElement so you can actually click on the bookmark to open the menu..
            document.addEventListener('click', function(event){
                if(!menuContainer.contains(event.target) && !bookmarksElement.contains(event.target)){
                    hideElement(menuContainer)
                    document.removeEventListener('click', arguments.callee);
                }
            });
            // Iterate through the array and create clickable menu items
            //todo  need to add favorite marinas here.  will also need to add another event below for when marinas are clicked on (which would have different eventlistener function - something like openMarina(location)
            dataArray.forEach(item => {
                //todo not used yet
                //const index = Object.keys(item);
                const menuItem = document.createElement('div');
                const location = capitalizeLocation(Object.values(item)[0]);
                console.log(location)
                menuItem.innerText = location;
                menuItem.classList.add('favorite-location');
                // Add a click event listener to handle the click on the menu item
                menuItem.addEventListener('click', () => {
                    // Do something when a favorite is clicked, e.g., navigate to the location
                    console.log(`Clicked on favorite location: ${location}`);
                    loadSearch(location)
                    hideElement(menuContainer)
                    //hack to make the menu display over the map when it's showing
                    map.style.zIndex='100';
                });
                // Append the menu item to the menu container
                menuContainer.appendChild(menuItem);
            });
        }
        showElement(menuContainer)
        //hack to make the menu display over the map when it's showing
        //also reset the zIndex to 100 when I hide the map
        map.style.zIndex='-1';
    }
}

