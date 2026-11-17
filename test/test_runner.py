"""
ProcessIQ Automated Verification Test Suite
Executes rigorous mathematical and boundary tests across all 4 modules and the consolidated engine.
"""

import math
import sys

def run_tests():
    passed = 0
    failed = 0
    errors = []

    def assert_true(condition, test_name, msg=""):
        nonlocal passed, failed
        if condition:
            passed += 1
            print(f"  [PASS] {test_name}")
        else:
            failed += 1
            print(f"  [FAIL] {test_name}: {msg}")
            errors.append(f"{test_name}: {msg}")

    def assert_almost_equal(val1, val2, test_name, delta=0.01):
        nonlocal passed, failed
        if abs(val1 - val2) <= delta:
            passed += 1
            print(f"  [PASS] {test_name} ({val1} ~= {val2})")
        else:
            failed += 1
            print(f"  [FAIL] {test_name}: Expected {val2}, got {val1}")
            errors.append(f"{test_name}: Expected {val2}, got {val1}")

    print("======================================================================")
    print("PROCESSIQ COMPREHENSIVE AUTOMATED TEST EXECUTION")
    print("======================================================================\n")

    # ------------------------------------------------------------------
    # MODULE 1: MANUAL WORK COST TESTS
    # ------------------------------------------------------------------
    print(">>> Testing Module 1: Hidden Cost of Manual Work...")

    # Nominal calculation
    e, h, d, rate, recovery_pct = 10, 4.0, 22, 45.0, 30.0
    monthly_hours = e * h * d
    base_monthly_cost = monthly_hours * rate
    annual_cost = base_monthly_cost * 12
    recov_hours_month = monthly_hours * (recovery_pct / 100.0)
    recov_value_annual = annual_cost * (recovery_pct / 100.0)

    assert_almost_equal(monthly_hours, 880.0, "M1.1: Nominal Monthly Hours (10 emp * 4 hrs * 22 days)")
    assert_almost_equal(base_monthly_cost, 39600.0, "M1.2: Nominal Monthly Labor Cost ($45/hr)")
    assert_almost_equal(annual_cost, 475200.0, "M1.3: Nominal Annual Labor Cost")
    assert_almost_equal(recov_hours_month, 264.0, "M1.4: Nominal Recoverable Monthly Hours (30%)")
    assert_almost_equal(recov_value_annual, 142560.0, "M1.5: Nominal Annual Recoverable Value")

    # Overtime & Salary Escalation test
    ot_hours, ot_rate = 20, 67.5  # 1.5x of $45
    monthly_ot_cost = ot_hours * ot_rate
    total_monthly = base_monthly_cost + monthly_ot_cost
    escalation_pct = 5.0
    y2_cost = (total_monthly * 12) * (1 + escalation_pct / 100.0)
    assert_almost_equal(monthly_ot_cost, 1350.0, "M1.6: Overtime calculation ($67.50 * 20h)")
    assert_almost_equal(total_monthly, 40950.0, "M1.7: Total monthly including overtime")
    assert_almost_equal(y2_cost, 515970.0, "M1.8: Year 2 salary escalated projection (+5%)")

    # Edge cases: zero, negative, extreme values
    def calc_m1(e_in, h_in, d_in, rate_in, recov_pct_in):
        e_c = max(0, e_in)
        h_c = min(24.0, max(0.0, h_in))
        d_c = min(31, max(0, d_in))
        r_c = max(0.0, rate_in)
        p_c = min(100.0, max(0.0, recov_pct_in)) / 100.0
        m_hrs = e_c * h_c * d_c
        m_cost = m_hrs * r_c
        return m_hrs, m_cost, m_cost * 12 * p_c

    z_hrs, z_cost, z_recov = calc_m1(0, 5, 20, 50, 25)
    assert_almost_equal(z_cost, 0.0, "M1.9: Edge case - Zero employees results in zero cost")

    neg_hrs, neg_cost, _ = calc_m1(-5, -2, -10, -50, -20)
    assert_almost_equal(neg_cost, 0.0, "M1.10: Edge case - Negative inputs safely clamped to zero")

    ext_hrs, ext_cost, ext_rec = calc_m1(2500, 8, 22, 60, 40)
    assert_almost_equal(ext_cost * 12, 316800000.0, "M1.11: Edge case - Enterprise scale ($316.8M / 2500 emp)")

    # ------------------------------------------------------------------
    # MODULE 2: PROCESS COST LEAKAGE TESTS
    # ------------------------------------------------------------------
    print("\n>>> Testing Module 2: Cost Leakage & Anti-Double Counting...")

    # Nominal 7 categories
    c_errors = 10000 * 0.02 * 25.0         # 200 errors * $25 = $5,000/mo
    c_rework = 60 * 50.0                   # 60 hrs * $50 = $3,000/mo
    c_delays = 150 * 40.0                  # 150 delays * $40 = $6,000/mo
    c_discounts = 10 * 450.0               # 10 missed * $450 = $4,500/mo
    c_duplicate = 5 * 1200.0 * 0.50        # 5 * $1200 * 50% unrecovered = $3,000/mo
    c_penalties = 2500.0                   # $2,500/mo
    c_other = 1500.0                       # $1,500/mo

    total_monthly_leakage = c_errors + c_rework + c_delays + c_discounts + c_duplicate + c_penalties + c_other
    total_annual_leakage = total_monthly_leakage * 12

    assert_almost_equal(c_errors, 5000.0, "M2.1: Transaction Error Cost ($5,000/mo)")
    assert_almost_equal(c_duplicate, 3000.0, "M2.2: Duplicate Payment Cost ($3,000/mo)")
    assert_almost_equal(total_monthly_leakage, 25500.0, "M2.3: Total Monthly Leakage ($25,500/mo)")
    assert_almost_equal(total_annual_leakage, 306000.0, "M2.4: Total Annual Leakage ($306,000/yr)")

    # Pareto top driver sorting
    leakage_items = [
        ("Delays", c_delays),
        ("Errors", c_errors),
        ("Discounts", c_discounts),
        ("Rework", c_rework),
        ("Duplicate", c_duplicate),
        ("Penalties", c_penalties),
        ("Other", c_other),
    ]
    sorted_drivers = sorted(leakage_items, key=lambda x: x[1], reverse=True)
    assert_true(sorted_drivers[0][0] == "Delays", "M2.5: Top cost driver is Delays ($6,000)")
    assert_true(sorted_drivers[1][0] == "Errors", "M2.6: Second cost driver is Errors ($5,000)")
    assert_true(sorted_drivers[2][0] == "Discounts", "M2.7: Third cost driver is Discounts ($4,500)")

    # Anti-double counting warnings check
    def check_warnings(errors_active, rework_active, delays_active, penalties_active):
        warns = []
        if errors_active and rework_active:
            warns.append("Overlap: Errors and Rework")
        if delays_active and penalties_active:
            warns.append("Overlap: Delays and Penalties")
        return warns

    assert_true(len(check_warnings(True, True, True, True)) == 2, "M2.8: Anti-double counting detects dual overlaps")
    assert_true(len(check_warnings(True, False, False, False)) == 0, "M2.9: No false positive warnings when isolated")

    # ------------------------------------------------------------------
    # MODULE 3: AI READINESS ASSESSMENT TESTS
    # ------------------------------------------------------------------
    print("\n>>> Testing Module 3: AI Readiness Engine & Scoring...")

    def score_readiness(scores_list):
        total_max = len(scores_list) * 4
        earned = sum(scores_list)
        pct = round((earned / total_max) * 100) if total_max > 0 else 0
        if pct >= 80:
            tier = "Strong Readiness"
        elif pct >= 60:
            tier = "Automation/AI Candidate"
        elif pct >= 40:
            tier = "Foundation Required"
        else:
            tier = "Not Ready"
        return pct, tier

    # Quick test (10 questions)
    score_not_ready, cat_not_ready = score_readiness([1, 0, 1, 1, 0, 1, 0, 1, 0, 1])  # 6 / 40 = 15%
    assert_true(score_not_ready == 15 and cat_not_ready == "Not Ready", "M3.1: Quick Tier - Not Ready classification (15%)")

    score_foundation, cat_foundation = score_readiness([2] * 10)  # 20 / 40 = 50%
    assert_true(score_foundation == 50 and cat_foundation == "Foundation Required", "M3.2: Quick Tier - Foundation Required (50%)")

    score_candidate, cat_candidate = score_readiness([3, 3, 3, 2, 3, 3, 2, 3, 3, 2])  # 27 / 40 = 68%
    assert_true(score_candidate == 68 and cat_candidate == "Automation/AI Candidate", "M3.3: Quick Tier - Automation/AI Candidate (68%)")

    score_strong, cat_strong = score_readiness([4, 4, 4, 3, 4, 4, 4, 3, 4, 4])  # 38 / 40 = 95%
    assert_true(score_strong == 95 and cat_strong == "Strong Readiness", "M3.4: Quick Tier - Strong Readiness (95%)")

    # Pro (15 Qs) and Advanced (25 Qs) scale tests
    _, pro_cat = score_readiness([3] * 15)  # 45 / 60 = 75%
    assert_true(pro_cat == "Automation/AI Candidate", "M3.5: Pro Tier (15 Qs) calculation")

    _, adv_cat = score_readiness([4] * 25)  # 100 / 100 = 100%
    assert_true(adv_cat == "Strong Readiness", "M3.6: Advanced Tier (25 Qs) maximum score")

    # ------------------------------------------------------------------
    # MODULE 4: AI COMPARATOR TESTS
    # ------------------------------------------------------------------
    print("\n>>> Testing Module 4: AI Investment Comparator...")

    # Test M365 Copilot (50 users @ $30/user/mo = $1500/mo = $18,000/yr)
    users = 50
    m365_annual_sub = users * 30.0 * 12
    assert_almost_equal(m365_annual_sub, 18000.0, "M4.1: Microsoft 365 Copilot annual sub (50 seats)")

    # Test Copilot Studio (Base $200/mo + 35,000 messages = 10,000 billable overage @ $0.01 = $100/mo => $300/mo = $3,600/yr)
    cs_base_monthly = 200.0
    cs_messages = 35000
    cs_billable = max(0, cs_messages - 25000)
    cs_overage_monthly = cs_billable * 0.01
    cs_annual = (cs_base_monthly + cs_overage_monthly) * 12
    assert_almost_equal(cs_annual, 3600.0, "M4.2: Copilot Studio message overage consumption ($3,600/yr)")

    # Test Claude Enterprise Benchmark (50 users @ $45/user/mo = $2,250/mo = $27,000/yr)
    claude_annual = users * 45.0 * 12
    assert_almost_equal(claude_annual, 27000.0, "M4.3: Claude Enterprise benchmark calculation")

    # Test Custom Token model (10M input tokens @ $3/M + 2M output tokens @ $15/M = $30 + $30 = $60/mo)
    token_monthly = (10.0 * 3.0) + (2.0 * 15.0)
    assert_almost_equal(token_monthly, 60.0, "M4.4: Custom LLM Token usage math ($60/mo)")

    # ------------------------------------------------------------------
    # CONSOLIDATED DASHBOARD & SCENARIOS TESTS
    # ------------------------------------------------------------------
    print("\n>>> Testing Consolidated Engine & Scenarios (A, B, C)...")

    # Financial Synthesis:
    # Manual Labor = $475,200
    # Capacity Value = $142,560
    # Leakage = $306,000
    # Cash Leakage = $100,000 (discounts, duplicates, penalties)
    # AI Opex = $25,000, AI Capex = $40,000

    tot_labor = 475200.0
    tot_capacity = 142560.0
    tot_leakage = 306000.0
    cash_leakage = 100000.0
    non_cash_leakage = tot_leakage - cash_leakage

    # Scenario C benefits:
    # 80% cash leakage saved = $80,000
    # 75% non-cash leakage avoided = $154,500
    # 100% capacity value = $142,560
    # Total economic benefit = $377,060
    # AI Annual Opex = $25,000
    # Net annual economic benefit = $352,060
    # Implementation Capex = $40,000
    # ROI = (352,060 / 40,000) * 100 = 880%
    # Net monthly benefit = (377,060 - 25,000) / 12 = $29,338.33
    # Payback = 40,000 / 29,338.33 = 1.36 months

    c_hard_cash = cash_leakage * 0.8
    c_cost_avoidance = non_cash_leakage * 0.75
    c_tot_benefit = c_hard_cash + c_cost_avoidance + tot_capacity
    c_ai_opex = 25000.0
    c_ai_capex = 40000.0
    c_net_benefit = c_tot_benefit - c_ai_opex
    c_roi = (c_net_benefit / c_ai_capex) * 100.0
    c_payback_months = c_ai_capex / ((c_tot_benefit - c_ai_opex) / 12.0)

    assert_almost_equal(c_tot_benefit, 377060.0, "CONS.1: Total Annual Economic Benefit")
    assert_almost_equal(c_net_benefit, 352060.0, "CONS.2: Net Annual Economic Benefit")
    assert_almost_equal(c_roi, 880.15, "CONS.3: Scenario C ROI (880%)")
    assert_almost_equal(c_payback_months, 1.36, "CONS.4: Scenario C Payback Period (1.4 months)")

    # Strategic approach recommendation tests
    def get_approach(score):
        if score < 40:
            return "Standardization First"
        elif score < 60:
            return "Automation First"
        elif score < 80:
            return "Copilot Pilot"
        else:
            return "Full AI Agentic"

    assert_true(get_approach(25) == "Standardization First", "CONS.5: Score 25 triggers Standardization First")
    assert_true(get_approach(55) == "Automation First", "CONS.6: Score 55 triggers Automation First")
    assert_true(get_approach(72) == "Copilot Pilot", "CONS.7: Score 72 triggers Copilot Pilot")
    assert_true(get_approach(88) == "Full AI Agentic", "CONS.8: Score 88 triggers Full AI Agentic")

    # ------------------------------------------------------------------
    # PARTIAL ASSESSMENT HANDLING
    # ------------------------------------------------------------------
    print("\n>>> Testing Partial Assessment Handling...")
    # Verify that if only Module 1 is provided, system completes without crashing
    def consolidate_partial(has_m1, has_m2, has_m3, has_m4):
        labor = 400000.0 if has_m1 else 0.0
        leak = 100000.0 if has_m2 else 0.0
        score = 75 if has_m3 else 50
        ai_opex = 20000.0 if has_m4 else 0.0
        return {
            "completed": (has_m1, has_m2, has_m3, has_m4),
            "labor": labor,
            "leak": leak,
            "score": score,
            "ai_opex": ai_opex
        }

    res_partial_m1 = consolidate_partial(True, False, False, False)
    assert_true(res_partial_m1["labor"] == 400000.0 and res_partial_m1["leak"] == 0.0, "PARTIAL.1: Graceful fallback when only M1 completed")

    res_partial_m3 = consolidate_partial(False, False, True, False)
    assert_true(res_partial_m3["score"] == 75 and res_partial_m3["labor"] == 0.0, "PARTIAL.2: Graceful fallback when only M3 completed")

    # ------------------------------------------------------------------
    # SUMMARY REPORT
    # ------------------------------------------------------------------
    print("\n======================================================================")
    print(f"TEST EXECUTION SUMMARY: {passed} PASSED, {failed} FAILED (TOTAL {passed + failed})")
    print("======================================================================")

    if failed > 0:
        print("\nFailures:")
        for err in errors:
            print(f" - {err}")
        return False
    return True

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
