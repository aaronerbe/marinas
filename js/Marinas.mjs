import { convertCoordToLocation, capitalizeLocation } from "./utils.mjs";
/* 
░█▄█░█▀█░█▀▄░▀█▀░█▀█░█▀█░░░█▀▀░█░░░█▀█░█▀▀░█▀▀
░█░█░█▀█░█▀▄░░█░░█░█░█▀█░░░█░░░█░░░█▀█░▀▀█░▀▀█
░▀░▀░▀░▀░▀░▀░▀▀▀░▀░▀░▀░▀░░░▀▀▀░▀▀▀░▀░▀░▀▀▀░▀▀▀
*/
export default class Marina {
    constructor(marinaID="", lat=0, lon=0,type){
        this.marinaID = marinaID;
        this.lat = lat;
        this.lon = lon;
        this.type = type;
        this.data = {};
        this.key = 'YYmZxvMSyMqaCyf6PuLz';
    }
    /* 
    ░▀█▀░█▀█░▀█▀░▀█▀
    ░░█░░█░█░░█░░░█░
    ░▀▀▀░▀░▀░▀▀▀░░▀░
    */
    async init() {
        const data = await this.fetchMarinaData();
    }
    /*
    ░█▀▀░█▀▀░▀█▀░█▀▀░█░█░░░█▄█░█▀█░█▀▄░▀█▀░█▀█░█▀█░░░▀█▀░█▀█░█▀▀░█▀█
    ░█▀▀░█▀▀░░█░░█░░░█▀█░░░█░█░█▀█░█▀▄░░█░░█░█░█▀█░░░░█░░█░█░█▀▀░█░█
    ░▀░░░▀▀▀░░▀░░▀▀▀░▀░▀░░░▀░▀░▀░▀░▀░▀░▀▀▀░▀░▀░▀░▀░░░▀▀▀░▀░▀░▀░░░▀▀▀
    */
    async fetchMarinaData() {
        let url = "";
        if (this.type == "ID"){
            url = this.buildBaseURL(this.marinaID);
        }
        else{
            url = this.buildBaseURL(this.lat, this.lon); // Pass this.accessToken
        }
        const response = await fetch(url, {
        //const response = await fetch("https://api.marinas.com/v1/marinas/4qcq", {
            method: 'GET', // GET method doesn't have a body
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.data = await response.json();
    }
    /* 
    ░█▀▄░█░█░▀█▀░█░░░█▀▄░░░█░█░█▀▄░█░░
    ░█▀▄░█░█░░█░░█░░░█░█░░░█░█░█▀▄░█░░
    ░▀▀░░▀▀▀░▀▀▀░▀▀▀░▀▀░░░░▀▀▀░▀░▀░▀▀▀
    */
    /* Build the base URL with access token as a query parameter */
    buildBaseURL(latOrMarinaID, lon) {
        if (lon !== undefined) {
            // If lon is defined, it means we are building a search URL
            return `https://api.marinas.com/v1/points/search?location[lat]=${latOrMarinaID}&location[lon]=${lon}&access_token=${this.key}`;
        } else {
            // Otherwise, it's an ID URL
            return `https://api.marinas.com/v1/marinas/${latOrMarinaID}`
            //return `https://api.marinas.com/v1/marinas/${latOrMarinaID}?access_token=${this.key}`;
            //return `https://api.marinas.com/v1/marinas/4qcq`
        }
    }
    /* 
    ░█▀▄░█▀▀░█▀█░█▀▄░█▀▀░█▀▄░░░█▀▄░█▀▀░▀█▀░█▀█░▀█▀░█░░░█▀▀
    ░█▀▄░█▀▀░█░█░█░█░█▀▀░█▀▄░░░█░█░█▀▀░░█░░█▀█░░█░░█░░░▀▀█
    ░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀░░░▀▀░░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀▀░▀▀▀
    */
    async renderMarinaDetails(selector){
        //method to generate HTML to display our product
        //const element = document.getElementById(selector);
        //element.insertAdjacentHTML(
        //    "afterBegin",
            await this.marinaDetailsTemplate()
        //)
        /* 
        ░█▀▀░█▀█░█▀▄░█▀█░█░█░█▀▀░█▀▀░█░░░░░█░█░█▀█░█▀█░█▀▄░█░░░█▀▀░█▀▄
        ░█░░░█▀█░█▀▄░█░█░█░█░▀▀█░█▀▀░█░░░░░█▀█░█▀█░█░█░█░█░█░░░█▀▀░█▀▄
        ░▀▀▀░▀░▀░▀░▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀░░░▀░▀░▀░▀░▀░▀░▀▀░░▀▀▀░▀▀▀░▀░▀
        */
        //adding carousel functionality.  only add the buttons event listeners if they exist
        const carousel = document.querySelector('.carousel');
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentIndex = 0;
        //handle case when there are no buttons (becuase the marina has no images)
        if(prevBtn && nextBtn){
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
                updateCarousel();
            });
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
                updateCarousel();
            });
            function updateCarousel() {
                carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
        }
    } 
    /*
    ░▀█▀░█▀▀░█▄█░█▀█░█░░░█▀█░▀█▀░█▀▀
    ░░█░░█▀▀░█░█░█▀▀░█░░░█▀█░░█░░█▀▀
    ░░▀░░▀▀▀░▀░▀░▀░░░▀▀▀░▀░▀░░▀░░▀▀▀
    */
    async marinaDetailsTemplate() {
        const marinaDetailsImgHTML = this.buildImages();
        const marinaDetailsRatingsHTML = this.buildRatings();
        const marinaDetailsFuelHTML = this.buildFuel();
        const marinaLocationHTML = await this.buildLocation();
        
        //grab top div
        const marinaDetailsDiv = document.getElementById('marina-details')
        //top level name
        const marinaNameTitle = document.createElement('h1');
        marinaNameTitle.innerHTML = this.data.name;
        //card1
        const card1 = document.createElement('div');
        const servicesDiv = document.createElement('div');
        const servicesTitle = document.createElement('h2');

        //build card1
        servicesTitle.setAttribute('class', 'marinaDetails-services-title divider');
        servicesTitle.innerHTML += 'Services & Amenities'
        card1.innerHTML += marinaDetailsImgHTML;
        card1.innerHTML += marinaDetailsRatingsHTML;
        card1.appendChild(servicesDiv);
        card1.setAttribute('id', 'marina-details-card1');
        servicesDiv.appendChild(servicesTitle);
        servicesDiv.innerHTML += marinaDetailsFuelHTML;
        servicesDiv.setAttribute('id','services');

        //build card 2
        const card2 = document.createElement('div');
        const windyDiv = document.getElementById('windy');
        const locationsDiv = document.createElement('div');
        const locationTitle = document.createElement('h2');
        
        //build locations div
        locationTitle.setAttribute('class','marinaDetails-services-title divider' );
        locationTitle.innerHTML += 'Location Info';
        locationsDiv.setAttribute('id', 'locations');
        locationsDiv.appendChild(locationTitle);
        locationsDiv.innerHTML += marinaLocationHTML;
        
        //build card2
        card2.setAttribute('id', 'marina-details-card2');
        card2.appendChild(windyDiv);
        card2.appendChild(locationsDiv);
        
        //put it together
        marinaDetailsDiv.appendChild(marinaNameTitle)
        marinaDetailsDiv.appendChild(card1)
        marinaDetailsDiv.appendChild(card2)
    }
    buildImages(){
        //accomodating for multiple images...
        let imgElements ="";
        const name = this.data.name;
        let marinaDetailsImgHTML = "";

        let imgCount = this.data.images.data.length;

        //only add imgElement if there is an img
        if(imgCount >0){
            this.data.images.data.forEach(element => {
                if (element.full_url){
                    imgElements = imgElements + `
                        <div class="slide">
                            <img class="marina-img" src="${element.full_url}" alt="Image of ${name}">
                        </div>`
                }
            });
            //default img container (what's used if there's only 1 img)
            marinaDetailsImgHTML = `
            <div id="marinaDetailsImgContainer">
                <div class="carousel">${imgElements}</div>
            </div>
            `;
            //rebuild w/ carousel if theres >1 img
            if(imgCount >1){
                marinaDetailsImgHTML = `
                    <div id="marinaDetailsImgContainer">
                        <div class="carousel">${imgElements}</div>
                        <button class="prev-btn"><img src="./images/icons/left.svg" alt="left arrow"></button>
                        <button class="next-btn"><img src="./images/icons/right.svg" alt="right arrow"></button>
                    </div>
                `;
            }
            return marinaDetailsImgHTML;
        }
        //return nothing if there's no images
        return "";
        
    }
    buildWebURL(){
        if (this.data.web_url){
            return `<a id="marina-url" href="${this.data.web_url}">${this.data.name}</a>`
        }
    }
    buildRatings() {
        let ratingCount = 0;
        let marinaDetailsRatingsHTML = "";
        if (this.data.rating != null) {
            ratingCount = this.data.review_count;
            const rating = this.data.rating;
            // Calculate the number of full stars
            const fullStars = Math.floor(rating);
            // Check if there's a half star
            const hasHalfStar = rating % 1 !== 0;
            // Calculate the number of empty stars
            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
            // Create star images based on the rating
            const star1 = this.createStarImage(fullStars >= 1, hasHalfStar && fullStars === 0);
            const star2 = this.createStarImage(fullStars >= 2, hasHalfStar && fullStars === 1);
            const star3 = this.createStarImage(fullStars >= 3, hasHalfStar && fullStars === 2);
            const star4 = this.createStarImage(fullStars >= 4, hasHalfStar && fullStars === 3);
            const star5 = this.createStarImage(fullStars >= 5, hasHalfStar && fullStars === 4);

            // Create the rating count container
            const countContainer = `
                <div id='count-container'>
                    <div id='rating-count'>${ratingCount} Reviews</div>
                </div>`;
            // Create the star container
            const starContainer = `
                <div id='star-container'>
                    <div id='stars'>${star1}${star2}${star3}${star4}${star5}</div>
                </div>`;
            marinaDetailsRatingsHTML = `
                <div id='marinaDetailsRatings'> ${starContainer} ${countContainer} </div>`
        }
        return marinaDetailsRatingsHTML;
    }
    createStarImage(isFull, isHalf) {
        if (isFull) {
            return "<img src='./images/icons/full-star.png' alt='rating star' width = 25>";
        } else if (isHalf) {
            return "<img src='./images/icons/half-star.png' alt='rating star' width = 25>";
        } else {
            return "<img src='./images/icons/no-star.png' alt='rating star' width = 25>";
        }
    }
    buildFuel(){
    let marinaDetailsFuel = "";
    const dieselPrice = fixFormat(fixPriceFormat(this.data.fuel.diesel_price),'');
    const gasPremiumPrice = fixFormat(fixPriceFormat(this.data.fuel.gas_premium_price), 'Premium:');
    const gasRegularPrice = fixFormat(fixPriceFormat(this.data.fuel.gas_regular_price), 'Regular:');
    const gasSuperPrice = fixFormat(fixPriceFormat(this.data.fuel.gas_super_price), 'Super:');
    const propanePrice = fixFormat(fixPriceFormat(this.data.fuel.propane_price), '');

    const gasPrice = fixGas([gasPremiumPrice, gasSuperPrice, gasRegularPrice]);

    const hasDiesel = this.data.fuel.has_diesel;
    const hasGas = this.data.fuel.has_gas;
    const hasPropane = this.data.fuel.has_propane;

    const dieselIcon = hasOrNot(hasDiesel);
    const gasIcon = hasOrNot(hasGas);
    const propaneIcon = hasOrNot(hasPropane);

        function hasOrNot(item){
            //simply builds which icon to use (green check or red x) determined by whether the marina carries that fuel
            if (item){
                return `<img class = "fuel-icon-img" src="./images/icons/green_check.svg" alt="" width = 25>`;
            }else{
                return `<img class = "fuel-icon-img" src="./images/icons/red_x.svg" alt="" width = 25>`;
            }
        }
        function fixPriceFormat(price) {
            //converts 32000 to 3.20
            if (price !== 'null') {
                const formattedPrice = (price / 10000).toFixed(2);
                return formattedPrice > 0.00 ? formattedPrice : '';
            }
            return '';
        }
        function fixFormat(input, type){
            //puts the fuel type for gas (prem, super, reg) and adds a $ in front of the prices
            //originally was adding the type in front of all fuels.  Now I'm just doing it for gas but leaving this here incase I change my mind again
            if (input && input>0 & input !== null){
                input = `${type} $${input}`;
                return input;
            }
            return "";
        }
        function fixGas(array){
            //removes empty gas types from the array for a clean baloon tip (removes spaces/ new lines that would show up otherwise)
            let final = "";
            array.forEach(element => {
                if (element !==""){
                    final += element
                }
            });
            return final;
        }

    return `
    <div id="fuel-container" class="grid-container">
        <div class="fuel-details-container" id="diesel-container">
            <img class="fuel-type-icon" src="./images/icons/diesel-white.svg" alt="Diesel Icon" width = 50>
            <span class="fuel-title">Diesel:</span>
            <div class="fuel-icon">${dieselIcon} 
                <div class="price ${dieselPrice !== '' ? 'fuel-price' : ''} "> ${dieselPrice}</div>
            </div>
        </div>

        <div class="fuel-details-container" id="gas-container">
            <img class="fuel-type-icon" src="./images/icons/gas-white.svg" alt="Gas Icon" width = 50>
            <span class="fuel-title">Gas:</span>
            <div class="fuel-icon">${gasIcon}
                <div class="price ${gasPremiumPrice !== '' || gasSuperPrice !== '' || gasRegularPrice !== '' ? 'fuel-price' : ''}">
                    <div>${gasPrice}</div>
                </div>
            </div>
        </div>

        <div class="fuel-details-container" id="propane-container">
            <img class="fuel-type-icon" src="./images/icons/propane-white.svg" alt="Propane Icon" width = 50>
            <span class="fuel-title">Propane:</span>
            <div class="fuel-icon">${propaneIcon}</div>
            <div class="price ${propanePrice !== '' ? 'fuel-price' : ''}">${propanePrice}</div>
        </div>
    </div>
    `;
    }
    async buildLocation(){
        const lat = this.data.location.lat;
        const lon = this.data.location.lon;
        const what3words = this.data.location.what3words;
        //let detailsLocation = "";
        const locationData = await convertCoordToLocation(lat, lon, true)
        //only assign the value if it's not undefined.otherwise it's ""
        const road = locationData.road !== undefined ? capitalizeLocation(locationData.road) : "";
        //add the , here so it's skipped if it's undefined.  result would just be State instead of "", State
        const city = locationData.city !== undefined ? `${capitalizeLocation(locationData.city)},` : "";
        const state = locationData.state !== undefined ? capitalizeLocation(locationData.state) : "";

        console.log(road)
        console.log(city)
        console.log(state)
        console.log(locationData.road)
        console.log(locationData.city)
        console.log(locationData.state)
        const addressPin = "./images/icons/black_pin.svg";
        const addressTarget = './images/icons/map_target.svg';
        const w3w = './images/icons/w3w_Symbol_RGB_Red.svg';

        return `
            <div id='streetLocationContainer'>
                <img src="${addressPin}" class="location-img-icons" alt="address icon" width = 25>
                <div id='address'>
                    <div id='road'> ${road}</div>
                    <div id='city-state'> ${city} ${state}</div>
                </div>
            </div>
            <div id='coordsLocationContainer'>
                <img src="${addressTarget}" class="location-img-icons" alt="coordinates icon" width = 25>
                <div id='coords'>${lat.toFixed(2)}, ${lon.toFixed(2)}</div>
            </div>
            <div id='what3wordsContainer'>
                <img src="${w3w}" class="location-img-icons" alt="coordinates icon" width = 25>
                <div id='threeWords'>${what3words}</div>
            </div>
        `
    }


}

