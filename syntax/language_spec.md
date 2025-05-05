# CodeRocket Language Specification

**Date**: May 5, 2025

## Overview
This document details the patent-pending CodeRocket language syntax for IP collateral, enabling laymen and students to create apps.

## Syntax Rules
- Keywords: 13 core (name, show, move, etc.), 3 optional (animate, connect, navigate).
- Structure: Subject-verb-object (e.g., move ship to 100,200).
- Fuzzy Matching: Tolerates typos (e.g., shw → show, fuzzy_match.py).
- Multilingual: Hindi aliases (e.g., show → dikhao, lang_map.json).

## Data Structures
- Lists: make list inventory = ["item1", "item2"].
- Dictionaries: make dict user = {name: "Anil", age: 30}.
- Functions: make function greet: show "Hello".

## Accessibility
- Icon-based coding (icon_builder.js).
- Voice tutorials (voice_tutorial.js).
- Low-literacy support (~20% of India).

## Next Steps
- Finalize collateral for patent (June 2025).
- Test with beta users (August 2025).
## Control Flow Commands
- Spark: loop 5 times: show "Counting" → for (let i = 0; i < 5; i++) { console.log("Counting"); }
- Orbit: if cargo > 100: show "Heavy" → if (cargo > 100) { console.log("Heavy"); }
- Nova: if ship at 200,200: animate to 300,300 else: show "Off Course" → if (ship.x === 200 && ship.y === 200) { animate(300, 300); } else { console.log("Off Course"); }
- ## Advanced Syntax (Added May 7, 2025)

### Nested Loops
- Spark: loop 3 times: loop 2 times: show "Cargo Check" → for (let i = 0; i < 3; i++) { for (let j = 0; j < 2; j++) { console.log("Cargo Check"); } }
- Orbit: loop 4 times: loop 3 times: make list items → for (let i = 0; i < 4; i++) { for (let j = 0; j < 3; j++) { items.push([]); } }
- Nova: loop 2 times: loop 2 times: place3d crate at 10,10,5 → for (let i = 0; i < 2; i++) { for (let j = 0; j < 2; j++) { place3d("crate", 10, 10, 5); } }

### Complex Conditionals
- Spark: if cargo > 100 and fuel < 50: show "Alert" → if (cargo > 100 && fuel < 50) { console.log("Alert"); }
- Orbit: if speed > 20 or distance < 10: make function stop: connect brake_api → if (speed > 20 || distance < 10) { brake_api.stop(); }
- Nova: if ship at 200,200 and time > 12: animate to 300,300 else: show "Off Course" → if (ship.x === 200 && ship.y === 200 && time > 12) { animate(300, 300); } else { console.log("Off Course"); }

### Variable Manipulation
- Spark: set speed to 15 → let speed = 15;
- Spark: add 10 to speed → speed += 10;
- Orbit: set cargo to 150 → let cargo = 150;
- Nova: add 5 to cargo → cargo += 5;

## Test Cases
- Test: loop 3 times: loop 2 times: show "Cargo Check" (Spark) → 6 outputs of "Cargo Check"
- Test: if cargo > 100 and fuel < 50: show "Alert" (Spark) → {"action": "if", "condition": "cargo > 100 and fuel < 50", "command": {"action": "display", "value": "Alert"}}
- Test: set speed to 15 (Spark) → {"action": "set", "variable": "speed", "value": 15}
- Test: add 10 to speed (Spark) → {"action": "add", "variable": "speed", "value": 10}