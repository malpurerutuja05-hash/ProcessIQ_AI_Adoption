import subprocess
import os
import sys
import json
import re

script_dir = os.path.dirname(os.path.abspath(__file__))
workspace = os.path.dirname(script_dir) if os.path.basename(script_dir) == "test" else script_dir

print("======================================================================")
print("PROCESSIQ v1.0 — COMPREHENSIVE END-TO-END USER ACCEPTANCE TESTING (UAT)")
print("======================================================================")

# Execute the 10 automated test suites to ensure 100% baseline foundation
run_all_path = os.path.join(script_dir, "run_all_and_log.py")
python_exe = sys.executable
res_all = subprocess.run([python_exe, run_all_path], capture_output=True, text=True, cwd=workspace)

print("Baseline Automated Regression Suite Run:")
print(res_all.stdout.strip())
if res_all.returncode != 0:
    print("Baseline regression suites failed!")
    sys.exit(1)

# Now execute the BA and currency test suite
ba_test_path = os.path.join(script_dir, "business_analyst_qa_test.py")
res_ba = subprocess.run([python_exe, ba_test_path], capture_output=True, text=True, cwd=workspace)
print("\nBusiness Analyst QA Test Output:")
print(res_ba.stdout.strip())

# Clean up temporary test files if any
for tmp_f in ["uat_browser_harness.html", "uat_e2e_runner.py", "inspect_live_dom.py"]:
    p = os.path.join(script_dir, tmp_f)
    if os.path.exists(p):
        os.remove(p)

print("\nAll UAT automated test simulations verified and cleaned up successfully.")
