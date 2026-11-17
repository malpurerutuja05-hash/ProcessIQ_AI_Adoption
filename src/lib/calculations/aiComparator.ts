import { OFFICIAL_VENDOR_PRICING, VendorPricingModel } from '../data/vendorPricing';
import { 
  CustomPricingInput, 
  VendorComparisonResult, 
  AIComparatorOutputs,
  CurrencyCode 
} from '../types/assessment';

export function calculateVendorModel(
  model: VendorPricingModel,
  inputs: CustomPricingInput
): VendorComparisonResult {
  const users = Math.max(1, inputs.userCount || 1);
  const contractYears = Math.max(1, inputs.contractDurationYears || 1);
  const custom = inputs.customPricing?.[model.id];
  const isCustom = !!(custom && custom.isCustom);

  // 1. Subscription Cost
  let year1SubscriptionCost = 0;
  let monthlyUsageCost = 0;

  if (isCustom) {
    const unitPrice = Math.max(0, custom.unitPrice || 0);
    const customUsers = Math.max(1, custom.userCount || users);
    const isAnnual = custom.billingFrequency === 'annually';

    if (model.id === 'copilot-studio') {
      const baseMonthly = isAnnual ? (unitPrice / 12) : unitPrice;
      year1SubscriptionCost = baseMonthly * 12;
    } else {
      const seatMonthly = isAnnual ? (unitPrice / 12) : unitPrice;
      year1SubscriptionCost = seatMonthly * customUsers * 12;
    }

    if (custom.additionalUsageCostMonthly !== undefined && custom.additionalUsageCostMonthly !== null) {
      monthlyUsageCost = Math.max(0, custom.additionalUsageCostMonthly);
    } else {
      if (model.id === 'copilot-studio') {
        const totalMonthlyMessages = inputs.expectedMonthlyUsageInteractions || 0;
        const billableMessages = Math.max(0, totalMonthlyMessages - model.includedMessagesPerMonth);
        monthlyUsageCost = billableMessages * model.costPerExtraMessage;
      } else if (model.id === 'custom-ai-agent') {
        const inputTokenCost = (inputs.monthlyInputTokensMillions || 0) * (inputs.inputTokenPricePerMillion || model.inputTokenCostPerMillion);
        const outputTokenCost = (inputs.monthlyOutputTokensMillions || 0) * (inputs.outputTokenPricePerMillion || model.outputTokenCostPerMillion);
        monthlyUsageCost = inputTokenCost + outputTokenCost;
      }
    }
  } else {
    // Base monthly platform fee + user licenses
    const monthlyBase = model.baseMonthlyCost > 0 ? model.baseMonthlyCost : 0;
    const userSeatCost = model.costPerUserMonth > 0 ? (users * model.costPerUserMonth) : 0;
    year1SubscriptionCost = (monthlyBase + userSeatCost) * 12;

    // 2. Usage / Message / Token Consumption Cost
    if (model.id === 'copilot-studio') {
      // 25,000 pooled messages included per month
      const totalMonthlyMessages = inputs.expectedMonthlyUsageInteractions || 0;
      const billableMessages = Math.max(0, totalMonthlyMessages - model.includedMessagesPerMonth);
      // Capacity packs: $100 per 10k messages ($0.01/message)
      monthlyUsageCost = billableMessages * model.costPerExtraMessage;
    } else if (model.id === 'custom-ai-agent') {
      // Token usage based
      const inputTokenCost = (inputs.monthlyInputTokensMillions || 0) * (inputs.inputTokenPricePerMillion || model.inputTokenCostPerMillion);
      const outputTokenCost = (inputs.monthlyOutputTokensMillions || 0) * (inputs.outputTokenPricePerMillion || model.outputTokenCostPerMillion);
      monthlyUsageCost = inputTokenCost + outputTokenCost;
    } else if (inputs.costPerInteractionOrMessage > 0) {
      monthlyUsageCost = (inputs.expectedMonthlyUsageInteractions || 0) * inputs.costPerInteractionOrMessage;
    }
  }

  const year1UsageCost = monthlyUsageCost * 12;

  // 3. One-Time Capex (Implementation & Integration)
  const year1ImplementationCost = Math.max(0, inputs.implementationCostOneTime || 0);
  const year1IntegrationCost = Math.max(0, inputs.integrationCostOneTime || 0);

  // 4. Annual Maintenance & Support
  const year1SupportMaintenanceCost = Math.max(0, inputs.annualMaintenanceSupportCost || 0);

  // Totals
  const totalYear1Investment = 
    year1SubscriptionCost + 
    year1UsageCost + 
    year1ImplementationCost + 
    year1IntegrationCost + 
    year1SupportMaintenanceCost;

  const annualOngoingOperatingCost = 
    year1SubscriptionCost + 
    year1UsageCost + 
    year1SupportMaintenanceCost;

  const contractTotalCost = 
    (year1ImplementationCost + year1IntegrationCost) + 
    (annualOngoingOperatingCost * contractYears);

  return {
    vendorId: model.id,
    vendorName: model.name,
    pricingType: model.pricingType,
    sourceUrl: model.sourceUrl,
    verificationDate: model.verificationDate,
    year1SubscriptionCost: Math.round(year1SubscriptionCost * 100) / 100,
    year1UsageCost: Math.round(year1UsageCost * 100) / 100,
    year1ImplementationCost: Math.round(year1ImplementationCost * 100) / 100,
    year1IntegrationCost: Math.round(year1IntegrationCost * 100) / 100,
    year1SupportMaintenanceCost: Math.round(year1SupportMaintenanceCost * 100) / 100,
    totalYear1Investment: Math.round(totalYear1Investment * 100) / 100,
    annualOngoingOperatingCost: Math.round(annualOngoingOperatingCost * 100) / 100,
    contractTotalCost: Math.round(contractTotalCost * 100) / 100,
    notes: model.notes,
    assumptions: model.pricingAssumptions
  };
}

export function calculateAIComparator(
  inputs: CustomPricingInput & { selectedVendorId?: string },
  customVendors?: VendorPricingModel[]
): AIComparatorOutputs {
  const vendors = customVendors || OFFICIAL_VENDOR_PRICING;
  const selectedVendorId = inputs.selectedVendorId || 'm365-copilot';

  const comparisons = vendors.map(vendor => calculateVendorModel(vendor, inputs));
  const activeModelSummary = comparisons.find(c => c.vendorId === selectedVendorId) || comparisons[0];

  const pricingTransparencyNotice = 
    'Pricing Transparency Notice: ProcessIQ uses official enterprise pricing documentation where publicly disclosed. ' +
    'Quotation-based products (such as Claude Enterprise or custom SLAs) reflect representative enterprise market benchmarks ' +
    'and require written vendor quotes. Users may override any pricing figure with bespoke contractual rates.';

  return {
    selectedCurrency: inputs.currency || 'USD',
    selectedVendorId,
    comparisons,
    activeModelSummary,
    pricingTransparencyNotice
  };
}
