import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  DollarSign,
  Loader,
  Package,
  Plus,
  Puzzle,
  RotateCcw,
  Save,
  Server,
  Trash2,
  WalletCards
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import {
  DEFAULT_PRICING_CONFIG,
  formatMoney,
  loadPublishedPricing,
  validatePricingConfig,
  type BudgetOption,
  type CarePlanOption,
  type CurrencyOption,
  type FeatureOption,
  type PricingConfig,
  type ProjectTypeOption,
  type ScopeOption,
  type TimelineOption
} from '../../lib/quoteCalculator';
import { GlassCard } from './ui';

type Props = {
  userId: string;
};

const inputClasses =
  'w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-emerald-400/50';
const labelClasses = 'mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/45';

const cloneConfig = (config: PricingConfig): PricingConfig =>
  JSON.parse(JSON.stringify(config)) as PricingConfig;

const linesToList = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const safeNumber = (value: string, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const newId = (prefix: string) => `${prefix}-${Date.now().toString(36)}`;

const newCurrencyCode = (currencies: CurrencyOption[]) => {
  for (let first = 65; first <= 90; first += 1) {
    for (let second = 65; second <= 90; second += 1) {
      const code = `X${String.fromCharCode(first)}${String.fromCharCode(second)}`;
      if (!currencies.some((currency) => currency.code === code)) return code;
    }
  }
  return 'XXX';
};

const SectionHeading = ({
  icon: Icon,
  title,
  description,
  onAdd,
  addLabel
}: {
  icon: typeof Package;
  title: string;
  description: string;
  onAdd?: () => void;
  addLabel?: string;
}) => (
  <div className="flex flex-wrap items-start justify-between gap-3">
    <div className="flex items-start gap-3">
      <div className="rounded-xl border border-emerald-400/15 bg-emerald-400/10 p-2 text-emerald-300">
        <Icon size={18} />
      </div>
      <div>
        <h3 className="font-bold text-white">{title}</h3>
        <p className="mt-0.5 max-w-2xl text-sm text-white/45">{description}</p>
      </div>
    </div>
    {onAdd && (
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/75 hover:bg-white/10"
      >
        <Plus size={13} /> {addLabel ?? 'Add'}
      </button>
    )}
  </div>
);

const DeleteButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="rounded-full border border-rose-400/20 bg-rose-400/10 p-2 text-rose-200 hover:bg-rose-400/20"
    aria-label={`Remove ${label}`}
  >
    <Trash2 size={14} />
  </button>
);

