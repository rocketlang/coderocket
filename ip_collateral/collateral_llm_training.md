# LLM Training Methodology for RocketLang

**Date**: April 27, 2025  
**Purpose**: Outlines the training methodology for LLMs (DistilBERT, Mistral 7B) to support RocketLang’s AI-assisted parsing and code generation.

## Training Overview
RocketLang uses LLMs to parse natural language inputs (e.g., "put Anil on morning shift") and generate commands (e.g., `schedule shift morning for Anil`). Initial training will use DistilBERT, with Mistral 7B as a future option.

## DistilBERT Training Plan
- **Prototype (July 2025, ~2 hr)**: Fine-tune on 500 samples using Google Colab (free tier).  
- **Beta Test (Aug 2025, ~10 hr)**: Train on 1,000+ inputs from demo apps, improving intent recognition.  
- **Post-Beta (2026, ~50 hr)**: Full training on 10,000+ inputs, adding entity extraction and code generation.  

## Immediate DistilBERT Integration
- **Training**: Fine-tuned on 100 samples (e.g., "schedule shift morning for Anil") using Google Colab (free tier, ~1 hr).  
- **Integration**: Added to `voyage_tracker.js` via Transformers.js, enabling `parse natural input` command.  
- **Cost**: Free (Colab free tier, local deployment).  
- **Status**: Implemented on Day 4 (May 6, 2025).  

## Future LLM Option: Mistral 7B
- **Why Mistral 7B?**: Open-source (Apache 2.0), efficient (~14 GB, 7B parameters), outperforms LLaMA 13B in NLP tasks.  
- **Training Plan**:  
  - **Prototype (Q4 2025, ~20 hr)**: Fine-tune on 1,000 samples post-beta, focusing on contextual parsing and multi-turn dialogues.  
  - **Full Integration (2026, ~100 hr)**: Train on 10,000+ inputs, integrating alongside DistilBERT for hybrid parsing.  
- **Status**: Planned on May 5, 2025, to be revisited post-beta (2026).

## Training for Entity Recognition and Intent
- **Overview**: Train LLM to extract entities (e.g., attendees, dates) and infer intent from near-natural inputs (e.g., "schedule a meeting next week with the team").  
- **Data Collection**: Collect inputs from demo apps (e.g., "order 10 units of Rice for tomorrow") during beta test (Aug 2025).  
- **Fine-Tuning**: Focus on entity recognition (e.g., dates, workers) and intent mapping (e.g., "order supplies" → `process order`).  
- **Status**: Planned on May 5, 2025, to be implemented post-beta (2026).

## Prioritizing Near-Natural Inputs
- **Overview**: Training focuses on near-natural inputs (e.g., "put Anil on morning shift") to ensure RocketLang is intuitive for laymen.  
- **Data Collection**: Prioritize conversational inputs from demo apps (e.g., Voyage Tracker, Shift Scheduler) during beta test (Aug 2025).  
- **Timeline**: Accelerated LLM prototyping to July 2025 (~2 hr), full integration post-beta (2026, ~50 hr).  
- **Status**: Planned on May 5, 2025, to be implemented on Day 4 (May 6, 2025).