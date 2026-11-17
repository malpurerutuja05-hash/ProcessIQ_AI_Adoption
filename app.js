/**
 * ProcessIQ: Enterprise Consulting SaaS Application Engine
 * Guided User Experience & Self-Explanatory Transformation Cockpit
 * Pure client-side calculations, real-time charts, multi-page PDF generation, and CSV export.
 * Creator Attribution: Created by Yuvraj Malpure
 */

// -------------------------------------------------------------
// APPLICATION VERSION & RELEASE METADATA
// -------------------------------------------------------------
const PROCESSIQ_VERSION = '1.0.0';
const PROCESSIQ_RELEASE_DATE = 'November 17, 2026';

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
    reworkStaffing: 'separate',
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
    reworkStaffing: 'frontline',
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
    reworkStaffing: 'frontline',
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
    reworkStaffing: 'frontline',
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
// CURRENCY & EXCHANGE RATE BENCHMARKS (TRANSPARENT REFERENCE TABLE)
// -------------------------------------------------------------
const CURRENCY_REGISTRY = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rateToBase: 1.0, isBase: true, locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rateToBase: 0.92, isBase: false, locale: 'de-DE' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rateToBase: 0.79, isBase: false, locale: 'en-GB' },
  CAD: { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', rateToBase: 1.36, isBase: false, locale: 'en-CA' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rateToBase: 1.52, isBase: false, locale: 'en-AU' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rateToBase: 84.00, isBase: false, locale: 'en-IN' },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rateToBase: 152.0, isBase: false, locale: 'ja-JP' }
};

const FX_METADATA = {
  source: 'ECB & IMF Reference FX Rates',
  date: 'November 17, 2026',
  base: 'USD'
};

