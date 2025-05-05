# RocketLang Beta Test Plan

**Date**: May 7, 2025

## Overview
Plan a 50-user beta test for RocketLang in August 2025, using Supabase for cloud storage, targeting laymen (sailors, shopkeepers) in India.

## Beta Details
- **Users**: 50 (25 sailors, 25 shopkeepers, India, ~95% Android).
- **Duration**: 2 weeks (Aug 1-15, 2025).
- **Database**: Supabase (free tier, 500 MB, 100K rows).
- **Goals**: Test RocketLang commands (Spark, Orbit, Nova), API/modular integration, gather feedback on usability.

## Onboarding Steps
- **Step 1**: Share beta invite via WhatsApp, link to CodeRocket.in (~5 mins setup).
- **Step 2**: Users sign up with email/phone, get Spark badge (~5 mins per user).
- **Step 3**: Tutorial: Run `show "Hello"`, confirm output (~5 mins).
- **Step 4**: Users create a simple app (e.g., voyage tracker), use `use module navigation: track ship`, share feedback in Discord #beta-feedback (~15 mins).

## API and Modular Integration
- **API**: Test `/logs` endpoint (placeholder) for journey data sharing.
- **Module**: Use navigation module (`track ship`) for maritime apps.
- **Goal**: Validate API/modular structure for future apps (e.g., SeaNav integration).

## Next Steps
- Set up Supabase by July 2025 (~2 hr setup).
- Create onboarding wizard by June 2025 (~10 hr development).
- Test API endpoints with 50-user data (Aug 2025).
- ## Printing Features in Beta
- **Goal**: Test printing commands (`print noon report`, `print voyage plan`) for maritime users.
- **User Task**: Run `print voyage plan`, confirm output, share feedback in #beta-feedback.
- **Future**: Add `generate report pdf` for downloadable reports (2026).