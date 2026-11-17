import subprocess
import sys
import os
import shutil

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    runner_path = os.path.join(script_dir, "comprehensive_audit_test.html").replace("\\", "/")
    test_url = f"file:///{runner_path}"
    
    chrome_path = (
        os.environ.get("CHROME_PATH")
        or shutil.which("chrome")
        or shutil.which("google-chrome")
        or r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    )
    
    cmd = [chrome_path, '--headless=new', '--no-sandbox', '--disable-gpu', '--dump-dom', test_url]
    res = subprocess.run(cmd, capture_output=True, text=True)
    
    dom = res.stdout
    marker = '<div id="test-output">'
    s_idx = dom.find(marker)
    if s_idx == -1:
        print("[FAIL] Could not locate #test-output in DOM")
        sys.exit(1)
        
    s_idx += len(marker)
    e_idx = dom.find('</div>', s_idx)
    output_text = dom[s_idx:e_idx]
    
    lines = output_text.strip().splitlines()
    passes = [l for l in lines if '[PASS]' in l]
    fails = [l for l in lines if '[FAIL]' in l or '[ERROR]' in l]
    
    print("======================================================================")
    print("PROCESSIQ BROWSER INTEGRATION AUDIT (HEADLESS CHROME)")
    print("======================================================================")
    for p in passes:
        print(f"  {p}")
        
    if fails:
        print("\nFAILURES:")
        for f in fails:
            print(f"  {f}")
            
    print("======================================================================")
    print(f"CHROME AUDIT SUMMARY: {len(passes)} PASSED, {len(fails)} FAILED")
    print("======================================================================")
    
    sys.exit(0 if (len(fails) == 0 and len(passes) > 0) else 1)

if __name__ == '__main__':
    main()
