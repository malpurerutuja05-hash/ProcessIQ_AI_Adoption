# ProcessIQ — Universal Double-Counting Governance & Anti-Overlap Audit

**Document ID:** PIQ-GOV-OVR-001  
**Version:** 1.0.0 (Anti-Double-Counting Governance Standard)  
**Effective Date:** November 18, 2026  
**Auditor Body:** Finance Transformation Controller, Senior Financial Systems Architect, Data & Calculation Architect  
**Scope:** Universal anti-double-counting governance mechanism across labor capacity, internal rework, overtime, and direct cash leakage.

---

## 1. The Financial Double-Counting Hazard in AI Business Cases

A primary reason CFOs and Investment Committees reject business cases for AI and automation is **uncontrolled benefit double-counting**. When transformation teams calculate projected savings in operational silos, they frequently commit three classic financial fallacies:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      THE THREE DOUBLE-COUNTING FALLACIES                        │
├─────────────────────────┬───────────────────────────────────────────────────────┤
│ Fallacy 1:              │ Claiming both full frontline employee capacity        │
│ The Capacity-Rework Trap│ liberated AND avoided internal rework hours, when the │
│                         │ same employees perform both tasks on standard payroll.│
├─────────────────────────┼───────────────────────────────────────────────────────┤
│ Fallacy 2:              │ Counting recoverable capacity hours as immediate cash │
│ The Phantom Cash Trap   │ savings without an accompanying payroll reduction or  │
│                         │ hiring freeze.                                        │
├─────────────────────────┼───────────────────────────────────────────────────────┤
│ Fallacy 3:              │ Claiming contractual delay penalties as leakage while │
│ The Consequential Trap  │ also claiming transaction queue delay costs caused    │
│                         │ by the exact same bottleneck.                         │
└─────────────────────────┴───────────────────────────────────────────────────────┘
```

ProcessIQ solves this through a **Universal Double-Counting Governance Mechanism** built directly into the calculation consolidator (`runConsolidatedCalculations()` in `app.js`).

---

## 2. Universal Double-Counting 8-Step Verification Protocol

For every evaluated business process and transformation benefit, ProcessIQ executes an 8-step verification gate:

```
Step 1: Cost Pool Identification
   └─ Identify the original ledger cost pool (Frontline Payroll, Contractor Spend, Bank Fees).

Step 2: Resource Allocation Trace
   └─ Determine which specific employees or resources execute the task.

Step 3: Baseline Payroll Inclusion Check
   └─ Establish whether the resource's hours are already funded in Category A (Baseline Labor).

Step 4: Liberated Capacity Overlap Check
   └─ Check whether Category F (Capacity Release) already frees the hours dedicated to this task.

Step 5: Intra-Leakage Category Segregation
   └─ Verify that the same transaction defect is not counted under both Entry Errors and Penalties.

Step 6: Overtime Boundary Check
   └─ Verify that overtime is not counted if the baseline hourly rate is already an all-inclusive blended rate.

Step 7: Overlap Deduction Computation
   └─ Quantify the overlapping hours and calculate the contra-benefit adjustment.

Step 8: Advisory Logging & Disclosure
   └─ Log the rationale and display explicit disclaimers in the UI, PDF, and CSV exports.
