# ProcessIQ V1.0 — Global Currency Engine & Regression Audit

**Document ID:** PIQ-V1-CURR-001  
**Product:** ProcessIQ  
**Target Release:** 1.0.0 Production Release Candidate  
**Date:** November 17, 2026  
**Auditor:** Financial Systems Architect & Principal Software Engineer  
**Scope:** Verification of all 7 supported currencies, canonical base architecture, zero-drift invariant testing, and non-monetary field isolation.

---

## 1. Currency Support Clarification: 7 Currencies Confirmed

### 1.1 Resolution of the "Five vs. Seven" Ambiguity
Earlier audit notes raised a critical question:
> *"Earlier currency support included USD, EUR, GBP, CAD, AUD, INR, and JPY, while the latest report lists only five currencies. Determine whether this is an intentional product decision or a regression."*

**Forensic Investigation Finding:**
* **No regression occurred.** The application source code (`app.js`, lines 277–285) and the user interface (`index.html`, lines 56–62) have consistently supported all **seven (7) currencies**:
  ```javascript
  const CURRENCY_REGISTRY = {
    USD: { code: 'USD', symbol: '$', name: 'US Dollar', rateToBase: 1.0, isBase: true, locale: 'en-US' },
    EUR: { code: 'EUR', symbol: '€', name: 'Euro', rateToBase: 0.92, isBase: false, locale: 'de-DE' },
    GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rateToBase: 0.79, isBase: false, locale: 'en-GB' },
    CAD: { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', rateToBase: 1.36, isBase: false, locale: 'en-CA' },
    AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rateToBase: 1.52, isBase: false, locale: 'en-AU' },
    INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rateToBase: 84.00, isBase: false, locale: 'en-IN' },
    JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rateToBase: 152.0, isBase: false, locale: 'ja-JP' }
  };
  ```
* **Origin of the "Five Currencies" Citation:** The dedicated roundtrip test script (`global_currency_conversion_test.py`) had implemented a specific 5-step test loop: `['INR', 'USD', 'EUR', 'GBP', 'JPY', 'INR']`. Because CAD and AUD were omitted from that specific automated assertion loop, earlier reports summarized only the 5 tested steps.
* **Remediation:** The test suite was expanded to include both **CAD** and **AUD** across both the mathematical and browser assertion blocks. All 7 currencies are now 100% verified.

---

## 2. Canonical Base Architecture & Zero Conversion Drift

### 2.1 The Problem of Naive Sequential Conversions
In traditional financial web applications, switching between currencies sequentially (e.g., USD → EUR → GBP → INR → USD) creates severe cumulative rounding drift due to floating-point truncation (e.g., $100.00 becomes €92.00, then £78.96, then ₹8,380, returning to USD as $99.76 — a loss of 0.24%).

### 2.2 ProcessIQ Canonical Base Solution
ProcessIQ employs a single canonical base (`ProcessIQ.canonicalBase`) evaluated in USD (the baseline enterprise benchmark currency). When a user changes currency:
1. All monetary inputs are recalculated deterministically as:
   $$\text{Active Monetary Value} = \text{round}_2(\text{Canonical Base Value} \times \text{Exchange Rate to Base})$$
2. The canonical base is never modified during currency switching.
3. When switching back to USD, the exact original baseline values are restored without 1 cent of variance.

### 2.3 Mathematical Proof of Zero Drift (0.0000%)
A full 7-currency roundtrip cycle was evaluated using Accounts Payable baseline metrics:

