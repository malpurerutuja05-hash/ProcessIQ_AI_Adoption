# ProcessIQ V1.0 — Post-Deployment Production Smoke Test Checklist

**Document ID:** PIQ-V1-SMOKE-001  
**Product:** ProcessIQ  
**Target Environment:** Production (Vercel CDN / Custom Domain)  
**Execution Time:** Immediate Post-Deployment (T+0 minutes)  
**Operator Role:** Senior DevOps / QA Automation / Release Controller  
**Prerequisites:** Vercel deployment status confirmed green, no DNS propagation delays.  

---

## 1. Overview & Protocol

This document provides a mandatory 15-point post-deployment smoke test procedure to be executed immediately following any production deployment of ProcessIQ V1.0. 

Every verification step must be performed on the live production URL. If any critical step fails, the operator must pause and evaluate the rollback protocol described in Section 4.

---

## 2. Step-by-Step 15-Point Smoke Test Matrix

| Step # | Test Phase | Operational Action | Expected Verification Criteria | Status (Pass/Fail) |
| :---: | :--- | :--- | :--- | :---: |
| **01** | **HTTP Status & SSL** | Navigate to the production URL via HTTPS. | HTTP 200 OK returned; valid TLS 1.3 certificate; secure padlock displayed. | [ ] |
| **02** | **Cache-Control Headers** | Open Chrome DevTools > Network tab. Inspect response headers for the root HTML document (`/`). | Header `Cache-Control: public, max-age=0, must-revalidate` is present. Zero 304 or stale caching on root HTML. | [ ] |
| **03** | **Asset Version Query** | Check Network tab for `app.js` and `styles.css` requests. | Assets requested with version query parameters: `styles.css?v=1.0.0` and `app.js?v=1.0.0`. HTTP 200 returned. | [ ] |
| **04** | **Browser Console Cleanliness** | Inspect DevTools Console tab upon initial load. | Zero uncaught exceptions, zero script syntax errors, zero 404 network failures. Version log `ProcessIQ v1.0.0 initialized` visible. | [ ] |
| **05** | **Release Badge & Attribution** | Scroll to the application footer. | Version badge confirms `v1.0.0 | Release: November 17, 2026`. Author attribution reads `Created by Yuvraj Malpure`. | [ ] |
| **06** | **Template Selection** | In Stage 1, click "Accounts Payable" template, then click "Accounts Receivable". | Inputs refresh immediately; AP-specific defect volumes (delays, missed discounts) cleanly reset to 0 in non-AP templates. | [ ] |
| **07** | **Stage Progression (1 to 4)** | Complete inputs across Module 1 (Labor), Module 2 (Leakage), Module 3 (Readiness), and Module 4 (Investment). | Stepper navigation progresses cleanly; KPI cards update reactively; no NaN or undefined values rendered. | [ ] |
| **08** | **Global Currency Switch (USD → EUR)** | Toggle currency dropdown from `USD ($)` to `EUR (€)`. | All monetary inputs and outputs across all modules update to EUR at 0.92 rate. Labor cost, leakage, and vendor pricing convert cleanly. | [ ] |
| **09** | **Full Currency Cycle (5 Currencies)** | Cycle currency: `EUR` → `GBP` → `INR` → `JPY` → `USD`. | Currency symbols update correctly (€, £, ₹, ¥, $). Re-selecting USD returns exact original baseline without floating-point drift. | [ ] |
| **10** | **AR Overlap Toggle Verification** | In Module 2 (AR), toggle between "Unconfirmed (Conservative Overlap)" and "Separate Specialist". | Conservative mode subtracts rework hours from capacity; Specialist mode displays independent addition. Formulas update instantly. | [ ] |
| **11** | **Integrated Dashboard Reconciliation** | Proceed to Stage 5 (Executive Dashboard). | Reconciled metrics match Module 1–4 calculations; Direct Cash Savings cleanly separated from Recoverable Capacity Value. | [ ] |
| **12** | **Executive PDF Generation** | Click "Export Executive Summary (PDF)". | Native PDF generation modal/download initiates. Generated PDF renders all KPI cards, tables, charts, and governance disclaimers without page clipping. | [ ] |
| **13** | **Audit CSV Export** | Click "Export Audit Dataset (CSV)". | `processiq_business_case.csv` downloads immediately; contains complete canonical base and converted values with clear headers. | [ ] |
| **14** | **Browser Refresh & Persistence** | Hard-refresh the page (`Ctrl + F5` or `Cmd + Shift + R`). | Assessment state is fully restored from `localStorage`. Stepper position, entered values, selected currency, and canonical base persist accurately. | [ ] |
| **15** | **Responsive & Mobile Viewport** | Toggle DevTools Device Emulation to Mobile (iPhone 14 / Pixel 7, 390x844px). | Layout adapts seamlessly; navigation stepper scrolls horizontally or stacks cleanly; all buttons and inputs remain accessible and tap-friendly. | [ ] |

---

## 3. Execution Sign-Off Form

| Role | Inspector Name | Signature / Timestamp | Result (PASS / FAIL) |
| :--- | :--- | :--- | :--- |
| **DevOps Release Lead** | | `____-__-__ __:__` | |
| **Senior QA Engineer** | | `____-__-__ __:__` | |
| **Finance Controller** | | `____-__-__ __:__` | |

---

## 4. Remediation & Incident Handling Protocol

In the event of an anomaly detected during smoke testing:

1. **Stale Asset Delivery (Steps 02-03 fail):**
   * *Cause:* Vercel edge cache or Cloudflare proxy holding previous build.
   * *Action:* Execute Vercel CLI instant cache purge: `vercel --prod --force`.

2. **Console JavaScript Error (Step 04 fails):**
   * *Cause:* Uncaught DOM query exception or syntax incompatibility.
   * *Action:* Check client browser engine version. If reproducible in modern Chromium/WebKit, immediately rollback to prior production deployment hash via Vercel Dashboard (`Deployments` > `Instant Rollback`).

3. **State Corruption on Load (Step 14 fails):**
   * *Cause:* Incompatible legacy localStorage schema.
   * *Action:* Verify that `loadProgress()` executed its automatic migration / reset protocol. Clear `localStorage` once and re-verify fresh cycle.

4. **PDF Rendering Blank (Step 12 fails):**
   * *Cause:* External CDN dependency timeout for jsPDF or html2canvas.
   * *Action:* Verify network connectivity to unpkg/cdnjs. Inspect script tag integrity in `index.html`.

---

## 5. Final Readiness Verdict

* **Release Operator Verdict:** `[ ] APPROVED FOR GENERAL AVAILABILITY`
* **Release Approval Criteria:** All 15 steps verified **PASS** with zero deviations.
