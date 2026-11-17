# ProcessIQ V1.0 — Final Known Limitations & Product Boundaries

**Document ID:** PIQ-V1-KL-001  
**Product:** ProcessIQ  
**Version:** 1.0.0 (Production Release Candidate)  
**Release Date:** November 17, 2026  
**Author:** Multidisciplinary Senior Product Release Team (Finance Transformation, Software Architecture, Product Management)  
**Audience:** Executive Sponsors, Finance Controllers, Enterprise Architects, Product Operations, End Users  

---

## 1. Executive Summary & Purpose

ProcessIQ V1.0 is an enterprise-grade diagnostic and financial decision-support tool engineered to answer a critical pre-investment question: **"Know your process cost before you invest in AI."**

ProcessIQ bridges the strategic gap between operational reality and vendor promises. However, maintaining financial transparency and trust requires complete intellectual honesty regarding what the software **is** and what it **is not**.

This document outlines the official boundaries, known limitations, assumptions, and architectural constraints of ProcessIQ Version 1.0.0. These boundaries define the scope within which ProcessIQ produces mathematically verified, controller-grade insights, and distinguishes scenarios requiring dedicated enterprise integrations or human executive judgment.

---

## 2. Solution Scope: Intended Use vs. Unsupported Scenarios

### 2.1 Intended Use Cases (Supported)
* **Pre-Investment Feasibility Analysis:** Rapid discovery of manual process costs, labor overheads, error leakages, and automation ROI before committing capital to AI software vendors or systems integrators.
* **Business Case Justification & Defense:** Formulation of rigorous, defensible business cases for CFOs, Investment Committees, and Board reviews with explicit segregation between direct cash savings and non-cash capacity gains.
* **Vendor & Architecture Evaluation:** Objective comparison of leading AI platforms across COTS SaaS, Enterprise Suites, and Custom APIs with full Total Cost of Ownership (TCO) modeling.
* **Standardized Diagnostic Walkthroughs:** Structured assessment across 12 pre-configured business templates (Accounts Payable, Accounts Receivable, Month-End Close, Customer Onboarding, Treasury, etc.) or custom enterprise workflows.
* **Executive Artifact Export:** Immediate generation of executive PDF business case summaries and audit-ready CSV datasets for boardroom presentation or import into financial planning models.

### 2.2 Unsupported Scenarios & Explicit Non-Goals
* **Not an ERP, TMS, or Sub-ledger:** ProcessIQ does not connect directly to transaction processing systems (SAP, Oracle, Workday, NetSuite) to record journal entries, execute payments, or reconcile bank statements.
* **Not a Real-Time Process Mining Engine:** It does not ingest event logs directly from message queues or database change-data-capture (CDC) pipelines. Operational metrics are entered as structured annual/monthly baselines.
* **Not an Autonomous Procurement Agent:** ProcessIQ models vendor pricing and implementation parameters; it does not issue purchase orders, manage vendor contracts, or track invoice fulfillment.
* **Not a Substitute for Human Financial Governance:** The application provides decision support and sensitivity modeling. It cannot substitute for formal corporate capital allocation approvals or legal contract reviews.

---

## 3. Client-Side Architecture & Data Persistence Scope

### 3.1 Local Storage Scope
* **Zero Server-Side Data Ingestion:** ProcessIQ operates entirely on the client side (in-browser JavaScript execution). No financial inputs, labor rates, operational metrics, or executive memos are transmitted across external networks or stored in third-party cloud databases.
* **Browser Sandbox Boundary:** Assessment progress is persisted to the user’s local browser storage (`window.localStorage` under key `processiq_assessment_data`).
* **Cross-Browser & Cross-Device Limitation:** Assessments started in Google Chrome on desktop cannot be accessed in Safari, Microsoft Edge, or a mobile device without manually exporting and re-entering the parameters.
* **Private / Incognito Mode Behavior:** In incognito or private browsing modes, `localStorage` is cleared upon closing the browser tab or window. Users must export their assessment PDF or CSV prior to session termination.
* **Data Loss Vulnerabilities:** Explicit browser action ("Clear Browsing Data" or "Clear Cookies and Site Data") will purge saved assessments. The application features defensive corruption recovery (`try/catch` auto-purge and reset to verified defaults), but local browser maintenance will reset state.

---

## 4. Currency Conversion Architecture & Reference FX Benchmark Rates

### 4.1 Fixed Benchmark Reference Rates
ProcessIQ V1.0 utilizes canonical base-currency valuation (USD base) and converts monetary representations across all seven major global reserve currencies (USD, EUR, GBP, CAD, AUD, INR, JPY) using reference benchmark exchange rates:

