import {
  DEFAULT_PRICING_CONFIG,
  calculateQuoteFromConfig,
  validatePricingConfig,
  type BudgetOption,
  type CalculatedQuote,
  type CarePlanOption,
  type CurrencyOption,
  type FeatureOption,
  type PricingConfig,
  type ProjectTypeOption,
  type QuoteOption,
  type ScopeOption,
  type TimelineOption
} from '../../shared/pricing-config.mjs';
import { supabase } from './supabase';

export type {
  BudgetOption,
  CalculatedQuote,
  CarePlanOption,
  CurrencyOption,
  FeatureOption,
  PricingConfig,
  ProjectTypeOption,
  QuoteOption,
  ScopeOption,
  TimelineOption
};

export { DEFAULT_PRICING_CONFIG, calculateQuoteFromConfig, validatePricingConfig };

// Default aliases keep historical enquiry labels readable even if a future
// pricing version removes an option.
export const PROJECT_TYPES = DEFAULT_PRICING_CONFIG.projectTypes;
export const SCOPE_OPTIONS = DEFAULT_PRICING_CONFIG.scopes;
export const TIMELINE_OPTIONS = DEFAULT_PRICING_CONFIG.timelines;
export const FEATURE_OPTIONS = DEFAULT_PRICING_CONFIG.features;
export const BUDGET_OPTIONS = DEFAULT_PRICING_CONFIG.budgetOptions;
export const CARE_PLANS = DEFAULT_PRICING_CONFIG.carePlans;

export const formatMoney = (
  value: number,
  currency = DEFAULT_PRICING_CONFIG.currency,
  locale = DEFAULT_PRICING_CONFIG.displayCurrencies.find((item) => item.code === currency)?.locale ?? 'en-US'
) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(value);

export const convertFromUsd = (value: number, currency: CurrencyOption) => value * currency.rate;

export const formatConvertedMoney = (value: number, currency: CurrencyOption) =>
  formatMoney(convertFromUsd(value, currency), currency.code, currency.locale);

export const formatBudgetOption = (option: BudgetOption, currency: CurrencyOption) => {
  if (option.minimum === null && option.ceiling === null) return option.label;
  if (option.minimum === null && option.ceiling !== null) {
    return `Under ${formatConvertedMoney(option.ceiling, currency)}`;
  }
  if (option.minimum !== null && option.ceiling === null) {
    return `${formatConvertedMoney(option.minimum, currency)}+`;
  }
  return `${formatConvertedMoney(option.minimum ?? 0, currency)} to ${formatConvertedMoney(
    option.ceiling ?? 0,
    currency
  )}`;
};

export const getOptionLabel = (options: QuoteOption[], id?: string | null) =>
  options.find((option) => option.id === id)?.label ?? id ?? 'Not provided';

let publishedPricingPromise: Promise<PricingConfig> | null = null;

export const loadPublishedPricing = async (force = false): Promise<PricingConfig> => {
  if (!supabase) return DEFAULT_PRICING_CONFIG;
  if (force || !publishedPricingPromise) {
    publishedPricingPromise = supabase
      .from('pricing_config')
      .select('published_config')
      .eq('id', 'default')
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          console.warn('Using default pricing because published pricing could not be loaded.', error?.message);
          return DEFAULT_PRICING_CONFIG;
        }
        const config = data.published_config as PricingConfig;
        const validationError = validatePricingConfig(config);
        if (validationError) {
          console.error('Published pricing is invalid:', validationError);
          return DEFAULT_PRICING_CONFIG;
        }
        return config;
      });
  }
  return publishedPricingPromise;
};