```

---

## 3. In-Depth Analysis: Accounts Receivable Reference Case

Accounts Receivable serves as the primary benchmark demonstrating the anti-double-counting governance engine.

### 3.1 Baseline Operating Parameters
* **Frontline Headcount:** 8 FTEs dedicated 4.0 hours/day across 22 working days/month.
* **Annual Frontline Hours:** $8 \times 4.0 \times 22 \times 12 = \mathbf{8,448\text{ hours/year}}$.
* **Frontline Hourly Labor Rate:** **$40.00/hr** (Fully loaded payroll cost).
* **Baseline Payroll Cost:** $8,448 \times \$40.00 = \mathbf{\$337,920.00/year}$.
* **Internal Rework Hours:** 50 hours/month $\times 12 = \mathbf{600\text{ rework hours/year}}$.
* **Rework Hourly Rate:** **$45.00/hr** (Reflecting supervisory triaging and customer escalation rate).
* **Baseline Internal Rework Cost:** $600 \times \$45.00 = \mathbf{\$27,000.00/year}$.
* **Dispute & Data Entry Leakage:** 7,200 invoices $\times 2.2\% \times \$30.00 \times 12 = \mathbf{\$57,024.00/year}$.

---

### 3.2 The Transformation Impact (Scenario C AI Copilot)
* **Capacity Release Target:** 30.0% of frontline hours $\rightarrow \mathbf{2,534.4\text{ hours liberated}}$.
* **Gross Recoverable Capacity Value:** $2,534.4 \times \$40.00 = \mathbf{\$101,376.00}$.
* **Avoided Internal Rework:** 75.0% of rework hours $\rightarrow \mathbf{450\text{ rework hours eliminated}}$.
* **Gross Avoided Rework Value:** $450 \times \$45.00 = \mathbf{\$20,250.00}$.
* **Avoided Dispute Leakage:** 75.0% of dispute errors $\rightarrow \mathbf{\$42,768.00}$.

---

### 3.3 The Core Overlap Conflict: Rework Rate ($45) vs. Frontline Rate ($40)

If the 8 frontline AR clerks perform their own rework (correcting billing errors, researching disputes, and calling customers):
* Those 450 rework hours are **already included** within the 8,448 annual hours funded by the $337,920 baseline payroll.
* Liberating 30% of their time (2,534.4 hours) **already releases the time spent on rework**.
* Claiming both $101,376 in capacity and $20,250 in rework savings would count the same 450 hours twice.

#### Evaluating Overlap Deduction at Both Hourly Rates:

1. **Option A: Overlap Deducted at the Rework Rate ($45/hr):**
   $$\text{Overlap Deduction} = 450\text{ hours} \times \$45.00\text{/hr} = \mathbf{\$20,250.00}$$
   $$\text{Gross Benefit} = \text{Capacity Value } (\$101,376) + \text{Avoided Leakage } (\$42,768 + \$20,250) - \text{Overlap Deduction } (\$20,250) = \mathbf{\$144,144.00}$$
   * **Controller Rationale:** Completely neutralizes the +$20,250 rework credit ($20,250 - $20,250 = $0 net contribution). Only the frontline payroll capacity of $101,376 is recognized.

2. **Option B: Overlap Deducted at the Frontline Payroll Rate ($40/hr):**
   $$\text{Overlap Deduction} = 450\text{ hours} \times \$40.00\text{/hr} = \mathbf{\$18,000.00}$$
   $$\text{Gross Benefit} = \$101,376 + \$42,768 + \$20,250 - \$18,000 = \mathbf{\$146,394.00}$$
   * **Controller Rationale:** Deducts only the baseline payroll cost of the 450 hours. This leaves a net rate premium of $\$2,250$ in the business case:
     $$(\$45 - \$40) \times 450\text{ hours} = \$2,250.00$$

#### Controller Recommendation & ProcessIQ Implementation:
ProcessIQ enforces **Option A ($20,250)** as the default conservative deduction:
* Unless the company provides audited payroll records proving that rework is performed by senior specialists earning an authentic $5/hr premium, claiming the extra $2,250 weakens credibility.
* Removing the entire $20,250 ensures that **no CFO or external auditor can argue that any portion of the 450 hours is double-counted**.
* The variance is exactly **$2,250** (1.5% of gross savings), confirming that ProcessIQ chooses the most conservative and defensible stance.

---

### 3.4 Dual-Scenario Comparison: Conservative vs. Separate Specialist

| Dimension | Scenario 1: Conservative Unconfirmed Overlap (Default) | Scenario 2: Separate Dedicated Specialist Team |
| :--- | :---: | :---: |
| **Underlying Staffing Model** | Frontline staff perform rework (or staffing unconfirmed) | Explicitly confirmed independent team outside baseline payroll |
| **Frontline Capacity Liberated** | 2,534.4 hours ($101,376) | 2,534.4 hours ($101,376) |
| **Avoided Dispute Leakage** | $42,768 | $42,768 |
| **Avoided Rework Value** | $20,250 | $20,250 |
| **Overlap Contra-Deduction** | **-$20,250** | **$0** |
| **Gross Annual Economic Benefit** | **$144,144.00** | **$164,394.00** |
| **Technology Opex** | $13,400.00 | $13,400.00 |
| **Net Recurring Economic Benefit** | **$130,744.00** | **$150,994.00** |
| **Recurring Economic ROI** | **327%** | **377%** |
| **Productivity Breakeven Horizon** | **3.7 months** | **3.2 months** |
| **UI Banner / Advisory** | Conservative anti-double-counting deduction applied | Additive specialist benefit confirmed |

---

## 4. Cross-Template Anti-Double-Counting Governance Matrix

ProcessIQ applies this governance logic across all 12 templates:

| Template Key | Process Name | Default Staffing Model | Baseline Rework Hours / Rate | Overlap Deduction (Scenario C) | Double-Counting Safeguard Enforced |
| :---: | :--- | :---: | :---: | :---: | :--- |
| `ap` | Accounts Payable | Separate | 75h/mo @ $48/hr ($43,200) | $0 | AP rework modeled as separate invoice escalation desk. Overlap toggle available. |
| `ar` | Accounts Receivable | Frontline | 50h/mo @ $45/hr ($27,000) | **$20,250** | 450 avoided rework hours subtracted from gross savings. |
| `bank_rec` | Bank Reconciliation | Frontline | 35h/mo @ $48/hr ($20,160) | **$15,120** | Clearing lag rework subtracted to prevent double-counting clerk capacity. |
| `gl` | General Ledger Close | Frontline | 40h/mo @ $55/hr ($26,400) | **$19,800** | Month-end roll-forward rework neutralized against accounting capacity. |
| `journal` | Journal Processing | Frontline | 45h/mo @ $50/hr ($27,000) | **$20,250** | Manual re-keying rework deducted from accounting capacity. |
| `treasury` | Treasury Operations | Frontline | 20h/mo @ $65/hr ($15,600) | **$11,700** | Wire discrepancy rework deducted from cash manager capacity. |
| `fin_rep` | Financial Reporting | Frontline | 30h/mo @ $60/hr ($21,600) | **$16,200** | Variance analysis rework neutralized against analyst capacity. |
| `procurement`| Procurement & Purchasing | Frontline | 60h/mo @ $50/hr ($36,000) | **$27,000** | PO discrepancy rework neutralized against buyer capacity. |
| `order_proc` | Order Processing | Frontline | 90h/mo @ $42/hr ($45,360) | **$34,020** | EDI exception handling rework neutralized against order clerk capacity. |
| `cust_service`| Customer Service & Inquiries| Frontline | 110h/mo @ $36/hr ($47,520)| **$35,640** | Ticket re-open triage rework neutralized against agent capacity. |
| `inventory` | Inventory Management | Frontline | 55h/mo @ $40/hr ($26,400) | **$19,800** | Cycle count variance rework neutralized against logistics capacity. |
| `hr_ops` | HR Onboarding & Ops | Frontline | 40h/mo @ $55/hr ($26,400) | **$19,800** | Portal re-keying rework neutralized against HR coordinator capacity. |

---

## 5. Overtime & Direct Cash Safeguards

1. **Overtime Double-Counting Guard:** In `runManualCostCalculations()`, overtime is computed as an incremental add-on (`otHours * otRate * 12`) only when `includeOvertime: true`. The UI tooltip explicitly instructs users: *"Do not enable overtime if your hourly employee cost already reflects an overtime-blended wage."*
2. **Direct Cash vs. Soft Capacity Guard:** In `runConsolidatedCalculations()`, `hardCashSavings` is computed strictly from Category C ledger leakages (duplicate invoices, missed discounts, penalties). `cCashRoi` and `cCashPayback` consume `hardCashSavings` exclusively. Capacity Value (Category F) is strictly quarantined within Economic Value.

---

## 6. Audit Conclusion

The Universal Double-Counting Governance Mechanism provides complete, auditable protection against benefit inflation. By enforcing conservative overlap deductions as the default for all 12 templates, ProcessIQ establishes an unprecedented standard of financial conservatism and institutional defensibility.
