import { convertCoordToLocation } from "./utils.mjs";

export default class Map{
    constructor(lat, lon, marinas, type){
        this.lat = lat;
        this.lon = lon;
        this.marinas = marinas;
        this.type = type.toLowerCase();
        this.name = ""
        this.key = 'qrQODxrOJqHA9Xn70LbOLmFhIVEEWg4h';
        this.icon = './images/icons/map-home.png';
        this.windyAPI
    }

    async init(){
        await this.getName()
        this.getHomeOrMarinaIcon()
        if (this.windyAPI){
            this.windyAPI.options = this.buildOptions();
            this.renderMap()
        }else{
            windyInit(this.buildOptions(), api=>{
                this.windyAPI = api;
                this.renderMap()
            })
        }
    }
    buildOptions(){
        let options = {
            key: this.key,
            lat: this.lat,
            lon: this.lon,
            zoom: 11,
        };
        return options;
    }
    renderMap(){
        const {map} = this.windyAPI;        
        this.buildHyperZoom(map)
        this.buildPOIMarker(map);
        if (this.type === 'search'){
            this.buildClusterMarkers(map)
        }
    }
    buildPOIMarker(map){
        //build POINT OF INTEREST Marker
        //home or speciric marina
        const iconSize = [30, 30];
        const customIcon = L.icon({
            iconUrl: this.icon,
            iconSize: iconSize,
            iconAnchor: [15, 30],
        });
        const marker = L.marker([this.lat, this.lon], {icon: customIcon});
        marker.bindPopup(`<div id="popupContent"><span id="searchName">${this.name}</span></div>`).openPopup();
        marker.on('popupopen', () => {
            const popupContent = document.getElementById('popupContent');
            const searchName = document.getElementById('searchName');
            searchName.addEventListener('click', () => {
                //window.location.href = `marina-details.html?marina=${id}`;
            });
        });
        map.addLayer(marker);
        // Center the map on the search location
        map.setView([this.lat, this.lon], map.getZoom());
    }
    buildClusterMarkers(map){
        // Create a marker cluster group
        const markerCluster = L.markerClusterGroup();
        //iterate through the marina data and add a marker for each location
        Object.values(this.marinas.data).forEach(marina => {
            const { id, name, location, kind } = marina;
            const { lat, lon } = location;
            // Create a marker element for each marina
            if (kind === 'marina') {
                const marker = L.marker([lat, lon]);
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
        // Center the map on the search location
        map.setView([lat, lon], map.getZoom());
    }
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
        if (this.type === 'search'){
            map.setZoom(11);
        }else{
            map.setZoom(15)
        }
        //Adds the openstreetmap layer (hack to fix zoom limitation)
        map.addLayer(topLayer);
    }
    async getName(){
        if ( this.type === 'search') {
            this.name = await convertCoordToLocation(this.lat, this.lon);
        }
        else{
            this.name = this.marinas.data.name
        }
    }
    getHomeOrMarinaIcon(){
        if (this.type != 'search'){
            //this.icon = "";
            this.icon = this.marinas.data.icon_url;
        }
    }
}
