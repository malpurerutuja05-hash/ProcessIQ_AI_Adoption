export interface VendorPricingModel {
  id: string;
  name: string;
  vendor: string;
  tier: string;
  source: string;
  sourceUrl: string;
  verificationDate: string;
  currency: string;
  pricingType: 'verified_public' | 'user_entered' | 'estimated' | 'quote_based';
  baseMonthlyCost: number; // Flat tenant cost per month
  costPerUserMonth: number; // Per-seat cost
  includedMessagesPerMonth: number;
  costPerExtraMessage: number;
  inputTokenCostPerMillion: number;
  outputTokenCostPerMillion: number;
  minCommitmentMonths: number;
  minSeats: number;
  pricingAssumptions: string[];
  notes: string;
}

export const OFFICIAL_VENDOR_PRICING: VendorPricingModel[] = [
  {
    id: 'm365-copilot',
    name: 'Microsoft 365 Copilot',
    vendor: 'Microsoft Corporation',
    tier: 'Enterprise Add-On',
    source: 'Microsoft 365 Official Enterprise Pricing Portal',
    sourceUrl: 'https://www.microsoft.com/en-us/microsoft-365/enterprise/copilot-for-microsoft-365',
    verificationDate: '2026-11-01',
    currency: 'USD',
    pricingType: 'verified_public',
    baseMonthlyCost: 0,
    costPerUserMonth: 30.0,
    includedMessagesPerMonth: -1, // Unlimited fair-use within standard M365 apps
    costPerExtraMessage: 0,
    inputTokenCostPerMillion: 0,
    outputTokenCostPerMillion: 0,
    minCommitmentMonths: 12,
    minSeats: 1,
    pricingAssumptions: [
      'Requires underlying qualifying license (Microsoft 365 E3, E5, Business Standard, or Business Premium).',
      'Annual commitment required ($360 billed annually per user).',
      'Covers productivity copilots in Word, Excel, PowerPoint, Outlook, Teams, and Business Chat.',
      'Pricing excludes enterprise implementation, tenant data governance, and change management consulting.'
    ],
    notes: 'Official publicly listed commercial rate.'
  },
  {
    id: 'copilot-studio',
    name: 'Microsoft Copilot Studio',
    vendor: 'Microsoft Corporation',
    tier: 'Tenant Capacity Tier',
    source: 'Microsoft Learn Licensing & Billing Guide',
    sourceUrl: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing',
    verificationDate: '2026-11-01',
    currency: 'USD',
    pricingType: 'verified_public',
    baseMonthlyCost: 200.0, // $200 per tenant/month
    costPerUserMonth: 0,    // Pooled tenant licensing
    includedMessagesPerMonth: 25000,
    costPerExtraMessage: 0.01, // $100 per 10k messages pack = $0.01/message
    inputTokenCostPerMillion: 0,
    outputTokenCostPerMillion: 0,
    minCommitmentMonths: 1,
    minSeats: 1,
    pricingAssumptions: [
      'Base plan includes 25,000 billed messages per tenant per month.',
      'Additional messages billed in capacity packs of 10,000 for $100/month ($0.01/message).',
      'Generative answers and action execution consume standard billed messages.',
      'Dataverse storage or external Azure connector fees not included if exceeding standard limits.'
    ],
    notes: 'Official publicly listed pay-per-capacity rate.'
  },
  {
    id: 'claude-enterprise',
    name: 'Claude Enterprise',
    vendor: 'Anthropic PBC',
    tier: 'Enterprise Custom Agreement',
    source: 'Anthropic Enterprise Pricing & Sales Overview',
    sourceUrl: 'https://www.anthropic.com/pricing#enterprise',
    verificationDate: '2026-11-01',
    currency: 'USD',
    pricingType: 'quote_based',
    baseMonthlyCost: 0,
    costPerUserMonth: 45.0, // Representative benchmark pricing for enterprise tier
    includedMessagesPerMonth: -1,
    costPerExtraMessage: 0,
    inputTokenCostPerMillion: 0,
    outputTokenCostPerMillion: 0,
    minCommitmentMonths: 12,
    minSeats: 25,
    pricingAssumptions: [
      'Quotation-based contract with annual enterprise agreement.',
      'Estimated baseline of $45/user/month (typical industry range: $35-$60 depending on volume and SLA).',
      'Includes 500,000-token expanded context window, Project workspaces, SSO/SCIM, and GitHub integration.',
      'Final pricing requires direct Anthropic enterprise sales quote.'
    ],
    notes: 'Quote-based pricing benchmark. Actual pricing requires vendor consultation.'
  },
  {
    id: 'custom-ai-agent',
    name: 'Custom AI Agent / LLM API Stack',
    vendor: 'Configurable Enterprise Provider (API / Open Architecture)',
    tier: 'Direct API & Orchestration',
    source: 'Representative Industry LLM API Benchmark Rates (e.g. Claude 3.5 Sonnet / GPT-4o API)',
    sourceUrl: 'https://docs.anthropic.com/en/docs/about-claude/models',
    verificationDate: '2026-11-01',
    currency: 'USD',
    pricingType: 'estimated',
    baseMonthlyCost: 150.0, // Infrastructure / vector DB / hosting baseline
    costPerUserMonth: 5.0,  // Platform management / seat overhead
    includedMessagesPerMonth: 0,
    costPerExtraMessage: 0,
    inputTokenCostPerMillion: 3.0,   // $3.00 per 1M input tokens
    outputTokenCostPerMillion: 15.0, // $15.00 per 1M output tokens
    minCommitmentMonths: 1,
    minSeats: 1,
    pricingAssumptions: [
      'Usage-based consumption pricing calculated from estimated token volume.',
      'Estimated benchmark: $3.00/M input tokens, $15.00/M output tokens.',
      'Includes modest hosting & vector store baseline ($150/month).',
      'Requires internal engineering or systems integrator to maintain.'
    ],
    notes: 'Customizable API-driven model.'
  }
];
