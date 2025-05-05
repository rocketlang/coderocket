// Voyage Tracker Demo - Native RocketLang with Noon Report and Voyage Plan
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
    const R = 3440;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    const delta = Math.log(Math.tan(Math.PI / 4 + lat2Rad / 2) / Math.tan(Math.PI / 4 + lat1Rad / 2));
    const q = Math.abs(delta) > 0.00001 ? dLat / delta : Math.cos(lat1Rad);
    const dist = Math.sqrt(dLat * dLat + q * q * dLon * dLon) * R;
    return dist;
}

// Calculate heading (bearing) for Great Circle or Rhumb Line
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
    const timeHours = distance / speed;
    const eta = new Date(startTime.getTime() + timeHours * 60 * 60 * 1000);
    return eta;
}

// Mock weather data for waypoints (May conditions in Arabian Sea)
function getWeather(waypointName, day) {
    const weatherData = {
        "Mundra Port": { windSpeed: 14, windDir: "SW", seaState: "Moderate", temp: 30 },
        "Surat": { windSpeed: 18, windDir: "SW", seaState: "Rough", temp: 29 },
        "Mumbai Port": { windSpeed: 10, windDir: "W", seaState: "Calm", temp: 28 }
    };
    const baseWeather = weatherData[waypointName] || { windSpeed: 12, windDir: "SW", seaState: "Moderate", temp: 29 };
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
    const timeToTravel = totalDistance / speed;
    const hoursSinceStart = (day - 1) * 24;
    if (hoursSinceStart >= timeToTravel) return { ...end, eta: null };

    const fraction = hoursSinceStart / timeToTravel;
    const lat = start.lat + (end.lat - start.lat) * fraction;
    const lon = start.lon + (end.lon - start.lon) * fraction;
    const remainingDistance = totalDistance * (1 - fraction);
    const eta = calculateETA(remainingDistance, speed, new Date(startTime.getTime() + hoursSinceStart * 60 * 60 * 1000));
    return { lat, lon, eta, name: `En route to ${end.name}` };
}

// RocketLang parser
function parseRocketLang(code) {
    if (code.includes("set") && code.includes("to")) {
        const parts = code.split(" to ");
        const variable = parts[0].split(" ")[1];
        const value = parseInt(parts[1]);
        return { action: "set", variable, value };
    }
    if (code.includes("add") && code.includes("to")) {
        const parts = code.split(" to ");
        const variable = parts[1];
        const value = parseInt(parts[0].split(" ")[1]);
        return { action: "add", variable, value };
    }
    if (code.includes("show") || code.includes("dikhao")) {
        const value = code.match(/"(.*?)"/)[1];
        return { action: "display", value };
    }
    if (code.includes("make function")) {
        return { action: "function", name: code.split(":")[0].split(" ")[2] };
    }
    if (code.includes("animate")) {
        return { action: "animate", coords: code.split("to")[1].trim() };
    }
    if (code.includes("loop")) {
        const parts = code.split(": ");
        const times = parseInt(parts[0].split(" ")[1]);
        const nestedCommand = parts[1];
        if (nestedCommand.includes("loop")) {
            const nestedTimes = parseInt(nestedCommand.split(" ")[1]);
            const nestedInner = nestedCommand.split(": ")[1];
            return {
                action: "loop",
                times,
                command: {
                    action: "loop",
                    times: nestedTimes,
                    command: parseRocketLang(nestedInner)
                }
            };
        }
        return { action: "loop", times, command: parseRocketLang(nestedCommand) };
    }
    if (code.includes("if")) {
        if (code.includes("else")) {
            const condition = code.split(": ")[0].split("if ")[1];
            const ifPart = code.split(": ")[1].split(" else: ")[0];
            const elsePart = code.split(" else: ")[1];
            return {
                action: "if-else",
                condition,
                if_command: parseRocketLang(ifPart),
                else_command: parseRocketLang(elsePart)
            };
        } else {
            const condition = code.split(": ")[0].split("if ")[1];
            const command = code.split(": ")[1];
            return { action: "if", condition, command: parseRocketLang(command) };
        }
    }
    if (code.includes("print")) {
        if (code.includes("noon report")) {
            return { action: "print_noon_report" };
        }
        if (code.includes("voyage plan")) {
            return { action: "print_voyage_plan" };
        }
    }
    if (code.includes("use")) {
        if (code.includes("track")) {
            const [lat, lon] = code.split(" at ")[1].split(',').map(Number);
            return { action: "use", command: { action: "track", coords: `${lat},${lon}` } };
        }
    }
    return null;
}

