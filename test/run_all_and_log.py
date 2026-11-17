import subprocess
import os
import sys
import datetime

script_dir = os.path.dirname(os.path.abspath(__file__))
workspace = os.path.dirname(script_dir) if os.path.basename(script_dir) == "test" else script_dir
test_dir = script_dir if os.path.basename(script_dir) == "test" else os.path.join(workspace, "test")
python_exe = sys.executable

suites = [
    ("test_runner.py", "Core Mathematical Engine Tests (M1, M2, M3, M4, Consolidator)"),
    ("scenario_audit_test.py", "Scenario Modeling & Mathematical Reconciliation (A vs B vs C)"),
    ("dynamic_data_validation.py", "Dynamic Print Report & Currency Re-Rendering Validation"),
    ("m3_readiness_comprehensive_test.py", "Module 3 AI Readiness Browser State & Interaction Audit"),
    ("run_chrome_tests.py", "Headless Chrome Browser Integration & Custom Pricing Audit"),
    ("master_e2e_release_test.py", "Master End-to-End User Journey (All 15 Steps)"),
    ("generate_and_audit_detailed_pdf.py", "Detailed 10-Page Business Case PDF Generation & Binary Audit"),
    ("treasury_ar_reconciliation_test.py", "Treasury & AR Mathematical Reconciliation & 10-Page PDF Verification"),
    ("security_scanner.py", "Automated Static Security & Secret Analysis Scan"),
    ("business_analyst_qa_test.py", "Business Analyst Review, Currency Consistency & Module 4 Pricing Audit"),
    ("financial_governance_validation_test.py", "Independent Financial Governance, Anti-Double-Counting & ROI Audit"),
    ("global_currency_conversion_test.py", "Global Currency Conversion 5-Step Cycle & 10 Rules Validation"),
    ("cross_template_validation_engine.py", "12-Template Cross-Industry Financial Calculation & Currency Invariance Validation"),
    ("production_readiness_comprehensive_test.py", "Production Readiness, Deployment Caching, Persistence & Edge Cases")
]

log_lines = []
log_lines.append("======================================================================")
log_lines.append("PROCESSIQ v1.0 — FINAL COMPREHENSIVE AUTOMATED TEST AUDIT LOG")
log_lines.append(f"Generated: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
log_lines.append("Workspace: ProcessIQ Enterprise Project Root")
log_lines.append("======================================================================\n")

total_passed = 0
total_failed = 0
all_success = True

for script_name, desc in suites:
    script_path = os.path.join(test_dir, script_name)
    log_lines.append(f">>> Executing: {script_name} ({desc})")
    res = subprocess.run([python_exe, script_path], capture_output=True, text=True, cwd=workspace)
    log_lines.append(res.stdout.strip())
    if res.stderr.strip():
        log_lines.append("STDERR:\n" + res.stderr.strip())
    log_lines.append(f"Return Code: {res.returncode}\n")
    if res.returncode != 0:
        all_success = False
        total_failed += 1
    else:
        total_passed += 1

log_lines.append("======================================================================")
log_lines.append(f"ALL TEST SUITES SUMMARY: {total_passed} PASSED, {total_failed} FAILED")
status_msg = "RELEASE READY (100% SUCCESS)" if all_success else "FAILURES DETECTED"
log_lines.append(f"FINAL STATUS: {status_msg}")
log_lines.append("======================================================================")

log_content = "\n".join(log_lines)
out_log = os.path.join(test_dir, "FINAL_TEST_AUDIT_LOG.txt")
with open(out_log, "w", encoding="utf-8") as f:
    f.write(log_content)

print(f"Test log successfully written to: {out_log}")
print(f"Suites passed: {total_passed} / {len(suites)}")
if not all_success:
    print(f"FAILED: {total_failed} test suite(s) failed!")
    sys.exit(1)
else:
    print(f"SUCCESS: All {total_passed} test suites passed with exit code 0.")
    sys.exit(0)
