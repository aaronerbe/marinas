
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
    const headerTemplate = await loadTemplate('../partials/header.html');
    const footerTemplate = await loadTemplate('../partials/footer.html');
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
//remove dashes and capitalize a word used for category in a couple places
export function capitalizeWord(word) {
    if (word !== null) {
    word = word.replace(/-/g, ' ');
    const words = word.split(' ');
    const capitalizedWords = words.map(w => w.charAt(0).toUpperCase() + w.slice(1));
    return capitalizedWords.join(' ');}
}


/* 
░█░█░▀█▀░█▀▄░█▀▀░░█▀▀░█░░░█▀▀░█▄█░█▀▀░█▀█░▀█▀
░█▀█░░█░░█░█░█▀▀░░█▀▀░█░░░█▀▀░█░█░█▀▀░█░█░░█░
░▀░▀░▀▀▀░▀▀░░▀▀▀░░▀▀▀░▀▀▀░▀▀▀░▀░▀░▀▀▀░▀░▀░░▀░
*/
//Toggle visibility of the cart counter depending on if something is in it
//default is hidden
export function showElement(element) {
    element.classList.add('visible');
    element.classList.remove('hidden');
}
export function hideElement(element) {
    element.classList.add('hidden');
    element.classList.remove('visible');
}

/* 
░█▀▀░█▀█░█▀█░█▀▄░█▀▄░░░▀█▀░█▀█░░░█▀▀░▀█▀░▀█▀░█░█░░░█░█▀▀░▀█▀
░█░░░█░█░█░█░█▀▄░█░█░░░░█░░█░█░░░█░░░░█░░░█░░░█░░▄▀░░▀▀█░░█░
░▀▀▀░▀▀▀░▀▀▀░▀░▀░▀▀░░░░░▀░░▀▀▀░░░▀▀▀░▀▀▀░░▀░░░▀░░▀░░░▀▀▀░░▀░
*/
export async function convertCoordToLocation(city, state, country) {
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
    const cleanedInput = inputString.toLowerCase().trim();
    const parts = cleanedInput.split(',').map(part => part.trim());

    const city = parts[0];
    const state = parts.length > 1 ? parts[1] : null;
    const country = parts.length > 2 ? parts[2] : null;

    return { city, state, country };
}