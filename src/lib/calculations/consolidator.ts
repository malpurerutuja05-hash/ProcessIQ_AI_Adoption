import { 
  ManualCostOutputs, 
  CostLeakageOutputs, 
  ReadinessOutputs, 
  VendorComparisonResult, 
  ConsolidatedOutputs, 
  ScenarioDefinition,
  FinancialBenefitBreakdown 
} from '../types/assessment';

export interface ConsolidatorInputs {
  manualCost?: ManualCostOutputs;
  costLeakage?: CostLeakageOutputs;
  readiness?: ReadinessOutputs;
  vendorModel?: VendorComparisonResult;
}

export function calculateConsolidatedBusinessCase(inputs: ConsolidatorInputs): ConsolidatedOutputs {
  const hasManual = !!inputs.manualCost;
  const hasLeakage = !!inputs.costLeakage;
  const hasReadiness = !!inputs.readiness;
  const hasVendor = !!inputs.vendorModel;

  // Defaults if modules incomplete
  const annualLaborCost = inputs.manualCost?.totalAnnualLaborCost || 0;
  const annualCapacityValue = inputs.manualCost?.recoverableAnnualValue || 0;
  const annualLeakage = inputs.costLeakage?.totalAnnualLeakage || 0;
  const readinessScore = inputs.readiness?.overallScore ?? 50;
  const readinessClassification = inputs.readiness?.classification || 'Foundation Required';

  const aiSubCost = inputs.vendorModel?.year1SubscriptionCost || 0;
  const aiUsageCost = inputs.vendorModel?.year1UsageCost || 0;
  const aiAnnualOpex = inputs.vendorModel?.annualOngoingOperatingCost || (aiSubCost + aiUsageCost);
  const aiImplementationCapex = (inputs.vendorModel?.year1ImplementationCost || 0) + (inputs.vendorModel?.year1IntegrationCost || 0);

  // Strategic Recommendation Logic
  let recommendedApproach = '';
  let rationale = '';

  if (readinessScore < 40) {
    recommendedApproach = 'Foundational Process Standardization First';
    rationale = `With an AI readiness score of ${readinessScore}/100, the process carries severe technical and governance debt. Direct AI deployment risks compounding existing errors. Prioritize digitizing inputs, mapping SOPs, and establishing baseline data validation.`;
  } else if (readinessScore < 60) {
    recommendedApproach = 'Pragmatic Workflow Automation & Data Hygiene';
    rationale = `Scoring ${readinessScore}/100 indicates solid operational intent but incomplete data architecture or integration. Focus first on rules-based automation and structured data collection before enterprise generative AI licensing.`;
  } else if (readinessScore < 80) {
    recommendedApproach = 'Supervised AI Copilot Pilot with Human-in-the-Loop';
    rationale = `At ${readinessScore}/100, the process is a strong automation candidate. Deploy an initial bounded pilot (15% to 30% volume) with supervised AI copilots to capture immediate leakage recovery while team adoption matures.`;
  } else {
    recommendedApproach = 'Scaled Autonomous Agent & Enterprise AI Transformation';
    rationale = `An elite readiness score of ${readinessScore}/100 confirms robust data architecture, high process standardization, and active governance. Deploy full AI agentic orchestration across end-to-end workflows for maximum throughput and margin expansion.`;
  }

  // Financial Benefits Calculation (AI Scenario C)
  // Hard cash savings: Direct reduction of pure cash leakage (duplicate payments, penalties, missed discounts)
  let directCashLeakage = 0;
  if (inputs.costLeakage) {
    const cashCategories = ['duplicatePayments', 'penalties', 'missedDiscounts'];
    directCashLeakage = inputs.costLeakage.items
      .filter(item => cashCategories.includes(item.id))
      .reduce((sum, item) => sum + item.annualCost, 0);
  } else {
    directCashLeakage = annualLeakage * 0.4;
  }

  // Under AI transformation:
  // - 80% of direct cash leakage eliminated
  const hardCashSavingsAnnual = directCashLeakage * 0.8;
  // - 75% of non-cash leakage (errors, rework, delays) avoided
  const remainingLeakage = Math.max(0, annualLeakage - directCashLeakage);
  const costAvoidanceAnnual = remainingLeakage * 0.75;
  // - Full capacity recovery value
  const capacityRecoveryValueAnnual = annualCapacityValue;
  // - Total leakage elimination
  const leakageEliminationAnnual = hardCashSavingsAnnual + costAvoidanceAnnual;

  const totalEconomicBenefitAnnual = hardCashSavingsAnnual + costAvoidanceAnnual + capacityRecoveryValueAnnual;

  // Net benefit = Total Economic Benefit - Annual Ongoing AI Opex
  const netAnnualEconomicBenefit = totalEconomicBenefitAnnual - aiAnnualOpex;
  const netAnnualCashBenefit = (hardCashSavingsAnnual + costAvoidanceAnnual * 0.3) - aiAnnualOpex;

  // ROI: Net Economic Benefit / Implementation Capex
  const totalCapex = Math.max(1, aiImplementationCapex);
  const roiPct = totalCapex > 0 
    ? Math.round((netAnnualEconomicBenefit / totalCapex) * 100) 
    : 0;

  // Payback period (Months)
  // Payback based on realized benefits per month
  const monthlyEconomicBenefit = totalEconomicBenefitAnnual / 12;
  const monthlyOpex = aiAnnualOpex / 12;
  const netMonthlyBenefit = Math.max(1, monthlyEconomicBenefit - monthlyOpex);
  const paybackPeriodMonths = totalCapex > 0 
    ? Math.round((totalCapex / netMonthlyBenefit) * 10) / 10 
    : 0;

  const financialBenefits: FinancialBenefitBreakdown = {
    hardCashSavingsAnnual: Math.round(hardCashSavingsAnnual * 100) / 100,
    costAvoidanceAnnual: Math.round(costAvoidanceAnnual * 100) / 100,
    capacityRecoveryValueAnnual: Math.round(capacityRecoveryValueAnnual * 100) / 100,
    leakageEliminationAnnual: Math.round(leakageEliminationAnnual * 100) / 100,
    totalEconomicBenefitAnnual: Math.round(totalEconomicBenefitAnnual * 100) / 100
  };

  // -----------------------------------------------------------
  // SCENARIO MODELING (A, B, C)
  // -----------------------------------------------------------

  // Scenario A: Current State
  const scenarioCurrent: ScenarioDefinition = {
    id: 'current',
    name: 'Scenario A: Current Baseline Operations',
    tagline: 'Status Quo (Manual Processing & Recurring Operational Leakage)',
    annualLaborCost: Math.round(annualLaborCost),
    annualLeakageCost: Math.round(annualLeakage),
    totalOperatingCost: Math.round(annualLaborCost + annualLeakage),
    grossAnnualOperatingSavings: 0,
    actualCashSavings: 0,
    avoidedLeakage: 0,
    capacityValueReleased: 0,
    annualAISubscriptionCost: 0,
    annualAIOpexCost: 0,
    oneTimeImplementationCapex: 0,
    firstYearNetBenefit: 0,
    annualHardCashSavings: 0,
    annualCostAvoidance: 0,
    annualCapacityValue: 0,
    netAnnualEconomicBenefit: 0,
    netAnnualCashBenefit: 0,
    roiPct: 0,
    firstYearRoiPct: 0,
    paybackPeriodMonths: 0,
    roiFormatted: 'N/A – Baseline',
    firstYearRoiFormatted: 'N/A – Baseline',
    paybackFormatted: 'N/A – Baseline Scenario',
    recommendationNote: 'High manual dependency and ongoing cost leakage continue unchecked. Process remains vulnerable to volume surges and attrition.'
  };

  // Scenario B: Process Improvement & Automation First
  // Standard Lean / low-code RPA: 20% capacity recovered ($123,530), 50% leakage reduced ($170,100), $15,000 Capex, $5,000 Opex
  const bCapex = 15000;
  const bOpex = 5000;
  const bLaborSavings = Math.round(annualLaborCost * 0.2);
  const bLeakageSavings = Math.round(annualLeakage * 0.5);
  const bGrossSavings = bLaborSavings + bLeakageSavings; // Reconciled gross savings: $293,630
  const bNetBenefit = bGrossSavings - bOpex; // Reconciled net annual recurring benefit: $288,630
  const bFirstYearNetBenefit = bNetBenefit - bCapex; // First-year net benefit: $273,630
  const bNetMonthly = bNetBenefit / 12;
  const bRoi = bCapex > 0 ? Math.round((bNetBenefit / bCapex) * 100) : 0;
  const bFirstYearRoi = bCapex > 0 ? Math.round((bFirstYearNetBenefit / bCapex) * 100) : 0;
  const bPayback = bCapex > 0 ? (bNetMonthly > 0 ? Math.round((bCapex / bNetMonthly) * 10) / 10 : 0) : 0;

  const scenarioAutomationFirst: ScenarioDefinition = {
    id: 'automation_first',
    name: 'Scenario B: Process Optimization & Automation First',
    tagline: 'Lean Standardization + Traditional Rules-Based Workflow Automation',
    annualLaborCost: Math.round(annualLaborCost * 0.8),
    annualLeakageCost: Math.round(annualLeakage * 0.5),
    totalOperatingCost: Math.round(annualLaborCost * 0.8) + Math.round(annualLeakage * 0.5),
    grossAnnualOperatingSavings: bGrossSavings,
    actualCashSavings: Math.round(directCashLeakage * 0.5),
    avoidedLeakage: bLeakageSavings,
    capacityValueReleased: bLaborSavings,
    annualAISubscriptionCost: 0,
    annualAIOpexCost: bOpex,
    oneTimeImplementationCapex: bCapex,
    firstYearNetBenefit: bFirstYearNetBenefit,
    annualHardCashSavings: Math.round(directCashLeakage * 0.5),
    annualCostAvoidance: Math.round((annualLeakage - directCashLeakage) * 0.5),
    annualCapacityValue: bLaborSavings,
    netAnnualEconomicBenefit: Math.round(bNetBenefit),
    netAnnualCashBenefit: Math.round((directCashLeakage * 0.5) - bOpex),
    roiPct: bRoi,
    firstYearRoiPct: bFirstYearRoi,
    paybackPeriodMonths: bPayback,
    roiFormatted: `${bRoi}%`,
    firstYearRoiFormatted: `${bFirstYearRoi}%`,
    paybackFormatted: `${bPayback} mo`,
    recommendationNote: 'Ideal low-risk step if readiness score is below 60. Eliminates low-hanging process debt before incurring expensive AI seat licenses.'
  };

  // Scenario C: AI-Enabled Transformation
  const cGrossSavings = Math.round(totalEconomicBenefitAnnual);
  const cNetBenefit = cGrossSavings - aiAnnualOpex;
  const cFirstYearNetBenefit = cNetBenefit - totalCapex;
  const cNetMonthly = cNetBenefit / 12;
  const cFirstYearRoi = totalCapex > 0 ? Math.round((cFirstYearNetBenefit / totalCapex) * 100) : 0;
  const cPayback = totalCapex > 0 ? (cNetMonthly > 0 ? Math.round((totalCapex / cNetMonthly) * 10) / 10 : 0) : 0;

  const scenarioAITransformation: ScenarioDefinition = {
    id: 'ai_transformation',
    name: 'Scenario C: Enterprise AI-Enabled Transformation',
    tagline: 'Agentic Cognitive Orchestration & Supervised Copilots',
    annualLaborCost: Math.round(annualLaborCost - annualCapacityValue),
    annualLeakageCost: Math.round(annualLeakage - leakageEliminationAnnual),
    totalOperatingCost: Math.round(annualLaborCost - annualCapacityValue) + Math.round(annualLeakage - leakageEliminationAnnual),
    grossAnnualOperatingSavings: cGrossSavings,
    actualCashSavings: Math.round(hardCashSavingsAnnual),
    avoidedLeakage: Math.round(leakageEliminationAnnual),
    capacityValueReleased: Math.round(annualCapacityValue),
    annualAISubscriptionCost: Math.round(aiSubCost),
    annualAIOpexCost: Math.round(aiAnnualOpex),
    oneTimeImplementationCapex: Math.round(totalCapex),
    firstYearNetBenefit: Math.round(cFirstYearNetBenefit),
    annualHardCashSavings: Math.round(hardCashSavingsAnnual),
    annualCostAvoidance: Math.round(costAvoidanceAnnual),
    annualCapacityValue: Math.round(annualCapacityValue),
    netAnnualEconomicBenefit: Math.round(cNetBenefit),
    netAnnualCashBenefit: Math.round(netAnnualCashBenefit),
    roiPct: roiPct,
    firstYearRoiPct: cFirstYearRoi,
    paybackPeriodMonths: cPayback,
    roiFormatted: `${roiPct}%`,
    firstYearRoiFormatted: `${cFirstYearRoi}%`,
    paybackFormatted: `${cPayback} mo`,
    recommendationNote: 'Maximum strategic scalability. Unlocks exponential throughput gains and protects enterprise institutional knowledge.'
  };

  const methodologyDisclaimers = [
    'Capacity Recovery Distinction: Recovered employee capacity is calculated as productive hours reclaimed for high-value strategic execution. It does not constitute immediate payroll cash reduction unless staffing is restructured.',
    'Cost Leakage Anti-Double Counting: Overlap between transaction error correction and internal rework labor has been checked to prevent inflation of financial returns.',
    'Indicative ROI: Financial returns and payback timelines are mathematical projections based on client-provided estimates and current enterprise pricing schedules.'
  ];

  return {
    completedModules: {
      manualCost: hasManual,
      costLeakage: hasLeakage,
      aiReadiness: hasReadiness,
      aiComparator: hasVendor
    },
    totalAnnualManualLaborCost: Math.round(annualLaborCost * 100) / 100,
    totalAnnualProcessLeakage: Math.round(annualLeakage * 100) / 100,
    totalAnnualRecoverableCapacityValue: Math.round(annualCapacityValue * 100) / 100,
    aiReadinessScore: readinessScore,
    aiReadinessClassification: readinessClassification,
    recommendedTransformationApproach: recommendedApproach,
    recommendedApproachRationale: rationale,
    estimatedAISubscriptionCostAnnual: Math.round(aiSubCost * 100) / 100,
    estimatedImplementationCapex: Math.round(totalCapex * 100) / 100,
    estimatedAnnualOperatingCost: Math.round(aiAnnualOpex * 100) / 100,
    financialBenefits,
    netAnnualEconomicBenefit: Math.round(netAnnualEconomicBenefit * 100) / 100,
    roiPct,
    paybackPeriodMonths,
    scenarios: {
      current: scenarioCurrent,
      automationFirst: scenarioAutomationFirst,
      aiTransformation: scenarioAITransformation
    },
    methodologyDisclaimers
  };
}
