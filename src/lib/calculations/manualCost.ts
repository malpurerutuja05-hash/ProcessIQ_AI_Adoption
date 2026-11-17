import { ManualCostInputs, ManualCostOutputs } from '../types/assessment';

export function calculateManualCost(inputs: ManualCostInputs): ManualCostOutputs {
  // Sanitize numerical inputs to safe non-negative values
  const employeeCount = Math.max(0, inputs.employeeCount || 0);
  const hoursPerDay = Math.min(24, Math.max(0, inputs.hoursPerDayPerEmployee || 0));
  const workingDays = Math.min(31, Math.max(0, inputs.workingDaysPerMonth || 0));
  const hourlyRate = Math.max(0, inputs.hourlyEmployeeCost || 0);
  const overtimeHours = inputs.includeOvertime ? Math.max(0, inputs.overtimeHoursPerMonth || 0) : 0;
  const overtimeRate = inputs.includeOvertime ? Math.max(0, inputs.overtimeHourlyRate || 0) : 0;
  const salaryIncrease = Math.max(0, inputs.annualSalaryIncreasePct || 0) / 100;
  const recoveryPct = Math.min(100, Math.max(0, inputs.recoverableCapacityPct || 0)) / 100;

  // Monthly hours & base labor
  const monthlyHours = employeeCount * hoursPerDay * workingDays;
  const annualHours = monthlyHours * 12;
  const baseMonthlyLaborCost = monthlyHours * hourlyRate;
  const monthlyOvertimeCost = overtimeHours * overtimeRate;
  const totalMonthlyLaborCost = baseMonthlyLaborCost + monthlyOvertimeCost;

  // Annual labor
  const baseAnnualLaborCost = baseMonthlyLaborCost * 12;
  const totalAnnualLaborCost = totalMonthlyLaborCost * 12;

  // Multi-year projections with salary escalation
  const projectedYear2LaborCost = totalAnnualLaborCost * (1 + salaryIncrease);
  const projectedYear3LaborCost = projectedYear2LaborCost * (1 + salaryIncrease);

  // Recoverable capacity
  const recoverableMonthlyHours = monthlyHours * recoveryPct;
  const recoverableAnnualHours = annualHours * recoveryPct;
  const recoverableMonthlyValue = totalMonthlyLaborCost * recoveryPct;
  const recoverableAnnualValue = totalAnnualLaborCost * recoveryPct;

  const cashSavingsDisclaimer = 
    'Important Distinction: Recovered capacity represents time reclaimed for higher-value activities. ' +
    'It does not automatically translate into hard cash savings unless headcount is reduced or overtime is eliminated.';

  return {
    monthlyHours: Math.round(monthlyHours * 100) / 100,
    annualHours: Math.round(annualHours * 100) / 100,
    baseMonthlyLaborCost: Math.round(baseMonthlyLaborCost * 100) / 100,
    monthlyOvertimeCost: Math.round(monthlyOvertimeCost * 100) / 100,
    totalMonthlyLaborCost: Math.round(totalMonthlyLaborCost * 100) / 100,
    baseAnnualLaborCost: Math.round(baseAnnualLaborCost * 100) / 100,
    totalAnnualLaborCost: Math.round(totalAnnualLaborCost * 100) / 100,
    projectedYear2LaborCost: Math.round(projectedYear2LaborCost * 100) / 100,
    projectedYear3LaborCost: Math.round(projectedYear3LaborCost * 100) / 100,
    recoverableMonthlyHours: Math.round(recoverableMonthlyHours * 100) / 100,
    recoverableAnnualHours: Math.round(recoverableAnnualHours * 100) / 100,
    recoverableMonthlyValue: Math.round(recoverableMonthlyValue * 100) / 100,
    recoverableAnnualValue: Math.round(recoverableAnnualValue * 100) / 100,
    cashSavingsDisclaimer
  };
}
