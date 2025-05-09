# CodeRocket Language Syntax Specification

**Date**: May 5, 2025

## Overview
The CodeRocket language is a patent-pending, hybrid syntax for laymen and all students, with 13 core keywords, 3 optional keywords, and Hindi aliases for accessibility.

## Core Keywords (13)
- name: Define variable (e.g., name ship = "Voyage1").
- show/dikhao: Display item (e.g., show "Hello" on screen).
- move: Move object (e.g., move ship to 100,200).
- listen: Capture input (e.g., listen to click on button).
- place3d: Place in AR (e.g., place3d ship at 0,0,0).
- draw: Render graphic (e.g., draw circle at 50,50).
- place: Position UI element (e.g., place button at 10,10).
- add: Add to list/dict (e.g., add "item" to inventory).
- repeat: Loop (e.g., repeat 5 times: show "Loop").
- if: Conditional (e.g., if score > 10: show "Win").
- make function: Define function (e.g., make function greet: show "Hello").
- make list: Create list (e.g., make list inventory = ["item1", "item2"]).
- make dict: Create dictionary (e.g., make dict user = {name: "Anil", age: 30}).

## Optional Keywords (3, auto-enabled for complexity >50)
- animate: Animate object (e.g., animate ship to 200,200 over 2 seconds).
- connect: API call (e.g., connect to weather_api).
- navigate: Screen transition (e.g., navigate to home_screen).

## Hindi Aliases
- show: dikhao (e.g., dikhao "Namaste" on screen).
- Others mapped via lang_map.json (e.g., move: hatao).

## Next Steps
- Refine syntax post-sprint (May 9, 2025).
- File patent (June 2025).
