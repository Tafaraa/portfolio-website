import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  Github,
  Linkedin,
  Loader,
  Mail,
  MapPin,
  MessageCircle,
  Phone
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import FormInput from '../../components/ui/FormInput';
import {
  DEFAULT_PRICING_CONFIG,
  calculateQuoteFromConfig,
  formatBudgetOption,
  formatConvertedMoney,
  loadPublishedPricing,
  type PricingConfig
} from '../../lib/quoteCalculator';

type ContactFormData = {
  from_name: string;
  email: string;
  phone: string;
  organization: string;
  projectType: string;
  scope: string;
  timeline: string;
  budgetRange: string;
  carePlan: string;
  features: string[];
  message: string;
};

const createEmptyForm = (carePlan = 'self-managed'): ContactFormData => ({
  from_name: '',
  email: '',
  phone: '',
  organization: '',
  projectType: '',
  scope: 'focused',
  timeline: 'standard',
  budgetRange: '',
  carePlan,
  features: [],
  message: ''
});

const createSubmissionId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const selectClasses =
  'w-full appearance-none border-b-2 border-stone-300 bg-transparent px-0 py-4 pr-10 text-stone-900 outline-none transition-colors focus:border-stone-900 dark:border-dark-border dark:bg-transparent dark:text-dark-text dark:focus:border-dark-accent';

