export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'INR' | 'JPY';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  formatLocale: string;
}

export const CURRENCY_MAP: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', formatLocale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', formatLocale: 'de-DE' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', formatLocale: 'en-GB' },
  CAD: { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', formatLocale: 'en-CA' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', formatLocale: 'en-AU' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', formatLocale: 'en-IN' },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', formatLocale: 'ja-JP' },
};

// -------------------------------------------------------------
// MODULE 1: HIDDEN COST OF MANUAL WORK
// -------------------------------------------------------------
export interface ManualCostInputs {
  processName: string;
  processOwner?: string;
  department?: string;
  currency: CurrencyCode;
  employeeCount: number;
  hoursPerDayPerEmployee: number;
  workingDaysPerMonth: number;
  hourlyEmployeeCost: number;
  // Optional overtime
  includeOvertime: boolean;
  overtimeHoursPerMonth: number;
  overtimeHourlyRate: number;
  // Optional annual increase assumption
  annualSalaryIncreasePct: number;
  // Recoverable capacity percentage assumption
  recoverableCapacityPct: number; // e.g. 35%
}

export interface ManualCostOutputs {
  monthlyHours: number;
  annualHours: number;
  baseMonthlyLaborCost: number;
  monthlyOvertimeCost: number;
  totalMonthlyLaborCost: number;
  baseAnnualLaborCost: number;
  totalAnnualLaborCost: number;
  projectedYear2LaborCost: number;
  projectedYear3LaborCost: number;
  recoverableMonthlyHours: number;
  recoverableAnnualHours: number;
  recoverableMonthlyValue: number;
  recoverableAnnualValue: number;
  // Distinction metric
  cashSavingsDisclaimer: string;
}

// -------------------------------------------------------------
// MODULE 2: PROCESS COST LEAKAGE
// -------------------------------------------------------------
export interface CostLeakageCategoryInput {
  id: string;
  name: string;
  enabled: boolean;
  isUserEstimate: boolean;
  description: string;
  monthlyTransactionVolume: number;
  errorPercentage: number;
  costPerError: number;
  reworkHoursMonthly: number;
  reworkHourlyRate: number;
  delayedTransactionsMonthly: number;
  costPerDelay: number;
  missedDiscountsMonthly: number;
  costPerMissedDiscount: number;
  duplicatePaymentsMonthly: number;
  costPerDuplicate: number;
  duplicateRecoveryFailurePct: number;
  monthlyPenalties: number;
  otherMonthlyLosses: number;
}

export interface CostLeakageInputs {
  currency: CurrencyCode;
  categories: {
    errors: {
      enabled: boolean;
      monthlyVolume: number;
      errorRatePct: number;
      avgCostPerError: number;
      isEstimate: boolean;
    };
    rework: {
      enabled: boolean;
      monthlyHours: number;
      hourlyRate: number;
      isEstimate: boolean;
    };
    delays: {
      enabled: boolean;
      monthlyDelayedVolume: number;
      avgCostPerDelay: number;
      isEstimate: boolean;
    };
    missedDiscounts: {
      enabled: boolean;
      monthlyMissedCount: number;
      avgDiscountValue: number;
      isEstimate: boolean;
    };
    duplicatePayments: {
      enabled: boolean;
      monthlyDuplicateCount: number;
      avgDuplicateAmount: number;
      unrecoveredPct: number;
      isEstimate: boolean;
    };
    penalties: {
      enabled: boolean;
      monthlyAmount: number;
      isEstimate: boolean;
    };
    otherLosses: {
      enabled: boolean;
      monthlyAmount: number;
      description: string;
      isEstimate: boolean;
    };
  };
}

export interface CostLeakageItemOutput {
  id: string;
  name: string;
  monthlyCost: number;
  annualCost: number;
  pctOfTotal: number;
  isEstimate: boolean;
  potentialOverlapWarning?: string;
  recommendedIntervention: string;
}

export interface CostLeakageOutputs {
  totalMonthlyLeakage: number;
  totalAnnualLeakage: number;
  items: CostLeakageItemOutput[];
  topCostDrivers: CostLeakageItemOutput[];
  overlapWarnings: string[];
  recommendedImprovements: string[];
}

// -------------------------------------------------------------
// MODULE 3: IS MY PROCESS AI-READY?
// -------------------------------------------------------------
export type ReadinessTier = 'quick' | 'professional' | 'advanced';

export type ReadinessClassification = 
  | 'Not Ready' 
  | 'Foundation Required' 
  | 'Automation/AI Candidate' 
  | 'Strong Readiness';

export interface ReadinessCategoryScore {
  category: string;
  scorePct: number;
  maxScore: number;
  earnedScore: number;
  status: 'Critical Gap' | 'Needs Attention' | 'Acceptable' | 'Strength';
}

export interface RoadmapTask {
  dayRange: string;
  phase: string;
  title: string;
  action: string;
  deliverable: string;
  owner: string;
}

export interface ReadinessOutputs {
  tier: ReadinessTier;
  questionCount: number;
  answeredCount: number;
  overallScore: number; // 0 to 100
  classification: ReadinessClassification;
  classificationDescription: string;
  categoryScores: ReadinessCategoryScore[];
  strengths: string[];
  weaknesses: string[];
  improvementOpportunities: string[];
  keyRisks: string[];
  thirtyDayRoadmap: RoadmapTask[];
  disclaimer: string;
}

// -------------------------------------------------------------
// MODULE 4: AI INVESTMENT COMPARATOR
// -------------------------------------------------------------
export interface CustomPricingModel {
  isCustom: boolean;
  unitPrice: number;
  billingFrequency: 'monthly' | 'annually';
  userCount: number;
  additionalUsageCostMonthly: number;
  notes?: string;
  savedAt?: string;
}

