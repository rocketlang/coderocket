// Voyage Tracker for RocketLang
// Date: April 27, 2025
const Database = require('better-sqlite3');
const db = new Database('C:/CodeRocket/src/rocketlang.db');
const AppBootstrapper = require('../app_bootstrapper');
const AppFinalizer = require('../app_finalizer');
const moduleRegistry = {
    shift_scheduler: require('./shift_scheduler_module')
};

let state = { userId: null, currentWaypoint: "Mundra Port", currentDay: "2025-05-08", startTime: "2025-05-08T08:00:00" };
const waypoints = [
    { name: "Mundra Port", distance: 0, seaState: "Calm" },
    { name: "Mumbai Port", distance: 300, seaState: "Rough" }
];

async function initVoyageTracker() {
    const bootstrapper = new AppBootstrapper("voyage_tracker");
    const initialState = await bootstrapper.initialize();
    Object.assign(state, initialState);
    const stmtCheck = db.prepare('SELECT user_id FROM user_sessions WHERE user_id = ?');
    const session = stmtCheck.get("sailor_123");
    if (session) {
        state.userId = "sailor_123";
        console.log(`Welcome back, ${state.userId}! (Logged in)`);
    } else {
        console.log("Welcome to CodeRocket! Please sign in with `sign in user sailor_123`.");
    }
    const parsedTimeline = await parseRocketLang("show timeline");
    await executeCommand(parsedTimeline, state, { waypoints, totalDistance: 0, method, startTime });
}

async function finalizeVoyageTracker() {
    const finalizer = new AppFinalizer("voyage_tracker");
    await finalizer.finalize();
}

function parseRocketLang(code) {
    if (code.includes("print voyage plan")) {
        return { action: "print_voyage_plan" };
    }
    if (code.includes("handle weather disruption")) {
        const waypoint = code.split(" ")[3];
        const day = code.split(" ")[6];
        return { action: "weather_disruption", waypoint, day };
    }
    if (code.includes("suggest modules for app needs")) {
        const needs = code.split(" ")[5];
        return { action: "suggest_modules", needs };
    }
    if (code.includes("use module")) {
        const moduleName = code.split(" ")[2];
        const appName = code.split(" ")[4];
        return { action: "use_module", moduleName, appName };
    }
    return { action: "unknown" };
}

async function executeCommand(parsed, state, context) {
    switch (parsed.action) {
        case "print_voyage_plan":
            console.log("=== Voyage Plan ===");
            waypoints.forEach(wp => console.log(`- Waypoint: ${wp.name}, Distance: ${wp.distance} nm, Sea State: ${wp.seaState}`));
            console.log("=================");
            break;
        case "weather_disruption":
            const weather = { seaState: "Rough" }; // Mock API response
            if (weather.seaState === "Rough") {
                state.startTime = new Date(new Date(state.startTime).getTime() + 24 * 60 * 60 * 1000).toISOString();
                console.log(`Weather disruption detected: Rough. Delaying voyage by 1 day. New start: ${state.startTime}`);
            }
            break;
        case "suggest_modules":
            const moduleIndex = Object.keys(moduleRegistry).map(key => ({
                name: key,
                useCases: ["scheduling"]
            }));
            const suggestions = moduleIndex.filter(module => module.useCases.includes(parsed.needs));
            console.log(`=== Suggested Modules for App Needs: ${parsed.needs} ===`);
            suggestions.forEach(module => console.log(`- ${module.name}`));
            console.log("==================================");
            break;
        case "use_module":
            console.log(`Using module ${parsed.moduleName} in app ${parsed.appName}`);
            break;
        default:
            console.log("Unknown command");
    }
}

initVoyageTracker().then(() => console.log("Voyage Tracker Ready"));