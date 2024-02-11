/* 

*/
export default class WebCams {
    constructor(lat=0, lon=0){
        this.lat = lat;
        this.lon = lon;
        this.data = {};
        this.key = 'hxK1iiN4GCkjymbhFO76k67rzmfQ60M1';
    }

    async init() {
        const data = await this.fetchWebCamData();
    }
    
    /*
    */
    async fetchWebCamData() {
        let url = this.buildBaseURL();
        console.log(url);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-windy-api-key': this.key,
            },
        });
        this.data = await response.json();
        console.log('webcams:', this.data);
    }
    /* 
    ░█▀▄░█░█░▀█▀░█░░░█▀▄░░░█░█░█▀▄░█░░
    ░█▀▄░█░█░░█░░█░░░█░█░░░█░█░█▀▄░█░░
    ░▀▀░░▀▀▀░▀▀▀░▀▀▀░▀▀░░░░▀▀▀░▀░▀░▀▀▀
    */
    /* Build the base URL with access token as a query parameter */
    buildBaseURL() {
        return `https://api.windy.com/webcams/api/v3/webcams?offset=0&categoryOperation=or&nearby=${this.lat}%2C${this.lon}%2C100&include=categories,images,location,player,urls&categories=water,island,beach,harbor,bay,coast,underwater`;
    }
}