export interface CustomPricingInput {
  userCount: number;
  monthlyLicensePerUser: number;
  expectedMonthlyUsageInteractions: number;
  costPerInteractionOrMessage: number;
  monthlyInputTokensMillions: number;
  inputTokenPricePerMillion: number;
  monthlyOutputTokensMillions: number;
  outputTokenPricePerMillion: number;
  agentCount: number;
  monthlyPlatformBaseFee: number;
  implementationCostOneTime: number;
  integrationCostOneTime: number;
  annualMaintenanceSupportCost: number;
  contractDurationYears: number;
  currency: CurrencyCode;
  customPricing?: Record<string, CustomPricingModel>;
}

export interface VendorComparisonResult {
  vendorId: string;
  vendorName: string;
  pricingType: 'verified_public' | 'user_entered' | 'estimated' | 'quote_based';
  sourceUrl: string;
  verificationDate: string;
  year1SubscriptionCost: number;
  year1UsageCost: number;
  year1ImplementationCost: number;
  year1IntegrationCost: number;
  year1SupportMaintenanceCost: number;
  totalYear1Investment: number;
  annualOngoingOperatingCost: number;
  contractTotalCost: number;
  notes: string;
  assumptions: string[];
}

export interface AIComparatorOutputs {
  selectedCurrency: CurrencyCode;
  selectedVendorId: string;
  comparisons: VendorComparisonResult[];
  activeModelSummary: VendorComparisonResult;
  pricingTransparencyNotice: string;
}

// -------------------------------------------------------------
// CONSOLIDATED BUSINESS CASE DASHBOARD
// -------------------------------------------------------------
export interface FinancialBenefitBreakdown {
  hardCashSavingsAnnual: number;       // Direct non-labor reduction (e.g. avoided duplicate payments, zeroed penalties)
  costAvoidanceAnnual: number;          // Avoided rework vendor fees or future headcount hiring
  capacityRecoveryValueAnnual: number;  // Reclaimable staff hours valued at hourly wage (Productivity)
  leakageEliminationAnnual: number;     // Operational leakages eliminated by AI validation
  totalEconomicBenefitAnnual: number;
}

export interface ScenarioDefinition {
  id: 'current' | 'automation_first' | 'ai_transformation';
  name: string;
  tagline: string;
  annualLaborCost: number;
  annualLeakageCost: number;
  totalOperatingCost: number;               // Remaining Labor + Remaining Leakage
  grossAnnualOperatingSavings: number;      // 1. Gross annual operating savings (Labor + Leakage savings)
  actualCashSavings: number;                // Direct eliminated cash outlays (penalties, duplicate payments, etc.)
  avoidedLeakage: number;                   // Process defect and delay cost reduction
  capacityValueReleased: number;            // Reclaimed employee bandwidth valued at wage rate
  annualAIOpexCost: number;                 // 2. Annual technology operating costs
  netAnnualEconomicBenefit: number;         // 3. Net annual recurring benefit (Gross Savings - Tech Opex)
  oneTimeImplementationCapex: number;       // 4. One-time implementation investment (Capex)
  firstYearNetBenefit: number;              // 5. First-year net benefit after Capex (Net Benefit - Capex)
  roiPct: number;                           // 6. Recurring Annual Return on Investment (%)
  firstYearRoiPct: number;                  // First-Year Net Return on Investment (%)
  paybackPeriodMonths: number;              // 7. Payback period (Months, 0 for baseline)
  roiFormatted: string;                     // e.g. '1,924%' or 'N/A – Baseline'
  firstYearRoiFormatted: string;            // e.g. '1,824%' or 'N/A – Baseline'
  paybackFormatted: string;                 // e.g. '0.6 mo' or 'N/A – Baseline Scenario'
  annualAISubscriptionCost: number;
  annualHardCashSavings: number;
  annualCostAvoidance: number;
  annualCapacityValue: number;
  netAnnualCashBenefit: number;
  recommendationNote: string;
}

export interface ConsolidatedOutputs {
  completedModules: {
    manualCost: boolean;
    costLeakage: boolean;
    aiReadiness: boolean;
    aiComparator: boolean;
  };
  totalAnnualManualLaborCost: number;
  totalAnnualProcessLeakage: number;
  totalAnnualRecoverableCapacityValue: number;
  aiReadinessScore: number;
  aiReadinessClassification: ReadinessClassification;
  recommendedTransformationApproach: string;
  recommendedApproachRationale: string;
  
  // Selected AI Investment
  estimatedAISubscriptionCostAnnual: number;
  estimatedImplementationCapex: number;
  estimatedAnnualOperatingCost: number;
  
  // Benefits
  financialBenefits: FinancialBenefitBreakdown;
  netAnnualEconomicBenefit: number;
  roiPct: number;
  paybackPeriodMonths: number;
  
  // Scenarios
  scenarios: {
    current: ScenarioDefinition;
    automationFirst: ScenarioDefinition;
    aiTransformation: ScenarioDefinition;
  };
  
  methodologyDisclaimers: string[];
}

export interface ProcessIQState {
  version: string;
  updatedAt: string;
  currency: CurrencyCode;
  manualCost: ManualCostInputs;
  costLeakage: CostLeakageInputs;
  readinessAnswers: Record<string, number>; // questionId -> option index
  readinessTier: ReadinessTier;
  aiComparator: CustomPricingInput & {
    selectedVendorId: string;
  };
}
