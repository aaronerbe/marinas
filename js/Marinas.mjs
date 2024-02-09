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
            return `https://api.marinas.com/v1/marinas/search?location[lat]=${latOrMarinaID}&location[lon]=${lon}&access_token=${this.key}`;
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
    const imgElements = buildImages(marina);
    console.log(marina);
    const ratings = buildRatings(marina);
    const url = buildWebURL(marina);
    const fuelElements = buildFuel(marina);
    

    return `
    <section id="marina-details"> 
        <h1 id="marina-name">${marina.name}</h1>
        <!--#marina-url-->
        <!--${url}-->
        <!--#rating-container-->
        ${ratings}
        <div id='marina-image-container'>
            ${imgElements}
        </div>
        <div id='services'>
            <h2 id='services-title'>Services & Amenities</h2>
            ${fuelElements}
        </div>
    </section>`;
}

function buildImages(marina){
    //accomodating for multiple images but I've not found a marina that has more than 1 yet.  might be an api limitation...
    let imgElements ="";
    const name = marina.name;
    if(marina.images.data.length >0){
        marina.images.data.forEach(element => {
            if (element.full_url){
                imgElements = imgElements + `<img src="${element.full_url}" alt="Image of ${name}">`
            }
        });
        return imgElements;
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
    let ratingContainer = "";
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
        const countContainer = `<div id='count-container'><div id='rating-count'>${ratingCount} Reviews</div></div>`;
        // Create the star container
        const starContainer = `<div id='star-container'><div id='stars'>${star1}${star2}${star3}${star4}${star5}</div></div>`;
        ratingContainer = `<div id='rating-container'> ${starContainer} ${countContainer} </div>`
    }
    return ratingContainer;
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
    let fuelElements = "";
    const dieselPrice = marina.fuel.diesel_price;
    const gasPremiumPrice = marina.fuel.gas_premium_price;
    const gasRegularPrice = marina.fuel.gas_regular_price;
    const gasSuperPrice = marina.fuel.gas_super_price;
    const propanePrice = marina.fuel.propane_price;

    const hasDiesel = marina.fuel.has_diesel;
    const hasGas = marina.fuel.has_gas;
    const hasPropane = marina.fuel.has_propane;

    const dieselIcon = hasOrNot(hasDiesel);
    const gasIcon = hasOrNot(hasGas);
    const propaneIcon = hasOrNot(hasPropane);

    function hasOrNot(item){
        console.log(item)
        if (item){
            return `<img src="./images/icons/green_check.svg" alt="">`;
        }else{
            return `<img src="./images/icons/red_x.svg" alt="">`;
        }
    }

    fuelElements = `
    <div id="fuel-container" class="grid-container">
        <div id="fuel-title-header"> Fuel</div>
        <div id="fuel-icon-header"> Service</div>
        <div id="fuel-price-header"> Price per Gal</div>

        <div class="fuel-title">Diesel:</div>
        <div class="fuel-icon">${dieselIcon}</div>
        <div class="fuel-price">${dieselPrice}</div>

        <div class="fuel-title">Gas:</div>
        <div class="fuel-icon">${gasIcon}</div>
        <div class="fuel-price1">${gasPremiumPrice}</div>
        <div class="fuel-price2">${gasSuperPrice}</div>
        <div class="fuel-price3">${gasRegularPrice}</div>

        <div class="fuel-title">Propane:</div>
        <div class="fuel-icon">${propaneIcon}</div>
        <div class="fuel-price">${propanePrice}</div>

        <div class="fuel-gap"></div>
    </div>
    `;
    return fuelElements;
}
function location(marina){

}
function buildWhatThreeWords(marina){

}
