# CodeRocket Technical Documentation

**Date**: May 5, 2025  
**Author**: Grok (99% effort), Anil (1% vision and approval)  
**Purpose**: A detailed technical document summarizing the CodeRocket project, its components, and discussions for layman reference.

## Project Overview
CodeRocket is a platform designed to empower laymen (e.g., sailors, shopkeepers) to create apps using RocketLang (Rocket), a language that supports near-natural inputs (e.g., "put Anil on morning shift") while managing complex outputs (e.g., scheduling shifts with conflict detection). The project emphasizes modularity, automation, and AI-driven development, with a beta test planned for August 2025.

- **Goals**:  
  - Make app creation accessible for laymen with near-natural inputs.  
  - Manage complex outputs (e.g., voyage plans, shift schedules) smoothly.  
  - Build a modular ecosystem where apps can reuse components.  
  - Automate technical tasks (e.g., saving files, committing to GitHub).  

## Technical Stack
- **Core Language**: JavaScript (Node.js) for app logic (e.g., `voyage_tracker.js`).  
- **Database**: SQLite (`rocketlang.db`) for local storage (e.g., `shift_schedules`, `products`).  
- **Dependencies**:  
  - `better-sqlite3` for database operations.  
  - Node.js built-in modules (`fs`, `child_process`) for file operations and automation.  
- **Version Control**: Git/GitHub for repository management (`C:\CodeRocket`).  
- **Collaboration**: Discord for team communication (#general, #tasks).  
- **Development Environment**: Visual Studio 2022 Preview with Python components, GitHub Copilot, and Google Drive for Desktop for backups.  
- **Future Additions**:  
  - Supabase (July 2025) for cloud storage.  
  - Hugging Face Transformers.js (DistilBERT, 2026) for AI parsing.  
  - Razorpay (2026) for payments.  

## Demo Apps in Playground
### Voyage Tracker
- **Purpose**: Manages maritime voyages (e.g., Mundra to Mumbai).  
- **Beginning**: `AppBootstrapper` initializes database, user authentication, state, and logging.  
- **Middle**: Core features like `print voyage plan`, `handle weather disruption`, with reusable modules (e.g., Shift Scheduler for crew scheduling).  
- **Climax**: `AppFinalizer` runs Jest tests, logs errors, commits to GitHub, and updates documentation.  

### Shift Scheduling App
- **Purpose**: Schedules worker shifts with task management and conflict detection.  
- **Beginning**: Auto-initializes database tables (`shift_schedules`, `shift_tasks`).  
- **Middle**: Features like `schedule shift morning for Anil`, `add task "Load Cargo"`, with extensibility for other apps (e.g., E-Commerce for delivery staff).  
- **Climax**: Automated testing, debugging, and GitHub commits.  

### Project Management App
- **Purpose**: Manages projects, tasks, and resources.  
- **Beginning**: Sets up database (`projects`, `project_tasks`).  
- **Middle**: Features like `create project Logistics`, adopts School App’s event scheduling.  
- **Climax**: Runs scripted tests, commits to GitHub.  

### E-Commerce App
- **Purpose**: Manages online stores for shopkeepers (e.g., bulk orders, inventory).  
- **Beginning**: Sets up user authentication and logging.  
- **Middle**: Features like `process bulk order`, adopts Shift Scheduler for delivery staff scheduling.  
- **Climax**: Generates manuals via `manage artifact`, commits changes to GitHub.  

### School App
- **Purpose**: Manages school functions (e.g., timetables, attendance).  
- **Beginning**: Initializes state and database (`timetables`, `students`).  
- **Middle**: Features like `schedule exam Grade 5 Math on 2025-05-10`, reusable in Project Management for event scheduling.  
- **Climax**: Automated testing and documentation updates.  