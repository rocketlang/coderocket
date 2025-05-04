# CodeRocket Complexity Scorer

**Date**: May 5, 2025

**Changelog**:
- May 5, 2025: Defined scoring logic for patent, per IP protection oversight.
- Previous Changelog: May 3, 2025, 10:00 AM IST

## Overview
The complexity scorer (complexity_scorer.py) evaluates app complexity to enable optional keywords (animate, connect, navigate).

## Logic
- **Inputs**: Code length, keyword count, data structures.
- **Scoring**:
  - Length > 50 lines: +20 points.
  - Keywords > 5: +10 points.
  - Lists/Dicts: +15 points.
- **Threshold**: Score > 50 enables optional keywords.

## Pseudocode
if code_length > 50: score += 20
if keyword_count > 5: score += 10
if has_list_or_dict: score += 15
if score > 50: enable animate, connect, navigate

## Next Steps
- Test scorer in MVP (August 2025).
- Include in patent filing (June 2025).
- Sync to Drive (/CodeRocket/ip_collateral), backup to D:\CodeRocket (~5 PM).
