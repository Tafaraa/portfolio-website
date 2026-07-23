export const DEFAULT_PRICING_CONFIG = {
  version: 1,
  currency: 'USD',
  rounding: 50,
  rangeMultiplier: 1.25,
  quoteDisclaimer:
    'Planning estimate only, not a binding quote. Prices and proposals are based in USD. Converted values are indicative. Third-party fees, domains, paid software, payment fees, content production, and taxes are excluded unless stated.',
  ratesUpdatedAt: '2026-07-23T00:00:00.000Z',
  displayCurrencies: [
    { code: 'USD', label: 'US Dollar', rate: 1, locale: 'en-US' },
    { code: 'EUR', label: 'Euro', rate: 0.8778, locale: 'en-IE' },
    { code: 'GBP', label: 'British Pound', rate: 0.7489, locale: 'en-GB' },
    { code: 'ZAR', label: 'South African Rand', rate: 16.439, locale: 'en-ZA' },
    { code: 'CAD', label: 'Canadian Dollar', rate: 1.4075, locale: 'en-CA' },
    { code: 'AUD', label: 'Australian Dollar', rate: 1.43, locale: 'en-AU' },
    { code: 'SGD', label: 'Singapore Dollar', rate: 1.2913, locale: 'en-SG' }
  ],
  projectTypes: [
    {
      id: 'business-website',
      label: 'Business website',
      description: 'A conversion-focused website for a service business or personal brand.',
      basePrice: 2500,
      included: [
        'Up to 5 core pages',
        'Responsive custom layout',
        'Lead form and basic analytics',
        'Basic search setup',
        'Deployment and handover'
      ]
    },
    {
      id: 'ecommerce',
      label: 'E-commerce store',
      description: 'Products, payments, orders, delivery rules, and launch support.',
      basePrice: 5500,
      included: [
        'Storefront and product catalogue',
        'Payment gateway setup',
        'Order management',
        'Basic delivery rules',
        'Admin training and launch support'
      ]
    },
    {
      id: 'web-app',
      label: 'Custom web app or portal',
      description: 'A tailored system with users, workflows, and business logic.',
      basePrice: 9000,
      included: [
        'Secure user authentication',
        'One core business workflow',
        'Database and API foundation',
        'Basic admin controls',
        'Deployment and technical handover'
      ]
    },
    {
      id: 'dashboard',
      label: 'Dashboard and reporting',
      description: 'Business reporting, analytics, and decision-ready views.',
      basePrice: 4500,
      included: [
        'Up to 2 data sources',
        'Core KPI views and filters',
        'Secure access',
        'Export-ready reporting',
        'Dashboard handover'
      ]
    },
    {
      id: 'ai-automation',
      label: 'AI workflow or automation',
      description: 'Automate repetitive admin, follow-ups, documents, or support.',
      basePrice: 4000,
      included: [
        'One defined automation workflow',
        'Up to 2 integrations',
        'Testing and error handling',
        'Usage documentation',
        'Team handover'
      ]
    },
    {
      id: 'site-improvement',
      label: 'Improve an existing site',
      description: 'A focused UX, speed, SEO, conversion, or reliability upgrade.',
      basePrice: 1250,
      included: [
        'Technical and UX audit',
        'Prioritised improvement plan',
        'Focused implementation',
        'Before-and-after checks',
        'Change handover'
      ]
    },
    {
      id: 'consulting-training',
      label: 'Consulting or team training',
      description: 'A practical audit, workshop, implementation plan, or handover.',
      basePrice: 900,
      included: [
        'Discovery session',
        'Practical workshop or audit',
        'Written recommendations',
        'Prioritised roadmap',
        'One follow-up session'
      ]
    },
    {
      id: 'not-sure',
      label: 'I need help choosing',
      description: 'Share the outcome you need and I will recommend the right approach.',
      basePrice: null,
      included: []
    }
  ],
  scopes: [
    {
      id: 'focused',
      label: 'Launch',
      description: 'One clear outcome with the essentials needed to launch well.',
      multiplier: 1
    },
    {
      id: 'growth',
      label: 'Growth',
      description: 'More content, workflows, integrations, and room to scale.',
      multiplier: 1.4
    },
    {
      id: 'advanced',
      label: 'Advanced',
      description: 'Complex journeys, custom logic, or multiple user types.',
      multiplier: 1.9
    }
  ],
  timelines: [
    {
      id: 'flexible',
      label: 'Flexible, 8+ weeks',
      description: 'Best value when the launch date can move.',
      multiplier: 1
    },
    {
      id: 'standard',
      label: 'Standard, 4 to 8 weeks',
      description: 'A realistic delivery window for most launch packages.',
      multiplier: 1
    },
    {
      id: 'priority',
      label: 'Priority, 2 to 4 weeks',
      description: 'Reserved capacity and a tighter feedback schedule.',
      multiplier: 1.15
    },
    {
      id: 'urgent',
      label: 'Urgent, under 2 weeks',
      description: 'Only available after a feasibility check.',
      multiplier: 1.3
    }
  ],
  features: [
    {
      id: 'strategy-copy',
      label: 'Strategy and copy support',
      description: 'Positioning, page structure, and polished conversion copy.',
      price: 500
    },
    {
      id: 'brand-ui',
      label: 'Brand and custom UI direction',
      description: 'A stronger visual system beyond a straightforward implementation.',
      price: 800
    },
    {
      id: 'cms',
      label: 'Easy content management',
      description: 'Update pages, posts, products, or content without a developer.',
      price: 650
    },
    {
      id: 'payments-bookings',
      label: 'Payments or bookings',
      description: 'Checkout, subscriptions, appointments, or payment workflows.',
      price: 1000
    },
    {
      id: 'integrations',
      label: 'Third-party integrations',
      description: 'Connect your CRM, accounting, messaging, or existing systems.',
      price: 1200
    },
    {
      id: 'admin-portal',
      label: 'Admin portal',
      description: 'Secure internal tools to manage users, content, orders, or operations.',
      price: 2200
    },
    {
      id: 'ai-feature',
      label: 'AI or automation feature',
      description: 'A practical assistant, workflow, extraction, or generation capability.',
      price: 1800
    },
    {
      id: 'seo-analytics',
      label: 'SEO and analytics setup',
      description: 'Search foundations, measurement, events, and reporting.',
      price: 600
    }
  ],
  budgetOptions: [
    {
      id: 'under-2k',
      label: 'Under $2,000',
      description: 'Best for an audit, consultation, or tightly focused improvement.',
      minimum: null,
      ceiling: 2000
    },
    {
      id: '2k-5k',
      label: '$2,000 to $5,000',
      description: 'Suitable for focused websites, upgrades, or smaller automations.',
      minimum: 2000,
      ceiling: 5000
    },
    {
      id: '5k-10k',
      label: '$5,000 to $10,000',
      description: 'Suitable for growth websites, stores, dashboards, and integrations.',
      minimum: 5000,
      ceiling: 10000
    },
    {
      id: '10k-20k',
      label: '$10,000 to $20,000',
      description: 'Suitable for custom apps, portals, and more involved systems.',
      minimum: 10000,
      ceiling: 20000
    },
    {
      id: '20k-plus',
      label: '$20,000+',
      description: 'Suitable for advanced products or phased business systems.',
      minimum: 20000,
      ceiling: null
    },
    {
      id: 'not-sure',
      label: 'Not sure yet',
      description: 'I need help defining the scope before setting a budget.',
      minimum: null,
      ceiling: null
    }
  ],
  carePlans: [
    {
      id: 'self-managed',
      label: 'No monthly plan',
      description: 'You arrange hosting and request updates only when needed.',
      monthlyPrice: 0,
      hostingIncluded: false,
      included: ['Deployment handover', 'Hosting recommendations', 'Updates quoted separately']
    },
    {
      id: 'hosting-only',
      label: 'Managed hosting',
      description: 'Reliable hosting without an ongoing content or development allowance.',
      monthlyPrice: 49,
      hostingIncluded: true,
      included: ['Managed hosting', 'SSL certificate', 'Uptime monitoring', 'Weekly backups']
    },
    {
      id: 'care',
      label: 'Care plan',
      description: 'Hosting plus routine maintenance and a small monthly update allowance.',
      monthlyPrice: 149,
      hostingIncluded: true,
      included: [
        'Everything in managed hosting',
        'Dependency and security updates',
        '30 minutes of content changes',
        'Monthly health check'
      ]
    },
    {
      id: 'growth-support',
      label: 'Growth support',
      description: 'Priority ongoing support for businesses actively improving their digital systems.',
      monthlyPrice: 349,
      hostingIncluded: true,
      included: [
        'Everything in the Care plan',
        '2 hours of changes or improvements',
        'Monthly analytics review',
        'Priority support'
      ]
    }
  ]
};

