/**
 * ProcessIQ: Enterprise Consulting SaaS Application Engine
 * Guided User Experience & Self-Explanatory Transformation Cockpit
 * Pure client-side calculations, real-time charts, multi-page PDF generation, and CSV export.
 * Creator Attribution: Created by Yuvraj Malpure
 */

// -------------------------------------------------------------
// PROCESS TEMPLATES CATALOG
// -------------------------------------------------------------
const PROCESS_TEMPLATES = {
  // Finance
  ap: {
    category: 'Finance',
    name: 'Accounts Payable',
    department: 'Finance & Shared Services',
    employeeCount: 12,
    hoursPerDay: 4.5,
    workingDays: 22,
    hourlyRate: 42.0,
    includeOvertime: true,
    overtimeHours: 25,
    overtimeRate: 63.0,
    recoverableCapacityPct: 35.0,
    annualSalaryIncreasePct: 4.0,
    monthlyVolume: 8500,
    errorRatePct: 2.8,
    costPerError: 35.0,
    reworkHours: 75,
    reworkHourlyRate: 48.0,
    description: 'Processing supplier invoices, purchase order 3-way matching, discrepancy triaging, and payment batch scheduling.'
  },
  ar: {
    category: 'Finance',
    name: 'Accounts Receivable',
    department: 'Finance & Accounting',
    employeeCount: 8,
    hoursPerDay: 4.0,
    workingDays: 22,
    hourlyRate: 40.0,
    includeOvertime: false,
    overtimeHours: 0,
    overtimeRate: 60.0,
    recoverableCapacityPct: 30.0,
    annualSalaryIncreasePct: 3.5,
    monthlyVolume: 7200,
    errorRatePct: 2.2,
    costPerError: 30.0,
    reworkHours: 50,
    reworkHourlyRate: 45.0,
    description: 'Customer invoicing, receipt allocation, credit monitoring, and overdue payment collection follow-ups.'
  },
  bank_rec: {
    category: 'Finance',
    name: 'Bank Reconciliation',
    department: 'Treasury & Accounting',
    employeeCount: 4,
    hoursPerDay: 3.5,
    workingDays: 22,
    hourlyRate: 44.0,
    includeOvertime: false,
    overtimeHours: 0,
    overtimeRate: 66.0,
    recoverableCapacityPct: 40.0,
    annualSalaryIncreasePct: 4.0,
    monthlyVolume: 4500,
    errorRatePct: 1.5,
    costPerError: 40.0,
    reworkHours: 35,
    reworkHourlyRate: 48.0,
    description: 'Matching multi-account bank feeds against ERP general ledger entries, clearing unmatched items.'
  },
  gl: {
    category: 'Finance',
    name: 'General Ledger Closing',
    department: 'Financial Accounting & Control',
    employeeCount: 6,
    hoursPerDay: 5.0,
    workingDays: 22,
    hourlyRate: 52.0,
    includeOvertime: true,
    overtimeHours: 30,
    overtimeRate: 78.0,
    recoverableCapacityPct: 30.0,
    annualSalaryIncreasePct: 4.5,
    monthlyVolume: 2800,
    errorRatePct: 1.8,
    costPerError: 65.0,
    reworkHours: 40,
    reworkHourlyRate: 55.0,
    description: 'Month-end ledger balance reconciliations, balance sheet roll-forwards, and closing checklist execution.'
  },
  journal: {
    category: 'Finance',
    name: 'Journal Processing',
    department: 'Accounting Operations',
    employeeCount: 5,
    hoursPerDay: 4.0,
    workingDays: 22,
    hourlyRate: 45.0,
    includeOvertime: false,
    overtimeHours: 0,
    overtimeRate: 67.5,
    recoverableCapacityPct: 35.0,
    annualSalaryIncreasePct: 3.5,
    monthlyVolume: 3400,
    errorRatePct: 2.0,
    costPerError: 45.0,
    reworkHours: 45,
    reworkHourlyRate: 50.0,
    description: 'Manual journal entries, supporting documentation validation, and approval sign-off workflows.'
  },
  treasury: {
    category: 'Finance',
    name: 'Treasury Operations',
    department: 'Corporate Treasury',
    employeeCount: 3,
    hoursPerDay: 4.0,
    workingDays: 22,
    hourlyRate: 58.0,
    includeOvertime: false,
    overtimeHours: 0,
    overtimeRate: 87.0,
    recoverableCapacityPct: 25.0,
    annualSalaryIncreasePct: 4.0,
    monthlyVolume: 1200,
    errorRatePct: 0.8,
    costPerError: 120.0,
    reworkHours: 20,
    reworkHourlyRate: 65.0,
    description: 'Daily cash pooling positions, liquidity forecasting, intercompany loan settlements, and wire approvals.'
  },
  fin_rep: {
    category: 'Finance',
    name: 'Financial Reporting',
    department: 'Financial Planning & Analysis',
    employeeCount: 5,
    hoursPerDay: 4.5,
    workingDays: 22,
    hourlyRate: 55.0,
    includeOvertime: true,
    overtimeHours: 20,
    overtimeRate: 82.5,
    recoverableCapacityPct: 35.0,
    annualSalaryIncreasePct: 4.0,
    monthlyVolume: 950,
    errorRatePct: 1.2,
    costPerError: 80.0,
    reworkHours: 30,
    reworkHourlyRate: 60.0,
    description: 'Monthly management packs, budget vs. actual variance analysis commentary, and executive KPI summaries.'
  },

  // Operations
  procurement: {
    category: 'Operations',
    name: 'Procurement & Purchasing',
    department: 'Supply Chain & Sourcing',
    employeeCount: 9,
    hoursPerDay: 4.5,
    workingDays: 22,
    hourlyRate: 46.0,
    includeOvertime: true,
    overtimeHours: 15,
    overtimeRate: 69.0,
    recoverableCapacityPct: 30.0,
    annualSalaryIncreasePct: 4.0,
    monthlyVolume: 5500,
    errorRatePct: 2.5,
    costPerError: 50.0,
    reworkHours: 60,
    reworkHourlyRate: 50.0,
    description: 'Purchase requisition intake, RFQ quote collation, supplier catalog pricing validation, and purchase order dispatch.'
  },
  order_proc: {
    category: 'Operations',
    name: 'Order Processing',
    department: 'Order Management & Fulfillment',
    employeeCount: 14,
    hoursPerDay: 5.0,
    workingDays: 22,
    hourlyRate: 38.0,
    includeOvertime: true,
    overtimeHours: 35,
    overtimeRate: 57.0,
    recoverableCapacityPct: 40.0,
    annualSalaryIncreasePct: 3.5,
    monthlyVolume: 14000,
    errorRatePct: 3.0,
    costPerError: 40.0,
    reworkHours: 90,
    reworkHourlyRate: 42.0,
    description: 'Sales order entry from emails and EDI portals, pricing tier verification, stock reservation, and dispatch tracking.'
  },
  cust_service: {
    category: 'Operations',
    name: 'Customer Service & Ticketing',
    department: 'Customer Support',
    employeeCount: 16,
    hoursPerDay: 5.5,
    workingDays: 22,
    hourlyRate: 32.0,
    includeOvertime: true,
    overtimeHours: 40,
    overtimeRate: 48.0,
    recoverableCapacityPct: 45.0,
    annualSalaryIncreasePct: 3.0,
    monthlyVolume: 22000,
    errorRatePct: 3.5,
    costPerError: 25.0,
    reworkHours: 110,
    reworkHourlyRate: 36.0,
    description: 'Handling inbound customer support queries, status checks, warranty claims, and ticket triage.'
  },
  inventory: {
    category: 'Operations',
    name: 'Inventory Management',
    department: 'Warehouse Operations & Logistics',
    employeeCount: 7,
    hoursPerDay: 4.0,
    workingDays: 22,
    hourlyRate: 36.0,
    includeOvertime: false,
    overtimeHours: 0,
    overtimeRate: 54.0,
    recoverableCapacityPct: 30.0,
    annualSalaryIncreasePct: 3.0,
    monthlyVolume: 8500,
    errorRatePct: 2.2,
    costPerError: 45.0,
    reworkHours: 55,
    reworkHourlyRate: 40.0,
    description: 'Cycle counts, physical inventory reconciliations, scrap write-off logging, and warehouse transfer tracking.'
  },
  hr_ops: {
    category: 'Operations',
    name: 'HR Operations',
    department: 'People & Culture',
    employeeCount: 5,
    hoursPerDay: 3.5,
    workingDays: 22,
    hourlyRate: 42.0,
    includeOvertime: false,
    overtimeHours: 0,
    overtimeRate: 63.0,
    recoverableCapacityPct: 35.0,
    annualSalaryIncreasePct: 3.5,
    monthlyVolume: 1400,
    errorRatePct: 1.5,
    costPerError: 55.0,
    reworkHours: 30,
    reworkHourlyRate: 45.0,
    description: 'New hire onboarding paperwork, employee leave adjustments, background check tracking, and benefits enrollment.'
  }
};

// Accounts Payable Demonstration Sample Readiness Answers (Isolated for Sample Data mode)
const SAMPLE_AP_READINESS_ANSWERS = {
  q1: 2, q2: 2, q3: 3, q4: 2, q5: 3,
  q6: 2, q7: 2, q8: 3, q9: 2, q10: 2,
  q11: 3, q12: 2, q13: 3, q14: 3, q15: 2
};

// -------------------------------------------------------------
// GLOBAL STATE
// -------------------------------------------------------------
const ProcessIQ = {
  currency: 'USD',
  currencySymbols: {
    USD: '$', EUR: '€', GBP: '£', CAD: 'CA$', AUD: 'A$', INR: '₹', JPY: '¥'
  },

  // Guided Journey State (Stage 1 to 5)
  currentStage: 1, // 1: Welcome, 2: Select Process, 3: Enter Information, 4: Analyze Results, 5: Download Report
  activeInputModule: 'manual-cost', // 'manual-cost', 'cost-leakage', 'ai-readiness', 'ai-comparator'
  isSampleData: true, // Indicates if demonstration sample data is currently active
  selectedTemplateKey: 'ap',

  // Module 1 State
  manualCost: {
    processName: 'Accounts Payable',
    processOwner: 'Finance Shared Services Lead',
    department: 'Finance & Shared Services',
    employeeCount: 12,
    hoursPerDay: 4.5,
    workingDays: 22,
    hourlyRate: 42.0,
    includeOvertime: true,
    overtimeHours: 25,
    overtimeRate: 63.0,
    annualSalaryIncreasePct: 4.0,
    recoverableCapacityPct: 35.0,
    isCompleted: true
  },

  // Module 2 State
  costLeakage: {
    isCompleted: true,
    errors: { enabled: true, monthlyVolume: 8500, errorRatePct: 2.8, avgCostPerError: 35.0, isEstimate: true },
    rework: { enabled: true, monthlyHours: 75, hourlyRate: 48.0, isEstimate: true },
    delays: { enabled: true, monthlyDelayedVolume: 120, avgCostPerDelay: 45.0, isEstimate: true },
    missedDiscounts: { enabled: true, monthlyMissedCount: 15, avgDiscountValue: 380.0, isEstimate: false },
    duplicatePayments: { enabled: true, monthlyDuplicateCount: 4, avgDuplicateAmount: 1450.0, unrecoveredPct: 40.0, isEstimate: true },
    penalties: { enabled: true, monthlyAmount: 1800.0, isEstimate: false },
    otherLosses: { enabled: true, monthlyAmount: 1200.0, description: 'Expedited vendor payment fees', isEstimate: true }
  },

  // Module 3 State
  readiness: {
    tier: 'professional', // 'quick' (10), 'professional' (15), 'advanced' (25)
    answers: { ...SAMPLE_AP_READINESS_ANSWERS },
    isCompleted: true
  },

  // Module 4 State
  aiComparator: {
    selectedVendorId: 'm365-copilot',
    userCount: 15,
    monthlyLicensePerUser: 30.0,
    expectedMonthlyInteractions: 12000,
    costPerInteraction: 0.0,
    monthlyInputTokensM: 5.0,
    monthlyOutputTokensM: 1.5,
    agentCount: 2,
    implementationCostOneTime: 25000.0,
    integrationCostOneTime: 15000.0,
    annualMaintenanceSupportCost: 8000.0,
    contractDurationYears: 3,
    customPricing: {},
    isCompleted: true
  },

  currentTab: 'overview',
  charts: {}
};

// -------------------------------------------------------------
// VENDOR PRICING DATABASE (VERIFIED ENTERPRISE BENCHMARKS)
// -------------------------------------------------------------
const OFFICIAL_VENDORS = [
  {
    id: 'm365-copilot',
    name: 'Microsoft 365 Copilot',
    vendor: 'Microsoft Corporation',
    tier: 'Enterprise Add-On',
    source: 'Microsoft Official Enterprise Pricing Portal',
    sourceUrl: 'https://www.microsoft.com/en-us/microsoft-365/enterprise/copilot-for-microsoft-365',
    verificationDate: 'November 2026',
    pricingType: 'Verified Public Pricing',
    currency: 'USD',
    pricingModel: 'Per-User Monthly Add-On (Annual Commitment)',
    isQuoteBased: false,
    isPublicVerified: true,
    baseMonthlyCost: 0,
    costPerUserMonth: 30.0,
    includedMessages: -1,
    extraMessageCost: 0,
    inputTokenCostPerM: 0,
    outputTokenCostPerM: 0,
    licensingAssumptions: [
      'Requires underlying qualifying Microsoft 365 prerequisite license (E3, E5, Business Standard, or Business Premium).',
      'Annual commitment required ($360 billed annually per seat).',
      'Excludes enterprise systems integration, data classification, and change management consulting.'
    ],
    usageAssumptions: [
      'Covers productivity copilots in Word, Excel, PowerPoint, Outlook, Teams, and Microsoft Business Chat.',
      'Fair-use enterprise throughput policies apply; no per-message or per-token surcharge.'
    ],
    assumptions: [
      'Requires underlying Microsoft 365 E3/E5 or Business license ($360/seat/year billed annually).',
      'Verified Public Enterprise Pricing from Microsoft commercial terms portal (Nov 2026).'
    ]
  },
  {
    id: 'copilot-studio',
    name: 'Microsoft Copilot Studio',
    vendor: 'Microsoft Corporation',
    tier: 'Tenant Capacity Tier',
    source: 'Microsoft Learn Licensing & Billing Guide',
    sourceUrl: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing',
    verificationDate: 'November 2026',
    pricingType: 'Verified Public Pricing',
    currency: 'USD',
    pricingModel: 'Pooled Tenant Capacity + Overage Packs',
    isQuoteBased: false,
    isPublicVerified: true,
    baseMonthlyCost: 200.0,
    costPerUserMonth: 0,
    includedMessages: 25000,
    extraMessageCost: 0.01,
    inputTokenCostPerM: 0,
    outputTokenCostPerM: 0,
    licensingAssumptions: [
      'Base tenant subscription is $200/month, covering all organization users against the shared pool.',
      'No per-user licensing minimum or seat fee required.',
      'Dataverse capacity or premium third-party connectors billed separately if tenant quotas exceeded.'
    ],
    usageAssumptions: [
      'Base plan includes 25,000 standard billed messages per tenant per month.',
      'Message overages billed in verified capacity packs of 10,000 messages for $100/month ($0.01 per message).',
      'No invented credit ratios; standard Microsoft message metering applies directly.'
    ],
    assumptions: [
      'Base tenant includes 25,000 billed messages/month ($200/mo).',
      'Message overages billed in official capacity packs of 10,000 for $100 ($0.01/message).'
    ]
  },
  {
    id: 'claude-enterprise',
    name: 'Claude Enterprise',
    vendor: 'Anthropic PBC',
    tier: 'Enterprise Custom Agreement',
    source: 'Anthropic Official Enterprise Pricing',
    sourceUrl: 'https://www.anthropic.com/pricing#enterprise',
    verificationDate: 'November 2026',
    pricingType: 'Quote-Based Contract (Vendor Consultation Required)',
    currency: 'USD',
    pricingModel: 'Enterprise Agreement (Direct Sales Quotation Required)',
    isQuoteBased: true,
    isPublicVerified: false,
    baseMonthlyCost: 0,
    costPerUserMonth: 45.0,
    includedMessages: -1,
    extraMessageCost: 0,
    inputTokenCostPerM: 0,
    outputTokenCostPerM: 0,
    licensingAssumptions: [
      'Requires bespoke enterprise agreement negotiated directly with Anthropic enterprise sales.',
      'Minimum commitment typically 25 seats with annual agreement.',
      'Representative industry benchmark of $45/user/month (typical contract range: $35-$60/user/mo).'
    ],
    usageAssumptions: [
      'Includes 500,000-token expanded context window, Projects, Artifacts, and GitHub connector.',
      'Enterprise SSO, SCIM, role-based access, and dedicated customer success included.',
      'Bounded by enterprise SLA and concurrency tier; not billed on per-message metering.'
    ],
    assumptions: [
      'Quote-based custom agreement (representative industry benchmark: $45/seat/month; 25-seat min).',
      'Not a verified public rate; actual commercial terms require bespoke Anthropic sales consultation.'
    ]
  },
  {
    id: 'custom-ai-agent',
    name: 'Custom AI Agent / LLM API Stack',
    vendor: 'Configurable Architecture (Claude 3.5 Sonnet / GPT-4o API)',
    tier: 'Direct API Token Consumption',
    source: 'API Provider Documentation Benchmark',
    sourceUrl: 'https://docs.anthropic.com/en/docs/about-claude/models',
    verificationDate: 'November 2026',
    pricingType: 'Usage-Based API Benchmark',
    currency: 'USD',
    pricingModel: 'Pay-As-You-Go Token Consumption + Hosting Infrastructure',
    isQuoteBased: false,
    isPublicVerified: true,
    baseMonthlyCost: 150.0,
    costPerUserMonth: 5.0,
    includedMessages: 0,
    extraMessageCost: 0,
    inputTokenCostPerM: 3.0,
    outputTokenCostPerM: 15.0,
    licensingAssumptions: [
      'Zero seat minimums; developer pay-as-you-go API consumption.',
      'Fixed hosting baseline of $150/month (cloud server instance, vector database, and telemetry).',
      'Platform maintenance overhead of $5/user/month.'
    ],
    usageAssumptions: [
      'Token consumption billed at standard frontier rates ($3.00/M input tokens, $15.00/M output tokens).',
      'Tokens reflect estimated transaction volume; no synthetic credit conversions.',
      'Requires internal engineering or external systems integrator to build and maintain.'
    ],
    assumptions: [
      'Calculated from estimated token consumption ($3/M input, $15/M output) plus $150/mo hosting baseline.',
      'Developer pay-as-you-go benchmark rates from official provider documentation (Nov 2026).'
    ]
  }
];

