# ProcessIQ — Master Financial Calculation Standard & Data Model

**Document ID:** PIQ-STD-FIN-001  
**Version:** 1.0.0 (Enterprise Financial Standard)  
**Effective Date:** November 18, 2026  
**Governing Body:** Multidisciplinary Senior Product Engineering Team (Financial Systems Architecture, Finance Transformation, Data Architecture, Product Management)  
**Product Tagline:** *Know your process cost before you invest in AI.*  

---

## 1. Executive Purpose & Scope

ProcessIQ is a cross-industry diagnostic and financial decision-support platform designed to quantify baseline operational costs, manual labor overhead, direct financial leakage, recoverable employee capacity, and AI/automation transformation returns.

To maintain absolute financial integrity, credibility, and auditability across diverse business processes (Finance, Treasury, Procurement, HR, Supply Chain, and Operations), **identical financial concepts must adhere to identical, non-negotiable financial definitions and calculation rules**.

This document defines the **Master Financial Data Model**, standard calculation formulas, benefit classification boundaries, and double-counting governance rules enforced across all 12 business process templates.

---

## 2. Master Financial Data Model (12 Canonical Categories)

Every monetary input, intermediate derivation, and output metric in ProcessIQ belongs to exactly one of the 12 canonical financial categories:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                       MASTER FINANCIAL DATA CLASSIFICATION                      │
├───────┬───────────────────────────────────┬──────────────┬──────────────────────┤
│ Class │ Category Name                     │ Value Type   │ Economic Nature      │
├───────┼───────────────────────────────────┼──────────────┼──────────────────────┤
│   A   │ Baseline Labor Cost               │ Input/Derived│ Operating Expenditure│
│   B   │ Overtime Cost                     │ Input/Derived│ Operating Expenditure│
│   C   │ Direct Cash Leakage               │ Input/Derived│ Hard Cash Loss       │
│   D   │ Internal Rework Cost              │ Input/Derived│ Operational Waste    │
│   E   │ Other Validated Process Leakage   │ Input/Derived│ Operational Waste    │
│   F   │ Released Labor Capacity           │ Derived      │ Soft / Economic Gain │
│   G   │ Avoided Direct Cash Leakage       │ Derived      │ Hard Cash Saving     │
│   H   │ Avoided Internal Rework           │ Derived      │ Operational Benefit  │
│   I   │ Overlap Deduction                 │ Derived      │ Governance Control   │
│   J   │ Implementation Investment (Capex) │ Input        │ Capital Expenditure  │
│   K   │ Technology Opex (Recurring)       │ Input/Derived│ Operating Expenditure│
│   L   │ Net Recurring Economic Benefit    │ Derived      │ Net Value Generated  │
└───────┴───────────────────────────────────┴──────────────┴──────────────────────┘
```

---

### Detailed Attribute Specification for Master Categories A – L

#### Category A: Baseline Labor Cost
* **Business Meaning:** The regular payroll and fully loaded employment cost dedicated exclusively to executing the assessed business process during standard working hours.
* **Data Type & Unit:** Positive Decimal / Currency per Hour ($/hr, €/hr, ₹/hr).
* **Derivation Basis:**
  $$\text{Annual Process Hours} = \text{FTE} \times \text{Process Hours/Day} \times \text{Working Days/Month} \times 12$$
  $$\text{Annual Baseline Labor Cost} = \text{Annual Process Hours} \times \text{Fully Loaded Hourly Rate}$$
* **Nature:** Cash payroll expenditure (OpEx).
* **Overlap Potential:** Can overlap with internal rework if frontline staff execute exception handling.
* **Validation Rule:** $\text{FTE} \ge 1$; $0 < \text{Process Hours/Day} \le 24$; $1 \le \text{Working Days} \le 31$; $\text{Rate} > 0$.
* **Applicability:** All 12 Process Templates.

#### Category B: Overtime Cost
* **Business Meaning:** Incremental labor compensation paid beyond standard hours to manage volume spikes, backlogs, or month-end close crunches.
* **Data Type & Unit:** Positive Decimal / Monthly Hours $\times$ Currency per Hour.
* **Derivation Basis:**
  $$\text{Annual Overtime Cost} = \text{Monthly Overtime Hours} \times \text{Overtime Rate} \times 12$$
* **Nature:** Cash payroll expenditure (OpEx).
* **Overlap Potential:** Must NOT be added if the user's hourly labor rate already reflects an overtime-blended rate.
* **Validation Rule:** Enabled flag boolean; $\text{Overtime Rate} \ge \text{Baseline Hourly Rate}$.
* **Applicability:** All 12 Templates (configured true/false per process profile).

#### Category C: Direct Cash Leakage
* **Business Meaning:** Out-of-pocket, measurable monetary funds that permanently exit the corporate bank account due to process breakdowns, errors, or missed deadlines.
* **Components:** Unrecovered Duplicate Payments, Regulatory / Contractual Penalties & Fines, Missed Settlement Discounts, Unclaimed Supplier Rebates.
* **Derivation Basis:**
  $$\text{Annual Duplicate Loss} = \text{Monthly Duplicate Count} \times \text{Avg Amount} \times \text{Unrecovered \%} \times 12$$
  $$\text{Annual Missed Discounts} = \text{Monthly Missed Count} \times \text{Avg Discount Value} \times 12$$
  $$\text{Annual Penalties} = \text{Monthly Penalties Amount} \times 12$$
  $$\text{Baseline Direct Cash Leakage} = \sum \text{Component Annual Losses}$$
* **Nature:** **Realized Hard Cash Loss**.
* **Overlap Potential:** Independent of labor payroll; directly impacts working capital and EBITDA.
* **Validation Rule:** All transaction counts $\ge 0$; $0 \le \text{Unrecovered \%} \le 100$.
* **Applicability:** Accounts Payable (primary), Procurement, Treasury, Logistics.

#### Category D: Internal Rework Cost
* **Business Meaning:** Internal productive time spent investigating exceptions, correcting data entry errors, re-keying failed transactions, and chasing missing information.
* **Data Type & Unit:** Monthly Rework Hours $\times$ Hourly Rework Rate $\times 12$.
* **Derivation Basis:**
  $$\text{Annual Rework Cost} = \text{Monthly Rework Hours} \times \text{Rework Hourly Rate} \times 12$$
* **Nature:** Operational labor waste (non-cash sub-pool within operating capacity).
* **Overlap Potential:** **HIGH**. Overlaps directly with Category A (Baseline Labor) when frontline workers perform their own rework.
* **Validation Rule:** Monthly Rework Hours cannot exceed total frontline working hours.
* **Applicability:** All 12 Process Templates.

#### Category E: Other Validated Process Leakage
* **Business Meaning:** Identifiable operational losses that do not involve direct ledger outflows or internal labor rework, such as expedited shipping fees, third-party audit recovery commissions, or system integration patch fees.
* **Data Type & Unit:** Monthly Amount $\times 12$.
* **Nature:** Operational expenditure / vendor fees.
* **Validation Rule:** Must include a qualitative description and documented calculation basis.
* **Applicability:** All templates where secondary losses are identified.

#### Category F: Released Labor Capacity
* **Business Meaning:** Productive work hours liberated by AI or automation, enabling staff redeployment to higher-value analytical, strategic, or revenue-generating activities.
* **Derivation Basis:**
  $$\text{Released Annual Hours} = \text{Annual Process Hours} \times \text{Capacity Release \%}$$
  $$\text{Recoverable Capacity Value} = \text{Total Baseline Labor Cost} \times \text{Capacity Release \%}$$
* **Nature:** **Soft / Economic Value**. NOT an automatic cash saving unless headcounts are reduced or planned hiring is averted.
* **Overlap Potential:** Overlaps with Avoided Rework if rework hours are performed by frontline staff.
* **Validation Rule:** $0\% \le \text{Capacity Release \%} \le 80\%$.
* **Applicability:** All 12 Process Templates.

#### Category G: Avoided Direct Cash Leakage
* **Business Meaning:** The proportion of Category C (Direct Cash Leakage) permanently eliminated through automated controls, 3-way matching, and preventative AI gates.
* **Derivation Basis:**
  $$\text{Avoided Direct Cash Leakage} = \text{Baseline Direct Cash Leakage} \times \text{Cash Leakage Reduction \%}$$
* **Nature:** **Realized Hard Cash Savings** (flows directly to cash flow statement).
* **Overlap Potential:** Zero overlap with labor capacity.
* **Validation Rule:** Standard Scenario B reduction = 50%; Scenario C reduction = 80%.
* **Applicability:** Templates with measurable direct cash leakage (e.g. AP).

#### Category H: Avoided Internal Rework
* **Business Meaning:** Internal rework hours eliminated by straight-through data extraction, automated validation, and exception auto-resolution.
* **Derivation Basis:**
  $$\text{Avoided Rework Hours} = \text{Annual Rework Hours} \times \text{Rework Reduction \%}$$
  $$\text{Avoided Rework Value} = \text{Avoided Rework Hours} \times \text{Rework Hourly Rate}$$
* **Nature:** Operational labor time recovery.
* **Overlap Potential:** **CRITICAL**. Must pass the Universal Double-Counting Governance Gate before inclusion in Gross Economic Benefit.
* **Validation Rule:** Scenario B reduction = 50%; Scenario C reduction = 75%.
* **Applicability:** All 12 Process Templates.

#### Category I: Overlap Deduction
* **Business Meaning:** The mathematical adjustment applied to eliminate double-counting when avoided rework hours are already funded by frontline payroll and liberated as part of frontline capacity.
* **Derivation Basis:**
  $$\text{Overlapping Hours} = \min(\text{Avoided Rework Hours}, \text{Released Capacity Hours})$$
  $$\text{Overlap Deduction} = \text{Overlapping Hours} \times \text{Rework Hourly Rate}$$
* **Nature:** Governance contra-benefit adjustment.
* **Applicability:** Mandatory default for all processes where staffing is frontline or unconfirmed.

#### Category J: Implementation Investment (Capex)
* **Business Meaning:** Total one-time capital outlay required to deploy, integrate, customize, and roll out the technology solution.
* **Derivation Basis:**
  $$\text{Capex} = \text{One-Time Implementation Cost} + \text{One-Time Integration Cost} + \text{Other One-Time Investment}$$
* **Nature:** Period 0 Capital Investment.
* **Validation Rule:** $\text{Capex} \ge 0$. If $\text{Capex} = 0$, ROI and Payback formulas display safe fallback values (0% ROI, 0 mo payback) to prevent division by zero.
* **Applicability:** All scenarios.

#### Category K: Recurring Technology Operating Cost (Opex)
* **Business Meaning:** Ongoing annual software subscriptions, compute token consumption, hosting fees, and vendor maintenance agreements.
* **Derivation Basis:**
  $$\text{Annual Technology Opex} = \text{Annual Subscription} + \text{Annual Usage/Tokens} + \text{Annual Support \& Maintenance}$$
  *For seat-based licensing:* $\text{Annual Subscription} = \text{Active Users} \times \text{Monthly License Rate} \times 12$.
* **Nature:** Ongoing operational cash expense.
* **Applicability:** All scenarios.

#### Category L: Net Recurring Economic Benefit
* **Business Meaning:** The net recurring annual financial value generated after deducting annual technology operating costs from gross economic benefits.
* **Derivation Basis:**
  $$\text{Gross Annual Economic Benefit} = \text{Capacity Value} + \text{Avoided Cash Leakage} + \text{Avoided Rework} + \text{Other Avoided} - \text{Overlap Deduction}$$
  $$\text{Net Recurring Economic Benefit} = \text{Gross Annual Economic Benefit} - \text{Annual Technology Opex}$$
* **Nature:** Comprehensive net transformation value.
* **Applicability:** All scenarios.

---

## 3. Standard ROI and Payback Definitions

ProcessIQ enforces a strict, mathematical separation between **Cash Returns** and **Economic Value Returns**:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      RETURN ON INVESTMENT (ROI) TAXONOMY                        │
├──────────────────────────┬─────────────────────────────────────┬────────────────┤
│ Metric Name              │ Mathematical Formula                │ Classification │
├──────────────────────────┼─────────────────────────────────────┼────────────────┤
│ Recurring Economic ROI   │ (Net Recurring Economic Benefit /   │ Economic Value │
│                          │  Capex) × 100                       │                │
├──────────────────────────┼─────────────────────────────────────┼────────────────┤
│ First-Year Net ROI       │ ((Net Recurring Economic Benefit -  │ Economic Value │
│                          │  Capex) / Capex) × 100              │                │
├──────────────────────────┼─────────────────────────────────────┼────────────────┤
│ First-Year Cash ROI      │ ((Annual Direct Cash Savings -      │ Realized Cash  │
│                          │  Annual Tech Opex - Capex) /        │                │
│                          │  (Annual Tech Opex + Capex)) × 100  │                │
├──────────────────────────┼─────────────────────────────────────┼────────────────┤
│ Productivity Breakeven   │ Capex / (Net Recurring Benefit / 12)│ Economic Value │
├──────────────────────────┼─────────────────────────────────────┼────────────────┤
│ Realized Cash Payback    │ Capex / ((Direct Cash Savings -     │ Realized Cash  │
│                          │          Annual Tech Opex) / 12)    │                │
└──────────────────────────┴─────────────────────────────────────┴────────────────┘
```

