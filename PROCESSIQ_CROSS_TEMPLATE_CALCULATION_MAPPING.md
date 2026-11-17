# ProcessIQ — Cross-Template Calculation Mapping & Data Dictionary

**Document ID:** PIQ-MAP-TPL-001  
**Version:** 1.0.0 (Enterprise Template Standard)  
**Effective Date:** November 18, 2026  
**Auditor Body:** Data & Calculation Architecture, Business Process Transformation, Financial Systems Architecture  
**Scope:** Mapping all 12 industry business process templates to the Master Financial Data Model.

---

## 1. Architectural Principle: Shared Finance Logic vs. Distinct Operational Inputs

Different business processes naturally exhibit distinct operational realities:
* **Accounts Payable** suffers from duplicate supplier invoices, lost early-payment discounts, and contractual late penalties.
* **Accounts Receivable** suffers from customer invoice disputes, remittance allocation errors, and overdue collection follow-ups.
* **Bank Reconciliation** deals with multi-account clearing lag, timing differences, and ERP ledger mismatches.
* **Order Processing** deals with sales order entry mistakes from EDI portals, inventory allocation discrepancies, and shipping delays.

**ProcessIQ Architectural Solution:**
Instead of constructing 12 isolated financial engines with divergent formulas, ProcessIQ establishes a **Unified Financial Calculation Engine**. Template-specific operational parameters (transaction volumes, error rates, defect types, and staffing models) map cleanly into the standard 12 canonical financial categories (Categories A – L).

---

## 2. Complete 12-Template Master Financial Mapping Matrix

The table below summarizes the operational baselines and derived financial metrics across all 12 pre-configured business templates (evaluated at USD Benchmark Rates):

| Template Key | Process Name | Business Domain | Benchmark FTE | Hours/ Day | Annual Process Hours | Hourly Labor Rate | Baseline Annual Labor | Target Capacity % | Recoverable Capacity Value | Annual Internal Rework |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `ap` | Accounts Payable | Finance | 12 | 4.5 | 14,256 | $42.00 | $617,652 | 35.0% | $216,178 | $43,200 (75h @ $48) |
| `ar` | Accounts Receivable | Finance | 8 | 4.0 | 8,448 | $40.00 | $337,920 | 30.0% | $101,376 | $27,000 (50h @ $45) |
| `bank_rec` | Bank Reconciliation | Finance | 4 | 3.5 | 3,696 | $44.00 | $162,624 | 40.0% | $65,050 | $20,160 (35h @ $48) |
| `gl` | General Ledger Close | Accounting | 6 | 5.0 | 7,920 | $52.00 | $439,920 | 30.0% | $131,976 | $26,400 (40h @ $55) |
| `journal` | Journal Processing | Accounting | 5 | 4.0 | 5,280 | $45.00 | $237,600 | 35.0% | $83,160 | $27,000 (45h @ $50) |
| `treasury` | Treasury Operations | Treasury | 3 | 4.0 | 3,168 | $58.00 | $183,744 | 25.0% | $45,936 | $15,600 (20h @ $65) |
| `fin_rep` | Financial Reporting | FP&A | 5 | 4.5 | 5,940 | $55.00 | $346,500 | 35.0% | $121,275 | $21,600 (30h @ $60) |
| `procurement`| Procurement & Purchasing | Operations | 9 | 4.5 | 10,692 | $46.00 | $504,252 | 30.0% | $151,276 | $36,000 (60h @ $50) |
| `order_proc` | Order Processing | Operations | 14 | 5.0 | 18,480 | $38.00 | $726,180 | 40.0% | $290,472 | $45,360 (90h @ $42) |
| `cust_service`| Customer Service & Inquiries| Support | 16 | 5.5 | 23,232 | $32.00 | $766,464 | 45.0% | $344,909 | $47,520 (110h @ $36) |
| `inventory` | Inventory Management | Logistics | 7 | 4.0 | 7,392 | $36.00 | $266,112 | 30.0% | $79,834 | $26,400 (55h @ $40) |
| `hr_ops` | HR Onboarding & Ops | People | 5 | 3.5 | 4,620 | $42.00 | $194,040 | 35.0% | $67,914 | $26,400 (40h @ $55) |

---

## 3. Template-Specific Operational Mapping to Canonical Categories

### 3.1 Template 1: Accounts Payable (`ap`)
* **Department:** Finance & Shared Services | **Category:** Finance
* **Operational Scope:** Processing supplier invoices, 3-way matching, exception triaging, payment scheduling.
* **Leakage Categories:**
  - *Transaction Errors:* 8,500 volume $\times 2.8\% \times \$35.00 = \$99,960\text{/yr}$.
  - *Internal Rework:* 75 hrs/mo $\times \$48.00\text{/hr} \times 12 = \$43,200\text{/yr}$ (Separate team).
  - *Transaction Delays:* 120 delays/mo $\times \$45.00 \times 12 = \$64,800\text{/yr}$.
  - *Missed Discounts (Cash):* 15 missed/mo $\times \$380.00 \times 12 = \$68,400\text{/yr}$.
  - *Duplicate Payments (Cash):* 4 dupes/mo $\times \$1,450 \times 40\% \times 12 = \$27,840\text{/yr}$.
  - *Penalties (Cash):* $\$1,800\text{/mo} \times 12 = \$21,600\text{/yr}$.
  - *Other Losses:* $\$1,200\text{/mo} \times 12 = \$14,400\text{/yr}$.
