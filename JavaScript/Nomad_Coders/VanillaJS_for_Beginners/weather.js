const COORDS = 'coords';

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };

    saveCoords(coordsObj);
}

function handleGeoError() {
    console.log("Cant access geo location")
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}
function loadCoords() {
    const loadCords = localStorage.getItem(COORDS);

    if (loadCords === null) {
        askForCoords();
    } else {

    }
}
function init() {
    loadCoords();
}

init();