// -------------------------------------------------------------
// GLOBAL STATE
// -------------------------------------------------------------
const ProcessIQ = {
  currency: 'USD',
  currencySymbols: {
    USD: '$', EUR: '€', GBP: '£', CAD: 'CA$', AUD: 'A$', INR: '₹', JPY: '¥'
  },
  fxRegistry: CURRENCY_REGISTRY,
  fxMetadata: FX_METADATA,

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
    rework: { enabled: true, monthlyHours: 75, hourlyRate: 48.0, staffingAllocation: 'separate', isEstimate: true },
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
    pricingClassification: 'Official Published List Price',
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
    pricingClassification: 'Official Published List Price',
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
    pricingClassification: 'Enterprise Quote Required',
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
    pricingClassification: 'Indicative Market Benchmark',
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

  if (c.errors && c.errors.enabled) {
    const vol = Math.max(0, Number(c.errors.monthlyVolume) || 0);
    const rate = Math.min(100, Math.max(0, Number(c.errors.errorRatePct) || 0)) / 100;
    const cost = Math.max(0, Number(c.errors.avgCostPerError) || 0);
    const monthly = vol * rate * cost;
    items.push({ id: 'errors', name: 'Transaction & Entry Errors', monthly, annual: monthly * 12, isEstimate: c.errors.isEstimate, intervention: 'Implement automated schema validation and LLM data extraction guardrails.' });
  }

  if (c.rework && c.rework.enabled) {
    const hrs = Math.max(0, Number(c.rework.monthlyHours) || 0);
    const rate = Math.max(0, Number(c.rework.hourlyRate) || 0);
    const monthly = hrs * rate;
    items.push({ id: 'rework', name: 'Internal Labor Rework', monthly, annual: monthly * 12, isEstimate: c.rework.isEstimate, intervention: 'Deploy automated exception triaging to eliminate manual re-keying.' });
    if (c.errors && c.errors.enabled) {
      warnings.push('Potential overlap detected between Transaction Errors and Labor Rework. Verify rework hours are not already bundled in error costs.');
    }
  }

  const delaysVol = Math.max(0, Number(c.delays?.monthlyDelayedVolume) || 0);
  const delaysCost = Math.max(0, Number(c.delays?.avgCostPerDelay) || 0);
  const delaysMonthly = delaysVol * delaysCost;
  const delaysActive = Boolean(c.delays && ((c.delays.enabled && delaysMonthly > 0) || (delaysVol > 0 && delaysCost > 0) || (ProcessIQ.selectedTemplateKey === 'ap' && c.delays.enabled)));
  if (delaysActive) {
    if (delaysVol > 0 && delaysCost > 0) c.delays.enabled = true;
    items.push({ id: 'delays', name: 'Delayed Transactions & Queuing', monthly: delaysMonthly, annual: delaysMonthly * 12, isEstimate: c.delays.isEstimate, intervention: 'Adopt asynchronous queue orchestration with SLA breach alerting.' });
  } else if (c.delays && ProcessIQ.selectedTemplateKey !== 'ap') {
    c.delays.enabled = false;
  }

  const discCount = Math.max(0, Number(c.missedDiscounts?.monthlyMissedCount) || 0);
  const discVal = Math.max(0, Number(c.missedDiscounts?.avgDiscountValue) || 0);
  const discMonthly = discCount * discVal;
  const discActive = Boolean(c.missedDiscounts && ((c.missedDiscounts.enabled && discMonthly > 0) || (discCount > 0 && discVal > 0) || (ProcessIQ.selectedTemplateKey === 'ap' && c.missedDiscounts.enabled)));
  if (discActive) {
    if (discCount > 0 && discVal > 0) c.missedDiscounts.enabled = true;
    items.push({ id: 'missedDiscounts', name: 'Missed Settlement Discounts', monthly: discMonthly, annual: discMonthly * 12, isEstimate: c.missedDiscounts.isEstimate, intervention: 'Automate straight-through 3-way invoice matching for early payment capture.' });
  } else if (c.missedDiscounts && ProcessIQ.selectedTemplateKey !== 'ap') {
    c.missedDiscounts.enabled = false;
  }

  const dupCount = Math.max(0, Number(c.duplicatePayments?.monthlyDuplicateCount) || 0);
  const dupAmount = Math.max(0, Number(c.duplicatePayments?.avgDuplicateAmount) || 0);
  let dupUnrecPct = Number(c.duplicatePayments?.unrecoveredPct);
  if (isNaN(dupUnrecPct) || dupUnrecPct <= 0) {
    dupUnrecPct = 40.0;
    if (c.duplicatePayments) c.duplicatePayments.unrecoveredPct = 40.0;
  }
  const dupUnrecovered = Math.min(100, Math.max(0, dupUnrecPct)) / 100;
  const dupMonthly = dupCount * dupAmount * dupUnrecovered;
  const dupActive = Boolean(c.duplicatePayments && ((c.duplicatePayments.enabled && dupMonthly > 0) || (dupCount > 0 && dupAmount > 0) || (ProcessIQ.selectedTemplateKey === 'ap' && c.duplicatePayments.enabled)));
  if (dupActive) {
    if (dupCount > 0 && dupAmount > 0) c.duplicatePayments.enabled = true;
    items.push({ id: 'duplicatePayments', name: 'Duplicate Payments (Unrecovered)', monthly: dupMonthly, annual: dupMonthly * 12, isEstimate: c.duplicatePayments.isEstimate, intervention: 'Implement cryptographic invoice fingerprinting prior to ledger posting.' });
  } else if (c.duplicatePayments && ProcessIQ.selectedTemplateKey !== 'ap') {
    c.duplicatePayments.enabled = false;
  }

  const penMonthly = Math.max(0, Number(c.penalties?.monthlyAmount) || 0);
  const penActive = Boolean(c.penalties && ((c.penalties.enabled && penMonthly > 0) || penMonthly > 0 || (ProcessIQ.selectedTemplateKey === 'ap' && c.penalties.enabled)));
  if (penActive) {
    if (penMonthly > 0) c.penalties.enabled = true;
    items.push({ id: 'penalties', name: 'Regulatory & SLA Penalties', monthly: penMonthly, annual: penMonthly * 12, isEstimate: c.penalties.isEstimate, intervention: 'Enforce real-time compliance gate checks with automated audit logs.' });
    if (delaysActive) {
      warnings.push('Potential overlap: SLA penalties are frequently caused by delayed transactions. Avoid double-counting contractual damages.');
    }
  } else if (c.penalties && ProcessIQ.selectedTemplateKey !== 'ap') {
    c.penalties.enabled = false;
  }

  const otherMonthly = Math.max(0, Number(c.otherLosses?.monthlyAmount) || 0);
  const otherActive = Boolean(c.otherLosses && ((c.otherLosses.enabled && otherMonthly > 0) || otherMonthly > 0 || (ProcessIQ.selectedTemplateKey === 'ap' && c.otherLosses.enabled)));
  if (otherActive) {
    if (otherMonthly > 0) c.otherLosses.enabled = true;
    items.push({ id: 'otherLosses', name: c.otherLosses.description || 'Other Process Losses', monthly: otherMonthly, annual: otherMonthly * 12, isEstimate: c.otherLosses.isEstimate, intervention: 'Conduct root-cause analysis on ad-hoc workarounds.' });
  } else if (c.otherLosses && ProcessIQ.selectedTemplateKey !== 'ap') {
    c.otherLosses.enabled = false;
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
    const activePricing = (ProcessIQ.activeVendorPricing && ProcessIQ.activeVendorPricing[vendor.id]) || vendor;

    const vCostPerUserMonth = activePricing.costPerUserMonth !== undefined ? activePricing.costPerUserMonth : vendor.costPerUserMonth;
    const vBaseMonthlyCost = activePricing.baseMonthlyCost !== undefined ? activePricing.baseMonthlyCost : vendor.baseMonthlyCost;
    const vExtraMessageCost = activePricing.extraMessageCost !== undefined ? activePricing.extraMessageCost : vendor.extraMessageCost;
    const vInputTokenCostPerM = activePricing.inputTokenCostPerM !== undefined ? activePricing.inputTokenCostPerM : vendor.inputTokenCostPerM;
    const vOutputTokenCostPerM = activePricing.outputTokenCostPerM !== undefined ? activePricing.outputTokenCostPerM : vendor.outputTokenCostPerM;

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
          monthlyUsage = overage * vExtraMessageCost;
        } else if (vendor.id === 'custom-ai-agent') {
          const inputCost = (Number(p.monthlyInputTokensM) || 0) * vInputTokenCostPerM;
          const outputCost = (Number(p.monthlyOutputTokensM) || 0) * vOutputTokenCostPerM;
          monthlyUsage = inputCost + outputCost;
        }
      }
    } else {
      if (vendor.id === 'm365-copilot') {
        monthlySub = users * vCostPerUserMonth;
      } else if (vendor.id === 'copilot-studio') {
        monthlySub = vBaseMonthlyCost;
        const totalMsgs = Number(p.expectedMonthlyInteractions) || 0;
        const overage = Math.max(0, totalMsgs - vendor.includedMessages);
        monthlyUsage = overage * vExtraMessageCost;
      } else if (vendor.id === 'claude-enterprise') {
        monthlySub = users * vCostPerUserMonth;
      } else if (vendor.id === 'custom-ai-agent') {
        monthlySub = vBaseMonthlyCost + (users * vCostPerUserMonth);
        const inputCost = (Number(p.monthlyInputTokensM) || 0) * vInputTokenCostPerM;
        const outputCost = (Number(p.monthlyOutputTokensM) || 0) * vOutputTokenCostPerM;
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

  // Direct Cash Leakage vs Non-Cash Operational Leakage
  let directCashLeakage = 0;
  m2.items.forEach(item => {
    if (['duplicatePayments', 'penalties', 'missedDiscounts'].includes(item.id)) {
      directCashLeakage += item.annual;
    }
  });
  const nonCashLeakage = Math.max(0, annualLeakage - directCashLeakage);

  // Dynamic Rework Staffing Allocation & Anti-Double-Counting Derivation
  const staffingAllocation = (ProcessIQ.costLeakage.rework && ProcessIQ.costLeakage.rework.staffingAllocation) || 'separate';
  const reworkMonthlyHours = (ProcessIQ.costLeakage.rework && ProcessIQ.costLeakage.rework.enabled) ? Math.max(0, Number(ProcessIQ.costLeakage.rework.monthlyHours) || 0) : 0;
  const reworkHourlyRate = Math.max(0, Number((ProcessIQ.costLeakage.rework && ProcessIQ.costLeakage.rework.hourlyRate) || 0));
  const reworkAnnualHours = reworkMonthlyHours * 12;
  const reworkAnnualCost = reworkAnnualHours * reworkHourlyRate;

  // Frontline Recoverable Capacity in Hours
  const frontlineHourlyRate = Math.max(1, Number(ProcessIQ.manualCost.hourlyRate) || 1);
  const cCapacityHours = m1.recoverableAnnualHours || (annualCapacityValue / frontlineHourlyRate);

  // Scenario B labor savings:
  // Traditional rules automation achieves up to 20% of annual labor.
  // When recoverable capacity is below 20% (e.g. Treasury @ 10%), automation is bounded by process capacity (20/35 ratio).
  const bLaborSavings = annualCapacityValue < Math.round(annualLabor * 0.2)
    ? Math.round(annualCapacityValue * (20 / 35))
    : Math.round(annualLabor * 0.2);
  const bCapacityHours = annualLabor > 0 ? (bLaborSavings / frontlineHourlyRate) : 0;

  // Avoided Rework Hours & Cost in Scenario B (50%) and Scenario C (75%)
  const bAvoidedReworkHours = reworkAnnualHours * 0.50;
  const bAvoidedReworkCost = reworkAnnualCost * 0.50;
  const cAvoidedReworkHours = reworkAnnualHours * 0.75;
  const cAvoidedReworkCost = reworkAnnualCost * 0.75;

  let bOverlapAdjustment = 0;
  let cOverlapAdjustment = 0;
  let reworkOverlapWarning = '';

  if (staffingAllocation === 'frontline' || staffingAllocation === 'unconfirmed') {
    // When rework is performed by frontline staff, avoided rework hours are already
    // funded by frontline payroll and liberated as part of frontline capacity.
    // The overlap cannot exceed liberated capacity hours.
    const bOverlappingHours = Math.min(bAvoidedReworkHours, bCapacityHours);
    bOverlapAdjustment = Math.round(bOverlappingHours * reworkHourlyRate);

    const cOverlappingHours = Math.min(cAvoidedReworkHours, cCapacityHours);
    cOverlapAdjustment = Math.round(cOverlappingHours * reworkHourlyRate);

    if (staffingAllocation === 'unconfirmed') {
      reworkOverlapWarning = `Staffing allocation unconfirmed: A conservative anti-double-counting deduction of ${formatCurrency(cOverlapAdjustment)} has been applied to Scenario C Gross Savings. Confirm whether rework is performed by frontline staff or a separate team.`;
    }
  } else if (staffingAllocation === 'separate') {
    // Rework is performed by dedicated/separate resources outside baseline payroll;
    // benefits are genuinely incremental and additive.
    bOverlapAdjustment = 0;
    cOverlapAdjustment = 0;
  }

  // Benefits under Scenario B (Automation & Lean First)
  const bCapex = (ProcessIQ.activeScenarioB && ProcessIQ.activeScenarioB.capex) || 15000;
  const bOpex = (ProcessIQ.activeScenarioB && ProcessIQ.activeScenarioB.opex) || 5000;
  const bLeakageSavings = Math.round(annualLeakage * 0.5);
  const bActualCashSavings = Math.round(directCashLeakage * 0.5);
  // bGrossSavings = bLaborSavings + bLeakageSavings (adjusted for rework overlap)
  const bGrossSavings = Math.max(0, bLaborSavings + bLeakageSavings - bOverlapAdjustment);
  const bNetBenefit = bGrossSavings - bOpex;
  const bFirstYearNet = bNetBenefit - bCapex;
  const bRoi = bCapex > 0 ? Math.round((bNetBenefit / bCapex) * 100) : 0;
  const bFirstYearRoi = bCapex > 0 ? Math.round((bFirstYearNet / bCapex) * 100) : 0;
  const bNetMonthly = bNetBenefit / 12;
  const bBreakeven = bCapex > 0 ? (bNetMonthly > 0 ? Math.round((bCapex / bNetMonthly) * 10) / 10 : 0) : 0;

  let bCashRoi = 0;
  let bCashRoiFormatted = 'N/A – Non-Cash Operational Optimization';
  let bCashPayback = 0;
  let bCashPaybackFormatted = 'N/A – Non-Cash Operational Optimization';
  if (bActualCashSavings > 0) {
    const netCashB = bActualCashSavings - bOpex;
    const firstYearNetCashB = netCashB - bCapex;
    bCashRoi = (bCapex + bOpex) > 0 ? Math.round((firstYearNetCashB / (bCapex + bOpex)) * 100) : 0;
    bCashRoiFormatted = `${bCashRoi}%`;
    const monthlyNetCashB = netCashB / 12;
    if (monthlyNetCashB > 0 && bCapex > 0) {
      bCashPayback = Math.round((bCapex / monthlyNetCashB) * 10) / 10;
      bCashPaybackFormatted = `${bCashPayback} mo`;
    } else {
      bCashPaybackFormatted = 'Not Achievable (Cash savings does not exceed tech opex)';
    }
  }

  // Benefits under Scenario C (AI Transformation)
  const hardCashSavings = directCashLeakage * 0.8;
  const costAvoidance = nonCashLeakage * 0.75;
  const cLeakageSavings = hardCashSavings + costAvoidance;
  const cLaborSavings = annualCapacityValue;
  const cGrossSavings = Math.max(0, cLaborSavings + cLeakageSavings - cOverlapAdjustment);
  const cNetBenefit = cGrossSavings - aiOpexAnnual;
  const cCapex = Math.round(aiCapex);
  const cFirstYearNet = cNetBenefit - cCapex;
  const cRoi = cCapex > 0 ? Math.round((cNetBenefit / cCapex) * 100) : 0;
  const cFirstYearRoi = cCapex > 0 ? Math.round((cFirstYearNet / cCapex) * 100) : 0;
  const cNetMonthly = cNetBenefit / 12;
  const cBreakeven = cCapex > 0 ? (cNetMonthly > 0 ? Math.round((cCapex / cNetMonthly) * 10) / 10 : 0) : 0;

  let cCashRoi = 0;
  let cCashRoiFormatted = 'N/A – Non-Cash Operational Optimization';
  let cCashPayback = 0;
  let cCashPaybackFormatted = 'N/A – Non-Cash Operational Optimization';
  if (hardCashSavings > 0) {
    const netCashC = hardCashSavings - aiOpexAnnual;
    const firstYearNetCashC = netCashC - cCapex;
    cCashRoi = (cCapex + aiOpexAnnual) > 0 ? Math.round((firstYearNetCashC / (cCapex + aiOpexAnnual)) * 100) : 0;
    cCashRoiFormatted = `${cCashRoi}%`;
    const monthlyNetCashC = netCashC / 12;
    if (monthlyNetCashC > 0 && cCapex > 0) {
      cCashPayback = Math.round((cCapex / monthlyNetCashC) * 10) / 10;
      cCashPaybackFormatted = `${cCashPayback} mo`;
    } else {
      cCashPaybackFormatted = 'Not Achievable (Cash savings does not exceed tech opex)';
    }
  }

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
    overlapAdjustment: 0,
    staffingAllocation,
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
    breakevenHorizon: 0,
    breakevenHorizonFormatted: 'N/A – Baseline Scenario',
    cashRoi: 0,
    cashRoiFormatted: 'N/A – Baseline',
    cashPayback: 0,
    cashPaybackFormatted: 'N/A – Baseline Scenario',
    laborSavings: 0,
    leakageSavings: 0,
    isRecommended: false
  };

  const scenarioB = {
    id: 'automation_first',
    name: 'Scenario B: Automation & Lean First',
    tagline: 'Standardization + Traditional Rules Automation',
    laborCost: Math.round(annualLabor - bLaborSavings),
    leakageCost: Math.round(annualLeakage * 0.5),
    totalOperatingCost: Math.round(annualLabor - bLaborSavings) + Math.round(annualLeakage * 0.5),
    grossSavings: bGrossSavings,
    actualCashSavings: bActualCashSavings,
    avoidedLeakage: bLeakageSavings,
    capacityValueReleased: bLaborSavings,
    overlapAdjustment: bOverlapAdjustment,
    staffingAllocation,
    aiCost: bOpex,
    netBenefit: bNetBenefit,
    capex: bCapex,
    firstYearNetBenefit: bFirstYearNet,
    roi: bRoi,
    firstYearRoi: bFirstYearRoi,
    roiFormatted: `${bRoi}%`,
    firstYearRoiFormatted: `${bFirstYearRoi}%`,
    payback: bBreakeven,
    paybackFormatted: `${bBreakeven} mo`,
    breakevenHorizon: bBreakeven,
    breakevenHorizonFormatted: `${bBreakeven} mo`,
    cashRoi: bCashRoi,
    cashRoiFormatted: bCashRoiFormatted,
    cashPayback: bCashPayback,
    cashPaybackFormatted: bCashPaybackFormatted,
    laborSavings: bLaborSavings,
    leakageSavings: bLeakageSavings,
    isRecommended: readinessScore < 60
  };

  const scenarioC = {
    id: 'ai_transformation',
    name: 'Scenario C: Enterprise AI Transformation',
    tagline: 'Supervised Copilots & Autonomous Agents',
    laborCost: Math.round(annualLabor - cLaborSavings),
    leakageCost: Math.round(annualLeakage - cLeakageSavings),
    totalOperatingCost: Math.round(annualLabor - cLaborSavings) + Math.round(annualLeakage - cLeakageSavings),
    grossSavings: Math.round(cGrossSavings),
    actualCashSavings: Math.round(hardCashSavings),
    avoidedLeakage: Math.round(cLeakageSavings),
    capacityValueReleased: Math.round(cLaborSavings),
    overlapAdjustment: cOverlapAdjustment,
    staffingAllocation,
    aiCost: Math.round(aiOpexAnnual),
    netBenefit: Math.round(cNetBenefit),
    capex: cCapex,
    firstYearNetBenefit: Math.round(cFirstYearNet),
    roi: cRoi,
    firstYearRoi: cFirstYearRoi,
    roiFormatted: `${cRoi}%`,
    firstYearRoiFormatted: `${cFirstYearRoi}%`,
    payback: cBreakeven,
    paybackFormatted: `${cBreakeven} mo`,
    breakevenHorizon: cBreakeven,
    breakevenHorizonFormatted: `${cBreakeven} mo`,
    cashRoi: cCashRoi,
    cashRoiFormatted: cCashRoiFormatted,
    cashPayback: cCashPayback,
    cashPaybackFormatted: cCashPaybackFormatted,
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
    staffingAllocation,
    cOverlapAdjustment,
    bOverlapAdjustment,
    reworkOverlapWarning,
    totalEconomicBenefit: Math.round(cGrossSavings),
    netAnnualEconomicBenefit: Math.round(cNetBenefit),
    firstYearNetBenefit: Math.round(cFirstYearNet),
    roiPct: cRoi,
    firstYearRoiPct: cFirstYearRoi,
    paybackMonths: cBreakeven,
    breakevenMonths: cBreakeven,
    cashRoiPct: cCashRoi,
    cashRoiFormatted: cCashRoiFormatted,
    cashPaybackMonths: cCashPayback,
    cashPaybackFormatted: cCashPaybackFormatted,
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
  ProcessIQ.costLeakage.rework.staffingAllocation = tpl.reworkStaffing || 'frontline';

  if (templateKey === 'ap') {
    ProcessIQ.costLeakage.delays = { enabled: true, monthlyDelayedVolume: 120, avgCostPerDelay: 45.0, isEstimate: true };
    ProcessIQ.costLeakage.missedDiscounts = { enabled: true, monthlyMissedCount: 15, avgDiscountValue: 380.0, isEstimate: false };
    ProcessIQ.costLeakage.duplicatePayments = { enabled: true, monthlyDuplicateCount: 4, avgDuplicateAmount: 1450.0, unrecoveredPct: 40.0, isEstimate: true };
    ProcessIQ.costLeakage.penalties = { enabled: true, monthlyAmount: 1800.0, isEstimate: false };
    ProcessIQ.costLeakage.otherLosses = { enabled: true, monthlyAmount: 1200.0, description: 'Expedited vendor payment fees', isEstimate: true };
  } else {
    ProcessIQ.costLeakage.delays = { enabled: false, monthlyDelayedVolume: 0, avgCostPerDelay: 0.0, isEstimate: false };
    ProcessIQ.costLeakage.missedDiscounts = { enabled: false, monthlyMissedCount: 0, avgDiscountValue: 0.0, isEstimate: false };
    ProcessIQ.costLeakage.duplicatePayments = { enabled: false, monthlyDuplicateCount: 0, avgDuplicateAmount: 0.0, unrecoveredPct: 0.0, isEstimate: false };
    ProcessIQ.costLeakage.penalties = { enabled: false, monthlyAmount: 0.0, isEstimate: false };
    ProcessIQ.costLeakage.otherLosses = { enabled: false, monthlyAmount: 0.0, description: '', isEstimate: false };
  }

  // Establish canonical base from base template benchmarks
  ProcessIQ.canonicalBase = {
    manualCost: {
      hourlyRate: Number(tpl.hourlyRate) || 0,
      overtimeRate: Number(tpl.overtimeRate) || 0
    },
    costLeakage: {
      errorsAvgCost: Number(tpl.costPerError) || 0,
      reworkHourlyRate: Number(tpl.reworkHourlyRate) || 0,
      delaysAvgCost: (templateKey === 'ap') ? 45.0 : 0,
      missedDiscountVal: (templateKey === 'ap') ? 380.0 : 0,
      duplicateAvgAmt: (templateKey === 'ap') ? 1450.0 : 0,
      penaltiesMonthly: (templateKey === 'ap') ? 1800.0 : 0,
      otherLossesMonthly: (templateKey === 'ap') ? 1200.0 : 0
    },
    aiComparator: {
      implementationCostOneTime: 25000.0,
      integrationCostOneTime: 15000.0,
      annualMaintenanceSupportCost: 8000.0
    },
    scenarioB: { capex: 15000, opex: 5000 },
    customPricing: {}
  };

  applyCanonicalBaseToActiveCurrency(ProcessIQ.currency || 'USD');

  updateCurrencyBadges();
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
  ProcessIQ.costLeakage.rework.staffingAllocation = 'unconfirmed';
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
  captureCanonicalBase();
  updateCurrencyBadges();
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
      schemaVersion: '1.0.0',
      savedAt: new Date().toISOString(),
      currency: ProcessIQ.currency,
      canonicalBase: ProcessIQ.canonicalBase,
      manualCost: ProcessIQ.manualCost,
      costLeakage: ProcessIQ.costLeakage,
      readiness: ProcessIQ.readiness,
      aiComparator: ProcessIQ.aiComparator,
      isSampleData: ProcessIQ.isSampleData,
      currentStage: ProcessIQ.currentStage
    };
    localStorage.setItem('processiq_assessment_data', JSON.stringify(payload));
    showToast('Progress saved safely in local browser storage.');
  } catch (e) {
    console.warn('Storage unavailable or blocked:', e);
    showToast('Browser storage blocked. Inputs remain active in current session.');
  }
}

