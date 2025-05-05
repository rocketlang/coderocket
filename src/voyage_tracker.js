// Voyage Tracker Demo - Realistic Navigation with Great Circle and Rhumb Line
// Date: May 7, 2025
const Database = require('better-sqlite3');
const db = new Database('C:/CodeRocket/src/rocketlang.db');

// Haversine formula for Great Circle distance (in nautical miles)
function calculateGreatCircleDistance(lat1, lon1, lat2, lon2) {
    const R = 3440; // Earth's radius in nautical miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Rhumb Line distance (in nautical miles)
function calculateRhumbLineDistance(lat1, lon1, lat2, lon2) {
    const R = 3440; // Earth's radius in nautical miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    const delta = Math.log(Math.tan(Math.PI / 4 + lat2Rad / 2) / Math.tan(Math.PI / 4 + lat1Rad / 2));
    const q = Math.abs(delta) > 0.00001 ? dLat / delta : Math.cos(lat1Rad);
    const dist = Math.sqrt(dLat * dLat + q * q * dLon * dLon) * R;
    return dist;
}

// Calculate heading (bearing) for Great Circle (dynamic) or Rhumb Line (constant)
function calculateHeading(lat1, lon1, lat2, lon2, method = "great-circle") {
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    if (method === "rhumb-line") {
        const delta = Math.log(Math.tan(Math.PI / 4 + lat2Rad / 2) / Math.tan(Math.PI / 4 + lat1Rad / 2));
        const y = Math.sin(dLon);
        const x = delta;
        let bearing = Math.atan2(y, x) * 180 / Math.PI;
        return (bearing + 360) % 360;
    } else {
        const y = Math.sin(dLon) * Math.cos(lat2Rad);
        const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) -
            Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
        let bearing = Math.atan2(y, x) * 180 / Math.PI;
        return (bearing + 360) % 360;
    }
}

// Calculate ETA based on distance and speed (in knots)
function calculateETA(distance, speed, startTime) {
    const timeHours = distance / speed; // Time in hours
    const eta = new Date(startTime.getTime() + timeHours * 60 * 60 * 1000);
    return eta;
}

// Mock weather data for waypoints (based on typical May conditions in Arabian Sea)
function getWeather(waypointName, day) {
    const weatherData = {
        "Mundra Port": { windSpeed: 14, windDir: "SW", seaState: "Moderate", temp: 30 }, // Monsoon winds
        "Surat": { windSpeed: 18, windDir: "SW", seaState: "Rough", temp: 29 },
        "Mumbai Port": { windSpeed: 10, windDir: "W", seaState: "Calm", temp: 28 }
    };
    const baseWeather = weatherData[waypointName] || { windSpeed: 12, windDir: "SW", seaState: "Moderate", temp: 29 };
    // Simulate slight weather variation per day
    return {
        windSpeed: baseWeather.windSpeed + (day % 2 === 0 ? 2 : -2),
        windDir: baseWeather.windDir,
        seaState: baseWeather.seaState,
        temp: baseWeather.temp + (day % 2 === 0 ? 1 : -1)
    };
}

// Simulate ship's position at noon each day
function simulateNoonPosition(start, end, speed, day, startTime, method = "great-circle") {
    const totalDistance = method === "great-circle" ? calculateGreatCircleDistance(start.lat, start.lon, end.lat, end.lon) : calculateRhumbLineDistance(start.lat, start.lon, end.lat, end.lon);
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

    // Define waypoints with realistic lat/long - Mundra to Mumbai route
    const waypoints = [
        { lat: 22.7394, lon: 69.6872, name: "Mundra Port", timezone: "IST" }, // UTC+5:30
        { lat: 21.1463, lon: 72.8017, name: "Surat", timezone: "IST" },
        { lat: 18.9388, lon: 72.8355, name: "Mumbai Port", timezone: "IST" }
    ];

    const speed = 15; // Speed in knots
    const startTime = new Date("2025-05-07T00:00:00+05:30"); // Start journey at midnight IST
    const method = "great-circle"; // Choose "great-circle" or "rhumb-line"
    let currentPosition = waypoints[0];
    let totalDistance = 0;

    // Create table for journey log
    db.prepare('CREATE TABLE IF NOT EXISTS journey_log (id INTEGER PRIMARY KEY, day INTEGER, waypoint TEXT, lat REAL, lon REAL, heading REAL, distance REAL, speed REAL, eta TEXT, wind_speed REAL, wind_dir TEXT, sea_state TEXT, temp REAL)').run();

    // Simulate journey over 3 days
    for (let day = 1; day <= 3; day++) {
        const nextWaypoint = waypoints[day] || waypoints[waypoints.length - 1];
        const noonPosition = simulateNoonPosition(currentPosition, nextWaypoint, speed, day, startTime, method);
        const heading = calculateHeading(currentPosition.lat, currentPosition.lon, nextWaypoint.lat, nextWaypoint.lon, method);
        const distance = method === "great-circle" ? calculateGreatCircleDistance(currentPosition.lat, currentPosition.lon, nextWaypoint.lat, nextWaypoint.lon) : calculateRhumbLineDistance(currentPosition.lat, currentPosition.lon, nextWaypoint.lat, nextWaypoint.lon);
        totalDistance += distance;

        // Get weather at the current position
        const weather = getWeather(noonPosition.name.includes("En route") ? nextWaypoint.name : noonPosition.name, day);

        // Log noon report
        console.log(`\nNoon Report - Day ${day} (${noonPosition.timezone || "IST"}):`);
        console.log(`Position: Lat ${noonPosition.lat.toFixed(4)}°N, Lon ${noonPosition.lon.toFixed(4)}°E (${noonPosition.name})`);
        console.log(`Heading: ${heading.toFixed(2)}° (${method === "great-circle" ? "Great Circle" : "Rhumb Line"})`);
        console.log(`Distance to Next Waypoint: ${distance.toFixed(2)} NM`);
        console.log(`Speed: ${speed} knots`);
        console.log(`ETA: ${noonPosition.eta ? noonPosition.eta.toLocaleString() : "Arrived"}`);
        console.log(`Weather: Wind ${weather.windSpeed} knots from ${weather.windDir}, Sea State: ${weather.seaState}, Temp: ${weather.temp}°C`);

        // Store in database
        const stmt = db.prepare('INSERT INTO journey_log (day, waypoint, lat, lon, heading, distance, speed, eta, wind_speed, wind_dir, sea_state, temp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        stmt.run(day, noonPosition.name, noonPosition.lat, noonPosition.lon, heading, distance, speed,
            noonPosition.eta ? noonPosition.eta.toISOString() : "Arrived", weather.windSpeed, weather.windDir, weather.seaState, weather.temp);

        currentPosition = noonPosition; // Update for next day's calculation
    }

    console.log(`\nTotal Distance Traveled: ${totalDistance.toFixed(2)} NM (${method === "great-circle" ? "Great Circle" : "Rhumb Line"})`);
}

initVoyageTracker();