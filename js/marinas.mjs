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
        const data = await this.getMarinaInfo();
    }
    /* 
    ░█▀▄░█▀▀░▀█▀░█░█░█▀▄░█▀█░░░█▄█░█▀█░█▀▄░▀█▀░█▀█░█▀█░░░█▀█░█▀▄░█▀▄░█▀█░█░█
    ░█▀▄░█▀▀░░█░░█░█░█▀▄░█░█░░░█░█░█▀█░█▀▄░░█░░█░█░█▀█░░░█▀█░█▀▄░█▀▄░█▀█░░█░
    ░▀░▀░▀▀▀░░▀░░▀▀▀░▀░▀░▀░▀░░░▀░▀░▀░▀░▀░▀░▀▀▀░▀░▀░▀░▀░░░▀░▀░▀░▀░▀░▀░▀░▀░░▀░
    */
    getMarinaArray(){
        return this.data;
    }

    /* 
    ░█▀▀░█▀▀░▀█▀░█▀▀░█░█░░░█▄█░█▀█░█▀▄░▀█▀░█▀█░█▀█░░░▀█▀░█▀█░█▀▀░█▀█
    ░█▀▀░█▀▀░░█░░█░░░█▀█░░░█░█░█▀█░█▀▄░░█░░█░█░█▀█░░░░█░░█░█░█▀▀░█░█
    ░▀░░░▀▀▀░░▀░░▀▀▀░▀░▀░░░▀░▀░▀░▀░▀░▀░▀▀▀░▀░▀░▀░▀░░░▀▀▀░▀░▀░▀░░░▀▀▀
    */
    async getMarinaInfo() {
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
            console.log(`https://api.marinas.com/v1/points/${latOrMarinaID}`);
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
    return `
    <section class="marina-detail"> 
        <h3>${marina.name}</h3>
        <div id='marina-rating'>${marina.rating}</div>

        <div id='marina-image-container'>
            <img
            class="divider"
            src="${marina.images.data[0].full_url}"
            alt="${marina.name}"
            />
        </div>
        </section>`;
}
/* 
        <a id='marina-website' href="${marina.web_url}">website</a>
*/

/* 
        <h2 class="divider">${marina.NameWithoutBrand}</h2>
        <img
            class="divider"
            src="${marina.Images.PrimaryLarge}"
            alt="${marina.NameWithoutBrand}"
        />
        <p class="marina-card__price">$${marina.FinalPrice}</p>
        <p class="marina__color">${marina.Colors[0].ColorName}</p>
        <p class="marina__description">
        ${marina.DescriptionHtmlSimple}
        </p>
        <div class="marina-detail__add">
            <button id="addToCart" data-id="${marina.Id}">Add to Cart</button>
*/


//https://marinas.com/developers/api_documentation
/*fetch('https://api.marinas.com/v1/points/4qcq', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
    },
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

async function test(){
    const response = await fetch(url, options);
    const result = await response.text();
    console.table(result);
}*/
//const lat = '39.259790916124274';
//const lon = '-76.6135644707624';
//const url = buildBaseURL(lat, lon)
//await getMarinaInfo(url)
