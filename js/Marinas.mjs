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
        console.log(url)
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
    renderMarinaDetails(selector){
        //method to generate HTML to display our product
        const element = document.getElementById(selector);
        element.insertAdjacentHTML(
            "afterBegin",
            marinaDetailsTemplate(this.data)
        )
    } 
    //todo bruild ratings
    //function buildMarinaRatings{}
    //todo build images
    //todo build address to place below map
}

/*
░▀█▀░█▀▀░█▄█░█▀█░█░░░█▀█░▀█▀░█▀▀
░░█░░█▀▀░█░█░█▀▀░█░░░█▀█░░█░░█▀▀
░░▀░░▀▀▀░▀░▀░▀░░░▀▀▀░▀░▀░░▀░░▀▀▀
*/
function marinaDetailsTemplate(marina) {
    const marinaDetailsImgContainer = buildImages(marina);
    console.log(marina);
    const marinaDetailsRatings = buildRatings(marina);
    const url = buildWebURL(marina);
    const marinaDetailsFuel = buildFuel(marina);
    
    return`
        <h1 id="marina-name">${marina.name}</h1>            
        <div id="marina-details-card1">
            <!-- #marinaDetailsImgContainer -->
            
            ${marinaDetailsImgContainer}
            <!-- #marinaDetailsRatings -->
                <!-- #rating-count -->
                <!-- #stars -->
            ${marinaDetailsRatings}
            <div id='services' class="">
            <h2 class="marinaDetails-services-title divider">Services & Amenities</h2>
                <!--#fuel-container .grid-container  -->
                        <!-- #fuel-title-header  -->
                        <!-- #fuel-icon-header  -->
                        <!-- #fuel-price-header -->
        
                        <!-- .fuel-title -->
                            <!-- <img> -->    
                            <!-- #fuel-title-desc -->
                            <!-- .fuel-icon -->
                        <!-- .fuel-price(1) -->
                        <!-- .fuel-price2 -->
                        <!-- .fuel-price3 -->
        
                        <!-- .fuel-gap -->
                    ${marinaDetailsFuel}
            </div>
            </div>
            <div id="marina-details-card2">
            <div id="windy" class="divider details-windy"></div>
            <div id='locations' class="">
                <h2 class="marinaDetails-services-title divider">Location Info</h2>
                <div id="marinaDetailsLocation">Coords, Address, What3Words</div>
            </div>
        </div>
    `;
}

