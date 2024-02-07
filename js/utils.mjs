
/* 
░█░█░█▀▀░█▀█░█▀▄░█▀▀░█▀▄░░░█░█▀▀░█▀█░█▀█░▀█▀░█▀▀░█▀▄░░░█░░░█▀█░█▀█░█▀▄░█▀▀░█▀▄
░█▀█░█▀▀░█▀█░█░█░█▀▀░█▀▄░▄▀░░█▀▀░█░█░█░█░░█░░█▀▀░█▀▄░░░█░░░█░█░█▀█░█░█░█▀▀░█▀▄
░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀░▀░░░▀░░░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀░░░▀▀▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀
*/
export async function loadHeaderFooter(){
    //grab header/footer elements
    const header = document.getElementById('main-header');
    const footer = document.getElementById('main-footer');
    console.log(header);
    console.log(footer);
    //grab the template data
    const headerTemplate = await loadTemplate('./header.html');
    const footerTemplate = await loadTemplate('./footer.html');
    //returns a promise so I can do a .then for grabbing the hamburger (or anything I may need later)
    return new Promise((resolve, reject) =>{
        renderWithTemplate(headerTemplate, header);
        renderWithTemplate(footerTemplate, footer);
        resolve();
    })
    
}
/*
░█▀▀░█▀▀░▀█▀░█▀▀░█░█░░░▀█▀░█▀▀░█▄█░█▀█░█░░░█▀█░▀█▀░█▀▀
░█▀▀░█▀▀░░█░░█░░░█▀█░░░░█░░█▀▀░█░█░█▀▀░█░░░█▀█░░█░░█▀▀
░▀░░░▀▀▀░░▀░░▀▀▀░▀░▀░░░░▀░░▀▀▀░▀░▀░▀░░░▀▀▀░▀░▀░░▀░░▀▀▀
*/
export async function loadTemplate(path) {
    const response = await fetch(path);
    const template = await response.text();
    return template
}
/* 
░█▀▄░█▀▀░█▀█░█▀▄░█▀▀░█▀▄░░░▀█▀░█▀▀░█▄█░█▀█░█░░░█▀█░▀█▀░█▀▀
░█▀▄░█▀▀░█░█░█░█░█▀▀░█▀▄░░░░█░░█▀▀░█░█░█▀▀░█░░░█▀█░░█░░█▀▀
░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀░░░░▀░░▀▀▀░▀░▀░▀░░░▀▀▀░▀░▀░░▀░░▀▀▀
*/
export function renderWithTemplate(templateFn, parentElement, position = "afterbegin", clear=false){
    //templateFn = template data, parentElement = where were putting the template, data = ?, callback = ?, position = where we put it, clear = if true, clear existing data in the element
    if (clear){
        parentElement.innerHTML = '';
    }
    //insert the template data at the beginning of the element.
    parentElement.insertAdjacentHTML(position, templateFn);
}

/* 
░█▀▀░█░░░█▀▀░█▀█░█▀█░░░░░░░█▀▀░█▀█░█▀█░▀█▀░▀█▀░█▀█░█░░░▀█▀░▀▀█░█▀▀
░█░░░█░░░█▀▀░█▀█░█░█░░▄█▄░░█░░░█▀█░█▀▀░░█░░░█░░█▀█░█░░░░█░░▄▀░░█▀▀
░▀▀▀░▀▀▀░▀▀▀░▀░▀░▀░▀░░░▀░░░▀▀▀░▀░▀░▀░░░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀
*/
export function capitalizeLocation(locationString) {
    if (locationString !== null) {
        // Replace hyphens with spaces
        locationString = locationString.replace(/-/g, ' ');

        // Split the string into words
        const words = locationString.split(' ');

        // Map over each word and capitalize it
        const capitalizedWords = words.map(w => {
            // Check if the word is an abbreviated state
            const isStateAbbreviation = /^[a-zA-Z]{2}$/.test(w);
            
            // Capitalize each word, including state abbreviations
            return isStateAbbreviation ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
        });

        // Join the capitalized words back into a string
        return capitalizedWords.join(' ');
    }
}
/*
░█▀▄░█▀▀░█▀█░█▀▄░█▀▀░█▀▄░░░▀█▀░█▀█░█▀█░█░░░▀█▀░▀█▀░█▀█
░█▀▄░█▀▀░█░█░█░█░█▀▀░█▀▄░░░░█░░█░█░█░█░█░░░░█░░░█░░█▀▀
░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀░░░░▀░░▀▀▀░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░░
*/
export function renderMessage(message, targetElement) {
    hideMessage()
    const msg = document.createElement('div');
    const element = document.getElementById(targetElement);
    msg.id = 'popup-message';
    msg.innerHTML = message;
    
    // Add class to position the message below the target element
    //msg.classList.add('below');
    
    // Insert the new element just below the target element
    //targetElement.parentNode.insertBefore(msg, targetElement.nextSibling);
    //targetElement.insertAdjacentElement('afterend', msg);
    element.appendChild(msg)

}
export function hideMessage() {
    const msg = document.getElementById('popup-message');
    if (msg) {
        msg.remove();
    }
}