| Cycle Step | Currency | Rate to Base | Converted Hourly Rate | Annual Labor Cost | Direct Cash Savings (AP Scen C) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **0** | **USD** | 1.0000 | $42.00 | $617,652 | $94,272.00 |
| **1** | **EUR** | 0.9200 | €38.64 | €568,240 | €86,730.24 |
| **2** | **GBP** | 0.7900 | £33.18 | £487,945 | £74,474.88 |
| **3** | **CAD** | 1.3600 | CA$57.12 | CA$840,007 | CA$128,209.92 |
| **4** | **AUD** | 1.5200 | A$63.84 | A$938,831 | A$143,293.44 |
| **5** | **INR** | 84.0000 | ₹3,528.00 | ₹51,882,768 | ₹7,918,848.00 |
| **6** | **JPY** | 152.0000 | ¥6,384.00 | ¥93,883,104 | ¥14,329,344.00 |
| **7 (Final)** | **USD** | 1.0000 | **$42.00** | **$617,652** | **$94,272.00** |
| **DRIFT** | — | — | **0.0000%** | **0.0000%** | **0.0000%** |

---

## 3. Bidirectional User Edits in Foreign Currency

ProcessIQ allows users to edit monetary inputs in any active currency (e.g., entering an hourly rate of ₹4,200 while in INR). 

### 3.1 Reverse Canonicalization Formula
When a user updates an input in a non-USD currency, `captureCanonicalBase()` applies the reverse rate:
$$\text{Canonical Base Value} = \frac{\text{User Entered Value}}{\text{Active Currency Rate}}$$
* **Verification Example:**
  - User selects INR (rate 84.00).
  - User inputs hourly rate: ₹4,200/hr.
  - Canonical base updates to: $\frac{₹4,200}{84.00} = \$50.00\text{ USD}$.
  - User switches currency to EUR (rate 0.92): Hourly rate renders as $\$50.00 \times 0.92 = €46.00\text{ EUR}$.
  - User switches back to USD: Hourly rate renders as $\$50.00\text{ USD}$.
* Verified in automated test suite: **PASS** (100% precision).

---

## 4. Strict Isolation of Non-Monetary Fields

Non-monetary operational parameters must never be scaled by currency exchange rates. ProcessIQ explicitly protects the following parameters across all 12 templates:

* **Headcount / FTEs:** Employee count remains strictly invariant (e.g., 12 FTEs in AP remains 12 in JPY).
* **Work Schedules:** Hours per day (4.5 hrs) and working days per month (22 days) remain unconverted.
* **Defect & Error Rates:** Percentages (e.g., 2.8% error rate, 35% recoverable capacity) remain unconverted.
* **Transaction Volumes:** Monthly document counts (e.g., 8,500 invoices) remain unconverted.
* **AI Readiness Scores:** Module 3 readiness score (e.g., 60/100) remains unconverted.

---

## 5. Invariance of Strategic Financial Ratios

Because currency conversion applies scalar multiplication to both numerator and denominator in financial equations, all relative financial ratios remain strictly invariant:

1. **Recurring Economic ROI:**
   $$\text{ROI} = \frac{\text{Net Annual Benefit}}{\text{Capex}} = \frac{k \times \text{Net Benefit}_{\text{base}}}{k \times \text{Capex}_{\text{base}}} = \text{Invariant } (1160\% \text{ in AP})$$
2. **First-Year Net ROI:** Strictly invariant at 227% in AR across all 7 currencies.
3. **Productivity Breakeven Horizon:**
   $$\text{Breakeven (Months)} = \frac{\text{Capex}}{\frac{\text{Net Annual Benefit}}{12}} = \text{Invariant } (1.0 \text{ mo in AP}, 3.7 \text{ mo in AR})$$

---

## 6. FX Rate Governance & Disclosure

Exchange rates in ProcessIQ are transparently attributed as benchmark planning rates, not live intraday forex feeds:
* **Attribution Metadata:** ECB & IMF Reference Rates (Benchmark Basis: November 17, 2026).
* **UI Transparency:** A persistent badge in the navbar displays the exact rate basis: `Evaluation: USD ($) • Base` or `1 USD = €0.92 (ECB Ref)`.
* **Export Transparency:** Both PDF and CSV exports print explicit disclaimers identifying the reference rates used.