const Pricing = ({ userId }: Props) => {
  const [published, setPublished] = useState<PricingConfig>(cloneConfig(DEFAULT_PRICING_CONFIG));
  const [draft, setDraft] = useState<PricingConfig>(cloneConfig(DEFAULT_PRICING_CONFIG));
  const [publishedAt, setPublishedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(published), [draft, published]);
  const validationError = useMemo(() => validatePricingConfig(draft), [draft]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!supabase) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('pricing_config')
        .select('published_config,published_at')
        .eq('id', 'default')
        .maybeSingle();

      if (!active) return;
      if (error) {
        toast.error(`Could not load pricing: ${error.message}`);
      } else if (data?.published_config) {
        const config = data.published_config as PricingConfig;
        const errorMessage = validatePricingConfig(config);
        if (errorMessage) {
          toast.error(`Published pricing is invalid: ${errorMessage}`);
        } else {
          setPublished(cloneConfig(config));
          setDraft(cloneConfig(config));
          setPublishedAt(data.published_at);
        }
      }
      setLoading(false);
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const updateProject = (id: string, patch: Partial<ProjectTypeOption>) =>
    setDraft((current) => ({
      ...current,
      projectTypes: current.projectTypes.map((item) => (item.id === id ? { ...item, ...patch } : item))
    }));

  const updateScope = (id: string, patch: Partial<ScopeOption>) =>
    setDraft((current) => ({
      ...current,
      scopes: current.scopes.map((item) => (item.id === id ? { ...item, ...patch } : item))
    }));

  const updateTimeline = (id: string, patch: Partial<TimelineOption>) =>
    setDraft((current) => ({
      ...current,
      timelines: current.timelines.map((item) => (item.id === id ? { ...item, ...patch } : item))
    }));

  const updateFeature = (id: string, patch: Partial<FeatureOption>) =>
    setDraft((current) => ({
      ...current,
      features: current.features.map((item) => (item.id === id ? { ...item, ...patch } : item))
    }));

  const updateBudget = (id: string, patch: Partial<BudgetOption>) =>
    setDraft((current) => ({
      ...current,
      budgetOptions: current.budgetOptions.map((item) => (item.id === id ? { ...item, ...patch } : item))
    }));

  const updateCarePlan = (id: string, patch: Partial<CarePlanOption>) =>
    setDraft((current) => ({
      ...current,
      carePlans: current.carePlans.map((item) => (item.id === id ? { ...item, ...patch } : item))
    }));

  const updateCurrency = (code: string, patch: Partial<CurrencyOption>) =>
    setDraft((current) => ({
      ...current,
      ratesUpdatedAt: new Date().toISOString(),
      displayCurrencies: current.displayCurrencies.map((item) =>
        item.code === code ? { ...item, ...patch } : item
      )
    }));

  const publish = async () => {
    if (!supabase || validationError) {
      if (validationError) toast.error(validationError);
      return;
    }

    const nextConfig: PricingConfig = {
      ...cloneConfig(draft),
      version: published.version + 1
    };
    if (!window.confirm(`Publish pricing version ${nextConfig.version} to the live calculator?`)) return;

    setPublishing(true);
    const now = new Date().toISOString();
    const { error } = await supabase.from('pricing_config').upsert(
      {
        id: 'default',
        published_config: nextConfig,
        published_at: now,
        updated_by: userId
      },
      { onConflict: 'id' }
    );
    setPublishing(false);

    if (error) {
      toast.error(`Pricing was not published: ${error.message}`);
      return;
    }

    setPublished(cloneConfig(nextConfig));
    setDraft(cloneConfig(nextConfig));
    setPublishedAt(now);
    await loadPublishedPricing(true);
    toast.success(`Pricing version ${nextConfig.version} is live.`);
  };

  if (loading) {
    return (
      <GlassCard className="flex min-h-[280px] items-center justify-center">
        <Loader className="h-6 w-6 animate-spin text-emerald-300" />
      </GlassCard>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">Pricing studio</h2>
            <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-200">
              Live v{published.version}
            </span>
          </div>
          <p className="mt-1 text-sm text-white/50">
            One publish updates the website calculator atomically. Nothing changes live while you are editing.
          </p>
          {publishedAt && (
            <p className="mt-1 text-[11px] text-white/30">
              Last published {new Date(publishedAt).toLocaleString('en-ZA')}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setDraft(cloneConfig(published))}
            disabled={!dirty || publishing}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/75 hover:bg-white/10 disabled:opacity-40"
          >
            <RotateCcw size={15} /> Discard edits
          </button>
          <button
            type="button"
            onClick={publish}
            disabled={!dirty || Boolean(validationError) || publishing}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 px-5 py-2 text-sm font-semibold text-stone-950 transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {publishing ? <Loader size={15} className="animate-spin" /> : <Save size={15} />}
            {publishing ? 'Publishing…' : 'Publish pricing'}
          </button>
        </div>
      </div>

      <div
        className={`flex items-start gap-2 rounded-xl border p-3 text-sm ${
          validationError
            ? 'border-amber-400/20 bg-amber-400/10 text-amber-100'
            : dirty
              ? 'border-blue-400/20 bg-blue-400/10 text-blue-100'
              : 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100'
        }`}
      >
        {validationError ? (
          <AlertTriangle size={17} className="mt-0.5 shrink-0" />
        ) : (
          <CheckCircle2 size={17} className="mt-0.5 shrink-0" />
        )}
        <p>{validationError ?? (dirty ? 'You have unpublished edits.' : 'The editor matches the live calculator.')}</p>
      </div>

      <GlassCard className="space-y-5 p-5">
        <SectionHeading
          icon={DollarSign}
          title="Pricing rules"
          description="The public estimate rounds to the nearest amount and adds a transparent upper-range buffer."
        />
        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className={labelClasses}>Round estimates to</span>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-2 text-sm text-white/35">$</span>
              <input
                type="number"
                min={1}
                step={10}
                value={draft.rounding}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, rounding: safeNumber(event.target.value, 50) }))
                }
                className={`${inputClasses} pl-8`}
              />
            </div>
          </label>
          <label>
            <span className={labelClasses}>Upper-range buffer</span>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={100}
                step={1}
                value={Math.round((draft.rangeMultiplier - 1) * 100)}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    rangeMultiplier: 1 + safeNumber(event.target.value) / 100
                  }))
                }
                className={`${inputClasses} pr-8`}
              />
              <span className="pointer-events-none absolute right-3 top-2 text-sm text-white/35">%</span>
            </div>
          </label>
        </div>
        <label>
          <span className={labelClasses}>Calculator disclaimer</span>
          <textarea
            rows={3}
            value={draft.quoteDisclaimer}
            onChange={(event) =>
              setDraft((current) => ({ ...current, quoteDisclaimer: event.target.value }))
            }
            className={inputClasses}
          />
        </label>
        <div className="border-t border-white/10 pt-5">
          <SectionHeading
            icon={DollarSign}
            title="Currency converter"
            description="USD stays authoritative. Update the indicative amount of each currency equal to 1 USD."
            addLabel="Add currency"
            onAdd={() => {
              const code = newCurrencyCode(draft.displayCurrencies);
              setDraft((current) => ({
                ...current,
                ratesUpdatedAt: new Date().toISOString(),
                displayCurrencies: [
                  ...current.displayCurrencies,
                  { code, label: 'New currency', rate: 1, locale: 'en-US' }
                ]
              }));
            }}
          />
          <div className="mt-4 space-y-3">
            {draft.displayCurrencies.map((currency) => (
              <div
                key={currency.code}
                className="grid gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 sm:grid-cols-[90px_minmax(0,1fr)_150px_130px_auto]"
              >
                <label>
                  <span className={labelClasses}>Code</span>
                  <input
                    value={currency.code}
                    readOnly={currency.code === 'USD'}
                    maxLength={3}
                    onChange={(event) =>
                      updateCurrency(currency.code, {
                        code: event.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3)
                      })
                    }
                    className={`${inputClasses} font-mono uppercase read-only:opacity-60`}
                  />
                </label>
                <label>
                  <span className={labelClasses}>Currency name</span>
                  <input
                    value={currency.label}
                    onChange={(event) => updateCurrency(currency.code, { label: event.target.value })}
                    className={inputClasses}
                  />
                </label>
                <label>
                  <span className={labelClasses}>1 USD equals</span>
                  <input
                    type="number"
                    min={0.000001}
                    step="any"
                    value={currency.rate}
                    readOnly={currency.code === 'USD'}
                    onChange={(event) =>
                      updateCurrency(currency.code, { rate: safeNumber(event.target.value, 1) })
                    }
                    className={`${inputClasses} read-only:opacity-60`}
                  />
                </label>
                <label>
                  <span className={labelClasses}>Locale</span>
                  <input
                    value={currency.locale}
                    onChange={(event) => updateCurrency(currency.code, { locale: event.target.value })}
                    className={inputClasses}
                  />
                </label>
                <div className="flex items-end">
                  {currency.code !== 'USD' && (
                    <DeleteButton
                      label={currency.label}
                      onClick={() =>
                        setDraft((current) => ({
                          ...current,
                          ratesUpdatedAt: new Date().toISOString(),
                          displayCurrencies: current.displayCurrencies.filter(
                            (item) => item.code !== currency.code
                          )
                        }))
                      }
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-white/40">
            Rates last edited {new Date(draft.ratesUpdatedAt).toLocaleDateString('en-ZA')}. Publish to update the
            public calculator.
          </p>
        </div>
      </GlassCard>

      <GlassCard className="space-y-4 p-5">
        <SectionHeading
          icon={Package}
          title="Service base packages"
          description="Base prices cover the Launch scope. Inclusions make the starting price credible and clear."
          addLabel="Add service"
          onAdd={() => {
            const id = newId('service');
            setDraft((current) => ({
              ...current,
              projectTypes: [
                ...current.projectTypes,
                {
                  id,
                  label: 'New service',
                  description: 'Describe the result this service delivers.',
                  basePrice: 2500,
                  included: ['First included item']
                }
              ]
            }));
          }}
        />
        <div className="space-y-3">
          {draft.projectTypes.map((service) => (
            <div key={service.id} className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
              <div className="flex items-start gap-3">
                <div className="grid min-w-0 flex-1 gap-3 md:grid-cols-[minmax(0,1fr)_170px]">
                  <label>
                    <span className={labelClasses}>Service name</span>
                    <input
                      value={service.label}
                      onChange={(event) => updateProject(service.id, { label: event.target.value })}
                      className={inputClasses}
                    />
                  </label>
                  <label>
                    <span className={labelClasses}>Launch price</span>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-2 text-sm text-white/35">$</span>
                      <input
                        type="number"
                        min={0}
                        step={100}
                        value={service.basePrice ?? ''}
                        placeholder="Needs scoping"
                        onChange={(event) =>
                          updateProject(service.id, {
                            basePrice: event.target.value === '' ? null : safeNumber(event.target.value)
                          })
                        }
                        className={`${inputClasses} pl-8`}
                      />
                    </div>
                  </label>
                  <label className="md:col-span-2">
                    <span className={labelClasses}>Client-facing description</span>
                    <input
                      value={service.description}
                      onChange={(event) => updateProject(service.id, { description: event.target.value })}
                      className={inputClasses}
                    />
                  </label>
                  <label className="md:col-span-2">
                    <span className={labelClasses}>Included in the base package, one item per line</span>
                    <textarea
                      rows={4}
                      value={service.included.join('\n')}
                      onChange={(event) => updateProject(service.id, { included: linesToList(event.target.value) })}
                      className={inputClasses}
                    />
                  </label>
                </div>
                <DeleteButton
                  label={service.label}
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      projectTypes: current.projectTypes.filter((item) => item.id !== service.id)
                    }))
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="space-y-4 p-5">
        <SectionHeading
          icon={WalletCards}
          title="Scope packages"
          description="These multiply each service base price. Launch stays at 1.0; Growth and Advanced reflect extra complexity."
          addLabel="Add package"
          onAdd={() => {
            const id = newId('package');
            setDraft((current) => ({
              ...current,
              scopes: [
                ...current.scopes,
                { id, label: 'New package', description: 'Explain the extra scope.', multiplier: 1.2 }
              ]
            }));
          }}
        />
        <div className="grid gap-3 md:grid-cols-3">
          {draft.scopes.map((scope) => (
            <div key={scope.id} className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
              <div className="mb-3 flex items-start justify-between gap-2">
                <p className="text-xs font-medium text-emerald-200">{scope.multiplier.toFixed(2)}× base</p>
                <DeleteButton
                  label={scope.label}
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      scopes: current.scopes.filter((item) => item.id !== scope.id)
                    }))
                  }
                />
              </div>
              <label>
                <span className={labelClasses}>Package name</span>
                <input
                  value={scope.label}
                  onChange={(event) => updateScope(scope.id, { label: event.target.value })}
                  className={inputClasses}
                />
              </label>
              <label className="mt-3 block">
                <span className={labelClasses}>Price multiplier</span>
                <input
                  type="number"
                  min={0.5}
                  max={5}
                  step={0.05}
                  value={scope.multiplier}
                  onChange={(event) => updateScope(scope.id, { multiplier: safeNumber(event.target.value, 1) })}
                  className={inputClasses}
                />
              </label>
              <label className="mt-3 block">
                <span className={labelClasses}>Description</span>
                <textarea
                  rows={3}
                  value={scope.description}
                  onChange={(event) => updateScope(scope.id, { description: event.target.value })}
                  className={inputClasses}
                />
              </label>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="space-y-4 p-5">
        <SectionHeading
          icon={Puzzle}
          title="Optional add-ons"
          description="Fixed once-off additions to the build estimate."
          addLabel="Add extra"
          onAdd={() => {
            const id = newId('extra');
            setDraft((current) => ({
              ...current,
              features: [
                ...current.features,
                { id, label: 'New add-on', description: 'Describe what the client receives.', price: 500 }
              ]
            }));
          }}
        />
        <div className="grid gap-3 md:grid-cols-2">
          {draft.features.map((feature) => (
            <div key={feature.id} className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_140px]">
                    <label>
                      <span className={labelClasses}>Add-on</span>
                      <input
                        value={feature.label}
                        onChange={(event) => updateFeature(feature.id, { label: event.target.value })}
                        className={inputClasses}
                      />
                    </label>
                    <label>
                      <span className={labelClasses}>Price</span>
                      <input
                        type="number"
                        min={0}
                        step={50}
                        value={feature.price}
                        onChange={(event) => updateFeature(feature.id, { price: safeNumber(event.target.value) })}
                        className={inputClasses}
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className={labelClasses}>Description</span>
                    <input
                      value={feature.description}
                      onChange={(event) => updateFeature(feature.id, { description: event.target.value })}
                      className={inputClasses}
                    />
                  </label>
                </div>
                <DeleteButton
                  label={feature.label}
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      features: current.features.filter((item) => item.id !== feature.id)
                    }))
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="space-y-4 p-5">
        <SectionHeading
          icon={Server}
          title="Hosting and monthly care"
          description="Recurring costs stay separate from the build. Clearly mark whether hosting is included."
          addLabel="Add plan"
          onAdd={() => {
            const id = newId('care');
            setDraft((current) => ({
              ...current,
              carePlans: [
                ...current.carePlans,
                {
                  id,
                  label: 'New care plan',
                  description: 'Describe the ongoing support.',
                  monthlyPrice: 99,
                  hostingIncluded: true,
                  included: ['Managed hosting']
                }
              ]
            }));
          }}
        />
        <div className="grid gap-3 lg:grid-cols-2">
          {draft.carePlans.map((plan) => (
            <div key={plan.id} className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_150px]">
                    <label>
                      <span className={labelClasses}>Plan name</span>
                      <input
                        value={plan.label}
                        onChange={(event) => updateCarePlan(plan.id, { label: event.target.value })}
                        className={inputClasses}
                      />
                    </label>
                    <label>
                      <span className={labelClasses}>Monthly price</span>
                      <input
                        type="number"
                        min={0}
                        step={10}
                        value={plan.monthlyPrice}
                        onChange={(event) =>
                          updateCarePlan(plan.id, { monthlyPrice: safeNumber(event.target.value) })
                        }
                        className={inputClasses}
                      />
                    </label>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-white/65">
                    <input
                      type="checkbox"
                      checked={plan.hostingIncluded}
                      onChange={(event) => updateCarePlan(plan.id, { hostingIncluded: event.target.checked })}
                      className="h-4 w-4 accent-emerald-400"
                    />
                    Hosting is included in this monthly price
                  </label>
                  <label className="block">
                    <span className={labelClasses}>Description</span>
                    <input
                      value={plan.description}
                      onChange={(event) => updateCarePlan(plan.id, { description: event.target.value })}
                      className={inputClasses}
                    />
                  </label>
                  <label className="block">
                    <span className={labelClasses}>Included, one item per line</span>
                    <textarea
                      rows={4}
                      value={plan.included.join('\n')}
                      onChange={(event) => updateCarePlan(plan.id, { included: linesToList(event.target.value) })}
                      className={inputClasses}
                    />
                  </label>
                </div>
                <DeleteButton
                  label={plan.label}
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      carePlans: current.carePlans.filter((item) => item.id !== plan.id)
                    }))
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="space-y-4 p-5">
        <SectionHeading
          icon={Clock3}
          title="Timeline pricing"
          description="Priority work costs more because it reserves capacity and compresses feedback."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {draft.timelines.map((timeline) => (
            <div key={timeline.id} className="grid gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 sm:grid-cols-[minmax(0,1fr)_120px]">
              <label>
                <span className={labelClasses}>Timeline</span>
                <input
                  value={timeline.label}
                  onChange={(event) => updateTimeline(timeline.id, { label: event.target.value })}
                  className={inputClasses}
                />
              </label>
              <label>
                <span className={labelClasses}>Multiplier</span>
                <input
                  type="number"
                  min={0.5}
                  max={5}
                  step={0.05}
                  value={timeline.multiplier}
                  onChange={(event) =>
                    updateTimeline(timeline.id, { multiplier: safeNumber(event.target.value, 1) })
                  }
                  className={inputClasses}
                />
              </label>
              <label className="sm:col-span-2">
                <span className={labelClasses}>Description</span>
                <input
                  value={timeline.description}
                  onChange={(event) => updateTimeline(timeline.id, { description: event.target.value })}
                  className={inputClasses}
                />
              </label>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="space-y-4 p-5">
        <SectionHeading
          icon={WalletCards}
          title="Client budget ranges"
          description="These qualify leads and trigger a phasing suggestion when the estimate exceeds their ceiling."
          addLabel="Add range"
          onAdd={() => {
            const id = newId('budget');
            setDraft((current) => ({
              ...current,
              budgetOptions: [
                ...current.budgetOptions,
                {
                  id,
                  label: 'New budget range',
                  description: 'Explain what this range suits.',
                  minimum: 2000,
                  ceiling: 5000
                }
              ]
            }));
          }}
        />
        <div className="grid gap-3 md:grid-cols-2">
          {draft.budgetOptions.map((budget) => (
            <div key={budget.id} className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
              <div className="flex items-start gap-3">
                <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-2">
                  <label>
                    <span className={labelClasses}>Visible range</span>
                    <input
                      value={budget.label}
                      onChange={(event) => updateBudget(budget.id, { label: event.target.value })}
                      className={inputClasses}
                    />
                  </label>
                  <label>
                    <span className={labelClasses}>Lower amount</span>
                    <input
                      type="number"
                      min={0}
                      step={500}
                      value={budget.minimum ?? ''}
                      placeholder="No minimum"
                      onChange={(event) =>
                        updateBudget(budget.id, {
                          minimum: event.target.value === '' ? null : safeNumber(event.target.value)
                        })
                      }
                      className={inputClasses}
                    />
                  </label>
                  <label>
                    <span className={labelClasses}>Upper ceiling</span>
                    <input
                      type="number"
                      min={0}
                      step={500}
                      value={budget.ceiling ?? ''}
                      placeholder="No ceiling"
                      onChange={(event) =>
                        updateBudget(budget.id, {
                          ceiling: event.target.value === '' ? null : safeNumber(event.target.value)
                        })
                      }
                      className={inputClasses}
                    />
                  </label>
                  <label>
                    <span className={labelClasses}>Guidance</span>
                    <input
                      value={budget.description}
                      onChange={(event) => updateBudget(budget.id, { description: event.target.value })}
                      className={inputClasses}
                    />
                  </label>
                </div>
                <DeleteButton
                  label={budget.label}
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      budgetOptions: current.budgetOptions.filter((item) => item.id !== budget.id)
                    }))
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="sticky bottom-4 z-20 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-stone-950/95 p-4 shadow-2xl backdrop-blur-xl">
        <div>
          <p className="text-sm font-medium text-white">
            {dirty ? 'Unpublished pricing changes' : `Live pricing version ${published.version}`}
          </p>
          <p className="text-xs text-white/40">
            Example: {formatMoney(draft.projectTypes.find((item) => item.basePrice)?.basePrice ?? 0)} base ·{' '}
            {draft.carePlans.find((item) => item.monthlyPrice > 0)?.label ?? 'No care plan'}
          </p>
        </div>
        <button
          type="button"
          onClick={publish}
          disabled={!dirty || Boolean(validationError) || publishing}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 px-5 py-2.5 text-sm font-semibold text-stone-950 disabled:opacity-40"
        >
          {publishing ? <Loader size={15} className="animate-spin" /> : <Save size={15} />}
          Publish to calculator
        </button>
      </div>
    </div>
  );
};

export default Pricing;