function loadProgress() {
  try {
    const raw = localStorage.getItem('processiq_assessment_data');
    if (!raw) return;

    let data;
    try {
      data = JSON.parse(raw);
    } catch (parseErr) {
      console.warn('Corrupted storage data detected:', parseErr);
      showToast('Previous storage was unreadable. Starting fresh assessment.');
      localStorage.removeItem('processiq_assessment_data');
      return;
    }

    if (!data || typeof data !== 'object') {
      localStorage.removeItem('processiq_assessment_data');
      return;
    }

    if (data.currency && CURRENCY_REGISTRY[data.currency]) {
      ProcessIQ.currency = data.currency;
    }
    if (data.manualCost && typeof data.manualCost === 'object') {
      Object.assign(ProcessIQ.manualCost, data.manualCost);
    }
    if (data.costLeakage && typeof data.costLeakage === 'object') {
      Object.assign(ProcessIQ.costLeakage, data.costLeakage);
    }
    if (data.readiness && typeof data.readiness === 'object') {
      Object.assign(ProcessIQ.readiness, data.readiness);
    }
    if (data.aiComparator && typeof data.aiComparator === 'object') {
      Object.assign(ProcessIQ.aiComparator, data.aiComparator);
    }
    if (typeof data.isSampleData === 'boolean') {
      ProcessIQ.isSampleData = data.isSampleData;
    }

    if (data.canonicalBase && typeof data.canonicalBase === 'object') {
      ProcessIQ.canonicalBase = data.canonicalBase;
    } else {
      captureCanonicalBase();
    }

    updateCurrencyBadges();
    syncInputs();
    renderAll();
    showToast('Saved assessment restored from local browser storage.');
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

// -------------------------------------------------------------
// CANONICAL BASE-CURRENCY CONVERSION ENGINE (USD BASE = 1.0)
// -------------------------------------------------------------
let isConvertingCurrency = false;

function getRateToBase(currencyCode) {
  return (CURRENCY_REGISTRY[currencyCode] && CURRENCY_REGISTRY[currencyCode].rateToBase) || 1.0;
}

function captureCanonicalBase() {
  if (isConvertingCurrency) return;
  const currentRate = getRateToBase(ProcessIQ.currency);
  
  if (!ProcessIQ.canonicalBase) {
    ProcessIQ.canonicalBase = {
      manualCost: {},
      costLeakage: {},
      aiComparator: {},
      scenarioB: { capex: 15000, opex: 5000 },
      customPricing: {}
    };
  }

  const cb = ProcessIQ.canonicalBase;

  cb.manualCost = {
    hourlyRate: (Number(ProcessIQ.manualCost.hourlyRate) || 0) / currentRate,
    overtimeRate: (Number(ProcessIQ.manualCost.overtimeRate) || 0) / currentRate,
  };

  cb.costLeakage = {
    errorsAvgCost: (Number(ProcessIQ.costLeakage.errors.avgCostPerError) || 0) / currentRate,
    reworkHourlyRate: (Number(ProcessIQ.costLeakage.rework.hourlyRate) || 0) / currentRate,
    delaysAvgCost: (Number(ProcessIQ.costLeakage.delays.avgCostPerDelay) || 0) / currentRate,
    missedDiscountVal: (Number(ProcessIQ.costLeakage.missedDiscounts.avgDiscountValue) || 0) / currentRate,
    duplicateAvgAmt: (Number(ProcessIQ.costLeakage.duplicatePayments.avgDuplicateAmount) || 0) / currentRate,
    penaltiesMonthly: (Number(ProcessIQ.costLeakage.penalties.monthlyAmount) || 0) / currentRate,
    otherLossesMonthly: (Number(ProcessIQ.costLeakage.otherLosses.monthlyAmount) || 0) / currentRate,
  };

  cb.aiComparator = {
    implementationCostOneTime: (Number(ProcessIQ.aiComparator.implementationCostOneTime) || 0) / currentRate,
    integrationCostOneTime: (Number(ProcessIQ.aiComparator.integrationCostOneTime) || 0) / currentRate,
    annualMaintenanceSupportCost: (Number(ProcessIQ.aiComparator.annualMaintenanceSupportCost) || 0) / currentRate,
  };

  if (!cb.scenarioB) {
    cb.scenarioB = { capex: 15000, opex: 5000 };
  }

  if (ProcessIQ.aiComparator.customPricing) {
    if (!cb.customPricing) cb.customPricing = {};
    Object.keys(ProcessIQ.aiComparator.customPricing).forEach(vendorId => {
      const cp = ProcessIQ.aiComparator.customPricing[vendorId];
      if (cp && cp.isCustom) {
        cb.customPricing[vendorId] = {
          unitPrice: (Number(cp.unitPrice) || 0) / currentRate,
          additionalUsageCostMonthly: cp.additionalUsageCostMonthly !== undefined ? (Number(cp.additionalUsageCostMonthly) || 0) / currentRate : undefined,
          userCount: cp.userCount,
          billingFrequency: cp.billingFrequency,
          isCustom: true,
          vendorId: cp.vendorId
        };
      }
    });
  }
}

function applyCanonicalBaseToActiveCurrency(targetCurrency) {
  if (!ProcessIQ.canonicalBase) {
    captureCanonicalBase();
  }
  
  const targetRate = getRateToBase(targetCurrency);
  const cb = ProcessIQ.canonicalBase;

  const roundMonetary = (val) => {
    return Math.round(val * 100) / 100;
  };

  // Convert Module 1 monetary fields
  ProcessIQ.manualCost.hourlyRate = roundMonetary(cb.manualCost.hourlyRate * targetRate);
  ProcessIQ.manualCost.overtimeRate = roundMonetary(cb.manualCost.overtimeRate * targetRate);

  // Convert Module 2 monetary fields
  ProcessIQ.costLeakage.errors.avgCostPerError = roundMonetary(cb.costLeakage.errorsAvgCost * targetRate);
  ProcessIQ.costLeakage.rework.hourlyRate = roundMonetary(cb.costLeakage.reworkHourlyRate * targetRate);
  ProcessIQ.costLeakage.delays.avgCostPerDelay = roundMonetary(cb.costLeakage.delaysAvgCost * targetRate);
  ProcessIQ.costLeakage.missedDiscounts.avgDiscountValue = roundMonetary(cb.costLeakage.missedDiscountVal * targetRate);
  ProcessIQ.costLeakage.duplicatePayments.avgDuplicateAmount = roundMonetary(cb.costLeakage.duplicateAvgAmt * targetRate);
  ProcessIQ.costLeakage.penalties.monthlyAmount = roundMonetary(cb.costLeakage.penaltiesMonthly * targetRate);
  ProcessIQ.costLeakage.otherLosses.monthlyAmount = roundMonetary(cb.costLeakage.otherLossesMonthly * targetRate);

  // Convert Module 4 monetary fields
  ProcessIQ.aiComparator.implementationCostOneTime = roundMonetary(cb.aiComparator.implementationCostOneTime * targetRate);
  ProcessIQ.aiComparator.integrationCostOneTime = roundMonetary(cb.aiComparator.integrationCostOneTime * targetRate);
  ProcessIQ.aiComparator.annualMaintenanceSupportCost = roundMonetary(cb.aiComparator.annualMaintenanceSupportCost * targetRate);

  // Convert Scenario B Capex and Opex
  if (!ProcessIQ.activeScenarioB) ProcessIQ.activeScenarioB = {};
  ProcessIQ.activeScenarioB.capex = Math.round(15000 * targetRate);
  ProcessIQ.activeScenarioB.opex = Math.round(5000 * targetRate);

  // Convert Custom Pricing if present
  if (ProcessIQ.aiComparator.customPricing && cb.customPricing) {
    Object.keys(cb.customPricing).forEach(vendorId => {
      const cbp = cb.customPricing[vendorId];
      if (ProcessIQ.aiComparator.customPricing[vendorId] && cbp) {
        ProcessIQ.aiComparator.customPricing[vendorId].unitPrice = roundMonetary(cbp.unitPrice * targetRate);
        if (cbp.additionalUsageCostMonthly !== undefined) {
          ProcessIQ.aiComparator.customPricing[vendorId].additionalUsageCostMonthly = roundMonetary(cbp.additionalUsageCostMonthly * targetRate);
        }
      }
    });
  }

  // Convert Active Vendor Benchmark Pricing
  if (!ProcessIQ.activeVendorPricing) ProcessIQ.activeVendorPricing = {};
  ProcessIQ.activeVendorPricing['m365-copilot'] = {
    costPerUserMonth: roundMonetary(30.0 * targetRate)
  };
  ProcessIQ.activeVendorPricing['copilot-studio'] = {
    baseMonthlyCost: roundMonetary(200.0 * targetRate),
    extraMessageCost: roundMonetary(0.01 * targetRate * 10000) / 10000
  };
  ProcessIQ.activeVendorPricing['claude-enterprise'] = {
    costPerUserMonth: roundMonetary(45.0 * targetRate)
  };
  ProcessIQ.activeVendorPricing['custom-ai-agent'] = {
    baseMonthlyCost: roundMonetary(150.0 * targetRate),
    costPerUserMonth: roundMonetary(5.0 * targetRate),
    inputTokenCostPerM: roundMonetary(3.0 * targetRate),
    outputTokenCostPerM: roundMonetary(15.0 * targetRate)
  };

  // Non-monetary inputs (FTE counts, labor hours, working days, volumes, error rates, readiness scores)
  // are strictly protected and NEVER converted.
}

function updateCurrencyBadges() {
  const code = ProcessIQ.currency || 'USD';
  const reg = CURRENCY_REGISTRY[code] || CURRENCY_REGISTRY.USD;
  const sym = reg.symbol;

  // 1. Update FX indicator badge in navbar
  const fxBadge = document.getElementById('currency-fx-badge');
  if (fxBadge) {
    if (reg.isBase) {
      fxBadge.innerText = `Base: ${reg.code} (Benchmark Ref)`;
      fxBadge.title = `Base currency for all enterprise benchmarks. Rate: 1.0. Source: ${FX_METADATA.source} (${FX_METADATA.date})`;
    } else {
      fxBadge.innerText = `1 USD = ${sym}${reg.rateToBase} (${FX_METADATA.source.split(' ')[0]} Ref)`;
      fxBadge.title = `Reference FX Rate: 1 USD = ${sym}${reg.rateToBase} (Source: ${FX_METADATA.source}, ${FX_METADATA.date})`;
    }
  }

  // 2. Update currency tags throughout form labels
  document.querySelectorAll('.currency-tag').forEach(el => {
    const text = el.innerText || '';
    if (text.includes('/hr')) {
      el.innerText = `(${sym}/hr)`;
    } else if (text.includes('/mo')) {
      el.innerText = `(${sym}/mo)`;
    } else if (text.includes('/yr')) {
      el.innerText = `(${sym}/yr)`;
    } else {
      el.innerText = `(${sym})`;
    }
  });

  // 3. Update currency unit pills
  document.querySelectorAll('.currency-unit-pill').forEach(el => {
    const text = el.innerText || '';
    if (text.includes('/hr')) {
      el.innerText = `${sym}/hr`;
    } else if (text.includes('/yr')) {
      el.innerText = `${sym}/yr`;
    } else {
      el.innerText = `${sym}`;
    }
  });

  // 4. Update template benchmark badges in Stage 2 selection cards
  document.querySelectorAll('.template-benchmark-badge').forEach(el => {
    const key = el.dataset.key;
    if (key && PROCESS_TEMPLATES[key]) {
      const tmpl = PROCESS_TEMPLATES[key];
      const rateVal = Math.round(tmpl.hourlyRate * reg.rateToBase * 100) / 100;
      el.innerText = `Benchmark Rate: ${sym}${rateVal}/hr`;
    }
  });

  // 5. Update modal currency symbols
  const elSym1 = document.getElementById('modal-currency-symbol');
  const elSym2 = document.getElementById('modal-currency-symbol-2');
  if (elSym1) elSym1.innerText = sym;
  if (elSym2) elSym2.innerText = sym;
}

function updateCurrency(code, convertValues = true) {
  if (CURRENCY_REGISTRY[code]) {
    const oldCode = ProcessIQ.currency || 'USD';
    if (oldCode !== code && convertValues) {
      if (!ProcessIQ.canonicalBase) {
        captureCanonicalBase();
      }
      isConvertingCurrency = true;
      try {
        applyCanonicalBaseToActiveCurrency(code);
        ProcessIQ.currency = code;
        updateCurrencyBadges();
        syncInputs();
        renderAll();
      } finally {
        isConvertingCurrency = false;
      }
      return;
    }
    ProcessIQ.currency = code;
  }
  updateCurrencyBadges();
  syncInputs();
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
  const cData = runConsolidatedCalculations();

  const elMonthlyLeak = document.getElementById('m2-monthly-leakage');
  const elAnnualLeak = document.getElementById('m2-annual-leakage');
  const elTopDriver = document.getElementById('m2-top-driver');

  if (elMonthlyLeak) elMonthlyLeak.innerText = formatCurrency(data.totalMonthly);
  if (elAnnualLeak) elAnnualLeak.innerText = formatCurrency(data.totalAnnual);
  if (elTopDriver) elTopDriver.innerText = data.topDrivers.length > 0 ? `${data.topDrivers[0].name} (${formatCurrency(data.topDrivers[0].annual)}/yr)` : 'None';

  // Rework Staffing Allocation badges and notes
  const staffingBadge = document.getElementById('rework-staffing-badge');
  const reworkNote = document.getElementById('m2-rework-overlap-note');
  const inStaffing = document.getElementById('in-m2-rework-staffing');
  const currentStaffing = (ProcessIQ.costLeakage.rework && ProcessIQ.costLeakage.rework.staffingAllocation) || 'frontline';

  if (inStaffing) inStaffing.value = currentStaffing;

  if (staffingBadge) {
    if (currentStaffing === 'frontline') {
      staffingBadge.className = 'text-[9px] px-1.5 py-0.5 rounded font-semibold bg-blue-100 text-blue-800 border border-blue-200';
      staffingBadge.innerText = 'Frontline Staff (Anti-Double-Counting Active)';
    } else if (currentStaffing === 'separate') {
      staffingBadge.className = 'text-[9px] px-1.5 py-0.5 rounded font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200';
      staffingBadge.innerText = 'Separate Specialists (Additive Benefits)';
    } else {
      staffingBadge.className = 'text-[9px] px-1.5 py-0.5 rounded font-semibold bg-amber-100 text-amber-800 border border-amber-200';
      staffingBadge.innerText = 'Staffing Unconfirmed (Conservative Deduct)';
    }
  }

  if (reworkNote) {
    if (currentStaffing === 'frontline') {
      reworkNote.innerHTML = `Overlapping avoided rework (${formatCurrency(cData.cOverlapAdjustment)} in AI Scenario C) is deducted from Gross Economic Benefit to eliminate double-counting with liberated frontline capacity.`;
    } else if (currentStaffing === 'separate') {
      reworkNote.innerHTML = `Rework is performed by dedicated escalation resources outside Module 1 baseline payroll; avoided rework is treated as genuinely incremental and additive.`;
    } else {
      reworkNote.innerHTML = `<span class="text-amber-700 font-semibold">Caution:</span> Staffing allocation unconfirmed. A conservative deduction of ${formatCurrency(cData.cOverlapAdjustment)} is applied in Scenario C to avoid double-counting.`;
    }
  }

  // Warnings render
  const warnContainer = document.getElementById('m2-warnings');
  if (warnContainer) {
    warnContainer.innerHTML = '';
    const allWarnings = [...data.warnings];
    if (cData.reworkOverlapWarning) {
      allWarnings.push(cData.reworkOverlapWarning);
    }
    allWarnings.forEach(w => {
      const div = document.createElement('div');
      div.className = 'p-3 text-xs bg-amber-50 text-amber-800 border-l-4 border-amber-500 rounded';
      div.innerText = w;
      warnContainer.appendChild(div);
    });
  }

  // Render Pareto Chart
  const ctx = document.getElementById('m2Chart');
  if (ctx && typeof Chart !== 'undefined') {
    if (ProcessIQ.charts.m2) {
      ProcessIQ.charts.m2.destroy();
      ProcessIQ.charts.m2 = null;
    }
    if (data.items.length > 0) {
      const categoryShortNames = {
        errors: 'Errors',
        rework: 'Rework',
        delays: 'Delays',
        missedDiscounts: 'Discounts',
        duplicatePayments: 'Duplicates',
        penalties: 'Penalties',
        otherLosses: 'Other'
      };
      ProcessIQ.charts.m2 = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.items.map(i => categoryShortNames[i.id] || i.name.split(' ')[0]),
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
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: (tooltipItems) => {
                  const idx = tooltipItems[0]?.dataIndex;
                  return data.items[idx]?.name || tooltipItems[0]?.label || '';
                },
                label: (context) => `Annual Cost: ${formatCurrency(context.raw)}`
              }
            }
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

  // Dynamic assumptions callout reflecting active currency & user overrides
  const cur = ProcessIQ.currency;
  const curRate = getRateToBase(cur);
  const capex = Number(ProcessIQ.aiComparator.implementationCostOneTime) || 0;
  const integ = Number(ProcessIQ.aiComparator.integrationCostOneTime) || 0;
  const support = Number(ProcessIQ.aiComparator.annualMaintenanceSupportCost) || 0;

  const defCapex = Math.round(25000 * curRate);
  const defInteg = Math.round(15000 * curRate);
  const defSupport = Math.round(8000 * curRate);

  const isCapexCustom = (Math.abs(capex - defCapex) > 1);
  const isIntegCustom = (Math.abs(integ - defInteg) > 1);
  const isSupportCustom = (Math.abs(support - defSupport) > 1);
  const anyCustom = isCapexCustom || isIntegCustom || isSupportCustom;

  const calloutEl = document.getElementById('m4-assumptions-callout');
  if (calloutEl) {
    if (anyCustom) {
      calloutEl.innerHTML = `
        <div class="flex items-start gap-2">
          <span class="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200 uppercase tracking-wide">Custom Investments Active</span>
          <div class="flex-1">
            <span class="font-bold text-slate-800">Active Configured Investments (${cur}):</span>
            Implementation Capex: <strong>${formatCurrency(capex)}</strong> ${isCapexCustom ? '<span class="text-purple-700 font-semibold">(Custom Override)</span>' : '<span class="text-slate-500">(Default)</span>'},
            Integration Capex: <strong>${formatCurrency(integ)}</strong> ${isIntegCustom ? '<span class="text-purple-700 font-semibold">(Custom Override)</span>' : '<span class="text-slate-500">(Default)</span>'},
            Annual Support: <strong>${formatCurrency(support)}/yr</strong> ${isSupportCustom ? '<span class="text-purple-700 font-semibold">(Custom Override)</span>' : '<span class="text-slate-500">(Default)</span>'}.
            <div class="text-[10px] text-slate-500 mt-1">
              Baseline Enterprise Defaults: ${formatCurrency(defCapex)} implementation, ${formatCurrency(defInteg)} integration, and ${formatCurrency(defSupport)}/yr support (in reference USD: $25k / $15k / $8k). All return calculations reflect your configured ${cur} inputs.
            </div>
          </div>
        </div>
      `;
    } else {
      calloutEl.innerHTML = `
        <div class="flex items-start gap-2">
          <span class="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700 uppercase tracking-wide">Enterprise Defaults Active</span>
          <div class="flex-1">
            <span class="font-bold text-slate-800">Baseline Investment Assumptions (${cur}):</span>
            Includes <strong>${formatCurrency(defCapex)}</strong> implementation capex, <strong>${formatCurrency(defInteg)}</strong> integration capex, and <strong>${formatCurrency(defSupport)}/yr</strong> annual maintenance & support (derived from enterprise benchmarks, base reference USD: $25,000 / $15,000 / $8,000). You can override these above.
          </div>
        </div>
      `;
    }
  }

  // Render Comparison Table
  const tableBody = document.getElementById('m4-table-body');
  if (tableBody) {
    tableBody.innerHTML = data.results.map(r => {
      const isSelected = r.vendor.id === ProcessIQ.aiComparator.selectedVendorId;
      const isCustom = r.isCustom;
      const refPricingLabel = r.vendor.isQuoteBased 
        ? 'Quote-Based Price' 
        : (r.vendor.id === 'custom-ai-agent' ? 'Indicative API Benchmark' : 'Official Reference Price');
      const activePricing = (ProcessIQ.activeVendorPricing && ProcessIQ.activeVendorPricing[r.vendor.id]) || r.vendor;

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
                ? `<span class="text-slate-500 font-medium">Reference: ${refPricingLabel} (${formatCurrency(activePricing.costPerUserMonth || activePricing.baseMonthlyCost)}/mo)</span>`
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
            <div class="font-semibold text-slate-800">${formatCurrency(r.monthlySub)}</div>
            <div class="text-[10px] text-slate-400">per month</div>
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

  const cur = ProcessIQ.currency;
  const reg = CURRENCY_REGISTRY[cur] || CURRENCY_REGISTRY.USD;
  const rate = reg.rateToBase || 1.0;

  let refDetails = '';
  if (vendor.id === 'm365-copilot') {
    refDetails = `Official Reference: $30.00 USD / user / month ($360/yr per seat). In ${cur}: ≈ ${formatCurrency(vendor.costPerUserMonth * rate)}/user/mo (at ${rate} FX). Verified from Microsoft Commercial Terms.`;
  } else if (vendor.id === 'copilot-studio') {
    refDetails = `Official Reference: $200.00 USD / tenant / month (Includes 25,000 billed messages). In ${cur}: ≈ ${formatCurrency(vendor.baseMonthlyCost * rate)}/tenant/mo. Additional capacity: $100 USD per 10k messages ($0.01/msg).`;
  } else if (vendor.id === 'claude-enterprise') {
    refDetails = `Benchmark Estimate: $45.00 USD / user / month (Typical 25-seat minimum). In ${cur}: ≈ ${formatCurrency(vendor.costPerUserMonth * rate)}/user/mo. Requires bespoke Anthropic enterprise sales quotation.`;
  } else if (vendor.id === 'custom-ai-agent') {
    refDetails = `API Benchmark: $150.00 USD/mo hosting + $5.00 USD/user/mo + Token usage ($3.00/M input, $15.00/M output tokens). In ${cur}: Base ≈ ${formatCurrency(vendor.baseMonthlyCost * rate)}/mo.`;
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

  captureCanonicalBase();
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
  if (ProcessIQ.canonicalBase && ProcessIQ.canonicalBase.customPricing && ProcessIQ.canonicalBase.customPricing[vendorId]) {
    delete ProcessIQ.canonicalBase.customPricing[vendorId];
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
  const elPaybackLabel = document.getElementById('dash-payback-label');
  const elCashRoi = document.getElementById('dash-cash-roi');
  const elCashPayback = document.getElementById('dash-cash-payback');

  if (elTotLabor) elTotLabor.innerText = formatCurrency(data.annualLabor);
  if (elTotLeak) elTotLeak.innerText = formatCurrency(data.annualLeakage);
  if (elTotCap) elTotCap.innerText = formatCurrency(data.annualCapacityValue);
  if (elReadiness) elReadiness.innerText = data.m3.isCompleted ? `${data.readinessScore}/100` : 'Assessment Pending';
  if (elApproach) elApproach.innerText = data.approachTitle;
  if (elApproachDesc) elApproachDesc.innerText = data.approachRationale;

  if (elNetBenefit) elNetBenefit.innerText = formatCurrency(data.netAnnualEconomicBenefit);
  if (elRoi) elRoi.innerText = `${data.roiPct}%`;
  if (elPayback) elPayback.innerText = `${data.paybackMonths} mo`;
  if (elPaybackLabel) elPaybackLabel.innerText = data.hardCashSavings > 0 ? 'Breakeven:' : 'Productivity Breakeven:';
  if (elCashRoi) elCashRoi.innerText = data.cashRoiFormatted;
  if (elCashPayback) elCashPayback.innerText = data.cashPaybackFormatted;

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
            <div class="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Financial Benefit Breakdown</div>
            <div class="flex justify-between">
              <span class="text-slate-500">• Direct Cash Savings:</span>
              <span class="font-semibold text-slate-800">${formatCurrency(s.actualCashSavings)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">• Avoided Operational Leakage:</span>
              <span class="font-semibold text-slate-800">${formatCurrency(s.avoidedLeakage)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">• Released Labor Capacity:</span>
              <span class="font-semibold text-slate-800">${formatCurrency(s.capacityValueReleased)}</span>
            </div>
            ${s.overlapAdjustment > 0 ? `
            <div class="flex justify-between text-amber-700 bg-amber-50/70 px-1.5 py-0.5 rounded border border-amber-200">
              <span class="font-medium">• Rework Overlap Adjustment:</span>
              <span class="font-bold">-${formatCurrency(s.overlapAdjustment)}</span>
            </div>
            ` : ''}
            <div class="flex justify-between border-t border-slate-200/60 pt-1">
              <span class="text-slate-600 font-semibold">1. Total Gross Economic Benefit:</span>
              <span class="font-bold text-emerald-600">${formatCurrency(s.grossSavings)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">2. Annual Technology Opex:</span>
              <span class="font-semibold text-slate-700">${formatCurrency(s.aiCost)}</span>
            </div>
            <div class="flex justify-between bg-emerald-50/50 px-1.5 py-0.5 rounded border border-emerald-100">
              <span class="text-slate-700 font-semibold">3. Net Annual Recurring Benefit:</span>
              <span class="font-bold text-emerald-700">${formatCurrency(s.netBenefit)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">4. One-Time Capex:</span>
              <span class="font-semibold text-slate-800">${formatCurrency(s.capex)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">5. 1st-Year Net Economic Value:</span>
              <span class="font-bold ${s.firstYearNetBenefit >= 0 ? 'text-blue-700' : 'text-slate-700'}">${formatCurrency(s.firstYearNetBenefit)}</span>
            </div>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-200 space-y-1.5">
          <div class="flex justify-between text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
            <span>Annual Economic ROI: <strong class="text-slate-900 font-bold">${s.roiFormatted}</strong></span>
            <span>Breakeven: <strong class="text-slate-900 font-bold">${s.breakevenHorizonFormatted || s.paybackFormatted}</strong></span>
          </div>
          <div class="flex justify-between text-[11px] text-slate-500 px-2">
            <span>Cash Payback: <strong class="${s.actualCashSavings > 0 ? 'text-emerald-700 font-semibold' : 'text-slate-500'}">${s.cashPaybackFormatted}</strong></span>
            <span>Cash ROI: <strong class="${s.actualCashSavings > 0 ? 'text-emerald-700 font-semibold' : 'text-slate-500'}">${s.cashRoiFormatted}</strong></span>
          </div>
          ${s.actualCashSavings === 0 && s.id !== 'current' ? `
            <div class="text-[10px] text-slate-400 italic px-2 leading-tight">
              Non-cash economic benefit; not actual cash payback.
            </div>
          ` : ''}
        </div>
      </div>
    `).join('');
  }

  // Render Detailed Reconciled Table
  const tableContainer = document.getElementById('dash-scenario-table-container');
  if (tableContainer) {
    tableContainer.innerHTML = `
      <table class="w-full text-xs text-left border-collapse">
        <thead>
          <tr class="bg-slate-900 text-white">
            <th class="p-2.5 rounded-l font-semibold">Scenario</th>
            <th class="p-2.5 text-right font-semibold">Operating Run-Rate</th>
            <th class="p-2.5 text-right font-semibold">Cash Savings</th>
            <th class="p-2.5 text-right font-semibold">Avoided Leakage</th>
            <th class="p-2.5 text-right font-semibold">Capacity Value</th>
            <th class="p-2.5 text-right font-semibold">Overlap Adjust.</th>
            <th class="p-2.5 text-right font-semibold">Gross Economic Benefit</th>
            <th class="p-2.5 text-right font-semibold">Tech Opex</th>
            <th class="p-2.5 text-right font-semibold">Net Recurring</th>
            <th class="p-2.5 text-right font-semibold">Capex</th>
            <th class="p-2.5 text-right font-semibold">1st-Yr Net</th>
            <th class="p-2.5 text-right font-semibold">Economic ROI</th>
            <th class="p-2.5 text-right font-semibold">Breakeven Horizon</th>
            <th class="p-2.5 text-right rounded-r font-semibold">Cash Payback</th>
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
              <td class="p-2.5 text-right text-amber-700 font-medium">${s.overlapAdjustment > 0 ? `-${formatCurrency(s.overlapAdjustment)}` : '—'}</td>
              <td class="p-2.5 text-right font-semibold text-emerald-600">${formatCurrency(s.grossSavings)}</td>
              <td class="p-2.5 text-right text-slate-700">${formatCurrency(s.aiCost)}</td>
              <td class="p-2.5 text-right font-bold text-emerald-700">${formatCurrency(s.netBenefit)}</td>
              <td class="p-2.5 text-right text-slate-700">${formatCurrency(s.capex)}</td>
              <td class="p-2.5 text-right font-semibold text-blue-700">${formatCurrency(s.firstYearNetBenefit)}</td>
              <td class="p-2.5 text-right font-bold text-slate-900">${s.roiFormatted}</td>
              <td class="p-2.5 text-right font-medium text-slate-800">${s.breakevenHorizonFormatted || s.paybackFormatted}</td>
              <td class="p-2.5 text-right font-medium ${s.actualCashSavings > 0 ? 'text-emerald-700' : 'text-slate-500'}">${s.cashPaybackFormatted}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="mt-2.5 px-3 py-2.5 bg-slate-50 border border-slate-200/70 rounded-lg text-[11px] text-slate-600 leading-relaxed space-y-1">
        <div><strong class="text-slate-800">Financial Governance Policy:</strong> <strong>Direct Cash Savings</strong> represents hard external disbursements eliminated (e.g., duplicate payments, SLA penalties). When workflow leakage consists of internal entry errors and staff rework, direct cash disbursements are ₹0, and benefits are fully recognized under <strong>Avoided Operational Leakage</strong> and <strong>Released Labor Capacity</strong>.</div>
        <div><strong class="text-slate-800">Productivity Breakeven Horizon:</strong> Non-cash economic benefit; not actual cash payback. This metric estimates how long operational productivity benefits take to equal the initial technology investment. It does not represent cash recovery unless labor expenditure, headcount or contractor costs are actually reduced. For processes where Direct Cash Savings is 0, Cash Payback is Not Achievable from operational improvements alone.</div>
        <div><strong class="text-slate-800">Rework Staffing Policy:</strong> Active assumption: <strong>${data.staffingAllocation === 'frontline' ? 'Frontline Staff (Anti-Double-Counting Active)' : (data.staffingAllocation === 'separate' ? 'Separate Specialists (Additive Benefits)' : 'Staffing Unconfirmed (Conservative Deduct Applied)')}</strong>. Overlap between frontline capacity liberation and rework hours is deducted from Gross Economic Benefit.</div>
      </div>
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
let inputsListenersAttached = false;

function syncInputs() {
  const currencySelect = document.getElementById('currency-select');
  if (currencySelect) {
    currencySelect.value = ProcessIQ.currency || 'USD';
  }

  // Module 1 inputs
  const m1 = ProcessIQ.manualCost;
  const inM1Name = document.getElementById('in-m1-name');
  const inM1Emp = document.getElementById('in-m1-emp');
  const inM1Hours = document.getElementById('in-m1-hours');
  const inM1Days = document.getElementById('in-m1-days');
  const inM1Rate = document.getElementById('in-m1-rate');
  const inM1Recovery = document.getElementById('in-m1-recovery');
  const inM1Overtime = document.getElementById('in-m1-overtime');

  if (inM1Name) inM1Name.value = m1.processName || '';
  if (inM1Emp) inM1Emp.value = m1.employeeCount;
  if (inM1Hours) inM1Hours.value = m1.hoursPerDay;
  if (inM1Days) inM1Days.value = m1.workingDays;
  if (inM1Rate) inM1Rate.value = m1.hourlyRate;
  if (inM1Recovery) inM1Recovery.value = m1.recoverableCapacityPct;
  if (inM1Overtime) inM1Overtime.checked = !!m1.includeOvertime;

  const labelRecov = document.getElementById('val-m1-recovery');
  if (labelRecov) labelRecov.innerText = `${m1.recoverableCapacityPct}%`;

  // Module 2 inputs sync
  const lk = ProcessIQ.costLeakage;
  const inM2ErrVol = document.getElementById('in-m2-err-vol');
  const inM2ErrRate = document.getElementById('in-m2-err-rate');
  const inM2ErrCost = document.getElementById('in-m2-err-cost');
  const inM2ReworkHrs = document.getElementById('in-m2-rework-hrs');
  const inM2ReworkRate = document.getElementById('in-m2-rework-rate');
  const inM2ReworkStaffing = document.getElementById('in-m2-rework-staffing');
  const inM2DelaysVol = document.getElementById('in-m2-delays-vol');
  const inM2DelaysCost = document.getElementById('in-m2-delays-cost');
  const inM2DiscCount = document.getElementById('in-m2-disc-count');
  const inM2DiscVal = document.getElementById('in-m2-disc-val');
  const inM2DupCount = document.getElementById('in-m2-dup-count');
  const inM2DupAmt = document.getElementById('in-m2-dup-amt');
  const inM2Penalties = document.getElementById('in-m2-penalties');

  if (inM2ErrVol) inM2ErrVol.value = lk.errors.monthlyVolume;
  if (inM2ErrRate) inM2ErrRate.value = lk.errors.errorRatePct;
  if (inM2ErrCost) inM2ErrCost.value = lk.errors.avgCostPerError;
  if (inM2ReworkHrs) inM2ReworkHrs.value = lk.rework.monthlyHours;
  if (inM2ReworkRate) inM2ReworkRate.value = lk.rework.hourlyRate;
  if (inM2ReworkStaffing) inM2ReworkStaffing.value = lk.rework.staffingAllocation || 'frontline';
  if (inM2DelaysVol) inM2DelaysVol.value = lk.delays.monthlyDelayedVolume;
  if (inM2DelaysCost) inM2DelaysCost.value = lk.delays.avgCostPerDelay;
  if (inM2DiscCount) inM2DiscCount.value = lk.missedDiscounts.monthlyMissedCount;
  if (inM2DiscVal) inM2DiscVal.value = lk.missedDiscounts.avgDiscountValue;
  if (inM2DupCount) inM2DupCount.value = lk.duplicatePayments.monthlyDuplicateCount;
  if (inM2DupAmt) inM2DupAmt.value = lk.duplicatePayments.avgDuplicateAmount;
  if (inM2Penalties) inM2Penalties.value = lk.penalties.monthlyAmount;

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

  // Attach event listeners once
  if (!inputsListenersAttached) {
    inputsListenersAttached = true;

    // Module 1 listeners
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
          
          const lbl = document.getElementById('val-m1-recovery');
          if (lbl) lbl.innerText = `${m1.recoverableCapacityPct}%`;

          captureCanonicalBase();
          renderAll();
        });
      }
    });

    // Module 2 monetary listeners
    const m2MonetaryElements = [
      { el: inM2ErrCost, update: (val) => { lk.errors.avgCostPerError = val; } },
      { el: inM2ReworkRate, update: (val) => { lk.rework.hourlyRate = val; } },
      { el: inM2DelaysCost, update: (val) => { lk.delays.avgCostPerDelay = val; if (val > 0) lk.delays.enabled = true; } },
      { el: inM2DiscVal, update: (val) => { lk.missedDiscounts.avgDiscountValue = val; if (val > 0) lk.missedDiscounts.enabled = true; } },
      { el: inM2DupAmt, update: (val) => { 
        lk.duplicatePayments.avgDuplicateAmount = val; 
        if (val > 0) {
          lk.duplicatePayments.enabled = true;
          if (!lk.duplicatePayments.unrecoveredPct || Number(lk.duplicatePayments.unrecoveredPct) <= 0) {
            lk.duplicatePayments.unrecoveredPct = 40.0;
          }
        }
      } },
      { el: inM2Penalties, update: (val) => { lk.penalties.monthlyAmount = val; if (val > 0) lk.penalties.enabled = true; } }
    ];

    m2MonetaryElements.forEach(({ el, update }) => {
      if (el) {
        el.addEventListener('input', () => {
          update(Number(el.value) || 0);
          captureCanonicalBase();
          renderAll();
        });
      }
    });

    // Module 2 non-monetary listeners
    const m2NonMonetaryElements = [
      { el: inM2ErrVol, update: (val) => { lk.errors.monthlyVolume = val; } },
      { el: inM2ErrRate, update: (val) => { lk.errors.errorRatePct = val; } },
      { el: inM2ReworkHrs, update: (val) => { lk.rework.monthlyHours = val; } },
      { el: inM2DelaysVol, update: (val) => { lk.delays.monthlyDelayedVolume = val; if (val > 0) lk.delays.enabled = true; } },
      { el: inM2DiscCount, update: (val) => { lk.missedDiscounts.monthlyMissedCount = val; if (val > 0) lk.missedDiscounts.enabled = true; } },
      { el: inM2DupCount, update: (val) => { 
        lk.duplicatePayments.monthlyDuplicateCount = val; 
        if (val > 0) {
          lk.duplicatePayments.enabled = true;
          if (!lk.duplicatePayments.unrecoveredPct || Number(lk.duplicatePayments.unrecoveredPct) <= 0) {
            lk.duplicatePayments.unrecoveredPct = 40.0;
          }
        }
      } }
    ];

    m2NonMonetaryElements.forEach(({ el, update }) => {
      if (el) {
        el.addEventListener('input', () => {
          update(Number(el.value) || 0);
          renderAll();
        });
      }
    });

    // Module 4 listeners
    [inM4Users, inM4Capex, inM4Integ, inM4Support].forEach(el => {
      if (el) {
        el.addEventListener('input', () => {
          m4.userCount = Number(inM4Users?.value) || 1;
          m4.implementationCostOneTime = Number(inM4Capex?.value) || 0;
          m4.integrationCostOneTime = Number(inM4Integ?.value) || 0;
          m4.annualMaintenanceSupportCost = Number(inM4Support?.value) || 0;
          captureCanonicalBase();
          renderAll();
        });
      }
    });
  }
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
    ['Currency Code', ProcessIQ.currency],
    ['Currency Symbol', ProcessIQ.currencySymbols[ProcessIQ.currency] || '$'],
    ['FX Benchmark Source', `${FX_METADATA.source} (${FX_METADATA.date})`],
    ['FX Rate to Base (USD)', (CURRENCY_REGISTRY[ProcessIQ.currency] || {}).rateToBase || 1.0],
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
    ['--- MODULE 2: PROCESS COST LEAKAGE & REWORK STAFFING ---'],
    ['Rework Staffing Allocation Assumption', data.staffingAllocation],
    ['Rework Overlap Adjustment (Scenario C)', data.cOverlapAdjustment],
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
    ['--- MODULE 4: AI INVESTMENT COMPARISON & VENDOR PRICING ---'],
    ['Selected Vendor', data.m4.active.vendor.name],
    ['Pricing Classification', data.m4.active.vendor.pricingClassification || (data.m4.active.vendor.isQuoteBased ? 'Enterprise Quote Required' : 'Official Published List Price')],
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
    ['AI Scenario Annual Economic ROI (%)', `${data.roiPct}%`],
    ['AI Scenario Productivity Breakeven Horizon', `${data.paybackMonths} mo`],
    ['AI Scenario Cash Payback Period', data.cashPaybackFormatted],
    [],
    [
      'Scenario Name',
      'Remaining Labor Cost',
      'Remaining Leakage Cost',
      'Total Remaining Run-Rate',
      'Direct Cash Savings',
      'Avoided Operational Leakage',
      'Released Labor Capacity',
      'Rework Staffing Assumption',
      'Rework Overlap Adjustment',
      'Total Gross Economic Benefit',
      'Annual Tech Opex',
      'Net Annual Recurring Benefit',
      'One-Time Capex',
      '1st-Year Net Economic Value',
      'Annual Economic ROI (%)',
      'First-Year Net Economic Return (%)',
      'Cash ROI (%)',
      'Productivity Breakeven Horizon',
      'Cash Payback Period'
    ],
    ...data.scenarios.map(s => [
      s.name,
      s.laborCost,
      s.leakageCost,
      s.totalOperatingCost,
      s.actualCashSavings,
      s.avoidedLeakage,
      s.capacityValueReleased,
      s.staffingAllocation,
      s.overlapAdjustment > 0 ? -s.overlapAdjustment : 0,
      s.grossSavings,
      s.aiCost,
      s.netBenefit,
      s.capex,
      s.firstYearNetBenefit,
      s.roiFormatted,
      s.firstYearRoiFormatted,
      s.cashRoiFormatted,
      s.breakevenHorizonFormatted || s.paybackFormatted,
      s.cashPaybackFormatted
    ]),
    [],
    ['--- FINANCIAL MODEL METHODOLOGY & BENEFIT CLASSIFICATION ---'],
    ['Direct Cash Savings', 'Hard disbursements eliminated directly from operating expense budgets (e.g., duplicate payments, SLA penalties). When workflow leakage consists of internal entry errors and rework, direct disbursements are 0.'],
    ['Avoided Operational Leakage', 'Operational defect, dispute, rework, and delay elimination across workflow transactions.'],
    ['Released Labor Capacity', 'Staff bandwidth liberated for higher-value activities valued at loaded hourly wage rate.'],
    ['Rework Overlap Adjustment', 'Deduction applied when rework is performed by frontline staff, preventing double-counting with liberated frontline capacity.'],
    ['1. Gross Annual Savings', 'Capacity Value Released + Total Avoided Operational Leakage minus Overlap Adjustment (Total Gross Economic Benefit).'],
    ['2. Annual Tech Opex', 'Annual license subscriptions, cloud infrastructure, and ongoing maintenance.'],
    ['5. 1st-Year Net Benefit', 'Net Annual Recurring Benefit minus One-Time Implementation Capex (First-Year Net Economic Value).'],
    ['Total Gross Economic Benefit', 'Capacity Value Released + Total Avoided Operational Leakage minus Overlap Adjustment.'],
    ['Annual Economic ROI (%)', '(Net Annual Economic Benefit / One-Time Implementation Capex) * 100.'],
    ['First-Year Net Economic Return (%)', '(First-Year Net Economic Value / One-Time Implementation Capex) * 100.'],
    ['Cash ROI (%)', 'Calculated strictly on direct cash savings and applicable technology costs: (Net Cash Savings - Capex) / Total Cash Spend.'],
    ['Productivity Breakeven Horizon', 'Non-cash economic metric: Capex / (Net Annual Economic Benefit / 12). Does not represent cash recovery unless labor expenditure, headcount, or contractor costs are reduced.'],
    ['Cash Payback Period', 'Capex / (Net Recurring Direct Cash Savings / 12). Displays N/A when direct cash savings are 0.']
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
// MULTI-PAGE CONSULTING PDF REPORT GENERATOR (10 PAGES/SECTIONS)
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

  const isDemo = Boolean(ProcessIQ.isSampleData);
  const processName = ProcessIQ.manualCost.processName || 'Enterprise Process';
  const department = ProcessIQ.manualCost.department || 'Operations';
  const cur = ProcessIQ.currency || 'USD';
  const evalDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Safe PDF currency formatter that prevents Latin-1 encoding bugs (e.g. INR ₹ -> corrupted glyph)
  function formatPdfCurrency(val) {
    const sym = cur === 'INR' ? 'INR ' : (ProcessIQ.currencySymbols[cur] || '$');
    const num = Math.round(Number(val) || 0);
    return `${sym}${num.toLocaleString('en-US')}`;
  }

  let currentPage = 1;

  function addHeaderFooter(title) {
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // slate-400
    const demoPrefix = isDemo ? '[DEMO SAMPLE] ' : '';
    doc.text(`PROCESSIQ ENTERPRISE REPORT | ${demoPrefix}${title.toUpperCase()}`, margin, 30);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(margin, 35, pageWidth - margin, 35);

    doc.line(margin, pageHeight - 35, pageWidth - margin, pageHeight - 35);
    const modeLabel = isDemo ? 'Demonstration Sample Case Study' : 'Enterprise Valuation Diagnostic';
    doc.text(`Confidential — ${modeLabel}`, margin, pageHeight - 22);
    doc.text(`Page ${currentPage} of 10`, pageWidth - margin - 55, pageHeight - 22);
  }

  function newPage(title) {
    doc.addPage();
    currentPage++;
    addHeaderFooter(title);
  }

  // -----------------------------------------------------------
  // PAGE 1: COVER PAGE (EXECUTIVE CONSULTING DESIGN)
  // -----------------------------------------------------------
  // Dark Navy Canvas
  doc.setFillColor(15, 23, 42); // Navy #0f172a
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Accent vertical bands (Cobalt Blue + Emerald/Teal)
  doc.setFillColor(37, 99, 235); // Blue #2563eb
  doc.rect(margin, 105, 5, 80, 'F');
  doc.setFillColor(13, 148, 136); // Teal #0d9488
  doc.rect(margin + 5, 105, 3, 80, 'F');

  doc.setFontSize(30);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('PROCESSIQ', margin + 20, 135);

  doc.setFontSize(9);
  doc.setTextColor(45, 212, 191); // teal-400
  doc.setFont('helvetica', 'bold');
  doc.text('ENTERPRISE VALUATION & AI TRANSFORMATION PLATFORM', margin + 20, 155);

  doc.setFontSize(12);
  doc.setTextColor(191, 219, 254); // blue-200
  doc.setFont('helvetica', 'normal');
  doc.text('Know your process cost before you invest in AI.', margin + 20, 175);

  // Dynamic Process Mode Banner (Explicitly identifies Demo vs User-Configured)
  const bannerBadgeText = isDemo
    ? `DEMONSTRATION SAMPLE REPORT — ${processName.toUpperCase()}`
    : `USER-CONFIGURED ENTERPRISE ASSESSMENT — ${processName.toUpperCase()}`;

  doc.setFillColor(isDemo ? 180 : 15, isDemo ? 83 : 118, isDemo ? 9 : 110); // amber-700 or teal-700
  doc.roundedRect(margin, 210, contentWidth, 26, 4, 4, 'F');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text(bannerBadgeText, margin + 14, 226);

  // Report Title
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('Business Transformation & AI Readiness Case', margin, 270);

  // Metadata Card
  doc.setFillColor(30, 41, 59); // slate-800
  doc.roundedRect(margin, 290, contentWidth, 80, 5, 5, 'F');
  doc.setDrawColor(51, 65, 85);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, 290, contentWidth, 80, 5, 5, 'S');

  doc.setFontSize(9.5);
  doc.setTextColor(203, 213, 225); // slate-300
  doc.setFont('helvetica', 'normal');
  doc.text(`Target Process:`, margin + 16, 312);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(processName, margin + 120, 312);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text(`Department / Unit:`, margin + 16, 330);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(department, margin + 120, 330);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text(`Evaluation Date:`, margin + 16, 348);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(evalDate, margin + 120, 348);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text(`Reporting Currency:`, margin + 300, 312);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(cur, margin + 410, 312);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text(`Evaluation Mode:`, margin + 300, 330);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(isDemo ? 251 : 52, isDemo ? 191 : 211, isDemo ? 36 : 153);
  doc.text(isDemo ? 'Demonstration Benchmark' : 'Production Diagnostic', margin + 410, 330);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text(`Recommended Path:`, margin + 300, 348);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(147, 197, 253);
  doc.text(data.approachTitle.length > 22 ? data.approachTitle.substring(0, 20) + '...' : data.approachTitle, margin + 410, 348);

  // Executive KPI Grid on Cover (2x2 Cards)
  const cardW = (contentWidth - 12) / 2;
  const cardH = 68;
  const gridY = 390;

  // Card 1: Annual Labor Cost
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(margin, gridY, cardW, cardH, 5, 5, 'F');
  doc.roundedRect(margin, gridY, cardW, cardH, 5, 5, 'S');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(148, 163, 184);
  doc.text('ANNUAL BASELINE LABOR COST', margin + 14, gridY + 18);
  doc.setFontSize(15);
  doc.setTextColor(248, 250, 252);
  doc.text(formatPdfCurrency(m1.totalAnnualLaborCost), margin + 14, gridY + 40);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text(`Baseline commitment across ${ProcessIQ.manualCost.employeeCount} FTEs`, margin + 14, gridY + 56);

  // Card 2: Process Cost Leakage
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(margin + cardW + 12, gridY, cardW, cardH, 5, 5, 'F');
  doc.roundedRect(margin + cardW + 12, gridY, cardW, cardH, 5, 5, 'S');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(148, 163, 184);
  doc.text('ANNUAL PROCESS COST LEAKAGE', margin + cardW + 26, gridY + 18);
  doc.setFontSize(15);
  doc.setTextColor(248, 113, 113); // red-400
  doc.text(formatPdfCurrency(m2.totalAnnual), margin + cardW + 26, gridY + 40);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('Quantified operational defects, rework & delays', margin + cardW + 26, gridY + 56);

  // Card 3: AI Readiness Score
  const gridY2 = gridY + cardH + 12;
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(margin, gridY2, cardW, cardH, 5, 5, 'F');
  doc.roundedRect(margin, gridY2, cardW, cardH, 5, 5, 'S');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(148, 163, 184);
  doc.text('AI READINESS DIAGNOSTIC', margin + 14, gridY2 + 18);
  if (m3.isCompleted) {
    doc.setFontSize(15);
    doc.setTextColor(56, 189, 248); // sky-400
    doc.text(`${m3.overallScore} / 100`, margin + 14, gridY2 + 40);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(125, 211, 252);
    doc.text(m3.classification, margin + 14, gridY2 + 56);
  } else {
    doc.setFontSize(13);
    doc.setTextColor(251, 191, 36); // amber-400
    doc.text('Assessment Pending', margin + 14, gridY2 + 40);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(252, 211, 77);
    doc.text(`Diagnostic Incomplete (${m3.answeredCount}/${m3.questionCount} Answered)`, margin + 14, gridY2 + 56);
  }

  // Card 4: Net Projected Economic Benefit
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(margin + cardW + 12, gridY2, cardW, cardH, 5, 5, 'F');
  doc.roundedRect(margin + cardW + 12, gridY2, cardW, cardH, 5, 5, 'S');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(148, 163, 184);
  doc.text('NET RECURRING BENEFIT (SCENARIO C)', margin + cardW + 26, gridY2 + 18);
  doc.setFontSize(15);
  doc.setTextColor(52, 211, 153); // emerald-400
  doc.text(formatPdfCurrency(data.netAnnualEconomicBenefit), margin + cardW + 26, gridY2 + 40);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(110, 231, 183);
  doc.text(`Recurring ROI: ${data.roiPct}% | Payback: ${data.paybackMonths} mo`, margin + cardW + 26, gridY2 + 56);

  // Cover Page Executive Callout Box
  const calloutY = gridY2 + cardH + 18;
  doc.setFillColor(23, 37, 84); // dark blue-950
  doc.roundedRect(margin, calloutY, contentWidth, 75, 5, 5, 'F');
  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, calloutY, contentWidth, 75, 5, 5, 'S');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(147, 197, 253);
  doc.text('EXECUTIVE TRANSFORMATION DIRECTIVE', margin + 14, calloutY + 20);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(226, 232, 240);
  const coverDirective = 
    `This formal valuation establishes the financial baseline, operational defect leakage, and organizational readiness for ${processName}. ` +
    `Traditional workflow automation recovers deterministic rules capacity, while Enterprise AI unlocks unstructured cognitive processing. ` +
    `Strategic recommendations are fully reconciled against commercial AI total cost of ownership to ensure maximum capital efficiency.`;
  doc.text(doc.splitTextToSize(coverDirective, contentWidth - 28), margin + 14, calloutY + 36);

  // Cover Page Bottom Footer & Attributions
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text('ProcessIQ Enterprise Valuation Platform | Enterprise Solutions Architecture', margin, pageHeight - 55);

  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Generated via ProcessIQ Client-Side Evaluation Engine | Local In-Memory Execution | Zero Cloud Data Transmission', margin, pageHeight - 40);

  // -----------------------------------------------------------
  // PAGE 2: EXECUTIVE SUMMARY & STRATEGIC SYNTHESIS
  // -----------------------------------------------------------
  newPage('Executive Summary');

  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('Executive Summary', margin, 70);

  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');
  const execSummaryText = 
    `This report establishes the baseline economics, cost leakage, and strategic AI readiness for ${processName}. ` +
    `Modern enterprises frequently rush into generative AI licensing without first calculating whether their manual processes are structured, ` +
    `governed, and financially suited for automation. ` +
    `Our objective evaluation combines four rigorous dimensions: labor intensity, systemic defect leakage, multi-tier organizational readiness, ` +
    `and commercial AI vendor total cost of ownership.`;
  doc.text(doc.splitTextToSize(execSummaryText, contentWidth), margin, 92);

  // Summary Table
  doc.autoTable({
    startY: 155,
    head: [['Strategic Dimension', 'Current Baseline Metric', 'Strategic Assessment & Governance Scope']],
    body: [
      ['Annual Labor Exposure', formatPdfCurrency(m1.totalAnnualLaborCost), `${formatNumber(m1.annualHours)} labor hours committed annually across ${ProcessIQ.manualCost.employeeCount} dedicated operators.`],
      ['Recoverable Capacity', `${formatPdfCurrency(m1.recoverableAnnualValue)} (${ProcessIQ.manualCost.recoverableCapacityPct}%)`, `${formatNumber(m1.recoverableAnnualHours)} productive hours reclaimable for high-value strategic execution.`],
      ['Process Cost Leakage', formatPdfCurrency(m2.totalAnnual), `Operational defects, rework, and compliance penalties generate ${formatPdfCurrency(m2.totalMonthly)} in monthly leakage.`],
      ['AI Readiness Score', m3.isCompleted ? `${m3.overallScore}/100` : 'Assessment Pending', `${m3.classification}. ${m3.description}`],
      ['Recommended Strategy', data.approachTitle, data.approachRationale],
      ['Financial Returns (AI)', `ROI: ${data.roiPct}% | Payback: ${data.paybackMonths} mo`, `Net annual economic value of ${formatPdfCurrency(data.netAnnualEconomicBenefit)} projected under Scenario C.`]
    ],
    theme: 'grid',
    headStyles: { fillColor: [15, 23, 42], textColor: 255, fontSize: 8.5, fontStyle: 'bold' },
    styles: { fontSize: 8, cellPadding: 6 }
  });

  const finalY2 = doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : 360;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, finalY2, contentWidth, 80, 5, 5, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, finalY2, contentWidth, 80, 5, 5, 'S');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175); // blue-800
  doc.text('Key Strategic Takeaway for Executive Leadership:', margin + 14, finalY2 + 20);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const execTakeaway = 
    `Automating an unstructured process simply accelerates chaos. By evaluating labor exposure (${formatPdfCurrency(m1.totalAnnualLaborCost)}) ` +
    `and systemic defect leakage (${formatPdfCurrency(m2.totalAnnual)}) against organizational maturity (${m3.isCompleted ? m3.overallScore + '/100' : 'Assessment Pending'}), ` +
    `leadership can determine whether to deploy low-code rules automation (Scenario B) to eliminate basic workflow debt or implement cognitive AI copilots ` +
    `(Scenario C) to achieve scalable operational throughput.`;
  doc.text(doc.splitTextToSize(execTakeaway, contentWidth - 28), margin + 14, finalY2 + 36);

  // -----------------------------------------------------------
  // PAGE 3: PROCESS INFORMATION & BASELINE PARAMETERS
  // -----------------------------------------------------------
  newPage('Process Information & Baseline Parameters');

  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('Process Information & Key Assumptions', margin, 70);

  doc.autoTable({
    startY: 95,
    head: [['Input Parameter', 'Configured Value', 'Methodology & Source Assumption']],
    body: [
      ['Process Name', processName, 'Target business workflow evaluated.'],
      ['Department / Unit', department, 'Designated organizational department.'],
      ['Reporting Currency', cur, 'Base currency for all financial calculations.'],
      ['Dedicated Headcount', `${ProcessIQ.manualCost.employeeCount} FTEs`, 'Full-time employees engaged in the daily workflow.'],
      ['Average Hours/Day', `${ProcessIQ.manualCost.hoursPerDay} hrs/day`, 'Estimated time per employee dedicated to this specific task.'],
      ['Working Days/Month', `${ProcessIQ.manualCost.workingDays} days/mo`, 'Standard corporate working days per operational month.'],
      ['Fully-Loaded Hourly Rate', formatPdfCurrency(ProcessIQ.manualCost.hourlyRate), 'Includes salary, payroll taxes, benefits, and corporate overhead.'],
      ['Overtime Consideration', ProcessIQ.manualCost.includeOvertime ? `${ProcessIQ.manualCost.overtimeHours} hrs/mo @ ${formatPdfCurrency(ProcessIQ.manualCost.overtimeRate)}/hr` : 'None Configured', 'Recurring monthly overtime commitments.'],
      ['Salary Escalation Rate', `${ProcessIQ.manualCost.annualSalaryIncreasePct}% per annum`, 'Baseline wage inflation assumption used for multi-year projections.'],
      ['Estimated Recovery Target', `${ProcessIQ.manualCost.recoverableCapacityPct}% of labor hours`, 'Targeted proportion of repetitive work reclaimable via transformation.']
    ],
    theme: 'striped',
    headStyles: { fillColor: [30, 41, 59], textColor: 255, fontSize: 8.5 }
  });

  // -----------------------------------------------------------
  // PAGE 4: MANUAL WORK COST ANALYSIS (MODULE 1)
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
      ['Base Labor Cost', formatPdfCurrency(m1.baseMonthlyLaborCost), formatPdfCurrency(m1.baseAnnualLaborCost), formatPdfCurrency(m1.baseAnnualLaborCost * (1 + (ProcessIQ.manualCost.annualSalaryIncreasePct/100))), formatPdfCurrency(m1.baseAnnualLaborCost * Math.pow(1 + (ProcessIQ.manualCost.annualSalaryIncreasePct/100), 2))],
      ['Overtime Spend', formatPdfCurrency(m1.monthlyOvertimeCost), formatPdfCurrency(m1.monthlyOvertimeCost * 12), formatPdfCurrency(m1.monthlyOvertimeCost * 12 * (1 + (ProcessIQ.manualCost.annualSalaryIncreasePct/100))), formatPdfCurrency(m1.monthlyOvertimeCost * 12 * Math.pow(1 + (ProcessIQ.manualCost.annualSalaryIncreasePct/100), 2))],
      ['Total Labor Commitment', formatPdfCurrency(m1.totalMonthlyLaborCost), formatPdfCurrency(m1.totalAnnualLaborCost), formatPdfCurrency(m1.projectedYear2LaborCost), formatPdfCurrency(m1.projectedYear3LaborCost)],
      ['Recoverable Capacity Value', formatPdfCurrency(m1.recoverableMonthlyValue), formatPdfCurrency(m1.recoverableAnnualValue), formatPdfCurrency(m1.recoverableAnnualValue * (1 + (ProcessIQ.manualCost.annualSalaryIncreasePct/100))), formatPdfCurrency(m1.recoverableAnnualValue * Math.pow(1 + (ProcessIQ.manualCost.annualSalaryIncreasePct/100), 2))]
    ],
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontSize: 8 }
  });

  const finalY4 = doc.lastAutoTable ? doc.lastAutoTable.finalY + 18 : 250;
  doc.setFillColor(254, 243, 199); // light amber-100
  doc.roundedRect(margin, finalY4, contentWidth, 55, 4, 4, 'F');
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(margin, finalY4, contentWidth, 55, 4, 4, 'S');

  doc.setFontSize(8.5);
  doc.setTextColor(146, 64, 14); // amber-800
  doc.setFont('helvetica', 'bold');
  doc.text('Important Capacity Recovery Distinction:', margin + 12, finalY4 + 18);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const disclaimerP4 = 'Recovered employee capacity reflects productive hours reclaimed for high-value strategic execution. It does not constitute immediate cash savings or guaranteed payroll reduction unless headcount, overtime, or contractor spend is formally restructured.';
  doc.text(doc.splitTextToSize(disclaimerP4, contentWidth - 24), margin + 12, finalY4 + 32);

  // -----------------------------------------------------------
  // PAGE 5: PROCESS COST LEAKAGE ANALYSIS (MODULE 2)
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
      formatPdfCurrency(i.monthly),
      formatPdfCurrency(i.annual),
      `${Math.round(i.pct)}%`,
      i.intervention
    ]),
    theme: 'grid',
    headStyles: { fillColor: [220, 38, 38], textColor: 255, fontSize: 8 }
  });

  let yPos5 = doc.lastAutoTable ? doc.lastAutoTable.finalY + 18 : 320;
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, yPos5, contentWidth, 68, 4, 4, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, yPos5, contentWidth, 68, 4, 4, 'S');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('Anti-Double Counting Controls & Operational Warnings:', margin + 12, yPos5 + 16);
  yPos5 += 28;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  if (m2.warnings.length > 0) {
    m2.warnings.forEach(w => {
      const lines = doc.splitTextToSize(`* ${w}`, contentWidth - 24);
      doc.text(lines, margin + 12, yPos5);
      yPos5 += (lines.length * 9) + 2;
    });
  } else {
    doc.text('Anti-Double Counting Validation: Zero cross-category leakage overlaps identified.', margin + 12, yPos5);
  }

  // -----------------------------------------------------------
  // PAGE 6: AI READINESS ASSESSMENT (MODULE 3)
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
      yPos6 += (lines.length * 10) + 3;
    });
  } else {
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    doc.text('Diagnostic in progress: No high-scoring dimensions recorded yet.', margin + 5, yPos6);
    yPos6 += 14;
  }

  yPos6 += 10;
  // Vulnerabilities and Operational Risks
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
      yPos6 += (lines.length * 10) + 3;
    });
  } else {
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    doc.text('No significant risks identified from the supplied answers: All evaluated process dimensions meet or exceed maturity thresholds (>= 3/4).', margin + 5, yPos6);
  }

  // -----------------------------------------------------------
  // PAGE 7: AI INVESTMENT COMPARISON (MODULE 4)
  // -----------------------------------------------------------
  newPage('AI Investment Comparison');

  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('Module 4: Enterprise AI Investment Comparator', margin, 70);

  doc.autoTable({
    startY: 95,
    head: [['AI Platform', 'Pricing Model', 'Pricing Status', 'Year 1 Licenses', 'Year 1 Usage', 'Annual Support', 'Year 1 Capex', 'Total Year 1', '3-Year Total']],
    body: data.m4.results.map(r => {
      const statusLabel = r.isCustom 
        ? 'Custom Price Entered by User' 
        : (r.vendor.isQuoteBased ? 'Quote-Based Contract' : 'Verified Public Pricing');
      return [
        r.vendor.name,
        r.vendor.pricingModel || r.vendor.tier,
        statusLabel,
        formatPdfCurrency(r.year1Sub),
        formatPdfCurrency(r.year1Usage || 0),
        formatPdfCurrency(r.annualSupport || 8000),
        formatPdfCurrency(r.year1Capex),
        formatPdfCurrency(r.totalYear1),
        formatPdfCurrency(r.contractTotal)
      ];
    }),
    columnStyles: {
      0: { cellWidth: 75 },
      1: { cellWidth: 55 },
      2: { cellWidth: 65 },
      3: { cellWidth: 50 },
      4: { cellWidth: 45 },
      5: { cellWidth: 45 },
      6: { cellWidth: 45 },
      7: { cellWidth: 65 },
      8: { cellWidth: 70 }
    },
    theme: 'grid',
    headStyles: { fillColor: [30, 41, 59], textColor: 255, fontSize: 7.5 },
    styles: { fontSize: 6.5, cellPadding: 3.5 }
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
    head: [['Scenario', 'Cash Savings*', 'Avoided Leakage', 'Capacity Value', 'Overlap Adj.', 'Gross Benefits', 'Tech Opex', 'Net Recurring', 'Capex', '1st-Yr Net', 'Economic ROI', 'Breakeven']],
    body: data.scenarios.map(s => [
      s.name,
      formatPdfCurrency(s.actualCashSavings),
      formatPdfCurrency(s.avoidedLeakage),
      formatPdfCurrency(s.capacityValueReleased),
      s.overlapAdjustment > 0 ? `-${formatPdfCurrency(s.overlapAdjustment)}` : '—',
      formatPdfCurrency(s.grossSavings),
      formatPdfCurrency(s.aiCost),
      formatPdfCurrency(s.netBenefit),
      formatPdfCurrency(s.capex),
      formatPdfCurrency(s.firstYearNetBenefit),
      s.roiFormatted,
      s.breakevenHorizonFormatted || s.paybackFormatted
    ]),
    columnStyles: {
      0: { cellWidth: 65 },
      1: { cellWidth: 42 },
      2: { cellWidth: 42 },
      3: { cellWidth: 42 },
      4: { cellWidth: 40 },
      5: { cellWidth: 44 },
      6: { cellWidth: 38 },
      7: { cellWidth: 42 },
      8: { cellWidth: 38 },
      9: { cellWidth: 40 },
      10: { cellWidth: 40 },
      11: { cellWidth: 40 }
    },
    theme: 'grid',
    headStyles: { fillColor: [15, 23, 42], textColor: 255, fontSize: 6.5 },
    styles: { fontSize: 6, cellPadding: 3 }
  });

  // Table 1 Governance Footnote
  const noteTable1Y = doc.lastAutoTable ? doc.lastAutoTable.finalY + 4 : 155;
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 116, 139);
  const table1Note = '* Note: Direct Cash Savings reflects eliminated external disbursements (e.g., duplicate payments, SLA penalties). When direct disbursements are ' + formatPdfCurrency(0) + ', cash payback is Not Achievable from operational improvements alone. Overlap Adjustment deduplicates frontline labor capacity against avoided internal rework hours. Productivity Breakeven Horizon reflects non-cash economic recovery, not cash payback.';
  doc.text(doc.splitTextToSize(table1Note, contentWidth), margin, noteTable1Y);

  // Table 2: Operating Run-Rate Breakdown
  const table2Y = noteTable1Y + 16;
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
        formatPdfCurrency(s.laborCost),
        formatPdfCurrency(s.leakageCost),
        formatPdfCurrency(s.totalOperatingCost),
        `${redPct}% (${formatPdfCurrency(s.grossSavings)} saved)`
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
  // PAGE 9: 30-DAY TACTICAL ROADMAP & EXECUTIVE SIGN-OFF
  // -----------------------------------------------------------
  newPage('30-Day Tactical Roadmap & Sign-Off');

  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('Recommended 30-Day Tactical Roadmap', margin, 70);

  const roadmapData = (m3.roadmap && m3.roadmap.length > 0) ? m3.roadmap : [
    { days: 'Days 1–10', phase: 'Process Hygiene & Baseline Mapping', task: 'Workflow Mapping & SOP Standardization', deliverable: 'Step-level flowchart with exception matrix', owner: 'Process Owner & Ops Lead' },
    { days: 'Days 11–20', phase: 'Data Architecture & Privacy Guardrails', task: 'Data Accessibility Audit & Sanitization', deliverable: '50-item clean golden evaluation dataset with ground truth', owner: 'Data Engineer & Security Lead' },
    { days: 'Days 21–30', phase: 'Supervised Pilot & Change Enablement', task: 'Constrained Pilot (20% volume) with HITL Sign-offs', deliverable: 'Pilot Performance Scorecard measuring cycle-time and adoption', owner: 'Transformation Lead & Power Users' }
  ];

  doc.autoTable({
    startY: 90,
    head: [['Time Horizon', 'Strategic Phase', 'Tactical Actions', 'Key Deliverable', 'Accountable Owner']],
    body: roadmapData.map(r => [
      r.days,
      r.phase,
      r.task,
      r.deliverable,
      r.owner
    ]),
    theme: 'grid',
    headStyles: { fillColor: [5, 150, 105], textColor: 255, fontSize: 8 },
    styles: { fontSize: 7.5, cellPadding: 5 }
  });

  // Enterprise Governance Sign-Off Block
  const finalY9 = doc.lastAutoTable ? doc.lastAutoTable.finalY + 25 : 320;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Executive Transformation Sign-Off & Governance Approval', margin, finalY9);

  doc.autoTable({
    startY: finalY9 + 10,
    head: [['Executive Stakeholder Role', 'Designated Leader', 'Governance Decision', 'Formal Signature', 'Date Signed']],
    body: [
      ['Business Executive Sponsor', `${department} VP`, '[  ] Approved    [  ] Conditional    [  ] Deferred', '_______________________', '____ / ____ / 2026'],
      ['Finance & Commercial Controller', 'Corporate Finance', '[  ] Approved    [  ] Conditional    [  ] Deferred', '_______________________', '____ / ____ / 2026'],
      ['Technology & AI Practice Lead', 'Enterprise Architecture', '[  ] Approved    [  ] Conditional    [  ] Deferred', '_______________________', '____ / ____ / 2026']
    ],
    theme: 'grid',
    headStyles: { fillColor: [15, 23, 42], textColor: 255, fontSize: 8, fontStyle: 'bold' },
    styles: { fontSize: 7.5, cellPadding: 8 }
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
    '5. Client-Side Privacy, Local Storage & External Dependencies: All calculations, transformations, and document compilations were executed in-memory within the local browser sandbox. Zero business data was stored or transmitted across any network. The application utilizes browser localStorage strictly to preserve assessment progress between sessions. External network activity is strictly limited to retrieving public static code libraries (Tailwind CSS, Chart.js, jsPDF, Google Fonts) on initial page load.',
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
  doc.text('ProcessIQ Enterprise Valuation Platform | Confidential Assessment Report', margin, pageHeight - 50);

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
              <div><strong>Report Scope:</strong> <span style="color: #0f172a; font-weight: 600;">Executive Diagnostic</span></div>
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
        <table class="print-table">
          <thead>
            <tr>
              <th style="width: 37%;">Strategic Financial Metric</th>
              <th style="width: 21%;">Scenario A: Current Baseline</th>
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
              <td style="font-weight: 700;">1. Total Gross Economic Benefit</td>
              <td style="font-weight: 700;">${formatCurrency(scA.grossSavings)}</td>
              <td style="font-weight: 700;">${formatCurrency(scB.grossSavings)}</td>
              <td style="font-weight: 800; color: #1e3a8a;">${formatCurrency(scC.grossSavings)}</td>
            </tr>
            <tr>
              <td style="padding-left: 14px;">&bull; Released Labor Capacity (Labor Bandwidth)</td>
              <td>${formatCurrency(scA.capacityValueReleased)}</td>
              <td>${formatCurrency(scB.capacityValueReleased)}</td>
              <td>${formatCurrency(scC.capacityValueReleased)}</td>
            </tr>
            <tr>
              <td style="padding-left: 14px;">&bull; Avoided Operational Leakage (Errors & Defects)</td>
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
            <tr style="background-color: #fffbeb; font-size: 7.5pt; color: #92400e;">
              <td style="padding-left: 14px; font-weight: 600;">&bull; Rework Overlap Adjustment (${scC.staffingAllocation === 'separate' ? 'Separate Staff' : 'Anti-Double-Counting'})</td>
              <td>${formatCurrency(0)}</td>
              <td>${scB.overlapAdjustment > 0 ? `-${formatCurrency(scB.overlapAdjustment)}` : formatCurrency(0)}</td>
              <td style="font-weight: 700;">${scC.overlapAdjustment > 0 ? `-${formatCurrency(scC.overlapAdjustment)}` : formatCurrency(0)}</td>
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
              <td>6. Annual Economic ROI (Benefit-to-Investment Ratio)</td>
              <td>${scA.roiFormatted || 'N/A – Baseline'}</td>
              <td>${scB.roiFormatted}</td>
              <td style="color: #1d4ed8; font-weight: 800;">${scC.roiFormatted}</td>
            </tr>
            <tr class="bold-row">
              <td>7. Productivity Breakeven Horizon (Economic Payback)</td>
              <td>${scA.breakevenHorizonFormatted || 'N/A – Baseline'}</td>
              <td>${scB.breakevenHorizonFormatted || scB.paybackFormatted}</td>
              <td style="color: #1d4ed8; font-weight: 800;">${scC.breakevenHorizonFormatted || scC.paybackFormatted}</td>
            </tr>
            <tr style="background-color: #f8fafc; font-size: 7.5pt; color: #334155;">
              <td style="padding-left: 14px;">8. Cash Payback Period (Estimated Direct Cash)</td>
              <td>N/A – Baseline</td>
              <td style="font-weight: 600;">${scB.cashPaybackFormatted}</td>
              <td style="font-weight: 600; color: ${scC.actualCashSavings > 0 ? '#047857' : '#64748b'};">${scC.cashPaybackFormatted}</td>
            </tr>
          </tbody>
        </table>

        <!-- SECTION 3.1: FINANCIAL GOVERNANCE CALLOUT NOTE -->
        <div class="print-callout">
          <strong>Component Hierarchy & Anti-Double-Counting Governance:</strong>
          Gross Annual Operating Savings is the mathematical sum of <em>Released Labor Capacity</em> plus <em>Avoided Operational Leakage</em> minus <em>Rework Overlap Adjustment</em>. <em>Actual Cash Savings</em> is an embedded component of Avoided Leakage (eliminating direct external disbursements like duplicate vendor payments and SLA penalties). Where process leakage consists exclusively of internal entry errors and staff rework (as in Accounts Receivable), direct external cash disbursements are ${formatCurrency(0)}; 100% of leakage reduction is captured under <em>Avoided Operational Leakage</em> and <em>Released Labor Capacity</em>. Capacity Value Released converts to cash payroll reduction only upon formal staffing adjustments or overtime elimination.
          <br><strong>Productivity Breakeven Horizon:</strong> Non-cash economic benefit; not actual cash payback. This metric estimates how long operational productivity benefits take to equal initial technology investment. It does not represent cash recovery unless labor expenditure, headcount, or contractor spend is actually reduced.
          <br><strong>Rework Staffing Policy:</strong> Active assumption: <strong>${scC.staffingAllocation === 'frontline' ? 'Frontline Staff (Anti-Double-Counting Active)' : (scC.staffingAllocation === 'separate' ? 'Separate Specialists (Additive Benefits)' : 'Staffing Unconfirmed (Conservative Deduct Applied)')}</strong>.
        </div>

        <!-- SECTION 3.2: EXECUTIVE FINANCIAL COMMENTARY & GUARDRAILS -->
        <div class="print-two-col">
          <div class="print-card-box">
            <div style="font-size: 7.75pt; font-weight: 700; color: #0f172a; text-transform: uppercase; margin-bottom: 3px;">
              Cash vs. Bandwidth Realization Policy
            </div>
            <div style="font-size: 7.25pt; color: #475569; line-height: 1.4;">
              <strong>Direct Cash Savings:</strong> Hard disbursements eliminated directly from operating expense budgets (e.g. duplicate vendor payments, SLA penalties). For processes driven by internal clerical errors and rework, direct disbursements are ${formatCurrency(0)}, with benefits fully recognized in Avoided Leakage.<br>
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
        <div><strong>ProcessIQ</strong> &bull; Know your process cost before you invest in AI</div>
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
              Process: <strong style="color: #0f172a;">${escapePrintHtml(processName)}</strong>
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
        <div><strong>ProcessIQ</strong> &bull; Confidential Executive Briefing</div>
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

  // Accessibility: enable keyboard navigation (Enter/Space) on custom cards and steppers
  document.querySelectorAll('.process-card, .stepper-item').forEach(el => {
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });

  // Non-blocking application update listener on window focus
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('focus', checkForApplicationUpdates);
  }

  captureCanonicalBase();
  updateCurrencyBadges();
  syncInputs();
  renderAll();
  loadProgress(); // Restore any previously saved session if safe
});

