# ProcessIQ

> **Know your process cost before you invest in AI.**

ProcessIQ is a professional, public-facing business transformation and AI readiness assessment web application. It enables business leaders, financial controllers, operational excellence directors, and transformation leads to quantify manual work, uncover hidden cost leakage, evaluate organizational AI readiness across 15 dimensions, and build defensible executive business cases before committing to enterprise AI software licenses.

---

## Mandatory Technology Workflow

```
Google Antigravity  --->  GitHub Repository  --->  Vercel Deployment  --->  Public ProcessIQ Website
```

---

## Key Capabilities

1. **Module 1 – Hidden Cost of Manual Work:** Interactive manual labor calculator with dynamic capacity recovery modeling and strict distinction between capacity reclamation and guaranteed cash savings.
2. **Module 2 – Where Is My Process Losing Money?:** Process cost leakage assessment quantifying transaction errors, rework labor, delays, missed discounts, duplicate payments, and SLA penalties with anti-double counting safeguards.
3. **Module 3 – Is My Process AI-Ready?:** Multi-tier diagnostic assessment (Quick 10, Professional 15, Advanced 25 questions) across 15 enterprise dimensions with an actionable 30-day tactical roadmap.
4. **Module 4 – Enterprise AI Investment Comparator:** Transparent TCO comparison across Microsoft 365 Copilot, Microsoft Copilot Studio, Claude Enterprise, and Custom AI Agent API consumption models with verified documentation citations and manual price overrides.
5. **Consolidated Business Case Dashboard:** Dynamic scenario modeling comparing **Scenario A (Current State)**, **Scenario B (Automation & Lean First)**, and **Scenario C (AI-Enabled Transformation)** with automated ROI (%) and Payback Period (Months) calculations.
6. **Multi-Page Consulting PDF Report:** High-fidelity, client-side vector PDF generation producing a 14-section consulting report using actual user-entered data without empty pages.
7. **Excel-Compatible CSV Export:** Clean tabular export containing all process parameters, metrics, readiness scores, and scenario models.
8. **Client-Side Privacy Guarantee:** 100% in-browser calculations with zero database requirement. No user business inputs are stored or transmitted.

---

## Documentation Links

- [Calculation Methodology & Formulas (FORMULAS.md)](docs/FORMULAS.md)
- [Security Assessment & OWASP Review (SECURITY_ASSESSMENT.md)](docs/SECURITY_ASSESSMENT.md)
- [Known Limitations & Assumption Boundaries (KNOWN_LIMITATIONS.md)](docs/KNOWN_LIMITATIONS.md)
- [Vercel Deployment Manual & Verification Checklist (VERCEL_DEPLOYMENT.md)](docs/VERCEL_DEPLOYMENT.md)

---

## Local Development & Testing

### Prerequisites
- Any modern web browser (Chrome, Edge, Firefox, Safari)
- Optional: Python 3.10+ or Node.js 18+ for local HTTP serving and test execution.

### Running Locally
To launch the application locally without any external dependencies:

```bash
# Using Python built-in HTTP server:
python -m http.server 3000 --directory .

# Or using Node.js npx:
npx serve .
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Automated Testing Suite
Run the mathematical verification test suite:
```bash
python test/test_runner.py
```
*Current Status: 40 tests passed, 0 failed.*

### Automated Security & Secret Scanner
Run the static security analysis scan:
```bash
python test/security_scanner.py
```
*Current Status: Zero critical or high vulnerabilities detected.*

---

## Deployment to Vercel via GitHub

1. Commit and push the repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial production-ready ProcessIQ enterprise release"
   git branch -M main
   git remote add origin https://github.com/malpurerutuja05-hash/ProcessIQ_AI_Adoption.git
   git push -u origin main
   ```

2. Connect to Vercel:
   - Import the `ProcessIQ_AI_Adoption` repository in the Vercel Dashboard.
   - Leave build command blank (static framework auto-detected).
   - Deploy.

See [docs/VERCEL_DEPLOYMENT.md](docs/VERCEL_DEPLOYMENT.md) for full instructions and production verification checklist.

---

## License & Intellectual Property
Created by Yuvraj Malpure. Proprietary enterprise transformation platform built with Google Antigravity. All rights reserved.
