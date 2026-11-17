# ProcessIQ Vercel Deployment & Production Verification Manual

This document provides step-by-step instructions to deploy ProcessIQ to Vercel via GitHub, preserving the mandatory workflow:

```
GOOGLE ANTIGRAVITY  --->  GITHUB REPOSITORY  --->  VERCEL DEPLOYMENT  --->  PUBLIC WEBSITE
```

---

## 1. Prerequisites & Architecture Note

ProcessIQ Version 1.0 is architected as an isomorphic, zero-database enterprise client application. 
- It requires **no server-side database** (MongoDB, PostgreSQL, or Redis).
- It requires **no secret API keys** or external authentication servers for core operations.
- It can be deployed immediately to Vercel as a high-performance static web application or as a Next.js App Router project.

---

## 2. GitHub Source Control Setup

1. Open PowerShell or Terminal in the `processiq` directory:
   ```bash
   cd processiq
   git init
   git add .
   git commit -m "feat: initial production-ready ProcessIQ enterprise release"
   ```

2. Connect to your public GitHub repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/malpurerutuja05-hash/ProcessIQ_AI_Adoption.git
   git push -u origin main
   ```

---

## 3. Vercel Deployment Guide

### Method A: One-Click Vercel Dashboard Deployment (Recommended)
1. Log in to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** -> **"Project"**.
3. Import the `ProcessIQ_AI_Adoption` repository from your connected GitHub account.
4. **Project Configuration:**
   - **Framework Preset:** Other / Static (or Next.js if compiling via Next.js package)
   - **Root Directory:** `./`
   - **Build Command:** Leave blank (or `npm run build` if Next.js compiler is enabled)
   - **Output Directory:** `./`
5. Click **"Deploy"**. Vercel will build and assign a global production URL (e.g. `https://processiq.vercel.app`).

### Method B: Vercel CLI Deployment
```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy directly to production
vercel --prod
```

---

## 4. Production Security Headers (`vercel.json`)

ProcessIQ includes a preconfigured `vercel.json` enforcing strict security headers at the edge:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

---

## 5. Post-Deployment Production Verification Checklist

Run these manual validation tests immediately upon Vercel deployment:

- [ ] **1. Homepage & Navigation:** Confirm clean rendering of hero section, corporate navigation, and currency selector.
- [ ] **2. Module 1 (Manual Work Cost):** Modify employee count, daily hours, and hourly rate. Verify KPI cards update instantly in real-time.
- [ ] **3. Module 2 (Cost Leakage):** Toggle categories on/off. Verify anti-double counting warnings appear when both Errors and Rework are enabled.
- [ ] **4. Module 3 (AI Readiness):** Switch questionnaire between Quick (10), Professional (15), and Advanced (25) tiers. Answer questions and verify radar chart renders.
- [ ] **5. Module 4 (AI Comparator):** Select different enterprise AI vendors (M365 Copilot, Copilot Studio, Claude Enterprise). Verify pricing numbers adjust.
- [ ] **6. Consolidated Dashboard:** Verify Scenarios A, B, and C calculate properly. Check ROI and Payback period metrics.
- [ ] **7. Multi-Page PDF Download:** Click **DOWNLOAD REPORT (PDF)**. Verify the 14-section PDF downloads, opens cleanly in Adobe Acrobat or browser viewer, and displays actual entered numbers.
- [ ] **8. CSV Export:** Click **CSV**. Open the file in Microsoft Excel or Google Sheets. Confirm all tables and metrics populate without garbled characters.
- [ ] **9. Mobile & Tablet Responsiveness:** Resize browser window to mobile width. Verify tabs scroll horizontally, forms remain readable, and charts scale without horizontal overflow.
- [ ] **10. Browser Print:** Click **Print Assessment** or press `Ctrl + P` / `Cmd + P`. Verify print stylesheets cleanly format cards without overlapping buttons.
