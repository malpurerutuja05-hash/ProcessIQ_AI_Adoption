# ProcessIQ Mathematical & Calculation Methodology

This document specifies the exact mathematical formulas, assumption boundaries, anti-double counting safeguards, and scoring matrices implemented in ProcessIQ.

---

## 1. Module 1: Hidden Cost of Manual Work

### 1.1 Core Labor Calculations
Let:
- $E$ = Number of employees (FTEs) dedicated to the workflow ($E \ge 0$)
- $H$ = Average hours spent per employee per day ($0 \le H \le 24$)
- $D$ = Working days per month ($1 \le D \le 31$, default = 22)
- $C_{\text{hourly}}$ = Fully-loaded hourly cost per employee ($C_{\text{hourly}} \ge 0$)
- $H_{\text{ot}}$ = Monthly overtime hours ($H_{\text{ot}} \ge 0$)
- $C_{\text{ot}}$ = Overtime hourly rate ($C_{\text{ot}} \ge 0$)
- $S_{\%}$ = Annual salary escalation assumption ($S_{\%} \ge 0$, default = 4.0%)
- $R_{\%}$ = Estimated recoverable capacity percentage ($0\% \le R_{\%} \le 100\%$)

$$\text{Monthly Labor Hours} = E \times H \times D$$
$$\text{Annual Labor Hours} = \text{Monthly Labor Hours} \times 12$$

$$\text{Base Monthly Labor Cost} = \text{Monthly Labor Hours} \times C_{\text{hourly}}$$
$$\text{Monthly Overtime Cost} = H_{\text{ot}} \times C_{\text{ot}}$$
$$\text{Total Monthly Labor Cost} = \text{Base Monthly Labor Cost} + \text{Monthly Overtime Cost}$$

$$\text{Base Annual Labor Cost} = \text{Base Monthly Labor Cost} \times 12$$
$$\text{Total Annual Labor Cost (Year 1)} = \text{Total Monthly Labor Cost} \times 12$$

### 1.2 Multi-Year Escalation Projections
$$\text{Projected Year 2 Labor Cost} = \text{Total Annual Labor Cost} \times \left(1 + \frac{S_{\%}}{100}\right)$$
$$\text{Projected Year 3 Labor Cost} = \text{Projected Year 2 Labor Cost} \times \left(1 + \frac{S_{\%}}{100}\right)$$

### 1.3 Recoverable Capacity Valuation
$$\text{Recoverable Monthly Hours} = \text{Monthly Labor Hours} \times \left(\frac{R_{\%}}{100}\right)$$
$$\text{Recoverable Annual Hours} = \text{Annual Labor Hours} \times \left(\frac{R_{\%}}{100}\right)$$
$$\text{Recoverable Monthly Value} = \text{Total Monthly Labor Cost} \times \left(\frac{R_{\%}}{100}\right)$$
$$\text{Recoverable Annual Value} = \text{Total Annual Labor Cost} \times \left(\frac{R_{\%}}{100}\right)$$

> **CRITICAL METHODOLOGY GOVERNANCE:**  
> Recoverable capacity represents reclaimed productive hours. ProcessIQ strictly segregates capacity value from guaranteed cash savings. Recovered employee time only converts to cash payroll reduction if headcount is decommissioned or overtime is eliminated; otherwise, it constitutes operational throughput expansion and customer service reinvestment.

---

## 2. Module 2: Process Cost Leakage Assessment

### 2.1 Category Loss Formulas
Process cost leakage is modeled across 7 discrete operational failure modes:

1. **Transaction & Data Entry Errors:**
   $$L_{\text{errors}} = V_{\text{monthly}} \times \left(\frac{\text{ErrorRate}_{\%}}{100}\right) \times C_{\text{error}}$$
   where $V_{\text{monthly}}$ = monthly transaction volume, $C_{\text{error}}$ = external/direct cost per error.

2. **Internal Labor Rework & Correction:**
   $$L_{\text{rework}} = H_{\text{rework}} \times C_{\text{rework\_hourly}}$$
   where $H_{\text{rework}}$ = internal hours spent correcting defects, $C_{\text{rework\_hourly}}$ = operator hourly cost.

3. **Transaction Delays & Escalations:**
   $$L_{\text{delays}} = N_{\text{delayed}} \times C_{\text{delay}}$$
   where $N_{\text{delayed}}$ = delayed volume, $C_{\text{delay}}$ = customer concession, expedited shipping, or processing surcharge per delay.

4. **Missed Early Settlement / Volume Discounts:**
   $$L_{\text{discounts}} = N_{\text{missed}} \times V_{\text{discount}}$$
   where $N_{\text{missed}}$ = count of missed supplier discount windows, $V_{\text{discount}}$ = average forfeited discount amount.

