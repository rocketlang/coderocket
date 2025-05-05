# CodeRocket Complexity Scorer

**Date**: May 5, 2025

**Changelog**:
- May 6, 2025: Added example scores for Shift Scheduler, pseudocode for scoring logic.
- May 5, 2025: Defined scoring logic for patent, per IP protection oversight.
- Previous Changelog: May 3, 2025, 10:00 AM IST

## Overview
The complexity scorer (complexity_scorer.py) evaluates app complexity to enable optional keywords (animate, connect, navigate) for laymen.

## Logic
- **Inputs**: Code length, keyword count, data structures.  
- **Scoring**:  
  - Length > 50 lines: +20 points.  
  - Keywords > 5: +10 points.  
  - Lists/Dicts: +15 points.  
- **Threshold**: Score > 50 enables optional keywords.  

## Pseudocode for Scoring Logic
function calculateComplexity(code):
score = 0
if code.length > 50:
score += 20
if code.keywordCount > 5:
score += 10
if code.hasListOrDict:
score += 15
return score

if calculateComplexity(code) > 50:
enableOptionalKeywords(["animate", "connect", "navigate"])


## Scoring Criteria
- **Syntax Simplicity (1-5)**: "show 'Hello'" = 1, "loop 3 times: show 'Hi'" = 3  
- **Cognitive Load (1-5)**: "set speed to 15" = 1, "if cargo > 100: show 'Heavy'" = 2  
- **Error Proneness (1-5)**: "show 'Hello'" = 1, "loop 3 times: loop 2 times: show 'Check'" = 4  

## Example Scores
- `show "Hello"`:  
  - Syntax Simplicity: 1  
  - Cognitive Load: 1  
  - Error Proneness: 1  
  - **Total**: 3 (Low)  
- `schedule shift morning for Anil`:  
  - Syntax Simplicity: 2  
  - Cognitive Load: 2  
  - Error Proneness: 2  
  - **Total**: 6 (Moderate)  

## Next Steps
- Test scorer in MVP (August 2025).  
- Include in patent filing (June 2025).  
- Sync to Drive (/CodeRocket/ip_collateral), backup to D:\CodeRocket (~5 PM).  