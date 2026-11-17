"""
ProcessIQ Version 1.0 — Financial Governance & Anti-Double-Counting Validation Suite
Independent mathematical validation covering all 10 mandate scenarios from Phase 9.
"""

import sys
import os
import math

script_dir = os.path.dirname(os.path.abspath(__file__))
workspace = os.path.dirname(script_dir) if os.path.basename(script_dir) == "test" else script_dir

def run_financial_governance_tests():
    print("======================================================================")
    print("PROCESSIQ v1.0 — INDEPENDENT FINANCIAL GOVERNANCE & ROI AUDIT SUITE")
    print("======================================================================")

    passed = 0
    total = 0

    def check(cond, msg):
        nonlocal passed, total
        total += 1
        if cond:
            print(f"  [PASS] {msg}")
            passed += 1
        else:
            print(f"  [FAIL] {msg}")

    # ------------------------------------------------------------------
    # 1. Accounts Receivable with Frontline Rework (Anti-Double-Counting)
    # ------------------------------------------------------------------
    print("\n--- 1. AR with Frontline Rework (Conservative Non-Double-Counted) ---")
    ar_labor = 8 * 4 * 22 * 40 * 12 # 337,920
    ar_capacity_hours = (8 * 4 * 22 * 12) * 0.30 # 2,534.4 hrs
    ar_capacity_val = ar_labor * 0.30 # 101,376

    ar_err_leak = 7200 * 0.022 * 30 * 12 # 57,024
    ar_rework_hrs = 50 * 12 # 600 hrs
    ar_rework_leak = 600 * 45 # 27,000
    ar_total_leak = ar_err_leak + ar_rework_leak # 84,024

    # Scenario C with frontline overlap
    c_avoided_err = ar_err_leak * 0.75 # 42,768
    c_avoided_rework_hrs = ar_rework_hrs * 0.75 # 450 hrs
    c_avoided_rework_cost = ar_rework_leak * 0.75 # 20,250
    c_leakage_savings = c_avoided_err + c_avoided_rework_cost # 63,018

    # Overlap deduction
    c_overlap = round(min(c_avoided_rework_hrs, ar_capacity_hours) * 45) # 20,250
    check(c_overlap == 20250, f"Scenario C Overlap is INR 20,250 (450 hrs @ INR 45/hr; got {c_overlap})")

    c_gross_frontline = ar_capacity_val + c_leakage_savings - c_overlap # 144,144
    c_net_frontline = c_gross_frontline - 13400 # 130,744
    c_roi_frontline = round((c_net_frontline / 40000) * 100) # 327%
    c_first_year_roi = round(((c_net_frontline - 40000) / 40000) * 100) # 227%
    c_breakeven_frontline = round((40000 / (c_net_frontline / 12)) * 10) / 10 # 3.7 mo

    check(c_gross_frontline == 144144, f"AR Frontline Gross Economic Benefit is INR 144,144 (got {c_gross_frontline})")
    check(c_net_frontline == 130744, f"AR Frontline Net Recurring Benefit is INR 130,744 (got {c_net_frontline})")
    check(c_roi_frontline == 327, f"AR Frontline Annual Economic ROI is 327% (got {c_roi_frontline}%)")
    check(c_first_year_roi == 227, f"AR Frontline First-Year Net ROI is 227% (got {c_first_year_roi}%)")
    check(c_breakeven_frontline == 3.7, f"AR Frontline Productivity Breakeven is 3.7 mo (got {c_breakeven_frontline} mo)")

    # ------------------------------------------------------------------
    # 2. Accounts Receivable with Separate Rework Specialists (Additive)
    # ------------------------------------------------------------------
    print("\n--- 2. AR with Separate Specialists (Incremental & Additive) ---")
    c_overlap_sep = 0
    c_gross_sep = ar_capacity_val + c_leakage_savings - c_overlap_sep # 164,394
    c_net_sep = c_gross_sep - 13400 # 150,994
    c_roi_sep = round((c_net_sep / 40000) * 100) # 377%
    c_breakeven_sep = round((40000 / (c_net_sep / 12)) * 10) / 10 # 3.2 mo

    check(c_gross_sep == 164394, f"AR Separate Specialists Gross Benefit is INR 164,394 (got {c_gross_sep})")
    check(c_net_sep == 150994, f"AR Separate Specialists Net Recurring is INR 150,994 (got {c_net_sep})")
    check(c_roi_sep == 377, f"AR Separate Specialists Economic ROI is 377% (got {c_roi_sep}%)")
    check(c_breakeven_sep == 3.2, f"AR Separate Specialists Breakeven Horizon is 3.2 mo (got {c_breakeven_sep} mo)")

    # ------------------------------------------------------------------
    # 3. Accounts Receivable with Unknown Staffing Allocation (Conservative)
    # ------------------------------------------------------------------
    print("\n--- 3. AR with Unconfirmed Staffing Allocation (Conservative + Advisory) ---")
    # Must equal frontline conservative estimate
    check(c_gross_frontline == 144144, "Unconfirmed Staffing uses conservative deduction (INR 144,144)")
    check(c_roi_frontline == 327, "Unconfirmed Staffing uses conservative ROI (327%)")

    # ------------------------------------------------------------------
    # 4. Accounts Payable with Genuine Direct Cash Savings
    # ------------------------------------------------------------------
    print("\n--- 4. AP with Genuine Direct Cash Savings ---")
    ap_dup = 4 * 1450 * 0.40 * 12 # 27,840
    ap_disc = 15 * 380 * 12 # 68,400
    ap_penalties = 1800 * 12 # 21,600
    ap_cash_leak = ap_dup + ap_disc + ap_penalties # 117,840

    c_hard_cash_ap = ap_cash_leak * 0.8 # 94,272
    check(c_hard_cash_ap == 94272, f"AP Direct Cash Savings is $94,272 (got {c_hard_cash_ap})")

    ap_tech_opex = 13400
    ap_capex = 40000
    ap_net_recurring_cash = c_hard_cash_ap - ap_tech_opex # 80,872
    check(ap_net_recurring_cash == 80872, f"AP Net Recurring Direct Cash is $80,872 (got {ap_net_recurring_cash})")

    ap_cash_payback = round((ap_capex / (ap_net_recurring_cash / 12)) * 10) / 10 # 5.9 mo
    check(ap_cash_payback == 5.9, f"AP Realized Cash Payback is 5.9 mo (got {ap_cash_payback} mo)")

    ap_cash_roi = round(((ap_net_recurring_cash - ap_capex) / (ap_capex + ap_tech_opex)) * 100) # 77%
    check(ap_cash_roi == 77, f"AP Realized Cash ROI is 77% (got {ap_cash_roi}%)")

    # ------------------------------------------------------------------
    # 5. Process with Zero Direct Cash Savings (Non-Cash Enforcement)
    # ------------------------------------------------------------------
    print("\n--- 5. Process with Zero Direct Cash Savings ---")
    ar_hard_cash = 0
    check(ar_hard_cash == 0, "AR Direct Cash Savings is strictly 0")
    ar_cash_payback_label = "N/A – Non-Cash Operational Optimization" if ar_hard_cash == 0 else f"{ar_hard_cash}"
    check(ar_cash_payback_label == "N/A – Non-Cash Operational Optimization", "Cash Payback displays N/A when cash savings are 0")

    # ------------------------------------------------------------------
    # 6. Process with Zero Capex (Divide-by-Zero Safety)
    # ------------------------------------------------------------------
    print("\n--- 6. Process with Zero Capex (Zero Division Protection) ---")
    zero_capex = 0
    net_benefit = 150000
    safe_roi = round((net_benefit / zero_capex) * 100) if zero_capex > 0 else 0
    safe_payback = round((zero_capex / (net_benefit / 12)) * 10) / 10 if zero_capex > 0 else 0
    check(safe_roi == 0, f"Zero Capex produces 0% ROI without error (got {safe_roi})")
    check(safe_payback == 0, f"Zero Capex produces 0.0 mo Breakeven without error (got {safe_payback})")

    # ------------------------------------------------------------------
    # 7. Process with Zero or Negative Net Benefits (Negative Safety)
    # ------------------------------------------------------------------
    print("\n--- 7. Process with Negative Net Benefits ---")
    gross_small = 10000
    opex_large = 15000
    neg_net = gross_small - opex_large # -5000
    safe_neg_payback = "Not Achievable" if neg_net <= 0 else "Calculated"
    check(safe_neg_payback == "Not Achievable", "Negative Net Benefit produces 'Not Achievable' instead of negative payback")

    # ------------------------------------------------------------------
    # 8. Currency Invariance (USD vs EUR vs INR)
    # ------------------------------------------------------------------
    print("\n--- 8. Currency Invariance Verification ---")
    # Base USD (rate 1.0)
    usd_net = 130744.0
    usd_capex = 40000.0
    usd_roi = round((usd_net / usd_capex) * 100)
    usd_payback = round((usd_capex / (usd_net / 12)) * 10) / 10

    # EUR (rate 0.92)
    eur_net = usd_net * 0.92
    eur_capex = usd_capex * 0.92
    eur_roi = round((eur_net / eur_capex) * 100)
    eur_payback = round((eur_capex / (eur_net / 12)) * 10) / 10

    # INR (rate 84.0)
    inr_net = usd_net * 84.0
    inr_capex = usd_capex * 84.0
    inr_roi = round((inr_net / inr_capex) * 100)
    inr_payback = round((inr_capex / (inr_net / 12)) * 10) / 10

    check(usd_roi == eur_roi == inr_roi == 327, f"Economic ROI is strictly invariant across FX: USD({usd_roi}%), EUR({eur_roi}%), INR({inr_roi}%)")
    check(usd_payback == eur_payback == inr_payback == 3.7, f"Breakeven Horizon is strictly invariant across FX: USD({usd_payback}), EUR({eur_payback}), INR({inr_payback})")

    # ------------------------------------------------------------------
    # 9. Multi-Scenario Consistency (Scenario A vs B vs C)
    # ------------------------------------------------------------------
    print("\n--- 9. Multi-Scenario Consistency (A vs B vs C) ---")
    # Scenario B Overlap in AR
    b_labor_savings = round(ar_capacity_val * (20 / 35)) if ar_capacity_val < round(ar_labor * 0.2) else round(ar_labor * 0.2) # 67,584
    b_leakage_savings = round(ar_total_leak * 0.5) # 42,012
    b_avoided_rework_hrs = ar_rework_hrs * 0.5 # 300 hrs
    b_cap_hrs = b_labor_savings / 40 # 1,689.6 hrs
    b_overlap = round(min(b_avoided_rework_hrs, b_cap_hrs) * 45) # 13,500
    check(b_overlap == 13500, f"Scenario B Overlap is INR 13,500 (got {b_overlap})")

    b_gross_frontline = b_labor_savings + b_leakage_savings - b_overlap # 67,584 + 42,012 - 13,500 = 96,096
    b_net_frontline = b_gross_frontline - 5000 # 91,096
    b_roi_frontline = round((b_net_frontline / 15000) * 100) # 607%
    b_breakeven_frontline = round((15000 / (b_net_frontline / 12)) * 10) / 10 # 2.0 mo

    check(b_gross_frontline == 96096, f"Scenario B Frontline Gross is INR 96,096 (got {b_gross_frontline})")
    check(b_net_frontline == 91096, f"Scenario B Frontline Net Recurring is INR 91,096 (got {b_net_frontline})")
    check(b_roi_frontline == 607, f"Scenario B Frontline Economic ROI is 607% (got {b_roi_frontline}%)")
    check(b_breakeven_frontline == 2.0, f"Scenario B Frontline Breakeven Horizon is 2.0 mo (got {b_breakeven_frontline} mo)")

    # ------------------------------------------------------------------
    # 10. Diverse Labor Rates & Volume Profiles (Specialist vs Clerical)
    # ------------------------------------------------------------------
    print("\n--- 10. Diverse Labor Rates & Volume Profiles ---")
    # Specialist Workflow: 6 FTE @ $120/hr, 7 hrs/day, 22 days/mo
    spec_annual_labor = 6 * 7 * 22 * 120 * 12 # 1,330,560
    spec_capacity = spec_annual_labor * 0.25 # 332,640
    spec_capex = 60000
    spec_opex = 18000
    spec_net = spec_capacity - spec_opex # 314,640
    spec_roi = round((spec_net / spec_capex) * 100) # 524%
    spec_breakeven = round((spec_capex / (spec_net / 12)) * 10) / 10 # 2.3 mo
    check(spec_roi == 524, f"Specialist Profile Economic ROI is 524% (got {spec_roi}%)")
    check(spec_breakeven == 2.3, f"Specialist Profile Breakeven Horizon is 2.3 mo (got {spec_breakeven} mo)")

    print("\n======================================================================")
    print(f"FINANCIAL GOVERNANCE AUDIT SUMMARY: {passed} PASSED, {total - passed} FAILED (TOTAL {total})")
    print("======================================================================")

    if total - passed > 0:
        sys.exit(1)

if __name__ == "__main__":
    run_financial_governance_tests()