### Critical Rules of Financial Governance:
1. **Rule of Cash Segregation:** Capacity Value (Category F) must NEVER be included in Cash ROI or Cash Payback calculations.
2. **Rule of Non-Cash Disclosure:** If a process exhibits zero direct cash leakage (e.g. Accounts Receivable or Treasury with only operational errors), Cash ROI and Cash Payback must be displayed explicitly as **`N/A – Non-Cash Operational Optimization`**. They must never be displayed as 0% or 0 months.
3. **Rule of Division-by-Zero Safety:** If Capex is $0, Economic ROI evaluates to 0% and Payback evaluates to 0.0 months.
4. **Rule of Negative Benefit Handling:** If Technology Opex exceeds Gross Savings, Payback displays **`Not Achievable (Operating cost exceeds savings)`**.

---

## 4. Multi-Currency Governance & Canonical Base Architecture

1. **Single Source of Truth (Canonical USD Base):** All monetary inputs and benchmarks are stored in a canonical base object evaluated in USD (`ProcessIQ.canonicalBase`).
2. **Conversion Formula:**
   $$\text{Display Monetary Value} = \text{round}_2(\text{Canonical Base Value} \times \text{Reference FX Rate})$$
3. **Reverse Canonicalization on User Edit:**
   $$\text{Updated Canonical Base} = \frac{\text{User Entered Value}}{\text{Active Currency Rate}}$$
4. **Zero-Drift Invariant Rule:** Switching between any sequence of currencies (e.g. USD → EUR → GBP → CAD → AUD → INR → JPY → USD) must yield **0.0000% conversion drift**.
5. **Non-Monetary Invariant Rule:** Employee counts (FTEs), hours per day, working days, defect volumes, error rates, and readiness scores are non-monetary quantities and must NEVER be scaled by exchange rates.

---

## 5. Vendor Comparison & TCO Horizon Standard

When comparing vendor architectures (Microsoft Copilot, Copilot Studio, Claude Enterprise, Custom LLM Stack):
* **Evaluation Duration:** Standardized at 3 years (`contractDurationYears = 3`).
* **Total Cost of Ownership (TCO):**
  $$\text{TCO} = \text{Capex} + (\text{Annual Opex} \times \text{Years})$$
* **Cumulative Net Value:**
  $$\text{Net Economic Value} = (\text{Net Annual Economic Benefit} \times \text{Years}) - \text{Capex}$$
* **Pricing Transparency:** Stated vendor prices must be classified as *Verified Public Pricing*, *Estimated Enterprise Benchmark*, or *Quote-Based Contract*.
