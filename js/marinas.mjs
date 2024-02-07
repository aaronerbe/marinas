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

    getMarinaArray(){
        return this.data;
    }
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
    
    renderMarinaDetails(selector){
        //method to generate HTML to display our product
        const element = document.querySelector(selector);
        element.insertAdjacentHTML(
            "afterBegin",
            marinaDetailsTemplate(this.marina)
        )
    } 
}


//template literal to populate the detail information for the given product
//todo form template
function marinaDetailsTemplate(product) {
    return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img
            class="divider"
            src="${product.Images.PrimaryLarge}"
            alt="${product.NameWithoutBrand}"
        />
        <p class="product-card__price">$${product.FinalPrice}</p>
        <p class="product__color">${product.Colors[0].ColorName}</p>
        <p class="product__description">
        ${product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div></section>`;
}



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