// -------------------------------------------------------------
// READINESS QUESTIONS DATABASE
// -------------------------------------------------------------
const READINESS_QUESTIONS = [
  { id: 'q1', num: 1, dim: 'Process Maturity', cat: 'Process', tiers: ['quick', 'professional', 'advanced'], q: 'How clearly documented and understood is the target workflow end-to-end?', why: 'AI amplifies underlying process hygiene or chaos. Undocumented processes will encode bottlenecks.', opts: ['Ad-hoc / Tribal Knowledge', 'Outdated / Informal Notes', 'Active Standard Operating Procedures (SOPs)', 'Fully Documented with Step-Level KPIs', 'Digitally Mapped & Continuously Audited'] },
  { id: 'q2', num: 2, dim: 'Process Standardization', cat: 'Process', tiers: ['quick', 'professional', 'advanced'], q: 'How standardized are inputs and step sequences across different business units?', why: 'High variance requires human cognitive interpretation and multiplies AI integration failure rates.', opts: ['Extreme Customization / High Variance', 'Partial Standardization with Major Exceptions', 'Standard Core with Cataloged Variants', 'Highly Standardized Templates & Checklists', 'Strictly Enforced Digital Gates'] },
  { id: 'q3', num: 3, dim: 'Data Availability', cat: 'Data', tiers: ['quick', 'professional', 'advanced'], q: 'Where is the data required to execute this process stored and accessed?', why: 'AI requires retrievable digital context. Physical paper or isolated local files create insurmountable friction.', opts: ['Physical Paper or Fragmented Files', 'Siloed Spreadsheets in Email Inboxes', 'Central Cloud Storage (SharePoint/Drive)', 'Core Enterprise Systems (ERP/CRM)', 'Unified Enterprise Data Fabric / Lakehouse'] },
  { id: 'q4', num: 4, dim: 'Data Quality', cat: 'Data', tiers: ['quick', 'professional', 'advanced'], q: 'What is the baseline accuracy, completeness, and cleanliness of process data?', why: 'Garbage in, garbage out. Missing fields or duplicate records cause AI hallucinations and bad outputs.', opts: ['Poor / Chronic Quality Issues', 'Inconsistent / Requires Manual Scrub', 'Acceptable Baseline Quality (<5% errors)', 'High Quality with Automated Schema Rules', 'Governed Master Data Management (MDM)'] },
  { id: 'q5', num: 5, dim: 'Data Accessibility', cat: 'Data', tiers: ['professional', 'advanced'], q: 'How easily can enterprise software and automated agents programmatically query this data?', why: 'Data locked behind proprietary desktop clients without APIs cannot be queried by autonomous agents.', opts: ['Locked in Legacy Closed Systems', 'Manual Periodic CSV Exports Only', 'Scheduled Batch Syncs (SFTP/ETL)', 'Direct REST/GraphQL APIs Available', 'Real-Time Event Streams & Low-Latency APIs'] },
  { id: 'q6', num: 6, dim: 'Technology Readiness', cat: 'Technology', tiers: ['quick', 'professional', 'advanced'], q: 'What is the modernization state of your current application infrastructure?', why: 'Legacy on-premise silos lack the cloud connectors, webhooks, and secure compute required for modern AI.', opts: ['Legacy Mainframe / On-Premise Silo', 'Hybrid with Heavy Fragile Scripting', 'Modern Cloud-Hosted Infrastructure', 'Native Enterprise SaaS Stack', 'Composable Microservices & Serverless'] },
  { id: 'q7', num: 7, dim: 'Integration Readiness', cat: 'Technology', tiers: ['professional', 'advanced'], q: 'How ready are core systems to connect with external AI models and agents?', why: 'Without bi-directional integration, AI cannot trigger downstream transactions automatically.', opts: ['No Integration Capability', 'Screen RPA / Scraping Required', 'Standard Prebuilt Connectors (Power Automate)', 'Comprehensive Secure API Gateway', 'Bi-directional Real-Time Event Bus'] },
  { id: 'q8', num: 8, dim: 'Repetitive Work Potential', cat: 'Process', tiers: ['quick', 'professional', 'advanced'], q: 'What proportion of the process involves pattern-based, structured tasks?', why: 'High routine repetitive volume offers the fastest payback and highest return on AI investment.', opts: ['<10% Routine (Primarily High Judgment)', '10% to 30% Rule-Guided', '30% to 60% Predictable Classification', '60% to 80% Structured Routine Tasks', '>80% High-Volume Pattern Matching'] },
  { id: 'q9', num: 9, dim: 'Exception Handling', cat: 'Process', tiers: ['quick', 'professional', 'advanced'], q: 'How are process edge cases, anomalies, and exceptions detected and resolved?', why: 'AI requires graceful fallback pathways. Undefined exceptions lead to silent compounding errors.', opts: ['Ad-hoc Emergency Firefighting', 'Informal Peer Chat Escalation', 'Documented Exception Ticketing', 'Categorized Queues with Tracked SLAs', 'Automated Anomaly Routing & Fallbacks'] },
  { id: 'q10', num: 10, dim: 'Governance & Audit', cat: 'Governance & Risk', tiers: ['quick', 'professional', 'advanced'], q: 'Does the organization have formal governance, validation, and audit trails?', why: 'Enterprise AI requires transparent explainability and immutable audit logs for compliance.', opts: ['Zero Formal Governance or Logs', 'Basic User Login Logging Only', 'Established Multi-Step Approvals', 'Comprehensive Policy & Version History', 'Formal AI Ethics Board & Continuous Audit'] },
  { id: 'q11', num: 11, dim: 'Security & Privacy', cat: 'Governance & Risk', tiers: ['professional', 'advanced'], q: 'What level of sensitive, confidential, PII, or proprietary data is handled?', why: 'Feeding regulated PII to public AI models creates catastrophic data breach exposure.', opts: ['High PII Handled with No Guardrails', 'Informal Policy without Technical Controls', 'Enterprise DLP & Data Classification Active', 'Private Tenant AI Isolation Configured', 'Zero-Trust Architecture & Cryptographic Redaction'] },
  { id: 'q12', num: 12, dim: 'Human Oversight', cat: 'Governance & Risk', tiers: ['quick', 'professional', 'advanced'], q: 'How is Human-in-the-Loop (HITL) review incorporated into final decisions?', why: 'Responsible AI requires calibrated human oversight to prevent unchecked cascading mistakes.', opts: ['Unsupervised / Rubber-Stamped Execution', 'Reactive Post-Process Complaint Audits', 'Random 10-20% Quality Sampling', 'Confidence Threshold Automated Routing', 'Seamless Human-Agent Copilot Telemetry'] },
  { id: 'q13', num: 13, dim: 'Business Ownership', cat: 'Organization & Value', tiers: ['professional', 'advanced'], q: 'Is there a clear business process owner accountable for operational outcomes?', why: 'AI initiatives without active business unit sponsorship become orphaned pilots that fail to realize ROI.', opts: ['Diffused / No Clear Accountable Owner', 'IT-Led without Operational Buy-in', 'Identified Operational Manager', 'Committed Executive Business Sponsor', 'Dedicated Transformation Product Squad'] },
  { id: 'q14', num: 14, dim: 'Business Value', cat: 'Organization & Value', tiers: ['quick', 'professional', 'advanced'], q: 'How significant is the expected business impact (cost, throughput, or SLA)?', why: 'Transformations with marginal returns consume executive bandwidth without defensible business impact.', opts: ['Marginal Personal Convenience', 'Minor Local Efficiency (<5 hrs/week)', 'Meaningful 20-30% Cycle Reduction', 'Substantial $100k+ Value & Halved Errors', 'Transformative 3x Scale Strategic Advantage'] },
  { id: 'q15', num: 15, dim: 'Change Management', cat: 'Organization & Value', tiers: ['professional', 'advanced'], q: 'How receptive and prepared is the frontline team to adopt AI-assisted workflows?', why: 'Cultural resistance and fear of replacement are the primary causes of enterprise adoption failure.', opts: ['Active Fear & Cultural Resistance', 'Passive Reluctance to Change', 'Cautious Optimism with Training', 'Enthusiastic Internal Champions Identified', 'High Continuous Learning & Digital Enablement'] },
  // Advanced Questions (16 to 25)
  { id: 'q16', num: 16, dim: 'Data History', cat: 'Data', tiers: ['advanced'], q: 'Do you have sufficient historical transaction records to benchmark AI outputs?', why: 'Evaluating AI requires historical golden datasets with verified ground truth outputs.', opts: ['<30 Days Retained', '1 to 6 Months Retained', '1 to 2 Years Retained', '3+ Years Indexed in Warehouse', 'Curated Golden Evaluation Benchmark Active'] },
  { id: 'q17', num: 17, dim: 'Latency & Throughput', cat: 'Technology', tiers: ['advanced'], q: 'What are the turnaround SLA expectations for transaction processing?', why: 'Sub-second real-time SLAs require specialized inference caching, whereas batch workflows are simpler.', opts: ['Unrealistic Sub-100ms Expectations', 'Tight Minutes Turnaround', 'Standard Business Day (2-8 Hours)', 'Batch Window (Overnight)', 'Tiered Latency Architecture Configured'] },
  { id: 'q18', num: 18, dim: 'Explainability & Audit', cat: 'Governance & Risk', tiers: ['advanced'], q: 'Can process decisions be justified to regulators or auditors if questioned?', why: 'Black-box decision making in regulated operations creates legal and fiduciary liability.', opts: ['Strict Mathematical Formula Required', 'High Scrutiny with Human Notes', 'Moderate Scrutiny with Source Citations', 'Internal Operational Focus', 'Automated Chain-of-Thought & Citation Telemetry'] },
  { id: 'q19', num: 19, dim: 'Vendor Lock-in', cat: 'Technology', tiers: ['advanced'], q: 'How dependent will the process be on a single proprietary AI model ecosystem?', why: 'Proprietary lock-in leaves the organization vulnerable to price hikes and outages.', opts: ['Complete Hardcoded Proprietary Lock-in', 'High Ecosystem Dependency', 'Moderate Portability (2-4 Weeks to Adapt)', 'Model-Agnostic Abstraction Layer (LiteLLM)', 'Multi-Cloud & Open Weights Hybrid Strategy'] },
  { id: 'q20', num: 20, dim: 'Feedback Loops', cat: 'Data', tiers: ['advanced'], q: 'How will human corrections be fed back to improve future AI accuracy?', why: 'Without active feedback loops, accuracy degrades as business rules and catalogs change.', opts: ['No Feedback Capture', 'Periodic Bug Reports in Jira', 'Logged Before/After Diff Database', 'Active Reinforcement Telemetry Captured', 'Continuous Dynamic RAG & Few-Shot Updating'] },
  { id: 'q21', num: 21, dim: 'Token Governance', cat: 'Governance & Risk', tiers: ['advanced'], q: 'Are there financial guardrails, hard spending quotas, and rate limits in place?', why: 'Uncapped LLM API calls or document surges cause unexpected enterprise cloud billing shocks.', opts: ['Zero Cost Visibility / Open Credit Cards', '30-Day Post-Facto Invoice Review', 'Monthly Soft Email Alerts', 'Hard Quotas & Per-User Rate Limiting', 'Real-Time FinOps Telemetry & Semantic Caching'] },
  { id: 'q22', num: 22, dim: 'Prompt Security', cat: 'Governance & Risk', tiers: ['advanced'], q: 'How protected is the process against prompt injection, jailbreaks, and poisoning?', why: 'Reading untrusted emails or PDFs without guardrails can trigger malicious instructions.', opts: ['Unaware of Injection Risks', 'Basic Keyword Blacklists', 'Input Sanitization & XML Delimiters Active', 'Dual-LLM Guardrail Firewall Screen', 'Automated Adversarial Red-Teaming in CI/CD'] },
  { id: 'q23', num: 23, dim: 'Cross-Department Dependencies', cat: 'Organization & Value', tiers: ['advanced'], q: 'How many external departments must approve or modify workflows for this AI?', why: 'Processes spanning multiple unaligned departments experience political gridlock and delayed sign-offs.', opts: ['5+ Unaligned Departments', '3 to 4 Departments with Competing Goals', '2 Aligned Departments', 'Single Self-Contained Business Unit', 'Chartered Transformation Steering Committee'] },
  { id: 'q24', num: 24, dim: 'Operational Resilience', cat: 'Technology', tiers: ['advanced'], q: 'If the cloud AI provider experiences an outage, how does work continue?', why: 'Business cannot halt because a third-party AI provider experiences downtime.', opts: ['Catastrophic Halt / No Backup', 'Painful Scramble with Severe Backlog', 'Documented Fallback Manual SOP', 'Automated Failover to Secondary Model Gateway', 'Active-Active Multi-Region Resilient Fallback'] },
  { id: 'q25', num: 25, dim: 'KPI Telemetry', cat: 'Organization & Value', tiers: ['advanced'], q: 'How will actual hours saved and realized dollar return be measured post-launch?', why: 'Without automated telemetry, executive sponsors cannot verify whether ROI materialized.', opts: ['Vague Anecdotal Sentiment Only', 'Manual Periodic Surveys', 'Operational KPI Dashboard Configured', 'Automated Software Time & Cost Logging', 'Executive Financial Telemetry & Continuous Audit'] }
];

// -------------------------------------------------------------
// FORMATTING HELPERS
// -------------------------------------------------------------
function formatCurrency(val) {
  const sym = ProcessIQ.currencySymbols[ProcessIQ.currency] || '$';
  const num = Math.round(Number(val) || 0);
  return `${sym}${num.toLocaleString('en-US')}`;
}