// Execute RocketLang commands
function executeCommand(parsed, state, context) {
    if (!parsed) return;
    switch (parsed.action) {
        case "set":
            state[parsed.variable] = parsed.value;
            console.log(`Set ${parsed.variable} to ${parsed.value}`);
            break;
        case "add":
            state[parsed.variable] = (state[parsed.variable] || 0) + parsed.value;
            console.log(`Added ${parsed.value} to ${parsed.variable}, now ${state[parsed.variable]}`);
            break;
        case "display":
            console.log(parsed.value, { font: "Noto Sans Devanagari" });
            break;
        case "function":
            console.log(`Created function: ${parsed.name}`);
            break;
        case "animate":
            console.log(`Animating to ${parsed.coords}`);
            break;
        case "loop":
            for (let i = 0; i < parsed.times; i++) {
                executeCommand(parsed.command, state, context);
            }
            break;
        case "if":
            console.log(`Condition checked: ${parsed.condition}`);
            executeCommand(parsed.command, state, context);
            break;
        case "if-else":
            console.log(`Condition checked: ${parsed.condition}`);
            executeCommand(parsed.if_command || parsed.else_command, state, context);
            break;
        case "use":
            if (parsed.command.action === "track") {
                const [lat, lon] = parsed.command.coords.split(',').map(Number);
                navigation.trackShip(lat, lon);
            }
            break;
        case "print_noon_report":
            const { day, noonPosition, heading, distance, speed, weather } = context;
            console.log(`=== Noon Report - Day ${day} (${noonPosition.timezone || "IST"}) ===`);
            console.log(`Position: Lat ${noonPosition.lat.toFixed(4)}°N, Lon ${noonPosition.lon.toFixed(4)}°E (${noonPosition.name})`);
            console.log(`Heading: ${heading.toFixed(2)}° (${context.method === "great-circle" ? "Great Circle" : "Rhumb Line"})`);
            console.log(`Distance to Next Waypoint: ${distance.toFixed(2)} NM`);
            console.log(`Speed: ${speed} knots`);
            console.log(`ETA: ${noonPosition.eta ? noonPosition.eta.toLocaleString() : "Arrived"}`);
            console.log(`Weather: Wind ${weather.windSpeed} knots from ${weather.windDir}, Sea State: ${weather.seaState}, Temp: ${weather.temp}°C`);
            console.log("=================================");
            break;
        case "print_voyage_plan":
            console.log("=== Voyage Plan ===");
            context.waypoints.forEach((wp, index) => {
                console.log(`Waypoint ${index + 1}: ${wp.name} (Lat ${wp.lat}°N, Lon ${wp.lon}°E, Timezone: ${wp.timezone})`);
            });
            console.log(`Total Distance: ${context.totalDistance.toFixed(2)} NM (${context.method === "great-circle" ? "Great Circle" : "Rhumb Line"})`);
            const totalTimeHours = context.totalDistance / speed;
            const endTime = new Date(startTime.getTime() + totalTimeHours * 60 * 60 * 1000);
            console.log(`Estimated Journey Time: ${totalTimeHours.toFixed(2)} hours (End: ${endTime.toLocaleString()})`);
            console.log("==================");
            break;
    }
}

