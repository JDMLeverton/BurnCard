export const title = "Resolution Engine";
export const icon = "Zap";
export const content = `# 1.0 The Resolution Engine

## 1.1 The Check
When a character attempts a risky action, the outcome is determined by building a Poker Hand against a Target Score.

**The Formula:**
> **[Hand Rank] + [Attribute Rank] vs. [Target Difficulty]**

## 1.2 The Sequence
1.  **The Deal:** Players draw up to their Max Hand Size (Default 5).
2.  **The Burn:** The GM deals **1 Card Face Down**. This is **The Burn Card**.
3.  **The Flop:** The GM deals **2 Cards Face Up**.
4.  **The Action:** The Player declares their intent and commits cards from their hand equal to their **Skill Rank**.
    * *Skill 2:* You play 2 Cards + 2 Flop Cards = Pool of 4.
    * *Skill 3:* You play 3 Cards + 2 Flop Cards = Pool of 5. (Unlocks Straights/Flushes).
5.  **The Gambit (Optional):** You may spend **1 Edge** to swap one card from your hand with the face-down **Burn Card** blindly.
6.  **The Score:** Determine the best poker hand from your Pool. Add your **Attribute Rank**.
7.  **Resolution:** Compare Final Score to Target Difficulty.

## 1.3 Scoring Table (Hand Ranks)
| Rank | Hand | Score |
| :--- | :--- | :--- |
| **1** | **High Card** | 1 Pt |
| **2** | **Pair** | 2 Pts |
| **3** | **Two Pair** | 3 Pts |
| **4** | **Three of a Kind** | 4 Pts |
| **5** | **Straight** | 5 Pts |
| **6** | **Flush** | 6 Pts |
| **7** | **Full House** | 7 Pts |
| **8** | **Four of a Kind** | 8 Pts |
| **9+** | **Straight/Royal Flush** | 10 Pts |

## 1.4 Target Difficulties
* **3 (Routine):** Doable by a novice with a Pair.
* **5 (Hard):** Requires a Straight OR a Pair + High Attribute.
* **8 (Extreme):** Requires Quads OR a Strong Hand + High Attribute.
* **10 (Legendary):** Requires a Royal Flush OR a Strong Hand + Master Attribute.

## 1.5 Tiered Success
* **The Scrape (Tie):** **Success at Cost.** You achieve your goal, but suffer a complication.
* **The Clean (Beat by 1-2):** **Standard Success.** You achieve your goal efficiently.
* **The Nova (Beat by 3+):** **Success with Flair.** You succeed and gain a secondary benefit.`;