/* 
░█░█░▀█▀░█▀▄░█▀▀░░█▀▀░█░░░█▀▀░█▄█░█▀▀░█▀█░▀█▀
░█▀█░░█░░█░█░█▀▀░░█▀▀░█░░░█▀▀░█░█░█▀▀░█░█░░█░
░▀░▀░▀▀▀░▀▀░░▀▀▀░░▀▀▀░▀▀▀░▀▀▀░▀░▀░▀▀▀░▀░▀░░▀░
*/
export function showElement(element) {
    //Toggle visibility of any element using visible/hidden classes
    //default is hidden
    element.classList.add('visible');
    element.classList.remove('hidden');
}
export function hideElement(element) {
    //Toggle visibility of any element using visible/hidden classes
    //default is hidden
    element.classList.add('hidden');
    element.classList.remove('visible');
}

/* 
░█▀▀░█▀█░█▀█░█▀▄░█▀▄░░░▀█▀░█▀█░░░█▀▀░▀█▀░▀█▀░█░█░░░█░█▀▀░▀█▀
░█░░░█░█░█░█░█▀▄░█░█░░░░█░░█░█░░░█░░░░█░░░█░░░█░░▄▀░░▀▀█░░█░
░▀▀▀░▀▀▀░▀▀▀░▀░▀░▀▀░░░░░▀░░▀▀▀░░░▀▀▀░▀▀▀░░▀░░░▀░░▀░░░▀▀▀░░▀░
*/
export async function convertCoordToLocation(city, state, country) {
    //convert location search into usable coordinates
    try {
        const geocodingApiKey = '8f14ece6e8f5486286773645b8098166';
        const geocodingEndpoint = 'https://api.opencagedata.com/geocode/v1/json';

        // Construct the geocoding API request URL
        const query = `${city}${state ? `, ${state}` : ''}${country ? `, ${country}` : ''}`;
        const geocodingUrl = `${geocodingEndpoint}?q=${encodeURIComponent(query)}&key=${geocodingApiKey}`;

        // Perform the geocoding request
        const response = await fetch(geocodingUrl);
        const data = await response.json();

        if (data.results.length > 0) {
            // Use the first result's coordinates to initialize the Windy map
            const coordinates = data.results[0].geometry;
            //initializeMap(coordinates.lat, coordinates.lng);
            return coordinates;
        } else {
            throw new Error('Geocoding failed. No results found.');
        }
    } catch (error) {
        console.error('Error during geocoding:', error);
        throw error;
    }
}

/* 
░█▀▀░█▀█░█░░░▀█▀░▀█▀░░░█▀▀░▀█▀░▀█▀░█░█░░░█░█▀▀░▀█▀░█▀█░▀█▀░█▀▀
░▀▀█░█▀▀░█░░░░█░░░█░░░░█░░░░█░░░█░░░█░░▄▀░░▀▀█░░█░░█▀█░░█░░█▀▀
░▀▀▀░▀░░░▀▀▀░▀▀▀░░▀░░░░▀▀▀░▀▀▀░░▀░░░▀░░▀░░░▀▀▀░░▀░░▀░▀░░▀░░▀▀▀
*/
export function splitCityStateCountry(inputString) {
    //split up a location search into city, state, country parts
    const cleanedInput = inputString.toLowerCase().trim();
    const parts = cleanedInput.split(',').map(part => part.trim());

    const city = parts[0];
    const state = parts.length > 1 ? parts[1] : null;
    const country = parts.length > 2 ? parts[2] : null;

    return { city, state, country };
}

/*
░█░░░█▀█░█▀█░█▀▄░░░█▀▀░█▀▀░█▀█░█▀▄░█▀▀░█░█
░█░░░█░█░█▀█░█░█░░░▀▀█░█▀▀░█▀█░█▀▄░█░░░█▀█
░▀▀▀░▀▀▀░▀░▀░▀▀░░░░▀▀▀░▀▀▀░▀░▀░▀░▀░▀▀▀░▀░▀
*/
export function loadSearch(location){
    //programatically load in a loccation from bookmarks and hit enter
    const searchInputElement = document.getElementById('searchInput')
    let enterEvent = new KeyboardEvent('keydown', {key: 'Enter'});
    searchInputElement.innerHTML = '';
    searchInputElement.value = location;
    searchInputElement.dispatchEvent(enterEvent);
}

/*
░█▀▀░█░░░▀█▀░█▀▄░█▀▀░░░▄▀░░░░█▀▀░█░█░█▀▄░▀█▀░█▀█░█░█
░▀▀█░█░░░░█░░█░█░█▀▀░░░▄█▀░░░▀▀█░█▀█░█▀▄░░█░░█░█░█▀▄
░▀▀▀░▀▀▀░▀▀▀░▀▀░░▀▀▀░░░░▀▀░░░▀▀▀░▀░▀░▀░▀░▀▀▀░▀░▀░▀░▀
*/
export function slideAndShrink(){
    const imgContainer = document.getElementById('img-container');
    const searchContainer = document.getElementById('search-container');
    imgContainer.classList.add('shrink');
    searchContainer.classList.add('slide-up');
}

/*
░█▀▀░█▀▀░▀█▀░░█▀█░█▀█░█▀▄░█▀█░█▄█░█▀▀
░█░█░█▀▀░░█░░░█▀▀░█▀█░█▀▄░█▀█░█░█░▀▀█
░▀▀▀░▀▀▀░░▀░░░▀░░░▀░▀░▀░▀░▀░▀░▀░▀░▀▀▀
*/
export function getParams(param){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get(param)
    return product;
}