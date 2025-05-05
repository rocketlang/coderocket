# RocketLang Functionality Mapping and Frameworks

**Date**: May 7, 2025  
**Purpose**: This document maps RocketLang commands to Python and JavaScript equivalents, demonstrating how laymen can create apps with RocketLang, and highlights helpful frameworks for extending RocketLang functionality.

## RocketLang to Python/JavaScript Mapping

RocketLang is designed for laymen (e.g., sailors, shopkeepers) to create apps using simple, natural language commands. Below, we map RocketLang commands to Python and JavaScript equivalents, showing how they translate under the hood.

### Display Commands
| RocketLang Command         | Python Equivalent                     | JavaScript Equivalent                   | Notes                              |
|----------------------------|---------------------------------------|-----------------------------------------|------------------------------------|
| show "Hello"              | print("Hello")                       | console.log("Hello")                   | Displays text in English          |
| dikhao "Namaste"          | print("Namaste")                     | console.log("Namaste")                 | Displays text in Hindi            |

### Variable Manipulation
| RocketLang Command         | Python Equivalent                     | JavaScript Equivalent                   | Notes                              |
|----------------------------|---------------------------------------|-----------------------------------------|------------------------------------|
| set speed to 15           | speed = 15                           | let speed = 15;                        | Initializes a variable            |
| add 10 to speed           | speed += 10                          | speed += 10;                           | Modifies a variable               |

### Loops
| RocketLang Command         | Python Equivalent                     | JavaScript Equivalent                   | Notes                              |
|----------------------------|---------------------------------------|-----------------------------------------|------------------------------------|
| loop 3 times: show "Hi"   | for i in range(3): print("Hi")       | for (let i = 0; i < 3; i++) { console.log("Hi"); } | Repeats a command 3 times         |
| loop 3 times: loop 2 times: show "Check" | for i in range(3): for j in range(2): print("Check") | for (let i = 0; i < 3; i++) { for (let j = 0; j < 2; j++) { console.log("Check"); } } | Nested loops for 6 total outputs |

### Conditionals
| RocketLang Command         | Python Equivalent                     | JavaScript Equivalent                   | Notes                              |
|----------------------------|---------------------------------------|-----------------------------------------|------------------------------------|
| if cargo > 100: show "Heavy" | if cargo > 100: print("Heavy")       | if (cargo > 100) { console.log("Heavy"); } | Simple conditional                |
| if cargo > 100 and fuel < 50: show "Alert" | if cargo > 100 and fuel < 50: print("Alert") | if (cargo > 100 && fuel < 50) { console.log("Alert"); } | Complex conditional with AND      |

### Functions and API Calls
| RocketLang Command         | Python Equivalent                     | JavaScript Equivalent                   | Notes                              |
|----------------------------|---------------------------------------|-----------------------------------------|------------------------------------|
| make function pay: connect razorpay_api | def pay(): razorpay_api.connect()    | function pay() { razorpay_api.connect(); } | Creates a function to call an API |

### Animation and 3D Placement
| RocketLang Command         | Python Equivalent                     | JavaScript Equivalent                   | Notes                              |
|----------------------------|---------------------------------------|-----------------------------------------|------------------------------------|
| animate ship to 200,200   | N/A (Python lacks native 2D/3D)      | animate({ x: 200, y: 200 });           | Uses PixiJS/WebXR for animation   |
| place3d crate at 10,10,5  | N/A (Python lacks native 3D)         | place3d("crate", 10, 10, 5);           | Uses PixiJS/WebXR for 3D placement |

## Helpful Frameworks for RocketLang Apps

RocketLang apps can be extended with frameworks to add advanced functionality. Below are frameworks integrated into CodeRocket (per `tech_stack.md`).

### Supabase (Cloud Database)
- **Use Case**: Store user data (e.g., sailor journey logs) during the beta test (Aug 2025).
- **RocketLang Command**: `make function store_log: connect supabase_api`
- **JavaScript Equivalent**: 
  ```javascript
  async function store_log() {
    const { data, error } = await supabase.from('journey_log').insert({ day: 1, lat: 22.7394, lon: 69.6872 });
    if (error) console.log(error);
    return data;
  }