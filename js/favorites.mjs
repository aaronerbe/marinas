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
        this.searchInputValue = searchInputValue;
        this.fetchFavorites();
        //check if the new search already exists in localstorage, if not, add it
        const exists = this.favoritesArray.some(item => 
            Object.values(item)[0].toLowerCase() === this.searchInputValue.toLowerCase());
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
    renderMenu(){
        this.menuContainer.innerHTML = 'Saved Location Searches';
        if (this.favoritesArray.length === 0){
            const msg = document.createElement('div');
            msg.innerText = "No Saved Locations"
            this.menuContainer.appendChild(msg);
        }
        else{
            //Attach clickanywheretoclose function to event listener
            document.addEventListener('click', this.clickAnywhereToClose.bind(this));

            this.favoritesArray.forEach(item => {
                //todo not used yet  - const index = Object.keys(item);
                const menuItem = document.createElement('div');
                const location = capitalizeLocation(Object.values(item)[0]);
                menuItem.innerText = location;
                menuItem.classList.add('favorite-location');

                // Add a click event listener to handle the click on the menu item
                menuItem.addEventListener('click', () => {
                    loadSearch(location);
                    this.hideMenu();
                });
                this.menuContainer.appendChild(menuItem);
            });
        }
        showElement(this.menuContainer)
        this.map.style.zIndex='-1';
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