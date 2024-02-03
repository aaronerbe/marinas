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

/* 
░█▀▄░█░█░▀█▀░█░░░█▀▄░░░█░█░█▀▄░█░░
░█▀▄░█░█░░█░░█░░░█░█░░░█░█░█▀▄░█░░
░▀▀░░▀▀▀░▀▀▀░▀▀▀░▀▀░░░░▀▀▀░▀░▀░▀▀▀
*/
function buildBaseURL(lat, lon){
    return `https://api.marinas.com/v1/points/search?location[lat]=${lat}&location[lon]=${lon}`;
}

/* 
░█▀▀░█▀▀░▀█▀░░░█▄█░█▀█░█▀▄░▀█▀░█▀█░█▀█░░░▀█▀░█▀█░█▀▀░█▀█
░█░█░█▀▀░░█░░░░█░█░█▀█░█▀▄░░█░░█░█░█▀█░░░░█░░█░█░█▀▀░█░█
░▀▀▀░▀▀▀░░▀░░░░▀░▀░▀░▀░▀░▀░▀▀▀░▀░▀░▀░▀░░░▀▀▀░▀░▀░▀░░░▀▀▀
*/
export async function getMarinaInfoFromSearch(lat, lon) {
    const url = buildBaseURL(lat, lon)

    console.log('Fetching data from:', url);
    try {
        const response = await fetch(url, {
        method: 'GET'
        });
        //console.log('Response:', response);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}
