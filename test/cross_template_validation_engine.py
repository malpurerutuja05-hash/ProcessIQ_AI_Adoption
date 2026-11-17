#!/usr/bin/env python3
"""
ProcessIQ v1.0 — Cross-Template Calculation Validation Engine
Rigorous independent verification across all 12 industry process templates:
1. ap (Accounts Payable)
2. ar (Accounts Receivable)
3. bank_rec (Bank Reconciliation)
4. gl (General Ledger Closing)
5. journal (Journal Processing)
6. treasury (Treasury Operations)
7. fin_rep (Financial Reporting)
8. procurement (Procurement & Purchasing)
9. order_proc (Order Processing)
10. cust_service (Customer Service & Inquiries)
11. inventory (Inventory Management)
12. hr_ops (HR Onboarding & Operations)

Validates:
- Baseline labor and overtime segregation
- Recoverable capacity vs cash distinction
- Cost leakage & direct disbursement classification
- Overlap adjustment protocol (frontline vs separate vs unconfirmed)
- Scenario B & Scenario C metrics
- Cash ROI & Cash Payback vs Economic ROI & Economic Payback
- Seven-currency conversion invariance (USD, EUR, GBP, CAD, AUD, INR, JPY)
"""

import sys
import math

# Reference FX rates as planning assumptions
FX_RATES = {
    'USD': 1.0,
    'EUR': 0.92,
    'GBP': 0.79,
    'CAD': 1.36,
    'AUD': 1.52,
    'INR': 83.5,
    'JPY': 155.0
}

