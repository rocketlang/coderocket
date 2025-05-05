// Navigation Module for RocketLang
// Date: May 7, 2025
function trackShip(lat, lon) {
    console.log(`Tracking ship at Lat ${lat}, Lon ${lon}`);
    return { lat, lon, status: 'tracking' };
}

module.exports = { trackShip };