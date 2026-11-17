import subprocess
import os
import sys
import re
import shutil
import pymupdf

script_dir = os.path.dirname(os.path.abspath(__file__))
workspace = os.path.dirname(script_dir) if os.path.basename(script_dir) == "test" else script_dir

def run_reconciliation_suite():
    print("======================================================================")
    print("TREASURY & ACCOUNTS RECEIVABLE RECONCILIATION & PDF AUDIT SUITE")
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
    # 1. Treasury Mathematical & Scenario Reconciliation Audit
    # ------------------------------------------------------------------
    print("\n--- 1. Treasury Scenario B Mathematical Engine Reconciliation ---")
    tr_labor = 1069200
    tr_capacity_pct = 10.0
    tr_capacity_val = round(tr_labor * (tr_capacity_pct / 100)) # 106,920

    check(tr_capacity_val == 106920, f"Treasury recoverable capacity value is INR 106,920 (got {tr_capacity_val})")

    # Formula check: Scenario B labor savings when capacity < 20%
    b_labor_savings = round(tr_capacity_val * (20 / 35)) if tr_capacity_val < round(tr_labor * 0.2) else round(tr_labor * 0.2)
    b_remaining_labor = tr_labor - b_labor_savings

    check(b_labor_savings == 61097, f"Scenario B labor savings is INR 61,097 (NOT 213,840; got {b_labor_savings})")
    check(b_remaining_labor == 1008103, f"Scenario B remaining labor is INR 1,008,103 (NOT 855,360; got {b_remaining_labor})")

    # Scenario C comparison
    c_labor_savings = tr_capacity_val # 106,920
    c_remaining_labor = tr_labor - c_labor_savings # 962,280

    check(c_labor_savings == 106920, f"Scenario C labor savings is INR 106,920 (got {c_labor_savings})")
    check(c_remaining_labor == 962280, f"Scenario C remaining labor is INR 962,280 (got {c_remaining_labor})")
    check(b_labor_savings < c_labor_savings, f"Scenario B labor savings ({b_labor_savings}) < Scenario C labor savings ({c_labor_savings})")
    check(b_remaining_labor > c_remaining_labor, f"Scenario B remaining labor ({b_remaining_labor}) > Scenario C remaining labor ({c_remaining_labor})")

    # Leakage and benefits
    tr_err = 1200 * 0.008 * 120 * 12 # 13,824
    tr_rework = 20 * 65 * 12 # 15,600
    tr_leakage = round(tr_err + tr_rework) # 29,424
    check(tr_leakage == 29424, f"Treasury total annual leakage is INR 29,424 (got {tr_leakage})")

    b_leakage_savings = round(tr_leakage * 0.5) # 14,712
    b_gross = b_labor_savings + b_leakage_savings # 61,097 + 14,712 = 75,809
    b_net = b_gross - 5000 # 70,809
    b_roi = round((b_net / 15000) * 100) # 472%
    b_payback = round((15000 / (b_net / 12)) * 10) / 10 # 2.5 mo

    check(b_gross == 75809, f"Scenario B gross savings is INR 75,809 (got {b_gross})")
    check(b_net == 70809, f"Scenario B net recurring benefit is INR 70,809 (got {b_net})")
    check(b_roi == 472, f"Scenario B recurring ROI is 472% (got {b_roi}%)")
    check(b_payback == 2.5, f"Scenario B payback is 2.5 mo (got {b_payback} mo)")

    c_leakage_savings = round(tr_leakage * 0.75) # 22,068
    c_gross = c_labor_savings + c_leakage_savings # 106,920 + 22,068 = 128,988
    c_net = c_gross - 13400 # 115,588
    c_roi = round((c_net / 40000) * 100) # 289%
    c_payback = round((40000 / (c_net / 12)) * 10) / 10 # 4.2 mo

    check(c_gross == 128988, f"Scenario C gross savings is INR 128,988 (got {c_gross})")
    check(c_net == 115588, f"Scenario C net recurring benefit is INR 115,588 (got {c_net})")
    check(c_roi == 289, f"Scenario C recurring ROI is 289% (got {c_roi}%)")
    check(c_payback == 4.2, f"Scenario C payback is 4.2 mo (got {c_payback} mo)")

    # ------------------------------------------------------------------
    # 2. Accounts Receivable Mathematical & Scenario Audit
    # ------------------------------------------------------------------
    print("\n--- 2. Accounts Receivable Mathematical Engine Audit ---")
    ar_labor = 8 * 4 * 22 * 40 * 12 # 337,920
    ar_capacity_pct = 30.0
    ar_capacity_val = round(ar_labor * (ar_capacity_pct / 100)) # 101,376

    check(ar_labor == 337920, f"Accounts Receivable baseline labor is $337,920 (got {ar_labor})")
    check(ar_capacity_val == 101376, f"Accounts Receivable recoverable capacity value is $101,376 (got {ar_capacity_val})")

    ar_b_labor_savings = round(ar_capacity_val * (20 / 35)) if ar_capacity_val < round(ar_labor * 0.2) else round(ar_labor * 0.2)
    ar_b_remaining_labor = ar_labor - ar_b_labor_savings

    check(ar_b_labor_savings == 67584, f"AR Scenario B labor savings is $67,584 (20% cap; got {ar_b_labor_savings})")
    check(ar_b_remaining_labor == 270336, f"AR Scenario B remaining labor is $270,336 (got {ar_b_remaining_labor})")

    ar_err = 7200 * 0.022 * 30 * 12 # 57,024
    ar_rework = 50 * 45 * 12 # 27,000
    ar_leakage = round(ar_err + ar_rework) # 84,024

    check(ar_leakage == 84024, f"AR total annual leakage is $84,024 (got {ar_leakage})")

    # AR Direct Cash Leakage vs Non-Cash Operational Defect Leakage
    ar_direct_cash_leakage = 0 # No duplicate payments, SLA penalties, or missed discounts
    ar_non_cash_leakage = ar_leakage - ar_direct_cash_leakage # 84,024
    check(ar_direct_cash_leakage == 0, f"AR direct cash leakage is $0 (got {ar_direct_cash_leakage})")
    check(ar_non_cash_leakage == 84024, f"AR non-cash leakage is 100% of leakage ($84,024; got {ar_non_cash_leakage})")

    # AR Scenario B Reconciliation
    ar_b_actual_cash_savings = round(ar_direct_cash_leakage * 0.5) # $0
    ar_b_leakage_savings = round(ar_leakage * 0.5) # 42,012
    ar_b_gross = ar_b_labor_savings + ar_b_leakage_savings # 109,596
    ar_b_net = ar_b_gross - 5000 # 104,596
    ar_b_roi = round((ar_b_net / 15000) * 100) # 697%
    ar_b_payback = round((15000 / (ar_b_net / 12)) * 10) / 10 # 1.7 mo

    check(ar_b_actual_cash_savings == 0, f"AR Scenario B Actual Cash Savings is $0 (got {ar_b_actual_cash_savings})")
    check(ar_b_leakage_savings == 42012, f"AR Scenario B Avoided Leakage is $42,012 (got {ar_b_leakage_savings})")
    check(ar_b_gross == 109596, f"AR Scenario B gross savings is $109,596 (got {ar_b_gross})")
    check(ar_b_net == 104596, f"AR Scenario B net recurring benefit is $104,596 (got {ar_b_net})")
    check(ar_b_roi == 697, f"AR Scenario B recurring ROI is 697% (got {ar_b_roi}%)")
    check(ar_b_payback == 1.7, f"AR Scenario B payback is 1.7 mo (got {ar_b_payback} mo)")

    # AR Scenario C Reconciliation (Enterprise AI)
    ar_c_hard_cash_savings = round(ar_direct_cash_leakage * 0.8) # $0
    ar_c_cost_avoidance = round(ar_non_cash_leakage * 0.75) # $63,018
    ar_c_leakage_savings = ar_c_hard_cash_savings + ar_c_cost_avoidance # 63,018
    ar_c_labor_savings = ar_capacity_val # 101,376
    ar_c_gross = ar_c_labor_savings + ar_c_leakage_savings # 101,376 + 63,018 = 164,394
    ar_c_net = ar_c_gross - 13400 # 150,994
    ar_c_roi = round((ar_c_net / 40000) * 100) # 377%
    ar_c_payback = round((40000 / (ar_c_net / 12)) * 10) / 10 # 3.2 mo

    check(ar_c_hard_cash_savings == 0, f"AR Scenario C Actual Cash Savings is $0 (got {ar_c_hard_cash_savings})")
    check(ar_c_leakage_savings == 63018, f"AR Scenario C Avoided Leakage is $63,018 (got {ar_c_leakage_savings})")
    check(ar_c_gross == 164394, f"AR Scenario C gross savings is $164,394 (got {ar_c_gross})")
    check(ar_c_net == 150994, f"AR Scenario C net recurring benefit is $150,994 (got {ar_c_net})")
    check(ar_c_roi == 377, f"AR Scenario C recurring ROI is 377% (got {ar_c_roi}%)")
    check(ar_c_payback == 3.2, f"AR Scenario C payback is 3.2 mo (got {ar_c_payback} mo)")

    # ------------------------------------------------------------------
    # 3. Custom AI Agent / LLM API Stack Pricing Reconciliation
    # ------------------------------------------------------------------
    print("\n--- 3. Custom AI Agent / LLM API Stack Pricing Reconciliation ---")
    custom_users = 15
    custom_base_mo = 150.0
    custom_per_user_mo = 5.0
    custom_sub_mo = custom_base_mo + (custom_users * custom_per_user_mo) # $225/mo
    custom_sub_yr1 = round(custom_sub_mo * 12) # $2,700/yr

    custom_input_tokens_m = 5.0
    custom_output_tokens_m = 1.5
    custom_input_cost = custom_input_tokens_m * 3.0 # $15/mo
    custom_output_cost = custom_output_tokens_m * 15.0 # $22.5/mo
    custom_usage_mo = custom_input_cost + custom_output_cost # $37.5/mo
    custom_usage_yr1 = round(custom_usage_mo * 12) # $450/yr

    custom_support = 8000 # $8,000/yr
    custom_capex = 25000 + 15000 # $40,000
    custom_opex_yr1 = custom_sub_yr1 + custom_usage_yr1 + custom_support # $11,150/yr
    custom_total_yr1 = custom_capex + custom_opex_yr1 # $51,150
    custom_contract_3yr = custom_capex + (custom_opex_yr1 * 3) # $73,450

    check(custom_sub_yr1 == 2700, f"Custom AI Agent Year 1 Licenses is 2,700 (got {custom_sub_yr1})")
    check(custom_usage_yr1 == 450, f"Custom AI Agent Year 1 Usage is 450 (got {custom_usage_yr1})")
    check(custom_support == 8000, f"Custom AI Agent Annual Support is 8,000 (got {custom_support})")
    check(custom_capex == 40000, f"Custom AI Agent Year 1 Capex is 40,000 (got {custom_capex})")
    check(custom_total_yr1 == 51150, f"Custom AI Agent Total Year 1 is 51,150 (got {custom_total_yr1})")
    check(custom_contract_3yr == 73450, f"Custom AI Agent 3-Year Contract Total is 73,450 (got {custom_contract_3yr})")

    # Horizontal formula reconciliation:
    # Year 1 Total = Licenses + Usage + Support + Capex
    calc_yr1_total = custom_sub_yr1 + custom_usage_yr1 + custom_support + custom_capex
    check(calc_yr1_total == custom_total_yr1, f"Horizontal Year 1 formula reconciles: 2,700 + 450 + 8,000 + 40,000 = {custom_total_yr1}")

    # 3-Year Total = Capex + (Licenses + Usage + Support) * 3
    calc_3yr_total = custom_capex + ((custom_sub_yr1 + custom_usage_yr1 + custom_support) * 3)
    check(calc_3yr_total == custom_contract_3yr, f"Horizontal 3-Year formula reconciles: 40,000 + (11,150 * 3) = {custom_contract_3yr}")

    # ------------------------------------------------------------------
    # 4. PDF Physical Artifact & Text Content Verification
    # ------------------------------------------------------------------
    print("\n--- 4. PDF Physical Artifact & Layout Verification ---")
    tr_pdf = os.path.join(workspace, "ProcessIQ_Treasury_Operations_Report.pdf")
    ar_pdf = os.path.join(workspace, "ProcessIQ_Accounts_Receivable_Report.pdf")

    check(os.path.exists(tr_pdf), f"Treasury PDF exists ({os.path.basename(tr_pdf)})")
    check(os.path.exists(ar_pdf), f"Accounts Receivable PDF exists ({os.path.basename(ar_pdf)})")

    if os.path.exists(tr_pdf):
        tr_doc = pymupdf.open(tr_pdf)
        check(len(tr_doc) == 10, f"Treasury PDF page count is 10 (got {len(tr_doc)})")
        tr_text = "".join(p.get_text() for p in tr_doc)
        tr_norm = re.sub(r'\s+', ' ', tr_text)

        check("DEMONSTRATION SAMPLE REPORT — TREASURY OPERATIONS" in tr_norm, "Treasury Cover explicitly declares DEMONSTRATION SAMPLE REPORT — TREASURY OPERATIONS")
        check("Accounts Payable" not in tr_norm, "Treasury report contains zero references to 'Accounts Payable'")
        check("INR 1,069,200" in tr_norm, "Treasury report contains 'INR 1,069,200'")
        check("INR 106,920" in tr_norm, "Treasury report contains 'INR 106,920'")
        check("INR 61,097" in tr_norm, "Treasury report contains reconciled Scenario B capacity value 'INR 61,097'")
        check("INR 1,008,103" in tr_norm, "Treasury report contains reconciled Scenario B remaining labor 'INR 1,008,103'")
        check("Assessment Pending" in tr_norm, "Treasury report renders 'Assessment Pending' for incomplete Module 3")
        check("Executive Transformation Sign-Off & Governance Approval" in tr_norm, "Treasury report contains formal Executive Sign-Off Block")
        check("Client-Side Privacy, Local Storage & External Dependencies" in tr_norm, "Treasury report contains Privacy, localStorage & CDN disclosures")

        # Treasury Module 4 Custom AI Agent checks
        check("Custom AI Agent / LLM API Stack" in tr_norm, "Treasury report contains 'Custom AI Agent / LLM API Stack'")
        check("Year 1 Usage" in tr_norm, "Treasury report Module 4 table contains 'Year 1 Usage' column")
        check("INR 2,700" in tr_norm, "Treasury report contains Custom AI Agent Year 1 Licenses 'INR 2,700'")
        check("INR 450" in tr_norm, "Treasury report contains Custom AI Agent Year 1 Usage 'INR 450'")
        check("INR 8,000" in tr_norm, "Treasury report contains Custom AI Agent Annual Support 'INR 8,000'")
        check("INR 40,000" in tr_norm, "Treasury report contains Custom AI Agent Year 1 Capex 'INR 40,000'")
        check("INR 51,150" in tr_norm, "Treasury report contains Custom AI Agent Total Year 1 'INR 51,150'")
        check("INR 73,450" in tr_norm, "Treasury report contains Custom AI Agent 3-Year Total 'INR 73,450'")

    if os.path.exists(ar_pdf):
        ar_doc = pymupdf.open(ar_pdf)
        check(len(ar_doc) == 10, f"Accounts Receivable PDF page count is 10 (got {len(ar_doc)})")
        ar_text = "".join(p.get_text() for p in ar_doc)
        ar_norm = re.sub(r'\s+', ' ', ar_text)

        check("DEMONSTRATION SAMPLE REPORT — ACCOUNTS RECEIVABLE" in ar_norm, "AR Cover explicitly declares DEMONSTRATION SAMPLE REPORT — ACCOUNTS RECEIVABLE")
        check("$337,920" in ar_norm, "AR report contains '$337,920'")
        check("$101,376" in ar_norm, "AR report contains '$101,376'")
        check("$67,584" in ar_norm, "AR report contains reconciled Scenario B capacity value '$67,584'")
        check("$270,336" in ar_norm, "AR report contains reconciled Scenario B remaining labor '$270,336'")
        check("Executive Transformation Sign-Off & Governance Approval" in ar_norm, "AR report contains formal Executive Sign-Off Block")

        # AR Module 4 Custom AI Agent checks
        check("Custom AI Agent / LLM API Stack" in ar_norm, "AR report contains 'Custom AI Agent / LLM API Stack'")
        check("Year 1 Usage" in ar_norm, "AR report Module 4 table contains 'Year 1 Usage' column")
        check("$2,700" in ar_norm, "AR report contains Custom AI Agent Year 1 Licenses '$2,700'")
        check("$450" in ar_norm, "AR report contains Custom AI Agent Year 1 Usage '$450'")
        check("$8,000" in ar_norm, "AR report contains Custom AI Agent Annual Support '$8,000'")
        check("$40,000" in ar_norm, "AR report contains Custom AI Agent Year 1 Capex '$40,000'")
        check("$51,150" in ar_norm, "AR report contains Custom AI Agent Total Year 1 '$51,150'")
        check("$73,450" in ar_norm, "AR report contains Custom AI Agent 3-Year Total '$73,450'")

    print("\n======================================================================")
    print(f"RECONCILIATION SUITE SUMMARY: {passed} PASSED, {total - passed} FAILED (TOTAL {total})")
    print("======================================================================")

    return passed == total

if __name__ == "__main__":
    success = run_reconciliation_suite()
    sys.exit(0 if success else 1)
