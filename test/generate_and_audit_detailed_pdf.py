import subprocess
import os
import base64
import json
import sys
import re
import shutil

script_dir = os.path.dirname(os.path.abspath(__file__))
workspace = os.path.dirname(script_dir) if os.path.basename(script_dir) == "test" else script_dir
chrome_path = (
    os.environ.get("CHROME_PATH")
    or shutil.which("chrome")
    or shutil.which("google-chrome")
    or r"C:\Program Files\Google\Chrome\Application\chrome.exe"
)
pdf_out_path = os.path.join(workspace, "ProcessIQ_Detailed_Business_Case_Demo.pdf")

html_harness = """<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="test/vendor/jspdf.umd.min.js"></script>
  <script src="test/vendor/jspdf.plugin.autotable.min.js"></script>
</head>
<body>
  <div id="results">INITIALIZING</div>
  <script src="app.js"></script>
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      try {
        loadSampleData();

        let filename = '';
        let b64 = '';

        const origSave = window.jspdf.jsPDF.API.save;
        window.jspdf.jsPDF.API.save = function(name) {
          filename = name;
          const uri = this.output('datauristring');
          b64 = uri.split(',')[1];
        };

        downloadPDF();
        window.jspdf.jsPDF.API.save = origSave;

        const res = {
          success: true,
          filename: filename,
          b64: b64,
          len: b64.length
        };
        document.getElementById('results').textContent = JSON.stringify(res);
      } catch (err) {
        document.getElementById('results').textContent = JSON.stringify({ success: false, error: err.message, stack: err.stack });
      }
    });
  </script>
</body>
</html>"""

harness_file = os.path.join(workspace, "test_gen_harness.html")
with open(harness_file, "w", encoding="utf-8") as f:
    f.write(html_harness)

cmd = [
    chrome_path,
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--dump-dom",
    f"file:///{harness_file.replace(os.sep, '/')}"
]

res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8")
if os.path.exists(harness_file):
    os.remove(harness_file)

marker = '<div id="results">'
s_idx = res.stdout.find(marker)
if s_idx == -1:
    print("[FAIL] Results marker not found in DOM")
    sys.exit(1)

e_idx = res.stdout.find('</div>', s_idx)
data = json.loads(res.stdout[s_idx + len(marker):e_idx])

if not data.get("success"):
    print(f"[FAIL] PDF Generation Error: {data.get('error')}\n{data.get('stack')}")
    sys.exit(1)

b64 = data["b64"]
pdf_bytes = base64.b64decode(b64)
with open(pdf_out_path, "wb") as f:
    f.write(pdf_bytes)

size = len(pdf_bytes)
print("======================================================================")
print("PROCESSIQ DETAILED BUSINESS CASE PDF GENERATION & AUDIT")
print("======================================================================")
print(f"[PASS] Successfully generated: {os.path.basename(pdf_out_path)}")
print(f"       File Size: {size} bytes ({size/1024:.1f} KB)")
print(f"       Report Filename: {data['filename']}")

# Inspect the generated PDF binary content
text_content = pdf_bytes.decode('latin-1', errors='ignore')

# 1. Page Count Verification
page_count = len(re.findall(r'/Type\s*/Page\b', text_content))
print(f"[PASS] Page Count: {page_count} pages (Expected: 10)")
assert page_count >= 10, f"Expected at least 10 pages, got {page_count}"

# 2. Key Header, Attribution & Financial Verification
assertions = [
    ("PROCESSIQ", "ProcessIQ Platform Branding"),
    ("Know your process cost before you invest in AI.", "Mandatory Tagline"),
    ("Enterprise Solutions Architecture", "Solutions Architecture Attribution"),
    ("DEMONSTRATION SAMPLE REPORT", "Sample Demonstration Mode Badge"),
    ("Accounts Payable", "Evaluated Target Process"),
    ("Finance & Shared Services", "Evaluated Department"),
    ("Executive Summary", "Page 2 Executive Summary Header"),
    ("Process Information & Key Assumptions", "Page 3 Assumptions Header"),
    ("Module 1: Hidden Cost of Manual Work", "Page 4 Module 1 Header"),
    ("Important Capacity Recovery Distinction", "Module 1 Capacity Recovery Distinction"),
    ("Module 2: Where Is My Process Losing Money?", "Page 5 Module 2 Header"),
    ("Anti-Double Counting", "Module 2 Anti-Double Counting Governance"),
    ("Module 3: Is My Process AI-Ready?", "Page 6 Module 3 Header"),
    ("Overall AI Readiness Score: 60 / 100", "Module 3 Readiness Score (60/100)"),
    ("Automation/AI Candidate", "Module 3 Maturity Classification"),
    ("Module 4: Enterprise AI Investment Comparator", "Page 7 Module 4 Header"),
    ("Microsoft 365 Copilot", "Module 4 Vendor 1 (M365 Copilot)"),
    ("Microsoft Copilot Studio", "Module 4 Vendor 2 (Copilot Studio)"),
    ("Claude Enterprise", "Module 4 Vendor 3 (Claude Enterprise)"),
    ("Custom AI Agent", "Module 4 Vendor 4 (Custom AI Agent)"),
    (r"Consolidated Scenario Modeling \(A vs B vs C\)", "Page 8 Scenario Comparison Header"),
    ("Recommended 30-Day Tactical Roadmap", "Page 9 30-Day Roadmap Header"),
    ("Calculation Methodology, Sources & Disclaimers", "Page 10 Methodology & Sources Header"),
    ("Zero Cloud Data Transmission", "Cover Page Privacy Notice"),
    ("All calculations, transformations, and document compilations were executed in-memory", "Methodology Privacy Disclaimer"),
    ("617,652", "Baseline Labor Cost ($617,652)"),
    ("340,200", "Baseline Leakage Cost ($340,200)"),
    ("957,852", "Total Baseline Run-Rate ($957,852)"),
    ("293,630", "Scenario B Gross Savings ($293,630)"),
    ("288,630", "Scenario B Net Annual Benefit ($288,630)"),
    ("477,220", "Scenario C Gross Savings ($477,220)"),
    ("463,820", "Scenario C Net Annual Benefit ($463,820)"),
    ("423,820", "Scenario C First-Year Net Benefit ($423,820)"),
    ("1160%", "Scenario C Recurring ROI (1,160%)"),
    ("1.0", "Scenario C Payback Period (1.0 mo)")
]

passed_asserts = 0
for needle, desc in assertions:
    if needle in text_content:
        print(f"  [PASS] {desc}: Found '{needle}'")
        passed_asserts += 1
    else:
        print(f"  [FAIL] {desc}: Missing '{needle}'")

print("----------------------------------------------------------------------")
print(f"PDF CONTENT AUDIT SUMMARY: {passed_asserts} / {len(assertions)} VERIFIED")
print("======================================================================")

sys.exit(0 if passed_asserts == len(assertions) else 1)
