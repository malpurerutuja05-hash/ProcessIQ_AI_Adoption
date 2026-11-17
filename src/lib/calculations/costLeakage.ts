import { CostLeakageInputs, CostLeakageOutputs, CostLeakageItemOutput } from '../types/assessment';

export function calculateCostLeakage(inputs: CostLeakageInputs): CostLeakageOutputs {
  const items: CostLeakageItemOutput[] = [];
  const overlapWarnings: string[] = [];
  const recommendations: string[] = [];

  const cats = inputs.categories;

  // 1. Transaction Errors
  if (cats.errors.enabled) {
    const vol = Math.max(0, cats.errors.monthlyVolume || 0);
    const rate = Math.min(100, Math.max(0, cats.errors.errorRatePct || 0)) / 100;
    const costPerErr = Math.max(0, cats.errors.avgCostPerError || 0);
    const monthlyCost = vol * rate * costPerErr;

    items.push({
      id: 'errors',
      name: 'Transaction & Data Entry Errors',
      monthlyCost,
      annualCost: monthlyCost * 12,
      pctOfTotal: 0,
      isEstimate: !!cats.errors.isEstimate,
      recommendedIntervention: 'Implement automated schema validation and LLM data extraction guardrails before system commit.'
    });
  }

  // 2. Rework Hours
  if (cats.rework.enabled) {
    const hours = Math.max(0, cats.rework.monthlyHours || 0);
    const rate = Math.max(0, cats.rework.hourlyRate || 0);
    const monthlyCost = hours * rate;

    items.push({
      id: 'rework',
      name: 'Internal Labor Rework & Correction',
      monthlyCost,
      annualCost: monthlyCost * 12,
      pctOfTotal: 0,
      isEstimate: !!cats.rework.isEstimate,
      potentialOverlapWarning: cats.errors.enabled 
        ? 'Warning: Rework labor may overlap with "Cost per Error" if your error cost estimate already includes operator correction time.' 
        : undefined,
      recommendedIntervention: 'Deploy automated exception triaging and pre-fill workflows to eliminate manual re-keying.'
    });

    if (cats.errors.enabled) {
      overlapWarnings.push('Potential overlap detected between "Transaction Errors" and "Internal Labor Rework". Ensure error costs reflect external losses rather than duplicate labor hours.');
    }
  }

  // 3. Delayed Transactions
  if (cats.delays.enabled) {
    const vol = Math.max(0, cats.delays.monthlyDelayedVolume || 0);
    const costPerDelay = Math.max(0, cats.delays.avgCostPerDelay || 0);
    const monthlyCost = vol * costPerDelay;

    items.push({
      id: 'delays',
      name: 'Transaction Delays & Escalations',
      monthlyCost,
      annualCost: monthlyCost * 12,
      pctOfTotal: 0,
      isEstimate: !!cats.delays.isEstimate,
      recommendedIntervention: 'Adopt asynchronous queue orchestration with real-time SLA breach alerting and autonomous routing.'
    });
  }

  // 4. Missed Discounts
  if (cats.missedDiscounts.enabled) {
    const count = Math.max(0, cats.missedDiscounts.monthlyMissedCount || 0);
    const val = Math.max(0, cats.missedDiscounts.avgDiscountValue || 0);
    const monthlyCost = count * val;

    items.push({
      id: 'missedDiscounts',
      name: 'Missed Early Payment / Volume Discounts',
      monthlyCost,
      annualCost: monthlyCost * 12,
      pctOfTotal: 0,
      isEstimate: !!cats.missedDiscounts.isEstimate,
      recommendedIntervention: 'Automate straight-through invoice matching and 2-way / 3-way verification to capture early settlement discounts.'
    });
  }

  // 5. Duplicate Payments / Transactions
  if (cats.duplicatePayments.enabled) {
    const count = Math.max(0, cats.duplicatePayments.monthlyDuplicateCount || 0);
    const amount = Math.max(0, cats.duplicatePayments.avgDuplicateAmount || 0);
    const unrecoveredRate = Math.min(100, Math.max(0, cats.duplicatePayments.unrecoveredPct || 0)) / 100;
    const monthlyCost = count * amount * unrecoveredRate;

    items.push({
      id: 'duplicatePayments',
      name: 'Duplicate Transactions (Unrecovered)',
      monthlyCost,
      annualCost: monthlyCost * 12,
      pctOfTotal: 0,
      isEstimate: !!cats.duplicatePayments.isEstimate,
      recommendedIntervention: 'Implement cryptographic invoice fingerprinting and automated duplicate detection prior to ledger posting.'
    });
  }

  // 6. Regulatory & SLA Penalties
  if (cats.penalties.enabled) {
    const monthlyCost = Math.max(0, cats.penalties.monthlyAmount || 0);

    items.push({
      id: 'penalties',
      name: 'Regulatory Non-Compliance & SLA Penalties',
      monthlyCost,
      annualCost: monthlyCost * 12,
      pctOfTotal: 0,
      isEstimate: !!cats.penalties.isEstimate,
      potentialOverlapWarning: cats.delays.enabled
        ? 'Warning: SLA penalties may be directly triggered by "Delayed Transactions". Avoid double-counting liquidated damages.'
        : undefined,
      recommendedIntervention: 'Enforce real-time compliance gate checks with automated audit logs to eliminate missed regulatory deadlines.'
    });

    if (cats.delays.enabled) {
      overlapWarnings.push('Potential overlap: Liquidated SLA penalties and transaction delays are closely correlated. Verify these reflect separate commercial penalties.');
    }
  }

  // 7. Other Process Losses
  if (cats.otherLosses.enabled) {
    const monthlyCost = Math.max(0, cats.otherLosses.monthlyAmount || 0);

    items.push({
      id: 'otherLosses',
      name: cats.otherLosses.description?.trim() || 'Other Process-Related Losses',
      monthlyCost,
      annualCost: monthlyCost * 12,
      pctOfTotal: 0,
      isEstimate: !!cats.otherLosses.isEstimate,
      recommendedIntervention: 'Conduct root-cause analysis on ad-hoc workarounds and standardize the underlying operational pathway.'
    });
  }

  // Total calculation
  const totalMonthlyLeakage = items.reduce((sum, item) => sum + item.monthlyCost, 0);
  const totalAnnualLeakage = totalMonthlyLeakage * 12;

  // Compute percentages and format
  items.forEach(item => {
    item.pctOfTotal = totalMonthlyLeakage > 0 
      ? Math.round((item.monthlyCost / totalMonthlyLeakage) * 1000) / 10 
      : 0;
    item.monthlyCost = Math.round(item.monthlyCost * 100) / 100;
    item.annualCost = Math.round(item.annualCost * 100) / 100;
  });

  // Sort descending by annual cost to identify largest cost drivers
  const sortedByCost = [...items].sort((a, b) => b.annualCost - a.annualCost);
  const topCostDrivers = sortedByCost.slice(0, 3);

  // Recommendations based on top drivers
  topCostDrivers.forEach((driver, idx) => {
    recommendations.push(`Priority ${idx + 1} (${driver.name}): ${driver.recommendedIntervention}`);
  });

  if (items.length === 0) {
    recommendations.push('No leakage categories enabled. Review historical audit logs or vendor dispute registers to quantify operational leakage.');
  }

  return {
    totalMonthlyLeakage: Math.round(totalMonthlyLeakage * 100) / 100,
    totalAnnualLeakage: Math.round(totalAnnualLeakage * 100) / 100,
    items,
    topCostDrivers,
    overlapWarnings,
    recommendedImprovements: recommendations
  };
}
