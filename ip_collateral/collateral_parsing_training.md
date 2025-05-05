# Parsing Training Methodology for RocketLang

**Date**: April 27, 2025  
**Purpose**: Details the hybrid parsing system (rule-based + AI-based) for RocketLang and its training methodology.

## Parsing Overview
RocketLang uses a hybrid parsing system to map natural language inputs to commands:  
- **Rule-Based Parsing**: Maps structured inputs (e.g., `show "Hello"`) to actions.  
- **AI-Based Parsing**: Uses LLMs (e.g., DistilBERT) to parse conversational inputs (e.g., "put Anil on morning shift").

## Rule-Based Parsing
- **Example**: `show "Hello"` → `{ action: "display", value: "Hello" }`  
- **Patterns**: Stored in `parseRocketLang` function (e.g., `if (code.includes("show"))`).  

## AI-Based Parsing (DistilBERT)
- **Example**: "tell me the weather" → `{ action: "display", value: "Weather: Wind 14 knots from SW" }`  
- **Training**: Fine-tuned on 100 samples (May 6, 2025), expanding to 1,000+ inputs during beta test (Aug 2025).  

## Near-Natural Inputs with Intelligent Parsing
- **Overview**: RocketLang prioritizes near-natural inputs (e.g., "put Anil on morning shift") while managing complex outputs (e.g., scheduling with conflict detection).  
- **Rule-Based Updates**: Added patterns for conversational inputs (e.g., `put worker on shift type` → `schedule shift type for worker`).  
- **AI-Based Parsing**: Accelerated LLM integration to prototype during beta setup (July 2025), training on near-natural inputs (e.g., "tell me the weather" → `show "Weather: ..."`) with DistilBERT.  
- **Status**: Planned on May 5, 2025, to be implemented on Day 4 (May 6, 2025).

## Syntax Evolution for RocketLang
- **Overview**: RocketLang evolves its syntax with advanced constructs (e.g., loops, conditionals) and self-learning patterns.  
- **Advanced Constructs**: Support loops (`for each order apply discount 10%`), conditionals (`if weather is rough then delay voyage by 1 day`).  
- **Self-Learning**: Use `syntax_patterns` table to store and evolve patterns (e.g., "add button for action").  
- **Status**: Planned on May 5, 2025, to be implemented on Day 4 (May 6, 2025).

## Handling Insufficient Keywords + AI
- **Overview**: As app complexity grows, keywords and AI parsing may not suffice for app creation. RocketLang will evolve into a full-fledged DSL with advanced constructs, AI-driven code generation, and fallbacks.  
- **Procedural Constructs**: Add loops, conditionals, and functions (e.g., `if weather is rough then delay voyage by 1 day`).  
- **AI-Driven Code Generation**: Use LLM to generate RocketLang commands or JavaScript code (e.g., "create a button to order Rice" → `create ui button`).  
- **Fallback to JavaScript**: Allow hybrid apps with JavaScript modules for complex logic (e.g., `fetchWeatherAPI` for real-time updates).  
- **Visual Coding (Future)**: Integrate Blockly (post-beta 2026) for visual app creation, with AI assistance for block suggestions.  
- **Status**: Planned on May 5, 2025, to be implemented post-beta (2026).