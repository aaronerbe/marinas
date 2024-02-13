import { hideElement, showElement, loadSearch, capitalizeLocation, renderMessage, hideMessage } from "./utils.mjs";

/* 
░█▀▀░█▀█░█░█░█▀█░█▀▄░▀█▀░▀█▀░█▀▀░█▀▀
░█▀▀░█▀█░▀▄▀░█░█░█▀▄░░█░░░█░░█▀▀░▀▀█
░▀░░░▀░▀░░▀░░▀▀▀░▀░▀░▀▀▀░░▀░░▀▀▀░▀▀▀
*/
export default class Favorites{
    constructor(key){
        this.searchInputValue = "";
        this.elementContainer = "";
        this.menuContainer = "";
        this.deleteBtnContainer = "";
        this.bookmarksElement = "";
        this.map = ""
        this.favoritesArray
        this.key = key;
    }
    /* 
    ░█▀▀░█▀█░█░█░█▀▀░░░█▀▀░█▀█░█░█░█▀█░█▀▄░▀█▀░▀█▀░█▀▀
    ░▀▀█░█▀█░▀▄▀░█▀▀░░░█▀▀░█▀█░▀▄▀░█░█░█▀▄░░█░░░█░░█▀▀
    ░▀▀▀░▀░▀░░▀░░▀▀▀░░░▀░░░▀░▀░░▀░░▀▀▀░▀░▀░▀▀▀░░▀░░▀▀▀
    */
    saveFavorite(searchInputValue){
        //get fav from localstorage & then parse into array
        this.searchInputValue = searchInputValue.toLowerCase();
        this.fetchFavorites();
        //check if the new search already exists in localstorage, if not, add it
        const exists = this.favoritesArray.some(item => 
            Object.values(item)[0].toLowerCase() === this.searchInputValue);
        // add as a key value pair.
        if (!exists && searchInputValue!="" && searchInputValue != null) {
            this.favoritesArray.push({ [this.favoritesArray.length]: searchInputValue });
            // Update localStorage with the modified array
            localStorage.setItem(this.key, JSON.stringify(this.favoritesArray));
            
            renderMessage(`${capitalizeLocation(this.searchInputValue)} Saved to Favorites`, 'search-container', this.map)
        } else {
            renderMessage(`${capitalizeLocation(this.searchInputValue)} Already Saved to Favorites`, 'search-container', this.map)
        }
    }
    /* 
    ░█▀▄░█░█░▀█▀░█░░░█▀▄░░░█▀▀░█▀█░█░█░█▀█░█▀▄░▀█▀░▀█▀░█▀▀░░░█▄█░█▀▀░█▀█░█░█
    ░█▀▄░█░█░░█░░█░░░█░█░░░█▀▀░█▀█░▀▄▀░█░█░█▀▄░░█░░░█░░█▀▀░░░█░█░█▀▀░█░█░█░█
    ░▀▀░░▀▀▀░▀▀▀░▀▀▀░▀▀░░░░▀░░░▀░▀░░▀░░▀▀▀░▀░▀░▀▀▀░░▀░░▀▀▀░░░▀░▀░▀▀▀░▀░▀░▀▀▀
    */
    showFavoritesMenu(elementContainer, bookmarkID, mapID) {
        this.elementContainer = elementContainer
        hideMessage()   //first hide the tooltip
        this.fetchFavorites();
        this.menuContainer = document.getElementById(this.elementContainer);
        this.bookmarksElement = document.getElementById(bookmarkID);
        this.map = document.getElementById(mapID);
        if(this.menuContainer.classList.contains('hidden')){
            this.renderMenu()
        }
        else{
            this.hideMenu()
        }
    }
    /*
    ░█▀▄░█▀▀░█▀█░█▀▄░█▀▀░█▀▄░░░█▄█░█▀▀░█▀█░█░█
    ░█▀▄░█▀▀░█░█░█░█░█▀▀░█▀▄░░░█░█░█▀▀░█░█░█░█
    ░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀░░░▀░▀░▀▀▀░▀░▀░▀▀▀
    */
    renderMenu() {
        const deleteBtn = './images/icons/close_delete.svg';
        this.menuContainer.innerHTML = 'Saved Location Searches';
        //this.menuContainer.setAttribute('id','menuContainer');

        if (this.favoritesArray.length === 0) {
            const msg = document.createElement('div');
            msg.innerText = "No Saved Locations";
            this.menuContainer.appendChild(msg);
        } else {
            // Attach clickAnywhereToClose function to event listener
            document.addEventListener('click', this.clickAnywhereToClose.bind(this));

            this.favoritesArray.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.setAttribute('class', 'menuItem');
                const index = Object.keys(item)[0];
                const location = capitalizeLocation(Object.values(item)[0]);

                const menuLocation = document.createElement('div');
                menuLocation.innerText = location;
                menuLocation.classList.add('menuLocation');

                // Create a delete button
                const menuDelete = document.createElement('img');
                menuDelete.setAttribute('src', deleteBtn);
                menuDelete.setAttribute('alt', 'Delete');
                menuDelete.setAttribute('id', index);
                menuDelete.classList.add('delete-btn');

                // Add a click event listener to handle the click on the delete button
                menuDelete.addEventListener('click', () => {
                    this.handleDelete(location);
                });

                // Add a click event listener to handle the click on the menu item
                menuLocation.addEventListener('click', () => {
                    loadSearch(location);
                    this.hideMenu();
                });

                // Append both the menu item and the delete button to the menu container
                menuItem.appendChild(menuLocation);
                menuItem.appendChild(menuDelete);
                this.menuContainer.appendChild(menuItem)
            });
        }

        showElement(this.menuContainer);
        this.map.style.zIndex = '-1';
    }


    /* 
    ░█▀▄░█▀▀░█░░░█▀▀░▀█▀░█▀▀░░░█▀▀░█▀█░█░█░█▀█░█▀▄░▀█▀░▀█▀░█▀▀
    ░█░█░█▀▀░█░░░█▀▀░░█░░█▀▀░░░█▀▀░█▀█░▀▄▀░█░█░█▀▄░░█░░░█░░█▀▀
    ░▀▀░░▀▀▀░▀▀▀░▀▀▀░░▀░░▀▀▀░░░▀░░░▀░▀░░▀░░▀▀▀░▀░▀░▀▀▀░░▀░░▀▀▀
    */
    handleDelete(location){
        console.log(location);
        location = location.toLowerCase();
        // Get fav from localstorage & then parse into array
        this.fetchFavorites();
        // Check if the location is there
        console.log(this.favoritesArray);
    
        // Find the index of the item with the matching location value
        const indexToRemove = this.favoritesArray.findIndex(item => Object.values(item)[0].toLowerCase() === location);
    
        // Remove the item from the array if found
        if (indexToRemove !== -1) {
            this.favoritesArray.splice(indexToRemove, 1);
        }
    
        console.log(this.favoritesArray);
        localStorage.setItem(this.key, JSON.stringify(this.favoritesArray));
        //do a quick hide so showFavoritesmenu will handle it right.  
        // i have code in place to allow bookmarksbutton to toggle it off/on
        this.renderMenu();
        this.menuContainer.classList.add('visible');
        this.menuContainer.classList.remove('visible');
    }

    /* 
    ░█▀▀░█▀▀░▀█▀░█▀▀░█░█░░░█▀▀░█▀█░█░█░█▀█░█▀▄░▀█▀░▀█▀░█▀▀░█▀▀
    ░█▀▀░█▀▀░░█░░█░░░█▀█░░░█▀▀░█▀█░▀▄▀░█░█░█▀▄░░█░░░█░░█▀▀░▀▀█
    ░▀░░░▀▀▀░░▀░░▀▀▀░▀░▀░░░▀░░░▀░▀░░▀░░▀▀▀░▀░▀░▀▀▀░░▀░░▀▀▀░▀▀▀
    */
    fetchFavorites(){
        const savedFavorites = localStorage.getItem(this.key) || '[]';
        this.favoritesArray = JSON.parse(savedFavorites);
    }
    /* 
    ░█░█░▀█▀░█▀▄░█▀▀░░░█▄█░█▀▀░█▀█░█░█
    ░█▀█░░█░░█░█░█▀▀░░░█░█░█▀▀░█░█░█░█
    ░▀░▀░▀▀▀░▀▀░░▀▀▀░░░▀░▀░▀▀▀░▀░▀░▀▀▀
    */
    hideMenu(){
        hideElement(this.menuContainer);
        //hack to make the menu display over the map when it's showing
        this.map.style.zIndex='100';
    }
    /* 
    ░█░░░▀█▀░█▀▀░▀█▀░█▀▀░█▀█░█▀▀░█▀▄░░░▀█▀░█▀█░░░█▀▀░█░░░█▀█░█▀▀░█▀▀░░░█▄█░█▀▀░█▀█░█░█
    ░█░░░░█░░▀▀█░░█░░█▀▀░█░█░█▀▀░█▀▄░░░░█░░█░█░░░█░░░█░░░█░█░▀▀█░█▀▀░░░█░█░█▀▀░█░█░█░█
    ░▀▀▀░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀░▀▀▀░▀░▀░░░░▀░░▀▀▀░░░▀▀▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀░░░▀░▀░▀▀▀░▀░▀░▀▀▀
    */
    clickAnywhereToClose(event){
        // Check if the menu is visible
        if (!this.menuContainer.classList.contains('hidden')) {
            // Check if the clicked target is not part of the menu or the bookmarks element
            if (!this.menuContainer.contains(event.target) && !this.bookmarksElement.contains(event.target)) {
                // Hide the menu
                this.hideMenu();
                // Remove the event listener
                document.removeEventListener('click', this.clickAnywhereToClose); // Here is the change
            }
        }
    }
    
}
