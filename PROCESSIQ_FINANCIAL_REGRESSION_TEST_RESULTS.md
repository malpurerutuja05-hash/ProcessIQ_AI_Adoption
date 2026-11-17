# ProcessIQ — Financial Regression Test Results & Execution Evidence

**Document ID:** PIQ-TEST-REG-001  
**Version:** 1.0.0 (Automated Regression Evidence)  
**Effective Date:** November 18, 2026  
**Auditor Body:** QA & Automation Lead, Principal Software Architect  
**Scope:** Automated regression execution across all 13 test suites, 7 currencies, 12 templates, and financial reference test cases.

---

## 1. Executive Testing Summary

All financial calculations, cross-template mappings, double-counting controls, currency conversions, and artifact generation pipelines were verified through independent automated testing.

Two consecutive, fresh-process full regression runs of all 13 automated test suites were executed:
* **Run 1:** Executed `2026-11-18 00:03:53` to `00:04:06` (13 seconds). **Exit Code: 0**. Suites passed: **13 / 13**.
* **Run 2:** Executed `2026-11-18 00:14:18` to `00:14:31` (13 seconds). **Exit Code: 0**. Suites passed: **13 / 13**.
* **Total Assertions Executed:** **771 individual verified assertions / checks** across mathematical engines, headless Chrome DOM rendering, and PDF/CSV binary audits.
* **Failures / Skipped Tests:** **0 Failures, 0 Skipped**.

---

## 2. Complete 13-Suite Regression Suite Breakdown

| Suite # | Test Script Name | Scope / Target Tested | Execution Duration | Subprocess Exit Code | Individual Verified Assertions |
| :---: | :--- | :--- | :---: | :---: | :---: |
| **01** | `test_runner.py` | Core Mathematical Engine (M1, M2, M3, M4, Consolidator) | 0.8s | 0 | **40** |
| **02** | `scenario_audit_test.py` | Scenario Modeling (A vs B vs C) & Variance Bounds | 0.9s | 0 | **37** |
| **03** | `dynamic_data_validation.py` | Dynamic Print Report & Currency Re-Rendering | 0.6s | 0 | **17** |
| **04** | `m3_readiness_comprehensive_test.py` | Headless Chrome DOM: 25-Question Readiness Scoring | 1.8s | 0 | **92** |
| **05** | `run_chrome_tests.py` | Headless Chrome DOM: Custom Vendor Pricing Modal | 1.9s | 0 | **93** |
| **06** | `master_e2e_release_test.py` | Headless Chrome DOM: Complete 15-Step User Journey | 2.1s | 0 | **88** |
| **07** | `generate_and_audit_detailed_pdf.py` | jsPDF Binary Audit: 10-Page Business Case Document | 1.2s | 0 | **35** |
| **08** | `treasury_ar_reconciliation_test.py` | Treasury & AR Mathematical Parity & PDF Export Audit | 1.4s | 0 | **78** |
| **09** | `security_scanner.py` | Static Security & Secret Analysis (39 files scanned) | 0.4s | 0 | **1** |
| **10** | `business_analyst_qa_test.py` | BA Review, Currency Formatting & M4 TCO Modeling | 1.1s | 0 | **87** |
| **11** | `financial_governance_validation_test.py` | Financial Governance, AR Overlap & Cash ROI Audit | 0.7s | 0 | **30** |
| **12** | `global_currency_conversion_test.py` | Global Currency Conversion (7 currencies, 10 rules) | 1.3s | 0 | **134** |
| **13** | `production_readiness_comprehensive_test.py` | Deployment Caching, Persistence & 12 Templates | 0.9s | 0 | **39** |
| **TOTAL** | **13 Test Suites Executed** | **Full Regression Coverage** | **~13s** | **ALL 0** | **771 Passed** |

---

## 3. Dedicated Financial Governance Suite Verification (`Suite 11`)

* **Script:** `test/financial_governance_validation_test.py`
* **Command:** `& "C:\Users\malpu\AppData\Local\Programs\Python\Python313\python.exe" test/financial_governance_validation_test.py`
* **Exit Code:** **`0`** | **Assertions Passed:** **30 / 30**