function formatNumber(val, decimals = 0) {
  const num = Number(val) || 0;
  return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// -------------------------------------------------------------
// CORE CALCULATION ENGINES (CLIENT-SIDE)
// -------------------------------------------------------------
function runManualCostCalculations() {
  const m = ProcessIQ.manualCost;
  const employees = Math.max(0, Number(m.employeeCount) || 0);
  const hours = Math.min(24, Math.max(0, Number(m.hoursPerDay) || 0));
  const days = Math.min(31, Math.max(0, Number(m.workingDays) || 0));
  const rate = Math.max(0, Number(m.hourlyRate) || 0);
  const otHours = m.includeOvertime ? Math.max(0, Number(m.overtimeHours) || 0) : 0;
  const otRate = m.includeOvertime ? Math.max(0, Number(m.overtimeRate) || 0) : 0;
  const salaryEscalation = Math.max(0, Number(m.annualSalaryIncreasePct) || 0) / 100;
  const recoveryPct = Math.min(100, Math.max(0, Number(m.recoverableCapacityPct) || 0)) / 100;

  const monthlyHours = employees * hours * days;
  const annualHours = monthlyHours * 12;
  const baseMonthlyLaborCost = monthlyHours * rate;
  const monthlyOvertimeCost = otHours * otRate;
  const totalMonthlyLaborCost = baseMonthlyLaborCost + monthlyOvertimeCost;

  const baseAnnualLaborCost = baseMonthlyLaborCost * 12;
  const totalAnnualLaborCost = totalMonthlyLaborCost * 12;
  const projectedYear2LaborCost = totalAnnualLaborCost * (1 + salaryEscalation);
  const projectedYear3LaborCost = projectedYear2LaborCost * (1 + salaryEscalation);

  const recoverableMonthlyHours = monthlyHours * recoveryPct;
  const recoverableAnnualHours = annualHours * recoveryPct;
  const recoverableMonthlyValue = totalMonthlyLaborCost * recoveryPct;
  const recoverableAnnualValue = totalAnnualLaborCost * recoveryPct;

  return {
    monthlyHours,
    annualHours,
    baseMonthlyLaborCost,
    monthlyOvertimeCost,
    totalMonthlyLaborCost,
    baseAnnualLaborCost,
    totalAnnualLaborCost,
    projectedYear2LaborCost,
    projectedYear3LaborCost,
    recoverableMonthlyHours,
    recoverableAnnualHours,
    recoverableMonthlyValue,
    recoverableAnnualValue
  };
}

function runCostLeakageCalculations() {
  const c = ProcessIQ.costLeakage;
  const items = [];
  const warnings = [];

  if (c.errors.enabled) {
    const vol = Math.max(0, Number(c.errors.monthlyVolume) || 0);
    const rate = Math.min(100, Math.max(0, Number(c.errors.errorRatePct) || 0)) / 100;
    const cost = Math.max(0, Number(c.errors.avgCostPerError) || 0);
    const monthly = vol * rate * cost;
    items.push({ id: 'errors', name: 'Transaction & Entry Errors', monthly, annual: monthly * 12, isEstimate: c.errors.isEstimate, intervention: 'Implement automated schema validation and LLM data extraction guardrails.' });
  }

  if (c.rework.enabled) {
    const hrs = Math.max(0, Number(c.rework.monthlyHours) || 0);
    const rate = Math.max(0, Number(c.rework.hourlyRate) || 0);
    const monthly = hrs * rate;
    items.push({ id: 'rework', name: 'Internal Labor Rework', monthly, annual: monthly * 12, isEstimate: c.rework.isEstimate, intervention: 'Deploy automated exception triaging to eliminate manual re-keying.' });
    if (c.errors.enabled) {
      warnings.push('Potential overlap detected between Transaction Errors and Labor Rework. Verify rework hours are not already bundled in error costs.');
    }
  }

  if (c.delays.enabled) {
    const vol = Math.max(0, Number(c.delays.monthlyDelayedVolume) || 0);
    const cost = Math.max(0, Number(c.delays.avgCostPerDelay) || 0);
    const monthly = vol * cost;
    items.push({ id: 'delays', name: 'Delayed Transactions & Queuing', monthly, annual: monthly * 12, isEstimate: c.delays.isEstimate, intervention: 'Adopt asynchronous queue orchestration with SLA breach alerting.' });
  }

  if (c.missedDiscounts.enabled) {
    const count = Math.max(0, Number(c.missedDiscounts.monthlyMissedCount) || 0);
    const val = Math.max(0, Number(c.missedDiscounts.avgDiscountValue) || 0);
    const monthly = count * val;
    items.push({ id: 'missedDiscounts', name: 'Missed Settlement Discounts', monthly, annual: monthly * 12, isEstimate: c.missedDiscounts.isEstimate, intervention: 'Automate straight-through 3-way invoice matching for early payment capture.' });
  }

  if (c.duplicatePayments.enabled) {
    const count = Math.max(0, Number(c.duplicatePayments.monthlyDuplicateCount) || 0);
    const amount = Math.max(0, Number(c.duplicatePayments.avgDuplicateAmount) || 0);
    const unrecovered = Math.min(100, Math.max(0, Number(c.duplicatePayments.unrecoveredPct) || 0)) / 100;
    const monthly = count * amount * unrecovered;
    items.push({ id: 'duplicatePayments', name: 'Duplicate Payments (Unrecovered)', monthly, annual: monthly * 12, isEstimate: c.duplicatePayments.isEstimate, intervention: 'Implement cryptographic invoice fingerprinting prior to ledger posting.' });
  }

  if (c.penalties.enabled) {
    const monthly = Math.max(0, Number(c.penalties.monthlyAmount) || 0);
    items.push({ id: 'penalties', name: 'Regulatory & SLA Penalties', monthly, annual: monthly * 12, isEstimate: c.penalties.isEstimate, intervention: 'Enforce real-time compliance gate checks with automated audit logs.' });
    if (c.delays.enabled) {
      warnings.push('Potential overlap: SLA penalties are frequently caused by delayed transactions. Avoid double-counting contractual damages.');
    }
  }

  if (c.otherLosses.enabled) {
    const monthly = Math.max(0, Number(c.otherLosses.monthlyAmount) || 0);
    items.push({ id: 'otherLosses', name: c.otherLosses.description || 'Other Process Losses', monthly, annual: monthly * 12, isEstimate: c.otherLosses.isEstimate, intervention: 'Conduct root-cause analysis on ad-hoc workarounds.' });
  }

  const totalMonthly = items.reduce((sum, item) => sum + item.monthly, 0);
  const totalAnnual = totalMonthly * 12;

  items.forEach(item => {
    item.pct = totalMonthly > 0 ? (item.monthly / totalMonthly) * 100 : 0;
  });

  const sortedDrivers = [...items].sort((a, b) => b.annual - a.annual);
  const topDrivers = sortedDrivers.slice(0, 3);

  return {
    items,
    topDrivers,
    totalMonthly,
    totalAnnual,
    warnings
  };
}

function runAIReadinessCalculations() {
  const tier = (ProcessIQ.readiness && ProcessIQ.readiness.tier) || 'professional';
  const applicableQuestions = READINESS_QUESTIONS.filter(q => q.tiers.includes(tier));
  const count = applicableQuestions.length;

  let totalEarned = 0;
  let answeredCount = 0;
  const maxScore = count * 4;

  const categories = {
    'Process': { earned: 0, max: 0 },
    'Data': { earned: 0, max: 0 },
    'Technology': { earned: 0, max: 0 },
    'Governance & Risk': { earned: 0, max: 0 },
    'Organization & Value': { earned: 0, max: 0 }
  };

  const strengths = [];
  const weaknesses = [];

  applicableQuestions.forEach(q => {
    const rawVal = ProcessIQ.readiness && ProcessIQ.readiness.answers ? ProcessIQ.readiness.answers[q.id] : undefined;
    if (rawVal !== undefined && rawVal !== null && rawVal !== '') {
      answeredCount++;
      const ans = Math.min(4, Math.max(0, Number(rawVal)));
      totalEarned += ans;
      categories[q.cat].earned += ans;

      if (ans >= 3) {
        strengths.push(`${q.dim}: Strong baseline (${ans}/4)`);
      } else if (ans <= 1) {
        weaknesses.push(`${q.dim}: Critical operational gap (${ans}/4)`);
      } else if (ans === 2) {
        weaknesses.push(`${q.dim}: Moderate improvement gap (${ans}/4)`);
      }
    }
    categories[q.cat].max += 4;
  });

  const isCompleted = (count > 0 && answeredCount === count);
  if (ProcessIQ.readiness) {
    ProcessIQ.readiness.isCompleted = isCompleted;
  }

  let overallScore = 0;
  let classification = 'Assessment Pending';
  let badgeClass = 'badge-pending';
  let desc = `Assessment incomplete. ${answeredCount} of ${count} questions answered. Answer all questions to reveal your verified readiness score and transformation roadmap.`;

  if (isCompleted) {
    overallScore = maxScore > 0 ? Math.round((totalEarned / maxScore) * 100) : 0;

    if (overallScore >= 80) {
      classification = 'Strong Readiness';
      badgeClass = 'badge-strong';
      desc = 'The process demonstrates high standardization, clean digital assets, and mature governance. Well-positioned for immediate agentic AI deployment.';
    } else if (overallScore >= 60) {
      classification = 'Automation/AI Candidate';
      badgeClass = 'badge-candidate';
      desc = 'The workflow has solid foundations with high repetition. A supervised copilot pilot or hybrid rules-plus-AI implementation is highly recommended.';
    } else if (overallScore >= 40) {
      classification = 'Foundation Required';
      badgeClass = 'badge-foundation';
      desc = 'Deficiencies exist in data quality, standardization, or governance. Standardize procedures and digitize inputs before broad AI deployment.';
    } else {
      classification = 'Not Ready';
      badgeClass = 'badge-not-ready';
      desc = 'The workflow is largely manual and unstructured. Introducing complex generative AI now carries high risk of compounding existing operational errors.';
    }
  }

  const categoryScores = Object.entries(categories).map(([name, val]) => ({
    name,
    scorePct: val.max > 0 ? Math.round((val.earned / val.max) * 100) : 0,
    earned: val.earned,
    max: val.max
  }));

  const roadmap = isCompleted ? [
    { days: 'Days 1–10', phase: 'Process Hygiene & Baseline Mapping', task: 'Workflow Mapping & SOP Standardization', deliverable: 'Step-level flowchart with exception matrix', owner: 'Process Owner & Ops Lead' },
    { days: 'Days 11–20', phase: 'Data Architecture & Privacy Guardrails', task: 'Data Accessibility Audit & Sanitization', deliverable: '50-item clean golden evaluation dataset with ground truth', owner: 'Data Engineer & Security Lead' },
    { days: 'Days 21–30', phase: 'Supervised Pilot & Change Enablement', task: 'Constrained Pilot (20% volume) with HITL Sign-offs', deliverable: 'Pilot Performance Scorecard measuring cycle-time and adoption', owner: 'Transformation Lead & Power Users' }
  ] : [];

  return {
    tier,
    questionCount: count,
    answeredCount,
    isCompleted,
    overallScore,
    classification,
    badgeClass,
    description: desc,
    categoryScores,
    strengths: strengths.slice(0, 4),
    weaknesses: weaknesses.slice(0, 4),
    roadmap
  };
}

function runAIComparatorCalculations() {
  const p = ProcessIQ.aiComparator;
  const users = Math.max(1, Number(p.userCount) || 1);
  const years = Math.max(1, Number(p.contractDurationYears) || 1);
  const customPricingMap = p.customPricing || {};

  const results = OFFICIAL_VENDORS.map(vendor => {
    let monthlySub = 0;
    let monthlyUsage = 0;
    const custom = customPricingMap[vendor.id];
    const isCustom = !!(custom && custom.isCustom);

    if (isCustom) {
      const unitPrice = Math.max(0, Number(custom.unitPrice) || 0);
      const customUsers = Math.max(1, Number(custom.userCount) || users);
      const isAnnual = custom.billingFrequency === 'annually';

      if (vendor.id === 'copilot-studio') {
        monthlySub = isAnnual ? (unitPrice / 12) : unitPrice;
      } else {
        const seatMonthly = isAnnual ? (unitPrice / 12) : unitPrice;
        monthlySub = seatMonthly * customUsers;
      }

      if (custom.additionalUsageCostMonthly !== undefined && custom.additionalUsageCostMonthly !== null) {
        monthlyUsage = Math.max(0, Number(custom.additionalUsageCostMonthly) || 0);
      } else {
        if (vendor.id === 'copilot-studio') {
          const totalMsgs = Number(p.expectedMonthlyInteractions) || 0;
          const overage = Math.max(0, totalMsgs - vendor.includedMessages);
          monthlyUsage = overage * vendor.extraMessageCost;
        } else if (vendor.id === 'custom-ai-agent') {
          const inputCost = (Number(p.monthlyInputTokensM) || 0) * vendor.inputTokenCostPerM;
          const outputCost = (Number(p.monthlyOutputTokensM) || 0) * vendor.outputTokenCostPerM;
          monthlyUsage = inputCost + outputCost;
        }
      }
    } else {
      if (vendor.id === 'm365-copilot') {
        monthlySub = users * vendor.costPerUserMonth;
      } else if (vendor.id === 'copilot-studio') {
        monthlySub = vendor.baseMonthlyCost;
        const totalMsgs = Number(p.expectedMonthlyInteractions) || 0;
        const overage = Math.max(0, totalMsgs - vendor.includedMessages);
        monthlyUsage = overage * vendor.extraMessageCost;
      } else if (vendor.id === 'claude-enterprise') {
        monthlySub = users * vendor.costPerUserMonth;
      } else if (vendor.id === 'custom-ai-agent') {
        monthlySub = vendor.baseMonthlyCost + (users * vendor.costPerUserMonth);
        const inputCost = (Number(p.monthlyInputTokensM) || 0) * vendor.inputTokenCostPerM;
        const outputCost = (Number(p.monthlyOutputTokensM) || 0) * vendor.outputTokenCostPerM;
        monthlyUsage = inputCost + outputCost;
      }
    }

    const annualSupport = Number(p.annualMaintenanceSupportCost) || 0;
    const year1Sub = monthlySub * 12;
    const year1Usage = monthlyUsage * 12;
    const year1Capex = (Number(p.implementationCostOneTime) || 0) + (Number(p.integrationCostOneTime) || 0);
    const year1Opex = year1Sub + year1Usage + annualSupport;
    const totalYear1 = year1Capex + year1Opex;
    const contractTotal = year1Capex + (year1Opex * years);

    return {
      vendor,
      isCustom,
      customDetails: custom || null,
      monthlySub,
      year1Sub,
      monthlyUsage,
      year1Usage,
      annualSupport,
      year1Capex,
      year1Opex,
      totalYear1,
      contractTotal
    };
  });

  const active = results.find(r => r.vendor.id === p.selectedVendorId) || results[0];

  return {
    results,
    active
  };
}

function runConsolidatedCalculations() {
  const m1 = runManualCostCalculations();
  const m2 = runCostLeakageCalculations();
  const m3 = runAIReadinessCalculations();
  const m4 = runAIComparatorCalculations();

  const annualLabor = m1.totalAnnualLaborCost;
  const annualCapacityValue = m1.recoverableAnnualValue;
  const annualLeakage = m2.totalAnnual;
  const readinessScore = m3.overallScore;

  // Selected AI vendor metrics
  const aiSubAnnual = m4.active.year1Sub;
  const aiOpexAnnual = m4.active.year1Opex;
  const aiCapex = m4.active.year1Capex;

  // Direct Cash Leakage vs Non-Cash Leakage
  let directCashLeakage = 0;
  m2.items.forEach(item => {
    if (['duplicatePayments', 'penalties', 'missedDiscounts'].includes(item.id)) {
      directCashLeakage += item.annual;
    }
  });
  const nonCashLeakage = Math.max(0, annualLeakage - directCashLeakage);

  // Benefits under Scenario C (AI Transformation)
  const hardCashSavings = directCashLeakage * 0.8;
  const costAvoidance = nonCashLeakage * 0.75;
  const cLeakageSavings = hardCashSavings + costAvoidance;
  const cLaborSavings = annualCapacityValue;
  const cGrossSavings = cLaborSavings + cLeakageSavings;
  const cNetBenefit = cGrossSavings - aiOpexAnnual;
  const cCapex = Math.round(aiCapex);
  const cFirstYearNet = cNetBenefit - cCapex;
  const cRoi = cCapex > 0 ? Math.round((cNetBenefit / cCapex) * 100) : 0;
  const cNetMonthly = cNetBenefit / 12;
  const cPayback = cCapex > 0 ? (cNetMonthly > 0 ? Math.round((cCapex / cNetMonthly) * 10) / 10 : 0) : 0;

  // Recommendation logic
  let approachTitle = '';
  let approachRationale = '';
  if (!m3.isCompleted) {
    approachTitle = 'Assessment Pending';
    approachRationale = `Complete all ${m3.questionCount} questions in Module 3 (${m3.answeredCount} of ${m3.questionCount} answered) to calculate your verified AI readiness score and strategic transformation recommendations.`;
  } else if (readinessScore < 40) {
    approachTitle = 'Process Standardization & Core Hygiene First';
    approachRationale = `With an AI readiness score of ${readinessScore}/100, the process carries high operational and documentation debt. Prioritize standardizing workflows and cleaning data inputs before investing in AI licenses.`;
  } else if (readinessScore < 60) {
    approachTitle = 'Rules-Based Automation & Data Architecture First';
    approachRationale = `Scoring ${readinessScore}/100 indicates solid operational intent but incomplete integration. Focus on traditional low-code automation and structured master data to prepare for AI copilots.`;
  } else if (readinessScore < 80) {
    approachTitle = 'Supervised AI Copilot Pilot (Human-in-the-Loop)';
    approachRationale = `At ${readinessScore}/100, the process is an ideal candidate for AI assistance. Deploy bounded copilots across 20% to 30% volume with strict human verification gates to capture rapid ROI.`;
  } else {
    approachTitle = 'Full Scaled Agentic AI Transformation';
    approachRationale = `An elite readiness score of ${readinessScore}/100 indicates mature data and active governance. Deploy autonomous agents across the workflow for maximum throughput and margin expansion.`;
  }

  // Scenarios Definition (7 Explicit Financial Metrics + Benefit Classification)
  // Scenario A: Current State
  const scenarioA = {
    id: 'current',
    name: 'Scenario A: Current Baseline',
    tagline: 'Status Quo (Manual Processing & Ongoing Leakage)',
    laborCost: annualLabor,
    leakageCost: annualLeakage,
    totalOperatingCost: annualLabor + annualLeakage,
    grossSavings: 0,
    actualCashSavings: 0,
    avoidedLeakage: 0,
    capacityValueReleased: 0,
    aiCost: 0,
    netBenefit: 0,
    capex: 0,
    firstYearNetBenefit: 0,
    roi: 0,
    firstYearRoi: 0,
    roiFormatted: 'N/A – Baseline',
    firstYearRoiFormatted: 'N/A – Baseline',
    payback: 0,
    paybackFormatted: 'N/A – Baseline Scenario',
    laborSavings: 0,
    leakageSavings: 0,
    isRecommended: false
  };

  // Scenario B: Automation & Lean First
  const bCapex = 15000;
  const bOpex = 5000;
  const bLaborSavings = Math.round(annualLabor * 0.2); // 20% labor capacity recovered ($123,530)
  const bLeakageSavings = Math.round(annualLeakage * 0.5); // 50% defect leakage reduced ($170,100)
  const bActualCashSavings = Math.round(directCashLeakage * 0.5); // 50% of direct cash leakage ($58,920)
  const bGrossSavings = bLaborSavings + bLeakageSavings; // Reconciled gross savings ($293,630)
  const bNetBenefit = bGrossSavings - bOpex; // Reconciled net annual recurring benefit ($288,630)
  const bFirstYearNet = bNetBenefit - bCapex; // First-year net benefit ($273,630)
  const bRoi = bCapex > 0 ? Math.round((bNetBenefit / bCapex) * 100) : 0; // 1,924% Recurring ROI
  const bFirstYearRoi = bCapex > 0 ? Math.round((bFirstYearNet / bCapex) * 100) : 0; // 1,824% First-Year ROI
  const bNetMonthly = bNetBenefit / 12;
  const bPayback = bCapex > 0 ? (bNetMonthly > 0 ? Math.round((bCapex / bNetMonthly) * 10) / 10 : 0) : 0; // 0.6 mo

  const scenarioB = {
    id: 'automation_first',
    name: 'Scenario B: Automation & Lean First',
    tagline: 'Standardization + Traditional Rules Automation',
    laborCost: Math.round(annualLabor * 0.8), // Remaining labor ($494,122)
    leakageCost: Math.round(annualLeakage * 0.5), // Remaining leakage ($170,100)
    totalOperatingCost: Math.round(annualLabor * 0.8) + Math.round(annualLeakage * 0.5),
    grossSavings: bGrossSavings, // 1. Gross annual operating savings ($293,630)
    actualCashSavings: bActualCashSavings, // Actual cash savings ($58,920)
    avoidedLeakage: bLeakageSavings, // Avoided defect leakage ($170,100)
    capacityValueReleased: bLaborSavings, // Capacity value released ($123,530)
    aiCost: bOpex, // 2. Annual technology operating costs ($5,000)
    netBenefit: bNetBenefit, // 3. Net annual recurring benefit ($288,630)
    capex: bCapex, // 4. One-time implementation investment ($15,000)
    firstYearNetBenefit: bFirstYearNet, // 5. First-year net benefit ($273,630)
    roi: bRoi, // 6. Recurring Return on Investment (1,924%)
    firstYearRoi: bFirstYearRoi, // First-Year Net ROI (1,824%)
    roiFormatted: `${bRoi}%`,
    firstYearRoiFormatted: `${bFirstYearRoi}%`,
    payback: bPayback, // 7. Payback period (0.6 mo)
    paybackFormatted: `${bPayback} mo`,
    laborSavings: bLaborSavings,
    leakageSavings: bLeakageSavings,
    isRecommended: readinessScore < 60
  };

  // Scenario C: AI Transformation
  const cFirstYearRoi = cCapex > 0 ? Math.round((cFirstYearNet / cCapex) * 100) : 0;
  const scenarioC = {
    id: 'ai_transformation',
    name: 'Scenario C: Enterprise AI Transformation',
    tagline: 'Supervised Copilots & Autonomous Agents',
    laborCost: Math.round(annualLabor - cLaborSavings), // Remaining labor ($401,474)
    leakageCost: Math.round(annualLeakage - cLeakageSavings), // Remaining leakage ($79,158)
    totalOperatingCost: Math.round(annualLabor - cLaborSavings) + Math.round(annualLeakage - cLeakageSavings),
    grossSavings: Math.round(cGrossSavings), // 1. Gross annual operating savings ($477,220)
    actualCashSavings: Math.round(hardCashSavings), // Actual cash savings ($94,272)
    avoidedLeakage: Math.round(cLeakageSavings), // Avoided defect leakage ($261,042)
    capacityValueReleased: Math.round(cLaborSavings), // Capacity value released ($216,178)
    aiCost: Math.round(aiOpexAnnual), // 2. Annual technology operating costs ($13,400)
    netBenefit: Math.round(cNetBenefit), // 3. Net annual recurring benefit ($463,820)
    capex: cCapex, // 4. One-time implementation investment ($40,000)
    firstYearNetBenefit: Math.round(cFirstYearNet), // 5. First-year net benefit ($423,820)
    roi: cRoi, // 6. Recurring Return on Investment (1,160%)
    firstYearRoi: cFirstYearRoi, // First-Year Net ROI (1,060%)
    roiFormatted: `${cRoi}%`,
    firstYearRoiFormatted: `${cFirstYearRoi}%`,
    payback: cPayback, // 7. Payback period (1.0 mo)
    paybackFormatted: `${cPayback} mo`,
    laborSavings: Math.round(cLaborSavings),
    leakageSavings: Math.round(cLeakageSavings),
    isRecommended: readinessScore >= 60
  };

  return {
    m1, m2, m3, m4,
    annualLabor,
    annualCapacityValue,
    annualLeakage,
    readinessScore,
    aiSubAnnual,
    aiOpexAnnual,
    aiCapex,
    hardCashSavings,
    costAvoidance,
    totalEconomicBenefit: Math.round(cGrossSavings),
    netAnnualEconomicBenefit: Math.round(cNetBenefit),
    firstYearNetBenefit: Math.round(cFirstYearNet),
    roiPct: cRoi,
    paybackMonths: cPayback,
    approachTitle,
    approachRationale,
    scenarios: [scenarioA, scenarioB, scenarioC]
  };
}

// -------------------------------------------------------------
// GUIDED JOURNEY STAGE MANAGEMENT
// -------------------------------------------------------------
function goToStage(stageNum) {
  ProcessIQ.currentStage = stageNum;

  // Update Stepper UI
  document.querySelectorAll('.stepper-item').forEach(el => {
    const num = Number(el.dataset.stage);
    el.classList.toggle('active', num === stageNum);
    el.classList.toggle('completed', num < stageNum);
  });

  // Toggle stage container visibility
  document.querySelectorAll('.stage-container').forEach(el => {
    el.classList.toggle('hidden', el.id !== `stage-${stageNum}`);
  });

  // Scroll gently to top of main content
  window.scrollTo({ top: 0, behavior: 'smooth' });

  renderAll();
}

function nextStage() {
  if (ProcessIQ.currentStage < 5) {
    goToStage(ProcessIQ.currentStage + 1);
  }
}

function prevStage() {
  if (ProcessIQ.currentStage > 1) {
    goToStage(ProcessIQ.currentStage - 1);
  }
}

function switchInputSubmodule(moduleId) {
  ProcessIQ.activeInputModule = moduleId;
  document.querySelectorAll('.submodule-tab').forEach(el => {
    el.classList.toggle('active', el.dataset.submodule === moduleId);
  });
  document.querySelectorAll('.submodule-pane').forEach(el => {
    el.classList.toggle('hidden', el.id !== `submodule-${moduleId}`);
  });
  renderAll();
}

// -------------------------------------------------------------
// SAMPLE DATA & TEMPLATE MANAGEMENT
// -------------------------------------------------------------
function selectProcessTemplate(templateKey) {
  const tpl = PROCESS_TEMPLATES[templateKey];
  if (!tpl) return;

  ProcessIQ.selectedTemplateKey = templateKey;

  // Highlight selected template card
  document.querySelectorAll('.process-card').forEach(el => {
    el.classList.toggle('selected', el.dataset.key === templateKey);
  });

  // Populate form fields with realistic benchmarks
  ProcessIQ.manualCost.processName = tpl.name;
  ProcessIQ.manualCost.department = tpl.department;
  ProcessIQ.manualCost.employeeCount = tpl.employeeCount;
  ProcessIQ.manualCost.hoursPerDay = tpl.hoursPerDay;
  ProcessIQ.manualCost.workingDays = tpl.workingDays;
  ProcessIQ.manualCost.hourlyRate = tpl.hourlyRate;
  ProcessIQ.manualCost.includeOvertime = tpl.includeOvertime;
  ProcessIQ.manualCost.overtimeHours = tpl.overtimeHours;
  ProcessIQ.manualCost.overtimeRate = tpl.overtimeRate;
  ProcessIQ.manualCost.recoverableCapacityPct = tpl.recoverableCapacityPct;

  // Module 2 sync
  ProcessIQ.costLeakage.errors.monthlyVolume = tpl.monthlyVolume;
  ProcessIQ.costLeakage.errors.errorRatePct = tpl.errorRatePct;
  ProcessIQ.costLeakage.errors.avgCostPerError = tpl.costPerError;
  ProcessIQ.costLeakage.rework.monthlyHours = tpl.reworkHours;
  ProcessIQ.costLeakage.rework.hourlyRate = tpl.reworkHourlyRate;

  if (templateKey === 'ap') {
    ProcessIQ.costLeakage.delays = { enabled: true, monthlyDelayedVolume: 120, avgCostPerDelay: 45.0, isEstimate: true };
    ProcessIQ.costLeakage.missedDiscounts = { enabled: true, monthlyMissedCount: 15, avgDiscountValue: 380.0, isEstimate: false };
    ProcessIQ.costLeakage.duplicatePayments = { enabled: true, monthlyDuplicateCount: 4, avgDuplicateAmount: 1450.0, unrecoveredPct: 40.0, isEstimate: true };
    ProcessIQ.costLeakage.penalties = { enabled: true, monthlyAmount: 1800.0, isEstimate: false };
    ProcessIQ.costLeakage.otherLosses = { enabled: true, monthlyAmount: 1200.0, description: 'Expedited vendor payment fees', isEstimate: true };
  }

  syncInputs();
  renderAll();
}

function loadSampleData() {
  ProcessIQ.isSampleData = true;
  ProcessIQ.readiness.tier = 'professional';
  ProcessIQ.readiness.answers = { ...SAMPLE_AP_READINESS_ANSWERS };
  ProcessIQ.readiness.isCompleted = true;
  selectProcessTemplate('ap');
  renderReadinessQuestionnaire();
  updateSampleDataBanner();
  renderAll();
}

function clearData() {
  ProcessIQ.isSampleData = false;
  ProcessIQ.manualCost.processName = '';
  ProcessIQ.manualCost.department = '';
  ProcessIQ.manualCost.employeeCount = 0;
  ProcessIQ.manualCost.hoursPerDay = 0;
  ProcessIQ.manualCost.workingDays = 22;
  ProcessIQ.manualCost.hourlyRate = 0;
  ProcessIQ.manualCost.includeOvertime = false;
  ProcessIQ.manualCost.overtimeHours = 0;
  ProcessIQ.manualCost.recoverableCapacityPct = 30;

  ProcessIQ.costLeakage.errors.monthlyVolume = 0;
  ProcessIQ.costLeakage.errors.errorRatePct = 0;
  ProcessIQ.costLeakage.errors.avgCostPerError = 0;
  ProcessIQ.costLeakage.rework.monthlyHours = 0;
  ProcessIQ.costLeakage.rework.hourlyRate = 0;
  ProcessIQ.costLeakage.delays.monthlyDelayedVolume = 0;
  ProcessIQ.costLeakage.delays.avgCostPerDelay = 0;
  ProcessIQ.costLeakage.missedDiscounts.monthlyMissedCount = 0;
  ProcessIQ.costLeakage.missedDiscounts.avgDiscountValue = 0;
  ProcessIQ.costLeakage.duplicatePayments.monthlyDuplicateCount = 0;
  ProcessIQ.costLeakage.duplicatePayments.avgDuplicateAmount = 0;
  ProcessIQ.costLeakage.penalties.monthlyAmount = 0;
  ProcessIQ.costLeakage.otherLosses.monthlyAmount = 0;

  // Reset Module 3 Readiness State & Answers completely for fresh assessment
  ProcessIQ.readiness.answers = {};
  ProcessIQ.readiness.isCompleted = false;

  if (ProcessIQ.aiComparator) {
    ProcessIQ.aiComparator.customPricing = {};
  }

  // Purge any saved browser storage session
  try {
    localStorage.removeItem('processiq_assessment_data');
  } catch (e) {
    // Ignore storage errors if disabled
  }

  updateSampleDataBanner();
  renderReadinessQuestionnaire();
  syncInputs();
  renderAll();
}

function updateSampleDataBanner() {
  const banner = document.getElementById('demo-data-banner');
  if (banner) {
    banner.classList.toggle('hidden', !ProcessIQ.isSampleData);
  }
}

// -------------------------------------------------------------
// SAFE BROWSER STORAGE (PROGRESS PERSISTENCE)
// -------------------------------------------------------------
function saveProgress() {
  try {
    const payload = {
      currency: ProcessIQ.currency,
      manualCost: ProcessIQ.manualCost,
      costLeakage: ProcessIQ.costLeakage,
      readiness: ProcessIQ.readiness,
      aiComparator: ProcessIQ.aiComparator,
      isSampleData: ProcessIQ.isSampleData,
      currentStage: ProcessIQ.currentStage
    };
    localStorage.setItem('processiq_assessment_data', JSON.stringify(payload));
    showToast('Progress saved safely in your browser.');
  } catch (e) {
    console.warn('Storage unavailable or blocked:', e);
    showToast('Browser storage blocked. Inputs remain active in current session.');
  }
}

function loadProgress() {
  try {
    const raw = localStorage.getItem('processiq_assessment_data');
    if (raw) {
      const data = JSON.parse(raw);
      if (data.manualCost) Object.assign(ProcessIQ.manualCost, data.manualCost);
      if (data.costLeakage) Object.assign(ProcessIQ.costLeakage, data.costLeakage);
      if (data.readiness) Object.assign(ProcessIQ.readiness, data.readiness);
      if (data.aiComparator) Object.assign(ProcessIQ.aiComparator, data.aiComparator);
      if (data.currency) ProcessIQ.currency = data.currency;
      if (typeof data.isSampleData === 'boolean') ProcessIQ.isSampleData = data.isSampleData;
      syncInputs();
      renderAll();
      showToast('Saved progress restored from browser.');
    }
  } catch (e) {
    console.warn('Unable to load from storage:', e);
  }
}

function confirmStartAgain() {
  if (confirm('Start a new assessment? This will reset all current input fields.')) {
    clearData();
    goToStage(1);
  }
}

function showToast(msg) {
  let toast = document.getElementById('processiq-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'processiq-toast';
    toast.className = 'fixed bottom-4 right-4 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-xl z-50 transition-opacity duration-300 pointer-events-none opacity-0';
    document.body.appendChild(toast);
  }
  toast.innerText = msg;
  toast.classList.remove('opacity-0');
  setTimeout(() => {
    toast.classList.add('opacity-0');
  }, 3000);
}

// -------------------------------------------------------------
// UI RENDERING & TAB SWITCHING
// -------------------------------------------------------------
function switchTab(tabId) {
  ProcessIQ.currentTab = tabId;

  // If user clicks a tab in the header/subnav, jump directly to that module
  if (['manual-cost', 'cost-leakage', 'ai-readiness', 'ai-comparator'].includes(tabId)) {
    goToStage(3);
    switchInputSubmodule(tabId);
  } else if (tabId === 'overview') {
    goToStage(4);
  } else if (tabId === 'methodology') {
    // Show methodology modal or pane
    const meth = document.getElementById('tab-methodology');
    if (meth) {
      document.querySelectorAll('.stage-container').forEach(el => el.classList.add('hidden'));
      meth.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  document.querySelectorAll('.module-tab').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tabId);
  });
  renderAll();
}