TEMPLATES = {
    'ap': {
        'name': 'Accounts Payable',
        'category': 'Finance',
        'emp': 12, 'hpd': 4.5, 'wd': 22, 'rate': 42.0,
        'ot': True, 'ot_h': 25, 'ot_rate': 63.0,
        'cap_pct': 35.0,
        'vol': 8500, 'err_pct': 2.8, 'cost_err': 35.0,
        'rework_h': 75, 'rework_rate': 48.0, 'staffing': 'separate',
        'delays_vol': 120, 'delays_cost': 45.0,
        'discounts_cnt': 15, 'discounts_val': 380.0,
        'dups_cnt': 4, 'dups_amt': 1450.0, 'dups_unrec': 40.0,
        'penalties': 1800.0, 'other': 1200.0
    },
    'ar': {
        'name': 'Accounts Receivable',
        'category': 'Finance',
        'emp': 8, 'hpd': 4.0, 'wd': 22, 'rate': 40.0,
        'ot': False, 'ot_h': 0, 'ot_rate': 60.0,
        'cap_pct': 30.0,
        'vol': 7200, 'err_pct': 2.2, 'cost_err': 30.0,
        'rework_h': 50, 'rework_rate': 45.0, 'staffing': 'frontline',
        'delays_vol': 0, 'delays_cost': 0.0,
        'discounts_cnt': 0, 'discounts_val': 0.0,
        'dups_cnt': 0, 'dups_amt': 0.0, 'dups_unrec': 0.0,
        'penalties': 0.0, 'other': 0.0
    },
    'bank_rec': {
        'name': 'Bank Reconciliation',
        'category': 'Finance',
        'emp': 4, 'hpd': 3.5, 'wd': 22, 'rate': 44.0,
        'ot': False, 'ot_h': 0, 'ot_rate': 66.0,
        'cap_pct': 40.0,
        'vol': 4500, 'err_pct': 1.5, 'cost_err': 40.0,
        'rework_h': 35, 'rework_rate': 48.0, 'staffing': 'frontline',
        'delays_vol': 0, 'delays_cost': 0.0,
        'discounts_cnt': 0, 'discounts_val': 0.0,
        'dups_cnt': 0, 'dups_amt': 0.0, 'dups_unrec': 0.0,
        'penalties': 0.0, 'other': 0.0
    },
    'gl': {
        'name': 'General Ledger Closing',
        'category': 'Finance',
        'emp': 6, 'hpd': 5.0, 'wd': 22, 'rate': 52.0,
        'ot': True, 'ot_h': 30, 'ot_rate': 78.0,
        'cap_pct': 30.0,
        'vol': 2800, 'err_pct': 1.8, 'cost_err': 65.0,
        'rework_h': 40, 'rework_rate': 55.0, 'staffing': 'frontline',
        'delays_vol': 0, 'delays_cost': 0.0,
        'discounts_cnt': 0, 'discounts_val': 0.0,
        'dups_cnt': 0, 'dups_amt': 0.0, 'dups_unrec': 0.0,
        'penalties': 0.0, 'other': 0.0
    },
    'journal': {
        'name': 'Journal Processing',
        'category': 'Finance',
        'emp': 5, 'hpd': 4.0, 'wd': 22, 'rate': 45.0,
        'ot': False, 'ot_h': 0, 'ot_rate': 67.5,
        'cap_pct': 35.0,
        'vol': 3400, 'err_pct': 2.0, 'cost_err': 45.0,
        'rework_h': 45, 'rework_rate': 50.0, 'staffing': 'frontline',
        'delays_vol': 0, 'delays_cost': 0.0,
        'discounts_cnt': 0, 'discounts_val': 0.0,
        'dups_cnt': 0, 'dups_amt': 0.0, 'dups_unrec': 0.0,
        'penalties': 0.0, 'other': 0.0
    },
    'treasury': {
        'name': 'Treasury Operations',
        'category': 'Finance',
        'emp': 3, 'hpd': 4.0, 'wd': 22, 'rate': 58.0,
        'ot': False, 'ot_h': 0, 'ot_rate': 87.0,
        'cap_pct': 25.0,
        'vol': 1200, 'err_pct': 0.8, 'cost_err': 120.0,
        'rework_h': 20, 'rework_rate': 65.0, 'staffing': 'frontline',
        'delays_vol': 0, 'delays_cost': 0.0,
        'discounts_cnt': 0, 'discounts_val': 0.0,
        'dups_cnt': 0, 'dups_amt': 0.0, 'dups_unrec': 0.0,
        'penalties': 0.0, 'other': 0.0
    },
    'fin_rep': {
        'name': 'Financial Reporting',
        'category': 'Finance',
        'emp': 5, 'hpd': 4.5, 'wd': 22, 'rate': 55.0,
        'ot': True, 'ot_h': 20, 'ot_rate': 82.5,
        'cap_pct': 35.0,
        'vol': 950, 'err_pct': 1.2, 'cost_err': 80.0,
        'rework_h': 30, 'rework_rate': 60.0, 'staffing': 'frontline',
        'delays_vol': 0, 'delays_cost': 0.0,
        'discounts_cnt': 0, 'discounts_val': 0.0,
        'dups_cnt': 0, 'dups_amt': 0.0, 'dups_unrec': 0.0,
        'penalties': 0.0, 'other': 0.0
    },
    'procurement': {
        'name': 'Procurement & Purchasing',
        'category': 'Operations',
        'emp': 9, 'hpd': 4.5, 'wd': 22, 'rate': 46.0,
        'ot': True, 'ot_h': 15, 'ot_rate': 69.0,
        'cap_pct': 30.0,
        'vol': 5500, 'err_pct': 2.5, 'cost_err': 50.0,
        'rework_h': 60, 'rework_rate': 50.0, 'staffing': 'frontline',
        'delays_vol': 0, 'delays_cost': 0.0,
        'discounts_cnt': 0, 'discounts_val': 0.0,
        'dups_cnt': 0, 'dups_amt': 0.0, 'dups_unrec': 0.0,
        'penalties': 0.0, 'other': 0.0
    },
    'order_proc': {
        'name': 'Order Processing',
        'category': 'Operations',
        'emp': 14, 'hpd': 5.0, 'wd': 22, 'rate': 38.0,
        'ot': True, 'ot_h': 35, 'ot_rate': 57.0,
        'cap_pct': 40.0,
        'vol': 14000, 'err_pct': 3.0, 'cost_err': 40.0,
        'rework_h': 90, 'rework_rate': 42.0, 'staffing': 'frontline',
        'delays_vol': 0, 'delays_cost': 0.0,
        'discounts_cnt': 0, 'discounts_val': 0.0,
        'dups_cnt': 0, 'dups_amt': 0.0, 'dups_unrec': 0.0,
        'penalties': 0.0, 'other': 0.0
    },
    'cust_service': {
        'name': 'Customer Service & Ticketing',
        'category': 'Operations',
        'emp': 16, 'hpd': 5.5, 'wd': 22, 'rate': 32.0,
        'ot': True, 'ot_h': 40, 'ot_rate': 48.0,
        'cap_pct': 45.0,
        'vol': 22000, 'err_pct': 3.5, 'cost_err': 25.0,
        'rework_h': 110, 'rework_rate': 36.0, 'staffing': 'frontline',
        'delays_vol': 0, 'delays_cost': 0.0,
        'discounts_cnt': 0, 'discounts_val': 0.0,
        'dups_cnt': 0, 'dups_amt': 0.0, 'dups_unrec': 0.0,
        'penalties': 0.0, 'other': 0.0
    },
    'inventory': {
        'name': 'Inventory Management',
        'category': 'Operations',
        'emp': 7, 'hpd': 4.0, 'wd': 22, 'rate': 36.0,
        'ot': False, 'ot_h': 0, 'ot_rate': 54.0,
        'cap_pct': 30.0,
        'vol': 8500, 'err_pct': 2.2, 'cost_err': 45.0,
        'rework_h': 55, 'rework_rate': 40.0, 'staffing': 'frontline',
        'delays_vol': 0, 'delays_cost': 0.0,
        'discounts_cnt': 0, 'discounts_val': 0.0,
        'dups_cnt': 0, 'dups_amt': 0.0, 'dups_unrec': 0.0,
        'penalties': 0.0, 'other': 0.0
    },
    'hr_ops': {
        'name': 'HR Operations',
        'category': 'Operations',
        'emp': 5, 'hpd': 3.5, 'wd': 22, 'rate': 42.0,
        'ot': False, 'ot_h': 0, 'ot_rate': 63.0,
        'cap_pct': 35.0,
        'vol': 1400, 'err_pct': 1.5, 'cost_err': 55.0,
        'rework_h': 30, 'rework_rate': 45.0, 'staffing': 'frontline',
        'delays_vol': 0, 'delays_cost': 0.0,
        'discounts_cnt': 0, 'discounts_val': 0.0,
        'dups_cnt': 0, 'dups_amt': 0.0, 'dups_unrec': 0.0,
        'penalties': 0.0, 'other': 0.0
    }
}

