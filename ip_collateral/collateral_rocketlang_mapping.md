# RocketLang Functionality Mapping and Frameworks

**Date**: May 7, 2025  
**Purpose**: This document maps RocketLang commands to Python and JavaScript equivalents, demonstrating how laymen can create apps with RocketLang, highlights helpful frameworks for extending RocketLang functionality, and tracks Demo App updates.

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

RocketLang apps can be extended with frameworks to add advanced functionality. Below are frameworks integrated into CodeRocket.

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
TensorFlow.js (AI Layer Placeholder)
Use Case: Train a lightweight AI model in the browser to suggest RocketLang commands (e.g., "show 'Hello'" → "dikhao 'Namaste'").
RocketLang Command: train ai: suggest "show 'Hello'" for user sailor_123
JavaScript Equivalent (Placeholder):
javascript

Copy
async function trainAI() {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 10, inputShape: [5] }));
  model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });
  const trainingData = await fetchUserData('sailor_123'); // Placeholder for user data
  await model.fit(trainingData.xs, trainingData.ys, { epochs: 10 });
  const suggestion = model.predict(tf.tensor2d([[/* input */]]));
  console.log(`Suggested: dikhao 'Namaste'`);
}
API Framework for RocketLang (Planned)
Overview
RocketLang will include an API framework to enable seamless integration with external apps and modules (e.g., payment gateways, IoT devices, third-party maritime apps). This framework will allow laymen to connect RocketLang apps to other systems using simple commands, while providing developers with a structured API for extensibility. The API framework will be developed post-beta (2026), with initial support for RESTful APIs.

Framework: Express.js (Placeholder)
Use Case: Create a RESTful API to expose RocketLang app functionality (e.g., journey logs, user data) to external apps.
RocketLang Command: make api endpoint logs: return journey_data
JavaScript Equivalent (Placeholder):
javascript

Copy
const express = require('express');
const app = express();
app.use(express.json());

app.get('/logs', (req, res) => {
  const db = require('better-sqlite3')('rocketlang.db');
  const journeyData = db.prepare('SELECT * FROM journey_log').all();
  res.json(journeyData);
});

app.listen(3000, () => console.log('RocketLang API running on port 3000'));
Auth0 (Interim Authentication for Beta)
Use Case: Enable user authentication for 50-user beta test (Aug 2025).
RocketLang Command: sign up user sailor_123 with email sailor123@example.com
JavaScript Equivalent (Placeholder):
javascript

Copy
async function signUpUser(email) {
  const { user, error } = await supabase.auth.signUp({ email, password: 'default123' });
  if (error) console.log(error);
  return user;
}
Demo App Updates
Voyage Tracker Commands
Use Case: Manages maritime voyages.
RocketLang Command: print voyage plan
JavaScript Equivalent:
text

Copy
waypoints.forEach(wp => console.log(`- Waypoint: ${wp.name}, Distance: ${wp.distance} nm, Sea State: ${wp.seaState}`));
Update on 2025-05-05: Showcased printing features: print voyage plan, print crew update.
Update on 2025-05-06: Enhanced Voyage Tracker with weather API and Shift Scheduler module.
Shift Scheduler Commands
Use Case: Manages shifts and tasks, reusable in other apps.
RocketLang Command: schedule shift morning for Anil
JavaScript Equivalent:
text

Copy
shiftScheduler.scheduleShift("Anil", "morning", "2025-05-08T06:00:00", "2025-05-08T14:00:00");
Update on 2025-05-05: Integrated Shift Scheduling App as core module with real-world complexity.
Project Management Commands
Use Case: Manages projects, reuses School App scheduling.
RocketLang Command: create project Logistics
JavaScript Equivalent:
text

Copy
projectManagement.createProject("Logistics");
Update on 2025-05-05: Added modular strategy for Project Management App.
E-Commerce Commands
Use Case: Manages online stores, reuses Shift Scheduler for delivery staff.
RocketLang Command: process order for "Rice"
JavaScript Equivalent:
text

Copy
ecommerce.processOrder(productId, quantity);
Update on 2025-05-05: Integrated Shift Scheduler for delivery staff scheduling.
School App Commands
Use Case: Manages school functions, reusable for scheduling.
RocketLang Command: schedule exam Grade 5 Math on 2025-05-10
JavaScript Equivalent:
text

Copy
school.scheduleExam("Grade 5", "Math", "2025-05-10");
Update on 2025-05-05: Added as core module, reusable in Project Management.
Update on 2025-05-06: Added LLM demo data placeholder for beta test: Collect inputs like "schedule shift morning for Anil" for training.
Process Update on 2025-05-07
Added process update automation to streamline file updates.