function updateCurrency(code) {
  ProcessIQ.currency = code;
  renderAll();
}

// -------------------------------------------------------------
// RENDER ALL MODULES & DASHBOARD
// -------------------------------------------------------------
function renderAll() {
  updateSampleDataBanner();
  renderModule1();
  renderModule2();
  renderModule3();
  renderModule4();
  renderDashboard();
  if (typeof preparePrintReport === 'function') {
    preparePrintReport();
  }
}

// Render Module 1
function renderModule1() {
  const data = runManualCostCalculations();

  const elMonthlyLabor = document.getElementById('m1-monthly-labor');
  const elAnnualLabor = document.getElementById('m1-annual-labor');
  const elAnnualHours = document.getElementById('m1-annual-hours');
  const elRecoverableValue = document.getElementById('m1-recoverable-value');
  const elRecoverableHours = document.getElementById('m1-recoverable-hours');

  if (elMonthlyLabor) elMonthlyLabor.innerText = formatCurrency(data.totalMonthlyLaborCost);
  if (elAnnualLabor) elAnnualLabor.innerText = formatCurrency(data.totalAnnualLaborCost);
  if (elAnnualHours) elAnnualHours.innerText = `${formatNumber(data.annualHours)} hrs`;
  if (elRecoverableValue) elRecoverableValue.innerText = formatCurrency(data.recoverableAnnualValue);
  if (elRecoverableHours) elRecoverableHours.innerText = `${formatNumber(data.recoverableAnnualHours)} hrs`;

  // Render M1 Chart
  const ctx = document.getElementById('m1Chart');
  if (ctx && typeof Chart !== 'undefined') {
    if (ProcessIQ.charts.m1) ProcessIQ.charts.m1.destroy();
    ProcessIQ.charts.m1 = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Retained Manual Cost', 'Recoverable Capacity Value', 'Overtime Spend'],
        datasets: [{
          data: [
            Math.max(0, data.totalAnnualLaborCost - data.recoverableAnnualValue - (data.monthlyOvertimeCost * 12)),
            data.recoverableAnnualValue,
            data.monthlyOvertimeCost * 12
          ],
          backgroundColor: ['#94a3b8', '#2563eb', '#f59e0b'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }
}

// Render Module 2
function renderModule2() {
  const data = runCostLeakageCalculations();

  const elMonthlyLeak = document.getElementById('m2-monthly-leakage');
  const elAnnualLeak = document.getElementById('m2-annual-leakage');
  const elTopDriver = document.getElementById('m2-top-driver');

  if (elMonthlyLeak) elMonthlyLeak.innerText = formatCurrency(data.totalMonthly);
  if (elAnnualLeak) elAnnualLeak.innerText = formatCurrency(data.totalAnnual);
  if (elTopDriver) elTopDriver.innerText = data.topDrivers.length > 0 ? `${data.topDrivers[0].name} (${formatCurrency(data.topDrivers[0].annual)}/yr)` : 'None';

  // Warnings render
  const warnContainer = document.getElementById('m2-warnings');
  if (warnContainer) {
    warnContainer.innerHTML = '';
    data.warnings.forEach(w => {
      const div = document.createElement('div');
      div.className = 'p-3 text-xs bg-amber-50 text-amber-800 border-l-4 border-amber-500 rounded';
      div.innerText = w;
      warnContainer.appendChild(div);
    });
  }

  // Render Pareto Chart
  const ctx = document.getElementById('m2Chart');
  if (ctx && typeof Chart !== 'undefined' && data.items.length > 0) {
    if (ProcessIQ.charts.m2) ProcessIQ.charts.m2.destroy();
    ProcessIQ.charts.m2 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.items.map(i => i.name.split(' ')[0]),
        datasets: [{
          label: 'Annual Leakage Cost',
          data: data.items.map(i => i.annual),
          backgroundColor: '#dc2626',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            ticks: {
              callback: (v) => formatCurrency(v)
            }
          }
        }
      }
    });
  }
}

// Render Module 3
function runAIReadinessRender() {
  const data = runAIReadinessCalculations();

  const elProgressText = document.getElementById('m3-progress-text');
  const elProgressBar = document.getElementById('m3-progress-bar');
  const elScore = document.getElementById('m3-score');
  const elClass = document.getElementById('m3-classification');
  const elDesc = document.getElementById('m3-desc');

  const pct = data.questionCount > 0 ? Math.round((data.answeredCount / data.questionCount) * 100) : 0;
  if (elProgressText) {
    elProgressText.innerText = `${data.answeredCount} of ${data.questionCount} Answered (${pct}%)`;
  }
  if (elProgressBar) {
    elProgressBar.style.width = `${pct}%`;
  }

  if (elScore) {
    elScore.innerText = data.isCompleted ? `${data.overallScore}/100` : 'Assessment Pending';
  }
  if (elClass) {
    elClass.innerText = data.classification;
    elClass.className = `px-3 py-1 text-xs font-semibold rounded-full ${data.badgeClass}`;
  }
  if (elDesc) elDesc.innerText = data.description;

  // Render Radar Chart
  const ctx = document.getElementById('m3Chart');
  if (ctx && typeof Chart !== 'undefined') {
    if (ProcessIQ.charts.m3) ProcessIQ.charts.m3.destroy();
    ProcessIQ.charts.m3 = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: data.categoryScores.map(c => c.name),
        datasets: [{
          label: 'Readiness Maturity (%)',
          data: data.isCompleted ? data.categoryScores.map(c => c.scorePct) : [0, 0, 0, 0, 0],
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
          borderColor: '#2563eb',
          pointBackgroundColor: '#2563eb'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: { stepSize: 25 }
          }
        }
      }
    });
  }

  // Render Questions UI if empty
  const qContainer = document.getElementById('m3-questions-container');
  if (qContainer && qContainer.children.length === 0) {
    renderReadinessQuestionnaire();
  }
}

function renderModule3() {
  runAIReadinessRender();
}

function renderReadinessQuestionnaire() {
  const qContainer = document.getElementById('m3-questions-container');
  if (!qContainer) return;
  qContainer.innerHTML = '';

  const tier = (ProcessIQ.readiness && ProcessIQ.readiness.tier) || 'professional';
  const list = READINESS_QUESTIONS.filter(q => q.tiers.includes(tier));

  list.forEach(q => {
    const rawVal = ProcessIQ.readiness && ProcessIQ.readiness.answers ? ProcessIQ.readiness.answers[q.id] : undefined;
    const isAnswered = (rawVal !== undefined && rawVal !== null && rawVal !== '');
    const currentVal = isAnswered ? Number(rawVal) : null;

    const div = document.createElement('div');
    div.id = `m3-question-card-${q.id}`;
    div.className = `p-4 border rounded-lg bg-white mb-4 transition-colors ${isAnswered ? 'border-slate-300' : 'border-slate-200 hover:border-slate-300'}`;
    div.innerHTML = `
      <div class="flex items-start justify-between">
        <div>
          <span class="inline-block px-2 py-0.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded mb-1">${q.dim}</span>
          <h4 class="text-sm font-semibold text-slate-900">${q.num}. ${q.q}</h4>
          <p class="text-xs text-slate-500 mt-0.5"><span class="font-medium text-slate-700">Why it matters:</span> ${q.why}</p>
        </div>
      </div>
      <div class="mt-3 grid grid-cols-1 sm:grid-cols-5 gap-2">
        ${q.opts.map((opt, idx) => {
          const isSelected = (currentVal === idx);
          const activeClass = 'readiness-opt-btn text-left p-2.5 border-2 rounded-lg text-xs transition-all border-blue-600 bg-blue-50 font-semibold text-blue-900 shadow-sm ring-2 ring-blue-500/20';
          const inactiveClass = 'readiness-opt-btn text-left p-2.5 border rounded-lg text-xs transition-all border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-700 bg-white';
          return `
            <button type="button" 
              onclick="selectReadinessAnswer('${q.id}', ${idx})" 
              data-qid="${q.id}"
              data-idx="${idx}"
              class="${isSelected ? activeClass : inactiveClass}">
              <span class="font-bold">${idx}/4:</span> ${opt}
            </button>
          `;
        }).join('')}
      </div>
    `;
    qContainer.appendChild(div);
  });
}

function selectReadinessAnswer(qid, val) {
  if (!ProcessIQ.readiness) {
    ProcessIQ.readiness = { tier: 'professional', answers: {}, isCompleted: false };
  }
  if (!ProcessIQ.readiness.answers) {
    ProcessIQ.readiness.answers = {};
  }
  const numericVal = Number(val);
  ProcessIQ.readiness.answers[qid] = numericVal;

  // Instantly toggle button styles in the DOM for this specific question card
  const card = document.getElementById(`m3-question-card-${qid}`);
  if (card) {
    const buttons = card.querySelectorAll('.readiness-opt-btn');
    buttons.forEach(btn => {
      const idx = Number(btn.getAttribute('data-idx'));
      if (idx === numericVal) {
        btn.className = 'readiness-opt-btn text-left p-2.5 border-2 rounded-lg text-xs transition-all border-blue-600 bg-blue-50 font-semibold text-blue-900 shadow-sm ring-2 ring-blue-500/20';
      } else {
        btn.className = 'readiness-opt-btn text-left p-2.5 border rounded-lg text-xs transition-all border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-700 bg-white';
      }
    });
    card.classList.add('border-slate-300');
  }

  // Update calculations, radar chart, progress text, and consolidated dashboard
  runAIReadinessRender();
  renderDashboard();
  syncInputs();
}

function changeReadinessTier(tier) {
  ProcessIQ.readiness.tier = tier;
  ['quick', 'professional', 'advanced'].forEach(t => {
    const btn = document.getElementById(`tier-${t}`);
    if (btn) {
      btn.className = (t === tier) 
        ? 'px-3 py-1.5 rounded-md bg-blue-600 text-white shadow-sm transition' 
        : 'px-3 py-1.5 rounded-md hover:bg-slate-100 transition';
    }
  });
  renderReadinessQuestionnaire();
  runAIReadinessRender();
  renderDashboard();
}