* **Total Baseline Leakage:** $\$340,200\text{/yr}$ (of which **$117,840** is Direct Cash Leakage).
* **Scenario C Results (15 seats Copilot):**
  - Gross Economic Benefit: **$477,220** | Net Recurring: **$463,820**
  - Direct Cash Savings: **$94,272** (80% of $117,840)
  - Realized Cash ROI: **77% (76.54%)** | Cash Payback: **5.9 months**
  - Recurring Economic ROI: **1,160%** | Productivity Breakeven: **1.0 months**

---

### 3.2 Template 2: Accounts Receivable (`ar`)
* **Department:** Finance & Accounting | **Category:** Finance
* **Operational Scope:** Customer billing, cash application, dispute handling, collections.
* **Leakage Categories:**
  - *Dispute Errors:* 7,200 invoices $\times 2.2\% \times \$30.00 \times 12 = \$57,024\text{/yr}$.
  - *Internal Rework:* 50 hrs/mo $\times \$45.00\text{/hr} \times 12 = \$27,000\text{/yr}$ (Frontline staff).
  - *Direct Cash Leakage:* **$0** (Invoices represent claims; leakage is operational labor waste).
* **Double-Counting Overlap Control:**
  - Avoided Rework: 450 hrs @ $45 = $20,250.
  - Frontline Capacity Liberated: 2,534.4 hrs @ $40 = $101,376.
  - **Overlap Deduction:** **$20,250** (Deducted because frontline staff do their own rework).
* **Scenario C Results (Conservative Overlap):**
  - Gross Economic Benefit: $\$101,376 + \$42,768 = \mathbf{\$144,144}$
  - Net Recurring: **$130,744** | Recurring Economic ROI: **327%** | Breakeven: **3.7 months**
  - Cash ROI / Cash Payback: **`N/A – Non-Cash Operational Optimization`**

---

### 3.3 Template 3: Bank Reconciliation (`bank_rec`)
* **Department:** Treasury & Accounting | **Category:** Finance
* **Operational Scope:** Matching multi-account bank feeds against ERP general ledger entries.
* **Leakage Categories:**
  - *Matching Exceptions:* 4,500 transactions $\times 1.5\% \times \$40.00 \times 12 = \$32,400\text{/yr}$.
  - *Internal Rework:* 35 hrs/mo $\times \$48.00 \times 12 = \$20,160\text{/yr}$ (Frontline staff).
  - *Direct Cash Leakage:* **$0**.
* **Double-Counting Control:** Frontline rework overlap deducted (26.25 avoided rework hrs $\times \$48 = \$15,120$).
* **Scenario C Economic Benefit:** Gross = **$89,350** | Net Recurring = **$75,950** | Economic ROI = **190%**.

---

### 3.4 Template 4: General Ledger Closing (`gl`)
* **Department:** Financial Accounting & Control | **Category:** Accounting
* **Operational Scope:** Month-end balance reconciliations, roll-forwards, closing checklist sign-offs.
* **Leakage Categories:**
  - *Entry Exceptions:* 2,800 entries $\times 1.8\% \times \$65.00 \times 12 = \$39,312\text{/yr}$.
  - *Internal Rework:* 40 hrs/mo $\times \$55.00 \times 12 = \$26,400\text{/yr}$.
* **Scenario C Economic Benefit:** Gross = **$161,460** | Net Recurring = **$148,060** | Economic ROI = **370%**.

---

### 3.5 Template 5: Journal Processing (`journal`)
* **Department:** Accounting Operations | **Category:** Accounting
* **Operational Scope:** Manual journal entry intake, supporting document validation, approval routing.
* **Leakage Categories:**
  - *Coding Errors:* 3,400 entries $\times 2.0\% \times \$45.00 \times 12 = \$36,720\text{/yr}$.
  - *Internal Rework:* 45 hrs/mo $\times \$50.00 \times 12 = \$27,000\text{/yr}$.
* **Scenario C Economic Benefit:** Gross = **$110,700** | Net Recurring = **$97,300** | Economic ROI = **243%**.

---

