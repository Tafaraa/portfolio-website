export type QuoteOption = {
  id: string;
  label: string;
  description: string;
};

export type ProjectTypeOption = QuoteOption & {
  basePrice: number | null;
  included: string[];
};

export type ScopeOption = QuoteOption & {
  multiplier: number;
};

export type TimelineOption = QuoteOption & {
  multiplier: number;
};

export type FeatureOption = QuoteOption & {
  price: number;
};

export type BudgetOption = QuoteOption & {
  minimum: number | null;
  ceiling: number | null;
};

export type CurrencyOption = {
  code: string;
  label: string;
  rate: number;
  locale: string;
};

export type CarePlanOption = QuoteOption & {
  monthlyPrice: number;
  hostingIncluded: boolean;
  included: string[];
};

export type PricingConfig = {
  version: number;
  currency: 'USD';
  rounding: number;
  rangeMultiplier: number;
  quoteDisclaimer: string;
  ratesUpdatedAt: string;
  displayCurrencies: CurrencyOption[];
  projectTypes: ProjectTypeOption[];
  scopes: ScopeOption[];
  timelines: TimelineOption[];
  features: FeatureOption[];
  budgetOptions: BudgetOption[];
  carePlans: CarePlanOption[];
};

export type CalculatedQuote = {
  minimum: number;
  maximum: number;
  monthly: number;
  hostingIncluded: boolean;
};

export const DEFAULT_PRICING_CONFIG: PricingConfig;
export const validatePricingConfig: (config: unknown) => string | null;
export const calculateQuoteFromConfig: (
  config: PricingConfig,
  projectTypeId: string,
  scopeId: string,
  timelineId: string,
  featureIds: string[],
  carePlanId: string
) => CalculatedQuote | null;
