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
            url = this.buildBaseURL(this.lat, this.lon); // Pass this.lat and this.lon
        }
        const response = await fetch(url, {
            method: 'GET',
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
    buildBaseURL(latOrMarinaID, lon) {
        if (lon !== undefined) {
            // If lon is defined, it means we are building a search URL
            return `https://api.marinas.com/v1/points/search?location[lat]=${latOrMarinaID}&location[lon]=${lon}`;
        } else {
            // Otherwise, it's an ID URL
            //console.log(`https://api.marinas.com/v1/points/${latOrMarinaID}`);
            return `https://api.marinas.com/v1/points/${latOrMarinaID}`;
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
    console.log(marina)
    const ratings = buildRatings(marina);
    const url = buildWebURL(marina)
    

    return `
    <section class="marina-detail"> 
        <h3>${marina.name}</h3>
        ${url}
        ${ratings}
        <div id='marina-image-container'>
            <img
            class="divider"
            ${imgElements}
        </div>
        </section>`;
}

function buildImages(marina){
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