5. **Duplicate Payments & Transactions:**
   $$L_{\text{duplicate}} = N_{\text{duplicate}} \times V_{\text{duplicate}} \times \left(\frac{\text{Unrecovered}_{\%}}{100}\right)$$
   where $N_{\text{duplicate}}$ = count of duplicate invoices posted, $V_{\text{duplicate}}$ = average amount, $\text{Unrecovered}_{\%}$ = unrecoverable loss percentage.

6. **Regulatory Non-Compliance & SLA Penalties:**
   $$L_{\text{penalties}} = \text{Monthly Penalty Amount}$$

7. **Other Ad-Hoc Process Losses:**
   $$L_{\text{other}} = \text{Monthly Ad-Hoc Operational Losses}$$

### 2.2 Aggregation & Contribution
$$\text{Total Monthly Leakage} = \sum_{i=1}^{7} L_i$$
$$\text{Total Annual Leakage} = \text{Total Monthly Leakage} \times 12$$
$$\text{Category Contribution (\%)} = \left(\frac{L_i}{\text{Total Monthly Leakage}}\right) \times 100$$

### 2.3 Anti-Double Counting Safeguards
- **Overlap 1 (Errors vs Rework):** When both Transaction Errors ($L_{\text{errors}}$) and Rework Hours ($L_{\text{rework}}$) are active, ProcessIQ flags a double-counting warning if $C_{\text{error}}$ already includes internal operator time.
- **Overlap 2 (Delays vs SLA Penalties):** When both Delays ($L_{\text{delays}}$) and Penalties ($L_{\text{penalties}}$) are active, ProcessIQ flags that contractual damages may be redundant with delay costs.

---

## 3. Module 3: AI Readiness Diagnostic Scoring

### 3.1 Scoring Algorithm
Every question is evaluated on an objective 5-tier maturity scale:
- Score 0: Critical Gap / Ad-hoc practice (0%)
- Score 1: Inconsistent / Fragile baseline (25%)
- Score 2: Documented / Acceptable standard (50%)
- Score 3: High maturity / Enforced digital controls (75%)
- Score 4: World-class / Governed master data & automation (100%)

For a selected assessment tier ($N \in \{10, 15, 25\}$):
$$\text{Total Max Score} = N \times 4$$
$$\text{Total Earned Score} = \sum_{j=1}^{N} \text{AnswerScore}_j$$
$$\text{Overall AI Readiness Score (\%)} = \text{Round}\left(\frac{\text{Total Earned Score}}{\text{Total Max Score}} \times 100\right)$$

### 3.2 Category-Wise Normalization
Questions are mapped to 5 core enterprise dimensions:
- Process Architecture
- Data Assets
- Technology Stack
- Governance & Risk
- Organization & Value

$$\text{Category Score (\%)} = \left(\frac{\sum \text{Earned Points in Category}}{\sum \text{Max Points in Category}}\right) \times 100$$

### 3.3 Classification Bands & Thresholds
- **0–39 (Not Ready):** Significant process debt, lack of standardized inputs, uncurated data. Direct AI adoption blocked.
- **40–59 (Foundation Required):** Core operational intent present, but data access and governance need remediation.
- **60–79 (Automation/AI Candidate):** High repetition, acceptable standardization. Recommended for supervised copilot pilot.
- **80–100 (Strong Readiness):** Enterprise-grade data fabric, active governance, strong sponsorship. Ready for autonomous agents.

---

## 4. Module 4: Enterprise AI Investment Comparator

### 4.1 Cost Categories
1. **Subscription Cost (Year 1):**
   $$\text{Sub}_{\text{annual}} = (\text{BasePlatformFee}_{\text{monthly}} + \text{Users} \times \text{SeatPrice}_{\text{monthly}}) \times 12$$
   *If billed annually:* $\text{Sub}_{\text{annual}} = (\text{BasePlatformFee}_{\text{annual}} + \text{Users} \times \text{SeatPrice}_{\text{annual}})$.

2. **Consumption / Token Usage Cost (Year 1):**
   - *Copilot Studio:* Billed messages in excess of 25,000 pooled capacity @ $0.01/message.
   - *Custom LLM API:* $(\text{InputTokensM} \times P_{\text{input}} + \text{OutputTokensM} \times P_{\text{output}}) \times 12$.
   - *User Custom Usage:* Additional monthly usage or capacity costs enter directly as $\text{Usage}_{\text{monthly}} \times 12$.

3. **One-Time Capex:**
   $$\text{Capex}_{\text{initial}} = \text{ImplementationCost} + \text{IntegrationCost}$$

4. **Annual Operating Cost (Opex):**
   $$\text{Opex}_{\text{annual}} = \text{Sub}_{\text{annual}} + \text{Usage}_{\text{annual}} + \text{AnnualMaintenance}$$