### 3.6 Template 6: Treasury Operations (`treasury`)
* **Department:** Corporate Treasury | **Category:** Treasury
* **Operational Scope:** Cash pooling, liquidity positioning, FX settlements, wire release.
* **Leakage Categories:**
  - *Execution Errors:* 1,200 wires/transfers $\times 0.8\% \times \$120.00 \times 12 = \$13,824\text{/yr}$.
  - *Internal Rework:* 20 hrs/mo $\times \$65.00 \times 12 = \$15,600\text{/yr}$.
* **Double-Counting Control:** Frontline overlap deducted ($11,700 avoided rework neutralized).
* **Scenario C Economic Benefit:** Gross = **$56,304** | Net Recurring = **$42,904** | Economic ROI = **107%**.

---

### 3.7 Template 7: Financial Reporting (`fin_rep`)
* **Department:** Financial Planning & Analysis (FP&A) | **Category:** Accounting
* **Operational Scope:** Board packs, management variance commentaries, KPI consolidation.
* **Leakage Categories:**
  - *Data Errors:* 950 report decks $\times 1.2\% \times \$80.00 \times 12 = \$10,944\text{/yr}$.
  - *Internal Rework:* 30 hrs/mo $\times \$60.00 \times 12 = \$21,600\text{/yr}$.
* **Scenario C Economic Benefit:** Gross = **$129,483** | Net Recurring = **$116,083** | Economic ROI = **290%**.

---

### 3.8 Template 8: Procurement & Purchasing (`procurement`)
* **Department:** Supply Chain & Sourcing | **Category:** Operations
* **Operational Scope:** Purchase requisitions, RFQ quote collation, catalog price checks, PO dispatch.
* **Leakage Categories:**
  - *PO Discrepancies:* 5,500 POs $\times 2.5\% \times \$50.00 \times 12 = \$82,500\text{/yr}$.
  - *Internal Rework:* 60 hrs/mo $\times \$50.00 \times 12 = \$36,000\text{/yr}$.
* **Scenario C Economic Benefit:** Gross = **$213,151** | Net Recurring = **$199,751** | Economic ROI = **499%**.

---

### 3.9 Template 9: Order Processing (`order_proc`)
* **Department:** Order Management & Fulfillment | **Category:** Operations
* **Operational Scope:** Sales order entry, EDI exception handling, stock reservation, dispatch tracking.
* **Leakage Categories:**
  - *Order Entry Errors:* 14,000 orders $\times 3.0\% \times \$40.00 \times 12 = \$201,600\text{/yr}$.
  - *Internal Rework:* 90 hrs/mo $\times \$42.00 \times 12 = \$45,360\text{/yr}$.
* **Scenario C Economic Benefit:** Gross = **$441,672** | Net Recurring = **$428,272** | Economic ROI = **1,071%**.

---

### 3.10 Template 10: Customer Service & Inquiries (`cust_service`)
* **Department:** Customer Support | **Category:** Operations / Support
* **Operational Scope:** Inbound customer tickets, tier-1 inquiries, warranty claim triage.
* **Leakage Categories:**
  - *Ticket Re-opens:* 22,000 tickets $\times 3.5\% \times \$25.00 \times 12 = \$231,000\text{/yr}$.
  - *Internal Rework:* 110 hrs/mo $\times \$36.00 \times 12 = \$47,520\text{/yr}$.
* **Scenario C Economic Benefit:** Gross = **$518,159** | Net Recurring = **$504,759** | Economic ROI = **1,262%**.

---

### 3.11 Template 11: Inventory Management (`inventory`)
* **Department:** Warehouse Operations & Logistics | **Category:** Operations
* **Operational Scope:** Cycle counts, physical inventory reconciliations, scrap write-offs, transfers.
* **Leakage Categories:**
  - *Count Variances:* 8,500 line items $\times 2.2\% \times \$45.00 \times 12 = \$100,980\text{/yr}$.
  - *Internal Rework:* 55 hrs/mo $\times \$40.00 \times 12 = \$26,400\text{/yr}$.
* **Scenario C Economic Benefit:** Gross = **$155,569** | Net Recurring = **$142,169** | Economic ROI = **355%**.

---

### 3.12 Template 12: HR Onboarding & Operations (`hr_ops`)
* **Department:** People & Culture | **Category:** HR
* **Operational Scope:** New hire document verification, portal re-keying, background check coordination.
* **Leakage Categories:**
  - *Onboarding Errors:* 1,400 onboarding packets $\times 1.5\% \times \$55.00 \times 12 = \$13,860\text{/yr}$.
  - *Internal Rework:* 40 hrs/mo $\times \$55.00 \times 12 = \$26,400\text{/yr}$.
* **Scenario C Economic Benefit:** Gross = **$78,309** | Net Recurring = **$64,909** | Economic ROI = **162%**.

---

## 4. Summary & Verification Conclusion

All 12 process templates map directly and losslessly into the Master Financial Data Model. Operational differences across business domains are strictly confined to baseline inputs and defect classifications, while all financial consolidations (Labor, Leakage, Overlap, Capex, Opex, ROI, Payback) execute via the shared master engine.