function initVoyageTracker() {
    console.log("Voyage Tracker Started!", { font: "Noto Sans Devanagari" });

    // Define waypoints with realistic lat/long - Mundra to Mumbai route
    const waypoints = [
        { lat: 22.7394, lon: 69.6872, name: "Mundra Port", timezone: "IST" },
        { lat: 21.1463, lon: 72.8017, name: "Surat", timezone: "IST" },
        { lat: 18.9388, lon: 72.8355, name: "Mumbai Port", timezone: "IST" }
    ];

    const speed = 15;
    const startTime = new Date("2025-05-07T00:00:00+05:30");
    const method = "great-circle";
    let currentPosition = waypoints[0];
    let totalDistance = 0;
    let state = { speed: 15, cargo: 150 };

    // Create table for journey log
    db.prepare('CREATE TABLE IF NOT EXISTS journey_log (id INTEGER PRIMARY KEY, day INTEGER, waypoint TEXT, lat REAL, lon REAL, heading REAL, distance REAL, speed REAL, eta TEXT, wind_speed REAL, wind_dir TEXT, sea_state TEXT, temp REAL)').run();

    // Execute RocketLang commands for initial setup
    const initialCommands = [
        "set speed to 15",
        "set cargo to 150",
        "show 'Starting Journey!' on screen",
        "dikhao 'Yatra Shuru!' on screen",
        "print voyage plan"
    ];
    initialCommands.forEach(cmd => {
        const parsed = parseRocketLang(cmd);
        executeCommand(parsed, state, { waypoints, totalDistance: 0, method, startTime });
    });

    // Simulate journey over 3 days
    for (let day = 1; day <= 3; day++) {
        const nextWaypoint = waypoints[day] || waypoints[waypoints.length - 1];
        const noonPosition = simulateNoonPosition(currentPosition, nextWaypoint, speed, day, startTime, method);
        const heading = calculateHeading(currentPosition.lat, currentPosition.lon, nextWaypoint.lat, nextWaypoint.lon, method);
        const distance = method === "great-circle" ? calculateGreatCircleDistance(currentPosition.lat, currentPosition.lon, nextWaypoint.lat, nextWaypoint.lon) : calculateRhumbLineDistance(currentPosition.lat, currentPosition.lon, nextWaypoint.lat, nextWaypoint.lon);
        totalDistance += distance;

        const weather = getWeather(noonPosition.name.includes("En route") ? nextWaypoint.name : noonPosition.name, day);

        const navigationCommands = [
            `print noon report`,
            `loop 2 times: show "Checking Position: ${noonPosition.lat.toFixed(2)}, ${noonPosition.lon.toFixed(2)}"`,
            `if cargo > 100 and speed < 20: show "Heavy Load, Slow Speed!"`,
            "add 5 to cargo",
            `use module navigation: track ship at ${noonPosition.lat.toFixed(2)},${noonPosition.lon.toFixed(2)}`
        ];
        navigationCommands.forEach(cmd => {
            const parsed = parseRocketLang(cmd);
            executeCommand(parsed, state, { day, noonPosition, heading, distance, speed, weather, method, waypoints, totalDistance });
        });

        const stmt = db.prepare('INSERT INTO journey_log (day, waypoint, lat, lon, heading, distance, speed, eta, wind_speed, wind_dir, sea_state, temp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        stmt.run(day, noonPosition.name, noonPosition.lat, noonPosition.lon, heading, distance, speed,
            noonPosition.eta ? noonPosition.eta.toISOString() : "Arrived", weather.windSpeed, weather.windDir, weather.seaState, weather.temp);

        currentPosition = noonPosition;
    }

    console.log(`\nTotal Distance Traveled: ${totalDistance.toFixed(2)} NM (${method === "great-circle" ? "Great Circle" : "Rhumb Line"})`);
}

initVoyageTracker();