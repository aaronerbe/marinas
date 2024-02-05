//todo create a list from localStorage that loads saved locations
//if it's empty, give a message to add a city to favorites
//todo need to find a spot to save favorites
//todo change the current favorites drop down on the search to give a filter list for the types of marinas

import { hideElement, showElement } from "./utils.mjs";


export function saveFavorite(searchInputValue) {
    // Get existing favorites from localStorage
    const existingFavorites = localStorage.getItem('favLocations') || '[]';
    // Parse the existing data into an array
    let dataArray = JSON.parse(existingFavorites);
    // Check if the searchInput value already exists in the array
    const exists = dataArray.some(item => Object.values(item)[0] === searchInputValue);
    // If it doesn't exist, add the new location to the array with the key as the array length
    if (!exists) {
        dataArray.push({ [dataArray.length]: searchInputValue });
        // Update localStorage with the modified array
        localStorage.setItem("favLocations", JSON.stringify(dataArray));
        console.log('Location added to favorites');
    } else {
        console.log('Location already exists in favorites');
    }
}

export function populateFavoritesMenu(elementContainer, key) {
    // Get existing favorites from localStorage
    const existingFavorites = localStorage.getItem(key) || '[]';
    // Parse the existing data into an array
    const dataArray = JSON.parse(existingFavorites);
    // Get the menu container
    const menuContainer = document.getElementById(elementContainer);
    // Clear the existing content of the menu container
    menuContainer.innerHTML = '';
    console.table(dataArray);

    // Iterate through the array and create clickable menu items
    dataArray.forEach(item => {
        const index = Object.keys(item)[0];
        const location = Object.values(item)[0];
        // Create a menu item
        const menuItem = document.createElement('div');
        menuItem.textContent = location;
        menuItem.classList.add('favorite-item');
        // Add a click event listener to handle the click on the menu item
        menuItem.addEventListener('click', () => {
            // Do something when a favorite is clicked, e.g., navigate to the location
            console.log(`Clicked on favorite location: ${location}`);
            hideElement(menuContainer)
        });

        // Append the menu item to the menu container
        menuContainer.appendChild(menuItem);
        showElement(menuContainer)
    });
}

