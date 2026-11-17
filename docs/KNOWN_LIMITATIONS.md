# ProcessIQ Known Engineering Limitations & Assumption Boundaries

This document defines the operational boundaries, financial assumptions, and technical limits of ProcessIQ Version 1.0.

---

## 1. Architectural & State Boundaries

### 1.1 In-Memory Ephemeral State
- **Limitation:** In accordance with ProcessIQ's strict client-side privacy architecture, user financial parameters and questionnaire responses are stored exclusively in active browser RAM. Refreshing the browser or navigating away will reset form fields to baseline demo values.
- **Remediation:** Users should click **DOWNLOAD REPORT (PDF)** or **CSV** to persist their customized assessment before closing the session.

### 1.2 Zero-Database Design
- **Limitation:** Version 1.0 does not offer cross-device synchronization, user profile accounts, or persistent cloud collaboration workspaces.
- **Design Justification:** Eliminates enterprise data breach exposure, compliance auditing overhead (GDPR/SOC2/HIPAA), and customer confidentiality concerns regarding sensitive salary and defect rates.

---

## 2. Financial Modeling Assumptions

### 2.1 Capacity Recovery vs Cash Realization
- **Limitation:** A calculated $100,000 in recoverable capacity value does not imply that an organization's payroll expense will immediately drop by $100,000 upon AI deployment.
- **Boundary:** Reclaimed time enables employees to absorb transaction volume growth, reduce backlog, or elevate customer service. Hard cash savings occur only if overtime hours are curtailed, contractor agreements are phased out, or headcount natural attrition is intentionally un-backfilled.

### 2.2 Dynamic Token Consumption Variability
- **Limitation:** In Module 4's Custom LLM API consumption model, token estimates are linear projections ($3/M input, $15/M output). In live production, retrieval-augmented generation (RAG) context lengths, few-shot prompting, and recursive agent loops create non-linear token spikes.
- **Boundary:** Users should treat token consumption projections as indicative baselines and establish hard financial caps in their cloud AI gateways.

### 2.3 Vendor Contractual Pricing Variations
- **Limitation:** Microsoft 365 Copilot ($30/user/mo) and Copilot Studio ($200/mo) reflect standard publicly listed commercial list pricing as of November 2026. Large enterprise agreements (EA / MACC commitments) often negotiate custom volume discounting.
- **Boundary:** Users can manually override any unit price or implementation fee in Module 4 to reflect their negotiated master services agreement.

---

## 3. Diagnostic & Assessment Boundaries

### 3.1 Self-Reported Readiness Scores
- **Limitation:** The AI Readiness Assessment (10, 15, or 25 questions) relies on self-reported operational practices.
- **Boundary:** The generated score (0 to 100) and 30-day tactical roadmap provide executive prioritization guidance. They do not constitute a formal ISO/IEC 42001 AI management audit or legal compliance certification.

### 3.2 Anti-Double Counting Sensitivity
- **Limitation:** If a user includes operator labor correction time inside "Cost per Error" and simultaneously enables "Internal Labor Rework Hours", the total leakage figure will reflect duplicate labor expense.
- **Remediation:** ProcessIQ includes real-time overlap warning alerts highlighting potential category conflation.

---

## 4. Hardware & Client Compatibility

- **Browser Requirements:** Modern evergreen browsers supporting ECMAScript 2022+ and Canvas API (Google Chrome 110+, Microsoft Edge 110+, Mozilla Firefox 115+, Safari 16+).
- **PDF Generation Memory:** Generating multi-page vector PDFs with high-resolution charts on mobile devices with under 2GB RAM may experience minor rendering delays (typically 1–2 seconds).
