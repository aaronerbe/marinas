import { convertCoordToLocation } from "./utils.mjs";


/* 
░█▄█░█▀█░█▀█░█▀▀░░░█▀▀░█░░░█▀█░█▀▀░█▀▀
░█░█░█▀█░█▀▀░▀▀█░░░█░░░█░░░█▀█░▀▀█░▀▀█
░▀░▀░▀░▀░▀░░░▀▀▀░░░▀▀▀░▀▀▀░▀░▀░▀▀▀░▀▀▀
*/
export default class Map{
    constructor(){
        this.lat = "";
        this.lon = "";
        this.marinas = {};
        this.webCams={};
        this.type = "";
        this.name = ""
        this.key = 'qrQODxrOJqHA9Xn70LbOLmFhIVEEWg4h';
        this.marinaIcon = './images/icons/map-home.png';
        this.cameraIcon = './images/icons/camera_pin.svg';
        this.whitecameraIcon = './images/icons/camera_pin_white.svg'
        this.imgIcon = './images/icons/greenPin.png';
        this.reviewIcon = './images/icons/redPin.png';
        this.bothIcon = './images/icons/orangePin.png';
        this.neitherIcon = './images/icons/bluePin.png'
        this.windyAPI
    }

    /* 
    ░▀█▀░█▀█░▀█▀░▀█▀
    ░░█░░█░█░░█░░░█░
    ░▀▀▀░▀░▀░▀▀▀░░▀░
    */
    async init(lat, lon, marinas, webCams, type){
        this.lat = lat;
        this.lon = lon;
        this.marinas = marinas;
        this.type = type
        this.type = this.type.toLowerCase();
        this.webCams = webCams
        await this.getName()
        this.getHomeOrMarinaIcon()
        if (this.windyAPI){
            this.windyAPI.options = this.buildOptions();
            this.renderMap()
        }else{
            windyInit(this.buildOptions(), api=>{
                this.windyAPI = api;
                this.renderMap()
            });
        }
    }

    /* 
    ░█▄█░█▀█░█▀█░░░█▀█░█▀█░▀█▀░▀█▀░█▀█░█▀█░█▀▀
    ░█░█░█▀█░█▀▀░░░█░█░█▀▀░░█░░░█░░█░█░█░█░▀▀█
    ░▀░▀░▀░▀░▀░░░░░▀▀▀░▀░░░░▀░░▀▀▀░▀▀▀░▀░▀░▀▀▀
    */
    buildOptions(){
        let options = {
            key: this.key,
            lat: this.lat,
            lon: this.lon,
            zoom: 11,
        };
        return options;
    }

    /* 
    ░█▀▄░█▀▀░█▀█░█▀▄░█▀▀░█▀▄░░░█▄█░█▀█░█▀█
    ░█▀▄░█▀▀░█░█░█░█░█▀▀░█▀▄░░░█░█░█▀█░█▀▀
    ░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀░░░▀░▀░▀░▀░▀░░
    */
    renderMap(){
        const {map} = this.windyAPI;
        this.buildHyperZoom(map);
        //build marker for the marina site OR the search Location
        this.renderPOIMarker(map, this.lat, this.lon, this.marinaIcon, this.name, "", "")
        if (this.type === 'search'){
            this.buildClusterMarkers(map);
        }else{
            this.buildWebCamMarkers(map);
        }
        this.renderLegend(map);
    }

    /* 
    ░█▀▀░█░░░█░█░█▀▀░▀█▀░█▀▀░█▀▄░░░█▄█░█▀█░█▀▄░█░█░█▀▀░█▀▄░█▀▀
    ░█░░░█░░░█░█░▀▀█░░█░░█▀▀░█▀▄░░░█░█░█▀█░█▀▄░█▀▄░█▀▀░█▀▄░▀▀█
    ░▀▀▀░▀▀▀░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀░░░▀░▀░▀░▀░▀░▀░▀░▀░▀▀▀░▀░▀░▀▀▀
    */
    buildClusterMarkers(map){
        // Create a marker cluster group
        const markerCluster = L.markerClusterGroup();
        const iconSize = [30, 30];
        let iconUrl = ""

        Object.values(this.marinas.data.data).forEach(marina => {
            const { id, name, location, kind } = marina;
            const { lat, lon } = location;
            const imgCount = marina.images.data.length > 0;
            const reviewCount = marina.rating > 0;
            //create custom pins depending on the content of the marina
            if(imgCount && reviewCount){
                iconUrl = this.bothIcon;
            }else if(imgCount && !reviewCount){
                iconUrl = this.imgIcon;
            }else if(!imgCount && reviewCount){
                iconUrl = this.reviewIcon;
            }else{
                iconUrl = this.neitherIcon;
            }
            //build the custom pin
            const customIcon = L.icon({
                iconUrl: iconUrl,
                iconSize: iconSize,
                iconAnchor: [15, 30],
            });
            // Create a marker element for each marina
            if (kind === 'marina') {
                const marker = L.marker([lat, lon], {icon: customIcon});
                //dynamically add a div with a link containing the marina name that is clickable.  adds it to the popup
                marker.bindPopup(`<div id="popupContent"><a href="#" id="marinaLink">${name}</a></div>`).openPopup();
                // Add a click event listener to the link inside the popup
                marker.on('popupopen', () => {
                    const popupContent = document.getElementById('popupContent');
                    const marinaLink = document.getElementById('marinaLink');
                    // Add a click event listener to the link
                    marinaLink.addEventListener('click', () => {
                        // Navigate to the marina-details.html page.  with a query on the end to pass on to the api and pull the required ino
                        window.location.href = `marina-details.html?marina=${id}`;
                    });
                });
                markerCluster.addLayer(marker);
            }
        });
        // Add the marker cluster group to the map
        map.addLayer(markerCluster);
    }

