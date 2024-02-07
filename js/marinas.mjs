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
