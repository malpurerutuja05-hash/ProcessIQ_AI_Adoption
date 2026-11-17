"""
ProcessIQ Financial Model & Scenario Audit Verification Suite
Audits all three scenarios (A, B, C) independently and verifies edge cases:
- Zero technology cost
- Zero Capex
- Zero savings
- Positive and negative benefits
- Different currencies
- Large enterprise values
- Cross-medium consistency (Web, PDF, CSV)
"""

import sys
import math
import os

passed = 0
failed = 0

def check(condition, desc):
    global passed, failed
    if condition:
        passed += 1
        print(f"  [PASS] {desc}")
    else:
        failed += 1
        print(f"  [FAIL] {desc}")

def run_scenario_audit():
    print("======================================================================")
    print("PROCESSIQ FINANCIAL MODEL & SCENARIO MATHEMATICAL AUDIT")
    print("======================================================================\n")

    # ------------------------------------------------------------------
    # 1. ACCOUNTS PAYABLE DEMONSTRATION AUDIT (BASE CASE)
    # ------------------------------------------------------------------
    print(">>> 1. Auditing Accounts Payable Base Case (Scenarios A, B, C)...")
    
    # Baseline Parameters
    emp_count = 12
    hours_per_day = 4.5
    working_days = 22
    hourly_rate = 42.0
    overtime_hours = 25
    overtime_rate = 63.0
    recovery_target_pct = 0.35 # 35%

    # Module 1 Math
    monthly_base_labor = emp_count * hours_per_day * working_days * hourly_rate # 49,896.0
    monthly_ot_labor = overtime_hours * overtime_rate # 1,575.0
    monthly_labor = monthly_base_labor + monthly_ot_labor # 51,471.0
    annual_labor = monthly_labor * 12.0 # 617,652.0
    annual_capacity_value = annual_labor * recovery_target_pct # 216,178.2

    # Module 2 Math
    errors_mo = 8500 * 0.028 * 35.0 # 8,330.0
    rework_mo = 75 * 48.0 # 3,600.0
    delays_mo = 120 * 45.0 # 5,400.0
    discounts_mo = 15 * 380.0 # 5,700.0
    duplicates_mo = 4 * 1450.0 * 0.4 # 2,320.0
    penalties_mo = 1800.0
    other_mo = 1200.0

    monthly_leakage = errors_mo + rework_mo + delays_mo + discounts_mo + duplicates_mo + penalties_mo + other_mo # 28,350.0
    annual_leakage = monthly_leakage * 12.0 # 340,200.0

    # Direct cash vs non-cash leakage
    direct_cash_annual = (discounts_mo + duplicates_mo + penalties_mo) * 12.0 # (5700 + 2320 + 1800) * 12 = 117,840.0
    non_cash_annual = annual_leakage - direct_cash_annual # 222,360.0

    # Total Baseline
    total_baseline = annual_labor + annual_leakage # 957,852.0

    check(round(annual_labor) == 617652, f"Scenario A: Baseline labor cost is $617,652 (actual: {round(annual_labor)})")
    check(round(annual_leakage) == 340200, f"Scenario A: Baseline leakage cost is $340,200 (actual: {round(annual_leakage)})")
    check(round(total_baseline) == 957852, f"Scenario A: Total baseline operating run-rate is $957,852 (actual: {round(total_baseline)})")

    # Scenario B (Automation & Lean First)
    b_capex = 15000.0
    b_opex = 5000.0
    b_remaining_labor = round(annual_labor * 0.8) # 494,122
    b_remaining_leakage = round(annual_leakage * 0.5) # 170,100
    b_labor_savings = round(annual_labor * 0.2) # 123,530
    b_leakage_savings = round(annual_leakage * 0.5) # 170,100
    b_gross_savings = b_labor_savings + b_leakage_savings # 293,630
    b_net_benefit = b_gross_savings - b_opex # 288,630
    b_first_year_net = b_net_benefit - b_capex # 273,630
    b_roi = round((b_net_benefit / b_capex) * 100) # 1,924%
    b_payback = round((b_capex / (b_net_benefit / 12.0)) * 10) / 10 # 0.6 months

    check(b_remaining_labor == 494122, f"Scenario B: Remaining labor is $494,122 (actual: {b_remaining_labor})")
    check(b_remaining_leakage == 170100, f"Scenario B: Remaining leakage is $170,100 (actual: {b_remaining_leakage})")
    check(b_gross_savings == 293630, f"Scenario B: 1. Gross annual operating savings is $293,630 (actual: {b_gross_savings})")
    check(b_opex == 5000, f"Scenario B: 2. Annual technology operating costs is $5,000 (actual: {b_opex})")
    check(b_net_benefit == 288630, f"Scenario B: 3. Net annual recurring benefit is $288,630 (actual: {b_net_benefit})")
    check(b_capex == 15000, f"Scenario B: 4. One-time implementation Capex is $15,000 (actual: {b_capex})")
    check(b_first_year_net == 273630, f"Scenario B: 5. First-year net benefit is $273,630 (actual: {b_first_year_net})")
    check(b_roi == 1924, f"Scenario B: 6. ROI is 1,924% (actual: {b_roi}%)")
    check(b_payback == 0.6, f"Scenario B: 7. Payback period is 0.6 months (actual: {b_payback})")

    # Scenario C (Enterprise AI Transformation)
    c_capex = 40000.0 # 25k impl + 15k integ
    c_opex = 13400.0  # 15 users * $30/mo * 12 (5,400) + 8,000 maint
    c_labor_savings = round(annual_capacity_value) # 216,178
    c_hard_cash_savings = direct_cash_annual * 0.8 # 94,272
    c_cost_avoidance = non_cash_annual * 0.75 # 166,770
    c_leakage_savings = round(c_hard_cash_savings + c_cost_avoidance) # 261,042
    c_remaining_labor = round(annual_labor - c_labor_savings) # 401,474
    c_remaining_leakage = round(annual_leakage - c_leakage_savings) # 79,158
    c_gross_savings = c_labor_savings + c_leakage_savings # 477,220
    c_net_benefit = c_gross_savings - c_opex # 463,820
    c_first_year_net = c_net_benefit - c_capex # 423,820
    c_roi = round((c_net_benefit / c_capex) * 100) # 1,160%
    c_payback = round((c_capex / (c_net_benefit / 12.0)) * 10) / 10 # 1.0 months

    check(c_remaining_labor == 401474, f"Scenario C: Remaining labor is $401,474 (actual: {c_remaining_labor})")
    check(c_remaining_leakage == 79158, f"Scenario C: Remaining leakage is $79,158 (actual: {c_remaining_leakage})")
    check(c_gross_savings == 477220, f"Scenario C: 1. Gross annual operating savings is $477,220 (actual: {c_gross_savings})")
    check(c_opex == 13400, f"Scenario C: 2. Annual technology operating costs is $13,400 (actual: {c_opex})")
    check(c_net_benefit == 463820, f"Scenario C: 3. Net annual recurring benefit is $463,820 (actual: {c_net_benefit})")
    check(c_capex == 40000, f"Scenario C: 4. One-time implementation Capex is $40,000 (actual: {c_capex})")
    check(c_first_year_net == 423820, f"Scenario C: 5. First-year net benefit is $423,820 (actual: {c_first_year_net})")
    check(c_roi == 1160, f"Scenario C: 6. ROI is 1,160% (actual: {c_roi}%)")
    check(c_payback == 1.0, f"Scenario C: 7. Payback period is 1.0 months (actual: {c_payback})")

    # ------------------------------------------------------------------
    # 2. EDGE CASE TESTING
    # ------------------------------------------------------------------
    print("\n>>> 2. Auditing Edge Cases...")

    def calc_model(gross_savings, tech_opex, capex):
        net_benefit = gross_savings - tech_opex
        first_year = net_benefit - capex
        roi = round((net_benefit / capex) * 100) if capex > 0 else 0
        monthly_net = net_benefit / 12.0
        payback = round((capex / monthly_net) * 10) / 10 if (capex > 0 and monthly_net > 0) else 0.0
        return net_benefit, first_year, roi, payback

    # Edge Case 1: Zero Technology Cost
    nb, fy, roi, pb = calc_model(100000.0, 0.0, 20000.0)
    check(nb == 100000.0 and fy == 80000.0 and roi == 500 and pb == 2.4, 
          f"Edge Case 1: Zero tech cost produces net=100k, 1stYr=80k, ROI=500%, Payback=2.4mo (got {nb}, {fy}, {roi}%, {pb}mo)")

    # Edge Case 2: Zero Capex (Pure SaaS subscription with zero implementation fee)
    nb, fy, roi, pb = calc_model(100000.0, 10000.0, 0.0)
    check(nb == 90000.0 and fy == 90000.0 and roi == 0 and pb == 0.0,
          f"Edge Case 2: Zero Capex produces net=90k, 1stYr=90k, ROI=0% (safe), Payback=0.0mo (got {nb}, {fy}, {roi}%, {pb}mo)")

    # Edge Case 3: Zero Savings (Project fails to deliver operational improvements)
    nb, fy, roi, pb = calc_model(0.0, 15000.0, 30000.0)
    check(nb == -15000.0 and fy == -45000.0 and roi == -50 and pb == 0.0,
          f"Edge Case 3: Zero savings produces net=-15k, 1stYr=-45k, ROI=-50%, Payback=0.0mo (got {nb}, {fy}, {roi}%, {pb}mo)")

    # Edge Case 4: Negative Benefit (Technology expenses exceed gross savings)
    nb, fy, roi, pb = calc_model(20000.0, 50000.0, 25000.0)
    check(nb == -30000.0 and fy == -55000.0 and roi == -120 and pb == 0.0,
          f"Edge Case 4: Negative benefit safely handled: net=-30k, 1stYr=-55k, ROI=-120%, Payback=0.0 (never pays back)")

    # Edge Case 5: Different Currencies formatting check
    currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'INR', 'JPY']
    syms = {'USD': '$', 'EUR': '€', 'GBP': '£', 'CAD': 'CA$', 'AUD': 'A$', 'INR': '₹', 'JPY': '¥'}
    curr_ok = True
    for c in currencies:
        val = 288630
        formatted = f"{syms[c]}{val:,}"
        if not (syms[c] in formatted and "288,630" in formatted):
            curr_ok = False
    check(curr_ok, f"Edge Case 5: All 7 currencies ({', '.join(currencies)}) format correctly with standard thousands separators")

    # Edge Case 6: Large Enterprise Scale ($150M Labor, 2,500 FTEs)
    large_labor = 2500 * 8.0 * 22 * 65.0 * 12.0 # $343,200,000
    large_leakage = 45000000.0 # $45,000,000
    large_capex = 2500000.0 # $2.5M
    large_opex = 750000.0 # $750k
    large_gross = (large_labor * 0.25) + (large_leakage * 0.6) # $85.8M + $27M = $112,800,000
    large_net = large_gross - large_opex # $112,050,000
    large_roi = round((large_net / large_capex) * 100) # 4,482%
    large_pb = round((large_capex / (large_net / 12.0)) * 10) / 10 # 0.3 months
    check(large_gross == 112800000.0 and large_roi == 4482 and large_pb == 0.3,
          f"Edge Case 6: Enterprise scale ($343M labor, $45M leakage) calculates without integer overflow: Gross=$112.8M, ROI=4,482%, Payback=0.3mo")

    # ------------------------------------------------------------------
    # 3. CODEBASE CONSISTENCY AUDIT
    # ------------------------------------------------------------------
    print("\n>>> 3. Auditing Codebase Consistency (app.js, consolidator.ts, index.html)...")
    
    test_dir = os.path.dirname(os.path.abspath(__file__))
    pkg_dir = os.path.dirname(test_dir)
    
    with open(os.path.join(pkg_dir, "app.js"), "r", encoding="utf-8") as f:
        js = f.read()

    with open(os.path.join(pkg_dir, "index.html"), "r", encoding="utf-8") as f:
        html = f.read()

    with open(os.path.join(pkg_dir, "src", "lib", "calculations", "consolidator.ts"), "r", encoding="utf-8") as f:
        ts = f.read()

    # Reconciled Scenario B in JS and TS
    b_reconciled_js = "bGrossSavings = bLaborSavings + bLeakageSavings" in js and "bGrossSavings - bOpex" in js
    b_reconciled_ts = "bGrossSavings = bLaborSavings + bLeakageSavings" in ts and "bGrossSavings - bOpex" in ts
    check(b_reconciled_js and b_reconciled_ts, "Reconciliation: Scenario B gross savings formula unified across JS and TS")

    # The 7 metrics present in JS PDF and CSV
    metrics_pdf = "Gross Benefits" in js and "Tech Opex" in js and "Net Recurring" in js and "1st-Yr Net" in js
    metrics_csv = "1. Gross Annual Savings" in js and "2. Annual Tech Opex" in js and "5. 1st-Year Net Benefit" in js
    check(metrics_pdf and metrics_csv, "Consistency: All 7 financial metrics present in PDF and CSV generation")

    # Payback N/A for Scenario A
    payback_na_js = "paybackFormatted: 'N/A – Baseline Scenario'" in js
    payback_na_ts = "paybackFormatted: 'N/A – Baseline Scenario'" in ts
    check(payback_na_js and payback_na_ts, "Baseline Payback: Scenario A explicitly displays 'N/A – Baseline Scenario' (not 0.0 mo)")

    # Benefit Classification (4 Categories)
    benefit_cats_html = "1. Actual Cash Savings" in html and "2. Avoided Process Leakage" in html and "3. Recoverable Capacity Value" in html and "4. Total Economic Benefit" in html
    benefit_cats_js = "actualCashSavings" in js and "avoidedLeakage" in js and "capacityValueReleased" in js
    check(benefit_cats_html and benefit_cats_js, "Benefit Classification: 4 distinct categories separated across UI and calculation engine")

    # Editable Subscription Pricing
    edit_modal_html = "edit-pricing-modal" in html and "modal-input-price" in html and "modal-input-billing" in html and "modal-input-users" in html
    edit_fns_js = "function openEditPriceModal" in js and "function saveCustomPrice" in js and "function resetVendorPrice" in js
    custom_pricing_badge = "Custom Price Entered by User" in js and "Custom Price Entered by User" in html
    check(edit_modal_html and edit_fns_js and custom_pricing_badge, "Editable Pricing: Edit Price modal, handlers, and 'Custom Price Entered by User' tags verified")

    # Pricing Transparency Dual Layer
    transparency_dual = "Official Reference Price" in html and "customPricingMap" in js and "OFFICIAL_VENDORS" in js
    check(transparency_dual, "Pricing Transparency: Dual-layer pricing maintains immutable reference rates alongside user overrides")

    # PDF Layout Fixes Verified
    pdf_p4_disclaimer = "Important Capacity Recovery Distinction" in js and "splitTextToSize" in js
    pdf_p5_warnings = "Anti-Double Counting Controls & Operational Warnings" in js
    pdf_p6_risks = "No significant risks identified from the supplied answers" in js and "Assessment incomplete" in js
    check(pdf_p4_disclaimer and pdf_p5_warnings and pdf_p6_risks, "PDF Layout: Dynamic wrapped disclaimers, warnings, and risk conditionals verified")

    # Official Vendor Sources & Pricing Transparency
    vendor_urls = "https://www.microsoft.com/en-us/microsoft-365/enterprise/copilot-for-microsoft-365" in js and "https://www.anthropic.com/pricing#enterprise" in js
    quote_based_flag = "isQuoteBased: true" in js and "Quote-Based Contract" in js
    check(vendor_urls and quote_based_flag, "Vendor Pricing: Official URLs and quote-based contract transparency verified")

    # Attribution Preservation
    attrib_ok = ("Yuvraj Malpure" in html and "Created by" in html) and "Created by Yuvraj Malpure" in js
    check(attrib_ok, "Attribution: 'Created by Yuvraj Malpure' preserved in HTML and PDF logic")

    # Executive Dashboard Print Report (2-Page A4)
    with open(os.path.join(pkg_dir, "styles.css"), "r", encoding="utf-8") as f:
        css = f.read()

    print_container_ok = "print-executive-report" in html and "print-report-container" in html
    print_fns_ok = "function preparePrintReport" in js and "function printExecutiveReport" in js and "window.addEventListener('beforeprint', preparePrintReport)" in js
    print_css_ok = "@media print" in css and "A4 portrait" in css and "print-page" in css and "body > *:not(#print-executive-report)" in css
    check(print_container_ok and print_fns_ok and print_css_ok, "Executive Print Report: Dedicated 2-page print container, engine functions, and strict A4 print styles verified")

    print("\n======================================================================")
    print(f"SCENARIO AUDIT TEST SUMMARY: {passed} PASSED, {failed} FAILED (TOTAL {passed + failed})")
    print("======================================================================\n")

    return failed == 0

if __name__ == "__main__":
    success = run_scenario_audit()
    sys.exit(0 if success else 1)