passed_assertions = 0
failed_assertions = 0

def check(condition, msg):
    global passed_assertions, failed_assertions
    if condition:
        passed_assertions += 1
        print(f"  [PASS] {msg}")
    else:
        failed_assertions += 1
        print(f"  [FAIL] {msg}")

def calculate_template_model(t, currency='USD', staffing_override=None):
    rate_factor = FX_RATES[currency]

    # Baseline labor
    annual_reg_hours = t['emp'] * t['hpd'] * t['wd'] * 12
    hourly_rate = t['rate'] * rate_factor
    annual_reg_labor = annual_reg_hours * hourly_rate

    ot_hours_annual = (t['ot_h'] * 12) if t['ot'] else 0
    ot_rate = t['ot_rate'] * rate_factor
    ot_cost_annual = ot_hours_annual * ot_rate if t['ot'] else 0
    total_annual_labor = annual_reg_labor + ot_cost_annual

    # Recoverable capacity
    rec_cap_hours = annual_reg_hours * (t['cap_pct'] / 100.0)
    rec_cap_val = rec_cap_hours * hourly_rate

    # Cost leakage
    err_annual = t['vol'] * (t['err_pct'] / 100.0) * (t['cost_err'] * rate_factor) * 12
    rework_hours_annual = t['rework_h'] * 12
    rework_rate = t['rework_rate'] * rate_factor
    rework_cost_annual = rework_hours_annual * rework_rate

    # Direct cash leakage items
    dups_annual = t['dups_cnt'] * (t['dups_amt'] * rate_factor) * (t['dups_unrec'] / 100.0) * 12
    penalties_annual = (t['penalties'] * rate_factor) * 12
    discounts_annual = t['discounts_cnt'] * (t['discounts_val'] * rate_factor) * 12
    direct_cash_leakage = dups_annual + penalties_annual + discounts_annual

    delays_annual = t['delays_vol'] * (t['delays_cost'] * rate_factor) * 12
    other_annual = (t['other'] * rate_factor) * 12

    # In app.js, M2 total annual leakage includes:
    # errors + rework + delays + discounts + duplicatePayments + penalties + otherLosses
    total_m2_leakage = (err_annual + rework_cost_annual + delays_annual +
                        discounts_annual + dups_annual + penalties_annual + other_annual)
    non_cash_leakage = max(0.0, total_m2_leakage - direct_cash_leakage)

    # Overlap staffing logic
    staffing = staffing_override if staffing_override else t.get('staffing', 'frontline')

    # Scenario B
    b_capex = 15000.0 * rate_factor
    b_opex = 5000.0 * rate_factor
    if rec_cap_val < round(total_annual_labor * 0.2):
        b_labor_savings = round(rec_cap_val * (20.0 / 35.0))
    else:
        b_labor_savings = round(total_annual_labor * 0.2)
    b_cap_hours = b_labor_savings / hourly_rate if hourly_rate > 0 else 0
    b_avoided_rework_h = rework_hours_annual * 0.50
    if staffing in ('frontline', 'unconfirmed'):
        b_overlap_adj = round(min(b_avoided_rework_h, b_cap_hours) * rework_rate)
    else:
        b_overlap_adj = 0.0

    b_leakage_savings = round(total_m2_leakage * 0.5)
    b_actual_cash = round(direct_cash_leakage * 0.5)
    b_gross = max(0.0, b_labor_savings + b_leakage_savings - b_overlap_adj)
    b_net = b_gross - b_opex
    b_first_year_net = b_net - b_capex
    b_roi = round((b_net / b_capex) * 100) if b_capex > 0 else 0
    b_first_year_roi = round((b_first_year_net / b_capex) * 100) if b_capex > 0 else 0
    b_breakeven = round((b_capex / (b_net / 12.0)) * 10) / 10 if b_net > 0 else 0

    if b_actual_cash > 0:
        net_cash_b = b_actual_cash - b_opex
        b_cash_roi = round(((net_cash_b - b_capex) / (b_capex + b_opex)) * 100)
        b_cash_payback = round((b_capex / (net_cash_b / 12.0)) * 10) / 10 if net_cash_b > 0 else 0
    else:
        b_cash_roi = 0
        b_cash_payback = 0

    # Scenario C (Copilot Studio benchmark: Capex 40k, Opex 13.4k in USD base)
    c_capex = 40000.0 * rate_factor
    c_opex = 13400.0 * rate_factor
    c_labor_savings = rec_cap_val
    c_cap_hours = rec_cap_hours
    c_avoided_rework_h = rework_hours_annual * 0.75
    if staffing in ('frontline', 'unconfirmed'):
        c_overlap_adj = round(min(c_avoided_rework_h, c_cap_hours) * rework_rate)
    else:
        c_overlap_adj = 0.0

    hard_cash = direct_cash_leakage * 0.8
    cost_avoidance = non_cash_leakage * 0.75
    c_leakage_savings = hard_cash + cost_avoidance
    c_gross = max(0.0, c_labor_savings + c_leakage_savings - c_overlap_adj)
    c_net = c_gross - c_opex
    c_first_year_net = c_net - c_capex
    c_roi = round((c_net / c_capex) * 100) if c_capex > 0 else 0
    c_first_year_roi = round((c_first_year_net / c_capex) * 100) if c_capex > 0 else 0
    c_breakeven = round((c_capex / (c_net / 12.0)) * 10) / 10 if c_net > 0 else 0

    if hard_cash > 0:
        net_cash_c = hard_cash - c_opex
        c_cash_roi = round(((net_cash_c - c_capex) / (c_capex + c_opex)) * 100)
        c_cash_payback = round((c_capex / (net_cash_c / 12.0)) * 10) / 10 if net_cash_c > 0 else 0
    else:
        c_cash_roi = 0
        c_cash_payback = 0

    return {
        'total_annual_labor': total_annual_labor,
        'annual_reg_hours': annual_reg_hours,
        'rec_cap_val': rec_cap_val,
        'total_m2_leakage': total_m2_leakage,
        'direct_cash_leakage': direct_cash_leakage,
        'b_gross': b_gross,
        'b_net': b_net,
        'b_roi': b_roi,
        'b_breakeven': b_breakeven,
        'b_cash_roi': b_cash_roi,
        'b_cash_payback': b_cash_payback,
        'c_gross': c_gross,
        'c_net': c_net,
        'c_roi': c_roi,
        'c_first_year_roi': c_first_year_roi,
        'c_breakeven': c_breakeven,
        'c_cash_roi': c_cash_roi,
        'c_cash_payback': c_cash_payback,
        'c_overlap_adj': c_overlap_adj,
        'hard_cash': hard_cash
    }