5. **Multi-Year Contract Total:**
   $$\text{TCO}_{\text{contract}} = \text{Capex}_{\text{initial}} + (\text{Opex}_{\text{annual}} \times \text{Years})$$

### 4.2 Editable Subscription Pricing & Dual-Layer Transparency
ProcessIQ implements dual-layer pricing governance:
1. **Official Reference Pricing:** Immutable enterprise benchmark rates from published commercial terms (Microsoft) or representative enterprise sales quotes (Anthropic).
2. **User-Entered Custom Pricing:** Allows users to override subscription price, billing frequency (monthly vs. annually), licensed seats, and additional capacity fees.
- Custom rates are clearly badged as `Custom Price Entered by User`.
- Original reference benchmarks are continuously retained and visible.
- Instant `Reset to Default` restores reference rates.
- Custom pricing flows dynamically into Scenario C Tech Opex, Net Benefits, ROI, Payback, CSV exports, and formal PDF reports.

---

## 5. Consolidated Business Case & Scenarios (A, B, C)

### 5.1 Financial Benefit Categorization (4 Distinct Categories)
ProcessIQ strictly segregates financial returns into 4 distinct categories:

1. **Actual Cash Savings:**
   Direct, verifiable non-labor expense reductions (e.g., eliminated duplicate vendor disbursements, zeroed SLA penalties, captured supplier early-payment discounts).
   $$\text{Actual Cash Savings (Annual)} = \text{Direct Cash Leakage} \times 80\% \quad (\text{Scenario C})$$

2. **Avoided Process Leakage:**
   Operational defect reduction, error triaging elimination, and rework reduction across workflow transactions.
   $$\text{Avoided Leakage (Annual)} = \text{Actual Cash Savings} + \text{Non-Cash Defect Avoidance}$$

3. **Recoverable Employee Capacity Value:**
   Reclaimed staff bandwidth valued at fully-loaded wage rates.
   $$\text{Capacity Value (Annual)} = \text{Recoverable Annual Labor Value}$$
   > **Governance Policy:** Liberated capacity is categorized as productive bandwidth reinvestment. It converts to actual cash savings only if overtime is curtailed, contractor spend terminated, or headcount restructured.

4. **Total Economic Benefit (Gross Annual Operating Savings):**
   Comprehensive gross operational savings:
   $$\text{Gross Annual Operating Savings} = \text{Capacity Value Released} + \text{Avoided Process Leakage}$$

### 5.2 Return on Investment (ROI) & Payback Governance
1. **Recurring Annual ROI (%):**
   $$\text{Recurring Annual ROI} = \left(\frac{\text{Net Annual Recurring Benefit}}{\text{One-Time Capex}}\right) \times 100$$

2. **First-Year Net ROI (%):**
   $$\text{First-Year Net ROI} = \left(\frac{\text{First-Year Net Benefit}}{\text{One-Time Capex}}\right) \times 100$$
   where $\text{First-Year Net Benefit} = \text{Net Annual Recurring Benefit} - \text{One-Time Capex}$.

3. **Payback Period (Months):**
   $$\text{Payback Period} = \frac{\text{One-Time Capex}}{\text{Net Annual Recurring Benefit} / 12}$$
   - **Scenario A (Baseline):** Expressly designated as **`N/A – Baseline Scenario`** (never 0.0 mo).
   - **Scenario B (Automation First):** Recouped in 0.6 months on $15,000 Capex.
   - **Scenario C (Enterprise AI):** Recouped in 1.0 month on $40,000 Capex (with default M365 Copilot).

### 5.3 Comparative Scenarios Definition
- **Scenario A (Current Baseline):** Status-quo manual processing. Run-rate = Labor + Leakage. Gross Savings = $0, Tech Opex = $0, Net Benefit = $0, Capex = $0, Payback = **N/A – Baseline Scenario**, ROI = **N/A – Baseline**.
- **Scenario B (Process Improvement & Automation First):** 20% labor capacity recovered ($123,530), 50% defect leakage reduced ($170,100), $15,000 Capex, $5,000 annual Opex. Gross Savings = $293,630, Net Benefit = $288,630, 1st-Year Net = $273,630, Recurring ROI = 1,924%, First-Year ROI = 1,824%, Payback = 0.6 mo.
- **Scenario C (AI-Enabled Transformation):** Full AI Copilot / Autonomous Agent deployment. Liberates 35% capacity ($216,178), eliminates 80% cash leakage and 75% non-cash leakage ($261,042 avoided leakage). Gross Savings = $477,220, Tech Opex = $13,400 (or custom), Capex = $40,000, Net Benefit = $463,820 (or custom), 1st-Year Net = $423,820, Recurring ROI = 1,160%, First-Year ROI = 1,060%, Payback = 1.0 mo.
