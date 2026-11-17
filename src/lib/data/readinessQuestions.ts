export interface ReadinessOption {
  label: string;
  score: number; // 0 to 4 (scaled to percentage)
  description?: string;
}

export interface ReadinessQuestion {
  id: string;
  number: number;
  dimension: string;
  dimensionId: string;
  category: 'Process' | 'Data' | 'Technology' | 'Governance & Risk' | 'Organization & Value';
  tiers: ('quick' | 'professional' | 'advanced')[];
  question: string;
  whyItMatters: string;
  options: ReadinessOption[];
}

export const READINESS_QUESTIONS: ReadinessQuestion[] = [
  // 1. Process Maturity (Quick, Pro, Advanced)
  {
    id: 'q1',
    number: 1,
    dimension: 'Process Maturity',
    dimensionId: 'process_maturity',
    category: 'Process',
    tiers: ['quick', 'professional', 'advanced'],
    question: 'How clearly documented and understood is the target workflow end-to-end?',
    whyItMatters: 'AI and automated systems amplify underlying process efficiency or chaos. Without clear, validated process documentation, automation will encode existing bottlenecks.',
    options: [
      { label: 'Ad-hoc & Tribal', score: 0, description: 'No documentation; each person executes differently based on memory.' },
      { label: 'Informal Documentation', score: 1, description: 'Basic guides exist but are outdated or rarely referenced.' },
      { label: 'Standard Operating Procedures (SOPs) Active', score: 2, description: 'Formal written SOPs exist and team is trained on them.' },
      { label: 'Fully Documented & Measured', score: 3, description: 'Documented with step-level timing, clear handoffs, and performance KPIs.' },
      { label: 'Optimized & Continuously Governed', score: 4, description: 'Digitally mapped, continuously monitored with process mining, and regularly audited.' }
    ]
  },
  // 2. Process Standardization (Quick, Pro, Advanced)
  {
    id: 'q2',
    number: 2,
    dimension: 'Process Standardization',
    dimensionId: 'process_standardization',
    category: 'Process',
    tiers: ['quick', 'professional', 'advanced'],
    question: 'How standardized are the inputs and step sequences across different business units or operators?',
    whyItMatters: 'Unstandardized inputs require complex cognitive interpretation. High variation significantly increases AI failure rates and integration costs.',
    options: [
      { label: 'High Variance / Extreme Customization', score: 0, description: 'Every client or unit follows completely different templates and sequences.' },
      { label: 'Partial Standardization', score: 1, description: 'Common core steps, but major exceptions and custom workarounds exist.' },
      { label: 'Standardized Core with Managed Variants', score: 2, description: 'Defined standard paths with a small, cataloged list of exceptions.' },
      { label: 'Highly Standardized', score: 3, description: 'Uniform templates, fixed input channels, and strictly enforced checklists.' },
      { label: 'Strictly Enforced Digital Standards', score: 4, description: 'Rigid digital gatekeeping prevents malformed or non-standard inputs.' }
    ]
  },
  // 3. Data Availability (Quick, Pro, Advanced)
  {
    id: 'q3',
    number: 3,
    dimension: 'Data Availability',
    dimensionId: 'data_availability',
    category: 'Data',
    tiers: ['quick', 'professional', 'advanced'],
    question: 'Where is the data required to execute this process stored and accessed?',
    whyItMatters: 'AI models require digitized, retrievable context. Physical paperwork or isolated desktop spreadsheets create insurmountable data friction.',
    options: [
      { label: 'Physical Paper or Fragmented Desktop Files', score: 0, description: 'Paper records, local personal drives, or unsearchable archives.' },
      { label: 'Siloed Spreadsheets & Scanned PDFs', score: 1, description: 'Digital files exist but are stored across disparate email inboxes and local folders.' },
      { label: 'Central Document Repositories', score: 2, description: 'Shared cloud drives (SharePoint, Google Drive) or basic database systems.' },
      { label: 'Core Enterprise Systems (ERP/CRM)', score: 3, description: 'Centralized database systems (SAP, Salesforce, NetSuite) with structured fields.' },
      { label: 'Unified Data Fabric / Lakehouse', score: 4, description: 'Fully synchronized enterprise data platform with indexed search and metadata.' }
    ]
  },
  // 4. Data Quality (Quick, Pro, Advanced)
  {
    id: 'q4',
    number: 4,
    dimension: 'Data Quality',
    dimensionId: 'data_quality',
    category: 'Data',
    tiers: ['quick', 'professional', 'advanced'],
    question: 'What is the baseline accuracy, completeness, and cleanliness of the process data?',
    whyItMatters: 'Garbage in, garbage out. If baseline data contains missing keys, typos, or stale records, AI outputs will produce hallucinations or erroneous transactions.',
    options: [
      { label: 'Poor / Chronic Quality Issues', score: 0, description: 'Frequent missing fields, duplicate customer records, high typo frequency.' },
      { label: 'Inconsistent Quality', score: 1, description: 'Requires manual human scrub before the data is usable for reporting.' },
      { label: 'Acceptable Baseline Quality', score: 2, description: 'Standard field validation catches common errors; error rate under 5%.' },
      { label: 'High Quality with Automated Validation', score: 3, description: 'Schema validation, deduplication rules, and automated consistency checks.' },
      { label: 'Gold Standard / Verified Master Data', score: 4, description: 'Governed Master Data Management (MDM) with automated audits and SLA compliance.' }
    ]
  },
  // 5. Data Accessibility (Pro, Advanced)
  {
    id: 'q5',
    number: 5,
    dimension: 'Data Accessibility',
    dimensionId: 'data_accessibility',
    category: 'Data',
    tiers: ['professional', 'advanced'],
    question: 'How easily can enterprise software and automated agents programmatically query this data?',
    whyItMatters: 'Even clean data is useless to AI if locked behind proprietary legacy desktop clients without APIs or machine-readable exports.',
    options: [
      { label: 'Locked in Legacy Closed Systems', score: 0, description: 'No export capabilities, requires manual human copy-pasting.' },
      { label: 'Manual Periodic Exports Only', score: 1, description: 'Daily/weekly CSV dumps can be manually extracted by operators.' },
      { label: 'Scheduled Automated Batch Exports', score: 2, description: 'Nightly database syncs or flat file transfers over SFTP.' },
      { label: 'Direct Database / REST APIs Available', score: 3, description: 'Modern REST or GraphQL APIs with token-based access.' },
      { label: 'Real-Time Event Streams & Webhooks', score: 4, description: 'Sub-second webhook notifications, Kafka streams, and low-latency API access.' }
    ]
  },
  // 6. Technology Readiness (Quick, Pro, Advanced)
  {
    id: 'q6',
    number: 6,
    dimension: 'Technology Readiness',
    dimensionId: 'tech_readiness',
    category: 'Technology',
    tiers: ['quick', 'professional', 'advanced'],
    question: 'What is the modernization state of your current application and software infrastructure?',
    whyItMatters: 'Legacy on-premise client-server architectures lack the flexibility, cloud connectors, and secure compute required for modern AI integrations.',
    options: [
      { label: 'Legacy Mainframe / On-Premise Silos', score: 0, description: 'Outdated platforms approaching end-of-life; high technical debt.' },
      { label: 'Hybrid with Heavy Custom Scripting', score: 1, description: 'Mix of on-premise servers and fragile macros/custom scripts.' },
      { label: 'Modern Cloud Infrastructure Hosted', score: 2, description: 'Cloud-hosted VMs or private cloud instances with standard tooling.' },
      { label: 'Native Enterprise SaaS Stack', score: 3, description: 'Up-to-date SaaS platforms (e.g. M365, ServiceNow, Salesforce).' },
      { label: 'Composable Cloud-Native Ecosystem', score: 4, description: 'Microservices, containerized services, modern CI/CD, and serverless compute.' }
    ]
  },
  // 7. Integration Readiness (Pro, Advanced)
  {
    id: 'q7',
    number: 7,
    dimension: 'Integration Readiness',
    dimensionId: 'integration_readiness',
    category: 'Technology',
    tiers: ['professional', 'advanced'],
    question: 'How ready are your core business applications to connect with external AI models and agents?',
    whyItMatters: 'Without bi-directional integration capabilities, AI outputs cannot trigger actions in your systems, leaving employees as manual bridges.',
    options: [
      { label: 'No Integration Capability', score: 0, description: 'Closed architecture; zero external interface or plugin support.' },
      { label: 'Requires UI Scraping (Screen RPA)', score: 1, description: 'Can only be interfaced through brittle screen-recording bots.' },
      { label: 'Basic Webhooks / Prebuilt Connectors', score: 2, description: 'Supports standard Zapier, Power Automate, or prebuilt marketplace connectors.' },
      { label: 'Comprehensive Secure API Gateway', score: 3, description: 'Documented Swagger/OpenAPI specifications, rate limiting, and dev sandboxes.' },
      { label: 'Bi-directional Real-Time Event Architecture', score: 4, description: 'Full event-driven enterprise service bus supporting synchronous agent execution.' }
    ]
  },
  // 8. Repetitive Work Potential (Quick, Pro, Advanced)
  {
    id: 'q8',
    number: 8,
    dimension: 'Repetitive Work Potential',
    dimensionId: 'repetitive_work',
    category: 'Process',
    tiers: ['quick', 'professional', 'advanced'],
    question: 'What proportion of the process involves pattern-based, structured, or rule-guided tasks?',
    whyItMatters: 'High volume of repetitive cognitive or clerical steps offers the highest immediate return on AI investment and fastest payback.',
    options: [
      { label: 'Primarily Creative / Strategic Judgment', score: 0, description: 'Less than 10% repetitive; requires high empathy, novel design, or political negotiation.' },
      { label: 'Occasional Routine Tasks', score: 1, description: '10% to 30% rule-guided; majority is subjective problem-solving.' },
      { label: 'Moderate Routine Clerical Work', score: 2, description: '30% to 60% consists of predictable classification, verification, or drafting.' },
      { label: 'High Proportion of Structured Routine', score: 3, description: '60% to 80% predictable data extraction, document cross-checking, and routing.' },
      { label: 'Overwhelmingly Repetitive & Pattern-Based', score: 4, description: 'Over 80% volume follows clear pattern-matching and transactional steps.' }
    ]
  },
  // 9. Exception Handling (Quick, Pro, Advanced)
  {
    id: 'q9',
    number: 9,
    dimension: 'Exception Handling',
    dimensionId: 'exception_handling',
    category: 'Process',
    tiers: ['quick', 'professional', 'advanced'],
    question: 'How are process edge cases, anomalies, and exceptions currently detected and resolved?',
    whyItMatters: 'Real-world AI deployment requires graceful handling of uncertainty. Without defined escalation paths, edge cases cause silent systemic errors.',
    options: [
      { label: 'Ad-hoc Emergency Escalations', score: 0, description: 'No protocol; when something breaks, employees scramble or ignore it.' },
      { label: 'Informal Peer Resolution', score: 1, description: 'Operators ask senior colleagues casually via chat or email.' },
      { label: 'Documented Exception Protocols', score: 2, description: 'Known exceptions have written escalation steps and ticketing.' },
      { label: 'Categorized Exception Queues with SLA', score: 3, description: 'Dedicated triage queues with tracked resolution times and escalation matrices.' },
      { label: 'Automated Anomaly Detection & Fallbacks', score: 4, description: 'Automated confidence scoring flags anomalies directly to specialist queues.' }
    ]
  },
  // 10. Governance (Quick, Pro, Advanced)
  {
    id: 'q10',
    number: 10,
    dimension: 'Governance',
    dimensionId: 'governance',
    category: 'Governance & Risk',
    tiers: ['quick', 'professional', 'advanced'],
    question: 'Does the organization have formal governance, validation protocols, and audit trails for this process?',
    whyItMatters: 'Enterprise AI deployment requires explainability, compliance oversight, and immutable audit logs to satisfy regulatory requirements.',
    options: [
      { label: 'Zero Formal Governance', score: 0, description: 'No audit logs, no designated reviewer, changes made without approval.' },
      { label: 'Basic Logging Only', score: 1, description: 'System records user login times, but workflow decisions are unlogged.' },
      { label: 'Established Approval Workflows', score: 2, description: 'Multi-step sign-offs exist for high-value items, audited annually.' },
      { label: 'Comprehensive Policy & Audit Trail', score: 3, description: 'Detailed version history, role-based controls, and quarterly internal reviews.' },
      { label: 'Enterprise AI Governance Board Active', score: 4, description: 'Formal AI model policy, algorithmic bias monitoring, and SOC2/ISO audit compliance.' }
    ]
  },
  // 11. Security and Privacy (Pro, Advanced)
  {
    id: 'q11',
    number: 11,
    dimension: 'Security and Privacy',
    dimensionId: 'security_privacy',
    category: 'Governance & Risk',
    tiers: ['professional', 'advanced'],
    question: 'What level of sensitive, confidential, PII, or proprietary customer data is handled?',
    whyItMatters: 'Using public AI models on sensitive or regulated data creates catastrophic compliance exposure. Security posture dictates the AI deployment tier.',
    options: [
      { label: 'High PII / Regulatory Exposure with No Policy', score: 0, description: 'Critical data handled with zero data loss prevention (DLP) or AI usage guidelines.' },
      { label: 'Informal Warnings without Technical Guardrails', score: 1, description: 'Staff told not to paste data into AI, but no technical enforcement.' },
      { label: 'Standard Data Classification & DLP Active', score: 2, description: 'PII tagged, enterprise DLP software blocks unauthorized clipboard copies.' },
      { label: 'Private Tenant AI Isolation Configured', score: 3, description: 'Contractual zero-data-retention guarantees, data encryption at rest and in transit.' },
      { label: 'Zero-Trust Architecture & Automated Masking', score: 4, description: 'Automated cryptographic redaction, role-based tenant isolation, customer-managed keys.' }
    ]
  },
  // 12. Human Oversight (Quick, Pro, Advanced)
  {
    id: 'q12',
    number: 12,
    dimension: 'Human Oversight',
    dimensionId: 'human_oversight',
    category: 'Governance & Risk',
    tiers: ['quick', 'professional', 'advanced'],
    question: 'How is Human-in-the-Loop (HITL) review incorporated into final decision-making and execution?',
    whyItMatters: 'Responsible transformation requires calibrated human verification on high-stakes outputs to prevent unchecked compounding errors.',
    options: [
      { label: 'Unsupervised or Unreviewed Execution', score: 0, description: 'Either no review occurs or outputs are rubber-stamped without checking.' },
      { label: 'Reactive Post-Process Audits Only', score: 1, description: 'Errors discovered only after complaints or downstream system failure.' },
      { label: 'Sampling-Based QA Checks', score: 2, description: '10% to 20% random sample inspected by quality assurance leads.' },
      { label: 'Structured Confidence Threshold Review', score: 3, description: 'Decisions below 95% confidence automatically route to human expert review.' },
      { label: 'Seamless Human-Agent Collaboration Protocol', score: 4, description: 'Calibrated human copilot interface with intuitive override telemetry.' }
    ]
  },
  // 13. Business Ownership (Pro, Advanced)
  {
    id: 'q13',
    number: 13,
    dimension: 'Business Ownership',
    dimensionId: 'business_ownership',
    category: 'Organization & Value',
    tiers: ['professional', 'advanced'],
    question: 'Is there a clear business process owner accountable for the operational and financial outcomes?',
    whyItMatters: 'Technology initiatives without dedicated business unit sponsorship become orphaned pilots that fail to realize measurable ROI.',
    options: [
      { label: 'Diffused / No Clear Owner', score: 0, description: 'Shared across multiple departments with frequent blame-shifting.' },
      { label: 'IT-Driven without Business Champion', score: 1, description: 'Technology department pushing tool without operational pull.' },
      { label: 'Identified Operational Manager', score: 2, description: 'Mid-level operational lead responsible for daily outputs.' },
      { label: 'Executive Business Sponsor Committed', score: 3, description: 'Department VP or Director actively sponsoring KPIs and budget.' },
      { label: 'Cross-Functional Transformation Squad', score: 4, description: 'Dedicated product manager, business analyst, and executive steering committee.' }
    ]
  },
  // 14. Business Value (Quick, Pro, Advanced)
  {
    id: 'q14',
    number: 14,
    dimension: 'Business Value',
    dimensionId: 'business_value',
    category: 'Organization & Value',
    tiers: ['quick', 'professional', 'advanced'],
    question: 'How significant is the expected business impact (cost reduction, throughput, customer satisfaction, or risk)?',
    whyItMatters: 'Transformations with marginal business returns consume scarce executive bandwidth without delivering defensible organizational value.',
    options: [
      { label: 'Marginal Convenience Only', score: 0, description: 'Saves trivial personal time with zero measurable departmental impact.' },
      { label: 'Minor Local Efficiency', score: 1, description: 'Saves 2 to 5 hours per week for a few team members; negligible financial impact.' },
      { label: 'Meaningful Operational Improvement', score: 2, description: 'Reduces cycle time by 20% to 30% or eliminates thousands in annual error costs.' },
      { label: 'Substantial Strategic Impact', score: 3, description: 'Unlocks $100k+ in capacity value, cuts error rate in half, improves customer SLA.' },
      { label: 'Transformative Strategic Advantage', score: 4, description: 'Core strategic differentiator, enabling 3x volume scaling without headcount growth.' }
    ]
  },
  // 15. Change Management (Pro, Advanced)
  {
    id: 'q15',
    number: 15,
    dimension: 'Change Management',
    dimensionId: 'change_management',
    category: 'Organization & Value',
    tiers: ['professional', 'advanced'],
    question: 'How receptive and prepared is the frontline team to adopt AI-assisted workflows?',
    whyItMatters: 'User resistance and lack of digital enablement are the #1 reasons enterprise AI implementations fail to achieve expected adoption.',
    options: [
      { label: 'Active Cultural Resistance / Fear', score: 0, description: 'High employee anxiety regarding replacement; hostile to automation.' },
      { label: 'Passive Reluctance', score: 1, description: 'Team accustomed to manual ways; hesitant to adopt new digital tools.' },
      { label: 'Cautious Optimism', score: 2, description: 'Staff open to pilot if training is provided and workload is reduced.' },
      { label: 'Enthusiastic Champions Identified', score: 3, description: 'Internal power users eager for modern tools; dedicated training budget allocated.' },
      { label: 'High Continuous Learning Culture', score: 4, description: 'Mature agile enablement, ongoing prompt literacy coaching, and clear career pathing.' }
    ]
  },
  // Advanced Questions (16 to 25)
  {
    id: 'q16',
    number: 16,
    dimension: 'Data Volume & History',
    dimensionId: 'data_volume',
    category: 'Data',
    tiers: ['advanced'],
    question: 'Do you have sufficient historical transaction records to train, evaluate, or benchmark AI outputs?',
    whyItMatters: 'Evaluating AI accuracy requires golden evaluation datasets of past transactions with verified ground truth.',
    options: [
      { label: 'No Historical Data Retained', score: 0, description: 'Records purged or overwritten within 30 days.' },
      { label: 'Less than 6 Months History', score: 1, description: 'Limited sample size; seasonal variations uncaptured.' },
      { label: '1 to 2 Years Retained', score: 2, description: 'Solid historical log of transactions for benchmarking.' },
      { label: 'Multi-Year Structured Data Warehouse', score: 3, description: '3+ years of clean, indexed transaction logs with outcome tags.' },
      { label: 'Curated Golden Benchmark Dataset Active', score: 4, description: 'Dedicated ground-truth test sets verified by domain experts for continuous eval.' }
    ]
  },
  {
    id: 'q17',
    number: 17,
    dimension: 'Latency & Throughput Requirements',
    dimensionId: 'latency_requirements',
    category: 'Technology',
    tiers: ['advanced'],
    question: 'What are the speed and turnaround expectations for process transactions?',
    whyItMatters: 'Sub-second real-time SLAs require specialized AI edge inference or caching, whereas asynchronous batch processes are much simpler to deploy.',
    options: [
      { label: 'Unrealistic Instant SLAs with Complex Reasoning', score: 0, description: 'Requires sub-100ms multi-step reasoning without budget for dedicated infrastructure.' },
      { label: 'Tight Turnaround with Variable Volume', score: 1, description: 'Customers expect immediate reply within minutes, causing sudden queue spikes.' },
      { label: 'Standard Business Day SLA (2 to 8 Hours)', score: 2, description: 'Healthy buffer allowing queued processing and retry logic.' },
      { label: 'Batch Processing Window (Overnight)', score: 3, description: 'Transactions can be aggregated and processed in scheduled off-peak batches.' },
      { label: 'Engineered Tiered Latency Architecture', score: 4, description: 'Clear micro-SLA taxonomy: instant cached lookup + asynchronous deep reasoning.' }
    ]
  },
  {
    id: 'q18',
    number: 18,
    dimension: 'Model Explainability & Auditing',
    dimensionId: 'explainability',
    category: 'Governance & Risk',
    tiers: ['advanced'],
    question: 'Can the process decisions be justified to regulators, customers, or auditors if questioned?',
    whyItMatters: 'Black-box decision making in credit, underwriting, hiring, or compliance creates severe legal and fiduciary liabilities.',
    options: [
      { label: 'Strict Explainability Legally Required (No Black Box Allowed)', score: 0, description: 'Regulations demand exact formulaic justification for every decline/decision.' },
      { label: 'High Audit Scrutiny', score: 1, description: 'Decisions must include human notes explaining reasoning.' },
      { label: 'Moderate Scrutiny with Reference Evidence', score: 2, description: 'Acceptable if system cites the source policy document or contract clause.' },
      { label: 'Internal Operational Focus', score: 3, description: 'Internal workflows where audit focuses on outcome accuracy rather than model weights.' },
      { label: 'Automated Chain-of-Thought & Citation Telemetry', score: 4, description: 'System produces verifiable citations and evidentiary audit trails automatically.' }
    ]
  },
  {
    id: 'q19',
    number: 19,
    dimension: 'Vendor Lock-in & Portability',
    dimensionId: 'portability',
    category: 'Technology',
    tiers: ['advanced'],
    question: 'How dependent will the process be on a single proprietary AI model or cloud ecosystem?',
    whyItMatters: 'Over-reliance on a single proprietary API leaves the business vulnerable to pricing increases, deprecation, or regional outages.',
    options: [
      { label: 'Complete Hardcoded Single-Vendor Lock-in', score: 0, description: 'Built entirely on proprietary, closed APIs with zero migration flexibility.' },
      { label: 'High Ecosystem Dependency', score: 1, description: 'Heavily tied to one vendor’s proprietary tooling (e.g. exclusive Copilot Studio extensions).' },
      { label: 'Moderate Portability', score: 2, description: 'Prompt logic can be adapted to alternative models with 2 to 4 weeks of engineering.' },
      { label: 'Model-Agnostic Abstraction Layer', score: 3, description: 'Uses standard prompt gateways / LangChain / LiteLLM routing across multiple LLM providers.' },
      { label: 'Multi-Cloud & Open Weights Hybrid Strategy', score: 4, description: 'Can switch seamlessly between open-source models (Llama/Mistral) and frontier APIs.' }
    ]
  },
  {
    id: 'q20',
    number: 20,
    dimension: 'Data Drift & Feedback Loops',
    dimensionId: 'feedback_loops',
    category: 'Data',
    tiers: ['advanced'],
    question: 'How will user corrections and operational changes be fed back to improve future AI performance?',
    whyItMatters: 'Without active feedback loops, AI accuracy degrades as business rules, product catalogs, and vendor terms evolve over time.',
    options: [
      { label: 'No Feedback Capture', score: 0, description: 'User edits are saved locally without updating any central training or context store.' },
      { label: 'Periodic Bug Reports Only', score: 1, description: 'Users submit Jira tickets when outputs are severely broken.' },
      { label: 'Logged Corrections Database', score: 2, description: 'System stores before/after diffs between AI suggestions and final human approvals.' },
      { label: 'Active Reinforcement Telemetry', score: 3, description: 'Telemetry captures thumbs up/down, edit distance, and reason codes.' },
      { label: 'Continuous Few-Shot / Retrieval Updating', score: 4, description: 'Verified human corrections automatically enrich dynamic RAG context and test sets.' }
    ]
  },
  {
    id: 'q21',
    number: 21,
    dimension: 'Cost Predictability & Token Governance',
    dimensionId: 'cost_governance',
    category: 'Governance & Risk',
    tiers: ['advanced'],
    question: 'Are there financial guardrails, hard spending quotas, and token consumption limits in place?',
    whyItMatters: 'Uncapped generative AI loops or unexpected document volume spikes can lead to uncontrolled cloud billing shocks.',
    options: [
      { label: 'Zero Cost Visibility / Open Credit Cards', score: 0, description: 'Uncapped developer API keys attached to unrestricted corporate credit cards.' },
      { label: 'Post-Facto Invoice Review', score: 1, description: 'Finance checks billing statements 30 days after consumption occurred.' },
      { label: 'Basic Monthly Soft Caps', score: 2, description: 'Vendor notification alerts when 80% of budget is reached.' },
      { label: 'Hard Quotas & Per-User Rate Limiting', score: 3, description: 'Strict token buckets per user/department with automatic request throttling.' },
      { label: 'Real-Time FinOps Dashboard with Predictive Caching', score: 4, description: 'Semantic caching, prompt compression, and real-time FinOps anomaly detection.' }
    ]
  },
  {
    id: 'q22',
    number: 22,
    dimension: 'Security Red Teaming & Prompt Injection',
    dimensionId: 'prompt_security',
    category: 'Governance & Risk',
    tiers: ['advanced'],
    question: 'How protected is the process against prompt injection, jailbreaks, and indirect data poisoning?',
    whyItMatters: 'If your AI reads untrusted incoming emails, invoices, or resumes, malicious instructions inside the text could compromise systems.',
    options: [
      { label: 'Unaware of Injection Risks', score: 0, description: 'Untrusted user input passed directly into system prompts without boundaries.' },
      { label: 'Basic Keyword Blacklists', score: 1, description: 'Simple string checks that are easily bypassed by basic phrasing variations.' },
      { label: 'Input Sanitization & Delimiters Active', score: 2, description: 'Clear XML/JSON boundary framing separating instructions from raw payload.' },
      { label: 'Dual-LLM / Guardrail Firewall Filter', score: 3, description: 'Dedicated moderation LLM (e.g. NeMo Guardrails, Llama Guard) screens payloads.' },
      { label: 'Automated Adversarial Red-Teaming in CI/CD', score: 4, description: 'Automated injection fuzzing runs against every prompt update prior to release.' }
    ]
  },
  {
    id: 'q23',
    number: 23,
    dimension: 'Cross-Departmental Dependencies',
    dimensionId: 'cross_deps',
    category: 'Organization & Value',
    tiers: ['advanced'],
    question: 'How many external departments or third parties must approve or modify their workflows for this AI to succeed?',
    whyItMatters: 'Initiatives crossing too many departmental boundaries experience severe organizational gridlock and delayed sign-offs.',
    options: [
      { label: 'Complex Web of 5+ Unaligned Departments', score: 0, description: 'Requires consensus across Legal, IT, Operations, Finance, and external vendors.' },
      { label: '3 to 4 Departments with Competing Priorities', score: 1, description: 'Requires significant cross-functional alignment and resource negotiation.' },
      { label: '2 Departments with Aligned Objectives', score: 2, description: 'Core operational team partnered closely with a dedicated IT liaison.' },
      { label: 'Single Department with Self-Contained Scope', score: 3, description: 'Process is completely owned, budgeted, and executed within one business unit.' },
      { label: 'Chartered Cross-Functional Transformation Squad', score: 4, description: 'Pre-aligned steering team with pre-authorized decision mandates.' }
    ]
  },
  {
    id: 'q24',
    number: 24,
    dimension: 'Operational Resilience & Fallback Plan',
    dimensionId: 'resilience',
    category: 'Technology',
    tiers: ['advanced'],
    question: 'If the AI service experiences a major outage or severe latency spike, how does work continue?',
    whyItMatters: 'Business operations cannot grind to a halt because a cloud AI provider suffers an unscheduled API outage.',
    options: [
      { label: 'Catastrophic Halt / No Plan', score: 0, description: 'Operation stops completely; no manual backup or alternative workflow exists.' },
      { label: 'Painful Scramble with Severe Delays', score: 1, description: 'Employees struggle to manually reconstruct inputs with 80%+ backlog growth.' },
      { label: 'Documented Fallback Manual SOP', score: 2, description: 'Teams trained to temporarily revert to manual processing for up to 48 hours.' },
      { label: 'Automated Failover to Secondary Model', score: 3, description: 'Gateway automatically switches from primary LLM to secondary fallback provider.' },
      { label: 'Zero-Downtime Multi-Region Active-Active Fallback', score: 4, description: 'Fully redundant architecture with cached queues, circuit breakers, and degraded-mode SLA.' }
    ]
  },
  {
    id: 'q25',
    number: 25,
    dimension: 'Measurement & Post-Launch KPI Tracking',
    dimensionId: 'kpi_tracking',
    category: 'Organization & Value',
    tiers: ['advanced'],
    question: 'How will success, actual hours saved, and real dollar impact be measured post-implementation?',
    whyItMatters: 'Without baseline KPIs and automated tracking, business cases cannot validate whether promised benefits materialized.',
    options: [
      { label: 'Vague Sentiment & Anecdotal Feedback Only', score: 0, description: 'No baseline metrics; success judged by whether people complain or not.' },
      { label: 'Manual Periodic Surveys', score: 1, description: 'Quarterly user satisfaction surveys with subjective time estimates.' },
      { label: 'Operational KPI Dashboard Configured', score: 2, description: 'Cycle times, throughput, and error rates tracked in weekly operational reports.' },
      { label: 'Automated Value Telemetry (Hours & Cost)', score: 3, description: 'Software logs exact task durations before and after, computing realized dollar savings.' },
      { label: 'Executive Continuous Value Dashboard & Audit', score: 4, description: 'Real-time financial return metrics integrated into corporate management reporting.' }
    ]
  }
];
