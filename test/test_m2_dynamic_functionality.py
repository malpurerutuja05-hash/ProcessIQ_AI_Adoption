import os
import sys
import subprocess
import json

def run():
    print("Testing Module 2 Dynamic Cost Leakage Activation...")
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    
    test_html = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body>
  <div id="submodule-cost-leakage">
    <input type="number" id="in-m2-err-vol" value="2800">
    <input type="number" id="in-m2-err-rate" value="1.8">
    <input type="number" id="in-m2-err-cost" value="65">
    <input type="number" id="in-m2-rework-hrs" value="40">
    <input type="number" id="in-m2-rework-rate" value="55">
    <select id="in-m2-rework-staffing"><option value="frontline">Frontline</option></select>
    <input type="number" id="in-m2-delays-vol" value="0">
    <input type="number" id="in-m2-delays-cost" value="0">
    <input type="number" id="in-m2-disc-count" value="0">
    <input type="number" id="in-m2-disc-val" value="0">
    <input type="number" id="in-m2-dup-count" value="0">
    <input type="number" id="in-m2-dup-amt" value="0">
    <input type="number" id="in-m2-penalties" value="0">
    <div id="m2-monthly-leakage"></div>
    <div id="m2-annual-leakage"></div>
    <div id="m2-top-driver"></div>
    <div id="m2-warnings"></div>
    <canvas id="m2Chart"></canvas>
  </div>
  <div id="currency-select"></div>
  <div id="print-executive-report"></div>
  <script>
    // Mock Chart.js
    window.Chart = function(ctx, config) {
      this.ctx = ctx;
      this.config = config;
      this.data = config.data;
      this.options = config.options;
      this.destroy = function() {};
    };
  </script>
  <script src="../app.js"></script>
  <script>
    window.__TEST_LOG__ = [];
    function check(cond, msg) {
      if (cond) {
        window.__TEST_LOG__.push('[PASS] ' + msg);
      } else {
        window.__TEST_LOG__.push('[FAIL] ' + msg);
      }
    }

    try {
      // 1. Initial State: AP Sample Data (USD)
      loadSampleData();
      const apLeakage = runCostLeakageCalculations();
      check(apLeakage.items.length === 7, 'AP benchmark has all 7 leakage items');
      check(Math.round(apLeakage.totalAnnual) === 340200, 'AP total annual leakage is exactly 340,200 (got ' + Math.round(apLeakage.totalAnnual) + ')');

      // 2. Select General Ledger Closing (non-AP template)
      selectProcessTemplate('gl');
      const glInitial = runCostLeakageCalculations();
      check(glInitial.items.length === 2, 'GL initially has only 2 items (Errors & Rework), got ' + glInitial.items.length);
      check(glInitial.items[0].id === 'errors', 'GL item 0 is errors');
      check(glInitial.items[1].id === 'rework', 'GL item 1 is rework');
      
      // Render Module 2 and check chart
      renderModule2();
      check(ProcessIQ.charts.m2 !== null, 'Chart.js instance created for GL');
      check(ProcessIQ.charts.m2.data.labels.length === 2, 'Chart initially has 2 bars (got ' + ProcessIQ.charts.m2.data.labels.length + ')');
      check(ProcessIQ.charts.m2.data.labels[0] === 'Errors', 'Bar 0 label is Errors (got ' + ProcessIQ.charts.m2.data.labels[0] + ')');
      check(ProcessIQ.charts.m2.data.labels[1] === 'Rework', 'Bar 1 label is Rework (got ' + ProcessIQ.charts.m2.data.labels[1] + ')');

      // 3. User Enters Values in Missed Discounts & Duplicate Payments (Matching user screenshot)
      // Missed Discounts: 1 count, $100
      ProcessIQ.costLeakage.missedDiscounts.monthlyMissedCount = 1;
      ProcessIQ.costLeakage.missedDiscounts.avgDiscountValue = 100;
      // Duplicate Payments: 100 count, $50
      ProcessIQ.costLeakage.duplicatePayments.monthlyDuplicateCount = 100;
      ProcessIQ.costLeakage.duplicatePayments.avgDuplicateAmount = 50;
      
      renderModule2();
      const glDynamic = runCostLeakageCalculations();
      check(glDynamic.items.length === 4, 'After entering discounts and duplicates, items has 4 items (got ' + glDynamic.items.length + ')');
      
      const discItem = glDynamic.items.find(i => i.id === 'missedDiscounts');
      check(discItem && discItem.monthly === 100, 'Missed discounts calculated: $100/mo ($1,200/yr)');
      
      const dupItem = glDynamic.items.find(i => i.id === 'duplicatePayments');
      check(dupItem && dupItem.monthly === 2000, 'Duplicate payments calculated: $2,000/mo ($24,000/yr) using 40% unrecovered');

      // Check Chart after update
      check(ProcessIQ.charts.m2.data.labels.length === 4, 'Chart dynamically updated to 4 bars (got ' + ProcessIQ.charts.m2.data.labels.length + ')');
      check(ProcessIQ.charts.m2.data.labels.includes('Discounts'), 'Chart contains Discounts bar');
      check(ProcessIQ.charts.m2.data.labels.includes('Duplicates'), 'Chart contains Duplicates bar');

      // Check Financial Consolidated calculations: Direct Cash Leakage
      const cData = runConsolidatedCalculations();
      check(cData.hardCashSavings === 20160, 'Scenario C hard cash savings is 80% of direct cash ($25,200 * 0.8 = $20,160) (got ' + cData.hardCashSavings + ')');
      check(cData.scenarios[1].actualCashSavings === 12600, 'Scenario B actual cash savings is 50% of direct cash ($25,200 * 0.5 = $12,600) (got ' + cData.scenarios[1].actualCashSavings + ')');

      // 4. Test Clearing values back to 0
      ProcessIQ.costLeakage.missedDiscounts.monthlyMissedCount = 0;
      ProcessIQ.costLeakage.missedDiscounts.avgDiscountValue = 0;
      ProcessIQ.costLeakage.duplicatePayments.monthlyDuplicateCount = 0;
      ProcessIQ.costLeakage.duplicatePayments.avgDuplicateAmount = 0;
      renderModule2();
      const glCleared = runCostLeakageCalculations();
      check(glCleared.items.length === 2, 'After clearing back to 0, items returns to 2 items (got ' + glCleared.items.length + ')');
      check(ProcessIQ.charts.m2.data.labels.length === 2, 'Chart returns to 2 bars after clearing');

    } catch (e) {
      window.__TEST_LOG__.push('[ERROR] ' + e.message + '\\n' + e.stack);
    }

    const resDiv = document.createElement('div');
    resDiv.id = 'final-results';
    resDiv.innerText = JSON.stringify(window.__TEST_LOG__);
    document.body.appendChild(resDiv);
  </script>
</body>
</html>
"""
    test_html_path = os.path.abspath("processiq/test/test_m2_dynamic_page.html")
    with open(test_html_path, "w", encoding="utf-8") as f:
        f.write(test_html)

    cmd = [
        chrome_path,
        "--headless=new",
        "--no-sandbox",
        "--disable-gpu",
        "--allow-file-access-from-files",
        "--virtual-time-budget=5000",
        "--dump-dom",
        f"file:///{test_html_path.replace(os.sep, '/')}"
    ]
    res = subprocess.run(cmd, capture_output=True, text=True, timeout=15)
    output = res.stdout
    
    if 'id="final-results"' in output:
        start = output.find('<div id="final-results">') + len('<div id="final-results">')
        end = output.find('</div>', start)
        raw_json = output[start:end]
        import html
        logs = json.loads(html.unescape(raw_json))
        all_passed = True
        for log in logs:
            print(log)
            if '[FAIL]' in log or '[ERROR]' in log:
                all_passed = False
        return all_passed
    else:
        print("Could not find final-results in output:")
        print(output[:1000])
        return False

if __name__ == "__main__":
    success = run()
    sys.exit(0 if success else 1)