const isFiniteNonNegative = (value) =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0;

const hasUniqueIds = (items) => {
  if (!Array.isArray(items) || items.length === 0) return false;
  const ids = items.map((item) => item?.id);
  return ids.every((id) => typeof id === 'string' && /^[a-z0-9-]+$/.test(id)) &&
    new Set(ids).size === ids.length;
};

export const validatePricingConfig = (config) => {
  if (!config || typeof config !== 'object') return 'Pricing configuration is missing.';
  if (!Number.isInteger(config.version) || config.version < 1) return 'Version must be a positive integer.';
  if (config.currency !== 'USD') return 'Base currency must be USD.';
  if (!isFiniteNonNegative(config.rounding) || config.rounding < 1) return 'Rounding must be at least 1.';
  if (typeof config.rangeMultiplier !== 'number' || config.rangeMultiplier < 1 || config.rangeMultiplier > 2) {
    return 'Range multiplier must be between 1 and 2.';
  }
  if (typeof config.quoteDisclaimer !== 'string' || config.quoteDisclaimer.trim().length < 20) {
    return 'Add a clear pricing disclaimer.';
  }
  if (!Array.isArray(config.displayCurrencies) || config.displayCurrencies.length === 0) {
    return 'Add at least one display currency.';
  }
  const currencyCodes = config.displayCurrencies.map((item) => item?.code);
  if (
    config.displayCurrencies.some(
      (item) =>
        typeof item?.code !== 'string' ||
        !/^[A-Z]{3}$/.test(item.code) ||
        typeof item.label !== 'string' ||
        item.label.trim().length === 0 ||
        typeof item.locale !== 'string' ||
        item.locale.trim().length === 0 ||
        typeof item.rate !== 'number' ||
        !Number.isFinite(item.rate) ||
        item.rate <= 0
    ) ||
    new Set(currencyCodes).size !== currencyCodes.length
  ) {
    return 'Every display currency needs a unique three-letter code, label, locale, and positive rate.';
  }
  const usd = config.displayCurrencies.find((item) => item.code === 'USD');
  if (!usd || usd.rate !== 1) return 'USD must be included with a rate of 1.';
  if (typeof config.ratesUpdatedAt !== 'string' || Number.isNaN(Date.parse(config.ratesUpdatedAt))) {
    return 'Add a valid exchange-rate update date.';
  }

  const collections = [
    ['project types', config.projectTypes],
    ['scope packages', config.scopes],
    ['timelines', config.timelines],
    ['features', config.features],
    ['budget options', config.budgetOptions],
    ['care plans', config.carePlans]
  ];
  for (const [label, items] of collections) {
    if (!hasUniqueIds(items)) return `Use unique, URL-safe IDs for ${label}.`;
  }

  if (
    config.projectTypes.some(
      (item) =>
        typeof item.label !== 'string' ||
        typeof item.description !== 'string' ||
        !Array.isArray(item.included) ||
        (item.basePrice !== null && !isFiniteNonNegative(item.basePrice))
    )
  ) {
    return 'Every service needs a label, description, inclusions, and a valid base price.';
  }
  if (config.scopes.some((item) => typeof item.multiplier !== 'number' || item.multiplier < 0.5 || item.multiplier > 5)) {
    return 'Scope multipliers must be between 0.5 and 5.';
  }
  if (config.timelines.some((item) => typeof item.multiplier !== 'number' || item.multiplier < 0.5 || item.multiplier > 5)) {
    return 'Timeline multipliers must be between 0.5 and 5.';
  }
  if (config.features.some((item) => !isFiniteNonNegative(item.price))) {
    return 'Add-on prices must be zero or more.';
  }
  if (
    config.budgetOptions.some(
      (item) =>
        (item.minimum !== null && !isFiniteNonNegative(item.minimum)) ||
        (item.ceiling !== null && !isFiniteNonNegative(item.ceiling)) ||
        (item.minimum !== null && item.ceiling !== null && item.minimum > item.ceiling)
    )
  ) {
    return 'Budget minimums and ceilings must be valid USD amounts.';
  }
  if (
    config.carePlans.some(
      (item) =>
        !isFiniteNonNegative(item.monthlyPrice) ||
        typeof item.hostingIncluded !== 'boolean' ||
        !Array.isArray(item.included)
    )
  ) {
    return 'Every care plan needs a monthly price, hosting choice, and inclusions.';
  }
  return null;
};

const roundTo = (value, increment) => Math.round(value / increment) * increment;

export const calculateQuoteFromConfig = (
  config,
  projectTypeId,
  scopeId,
  timelineId,
  featureIds,
  carePlanId
) => {
  const projectType = config.projectTypes.find((option) => option.id === projectTypeId);
  const scope = config.scopes.find((option) => option.id === scopeId);
  const timeline = config.timelines.find((option) => option.id === timelineId);
  const carePlan = config.carePlans.find((option) => option.id === carePlanId);

  if (!projectType || projectType.basePrice === null || !scope || !timeline || !carePlan) {
    return null;
  }

  const featureTotal = config.features
    .filter((feature) => featureIds.includes(feature.id))
    .reduce((total, feature) => total + feature.price, 0);
  const minimum = roundTo(
    (projectType.basePrice * scope.multiplier + featureTotal) * timeline.multiplier,
    config.rounding
  );

  return {
    minimum,
    maximum: roundTo(minimum * config.rangeMultiplier, config.rounding),
    monthly: carePlan.monthlyPrice,
    hostingIncluded: carePlan.hostingIncluded
  };
};