// Render Module 4
function renderModule4() {
  const data = runAIComparatorCalculations();
  const elActiveVendor = document.getElementById('m4-active-vendor');
  const elYear1Invest = document.getElementById('m4-year1-invest');
  const elContractTotal = document.getElementById('m4-contract-total');

  if (elActiveVendor) elActiveVendor.innerText = data.active.vendor.name;
  if (elYear1Invest) elYear1Invest.innerText = formatCurrency(data.active.totalYear1);
  if (elContractTotal) elContractTotal.innerText = formatCurrency(data.active.contractTotal);

  // Render Comparison Table
  const tableBody = document.getElementById('m4-table-body');
  if (tableBody) {
    tableBody.innerHTML = data.results.map(r => {
      const isSelected = r.vendor.id === ProcessIQ.aiComparator.selectedVendorId;
      const isCustom = r.isCustom;
      const refPricingLabel = r.vendor.isQuoteBased 
        ? 'Quote-Based Price' 
        : (r.vendor.id === 'custom-ai-agent' ? 'Indicative API Benchmark' : 'Official Reference Price');

      return `
        <tr class="border-b border-slate-100 ${isSelected ? 'bg-blue-50/50 font-medium' : ''}">
          <td class="p-3">
            <div class="flex items-center gap-2">
              <span class="font-semibold text-slate-900">${r.vendor.name}</span>
              ${isCustom ? '<span class="text-[10px] bg-purple-100 text-purple-800 border border-purple-200 px-1.5 py-0.5 rounded font-bold">Custom Price Entered by User</span>' : ''}
            </div>
            <div class="text-[11px] text-slate-500">${r.vendor.pricingModel}</div>
            <div class="text-[10px] mt-1 flex flex-wrap items-center gap-1.5">
              ${isCustom 
                ? `<span class="text-slate-500 font-medium">Reference: ${refPricingLabel} (${formatCurrency(r.vendor.costPerUserMonth || r.vendor.baseMonthlyCost)}/mo)</span>`
                : `<span class="${r.vendor.isQuoteBased ? 'text-amber-800 bg-amber-50 border border-amber-200' : 'text-emerald-800 bg-emerald-50 border border-emerald-200'} px-1.5 py-0.5 rounded font-medium">${r.vendor.pricingType}</span>`
              }
              <span class="text-slate-400">&bull;</span>
              <span class="text-slate-500">Verified: ${r.vendor.verificationDate}</span>
              <span class="text-slate-400">&bull;</span>
              <a href="${r.vendor.sourceUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline inline-flex items-center">
                Source Documentation <svg class="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </a>
            </div>
          </td>
          <td class="p-3 text-right">
            <div class="font-bold text-slate-900">${formatCurrency(r.year1Sub)}</div>
            <div class="flex items-center justify-end gap-1 mt-1">
              <button onclick="openEditPriceModal('${r.vendor.id}')" class="px-2 py-0.5 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded inline-flex items-center gap-1 transition" title="Customize subscription rate">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                <span>Edit Price</span>
              </button>
              ${isCustom ? `<button onclick="resetVendorPrice('${r.vendor.id}')" class="px-1.5 py-0.5 text-[10px] font-medium text-rose-600 hover:bg-rose-50 border border-rose-200 rounded transition" title="Restore default reference price">Reset</button>` : ''}
            </div>
          </td>
          <td class="p-3 text-right">${formatCurrency(r.year1Usage)}</td>
          <td class="p-3 text-right">${formatCurrency(r.annualSupport)}</td>
          <td class="p-3 text-right">${formatCurrency(r.year1Capex)}</td>
          <td class="p-3 text-right font-bold text-slate-900">${formatCurrency(r.totalYear1)}</td>
          <td class="p-3 text-right font-bold text-blue-600">${formatCurrency(r.contractTotal)}</td>
          <td class="p-3 text-center">
            <button onclick="selectVendor('${r.vendor.id}')" class="px-3 py-1 text-xs border rounded-md font-semibold transition ${isSelected ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'border-slate-300 hover:bg-slate-100 text-slate-700'}">
              ${isSelected ? 'Selected' : 'Select'}
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }
}

function selectVendor(vid) {
  ProcessIQ.aiComparator.selectedVendorId = vid;
  renderModule4();
  renderDashboard();
}

// -------------------------------------------------------------
// EDITABLE VENDOR PRICING MODAL & CONTROLS
// -------------------------------------------------------------
let editingVendorId = null;

function openEditPriceModal(vendorId) {
  const vendor = OFFICIAL_VENDORS.find(v => v.id === vendorId);
  if (!vendor) return;

  editingVendorId = vendorId;
  const modal = document.getElementById('edit-pricing-modal');
  if (!modal) return;

  const sym = ProcessIQ.currencySymbols[ProcessIQ.currency] || '$';
  const elSym1 = document.getElementById('modal-currency-symbol');
  const elSym2 = document.getElementById('modal-currency-symbol-2');
  if (elSym1) elSym1.innerText = sym;
  if (elSym2) elSym2.innerText = sym;

  // Header & Subtitle
  const elTitle = document.getElementById('modal-vendor-title');
  const elSub = document.getElementById('modal-vendor-subtitle');
  if (elTitle) elTitle.innerText = `Edit Subscription Pricing: ${vendor.name}`;
  if (elSub) elSub.innerText = `Vendor: ${vendor.vendor} • Tier: ${vendor.tier}`;

  // Reference Price Text
  const refLabel = vendor.isQuoteBased 
    ? 'Quote-Based Price (Bespoke Vendor Consultation Required)' 
    : (vendor.id === 'custom-ai-agent' ? 'Indicative API Benchmark' : 'Official Reference Price (Verified Public)');
  const elRefLabel = document.getElementById('modal-ref-label');
  const elRefText = document.getElementById('modal-ref-text');
  if (elRefLabel) elRefLabel.innerText = refLabel;

  let refDetails = '';
  if (vendor.id === 'm365-copilot') {
    refDetails = `Official Reference: $30.00 / user / month (Annual commitment required, $360/yr per seat). Verified from Microsoft Commercial Terms.`;
  } else if (vendor.id === 'copilot-studio') {
    refDetails = `Official Reference: $200.00 / tenant / month (Includes 25,000 billed messages). Additional capacity: $100 per 10k messages ($0.01/msg).`;
  } else if (vendor.id === 'claude-enterprise') {
    refDetails = `Benchmark Estimate: $45.00 / user / month (Typical 25-seat minimum). Requires bespoke Anthropic enterprise sales quotation.`;
  } else if (vendor.id === 'custom-ai-agent') {
    refDetails = `API Benchmark: $150.00/mo hosting + $5.00/user/mo + Token usage ($3.00/M input, $15.00/M output tokens).`;
  }
  if (elRefText) elRefText.innerText = refDetails;

  // Check if custom pricing exists
  const custom = ProcessIQ.aiComparator.customPricing && ProcessIQ.aiComparator.customPricing[vendorId];
  const users = Math.max(1, Number(ProcessIQ.aiComparator.userCount) || 1);

  const inPrice = document.getElementById('modal-input-price');
  const inBilling = document.getElementById('modal-input-billing');
  const inUsers = document.getElementById('modal-input-users');
  const inUsage = document.getElementById('modal-input-usage');

  if (custom && custom.isCustom) {
    if (inPrice) inPrice.value = custom.unitPrice;
    if (inBilling) inBilling.value = custom.billingFrequency || 'monthly';
    if (inUsers) inUsers.value = custom.userCount || users;
    if (inUsage) inUsage.value = custom.additionalUsageCostMonthly || 0;
  } else {
    if (vendor.id === 'm365-copilot') {
      if (inPrice) inPrice.value = vendor.costPerUserMonth;
      if (inBilling) inBilling.value = 'monthly';
      if (inUsers) inUsers.value = users;
      if (inUsage) inUsage.value = 0;
    } else if (vendor.id === 'copilot-studio') {
      if (inPrice) inPrice.value = vendor.baseMonthlyCost;
      if (inBilling) inBilling.value = 'monthly';
      if (inUsers) inUsers.value = 1;
      const totalMsgs = Number(ProcessIQ.aiComparator.expectedMonthlyInteractions) || 0;
      const overage = Math.max(0, totalMsgs - vendor.includedMessages);
      if (inUsage) inUsage.value = Math.round(overage * vendor.extraMessageCost);
    } else if (vendor.id === 'claude-enterprise') {
      if (inPrice) inPrice.value = vendor.costPerUserMonth;
      if (inBilling) inBilling.value = 'monthly';
      if (inUsers) inUsers.value = users;
      if (inUsage) inUsage.value = 0;
    } else if (vendor.id === 'custom-ai-agent') {
      const seatTotal = vendor.baseMonthlyCost + (users * vendor.costPerUserMonth);
      if (inPrice) inPrice.value = Math.round((seatTotal / users) * 10) / 10;
      if (inBilling) inBilling.value = 'monthly';
      if (inUsers) inUsers.value = users;
      const inputCost = (Number(ProcessIQ.aiComparator.monthlyInputTokensM) || 0) * vendor.inputTokenCostPerM;
      const outputCost = (Number(ProcessIQ.aiComparator.monthlyOutputTokensM) || 0) * vendor.outputTokenCostPerM;
      if (inUsage) inUsage.value = Math.round((inputCost + outputCost) * 10) / 10;
    }
  }

  const elPriceLabel = document.getElementById('modal-price-label');
  if (elPriceLabel) {
    elPriceLabel.innerText = vendor.id === 'copilot-studio' 
      ? 'Tenant Platform Base Fee' 
      : 'Subscription Price (Per User/Seat)';
  }

  updateModalPreview();
  modal.classList.remove('hidden');
}

function closeEditPriceModal() {
  const modal = document.getElementById('edit-pricing-modal');
  if (modal) modal.classList.add('hidden');
  editingVendorId = null;
}

function updateModalPreview() {
  if (!editingVendorId) return;
  const vendor = OFFICIAL_VENDORS.find(v => v.id === editingVendorId);
  if (!vendor) return;

  const inPrice = document.getElementById('modal-input-price');
  const inBilling = document.getElementById('modal-input-billing');
  const inUsers = document.getElementById('modal-input-users');
  const inUsage = document.getElementById('modal-input-usage');

  const price = Math.max(0, Number(inPrice ? inPrice.value : 0) || 0);
  const billing = inBilling ? inBilling.value : 'monthly';
  const users = Math.max(1, Number(inUsers ? inUsers.value : 1) || 1);
  const usageMonthly = Math.max(0, Number(inUsage ? inUsage.value : 0) || 0);
  const years = Math.max(1, Number(ProcessIQ.aiComparator.contractDurationYears) || 1);

  let monthlySub = 0;
  if (vendor.id === 'copilot-studio') {
    monthlySub = billing === 'annually' ? (price / 12) : price;
  } else {
    const seatMonthly = billing === 'annually' ? (price / 12) : price;
    monthlySub = seatMonthly * users;
  }

  const annualSub = monthlySub * 12;
  const annualUsage = usageMonthly * 12;
  const capex = (Number(ProcessIQ.aiComparator.implementationCostOneTime) || 0) + (Number(ProcessIQ.aiComparator.integrationCostOneTime) || 0);
  const maintenance = Number(ProcessIQ.aiComparator.annualMaintenanceSupportCost) || 0;
  const annualOpex = annualSub + annualUsage + maintenance;
  const totalYear1 = capex + annualOpex;
  const total3Yr = capex + (annualOpex * years);

  const prevMonth = document.getElementById('modal-preview-monthly');
  const prevAnnual = document.getElementById('modal-preview-annual');
  const prevUsage = document.getElementById('modal-preview-usage');
  const prevTotY1 = document.getElementById('modal-preview-total-year1');
  const prev3Yr = document.getElementById('modal-preview-3yr');

  if (prevMonth) prevMonth.innerText = formatCurrency(monthlySub);
  if (prevAnnual) prevAnnual.innerText = formatCurrency(annualSub);
  if (prevUsage) prevUsage.innerText = formatCurrency(annualUsage);
  if (prevTotY1) prevTotY1.innerText = formatCurrency(totalYear1);
  if (prev3Yr) prev3Yr.innerText = formatCurrency(total3Yr);
}

function saveCustomPrice() {
  if (!editingVendorId) return;
  const inPrice = document.getElementById('modal-input-price');
  const inBilling = document.getElementById('modal-input-billing');
  const inUsers = document.getElementById('modal-input-users');
  const inUsage = document.getElementById('modal-input-usage');

  const price = Math.max(0, Number(inPrice ? inPrice.value : 0) || 0);
  const billing = inBilling ? inBilling.value : 'monthly';
  const users = Math.max(1, Number(inUsers ? inUsers.value : 1) || 1);
  const usageMonthly = Math.max(0, Number(inUsage ? inUsage.value : 0) || 0);

  if (!ProcessIQ.aiComparator.customPricing) {
    ProcessIQ.aiComparator.customPricing = {};
  }

  ProcessIQ.aiComparator.customPricing[editingVendorId] = {
    isCustom: true,
    unitPrice: price,
    billingFrequency: billing,
    userCount: users,
    additionalUsageCostMonthly: usageMonthly,
    savedAt: new Date().toISOString()
  };

  closeEditPriceModal();
  renderModule4();
  renderDashboard();
  saveProgress();
  showToast('Custom subscription pricing saved & business case updated.');
}

function resetCurrentVendorPrice() {
  if (!editingVendorId) return;
  resetVendorPrice(editingVendorId);
  closeEditPriceModal();
}

function resetVendorPrice(vendorId) {
  if (ProcessIQ.aiComparator.customPricing && ProcessIQ.aiComparator.customPricing[vendorId]) {
    delete ProcessIQ.aiComparator.customPricing[vendorId];
  }
  renderModule4();
  renderDashboard();
  saveProgress();
  showToast('Restored default reference pricing.');
}

// Render Consolidated Dashboard
function renderDashboard() {
  const data = runConsolidatedCalculations();

  // Top KPIs
  const elTotLabor = document.getElementById('dash-labor-cost');
  const elTotLeak = document.getElementById('dash-leakage-cost');
  const elTotCap = document.getElementById('dash-capacity-value');
  const elReadiness = document.getElementById('dash-readiness-score');
  const elApproach = document.getElementById('dash-approach-title');
  const elApproachDesc = document.getElementById('dash-approach-desc');

  const elNetBenefit = document.getElementById('dash-net-benefit');
  const elRoi = document.getElementById('dash-roi');
  const elPayback = document.getElementById('dash-payback');

  if (elTotLabor) elTotLabor.innerText = formatCurrency(data.annualLabor);
  if (elTotLeak) elTotLeak.innerText = formatCurrency(data.annualLeakage);
  if (elTotCap) elTotCap.innerText = formatCurrency(data.annualCapacityValue);
  if (elReadiness) elReadiness.innerText = data.m3.isCompleted ? `${data.readinessScore}/100` : 'Assessment Pending';
  if (elApproach) elApproach.innerText = data.approachTitle;
  if (elApproachDesc) elApproachDesc.innerText = data.approachRationale;

  if (elNetBenefit) elNetBenefit.innerText = formatCurrency(data.netAnnualEconomicBenefit);
  if (elRoi) elRoi.innerText = `${data.roiPct}%`;
  if (elPayback) elPayback.innerText = `${data.paybackMonths} mo`;

  // Render Scenarios Cards
  const scenariosContainer = document.getElementById('dash-scenarios-container');
  if (scenariosContainer) {
    scenariosContainer.innerHTML = data.scenarios.map(s => `
      <div class="card-enterprise p-5 flex flex-col justify-between ${s.isRecommended ? 'scenario-card recommended' : ''}">
        <div>
          <div class="flex items-start justify-between gap-2 mb-2">
            <h4 class="font-bold text-slate-900">${s.name}</h4>
            ${s.isRecommended ? '<span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-600 text-white shadow-sm">Recommended</span>' : ''}
          </div>
          <p class="text-xs text-slate-500 mb-4">${s.tagline}</p>

          <!-- Operating Costs -->
          <div class="space-y-1.5 text-xs border-t border-slate-100 pt-3 mb-3 bg-slate-50/50 p-2.5 rounded-lg border">
            <div class="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Remaining Operating Costs</div>
            <div class="flex justify-between">
              <span class="text-slate-500">Remaining Labor Cost:</span>
              <span class="font-semibold text-slate-800">${formatCurrency(s.laborCost)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Remaining Cost Leakage:</span>
              <span class="font-semibold text-rose-600">${formatCurrency(s.leakageCost)}</span>
            </div>
            <div class="flex justify-between border-t border-slate-200/60 pt-1 font-medium">
              <span class="text-slate-600">Total Operating Run-Rate:</span>
              <span class="font-bold text-slate-900">${formatCurrency(s.totalOperatingCost)}</span>
            </div>
          </div>

          <!-- Financial Benefit Breakdown & Reconciliation -->
          <div class="space-y-1.5 text-xs">
            <div class="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Financial Reconciliation</div>
            <div class="flex justify-between">
              <span class="text-slate-500">• Actual Cash Savings:</span>
              <span class="font-semibold text-slate-800">${formatCurrency(s.actualCashSavings)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">• Avoided Process Leakage:</span>
              <span class="font-semibold text-slate-800">${formatCurrency(s.avoidedLeakage)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">• Capacity Value Released:</span>
              <span class="font-semibold text-slate-800">${formatCurrency(s.capacityValueReleased)}</span>
            </div>
            <div class="flex justify-between border-t border-slate-200/60 pt-1">
              <span class="text-slate-600 font-semibold">1. Gross Annual Benefits:</span>
              <span class="font-bold text-emerald-600">${formatCurrency(s.grossSavings)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">2. Annual Technology Opex:</span>
              <span class="font-semibold text-slate-700">${formatCurrency(s.aiCost)}</span>
            </div>
            <div class="flex justify-between bg-emerald-50/50 px-1.5 py-0.5 rounded border border-emerald-100">
              <span class="text-slate-700 font-semibold">3. Net Recurring Benefit:</span>
              <span class="font-bold text-emerald-700">${formatCurrency(s.netBenefit)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">4. One-Time Capex:</span>
              <span class="font-semibold text-slate-800">${formatCurrency(s.capex)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">5. 1st-Year Net Benefit:</span>
              <span class="font-bold ${s.firstYearNetBenefit >= 0 ? 'text-blue-700' : 'text-slate-700'}">${formatCurrency(s.firstYearNetBenefit)}</span>
            </div>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-200 space-y-1">
          <div class="flex justify-between text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
            <span>Recurring ROI: <strong class="text-slate-900 font-bold">${s.roiFormatted}</strong></span>
            <span>Payback: <strong class="text-slate-900 font-bold">${s.paybackFormatted}</strong></span>
          </div>
          <div class="text-[10px] text-slate-500 text-right pr-2">
            1st-Year Net ROI: <span class="font-semibold text-slate-700">${s.firstYearRoiFormatted}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Render Executive Scenario Reconciliation Table
  const tableContainer = document.getElementById('dash-scenarios-table-container');
  if (tableContainer) {
    tableContainer.innerHTML = `
      <table class="w-full text-xs text-left border-collapse">
        <thead>
          <tr class="bg-slate-900 text-white">
            <th class="p-2.5 rounded-l font-semibold">Scenario</th>
            <th class="p-2.5 text-right font-semibold">Run-Rate</th>
            <th class="p-2.5 text-right font-semibold">Cash Savings</th>
            <th class="p-2.5 text-right font-semibold">Avoided Leakage</th>
            <th class="p-2.5 text-right font-semibold">Capacity Value</th>
            <th class="p-2.5 text-right font-semibold">Gross Savings</th>
            <th class="p-2.5 text-right font-semibold">Tech Opex</th>
            <th class="p-2.5 text-right font-semibold">Net Recurring</th>
            <th class="p-2.5 text-right font-semibold">Capex</th>
            <th class="p-2.5 text-right font-semibold">1st-Yr Net</th>
            <th class="p-2.5 text-right font-semibold">Recurring ROI</th>
            <th class="p-2.5 text-right rounded-r font-semibold">Payback</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          ${data.scenarios.map(s => `
            <tr class="hover:bg-slate-50/80 transition ${s.isRecommended ? 'bg-blue-50/40 font-medium' : ''}">
              <td class="p-2.5 font-semibold text-slate-900">
                ${s.name} ${s.isRecommended ? '<span class="ml-1 text-[9px] px-1.5 py-0.5 rounded bg-blue-600 text-white font-bold">Recommended</span>' : ''}
              </td>
              <td class="p-2.5 text-right text-slate-700 font-medium">${formatCurrency(s.totalOperatingCost)}</td>
              <td class="p-2.5 text-right text-slate-700">${formatCurrency(s.actualCashSavings)}</td>
              <td class="p-2.5 text-right text-slate-700">${formatCurrency(s.avoidedLeakage)}</td>
              <td class="p-2.5 text-right text-slate-700">${formatCurrency(s.capacityValueReleased)}</td>
              <td class="p-2.5 text-right font-semibold text-emerald-600">${formatCurrency(s.grossSavings)}</td>
              <td class="p-2.5 text-right text-slate-700">${formatCurrency(s.aiCost)}</td>
              <td class="p-2.5 text-right font-bold text-emerald-700">${formatCurrency(s.netBenefit)}</td>
              <td class="p-2.5 text-right text-slate-700">${formatCurrency(s.capex)}</td>
              <td class="p-2.5 text-right font-semibold text-blue-700">${formatCurrency(s.firstYearNetBenefit)}</td>
              <td class="p-2.5 text-right font-bold text-slate-900">${s.roiFormatted}</td>
              <td class="p-2.5 text-right font-medium text-slate-800">${s.paybackFormatted}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  // Render Dashboard Scenario Comparison Chart
  const ctx = document.getElementById('dashChart');
  if (ctx && typeof Chart !== 'undefined') {
    if (ProcessIQ.charts.dash) ProcessIQ.charts.dash.destroy();
    ProcessIQ.charts.dash = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Scenario A (Current)', 'Scenario B (Automation)', 'Scenario C (AI Enabled)'],
        datasets: [
          {
            label: 'Labor Cost',
            data: data.scenarios.map(s => s.laborCost),
            backgroundColor: '#94a3b8'
          },
          {
            label: 'Process Leakage',
            data: data.scenarios.map(s => s.leakageCost),
            backgroundColor: '#f87171'
          },
          {
            label: 'Net Economic Benefit',
            data: data.scenarios.map(s => Math.max(0, s.netBenefit)),
            backgroundColor: '#10b981'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            stacked: false,
            ticks: { callback: v => formatCurrency(v) }
          }
        }
      }
    });
  }

  // Render Stage 5 Summary Card Metrics
  const elStage5Process = document.getElementById('stage5-summary-process');
  const elStage5Labor = document.getElementById('stage5-summary-labor');
  const elStage5Leak = document.getElementById('stage5-summary-leakage');
  const elStage5Benefit = document.getElementById('stage5-summary-benefit');
  const elStage5Roi = document.getElementById('stage5-summary-roi');

  if (elStage5Process) elStage5Process.innerText = ProcessIQ.manualCost.processName || 'Target Process';
  if (elStage5Labor) elStage5Labor.innerText = formatCurrency(data.annualLabor);
  if (elStage5Leak) elStage5Leak.innerText = formatCurrency(data.annualLeakage);
  if (elStage5Benefit) elStage5Benefit.innerText = formatCurrency(data.netAnnualEconomicBenefit);
  if (elStage5Roi) elStage5Roi.innerText = `${data.roiPct}%`;
}

// -------------------------------------------------------------
// EVENT LISTENERS & INPUT SYNC
// -------------------------------------------------------------
function syncInputs() {
  // Module 1 inputs
  const m1 = ProcessIQ.manualCost;
  const inM1Name = document.getElementById('in-m1-name');
  const inM1Emp = document.getElementById('in-m1-emp');
  const inM1Hours = document.getElementById('in-m1-hours');
  const inM1Days = document.getElementById('in-m1-days');
  const inM1Rate = document.getElementById('in-m1-rate');
  const inM1Recovery = document.getElementById('in-m1-recovery');
  const inM1Overtime = document.getElementById('in-m1-overtime');

  if (inM1Name) inM1Name.value = m1.processName;
  if (inM1Emp) inM1Emp.value = m1.employeeCount;
  if (inM1Hours) inM1Hours.value = m1.hoursPerDay;
  if (inM1Days) inM1Days.value = m1.workingDays;
  if (inM1Rate) inM1Rate.value = m1.hourlyRate;
  if (inM1Recovery) inM1Recovery.value = m1.recoverableCapacityPct;
  if (inM1Overtime) inM1Overtime.checked = m1.includeOvertime;

  // Sync back on change
  [inM1Name, inM1Emp, inM1Hours, inM1Days, inM1Rate, inM1Recovery, inM1Overtime].forEach(el => {
    if (el) {
      el.addEventListener('input', () => {
        m1.processName = inM1Name?.value || 'Target Process';
        m1.employeeCount = Number(inM1Emp?.value) || 0;
        m1.hoursPerDay = Number(inM1Hours?.value) || 0;
        m1.workingDays = Number(inM1Days?.value) || 0;
        m1.hourlyRate = Number(inM1Rate?.value) || 0;
        m1.recoverableCapacityPct = Number(inM1Recovery?.value) || 0;
        m1.includeOvertime = inM1Overtime?.checked ?? true;
        
        const labelRecov = document.getElementById('val-m1-recovery');
        if (labelRecov) labelRecov.innerText = `${m1.recoverableCapacityPct}%`;

        renderAll();
      });
    }
  });

  // Module 4 inputs
  const m4 = ProcessIQ.aiComparator;
  const inM4Users = document.getElementById('in-m4-users');
  const inM4Capex = document.getElementById('in-m4-capex');
  const inM4Integ = document.getElementById('in-m4-integ');
  const inM4Support = document.getElementById('in-m4-support');

  if (inM4Users) inM4Users.value = m4.userCount;
  if (inM4Capex) inM4Capex.value = m4.implementationCostOneTime;
  if (inM4Integ) inM4Integ.value = m4.integrationCostOneTime;
  if (inM4Support) inM4Support.value = m4.annualMaintenanceSupportCost;

  [inM4Users, inM4Capex, inM4Integ, inM4Support].forEach(el => {
    if (el) {
      el.addEventListener('input', () => {
        m4.userCount = Number(inM4Users?.value) || 1;
        m4.implementationCostOneTime = Number(inM4Capex?.value) || 0;
        m4.integrationCostOneTime = Number(inM4Integ?.value) || 0;
        m4.annualMaintenanceSupportCost = Number(inM4Support?.value) || 0;
        renderAll();
      });
    }
  });
}

// -------------------------------------------------------------
// CSV EXPORT ENGINE
// -------------------------------------------------------------
function downloadCSV() {
  const m1 = runManualCostCalculations();
  const m2 = runCostLeakageCalculations();
  const m3 = runAIReadinessCalculations();
  const data = runConsolidatedCalculations();

  const isDemo = ProcessIQ.isSampleData ? 'DEMONSTRATION SAMPLE DATA' : 'USER EVALUATION DATA';

  const rows = [
    ['ProcessIQ Consolidated Business Case & AI Readiness Export'],
    ['Report Type', isDemo],
    ['Generated Date', new Date().toISOString()],
    ['Target Process', ProcessIQ.manualCost.processName || 'Target Process'],
    ['Department', ProcessIQ.manualCost.department || 'Operations'],
    ['Currency', ProcessIQ.currency],
    ['Author Attribution', 'Created by Yuvraj Malpure'],
    [],
    ['--- MODULE 1: MANUAL WORK LABOR COST ---'],
    ['Employee Count (FTE)', ProcessIQ.manualCost.employeeCount],
    ['Hours Per Day', ProcessIQ.manualCost.hoursPerDay],
    ['Working Days Per Month', ProcessIQ.manualCost.workingDays],
    ['Average Hourly Rate', ProcessIQ.manualCost.hourlyRate],
    ['Monthly Labor Hours', m1.monthlyHours],
    ['Annual Labor Hours', m1.annualHours],
    ['Total Monthly Labor Cost', m1.totalMonthlyLaborCost],
    ['Total Annual Labor Cost', m1.totalAnnualLaborCost],
    ['Recoverable Capacity (%)', ProcessIQ.manualCost.recoverableCapacityPct],
    ['Recoverable Annual Capacity Hours', m1.recoverableAnnualHours],
    ['Estimated Recoverable Capacity Value', m1.recoverableAnnualValue],
    [],
    ['--- MODULE 2: PROCESS COST LEAKAGE ---'],
    ['Category Name', 'Monthly Leakage', 'Annual Leakage', 'Is User Estimate?'],
    ...m2.items.map(i => [i.name, i.monthly, i.annual, i.isEstimate ? 'Yes' : 'No']),
    ['Total Monthly Leakage', m2.totalMonthly],
    ['Total Annual Leakage', m2.totalAnnual],
    [],
    ['--- MODULE 3: AI READINESS ASSESSMENT ---'],
    ['Assessment Tier', m3.tier],
    ['Overall Readiness Score (0-100)', m3.isCompleted ? m3.overallScore : 'Assessment Pending'],
    ['Assessment Completion Status', m3.isCompleted ? 'Completed' : `Incomplete (${m3.answeredCount}/${m3.questionCount} Answered)`],
    ['Readiness Classification', m3.classification],
    ['Category Breakdown'],
    ...m3.categoryScores.map(c => [c.name, m3.isCompleted ? `${c.scorePct}%` : 'Pending', `${c.earned}/${c.max}`]),
    [],
    ['--- MODULE 4: AI INVESTMENT COMPARISON ---'],
    ['Selected Vendor', data.m4.active.vendor.name],
    ['Pricing Model Status', data.m4.active.isCustom ? 'Custom Price Entered by User' : (data.m4.active.vendor.isQuoteBased ? 'Quote-Based Contract' : 'Verified Public Pricing')],
    ['Custom Price Active', data.m4.active.isCustom ? 'Yes' : 'No'],
    ['License / Subscription Cost (Year 1)', data.m4.active.year1Sub],
    ['Usage / Consumption Cost (Year 1)', data.m4.active.year1Usage],
    ['Annual Maintenance & Support Cost', data.m4.active.annualSupport || 8000],
    ['One-Time Capex (Implementation & Integration)', data.m4.active.year1Capex],
    ['Total Year 1 AI Investment', data.m4.active.totalYear1],
    ['3-Year Contract Estimated Cost', data.m4.active.contractTotal],
    [],
    ['--- CONSOLIDATED BUSINESS CASE & SCENARIOS (RECONCILED METRICS) ---'],
    ['Recommended Strategic Pathway', data.approachTitle],
    ['Baseline Annual Operating Cost', data.annualLabor + data.annualLeakage],
    ['AI Scenario Net Annual Economic Benefit', data.netAnnualEconomicBenefit],
    ['AI Scenario First-Year Net Benefit', data.firstYearNetBenefit],
    ['AI Scenario Recurring Annual ROI (%)', `${data.roiPct}%`],
    ['AI Scenario Estimated Payback Period (Months)', `${data.paybackMonths} mo`],
    [],
    ['Scenario Name', 'Remaining Labor Cost', 'Remaining Leakage Cost', 'Total Remaining Run-Rate', 'Actual Cash Savings', 'Avoided Leakage Cost', 'Capacity Value Released', '1. Gross Annual Savings', '2. Annual Tech Opex', '3. Net Annual Recurring Benefit', '4. One-Time Capex', '5. 1st-Year Net Benefit', '6. Recurring Annual ROI (%)', 'First-Year Net ROI (%)', '7. Payback Period'],
    ...data.scenarios.map(s => [
      s.name,
      s.laborCost,
      s.leakageCost,
      s.totalOperatingCost,
      s.actualCashSavings,
      s.avoidedLeakage,
      s.capacityValueReleased,
      s.grossSavings,
      s.aiCost,
      s.netBenefit,
      s.capex,
      s.firstYearNetBenefit,
      s.roiFormatted,
      s.firstYearRoiFormatted,
      s.paybackFormatted
    ]),
    [],
    ['--- FINANCIAL MODEL METHODOLOGY & BENEFIT CLASSIFICATION ---'],
    ['Actual Cash Savings', 'Direct cash outlay reductions (eliminated duplicate payments, avoided SLA penalties, captured discounts).'],
    ['Avoided Process Leakage', 'Operational defect, rework, delay, and error elimination across workflow transactions.'],
    ['Recoverable Employee Capacity Value', 'Staff bandwidth liberated for higher-value activities valued at loaded hourly wage rate.'],
    ['Capacity Realization Policy', 'Recovered capacity constitutes strategic productivity; it becomes actual cash savings only when overtime, contractors, or staffing are formally adjusted.'],
    ['Anti-Double Counting Controls', 'Overlap between transaction error remediation and manual rework hours is deduplicated to prevent inflated returns.'],
    ['1. Gross Operating Savings', 'Actual Cash Savings + Avoided Process Leakage + Recoverable Employee Capacity Value.'],
    ['2. Annual Technology Opex', 'Annual license subscriptions, cloud infrastructure, and ongoing maintenance.'],
    ['3. Net Annual Recurring Benefit', 'Gross Operating Savings minus Annual Technology Operating Costs.'],
    ['4. One-Time Implementation Capex', 'Upfront setup, automation engineering, and enterprise systems integration fees.'],
    ['5. First-Year Net Benefit', 'Net Annual Recurring Benefit minus One-Time Implementation Capex.'],
    ['6. Recurring Annual ROI (%)', '(Net Annual Recurring Benefit / One-Time Implementation Capex) * 100.'],
    ['First-Year Net ROI (%)', '(First-Year Net Benefit / One-Time Implementation Capex) * 100.'],
    ['7. Payback Period', 'One-Time Implementation Capex / (Net Annual Recurring Benefit / 12). For Scenario A: N/A – Baseline Scenario.']
  ];

  const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `ProcessIQ_${(ProcessIQ.manualCost.processName || 'Process').replace(/\s+/g, '_')}_BusinessCase.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// -------------------------------------------------------------
// MULTI-PAGE CONSULTING PDF REPORT GENERATOR (14 PAGES/SECTIONS)
// -------------------------------------------------------------
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  if (!jsPDF) {
    alert('PDF generation engine is loading. Please retry in a moment.');
    return;
  }

  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - (margin * 2);

  const m1 = runManualCostCalculations();
  const m2 = runCostLeakageCalculations();
  const m3 = runAIReadinessCalculations();
  const data = runConsolidatedCalculations();

  let currentPage = 1;

  function addHeaderFooter(title) {
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // slate-400
    const demoPrefix = ProcessIQ.isSampleData ? '[DEMO SAMPLE] ' : '';
    doc.text(`PROCESSIQ ENTERPRISE REPORT | ${demoPrefix}${title.toUpperCase()}`, margin, 30);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(margin, 35, pageWidth - margin, 35);

    doc.line(margin, pageHeight - 35, pageWidth - margin, pageHeight - 35);
    const demoNote = ProcessIQ.isSampleData ? 'Demonstration Sample Case Study | ' : '';
    doc.text(`Confidential - ${demoNote}Created by Yuvraj Malpure`, margin, pageHeight - 22);
    doc.text(`Page ${currentPage}`, pageWidth - margin - 40, pageHeight - 22);
  }

  function newPage(title) {
    doc.addPage();
    currentPage++;
    addHeaderFooter(title);
  }

  // -----------------------------------------------------------
  // PAGE 1: COVER PAGE
  // -----------------------------------------------------------
  doc.setFillColor(15, 23, 42); // Navy #0f172a
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Accent band
  doc.setFillColor(37, 99, 235); // Blue #2563eb
  doc.rect(margin, 120, 6, 90, 'F');

  doc.setFontSize(32);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('PROCESSIQ', margin + 20, 155);

  doc.setFontSize(14);
  doc.setTextColor(147, 197, 253); // blue-300
  doc.setFont('helvetica', 'normal');
  doc.text('Know your process cost before you invest in AI.', margin + 20, 185);

  // Sample data banner if active
  if (ProcessIQ.isSampleData) {
    doc.setFillColor(217, 119, 6); // amber-600
    doc.roundedRect(margin, 240, contentWidth, 26, 4, 4, 'F');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('DEMONSTRATION SAMPLE REPORT - Fictional Accounts Payable Case Study', margin + 15, 257);
  }

  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('Business Transformation & AI Readiness Case', margin, 300);

  doc.setFontSize(14);
  doc.setTextColor(203, 213, 225); // slate-300
  doc.setFont('helvetica', 'normal');
  doc.text(`Target Process: ${ProcessIQ.manualCost.processName || 'Target Process'}`, margin, 335);
  doc.text(`Department: ${ProcessIQ.manualCost.department || 'Enterprise Operations'}`, margin, 360);
  doc.text(`Evaluation Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, margin, 385);

  // Summary box
  doc.setFillColor(30, 41, 59); // slate-800
  doc.roundedRect(margin, 460, contentWidth, 140, 6, 6, 'F');

  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('KEY EXECUTIVE FINDINGS AT A GLANCE', margin + 20, 490);

  doc.setFontSize(10);
  doc.setTextColor(203, 213, 225);
  doc.setFont('helvetica', 'normal');
  doc.text(`* Total Baseline Manual Labor Cost: ${formatCurrency(m1.totalAnnualLaborCost)} / year`, margin + 20, 515);
  doc.text(`* Quantified Process Leakage: ${formatCurrency(m2.totalAnnual)} / year`, margin + 20, 535);
  const readinessCoverStr = m3.isCompleted 
    ? `${m3.overallScore}/100 (${m3.classification})` 
    : `Assessment Pending (${m3.answeredCount}/${m3.questionCount} answered)`;
  doc.text(`* Evaluated AI Readiness Score: ${readinessCoverStr}`, margin + 20, 555);
  doc.text(`* Net Projected Economic Benefit: ${formatCurrency(data.netAnnualEconomicBenefit)} / year (ROI: ${data.roiPct}%)`, margin + 20, 575);

  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text('Created by Yuvraj Malpure', margin, pageHeight - 55);

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Generated via ProcessIQ Client-Side Evaluation Engine | Zero Cloud Data Transmission', margin, pageHeight - 40);

  // -----------------------------------------------------------
  // PAGE 2: EXECUTIVE SUMMARY
  // -----------------------------------------------------------
  newPage('Executive Summary');

  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('Executive Summary', margin, 70);

  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');
  const execSummaryText = 
    `This report establishes the baseline economics, cost leakage, and strategic AI readiness for ${ProcessIQ.manualCost.processName || 'the target workflow'}. ` +
    `Modern enterprises frequently rush into generative AI licensing without first calculating whether their manual processes are structured, ` +
    `governed, and financially suited for automation. ` +
    `Our objective evaluation combines four rigorous dimensions: labor intensity, systemic defect leakage, multi-tier organizational readiness, ` +
    `and commercial AI vendor total cost of ownership.`;
  doc.text(doc.splitTextToSize(execSummaryText, contentWidth), margin, 95);

  // Summary Table
  doc.autoTable({
    startY: 160,
    head: [['Strategic Dimension', 'Current Baseline Metric', 'Strategic Assessment']],
    body: [
      ['Annual Labor Exposure', formatCurrency(m1.totalAnnualLaborCost), `${formatNumber(m1.annualHours)} labor hours committed annually across ${ProcessIQ.manualCost.employeeCount} operators.`],
      ['Recoverable Capacity', `${formatCurrency(m1.recoverableAnnualValue)} (${ProcessIQ.manualCost.recoverableCapacityPct}%)`, `${formatNumber(m1.recoverableAnnualHours)} hours potentially liberated for higher-value activities.`],
      ['Process Cost Leakage', formatCurrency(m2.totalAnnual), `Operational defects, rework, and penalties contribute ${formatCurrency(m2.totalMonthly)}/month in leakage.`],
      ['AI Readiness Score', m3.isCompleted ? `${m3.overallScore}/100` : 'Assessment Pending', `${m3.classification}. ${m3.description}`],
      ['Recommended Strategy', data.approachTitle, data.approachRationale],
      ['Financial Returns (AI)', `ROI: ${data.roiPct}% | Payback: ${data.paybackMonths} mo`, `Net annual economic value of ${formatCurrency(data.netAnnualEconomicBenefit)} projected under Scenario C.`]
    ],
    theme: 'grid',
    headStyles: { fillColor: [15, 23, 42], textColor: 255, fontSize: 9, fontStyle: 'bold' },
    styles: { fontSize: 8, cellPadding: 6 }
  });

  // -----------------------------------------------------------
  // PAGE 3: PROCESS INFORMATION & ASSUMPTIONS
  // -----------------------------------------------------------
  newPage('Process Information & Baseline Parameters');

  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('Process Information & Key Assumptions', margin, 70);

  doc.autoTable({
    startY: 95,
    head: [['Input Parameter', 'Value', 'Methodology & Source Assumption']],
    body: [
      ['Process Name', ProcessIQ.manualCost.processName || 'Target Process', 'Target business workflow selected by user.'],
      ['Department / Unit', ProcessIQ.manualCost.department || 'Operations', 'Designated organizational department.'],
      ['Reporting Currency', ProcessIQ.currency, 'Base currency for financial calculations.'],
      ['Dedicated Headcount', `${ProcessIQ.manualCost.employeeCount} FTEs`, 'Full-time employees engaged in the daily workflow.'],
      ['Average Hours/Day', `${ProcessIQ.manualCost.hoursPerDay} hrs`, 'Estimated time per employee dedicated to this specific task.'],
      ['Working Days/Month', `${ProcessIQ.manualCost.workingDays} days`, 'Standard corporate working days.'],
      ['Fully-Loaded Hourly Rate', formatCurrency(ProcessIQ.manualCost.hourlyRate), 'Includes salary, payroll taxes, benefits, and standard overhead.'],
      ['Overtime Consideration', ProcessIQ.manualCost.includeOvertime ? `${ProcessIQ.manualCost.overtimeHours} hrs/mo @ ${formatCurrency(ProcessIQ.manualCost.overtimeRate)}/hr` : 'None', 'Recurring monthly overtime spend.'],
      ['Salary Escalation Rate', `${ProcessIQ.manualCost.annualSalaryIncreasePct}% per annum`, 'Baseline wage inflation assumption used for multi-year projections.'],
      ['Estimated Recovery Target', `${ProcessIQ.manualCost.recoverableCapacityPct}% of labor hours`, 'Targeted proportion of repetitive work reclaimable via transformation.']
    ],
    theme: 'striped',
    headStyles: { fillColor: [30, 41, 59], textColor: 255, fontSize: 9 }
  });

  // -----------------------------------------------------------
  // PAGE 4: MANUAL WORK COST ANALYSIS
  // -----------------------------------------------------------
  newPage('Manual Work Cost Analysis');

  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('Module 1: Hidden Cost of Manual Work', margin, 70);

  doc.autoTable({
    startY: 95,
    head: [['Metric', 'Monthly Figure', 'Annualized Figure (Year 1)', 'Year 2 Projected', 'Year 3 Projected']],
    body: [
      ['Base Labor Hours', `${formatNumber(m1.monthlyHours)} hrs`, `${formatNumber(m1.annualHours)} hrs`, `${formatNumber(m1.annualHours)} hrs`, `${formatNumber(m1.annualHours)} hrs`],
      ['Base Labor Cost', formatCurrency(m1.baseMonthlyLaborCost), formatCurrency(m1.baseAnnualLaborCost), formatCurrency(m1.baseAnnualLaborCost * 1.04), formatCurrency(m1.baseAnnualLaborCost * 1.0816)],
      ['Overtime Spend', formatCurrency(m1.monthlyOvertimeCost), formatCurrency(m1.monthlyOvertimeCost * 12), formatCurrency(m1.monthlyOvertimeCost * 12 * 1.04), formatCurrency(m1.monthlyOvertimeCost * 12 * 1.0816)],
      ['Total Labor Commitment', formatCurrency(m1.totalMonthlyLaborCost), formatCurrency(m1.totalAnnualLaborCost), formatCurrency(m1.projectedYear2LaborCost), formatCurrency(m1.projectedYear3LaborCost)],
      ['Recoverable Capacity Value', formatCurrency(m1.recoverableMonthlyValue), formatCurrency(m1.recoverableAnnualValue), formatCurrency(m1.recoverableAnnualValue * 1.04), formatCurrency(m1.recoverableAnnualValue * 1.0816)]
    ],
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontSize: 8 }
  });

  const finalY4 = doc.lastAutoTable ? doc.lastAutoTable.finalY + 18 : 250;
  doc.setFontSize(8.5);
  doc.setTextColor(180, 83, 9); // amber-700
  doc.setFont('helvetica', 'italic');
  const disclaimerP4 = 'Important Capacity Recovery Distinction: Recovered employee capacity reflects productive hours reclaimed for high-value strategic execution. It does not constitute immediate cash savings or guaranteed payroll reduction unless headcount, overtime, or contractor spend is formally restructured.';
  doc.text(doc.splitTextToSize(disclaimerP4, contentWidth), margin, finalY4);

  // -----------------------------------------------------------
  // PAGE 5: PROCESS COST LEAKAGE ANALYSIS
  // -----------------------------------------------------------
  newPage('Process Cost Leakage Analysis');

  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('Module 2: Where Is My Process Losing Money?', margin, 70);

  doc.autoTable({
    startY: 95,
    head: [['Leakage Category', 'Monthly Loss', 'Annual Loss', '% Contribution', 'Recommended Targeted Intervention']],
    body: m2.items.map(i => [
      i.name,
      formatCurrency(i.monthly),
      formatCurrency(i.annual),
      `${Math.round(i.pct)}%`,
      i.intervention
    ]),
    theme: 'grid',
    headStyles: { fillColor: [220, 38, 38], textColor: 255, fontSize: 8 }
  });

  let yPos5 = doc.lastAutoTable ? doc.lastAutoTable.finalY + 18 : 320;
  if (m2.warnings.length > 0) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(180, 83, 9);
    doc.text('Anti-Double Counting Controls & Operational Warnings:', margin, yPos5);
    yPos5 += 14;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    m2.warnings.forEach(w => {
      const lines = doc.splitTextToSize(`* ${w}`, contentWidth - 10);
      doc.text(lines, margin + 5, yPos5);
      yPos5 += (lines.length * 11) + 4;
    });
  } else {
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    doc.text('Anti-Double Counting Validation: Zero cross-category leakage overlaps identified.', margin, yPos5);
  }

  // -----------------------------------------------------------
  // PAGE 6: AI READINESS ASSESSMENT
  // -----------------------------------------------------------
  newPage('AI Readiness Assessment');

  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('Module 3: Is My Process AI-Ready?', margin, 70);

  doc.setFontSize(11);
  const pdfScoreHeading = m3.isCompleted 
    ? `Overall AI Readiness Score: ${m3.overallScore} / 100 (${m3.classification})`
    : `Overall AI Readiness Score: Assessment Pending (${m3.answeredCount} of ${m3.questionCount} questions answered)`;
  doc.text(pdfScoreHeading, margin, 95);

  doc.autoTable({
    startY: 110,
    head: [['Evaluation Category', 'Score (%)', 'Earned / Max Points', 'Maturity Status']],
    body: m3.categoryScores.map(c => [
      c.name,
      `${c.scorePct}%`,
      `${c.earned} / ${c.max}`,
      c.scorePct >= 75 ? 'Strength' : (c.scorePct >= 50 ? 'Acceptable' : 'Critical Gap')
    ]),
    theme: 'striped',
    headStyles: { fillColor: [15, 23, 42], textColor: 255, fontSize: 8 }
  });

  let yPos6 = doc.lastAutoTable ? doc.lastAutoTable.finalY + 18 : 280;

  // Strengths
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Identified Process Strengths:', margin, yPos6);
  yPos6 += 14;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  if (m3.strengths.length > 0) {
    m3.strengths.forEach(s => {
      const lines = doc.splitTextToSize(`+ ${s}`, contentWidth - 10);
      doc.text(lines, margin + 5, yPos6);
      yPos6 += (lines.length * 11) + 3;
    });
  } else {
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    doc.text('Diagnostic in progress: No high-scoring dimensions recorded yet.', margin + 5, yPos6);
    yPos6 += 14;
  }

  yPos6 += 10;
  // Vulnerabilities and Operational Risks (Priority 3 Check)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Identified Vulnerabilities & Operational Risks:', margin, yPos6);
  yPos6 += 14;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);

  if (!ProcessIQ.readiness.isCompleted) {
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    doc.text('Assessment incomplete: Complete the diagnostic questions in Module 3 to evaluate risks.', margin + 5, yPos6);
  } else if (m3.weaknesses.length > 0) {
    m3.weaknesses.forEach(w => {
      const lines = doc.splitTextToSize(`- ${w}`, contentWidth - 10);
      doc.text(lines, margin + 5, yPos6);
      yPos6 += (lines.length * 11) + 3;
    });
  } else {
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    doc.text('No significant risks identified from the supplied answers: All evaluated process dimensions meet or exceed maturity thresholds (>= 3/4).', margin + 5, yPos6);
  }

  // -----------------------------------------------------------
  // PAGE 7: AI INVESTMENT COMPARISON
  // -----------------------------------------------------------
  newPage('AI Investment Comparison');

  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('Module 4: Enterprise AI Investment Comparator', margin, 70);

  doc.autoTable({
    startY: 95,
    head: [['AI Platform', 'Pricing Model', 'Pricing Status', 'Year 1 Licenses', 'Annual Support', 'Year 1 Capex', 'Total Year 1', '3-Year Total']],
    body: data.m4.results.map(r => {
      const statusLabel = r.isCustom 
        ? 'Custom Price Entered by User' 
        : (r.vendor.isQuoteBased ? 'Quote-Based Contract' : 'Verified Public Pricing');
      return [
        r.vendor.name,
        r.vendor.pricingModel || r.vendor.tier,
        statusLabel,
        formatCurrency(r.year1Sub),
        formatCurrency(r.annualSupport || 8000),
        formatCurrency(r.year1Capex),
        formatCurrency(r.totalYear1),
        formatCurrency(r.contractTotal)
      ];
    }),
    theme: 'grid',
    headStyles: { fillColor: [30, 41, 59], textColor: 255, fontSize: 8 },
    styles: { fontSize: 7, cellPadding: 4 }
  });

  const finalY7 = doc.lastAutoTable ? doc.lastAutoTable.finalY + 16 : 280;
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  const noteP7 = 'Pricing Transparency Note: Microsoft 365 Copilot and Copilot Studio are verified public enterprise rates. Claude Enterprise represents an industry benchmark ($45/seat/mo) requiring bespoke vendor quote. Custom AI Agent rates reflect public developer token pricing ($3/M in, $15/M out) without synthetic credit conversions. Custom pricing entered by users is clearly tagged. Full citations in Section 14.';
  doc.text(doc.splitTextToSize(noteP7, contentWidth), margin, finalY7);

  // -----------------------------------------------------------
  // PAGE 8: SCENARIO COMPARISON (RECONCILED FINANCIAL METRICS)
  // -----------------------------------------------------------
  newPage('Transformation Scenario Comparison');

  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('Consolidated Scenario Modeling (A vs B vs C)', margin, 70);

  // Table 1: Reconciled Financial Benefits & Returns
  doc.autoTable({
    startY: 95,
    head: [['Scenario', 'Cash Savings', 'Avoided Leakage', 'Capacity Value', 'Gross Benefits', 'Tech Opex', 'Net Recurring', 'Capex', '1st-Yr Net', 'Recurring ROI', 'Payback']],
    body: data.scenarios.map(s => [
      s.name,
      formatCurrency(s.actualCashSavings),
      formatCurrency(s.avoidedLeakage),
      formatCurrency(s.capacityValueReleased),
      formatCurrency(s.grossSavings),
      formatCurrency(s.aiCost),
      formatCurrency(s.netBenefit),
      formatCurrency(s.capex),
      formatCurrency(s.firstYearNetBenefit),
      s.roiFormatted,
      s.paybackFormatted
    ]),
    theme: 'grid',
    headStyles: { fillColor: [15, 23, 42], textColor: 255, fontSize: 7.5 },
    styles: { fontSize: 6.5, cellPadding: 4 }
  });

  // Table 2: Operating Run-Rate Breakdown
  const table2Y = doc.lastAutoTable ? doc.lastAutoTable.finalY + 14 : 220;
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Operating Run-Rate & Cost Reduction Breakdown:', margin, table2Y);

  const baselineTotal = data.annualLabor + data.annualLeakage;
  doc.autoTable({
    startY: table2Y + 8,
    head: [['Scenario', 'Remaining Labor', 'Remaining Leakage', 'Total Remaining Cost', 'Operating Cost Reduction (%)']],
    body: data.scenarios.map(s => {
      const redPct = baselineTotal > 0 ? Math.round(((baselineTotal - s.totalOperatingCost) / baselineTotal) * 1000) / 10 : 0;
      return [
        s.name,
        formatCurrency(s.laborCost),
        formatCurrency(s.leakageCost),
        formatCurrency(s.totalOperatingCost),
        `${redPct}% (${formatCurrency(s.grossSavings)} saved)`
      ];
    }),
    theme: 'striped',
    headStyles: { fillColor: [51, 65, 85], textColor: 255, fontSize: 8 },
    styles: { fontSize: 7.5, cellPadding: 4.5 }
  });

  const pathwayY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 16 : 370;
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(37, 99, 235);
  doc.text(`Recommended Strategic Pathway: ${data.approachTitle}`, margin, pathwayY);
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');
  doc.text(doc.splitTextToSize(data.approachRationale, contentWidth), margin, pathwayY + 14);

  // -----------------------------------------------------------
  // PAGE 9: 30-DAY IMPROVEMENT ROADMAP
  // -----------------------------------------------------------
  newPage('30-Day Tactical Roadmap');

  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('Recommended 30-Day Tactical Roadmap', margin, 70);

  doc.autoTable({
    startY: 95,
    head: [['Time Horizon', 'Strategic Phase', 'Tactical Actions', 'Key Deliverable', 'Accountable Owner']],
    body: m3.roadmap.map(r => [
      r.days,
      r.phase,
      r.task,
      r.deliverable,
      r.owner
    ]),
    theme: 'grid',
    headStyles: { fillColor: [5, 150, 105], textColor: 255, fontSize: 8 }
  });

  // -----------------------------------------------------------
  // PAGE 10: METHODOLOGY, PRICING SOURCES & DISCLAIMERS
  // -----------------------------------------------------------
  newPage('Methodology & Sources');

  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('Calculation Methodology, Sources & Disclaimers', margin, 70);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Official Pricing Sources & Citations:', margin, 95);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  let yPos = 110;
  OFFICIAL_VENDORS.forEach(v => {
    const statusLabel = v.isQuoteBased ? 'Quote-Based Contract (Bespoke Vendor Consultation Required)' : 'Verified Public Enterprise Pricing';
    const lines = doc.splitTextToSize(`* ${v.name} (${v.currency}): ${statusLabel} | Source: ${v.source} | URL: ${v.sourceUrl} | Verified: ${v.verificationDate}`, contentWidth);
    doc.text(lines, margin, yPos);
    yPos += (lines.length * 10) + 4;
  });

  yPos += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Methodology Disclaimers & Governance Controls:', margin, yPos);
  yPos += 14;

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  const disclaimers = [
    '1. Capacity Recovery Distinction: Recovered capacity reflects reallocated productive bandwidth liberated for high-value execution. It does not constitute guaranteed cash payroll reduction unless staffing or overtime is formally restructured.',
    '2. Anti-Double Counting Safeguards: Overlap between transaction error remediation and manual rework labor has been deduplicated to prevent artificial inflation of financial benefits.',
    '3. Vendor Pricing Verification: Microsoft pricing is verified from commercial documentation. Claude Enterprise is an indicative benchmark requiring direct Anthropic quotation. Custom LLM pricing uses developer API token consumption rates without synthetic credit conversion. Implementation capex ($40,000 baseline) and annual support ($8,000/yr baseline) are illustrative enterprise assumptions that users may configure directly in Module 4.',
    '4. AI Readiness Diagnostic: Diagnostic scores reflect organizational responses and do not constitute an audited legal, compliance, or cybersecurity warranty.',
    '5. Client-Side Privacy: All calculations, transformations, and document compilations were executed in-memory within the local browser sandbox. Zero business data was stored or transmitted across any network. External network activity is strictly limited to retrieving public static code libraries (Tailwind, Chart.js, jsPDF) on initial page load.',
    '6. Pricing Transparency & Auditability: ProcessIQ maintains dual-layer pricing governance. Official vendor reference rates remain permanent benchmarks, while custom contract prices entered by users are explicitly flagged across all executive dashboards, CSV exports, and formal reports.'
  ];
  disclaimers.forEach(d => {
    const lines = doc.splitTextToSize(d, contentWidth);
    doc.text(lines, margin, yPos);
    yPos += (lines.length * 10) + 4;
  });

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('ProcessIQ Enterprise Valuation Platform | Created by Yuvraj Malpure', margin, pageHeight - 50);

  // Save the PDF
  const filename = `ProcessIQ_${(ProcessIQ.manualCost.processName || 'Process').replace(/\s+/g, '_')}_Report.pdf`;
  doc.save(filename);
}

// -------------------------------------------------------------
// EXECUTIVE DASHBOARD PRINT REPORT ENGINE (2-PAGE A4 SUMMARY)
// -------------------------------------------------------------
function preparePrintReport() {
  const container = document.getElementById('print-executive-report');
  if (!container) return;

  const m1 = runManualCostCalculations();
  const m2 = runCostLeakageCalculations();
  const m3 = runAIReadinessCalculations();
  const m4 = runAIComparatorCalculations();
  const data = runConsolidatedCalculations();

  const isSample = Boolean(ProcessIQ.isSampleData);
  const processName = ProcessIQ.manualCost.processName || 'Enterprise Process';
  const department = ProcessIQ.manualCost.department || 'Operations';
  const cur = ProcessIQ.currency || 'USD';
  const activeVendor = m4.active;
  const activeVendorName = activeVendor?.vendor?.name || 'Enterprise AI Architecture';
  const isCustomPrice = Boolean(activeVendor?.isCustom);

  const evalDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const scA = data.scenarios[0];
  const scB = data.scenarios[1];
  const scC = data.scenarios[2];

  function escapePrintHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  container.innerHTML = `
    <!-- PAGE 1: EXECUTIVE DASHBOARD & SCENARIO COMPARISON -->
    <div class="print-page print-page-1">
      <div>
        <!-- SECTION 1: HEADER -->
        <div class="print-header">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 16pt; font-weight: 800; color: #0f172a; letter-spacing: -0.02em;">ProcessIQ</span>
                <span style="font-size: 9pt; color: #64748b; font-weight: 500;">| Executive Valuation Report</span>
                ${isSample ? '<span class="print-badge-demo">DEMONSTRATION SAMPLE</span>' : ''}
              </div>
              <div style="font-size: 8.5pt; color: #475569; margin-top: 2px;">
                Know your process cost before you invest in AI.
              </div>
            </div>
            <div style="text-align: right; font-size: 7.5pt; color: #64748b; line-height: 1.4;">
              <div><strong>Evaluation Date:</strong> ${evalDate}</div>
              <div><strong>Created by:</strong> <span style="color: #0f172a; font-weight: 600;">Yuvraj Malpure</span></div>
              <div><strong>Currency:</strong> ${cur}</div>
            </div>
          </div>
          <div style="margin-top: 6px; padding-top: 5px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-size: 8pt; color: #334155;">
            <div><strong>Process Evaluated:</strong> ${escapePrintHtml(processName)}</div>
            <div><strong>Department / Unit:</strong> ${escapePrintHtml(department)}</div>
            <div><strong>Target AI Architecture:</strong> ${escapePrintHtml(activeVendorName)}${isCustomPrice ? ' <span class="print-badge-recommended" style="background:#fef3c7!important;color:#92400e!important;">Custom Pricing</span>' : ''}</div>
          </div>
        </div>

        <!-- SECTION 2: EXECUTIVE KPI CARDS -->
        <div style="font-size: 8.5pt; font-weight: 700; color: #0f172a; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.04em;">
          Executive Financial & Readiness Overview
        </div>
        <div class="print-kpi-grid">
          <div class="print-kpi-card">
            <div style="font-size: 7pt; color: #64748b; font-weight: 600; text-transform: uppercase;">Annual Manual Labor Cost</div>
            <div style="font-size: 13pt; font-weight: 800; color: #0f172a; margin-top: 2px;">${formatCurrency(data.annualLabor)}</div>
            <div style="font-size: 6.5pt; color: #64748b; margin-top: 2px;">Baseline manual operating cost</div>
          </div>
          <div class="print-kpi-card">
            <div style="font-size: 7pt; color: #64748b; font-weight: 600; text-transform: uppercase;">Annual Process Cost Leakage</div>
            <div style="font-size: 13pt; font-weight: 800; color: #dc2626; margin-top: 2px;">${formatCurrency(data.annualLeakage)}</div>
            <div style="font-size: 6.5pt; color: #64748b; margin-top: 2px;">Errors, rework & compliance risk</div>
          </div>
          <div class="print-kpi-card">
            <div style="font-size: 7pt; color: #64748b; font-weight: 600; text-transform: uppercase;">AI Readiness Score</div>
            <div style="font-size: 13pt; font-weight: 800; color: #2563eb; margin-top: 2px;">${m3.isCompleted ? data.readinessScore : 'Pending'} <span style="font-size: 8pt; font-weight: 600; color: #64748b;">${m3.isCompleted ? '/ 100' : ''}</span></div>
            <div style="font-size: 6.5pt; color: #2563eb; font-weight: 600; margin-top: 2px;">${escapePrintHtml(m3.classification)}</div>
          </div>
          <div class="print-kpi-card">
            <div style="font-size: 7pt; color: #64748b; font-weight: 600; text-transform: uppercase;">Net Annual Economic Benefit</div>
            <div style="font-size: 13pt; font-weight: 800; color: #059669; margin-top: 2px;">${formatCurrency(data.netAnnualEconomicBenefit)}</div>
            <div style="font-size: 6.5pt; color: #059669; font-weight: 600; margin-top: 2px;">Scenario C recurring value</div>
          </div>
        </div>

        <!-- SECTION 3: SCENARIO COMPARISON TABLE -->
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
          <div style="font-size: 8.5pt; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.04em;">
            Strategic Scenario Financial Comparison
          </div>
          <div style="font-size: 7pt; color: #64748b;">
            Reconciled multi-scenario financial model
          </div>
        </div>

        <table class="print-table">
          <thead>
            <tr>
              <th style="width: 38%;">Strategic Financial Metric</th>
              <th style="width: 20%;">Scenario A: Current Baseline</th>
              <th style="width: 21%;">Scenario B: Automation First</th>
              <th style="width: 21%;">Scenario C: Enterprise AI ${scC.isRecommended ? '<span class="print-badge-recommended">Recommended</span>' : ''}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="font-weight: 600;">Operating Model & Scope</td>
              <td style="color: #64748b;">Manual Processing & Leakage</td>
              <td>Standardization + Low-Code</td>
              <td style="font-weight: 600; color: #1e3a8a;">Supervised AI Copilots & Agents</td>
            </tr>
            <tr class="highlight-row">
              <td style="font-weight: 700;">1. Gross Annual Operating Savings (Total Benefit)</td>
              <td style="font-weight: 700;">${formatCurrency(scA.grossSavings)}</td>
              <td style="font-weight: 700;">${formatCurrency(scB.grossSavings)}</td>
              <td style="font-weight: 800; color: #1e3a8a;">${formatCurrency(scC.grossSavings)}</td>
            </tr>
            <tr>
              <td style="padding-left: 14px;">&bull; Capacity Value Released (Labor Bandwidth)</td>
              <td>${formatCurrency(scA.capacityValueReleased)}</td>
              <td>${formatCurrency(scB.capacityValueReleased)}</td>
              <td>${formatCurrency(scC.capacityValueReleased)}</td>
            </tr>
            <tr>
              <td style="padding-left: 14px;">&bull; Avoided Defect & Dispute Leakage (Total Avoided)</td>
              <td>${formatCurrency(scA.avoidedLeakage)}</td>
              <td>${formatCurrency(scB.avoidedLeakage)}</td>
              <td>${formatCurrency(scC.avoidedLeakage)}</td>
            </tr>
            <tr style="background-color: #f8fafc; font-size: 7.5pt; color: #475569;">
              <td style="padding-left: 26px; font-style: italic;">↳ [Component] Actual Cash Savings (Direct Disbursements)</td>
              <td style="font-style: italic;">${formatCurrency(scA.actualCashSavings)}</td>
              <td style="font-style: italic;">${formatCurrency(scB.actualCashSavings)}</td>
              <td style="font-style: italic; font-weight: 600; color: #047857;">${formatCurrency(scC.actualCashSavings)}</td>
            </tr>
            <tr style="background-color: #f8fafc; font-size: 7.5pt; color: #475569;">
              <td style="padding-left: 26px; font-style: italic;">↳ [Component] Non-Cash Error, Rework & Dispute Avoidance</td>
              <td style="font-style: italic;">${formatCurrency(0)}</td>
              <td style="font-style: italic;">${formatCurrency(scB.avoidedLeakage - scB.actualCashSavings)}</td>
              <td style="font-style: italic;">${formatCurrency(scC.avoidedLeakage - scC.actualCashSavings)}</td>
            </tr>
            <tr>
              <td>2. Annual Technology Operating Costs (Opex)</td>
              <td>${formatCurrency(scA.aiCost)}</td>
              <td>${formatCurrency(scB.aiCost)}</td>
              <td style="color: #b91c1c;">${formatCurrency(scC.aiCost)}</td>
            </tr>
            <tr>
              <td>3. One-Time Implementation Investment (Capex)</td>
              <td>${formatCurrency(scA.capex)}</td>
              <td>${formatCurrency(scB.capex)}</td>
              <td>${formatCurrency(scC.capex)}</td>
            </tr>
            <tr class="highlight-row">
              <td style="font-weight: 700;">4. Net Annual Recurring Benefit (Gross − Opex)</td>
              <td style="font-weight: 700;">${formatCurrency(scA.netBenefit)}</td>
              <td style="font-weight: 700;">${formatCurrency(scB.netBenefit)}</td>
              <td style="color: #047857; font-weight: 800;">${formatCurrency(scC.netBenefit)}</td>
            </tr>
            <tr>
              <td>5. First-Year Net Economic Value (Net Recurring − Capex)</td>
              <td>${formatCurrency(scA.firstYearNetBenefit)}</td>
              <td>${formatCurrency(scB.firstYearNetBenefit)}</td>
              <td style="font-weight: 700; color: #047857;">${formatCurrency(scC.firstYearNetBenefit)}</td>
            </tr>
            <tr class="bold-row">
              <td>6. Recurring Return on Investment (ROI)</td>
              <td>${scA.roiFormatted || 'N/A – Baseline'}</td>
              <td>${scB.roiFormatted}</td>
              <td style="color: #1d4ed8; font-weight: 800;">${scC.roiFormatted}</td>
            </tr>
            <tr class="bold-row">
              <td>7. Estimated Payback Period</td>
              <td>${scA.paybackFormatted || 'N/A – Baseline Scenario'}</td>
              <td>${scB.paybackFormatted}</td>
              <td style="color: #1d4ed8; font-weight: 800;">${scC.paybackFormatted}</td>
            </tr>
          </tbody>
        </table>

        <!-- SECTION 3.1: FINANCIAL GOVERNANCE CALLOUT NOTE -->
        <div class="print-callout">
          <strong>Component Hierarchy & Anti-Double-Counting Governance:</strong>
          Gross Annual Operating Savings is the mathematical sum of <em>Capacity Value Released</em> plus <em>Total Avoided Leakage</em>. Actual Cash Savings (Direct Hard Cash Savings) is an embedded component of Total Avoided Leakage (prevented direct cash disbursements such as duplicate vendor payments and SLA penalties) and is not additively combined with avoided leakage. Capacity Value Released represents operational labor bandwidth liberated for value-adding execution and converts to cash payroll reduction only upon formal staffing adjustments or overtime elimination.
        </div>

        <!-- SECTION 3.2: EXECUTIVE FINANCIAL COMMENTARY & GUARDRAILS -->
        <div class="print-two-col">
          <div class="print-card-box">
            <div style="font-size: 7.75pt; font-weight: 700; color: #0f172a; text-transform: uppercase; margin-bottom: 3px;">
              Cash vs. Bandwidth Realization Policy
            </div>
            <div style="font-size: 7.25pt; color: #475569; line-height: 1.4;">
              <strong>Direct Cash Savings:</strong> Hard disbursements eliminated directly from operating expense budgets.<br>
              <strong>Capacity Value:</strong> Reclaimed productive hours enabling volume scaling, customer turnaround improvements, and higher-order analytical execution without headcount expansion.
            </div>
          </div>
          <div class="print-card-box">
            <div style="font-size: 7.75pt; font-weight: 700; color: #0f172a; text-transform: uppercase; margin-bottom: 3px;">
              Capital Efficiency & Breakeven Governance
            </div>
            <div style="font-size: 7.25pt; color: #475569; line-height: 1.4;">
              <strong>Payback Velocity:</strong> Rapid capital recapture (${scB.paybackFormatted} in B; ${scC.paybackFormatted} in C) driven by high baseline manual rework.<br>
              <strong>Amortization Horizon:</strong> One-time implementation investments (${formatCurrency(scB.capex)} in B; ${formatCurrency(scC.capex)} in C) fully recovered within year one.
            </div>
          </div>
        </div>
      </div>

      <!-- PAGE 1 FOOTER -->
      <div class="print-footer">
        <div><strong>ProcessIQ</strong> &bull; Know your process cost before you invest in AI &bull; Created by <strong>Yuvraj Malpure</strong></div>
        <div>Page 1 of 2</div>
      </div>
    </div>

    <!-- PAGE BREAK -->
    <div class="print-page-break"></div>

    <!-- PAGE 2: AI READINESS DIAGNOSTIC, RECOMMENDATION & ROADMAP -->
    <div class="print-page print-page-2">
      <div>
        <!-- HEADER -->
        <div class="print-header" style="margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="font-size: 12pt; font-weight: 800; color: #0f172a;">ProcessIQ</span>
              <span style="font-size: 8.5pt; color: #64748b; font-weight: 500;">| Executive AI Readiness Diagnostic & Strategic Roadmap</span>
            </div>
            <div style="font-size: 7.5pt; color: #64748b;">
              Process: <strong style="color: #0f172a;">${escapePrintHtml(processName)}</strong> &bull; Created by <strong style="color: #0f172a;">Yuvraj Malpure</strong>
              ${isSample ? ' &bull; <span class="print-badge-demo">DEMONSTRATION SAMPLE</span>' : ''}
            </div>
          </div>
        </div>

        <!-- SECTION 4: AI READINESS DIAGNOSTIC -->
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
          <div style="font-size: 8.5pt; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.04em;">
            AI Readiness Diagnostic (${m3.isCompleted ? data.readinessScore + ' / 100 &mdash; ' : ''}${escapePrintHtml(m3.classification)})
          </div>
          <div style="font-size: 7pt; color: #64748b;">
            Maturity Assessment across 5 Strategic Dimensions
          </div>
        </div>

        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 10px; margin-bottom: 8px; font-size: 7.5pt; color: #334155;">
          <strong>Readiness Status:</strong> ${escapePrintHtml(m3.description)}
        </div>

        <!-- 5 DIMENSIONS BREAKDOWN -->
        <table class="print-table" style="margin-bottom: 8px;">
          <thead>
            <tr>
              <th style="width: 45%;">Assessment Dimension</th>
              <th style="width: 20%; text-align: center;">Score</th>
              <th style="width: 35%;">Maturity Rating Bar</th>
            </tr>
          </thead>
          <tbody>
            ${(() => {
              const DIMENSION_LABELS = {
                'Process': 'Process Maturity & Standardization',
                'Data': 'Data Quality & System Accessibility',
                'Technology': 'Technology & Integration Architecture',
                'Governance & Risk': 'Governance, Risk & Compliance Controls',
                'Organization & Value': 'Organization, Culture & Value Realization'
              };
              return m3.categoryScores.map(cat => `
                <tr>
                  <td style="font-weight: 600;">
                    ${escapePrintHtml(cat.name)}
                    <span style="font-weight: normal; color: #64748b; font-size: 7pt;">(${escapePrintHtml(DIMENSION_LABELS[cat.name] || '')})</span>
                  </td>
                  <td style="text-align: center; font-weight: 700;">${cat.scorePct}% <span style="font-weight: normal; color: #64748b; font-size: 7pt;">(${cat.earned}/${cat.max} pts)</span></td>
                  <td>
                    <div class="print-progress-bar">
                      <div class="print-progress-fill" style="width: ${cat.scorePct}%;"></div>
                    </div>
                  </td>
                </tr>
              `).join('');
            })()}
          </tbody>
        </table>

        <!-- STRENGTHS & WEAKNESSES GRID -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
          <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; background: #f8fafc;">
            <div style="font-size: 7.5pt; font-weight: 700; color: #047857; text-transform: uppercase; margin-bottom: 4px;">
              Key Operational Strengths
            </div>
            <ul style="margin: 0; padding-left: 14px; font-size: 7.25pt; color: #334155; line-height: 1.4;">
              ${(m3.strengths && m3.strengths.length > 0 ? m3.strengths : ['High workflow repeatability', 'Standardized document formats', 'Documented exception pathways']).slice(0, 3).map(s => `<li>${escapePrintHtml(s)}</li>`).join('')}
            </ul>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; background: #f8fafc;">
            <div style="font-size: 7.5pt; font-weight: 700; color: #b91c1c; text-transform: uppercase; margin-bottom: 4px;">
              Critical Improvement Gaps & Risks
            </div>
            <ul style="margin: 0; padding-left: 14px; font-size: 7.25pt; color: #334155; line-height: 1.4;">
              ${(m3.weaknesses && m3.weaknesses.length > 0 ? m3.weaknesses : ['Exception handling requires manual intervention', 'System integration points rely on batch files', 'Data lineage documentation needs formal review']).slice(0, 3).map(w => `<li>${escapePrintHtml(w)}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- SECTION 5: STRATEGIC RECOMMENDATION & NEXT STEPS -->
        <div style="border: 1px solid #2563eb; border-radius: 6px; background: #eff6ff; padding: 7px 10px; margin-bottom: 8px;">
          <div style="font-size: 8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase;">
            Recommended Strategic Approach: ${escapePrintHtml(data.approachTitle)}
          </div>
          <div style="font-size: 7.25pt; color: #1e40af; margin-top: 2px; line-height: 1.35;">
            ${escapePrintHtml(data.approachRationale)}
          </div>
        </div>

        <div style="font-size: 8pt; font-weight: 700; color: #0f172a; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.04em;">
          Phased 30-Day Tactical Implementation Plan
        </div>

        <table class="print-table" style="margin-bottom: 8px;">
          <thead>
            <tr>
              <th style="width: 18%;">Timeline & Phase</th>
              <th style="width: 32%;">Key Transformation Focus</th>
              <th style="width: 32%;">Tangible Executive Deliverable</th>
              <th style="width: 18%;">Accountable Owner</th>
            </tr>
          </thead>
          <tbody>
            ${(m3.roadmap && m3.roadmap.length > 0 ? m3.roadmap : [
              { days: 'Days 1–10', phase: 'Process Hygiene & Baseline Mapping', task: 'Workflow Mapping & SOP Standardization', deliverable: 'Step-level flowchart with exception matrix', owner: 'Process Owner & Ops Lead' },
              { days: 'Days 11–20', phase: 'Data Architecture & Privacy Guardrails', task: 'Data Accessibility Audit & Sanitization', deliverable: '50-item clean golden evaluation dataset with ground truth', owner: 'Data Engineer & Security Lead' },
              { days: 'Days 21–30', phase: 'Supervised Pilot & Change Enablement', task: 'Constrained Pilot (20% volume) with HITL Sign-offs', deliverable: 'Pilot Performance Scorecard measuring cycle-time and adoption', owner: 'Transformation Lead & Power Users' }
            ]).map(step => `
              <tr>
                <td style="font-weight: 700; color: #1e3a8a;">${escapePrintHtml(step.days)}<br><span style="font-weight: normal; color: #64748b; font-size: 6.75pt;">${escapePrintHtml(step.phase)}</span></td>
                <td>${escapePrintHtml(step.task)}</td>
                <td>${escapePrintHtml(step.deliverable)}</td>
                <td style="color: #475569;">${escapePrintHtml(step.owner)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- SECTION 6: GOVERNANCE, SIGN-OFF & DISCLAIMER -->
        <div class="print-callout" style="border-left-color: #64748b; margin-bottom: 7px;">
          <strong>Confidentiality, Local Execution & Compliance Notice (Data Governance):</strong>
          All assessment models, financial calculations, and comparative projections in this report are processed client-side within the local browser environment. If saved, session parameters are retained strictly in the device's browser local storage (localStorage) and are not transmitted to remote servers or stored in cloud databases. Projections represent indicative economic decision-support models based on user-provided operational assumptions and published vendor benchmarks; they do not constitute formal legal, compliance, or cybersecurity audit warranties and must be validated through technical discovery.
          ${isSample ? '<br><strong>Demonstration Notice:</strong> Compiled using ProcessIQ Accounts Payable demonstration sample benchmark data for illustrative analysis.' : ''}
        </div>

        <table class="print-table" style="margin-bottom: 0;">
          <tbody>
            <tr>
              <td style="width: 50%; padding: 6px 8px; vertical-align: top; background: #ffffff !important;">
                <div style="font-size: 6.75pt; color: #64748b; text-transform: uppercase; font-weight: 700;">Prepared By (Process Transformation Lead):</div>
                <div style="margin-top: 14px; border-bottom: 1px dotted #94a3b8; width: 85%;"></div>
                <div style="font-size: 6.5pt; color: #64748b; margin-top: 2px;">Signature / Date</div>
              </td>
              <td style="width: 50%; padding: 6px 8px; vertical-align: top; background: #ffffff !important;">
                <div style="font-size: 6.75pt; color: #64748b; text-transform: uppercase; font-weight: 700;">Approved By (Executive Business Sponsor):</div>
                <div style="margin-top: 14px; border-bottom: 1px dotted #94a3b8; width: 85%;"></div>
                <div style="font-size: 6.5pt; color: #64748b; margin-top: 2px;">Signature / Date</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- PAGE 2 FOOTER -->
      <div class="print-footer">
        <div><strong>ProcessIQ</strong> &bull; Confidential Executive Briefing &bull; Created by <strong>Yuvraj Malpure</strong></div>
        <div>Page 2 of 2</div>
      </div>
    </div>
  `;
}

function printExecutiveReport() {
  preparePrintReport();
  window.print();
}

// -------------------------------------------------------------
// APP INITIALIZATION
// -------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  // Bind primary homepage button listeners defensively
  const btnStart = document.getElementById('btn-start-assessment');
  if (btnStart) {
    btnStart.addEventListener('click', (e) => {
      e.preventDefault();
      goToStage(2);
    });
  }

  const btnExplore = document.getElementById('btn-explore-sample');
  if (btnExplore) {
    btnExplore.addEventListener('click', (e) => {
      e.preventDefault();
      loadSampleData();
      goToStage(4);
    });
  }

  const btnStartPrivacy = document.getElementById('btn-start-assessment-privacy');
  if (btnStartPrivacy) {
    btnStartPrivacy.addEventListener('click', (e) => {
      e.preventDefault();
      goToStage(2);
    });
  }

  // Hook beforeprint event to render executive report dynamically
  window.addEventListener('beforeprint', preparePrintReport);

  // Expose print functions globally
  window.preparePrintReport = preparePrintReport;
  window.printExecutiveReport = printExecutiveReport;

  syncInputs();
  renderAll();
  loadProgress(); // Restore any previously saved session if safe
});
