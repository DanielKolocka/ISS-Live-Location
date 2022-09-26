const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

const map = L.map('myMap').setView([0, 0], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

let myMapIcon = L.icon({
    iconUrl: './assets/iss_icon.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
});

var marker = L.marker([0, 0], { icon: myMapIcon }).addTo(map);
let initialCall = true;
async function getData() {
    let response = await fetch(api_url);
    let data = await response.json();
    // console.log(data);
    let { latitude, longitude, velocity, units } = data;
    document.getElementById('latitude').textContent = latitude.toFixed(3);
    document.getElementById('longitude').textContent = longitude.toFixed(3);
    document.getElementById('velocity').textContent = velocity.toFixed(1);
    document.getElementById('units').textContent = units;
    marker.setLatLng([latitude, longitude]);
    if (initialCall) {
        map.setView([latitude, longitude], 3);
        initialCall = !initialCall
    }
}

getData();
setInterval(getData, 1500);