    /* 
    ░█▀▄░█▀▀░█▀█░█▀▄░█▀▀░█▀▄░░░█░░░█▀▀░█▀▀░█▀▀░█▀█░█▀▄
    ░█▀▄░█▀▀░█░█░█░█░█▀▀░█▀▄░░░█░░░█▀▀░█░█░█▀▀░█░█░█░█
    ░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀░░░▀▀▀░▀▀▀░▀▀▀░▀▀▀░▀░▀░▀▀░
    */
    renderLegend(map){
        const legend = document.createElement('div');
        legend.innerHTML =`
                <div id='searchPin' class="pin-legends">
                    <img src="${this.marinaIcon}" alt="Search Marker">
                    <p>Search Marker</p>
                </div>
                <div id='normalPin' class="pin-legends">
                    <img src="${this.neitherIcon}" alt="Marina Marker">
                    <p>Marinas</p>
                </div>
                <div id='imgPin' class="pin-legends">
                    <img src="${this.imgIcon}" alt="Marina with Images Marker">
                    <p>With Images</p>
                </div>
                <div id='reviewPin' class="pin-legends">
                    <img src="${this.reviewIcon}" alt="Marina with Reviews Marker">
                    <p>With Reviews</p>
                </div>
                <div id='bothPin' class="pin-legends">
                    <img src="${this.bothIcon}" alt="Marina with Images and Reviews Marker">
                    <p>With Images & Reviews</p>
                </div>
                <!-- <div id='webCam' class="pin-legends">
                    <img src="${this.whitecameraIcon}" alt="WebCam Markers">
                    <p>WebCams</p>
                </div> -->

        `;
        legend.setAttribute('id', 'legendContainer')
        //map.getPanes().overlayPane.appendChild(legend);
        const mapContainer = map.getContainer();
        mapContainer.appendChild(legend);
    }