| Currency Pair | Rate | Benchmark Attribution | Purpose |
| :--- | :--- | :--- | :--- |
| **USD / EUR** | 0.9200 | European Central Bank (ECB) Reference Rate | Strategic Planning Benchmark |
| **USD / GBP** | 0.7900 | Bank of England (BoE) Reference Rate | Strategic Planning Benchmark |
| **USD / CAD** | 1.3600 | Bank of Canada (BoC) Reference Rate | Strategic Planning Benchmark |
| **USD / AUD** | 1.5200 | Reserve Bank of Australia (RBA) Reference Rate | Strategic Planning Benchmark |
| **USD / INR** | 84.0000 | Reserve Bank of India (RBI) Reference Rate | Strategic Planning Benchmark |
| **USD / JPY** | 152.0000 | Bank of Japan (BOJ) Reference Rate | Strategic Planning Benchmark |

### 4.2 Known Boundary & Limitations
* **Not Real-Time Intraday FX:** ProcessIQ does not poll live forex broker APIs (e.g., Bloomberg, Reuters, OANDA). Intraday market volatility is intentionally excluded to ensure deterministic, repeatable financial comparisons during multi-day business case reviews.
* **Multi-Currency Transaction Blends:** The model assumes an assessment is evaluated under a single primary reporting currency. It does not currently model multi-subsidiary currency translation reserves, forward contract hedging, or foreign exchange gain/loss accounting.
* **Periodic Benchmark Updates:** For multi-year business case monitoring, benchmark rates must be periodically updated in application release bundles to reflect significant macro-economic structural shifts.

---

## 5. Vendor Pricing & Commercial Classification Boundaries

### 5.1 Pricing Classifications
ProcessIQ classifies vendor pricing models into three distinct tiers:
1. **Public List Pricing:** Published entry-level or per-seat list prices (e.g., standard SaaS tiers).
2. **Estimated Enterprise Benchmark:** Standardized baseline pricing synthesized from documented enterprise RFP benchmarks, industry analyst reports, and typical multi-user engagements.
3. **Custom Commercial Quote:** Variable architectures where implementation Capex, professional services, token consumption, and compute usage depend entirely on enterprise volume.

### 5.2 Known Boundary & Limitations
* **Subject to Enterprise Negotiation:** Stated vendor prices (e.g., ABBYY, UiPath, Celonis, Hyperscience, Microsoft Copilot) are indicative baselines. Final commercial costs will vary based on enterprise master services agreements (MSAs), multi-year commitments, volume discounting, and specialized SLAs.
* **Cloud Infrastructure Overheads:** For custom API models (OpenAI, Claude, Azure AI), token consumption modeling assumes linear per-document processing. GPU infrastructure provisioning, fine-tuning hosting, and private VPC networking are modeled within Implementation/Integration Capex rather than variable micro-billing.

---

## 6. Financial Modeling Assumptions & Linear Bounds

### 6.1 Linear Scaling & Baseline Bounds
* **First-Year Realization Model:** Net ROI and First-Year Net Value formulas assume that capital expenditures occur at Period 0 and operational benefits accrue over a standard 12-month operating cycle.
* **Capacity Fungibility Assumption:** Recoverable labor capacity value (e.g., 2.5 FTE equivalent hours freed) represents theoretical economic potential. Whether this value translates into cash savings requires an active management decision to redeploy personnel to higher-value growth initiatives or absorb hiring freezes.
* **Leakage Avoidance Linearity:** Error and defect reduction is modeled using scenario-based effectiveness factors (Conservative: 50%, Moderate: 70%, Aggressive: 80-85%). In complex operating environments, process edge cases may yield diminishing marginal returns at high automation levels.

---

## 7. Accounts Receivable Rework Overlap Governance

### 7.1 Methodological Boundary
In process flows where frontline knowledge workers process both initial document volumes and correct downstream defects (e.g., billing discrepancies or credit re-bills):
* ProcessIQ enforces strict dual-scenario reporting:
  1. **Conservative Unconfirmed Overlap (Default):** Directly subtracts rework hours from recoverable frontline capacity to prevent double-counting labor value.
  2. **Dedicated Separate Specialist:** Models rework as an independent specialist function where full frontline capacity and avoided rework costs are independently additive.
* **Limitation:** The software cannot automatically discover whether a user's company employs a dedicated rework team or utilizes frontline staff without user confirmation. The default assumption is intentionally conservative to prevent audit challenges.

---

## 8. Requirements for Human Executive Judgment

ProcessIQ equips transformation leaders with institutional-grade data, but cannot replace executive governance in the following areas:

1. **Organizational Change Management (OCM):** The model calculates technical capacity release, but executive sponsorship is required to govern process adoption, staff retraining, and workflow reorganization.
2. **Regulatory & Compliance Certifications:** AI readiness scores reflect internal operational and architectural posture; formal SOC2, HIPAA, GDPR, or ISO audits must be conducted by certified independent compliance bodies.
3. **Procurement Contracting:** Vendor selection recommendations derived from Module 4 provide comparative TCO scoring. Final vendor awards must execute through corporate legal, security, and procurement frameworks.

---

## 9. Summary & Release Status

ProcessIQ V1.0.0 satisfies all architectural, financial, and UX criteria within these defined boundaries. By disclosing these limitations with complete clarity, the product upholds the highest standard of financial ethics, operational credibility, and corporate trust.

*Status:* **VERIFIED & RELEASE READY**