def main():
    print("=" * 70)
    print("PROCESSIQ V1.0 — 12-TEMPLATE CROSS-INDUSTRY CALCULATION VALIDATION")
    print("=" * 70)

    # 1. Validate All 12 Templates in USD Baseline
    print("\n>>> Phase 1: Validating Baseline Financial Governance for All 12 Templates...")
    for key, t in TEMPLATES.items():
        res = calculate_template_model(t, currency='USD')
        # Check regular labor is strictly positive
        check(res['total_annual_labor'] > 0, f"Template [{key}] '{t['name']}': Total Annual Labor is positive (${res['total_annual_labor']:,.2f})")
        # Check capacity value does not exceed total labor
        check(res['rec_cap_val'] < res['total_annual_labor'], f"Template [{key}]: Recoverable Capacity (${res['rec_cap_val']:,.2f}) < Total Labor (${res['total_annual_labor']:,.2f})")
        # Check Scenario C Gross Benefits is positive
        check(res['c_gross'] > 0, f"Template [{key}]: Scenario C Gross Benefits is positive (${res['c_gross']:,.2f})")
        # Check cash savings segregation: Only AP has positive direct cash savings by default
        if key == 'ap':
            check(res['direct_cash_leakage'] == 117840.0, f"AP Direct Cash Leakage matches $117,840.00 exact (got {res['direct_cash_leakage']})")
            check(res['hard_cash'] == 94272.0, f"AP Scenario C Direct Cash Savings matches $94,272.00 exact (got {res['hard_cash']})")
            check(res['c_cash_roi'] == 77, f"AP Scenario C First-Year Cash ROI is 77% exact (got {res['c_cash_roi']}%)")
            check(res['c_cash_payback'] == 5.9, f"AP Scenario C Cash Payback is 5.9 mo (got {res['c_cash_payback']} mo)")
        else:
            check(res['direct_cash_leakage'] == 0.0, f"Template [{key}]: Direct Cash Leakage is strictly $0.00 (non-cash operational leakage)")
            check(res['c_cash_roi'] == 0, f"Template [{key}]: Cash ROI is N/A (represented as 0, got {res['c_cash_roi']})")
            check(res['c_cash_payback'] == 0, f"Template [{key}]: Cash Payback is N/A (represented as 0, got {res['c_cash_payback']})")

    # 2. Mandatory AR Reconciliation (Conservative vs Separate)
    print("\n>>> Phase 2: Mandatory AR Overlap Reconciliation (Conservative vs Separate)...")
    ar_t = TEMPLATES['ar']
    # Conservative Frontline Overlap
    ar_cons = calculate_template_model(ar_t, currency='USD', staffing_override='frontline')
    # Capacity: 8 * 4 * 22 * 12 * 0.30 = 2534.4 hrs * $40 = $101,376
    check(ar_cons['rec_cap_val'] == 101376.0, f"AR Frontline Capacity Value: $101,376.00 (got {ar_cons['rec_cap_val']})")
    # Avoided rework: 50 * 12 * 0.75 = 450 hrs * $45 = $20,250
    check(ar_cons['c_overlap_adj'] == 20250.0, f"AR Overlap Deduction: $20,250.00 (got {ar_cons['c_overlap_adj']})")
    # Gross Benefit: $101,376 + avoided leakage ($42,768 + $20,250) - overlap ($20,250) = $144,144
    check(ar_cons['c_gross'] == 144144.0, f"AR Conservative Gross Economic Benefit: $144,144.00 (got {ar_cons['c_gross']})")
    check(ar_cons['c_net'] == 130744.0, f"AR Conservative Net Recurring Benefit: $130,744.00 (got {ar_cons['c_net']})")
    check(ar_cons['c_roi'] == 327, f"AR Conservative Recurring ROI: 327% (got {ar_cons['c_roi']}%)")
    check(ar_cons['c_first_year_roi'] == 227, f"AR Conservative First-Year ROI: 227% (got {ar_cons['c_first_year_roi']}%)")
    check(ar_cons['c_breakeven'] == 3.7, f"AR Conservative Productivity Breakeven: 3.7 mo (got {ar_cons['c_breakeven']} mo)")

    # Separate Specialist Team (Additive)
    ar_sep = calculate_template_model(ar_t, currency='USD', staffing_override='separate')
    check(ar_sep['c_overlap_adj'] == 0.0, f"AR Separate Team Overlap Deduction: $0.00 (got {ar_sep['c_overlap_adj']})")
    check(ar_sep['c_gross'] == 164394.0, f"AR Separate Team Gross Benefit: $164,394.00 ($144,144 + $20,250 rework additive, got {ar_sep['c_gross']})")

    # 3. Currency Invariance Across 7 Currencies for all 12 Templates
    print("\n>>> Phase 3: Seven-Currency Invariant Verification Across All 12 Templates...")
    for key, t in TEMPLATES.items():
        base_res = calculate_template_model(t, currency='USD')
        for c_code in ['EUR', 'GBP', 'CAD', 'AUD', 'INR', 'JPY']:
            conv_res = calculate_template_model(t, currency=c_code)
            # Invariant 1: ROI % must be strictly identical regardless of currency
            check(conv_res['c_roi'] == base_res['c_roi'],
                  f"Template [{key}] ROI invariance under {c_code}: {conv_res['c_roi']}% == {base_res['c_roi']}%")
            # Invariant 2: Breakeven months must be strictly identical regardless of currency
            check(conv_res['c_breakeven'] == base_res['c_breakeven'],
                  f"Template [{key}] Breakeven invariance under {c_code}: {conv_res['c_breakeven']} mo == {base_res['c_breakeven']} mo")
            # Invariant 3: Cash ROI invariance (for AP)
            if key == 'ap':
                check(conv_res['c_cash_roi'] == base_res['c_cash_roi'],
                      f"AP Cash ROI invariance under {c_code}: {conv_res['c_cash_roi']}% == {base_res['c_cash_roi']}%")
                check(conv_res['c_cash_payback'] == base_res['c_cash_payback'],
                      f"AP Cash Payback invariance under {c_code}: {conv_res['c_cash_payback']} mo == {base_res['c_cash_payback']} mo")

    print("\n" + "=" * 70)
    print(f"CROSS-TEMPLATE VALIDATION SUMMARY: {passed_assertions} PASSED, {failed_assertions} FAILED")
    print("=" * 70)
    if failed_assertions > 0:
        sys.exit(1)
    else:
        sys.exit(0)

if __name__ == '__main__':
    main()
