// Voyage Tracker Demo - Enhanced with Navigation, Noon Reports, and Weather
// Date: May 7, 2025
const Database = require('better-sqlite3');
const db = new Database('C:/CodeRocket/src/rocketlang.db');

// Haversine formula to calculate distance between two lat/lon points (in nautical miles)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3440; // Earth's radius in nautical miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Calculate heading (bearing/course) between two lat/lon points (in degrees)
function calculateHeading(lat1, lon1, lat2, lon2) {
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const y = Math.sin(dLon) * Math.cos(lat2 * Math.PI / 180);
    const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
        Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos(dLon);
    let heading = Math.atan2(y, x) * 180 / Math.PI;
    return (heading + 360) % 360; // Normalize to 0-360 degrees
}

// Calculate ETA based on distance and speed (in knots)
function calculateETA(distance, speed, startTime) {
    const timeHours = distance / speed; // Time in hours
    const eta = new Date(startTime.getTime() + timeHours * 60 * 60 * 1000);
    return eta;
}

// Mock weather data for waypoints (in a real app, use an API like OpenWeather)
function getWeather(waypointName) {
    const weatherData = {
        "Mundra Port": { windSpeed: 12, windDir: "NE", seaState: "Moderate" },
        "Surat": { windSpeed: 15, windDir: "SW", seaState: "Rough" },
        "Mumbai Port": { windSpeed: 8, windDir: "NW", seaState: "Calm" }
    };
    return weatherData[waypointName] || { windSpeed: 10, windDir: "N", seaState: "Moderate" };
}

// Simulate ship's position at noon each day
function simulateNoonPosition(start, end, speed, day, startTime) {
    const totalDistance = calculateDistance(start.lat, start.lon, end.lat, end.lon);
    const timeToTravel = totalDistance / speed; // Hours to travel between waypoints
    const hoursSinceStart = (day - 1) * 24; // Hours since journey start (at noon each day)
    if (hoursSinceStart >= timeToTravel) return { ...end, eta: null }; // Reached or passed waypoint

    const fraction = hoursSinceStart / timeToTravel;
    const lat = start.lat + (end.lat - start.lat) * fraction;
    const lon = start.lon + (end.lon - start.lon) * fraction;
    const remainingDistance = totalDistance * (1 - fraction);
    const eta = calculateETA(remainingDistance, speed, new Date(startTime.getTime() + hoursSinceStart * 60 * 60 * 1000));
    return { lat, lon, eta, name: `En route to ${end.name}` };
}

function initVoyageTracker() {
    console.log("Voyage Tracker Started!", { font: "Noto Sans Devanagari" });

    // Define waypoints (latitude, longitude) - Mundra to Mumbai route
    const waypoints = [
        { lat: 22.7394, lon: 69.6872, name: "Mundra Port", timezone: "IST" }, // UTC+5:30
        { lat: 21.1463, lon: 72.8017, name: "Surat", timezone: "IST" },
        { lat: 19.0760, lon: 72.8777, name: "Mumbai Port", timezone: "IST" }
    ];

    const speed = 15; // Speed in knots
    const startTime = new Date("2025-05-07T00:00:00+05:30"); // Start journey at midnight IST
    let currentPosition = waypoints[0];
    let totalDistance = 0;

    // Create table for journey log
    db.prepare('CREATE TABLE IF NOT EXISTS journey_log (id INTEGER PRIMARY KEY, day INTEGER, waypoint TEXT, lat REAL, lon REAL, heading REAL, distance REAL, speed REAL, eta TEXT, wind_speed REAL, wind_dir TEXT, sea_state TEXT)').run();

    // Simulate journey over 3 days
    for (let day = 1; day <= 3; day++) {
        const nextWaypoint = waypoints[day] || waypoints[waypoints.length - 1];
        const noonPosition = simulateNoonPosition(currentPosition, nextWaypoint, speed, day, startTime);
        const heading = calculateHeading(currentPosition.lat, currentPosition.lon, nextWaypoint.lat, nextWaypoint.lon);
        const distance = calculateDistance(currentPosition.lat, currentPosition.lon, nextWaypoint.lat, nextWaypoint.lon);
        totalDistance += distance;

        // Get weather at the current position
        const weather = getWeather(noonPosition.name.includes("En route") ? nextWaypoint.name : noonPosition.name);

        // Log noon report
        console.log(`\nNoon Report - Day ${day} (${noonPosition.timezone || "IST"}):`);
        console.log(`Position: Lat ${noonPosition.lat.toFixed(4)}, Lon ${noonPosition.lon.toFixed(4)} (${noonPosition.name})`);
        console.log(`Heading: ${heading.toFixed(2)}°`);
        console.log(`Distance to Next Waypoint: ${distance.toFixed(2)} NM`);
        console.log(`Speed: ${speed} knots`);
        console.log(`ETA: ${noonPosition.eta ? noonPosition.eta.toLocaleString() : "Arrived"}`);
        console.log(`Weather: Wind ${weather.windSpeed} knots from ${weather.windDir}, Sea State: ${weather.seaState}`);

        // Store in database
        const stmt = db.prepare('INSERT INTO journey_log (day, waypoint, lat, lon, heading, distance, speed, eta, wind_speed, wind_dir, sea_state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        stmt.run(day, noonPosition.name, noonPosition.lat, noonPosition.lon, heading, distance, speed,
            noonPosition.eta ? noonPosition.eta.toISOString() : "Arrived", weather.windSpeed, weather.windDir, weather.seaState);

    current.position = noonPosition; // Update current position for next day's calculation
    }

    console.log(\nTotal Distance Traveled: ${ totalDistance.toFixed(2) } NM);
}

initVoyageTracker();