function buildImages(marina){
    //accomodating for multiple images but I've not found a marina that has more than 1 yet.  might be an api limitation...
    let imgElements ="";
    const name = marina.name;
    if(marina.images.data.length >0){
        marina.images.data.forEach(element => {
            if (element.full_url){
                imgElements = imgElements + `
                    <div class="slide">
                        <img class="marina-img" src="${element.full_url}" alt="Image of ${name}">
                    </div>`
            }
        });
        let marinaDetailsImgContainer = `
            <div id="marinaDetailsImgContainer">
                <div class="carousel">${imgElements}</div>
                <button class="prev-btn"><img src="./images/icons/left.svg" alt="left arrow"></button>
                <button class="next-btn"><img src="./images/icons/right.svg" alt="right arrow"></button>
            </div>
        `;
        return marinaDetailsImgContainer;
    }else{
        //return nothing if there's no images
        return "";
    }
}
function buildWebURL(marina){
    if (marina.web_url){
        return `<a id="marina-url" href="${marina.web_url}">${marina.name}</a>`
    }
}
function buildRatings(marina) {
    let ratingCount = 0;
    let star1 = "";
    let star2 = "";
    let star3 = "";
    let star4 = "";
    let star5 = "";
    let marinaDetailsRatings = "";
    console.log(marina.rating)

    if (marina.rating != null) {
        ratingCount = marina.review_count;
        const rating = marina.rating;

        // Calculate the number of full stars
        const fullStars = Math.floor(rating);
        // Check if there's a half star
        const hasHalfStar = rating % 1 !== 0;
        // Calculate the number of empty stars
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        // Create star images based on the rating
        star1 = createStarImage(fullStars >= 1, hasHalfStar && fullStars === 0);
        star2 = createStarImage(fullStars >= 2, hasHalfStar && fullStars === 1);
        star3 = createStarImage(fullStars >= 3, hasHalfStar && fullStars === 2);
        star4 = createStarImage(fullStars >= 4, hasHalfStar && fullStars === 3);
        star5 = createStarImage(fullStars >= 5, hasHalfStar && fullStars === 4);

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
        marinaDetailsRatings = `
            <div id='marinaDetailsRatings'> ${starContainer} ${countContainer} </div>`
    }
    return marinaDetailsRatings;
}
function createStarImage(isFull, isHalf) {
    if (isFull) {
        return "<img src='./images/icons/full-star.png'>";
    } else if (isHalf) {
        return "<img src='./images/icons/half-star.png'>";
    } else {
        return "<img src='./images/icons/no-star.png'>";
    }
}
function buildFuel(marina){
let marinaDetailsFuel = "";
//const dieselPrice = fixFormat(fixPrice(marina.fuel.diesel_price),'Diesel');
const dieselPrice = fixFormat(fixPrice(marina.fuel.diesel_price),'');
const gasPremiumPrice = fixFormat(fixPrice(marina.fuel.gas_premium_price), 'Premium:');
const gasRegularPrice = fixFormat(fixPrice(marina.fuel.gas_regular_price), 'Regular:');
const gasSuperPrice = fixFormat(fixPrice(marina.fuel.gas_super_price), 'Super:');
const propanePrice = fixFormat(fixPrice(marina.fuel.propane_price), '');

const gasPrice = fixGas([gasPremiumPrice, gasSuperPrice, gasRegularPrice]);

const hasDiesel = marina.fuel.has_diesel;
const hasGas = marina.fuel.has_gas;
const hasPropane = marina.fuel.has_propane;

const dieselIcon = hasOrNot(hasDiesel);
const gasIcon = hasOrNot(hasGas);
const propaneIcon = hasOrNot(hasPropane);

    function hasOrNot(item){
        console.log(item)
        if (item){
            return `<img class = "fuel-icon-img" src="./images/icons/green_check.svg" alt="">`;
        }else{
            return `<img class = "fuel-icon-img" src="./images/icons/red_x.svg" alt="">`;
        }
    }
    function fixPrice(price) {
        if (price !== 'null') {
            const formattedPrice = (price / 10000).toFixed(2);
            return formattedPrice > 0.00 ? formattedPrice : '';
        }
        return '';
    }
    function fixFormat(input, type){
        if (input && input>0 & input !== null){
            input = `${type} $${input}`;
            return input;
        }
        return "";
    }
    function fixGas(array){
        let final = "";
        array.forEach(element => {
            if (element !==""){
                final += element
            }
        });
        return final;
    }

marinaDetailsFuel = `
<div id="fuel-container" class="grid-container">
    <div class="fuel-details-container" id="diesel-container">
        <img class="fuel-type-icon" src="./images/icons/diesel-white.svg" alt="Diesel Icon">
        <span class="fuel-title">Diesel:</span>
        <div class="fuel-icon">${dieselIcon} 
            <div class="price ${dieselPrice !== '' ? 'fuel-price' : ''} "> ${dieselPrice}</div>
        </div>
    </div>

    <div class="fuel-details-container" id="gas-container">
        <img class="fuel-type-icon" src="./images/icons/gas-white.svg" alt="Gas Icon">
        <span class="fuel-title">Gas:</span>
        <div class="fuel-icon">${gasIcon}
            <div class="price ${gasPremiumPrice !== '' || gasSuperPrice !== '' || gasRegularPrice !== '' ? 'fuel-price' : ''}">
                <div>${gasPrice}</div>
            </div>
        </div>
    </div>

    <div class="fuel-details-container" id="propane-container">
        <img class="fuel-type-icon" src="./images/icons/propane-white.svg" alt="Propane Icon">
        <span class="fuel-title">Propane:</span>
        <div class="fuel-icon">${propaneIcon}</div>
        <div class="price ${propanePrice !== '' ? 'fuel-price' : ''}">${propanePrice}</div>
    </div>
</div>
`;
return marinaDetailsFuel;
}

function location(marina){

}
function buildWhatThreeWords(marina){

}
