# CodeRocket Code Engine Plan

**Date**: May 5, 2025

**Changelog**:
- May 5, 2025: Added auto-correction, auto-learning features, per scalability, IP protection oversights.
- Previous Changelog: May 3, 2025, 10:00 AM IST

## Overview
The CodeRocket code engine powers a low/no-code platform for laymen, with auto-correction and auto-learning for intuitive app creation.

## Features
- **Auto-Correction**:
  - Fuzzy matching (fuzzy_match.py) fixes typos (e.g., shw → show, dikao → dikhao).
  - Error handling (error_handler.js) suggests valid syntax (e.g., sho "Welcome" → show "Welcome" on screen).
- **Auto-Learning**:
  - Complexity scorer (complexity_scorer.py) adapts to user patterns, enabling optional keywords (e.g., animate for complex apps).
  - Multi-LLM (Grok, DeepSeek) refines suggestions based on inputs, stored in Firebase (user_profile.js).
- **Layman-Friendly**: Supports non-technical users (e.g., sailors) with icon-based coding, voice tutorials, per **user onboarding oversight**.

## Examples
- **Auto-Correct**: User types `sho "Hello"`; engine corrects to `show "Hello" on screen`.
- **Auto-Learn**: Frequent `show` use prompts `draw` suggestions for visuals.

## Next Steps
- Implement fuzzy matching, error handling in MVP (August 2025).
- Enhance AI learning post-Series A (2026), per **future_plan.md**.
- Sync to Drive (/CodeRocket/docs), backup to D:\CodeRocket (~5 PM).
