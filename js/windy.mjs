// ... (your existing imports)

// Initialize Windy API with the specific Leaflet version
let windyAPI;

export function updateMapOptions(myLat, myLon, marinas){
    let options = {
        key: 'qrQODxrOJqHA9Xn70LbOLmFhIVEEWg4h',
        lat: myLat,
        lon: myLon,
        zoom: 11,
    };

    console.log('updated coords')
    //updateMap(options)
    if (windyAPI) {
        // Windy API is already initialized, update options
        windyAPI.options = options;
        renderMap(myLat, myLon, marinas)
    } else {
        // Windy API not initialized, initialize it
        windyInit(options, api => {
            windyAPI = api;
            //will have to pass a list eventually for the markers
            renderMap(myLat, myLon, marinas);
        });
    }
}

function renderMap(lat, lon, marinas) {
    if (!windyAPI) {
        console.error('Windy API not initialized');
        return;
    }

    const { map } = windyAPI;

    // Create a marker cluster group
    const markerCluster = L.markerClusterGroup();

    // Create a marker for the search location
    const searchMarker = L.marker([lat, lon]).addTo(markerCluster);
    searchMarker.bindPopup('<b>Your Marker</b>').openPopup();

    // MAP HACK try to fix zoom:
    //This opens up the zoom level and pulls in the openstreetmap to overlay so you can still see things.  Windy will go blank if zoomed beyond 11.  
    map.options.minZoom = 4;
    map.options.maxZoom = 17;

    var topLayer = L.tileLayer('https://b.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, ',
        minZoom: 12,
        maxZoom: 17
    }).addTo(map)
    topLayer.setOpacity('0');
    map.on('zoomend', function() {
        if (map.getZoom() >= 12) {
            topLayer.setOpacity('.5');
        } else {
            topLayer.setOpacity('1');
        }
    });
    map.setZoom(11);

    // Place markers for each marina location
    Object.values(marinas.data).forEach(marina => {
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
                    //This, or pass the the info directly??  Need to determine.  
                    window.location.href = `yourPage.html/?name:${id}`;
                });
            });

            markerCluster.addLayer(marker);
        }
    });

    // Add the marker cluster group to the map
    map.addLayer(markerCluster);
    //Adds the openstreetmap layer (hack to fix zoom limitation)
    map.addLayer(topLayer);

    // Center the map on the search location
    map.setView([lat, lon], map.getZoom());
}