    /* 
    ░█░█░█▀▀░█▀▄░█▀▀░█▀█░█▄█░░░█▄█░█▀█░█▀▄░█░█░█▀▀░█▀▄░█▀▀
    ░█▄█░█▀▀░█▀▄░█░░░█▀█░█░█░░░█░█░█▀█░█▀▄░█▀▄░█▀▀░█▀▄░▀▀█
    ░▀░▀░▀▀▀░▀▀░░▀▀▀░▀░▀░▀░▀░░░▀░▀░▀░▀░▀░▀░▀░▀░▀▀▀░▀░▀░▀▀▀
    */
    buildWebCamMarkers(map){
        // Create a marker cluster group
        const webCamMarkerCluster = L.markerClusterGroup();
        //iterate through the marina data and add a marker for each location
        Object.values(this.webCams.data.webcams).forEach(webCam => {
            const lat = webCam.location.latitude;
            const lon = webCam.location.longitude;
            //const webCamImgURL = webCam.images.current.thumbnail;
            const webCamImgURL = webCam.images.daylight.preview;
            const name = webCam.title;
            const webCamPlayer = webCam.player.day;
            //add POI Marker for each webcam
            this.renderPOIMarker(map, lat, lon, this.cameraIcon, name,webCamPlayer,webCamImgURL)
        });

    }
    /* 
    ░█▀█░█▀█░▀█▀░░░█▄█░█▀█░█▀▄░█░█░█▀▀░█▀▄░█▀▀
    ░█▀▀░█░█░░█░░░░█░█░█▀█░█▀▄░█▀▄░█▀▀░█▀▄░▀▀█
    ░▀░░░▀▀▀░▀▀▀░░░▀░▀░▀░▀░▀░▀░▀░▀░▀▀▀░▀░▀░▀▀▀
    */
    renderPOIMarker(map, lat, lon, icon, name, link, img=""){
        const iconSize = [30, 30];
        const customIcon = L.icon({
            iconUrl: icon,
            iconSize: iconSize,
            iconAnchor: [15, 30],
        });
        //if an img has been provided, build the template, else leave blank
        if (img!==""){
            img = `<img id='popupImg' src="${img}" alt=${name}>`
        }
        const marker = L.marker([lat, lon], {icon: customIcon});
        marker.bindPopup(`
            <div id="popupContent">
                <span id="popupName">${name}</span>
                <div>
                    ${img}
                </div>
            </div>
        `).openPopup();
        marker.on('popupopen', () => {
            //zoom and center to the marker when you click on it
            map.setView([lat, lon], 14)
            const popupContent = document.getElementById('popupContent');
            if (link!==""){
                const popupName = document.getElementById('popupName');
                const popupImg = document.getElementById('popupImg');
                //ADD A LINK TO THE NAME
                popupName.addEventListener('click', () => {
                    //window.location.href = `${link}`;
                    window.open(link, '_blank')
                });
                // Add event listener for mouseenter event
                popupName.addEventListener('mouseenter', () => {
                    // Change the cursor to pointer
                    popupName.style.cursor = 'pointer';
                });
                popupName.addEventListener('mouseleave', () => {
                    // Change the cursor back to default
                    popupName.style.cursor = 'default';
                });
                //ADD A LINK TO THE IMAGE
                popupImg.addEventListener('click', () => {
                    //window.location.href = `${link}`;
                    window.open(link, '_blank')
                });
                // Add event listener for mouseenter event
                popupImg.addEventListener('mouseenter', () => {
                    // Change the cursor to pointer
                    popupImg.style.cursor = 'pointer';
                });

                popupImg.addEventListener('mouseleave', () => {
                    // Change the cursor back to default
                    popupImg.style.cursor = 'default';
                });
                
            }
        });
        map.addLayer(marker);
    }
    /* 
    ░█░█░█░█░█▀█░█▀▀░█▀▄░░░▀▀█░█▀█░█▀█░█▄█
    ░█▀█░░█░░█▀▀░█▀▀░█▀▄░░░▄▀░░█░█░█░█░█░█
    ░▀░▀░░▀░░▀░░░▀▀▀░▀░▀░░░▀▀▀░▀▀▀░▀▀▀░▀░▀
    */
    buildHyperZoom(map){
        // MAP HACK to fix zoom:
        map.options.minZoom = 4;
        map.options.maxZoom = 17;
        //add openstreetmap layer on top when you are zoomed beyond windy limitations
        var topLayer = L.tileLayer('https://b.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, ',
            minZoom: 12,
            maxZoom: 17
        }).addTo(map)
        topLayer.setOpacity('0');
        map.on('zoomend', function() {
            if (map.getZoom() >= 12) {
                topLayer.setOpacity('0.5');
            } else {
                topLayer.setOpacity('0');
            }
        });
        //set the default zoom level depending on what map were looking at
        if (this.type === 'search'){
            //map.setZoom(11);
            map.setView([this.lat, this.lon], 11)
        }else{
            //map.setZoom(15)
            map.setView([this.lat, this.lon], 12)
        }
        //Adds the openstreetmap layer (hack to fix zoom limitation)
        map.addLayer(topLayer);
    }
    /* 
    ░█▀▀░█▀▀░▀█▀░░░█▀█░█▀█░█▄█░█▀▀
    ░█░█░█▀▀░░█░░░░█░█░█▀█░█░█░█▀▀
    ░▀▀▀░▀▀▀░░▀░░░░▀░▀░▀░▀░▀░▀░▀▀▀
    */
    async getName(){
        if ( this.type === 'search') {
            this.name = await convertCoordToLocation(this.lat, this.lon);
        }
        else{
            this.name = this.marinas.data.name
        }
    }
    /* 
    ░█▀▀░█▀▀░▀█▀░░░▀█▀░█▀▀░█▀█░█▀█░█▀▀
    ░█░█░█▀▀░░█░░░░░█░░█░░░█░█░█░█░▀▀█
    ░▀▀▀░▀▀▀░░▀░░░░▀▀▀░▀▀▀░▀▀▀░▀░▀░▀▀▀
    */
    getHomeOrMarinaIcon(){
        //uses pin for search (default) or extracts the image provided by marinas api for details page
        if (this.type != 'search'){
            //this.marinaIcon = "";
            this.marinaIcon = this.marinas.data.icon_url;
        }
    }
}