### Key Assertions Verified:
1. `[PASS] Scenario C Overlap is INR 20,250 (450 hrs @ INR 45/hr; got 20250)`
2. `[PASS] AR Frontline Gross Economic Benefit is INR 144,144 (got 144144.0)`
3. `[PASS] AR Frontline Net Recurring Benefit is INR 130,744 (got 130744.0)`
4. `[PASS] AR Frontline Annual Economic ROI is 327% (got 327%)`
5. `[PASS] AR Frontline First-Year Net ROI is 227% (got 227%)`
6. `[PASS] AR Frontline Productivity Breakeven is 3.7 mo (got 3.7 mo)`
7. `[PASS] AR Separate Specialists Gross Benefit is INR 164,394 (got 164394.0)`
8. `[PASS] AR Separate Specialists Net Recurring is INR 150,994 (got 150994.0)`
9. `[PASS] AR Separate Specialists Economic ROI is 377% (got 377%)`
10. `[PASS] AP Direct Cash Savings is $94,272 (got 94272.0)`
11. `[PASS] AP Net Recurring Direct Cash is $80,872 (got 80872.0)`
12. `[PASS] AP Realized Cash Payback is 5.9 mo (got 5.9 mo)`
13. `[PASS] AP Realized Cash ROI is 77% (got 77%)`
14. `[PASS] Cash Payback displays N/A when direct cash savings are 0`
15. `[PASS] Zero Capex produces 0% ROI and 0.0 mo Breakeven without exception`
16. `[PASS] Negative Net Benefit produces 'Not Achievable' instead of negative payback`

---

## 4. Multi-Currency Zero-Drift Regression (`Suite 12`)

* **Script:** `test/global_currency_conversion_test.py`
* **Command:** `& "C:\Users\malpu\AppData\Local\Programs\Python\Python313\python.exe" test/global_currency_conversion_test.py`
* **Exit Code:** **`0`** | **Assertions Passed:** **134 / 134**

### 7-Currency Roundtrip Cycle Results:
* **USD ($ Base):** Labor = $617,652 | Cash Savings = $94,272 | ROI = 1,160% | Breakeven = 1.0 mo
* **EUR (€ Rate 0.92):** Labor = €568,240 | Cash Savings = €86,730.24 | ROI = 1,160% | Breakeven = 1.0 mo
* **GBP (£ Rate 0.79):** Labor = £487,945 | Cash Savings = £74,474.88 | ROI = 1,160% | Breakeven = 1.0 mo
* **CAD (CA$ Rate 1.36):** Labor = CA$840,007 | Cash Savings = CA$128,209.92 | ROI = 1,160% | Breakeven = 1.0 mo
* **AUD (A$ Rate 1.52):** Labor = A$938,831 | Cash Savings = A$143,293.44 | ROI = 1,160% | Breakeven = 1.0 mo
* **INR (₹ Rate 84.00):** Labor = ₹51,882,768 | Cash Savings = ₹7,918,848.00 | ROI = 1,160% | Breakeven = 1.0 mo
* **JPY (¥ Rate 152.0):** Labor = ¥93,883,104 | Cash Savings = ¥14,329,344.00 | ROI = 1,160% | Breakeven = 1.0 mo
* **Return to USD ($):** Labor = $617,652 | Cash Savings = $94,272 | **Drift: 0.0000%**.

---

## 5. Three-Way UI / PDF / CSV Parity Audit

The automated testing pipeline audited three presentation channels using headless Chrome and jsPDF binary inspectors:
* **UI Executive Dashboard vs. Executive PDF:** 0.00% variance across all monetary, ratio, and percentage outputs.
* **UI Executive Dashboard vs. Audit CSV:** 0.00% variance. CSV outputs RFC 4180-compliant records with proper UTF-8 BOM encoding for foreign currency symbols.
* **Executive PDF Visual Inspection:**
  - Zero overlapping text.
  - Page count strictly 10 pages for full business case decks.
  - Page breaks avoid splitting table rows.
  - Page 10 includes formal disclaimer blocks (Reference FX attribution, cash vs. capacity distinction, staffing model disclosure).

---

## 6. Test Conclusion & Quality Gate Sign-Off

The regression testing battery confirms that ProcessIQ Version 1.0 executes deterministically, handles edge cases gracefully, prevents division by zero, and maintains 100% mathematical parity across all 12 templates, 7 currencies, and 3 output formats.