const CONTACT_STEPS = [
  { id: 'contact-step-details', label: 'Your details' },
  { id: 'contact-step-project', label: 'Project choices' },
  { id: 'contact-step-result', label: 'The result you need' },
  { id: 'contact-step-send', label: 'Review and send' }
] as const;

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>(createEmptyForm);
  const [pricingConfig, setPricingConfig] = useState<PricingConfig>(DEFAULT_PRICING_CONFIG);
  const [displayCurrencyCode, setDisplayCurrencyCode] = useState(DEFAULT_PRICING_CONFIG.currency);
  const [pricingLoading, setPricingLoading] = useState(true);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const submissionIdRef = useRef(createSubmissionId());
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formValid, setFormValid] = useState(false);
  const [activeContactStep, setActiveContactStep] = useState(0);
  const [typedProgress, setTypedProgress] = useState('Step 1 of 4: Your details');

  const quote = useMemo(
    () =>
      calculateQuoteFromConfig(
        pricingConfig,
        formData.projectType,
        formData.scope,
        formData.timeline,
        formData.features,
        formData.carePlan
      ),
    [pricingConfig, formData.projectType, formData.scope, formData.timeline, formData.features, formData.carePlan]
  );

  const selectedProject = pricingConfig.projectTypes.find((option) => option.id === formData.projectType);
  const selectedScope = pricingConfig.scopes.find((option) => option.id === formData.scope);
  const selectedTimeline = pricingConfig.timelines.find((option) => option.id === formData.timeline);
  const selectedBudget = pricingConfig.budgetOptions.find((option) => option.id === formData.budgetRange);
  const selectedCarePlan = pricingConfig.carePlans.find((option) => option.id === formData.carePlan);
  const selectedFeatures = pricingConfig.features.filter((feature) => formData.features.includes(feature.id));
  const displayCurrency =
    pricingConfig.displayCurrencies.find((currency) => currency.code === displayCurrencyCode) ??
    pricingConfig.displayCurrencies.find((currency) => currency.code === pricingConfig.currency) ??
    DEFAULT_PRICING_CONFIG.displayCurrencies[0];
  const displayMoney = (value: number) => formatConvertedMoney(value, displayCurrency);
  const budgetCeiling = selectedBudget?.ceiling;
  const budgetMayNeedPhasing = Boolean(quote && budgetCeiling && quote.minimum > budgetCeiling);
  const ratesUpdatedLabel = useMemo(
    () =>
      new Intl.DateTimeFormat('en-ZA', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format(new Date(pricingConfig.ratesUpdatedAt)),
    [pricingConfig.ratesUpdatedAt]
  );
  const requiredChecks = useMemo(
    () => [
      formData.from_name.trim().length >= 2,
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      Boolean(formData.projectType),
      Boolean(formData.scope),
      Boolean(formData.timeline),
      Boolean(formData.budgetRange),
      Boolean(formData.carePlan),
      formData.message.trim().length >= 20
    ],
    [formData]
  );
  const completedRequiredFields = requiredChecks.filter(Boolean).length;
  const requiredFieldsRemaining = requiredChecks.length - completedRequiredFields;

  useEffect(() => {
    let active = true;
    loadPublishedPricing().then((config) => {
      if (!active) return;
      setPricingConfig(config);
      setDisplayCurrencyCode((current) =>
        config.displayCurrencies.some((currency) => currency.code === current) ? current : config.currency
      );
      setFormData((previous) => ({
        ...previous,
        projectType: config.projectTypes.some((item) => item.id === previous.projectType)
          ? previous.projectType
          : '',
        scope: config.scopes.some((item) => item.id === previous.scope)
          ? previous.scope
          : (config.scopes[0]?.id ?? ''),
        timeline: config.timelines.some((item) => item.id === previous.timeline)
          ? previous.timeline
          : (config.timelines[0]?.id ?? ''),
        budgetRange: config.budgetOptions.some((item) => item.id === previous.budgetRange)
          ? previous.budgetRange
          : '',
        carePlan: config.carePlans.some((item) => item.id === previous.carePlan)
          ? previous.carePlan
          : (config.carePlans[0]?.id ?? ''),
        features: previous.features.filter((id) => config.features.some((item) => item.id === id))
      }));
      setPricingLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setFormValid(requiredChecks.every(Boolean));
  }, [requiredChecks]);

  useEffect(() => {
    let animationFrame = 0;
    const updateActiveStep = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const readingLine = window.innerHeight * 0.34;
        let nextStep = 0;

        CONTACT_STEPS.forEach((step, index) => {
          const element = document.getElementById(step.id);
          if (element && element.getBoundingClientRect().top <= readingLine) {
            nextStep = index;
          }
        });

        setActiveContactStep(nextStep);
      });
    };

    updateActiveStep();
    window.addEventListener('scroll', updateActiveStep, { passive: true });
    window.addEventListener('resize', updateActiveStep);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', updateActiveStep);
      window.removeEventListener('resize', updateActiveStep);
    };
  }, []);

  useEffect(() => {
    const fullText = `Step ${activeContactStep + 1} of ${CONTACT_STEPS.length}: ${
      CONTACT_STEPS[activeContactStep].label
    }`;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setTypedProgress(fullText);
      return;
    }

    let character = 0;
    setTypedProgress('');
    const interval = window.setInterval(() => {
      character += 1;
      setTypedProgress(fullText.slice(0, character));
      if (character >= fullText.length) window.clearInterval(interval);
    }, 28);

    return () => window.clearInterval(interval);
  }, [activeContactStep]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const toggleFeature = (featureId: string) => {
    setFormData((previous) => ({
      ...previous,
      features: previous.features.includes(featureId)
        ? previous.features.filter((id) => id !== featureId)
        : [...previous.features, featureId]
    }));
  };

  const chooseProject = (projectType: string) => {
    setFormData((previous) => ({ ...previous, projectType }));
    window.setTimeout(() => document.getElementById('project_type')?.focus(), 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValid) {
      toast.error('Complete the required project details before submitting.');
      return;
    }

    setFormState('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: submissionIdRef.current,
          name: formData.from_name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          organization: formData.organization.trim(),
          projectType: formData.projectType,
          scope: formData.scope,
          timeline: formData.timeline,
          budgetRange: formData.budgetRange,
          carePlan: formData.carePlan,
          pricingVersion: pricingConfig.version,
          displayCurrency: displayCurrency.code,
          features: formData.features,
          message: formData.message.trim(),
          marketingOptIn,
          website: honeypotRef.current?.value ?? ''
        })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? 'Failed to send your project brief.');
      }

      setFormState('success');
      toast.success("Project brief received. Check your inbox. I'll reply within one business day.");
      setFormData(createEmptyForm(pricingConfig.carePlans[0]?.id));
      setMarketingOptIn(false);
      submissionIdRef.current = createSubmissionId();

      window.setTimeout(() => setFormState('idle'), 5000);
    } catch (error) {
      setFormState('error');
      toast.error(error instanceof Error ? error.message : 'Failed to send your project brief. Please try again.');
      console.error('Contact form error:', error);
      window.setTimeout(() => setFormState('idle'), 3500);
    }
  };

  const phoneNumber = '27606249151';
  const whatsappMessage = encodeURIComponent(
    'Hi Tafara, I found your portfolio and would like to discuss a project.'
  );
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
  const projectShortcuts = pricingConfig.projectTypes
    .filter((project) => project.basePrice !== null)
    .slice(0, 4);

  return (
    <section id="contact" className="py-20 md:py-32">
      <Toaster position="top-right" />
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-medium tracking-[0.25em] text-stone-500 dark:text-dark-muted">
            START HERE
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            Turn the idea into a clear, costed project brief.
          </h2>
          <p className="mt-5 text-lg text-stone-600 dark:text-dark-muted">
            Choose what you need, get a realistic planning range, and send enough context for a useful first
            response, not a vague sales call.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {projectShortcuts.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => chooseProject(project.id)}
                className="group inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-sm font-medium text-stone-800 transition-colors hover:border-stone-900 hover:bg-stone-900 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-dark-text dark:hover:bg-white/10"
              >
                {project.label}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div
            data-testid="contact-details"
            className="md:sticky md:top-28 md:col-span-1 md:self-start"
          >
            <h2 className="mb-8 text-4xl font-bold tracking-tighter md:text-5xl">CONTACT</h2>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 flex items-center gap-2 text-xl font-medium">
                  <Mail size={20} aria-hidden="true" />
                  Email
                </h3>
                <a
                  href="mailto:tafara@mutsvedutafara.com"
                  className="text-stone-600 transition-colors hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:text-dark-muted dark:hover:text-white dark:focus:ring-dark-accent"
                >
                  tafara@mutsvedutafara.com
                </a>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2 text-xl font-medium">
                  <Phone size={20} aria-hidden="true" />
                  Phone
                </h3>
                <div className="flex items-center gap-4">
                  <a
                    href="tel:+27606249151"
                    className="text-stone-600 transition-colors hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:text-dark-muted dark:hover:text-white dark:focus:ring-dark-accent"
                  >
                    +27 60 624 9151
                  </a>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 transition-colors hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
                    aria-label="Contact Tafara on WhatsApp"
                  >
                    <MessageCircle size={20} aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2 text-xl font-medium">
                  <MapPin size={20} aria-hidden="true" />
                  Location
                </h3>
                <p className="text-stone-600 dark:text-dark-muted">Midrand, South Africa</p>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-medium">Connect</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/Tafaraa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-600 transition-colors hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:text-dark-muted dark:hover:text-white dark:focus:ring-dark-accent"
                    aria-label="Visit Tafara's GitHub profile"
                  >
                    <Github size={20} aria-hidden="true" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/tafara-mutsvedu-93825621b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-600 transition-colors hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:text-dark-muted dark:hover:text-white dark:focus:ring-dark-accent"
                    aria-label="Visit Tafara's LinkedIn profile"
                  >
                    <Linkedin size={20} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="relative space-y-12">
              <div className="sticky top-20 z-30 -mx-2 overflow-hidden rounded-2xl border border-stone-200 bg-white/95 px-4 py-3 shadow-lg shadow-stone-900/5 backdrop-blur-md dark:border-white/10 dark:bg-stone-950/95 md:hidden">
                <div className="flex items-center justify-between gap-3">
                  <p className="min-w-0 truncate font-mono text-xs font-semibold text-stone-800 dark:text-white">
                    {typedProgress}
                    <span className="ml-0.5 animate-pulse text-emerald-600" aria-hidden="true">
                      |
                    </span>
                  </p>
                  <span className="shrink-0 text-xs text-stone-500 dark:text-dark-muted">
                    {completedRequiredFields}/{requiredChecks.length} ready
                  </span>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-stone-200 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-emerald-600 transition-[width] duration-500"
                    style={{ width: `${((activeContactStep + 1) / CONTACT_STEPS.length) * 100}%` }}
                  />
                </div>
              </div>

              <fieldset id="contact-step-details" className="scroll-mt-32 space-y-8">
                <legend className="flex items-center gap-3 text-2xl font-semibold">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-sm text-white dark:bg-white dark:text-stone-900">
                    1
                  </span>
                  Your details
                </legend>

                <div className="grid gap-8 sm:grid-cols-2">
                  <FormInput
                    id="from_name"
                    name="from_name"
                    type="text"
                    label="Your name"
                    value={formData.from_name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    minLength={2}
                    errorMessage="Please enter your name"
                  />
                  <FormInput
                    id="email"
                    name="email"
                    type="email"
                    label="Work email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                    errorMessage="Please enter a valid email address"
                  />
                  <FormInput
                    id="organization"
                    name="organization"
                    type="text"
                    label="Business / organisation"
                    value={formData.organization}
                    onChange={handleChange}
                    autoComplete="organization"
                    maxLength={120}
                  />
                  <FormInput
                    id="phone"
                    name="phone"
                    type="tel"
                    label="Phone / WhatsApp"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    maxLength={50}
                  />
                </div>
              </fieldset>

              <fieldset id="contact-step-project" className="scroll-mt-32 space-y-8">
                <legend className="flex items-center gap-3 text-2xl font-semibold">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-sm text-white dark:bg-white dark:text-stone-900">
                    2
                  </span>
                  Shape the project
                  {pricingLoading && (
                    <span className="text-xs font-normal text-stone-500 dark:text-dark-muted">Loading live pricing…</span>
                  )}
                </legend>

                <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <label htmlFor="display_currency" className="font-medium text-stone-900 dark:text-white">
                        Display currency
                      </label>
                      <p className="mt-1 text-sm text-stone-500 dark:text-dark-muted">
                        USD is the pricing base. Other currencies are planning values.
                      </p>
                      <p className="mt-1 text-xs text-stone-400 dark:text-white/40">
                        Reference rates refreshed {ratesUpdatedLabel}.
                      </p>
                    </div>
                    <div className="relative min-w-56">
                      <select
                        id="display_currency"
                        value={displayCurrency.code}
                        onChange={(event) => setDisplayCurrencyCode(event.target.value)}
                        className={`${selectClasses} py-2`}
                      >
                        {pricingConfig.displayCurrencies.map((currency) => (
                          <option key={currency.code} value={currency.code}>
                            {currency.code} · {currency.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={18}
                        className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-stone-500"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="project_type" className="mb-2 block text-xl font-medium dark:text-dark-text">
                      What do you want to build? <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="project_type"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className={selectClasses}
                      >
                        <option value="">Choose a project type</option>
                        {pricingConfig.projectTypes.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                            {option.basePrice ? `, from ${displayMoney(option.basePrice)}` : ''}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={18}
                        className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-stone-500"
                        aria-hidden="true"
                      />
                    </div>
                    {selectedProject && (
                      <>
                        <p className="mt-2 text-sm text-stone-500 dark:text-dark-muted">
                          {selectedProject.description}
                        </p>
                        {selectedProject.included.length > 0 && (
                          <div className="mt-3 rounded-xl border border-stone-200 bg-white/60 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                            <p className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-white/70">
                              Base package includes
                            </p>
                            <ul className="mt-2 space-y-1.5 text-sm text-stone-600 dark:text-dark-muted">
                              {selectedProject.included.map((item) => (
                                <li key={item} className="flex gap-2">
                                  <Check size={15} className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-300" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <p className="mb-2 text-xl font-medium dark:text-dark-text">
                      Scope level <span className="text-red-500">*</span>
                    </p>
                    <p className="text-sm text-stone-500 dark:text-dark-muted">
                      Pick the closest fit. We can adjust it after the first conversation.
                    </p>
                    <div className="mt-4 grid gap-3 lg:grid-cols-3">
                      {pricingConfig.scopes.map((option) => {
                        const selected = formData.scope === option.id;
                        const priceEffect =
                          option.multiplier === 1
                            ? 'Base package'
                            : `About ${Math.round((option.multiplier - 1) * 100)}% above base`;

                        return (
                          <label
                            key={option.id}
                            className={`cursor-pointer rounded-xl border p-4 transition-colors ${
                              selected
                                ? 'border-emerald-700 bg-emerald-50 ring-1 ring-emerald-700 dark:border-emerald-400/60 dark:bg-emerald-400/10 dark:ring-emerald-400/60'
                                : 'border-stone-200 bg-white/60 hover:border-stone-400 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/25'
                            }`}
                          >
                            <input
                              type="radio"
                              name="scope"
                              value={option.id}
                              checked={selected}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <span className="flex items-start justify-between gap-3">
                              <span className="font-semibold text-stone-900 dark:text-white">{option.label}</span>
                              <span className="shrink-0 rounded-full bg-stone-100 px-2 py-1 text-[11px] font-medium text-stone-600 dark:bg-white/10 dark:text-white/60">
                                {priceEffect}
                              </span>
                            </span>
                            <span className="mt-2 block text-sm leading-relaxed text-stone-600 dark:text-dark-muted">
                              {option.description}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="mb-2 block text-xl font-medium dark:text-dark-text">
                      Target timeline <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        required
                        className={selectClasses}
                      >
                        {pricingConfig.timelines.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={18}
                        className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-stone-500"
                        aria-hidden="true"
                      />
                    </div>
                    {selectedTimeline && (
                      <p className="mt-2 text-sm text-stone-500 dark:text-dark-muted">
                        {selectedTimeline.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="budget_range" className="mb-2 block text-xl font-medium dark:text-dark-text">
                      Working budget <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="budget_range"
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleChange}
                        required
                        className={selectClasses}
                      >
                        <option value="">Choose a budget range</option>
                        {pricingConfig.budgetOptions.map((option) => (
                          <option key={option.id} value={option.id}>
                            {formatBudgetOption(option, displayCurrency)}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={18}
                        className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-stone-500"
                        aria-hidden="true"
                      />
                    </div>
                    {selectedBudget && (
                      <p className="mt-2 text-sm text-stone-500 dark:text-dark-muted">
                        {selectedBudget.description}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="care_plan" className="mb-2 block text-xl font-medium dark:text-dark-text">
                      Hosting and ongoing care <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="care_plan"
                        name="carePlan"
                        value={formData.carePlan}
                        onChange={handleChange}
                        required
                        className={selectClasses}
                      >
                        {pricingConfig.carePlans.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                            {option.monthlyPrice > 0 ? `, ${displayMoney(option.monthlyPrice)}/month` : ''}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={18}
                        className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-stone-500"
                        aria-hidden="true"
                      />
                    </div>
                    {selectedCarePlan && (
                      <div className="mt-3 rounded-xl border border-stone-200 bg-white/60 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-sm font-medium text-stone-900 dark:text-white">
                            {selectedCarePlan.description}
                          </p>
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                              selectedCarePlan.hostingIncluded
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200'
                                : 'bg-stone-200 text-stone-700 dark:bg-white/10 dark:text-white/60'
                            }`}
                          >
                            {selectedCarePlan.hostingIncluded ? 'Hosting included' : 'Hosting excluded'}
                          </span>
                        </div>
                        <ul className="mt-3 grid gap-1.5 text-sm text-stone-600 dark:text-dark-muted sm:grid-cols-2">
                          {selectedCarePlan.included.map((item) => (
                            <li key={item} className="flex gap-2">
                              <Check size={15} className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-300" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-xl font-medium dark:text-dark-text">Useful extras</p>
                  <p className="mt-1 text-sm text-stone-500 dark:text-dark-muted">
                    Select only what matters now. The estimate updates instantly.
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {pricingConfig.features.map((feature) => {
                      const selected = formData.features.includes(feature.id);
                      return (
                        <label
                          key={feature.id}
                          className={`cursor-pointer rounded-xl border p-4 transition-colors ${
                            selected
                              ? 'border-emerald-700 bg-emerald-50 dark:border-emerald-400/50 dark:bg-emerald-400/10'
                              : 'border-stone-200 bg-white/60 hover:border-stone-400 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/25'
                          }`}
                        >
                          <span className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={() => toggleFeature(feature.id)}
                              className="mt-1 h-4 w-4 shrink-0 accent-emerald-700"
                            />
                            <span>
                              <span className="flex flex-wrap items-center gap-2 font-medium">
                                {feature.label}
                                <span className="text-xs font-normal text-stone-500 dark:text-dark-muted">
                                  +{displayMoney(feature.price)}
                                </span>
                              </span>
                              <span className="mt-1 block text-sm text-stone-500 dark:text-dark-muted">
                                {feature.description}
                              </span>
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div
                  className="overflow-hidden rounded-2xl border border-stone-900 bg-stone-950 text-white shadow-xl dark:border-white/10"
                  aria-live="polite"
                >
                  <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
                    <Calculator size={20} className="text-emerald-300" aria-hidden="true" />
                    <div>
                      <p className="font-semibold">Planning estimate</p>
                      <p className="text-xs text-white/55">A transparent starting range, not a final quote.</p>
                    </div>
                  </div>
                  <div className="p-5">
                    {quote ? (
                      <>
                        <p className="text-3xl font-bold tracking-tight text-white">
                          {displayMoney(quote.minimum)} to {displayMoney(quote.maximum)}
                        </p>
                        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/40">
                          Once-off project estimate
                        </p>
                        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-sm text-white/65">Hosting and ongoing care</p>
                            <p className="font-semibold text-emerald-200">
                              {quote.monthly > 0 ? `${displayMoney(quote.monthly)}/month` : 'Not included'}
                            </p>
                          </div>
                          <p className="mt-1 text-xs text-white/45">
                            {quote.hostingIncluded
                              ? `${selectedCarePlan?.label ?? 'Selected plan'} includes hosting.`
                              : 'You arrange and pay for hosting separately; future updates are quoted as needed.'}
                          </p>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-white/60">
                          Based on a {selectedScope?.label.toLowerCase()} {selectedProject?.label.toLowerCase()}
                          {selectedFeatures.length > 0
                            ? ` with ${selectedFeatures.length} selected ${selectedFeatures.length === 1 ? 'extra' : 'extras'}`
                            : ''}{' '}
                          and a {selectedTimeline?.label.toLowerCase()} timeline.
                        </p>
                        {budgetMayNeedPhasing && (
                          <div className="mt-4 flex gap-2 rounded-lg border border-amber-300/20 bg-amber-300/10 p-3 text-sm text-amber-100">
                            <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
                            <p>
                              Your budget is below this planning range. Send the brief anyway. I can suggest a
                              focused first phase instead of forcing the full scope.
                            </p>
                          </div>
                        )}
                        <p className="mt-4 text-xs leading-relaxed text-white/40">
                          {pricingConfig.quoteDisclaimer}
                        </p>
                        {displayCurrency.code !== pricingConfig.currency && (
                          <p className="mt-2 text-xs leading-relaxed text-white/40">
                            Displayed in {displayCurrency.code} at 1 USD = {displayCurrency.rate}{' '}
                            {displayCurrency.code}. Rate refreshed {ratesUpdatedLabel}. Final proposals remain in
                            USD.
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-sm leading-relaxed text-white/65">
                          {formData.projectType === 'not-sure'
                            ? 'No guesswork: describe the result you need and I will recommend the right scope and budget.'
                            : 'Choose a project type to see a realistic base-price range.'}
                        </p>
                        {selectedCarePlan && (
                          <p className="text-xs text-white/45">
                            Ongoing choice: {selectedCarePlan.label}
                            {selectedCarePlan.monthlyPrice > 0
                              ? ` at ${displayMoney(selectedCarePlan.monthlyPrice)}/month`
                              : ', no monthly fee'}
                            .
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </fieldset>

              <fieldset id="contact-step-result" className="scroll-mt-32 space-y-8">
                <legend className="flex items-center gap-3 text-2xl font-semibold">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-sm text-white dark:bg-white dark:text-stone-900">
                    3
                  </span>
                  The result you need
                </legend>
                <FormInput
                  id="message"
                  name="message"
                  type="textarea"
                  label="What should this project achieve?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={20}
                  maxLength={5000}
                  rows={6}
                  errorMessage="Please give at least 20 characters of useful context"
                />
                <p className="-mt-6 text-sm text-stone-500 dark:text-dark-muted">
                  Include the problem, who will use it, must-have features, and what success looks like.
                </p>
              </fieldset>

              <input
                ref={honeypotRef}
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
              />

              <div id="contact-step-send" className="scroll-mt-32 space-y-4">
                <label className="flex cursor-pointer items-start gap-3 text-sm text-stone-600 dark:text-dark-muted">
                  <input
                    type="checkbox"
                    checked={marketingOptIn}
                    onChange={(e) => setMarketingOptIn(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-stone-400 accent-stone-900 dark:accent-white"
                  />
                  <span>
                    Keep me in the loop with occasional updates about new work, services, and availability. You
                    can unsubscribe at any time.
                  </span>
                </label>

                <p className="text-xs leading-relaxed text-stone-500 dark:text-dark-muted">
                  By sending this brief you agree to the processing of your details so I can respond to your
                  enquiry, as described in the{' '}
                  <Link
                    to="/privacy-policy"
                    className="underline underline-offset-2 hover:text-stone-900 dark:hover:text-white"
                  >
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link to="/terms" className="underline underline-offset-2 hover:text-stone-900 dark:hover:text-white">
                    Terms of Use
                  </Link>
                  . Your information is handled in line with POPIA and is never sold.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={!formValid || formState === 'submitting'}
                  className={`relative inline-flex items-center justify-center rounded-full border px-8 py-4 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-dark-accent ${
                    formValid
                      ? 'border-stone-900 bg-stone-900 text-white hover:border-emerald-700 hover:bg-emerald-700 dark:border-emerald-300 dark:bg-emerald-300 dark:text-stone-950 dark:hover:border-emerald-200 dark:hover:bg-emerald-200'
                      : 'cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-dark-border dark:bg-white/5 dark:text-dark-muted'
                  }`}
                >
                  {formState === 'submitting' ? (
                    <>
                      <Loader size={18} className="mr-2 animate-spin" aria-hidden="true" />
                      Sending brief...
                    </>
                  ) : formState === 'success' ? (
                    <>
                      <Check size={18} className="mr-2 text-green-500" aria-hidden="true" />
                      Brief received
                    </>
                  ) : formState === 'error' ? (
                    <>
                      <AlertCircle size={18} className="mr-2 text-red-500" aria-hidden="true" />
                      Please try again
                    </>
                  ) : (
                    formValid ? 'Send project brief' : 'Complete the brief to send'
                  )}
                </button>

                {formState === 'idle' && (
                  <span
                    className={`flex items-center text-sm ${
                      formValid ? 'text-green-700 dark:text-green-400' : 'text-stone-500 dark:text-dark-muted'
                    }`}
                  >
                    {formValid ? (
                      <>
                        <CheckCircle2 size={16} className="mr-1.5" aria-hidden="true" />
                        Ready for a useful first response
                      </>
                    ) : (
                      <>
                        <AlertCircle size={16} className="mr-1.5" aria-hidden="true" />
                        {requiredFieldsRemaining} required {requiredFieldsRemaining === 1 ? 'answer' : 'answers'} left
                      </>
                    )}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