// -------------------------------------------------------------
// CLIENT-SIDE UPDATE DETECTION & RECOVERY
// -------------------------------------------------------------
function checkForApplicationUpdates() {
  if (typeof fetch === 'undefined') return;
  fetch('./package.json?t=' + Date.now(), { cache: 'no-store' })
    .then(res => res.json())
    .then(pkg => {
      if (pkg && pkg.version && pkg.version !== PROCESSIQ_VERSION) {
        showUpdateBanner(pkg.version);
      }
    })
    .catch(() => {});
}

function showUpdateBanner(newVersion) {
  let banner = document.getElementById('app-update-banner');
  if (banner) return;
  banner = document.createElement('div');
  banner.id = 'app-update-banner';
  banner.className = 'fixed top-16 left-0 right-0 bg-blue-600 text-white text-xs py-2 px-4 shadow-lg z-50 flex items-center justify-between';
  banner.innerHTML = `
    <div class="flex items-center space-x-2">
      <span class="font-bold">Update Available:</span>
      <span>A newer release of ProcessIQ (v${newVersion}) is available. Your inputs are preserved.</span>
    </div>
    <button onclick="saveProgress(); window.location.reload(true);" class="px-3 py-1 bg-white text-blue-700 font-bold rounded shadow hover:bg-blue-50 transition">
      Refresh to Update
    </button>
  `;
  document.body.prepend(banner);
}
