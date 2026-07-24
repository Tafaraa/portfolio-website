import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  ExternalLink,
  MessageCircle,
  Send,
  Sparkles,
  X
} from 'lucide-react';
import {
  DEFAULT_PRICING_CONFIG,
  formatMoney,
  loadPublishedPricing,
  type PricingConfig
} from '../../lib/quoteCalculator';

type JulieAction =
  | {
      type: 'whatsapp' | 'link';
      label: string;
      href: string;
    }
  | {
      type: 'prompt';
      label: string;
      value: string;
    };

type ChatMessage = {
  id: string;
  role: 'user' | 'julie';
  text: string;
  actions?: JulieAction[];
};

type ProjectSuggestion = {
  title: string;
  summary: string;
  href: string;
  keywords: string[];
};

type BriefAnswerKey = 'projectType' | 'goal' | 'features' | 'timeline' | 'budget' | 'contact';

type BriefQuestion = {
  key: BriefAnswerKey;
  question: string;
};

type BriefFlow = {
  step: number;
  answers: Partial<Record<BriefAnswerKey, string>>;
};

const WHATSAPP_NUMBER_E164 = '27606249151';

const buildWhatsAppLink = (text: string) => {
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encoded}`;
};

const normalize = (value: string) => value.toLowerCase().trim();

const projectSuggestions: ProjectSuggestion[] = [
  {
    title: 'BabyEmporium',
    summary: 'Online store with inventory, orders, and WhatsApp ordering built in.',
    href: 'https://www.babyemporium.co.zw/',
    keywords: ['shop', 'store', 'ecommerce', 'e-commerce', 'inventory', 'orders', 'whatsapp', 'sell', 'online']
  },
  {
    title: 'Dr Metuse',
    summary: 'Clinic website plus an admin system that runs bookings, content, payments and daily ops.',
    href: 'https://drmetuseplasticsurgeon.co.za/',
    keywords: ['booking', 'clinic', 'admin', 'dashboard', 'payment', 'medical', 'automate', 'automation', 'system']
  },
  {
    title: 'SkillLens',
    summary: 'An AI tool that turns GitHub activity into clear skill insights.',
    href: 'https://skill-lens.vercel.app/',
    keywords: ['ai', 'data', 'analytics', 'machine learning', 'developer', 'dashboard', 'workflow', 'automation']
  },
  {
    title: 'Okra Advisory',
    summary: 'A clean consulting site built to look sharp and pull in enquiries.',
    href: 'https://okraadvisory.co.za/',
    keywords: ['consulting', 'business', 'brand', 'website', 'leads', 'online', 'presence']
  }
];

// `label` is the short text on the chip/button, `value` is the full question sent
// to Julie. Keeping them separate avoids mangled labels from string replacement.
const quickPrompts: { label: string; value: string }[] = [
  { label: 'What can he do?', value: 'What can Tafara do?' },
  { label: 'Get my business online', value: 'Get my business online' },
  { label: 'Set up AI workflows', value: 'Set up AI workflows for me' },
  { label: 'How much does it cost?', value: 'How much does this cost?' },
  { label: 'Recommend a project', value: 'Recommend a project for my idea' },
  { label: 'Talk to Tafara', value: 'Talk to Tafara' }
];

const briefQuestions: BriefQuestion[] = [
  {
    key: 'projectType',
    question: "Cool. What do you want Tafara to help with? e.g. a website, online store, AI workflow/automation, a dashboard, team training, or fixing up an existing site."
  },
  {
    key: 'goal',
    question: "What's the main goal? e.g. get more enquiries, sell online, cut admin time, understand your numbers, or get the team trained up."
  },
  {
    key: 'features',
    question: "What are the must-haves? A rough list is perfect: pages, features, whatever's in your head."
  },
  {
    key: 'timeline',
    question: "When do you want it live? A date, a month, or just 'asap' all work."
  },
  {
    key: 'budget',
    question: 'Got a budget range in mind? "Not sure yet" is a totally fine answer too.'
  },
  {
    key: 'contact',
    question: 'Last one: what name or business should Tafara see in the WhatsApp message?'
  }
];

const JulieChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [briefFlow, setBriefFlow] = useState<BriefFlow | null>(null);
  const [hasShownIntro, setHasShownIntro] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const lastJokeIndexRef = useRef<number | null>(null);
  const jokePoolRef = useRef<number[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'julie-hello',
      role: 'julie',
      text:
        "Hey, I'm Julie, I run point on Tafara's site. Tell me what you're after: getting your business online, selling, automating the boring admin, or hiring him. I'll point you the right way or tee up a WhatsApp intro.",
      actions: [
        { type: 'prompt', label: 'What can he do?', value: 'What can Tafara do?' },
        { type: 'prompt', label: 'Build my brief', value: 'Start guided project brief' },
        { type: 'prompt', label: 'Show me examples', value: 'Recommend a project for my idea' }
      ]
    }
  ]);

  const listRef = useRef<HTMLDivElement>(null);

  // Live pricing/services, pulled from the same published config the contact form
  // and admin dashboard use. Change a price, service label or wording in the DB
  // and Julie's answers update automatically, no code change needed.
  const [pricing, setPricing] = useState<PricingConfig>(DEFAULT_PRICING_CONFIG);

  useEffect(() => {
    let active = true;
    loadPublishedPricing().then((config) => {
      if (active) setPricing(config);
    });
    return () => {
      active = false;
    };
  }, []);

  const jokes = useMemo(
    () => [
      'Why do programmers prefer dark mode? Because light attracts bugs.',
      'Why did the developer go broke? Because they used up all their cache.',
      'Why was the developer calm during the outage? Great exception handling.',
      'Why did the API go to therapy? It couldn\'t handle all the requests.',
      'Debugging is just removing the needles you added to the haystack.',
      'Why did the developer cross the road? To refactor the other side.',
      'A SQL query walks into a bar, sees two tables, and asks: "Mind if I join you?"',
      'Why do Java developers wear glasses? Because they don\'t C#.',
      'There are only 10 kinds of people: those who read binary and those who don\'t.',
      'Why was the function sad after the party? It didn\'t get a single call back.',
      'I\'d tell you a UDP joke, but you might not get it.',
      'How do you comfort a JavaScript bug? You console it.',
      'Why did the database break up with the spreadsheet? It wanted a real relationship.',
      'My code doesn\'t work and I have no idea why. My code works and I have no idea why.',
      'Why did the AI cross the road? It was trained on chicken data.',
      'Why don\'t robots ever panic? They keep everything under control-flow.',
      '99 little bugs in the code, patch one down, 127 little bugs in the code.',
      'A byte walked into a bar looking rough. Bartender asked: "Rough day?" It said: "Parity error."',
      'Why did the startup hire a baker? They needed someone who understood raising dough and scaling.',
      'Automation is doing in 3 hours what would\'ve taken you 3 minutes to do by hand. Then never doing it again.',
      'Why was the spreadsheet always invited to meetings? It brought all the cells... I mean, skills.',
      'To the person who stole my dark mode: I hope your screen brightness is stuck at 100%.'
    ],
    []
  );

  // Built from the live config so the service list always matches the DB wording.
  const sellableProjects = useMemo(
    () => pricing.projectTypes.filter((project) => project.basePrice !== null),
    [pricing]
  );

  const servicesText = useMemo(() => {
    const labels = sellableProjects.map((project) => project.label.toLowerCase());
    if (labels.length === 0) {
      return 'Tafara builds websites, online stores, dashboards, and AI workflows, and trains teams to run them.';
    }
    const list =
      labels.length > 1
        ? `${labels.slice(0, -1).join(', ')} and ${labels[labels.length - 1]}`
        : labels[0];
    return `Tafara handles ${list}, then trains your team so you're not stuck depending on him forever.`;
  }, [sellableProjects]);

  // A real, DB-accurate price rundown (base prices are in USD, the pricing base).
  const buildPricingText = () => {
    const lines = sellableProjects
      .map((project) => `• ${project.label}: from ${formatMoney(project.basePrice as number, pricing.currency)}`)
      .join('\n');
    const paidCarePlans = pricing.carePlans.filter((plan) => plan.monthlyPrice > 0);
    const carePlanLine =
      paidCarePlans.length > 0
        ? `\n\nOngoing care/hosting starts at ${formatMoney(
            Math.min(...paidCarePlans.map((plan) => plan.monthlyPrice)),
            pricing.currency
          )}/month (a no-fee self-managed option is available too).`
        : '';
    return `Here's the honest starting point (these are base prices, scope and features move the final number):\n\n${lines}${carePlanLine}\n\n${pricing.quoteDisclaimer}`;
  };

  useEffect(() => {
    jokePoolRef.current = Array.from({ length: jokes.length }, (_, i) => i);
    lastJokeIndexRef.current = null;
  }, [jokes.length]);

  const getNextJoke = () => {
    if (jokes.length === 0) return 'I am out of jokes for now. Suspicious, but recoverable.';

    let pool = jokePoolRef.current;
    if (pool.length === 0) {
      pool = Array.from({ length: jokes.length }, (_, i) => i);
    }

    if (jokes.length > 1 && pool.length === 1 && pool[0] === lastJokeIndexRef.current) {
      pool = Array.from({ length: jokes.length }, (_, i) => i).filter(
        (i) => i !== lastJokeIndexRef.current
      );
    }

    const pick = pool[Math.floor(Math.random() * pool.length)];
    jokePoolRef.current = pool.filter((i) => i !== pick);
    lastJokeIndexRef.current = pick;
    return jokes[pick];
  };

  const getProjectMatches = (text: string) => {
    const matches = projectSuggestions.filter((project) =>
      project.keywords.some((keyword) => text.includes(keyword))
    );
    return matches.length > 0 ? matches : projectSuggestions.slice(0, 3);
  };

  const buildBriefMessage = (answers: Partial<Record<BriefAnswerKey, string>>) =>
    [
      'Hi Tafara, I came from your portfolio site. Julie helped me prepare this project brief:',
      '',
      `Name/business: ${answers.contact || 'Not provided'}`,
      `Project type: ${answers.projectType || 'Not provided'}`,
      `Main goal: ${answers.goal || 'Not provided'}`,
      `Must-have features/pages: ${answers.features || 'Not provided'}`,
      `Timeline: ${answers.timeline || 'Not provided'}`,
      `Budget range: ${answers.budget || 'Not sure yet'}`,
      '',
      'Can we discuss the next step?'
    ].join('\n');

  const startBriefFlow = (initialProjectType?: string) => {
    const startsWithProjectType = !!initialProjectType?.trim();
    const nextFlow: BriefFlow = {
      step: startsWithProjectType ? 1 : 0,
      answers: startsWithProjectType ? { projectType: initialProjectType.trim() } : {}
    };
    const firstQuestion = briefQuestions[nextFlow.step];
    setBriefFlow(nextFlow);
    return {
      id: `julie-${Date.now()}`,
      role: 'julie' as const,
      text: startsWithProjectType
        ? `Perfect. I noted this as the project type: "${initialProjectType.trim()}". I will ask the remaining ${briefQuestions.length - 1} questions, then create the WhatsApp message for you.\n\n${firstQuestion.question}`
        : `Perfect. I will ask ${briefQuestions.length} quick questions, then I will create the WhatsApp message for you.\n\n${firstQuestion.question}`,
      actions: startsWithProjectType
        ? undefined
        : [
            { type: 'prompt' as const, label: 'Website', value: 'Website' },
            { type: 'prompt' as const, label: 'Dashboard', value: 'Dashboard' },
            { type: 'prompt' as const, label: 'E-commerce', value: 'E-commerce store' },
            { type: 'prompt' as const, label: 'AI/Data tool', value: 'AI/Data tool' }
          ]
    };
  };

  const handleBriefAnswer = (answer: string): ChatMessage => {
    const currentFlow = briefFlow ?? { step: 0, answers: {} };
    const currentQuestion = briefQuestions[currentFlow.step];
    const updatedAnswers = {
      ...currentFlow.answers,
      [currentQuestion.key]: answer
    };
    const nextStep = currentFlow.step + 1;

    if (nextStep < briefQuestions.length) {
      setBriefFlow({ step: nextStep, answers: updatedAnswers });
      const nextQuestion = briefQuestions[nextStep];
      return {
        id: `julie-${Date.now()}`,
        role: 'julie',
        text: `Got it.\n\n${nextQuestion.question}`,
        actions:
          nextQuestion.key === 'budget'
            ? [
                { type: 'prompt', label: 'Not sure yet', value: 'Not sure yet' },
                { type: 'prompt', label: 'Small starter budget', value: 'Small starter budget' },
                { type: 'prompt', label: 'Flexible for the right solution', value: 'Flexible for the right solution' }
              ]
            : undefined
      };
    }

    setBriefFlow(null);
    const whatsappText = buildBriefMessage(updatedAnswers);
    return {
      id: `julie-${Date.now()}`,
      role: 'julie',
      text:
        'Done. I prepared the WhatsApp message with your answers already filled in. Tap below, then just press send in WhatsApp.',
      actions: [
        {
          type: 'whatsapp',
          label: 'Send brief on WhatsApp',
          href: buildWhatsAppLink(whatsappText)
        },
        { type: 'prompt', label: 'Start over', value: 'Start guided project brief' }
      ]
    };
  };

  const getJulieResponse = (raw: string): ChatMessage => {
    const text = normalize(raw);
    const id = `julie-${Date.now()}`;

    const wantsContact =
      /(whatsapp|contact|reach|call|phone|number|email|hire|quote|project|work with|start|book)/i.test(text);

    const wantsProjectRecommendation =
      /(recommend|similar|example|portfolio|project|built|work|show|case study|ecommerce|e-commerce|dashboard|ai|data|booking|website)/i.test(text);
    const hasProjectIntent =
      /(i need|i want|looking for|build me|create me|make me|help me|need a|want a|need an|want an|get my|set ?up|automate|train)/i.test(text) &&
      /(website|site|dashboard|ecommerce|e-commerce|store|shop|booking|system|app|application|\bai\b|data|automation|workflow|portal|admin|online|digital|team|training)/i.test(text);

    if (/(start guided project brief|guided project brief|build my brief|create brief|project brief flow)/i.test(text)) {
      return startBriefFlow();
    }

    if (hasProjectIntent) {
      return startBriefFlow(raw);
    }

    if (/(joke|funny|make me laugh|humou?r)/i.test(text)) {
      return {
        id,
        role: 'julie',
        text: getNextJoke(),
        actions: [{ type: 'prompt', label: 'Another one', value: 'Tell me another joke' }]
      };
    }

    if (/(price|pricing|cost|budget|rate|rates|how much|quote)/i.test(text)) {
      return {
        id,
        role: 'julie',
        text: buildPricingText(),
        actions: [
          {
            type: 'prompt',
            label: 'Build my quote',
            value: 'Start guided project brief'
          },
          { type: 'link', label: 'Full estimator', href: '#contact' }
        ]
      };
    }

    if (/(timeline|how long|deadline|duration|take to build|delivery)/i.test(text)) {
      return {
        id,
        role: 'julie',
        text:
          'Rough guide: a focused landing/business site can be quick, a custom web app or dashboard takes longer, and e-commerce/admin systems need more planning because workflows, content, and testing matter. Tafara can give a better estimate once he knows the pages, features, and integrations.',
        actions: [
          { type: 'prompt', label: 'Brief checklist', value: 'What should I include in a project brief?' },
          {
            type: 'prompt',
            label: 'Build timeline brief',
            value: 'Start guided project brief'
          }
        ]
      };
    }

    if (/(brief|requirements|what should i send|prepare|before contacting)/i.test(text)) {
      return {
        id,
        role: 'julie',
        text:
          'I can collect the brief for you here, then pre-fill the WhatsApp message so you do not type it twice.',
        actions: [
          {
            type: 'prompt',
            label: 'Start guided brief',
            value: 'Start guided project brief'
          }
        ]
      };
    }

    if (/(ai workflow|automat|workflow|repetitive|manual work|admin work|chatbot|integrat|zapier|save time)/i.test(text)) {
      return {
        id,
        role: 'julie',
        text:
          "Yes, this is a big part of what Tafara does. He hooks up the tools you already use so the repetitive stuff (quotes, bookings, follow-ups, data entry) runs itself in the background, and he can add a smart chatbot or assistant on top. He'll also train your team so you're not dependent on him forever.",
        actions: [
          { type: 'prompt', label: 'Set this up for me', value: 'I want to set up AI workflows and automation' },
          { type: 'link', label: 'See what I do', href: '#skills' }
        ]
      };
    }

    if (/(train|training|teach|upskill|workshop|learn to use)/i.test(text)) {
      return {
        id,
        role: 'julie',
        text:
          "For sure. Tafara doesn't just build and disappear, he sets the system up, then walks your team through actually running it, with a proper handover and simple docs so it sticks.",
        actions: [
          { type: 'prompt', label: 'Set up training', value: 'I want training for my team' },
          { type: 'link', label: 'See what I do', href: '#skills' }
        ]
      };
    }

    if (/(get online|get my business online|online presence|digital presence|new to online|no website|first website|enter the market)/i.test(text)) {
      return {
        id,
        role: 'julie',
        text:
          "Perfect starting point. Tafara can get you a proper online presence from scratch, a site or store that makes you look legit, shows up on Google, and actually brings in enquiries. Then he can layer on payments, bookings, and automation as you grow.",
        actions: [
          { type: 'prompt', label: 'Get me online', value: 'I want to get my business online' },
          { type: 'link', label: 'See examples', href: '#projects' }
        ]
      };
    }

    if (/(service|offer|do you do|what can|help with|build|make|create)/i.test(text)) {
      return {
        id,
        role: 'julie',
        text: `${servicesText}\n\nBest fit if you need something practical: a site that brings leads, a system that saves admin time, or a dashboard that makes data easier to use.`,
        actions: [
          { type: 'link', label: 'View projects', href: '#projects' },
          { type: 'link', label: 'What I Do', href: '#about' },
          { type: 'prompt', label: 'Recommend a project', value: 'Recommend a project for my idea' }
        ]
      };
    }

    if (wantsProjectRecommendation) {
      const matches = getProjectMatches(text);
      return {
        id,
        role: 'julie',
        text: `These are the best portfolio examples to look at:\n\n${matches
          .map((project) => `- ${project.title}: ${project.summary}`)
          .join('\n')}`,
        actions: [
          ...matches.slice(0, 2).map((project) => ({
            type: 'link' as const,
            label: project.title,
            href: project.href
          })),
          { type: 'link', label: 'Projects section', href: '#projects' }
        ]
      };
    }

    if (wantsContact) {
      return {
        id,
        role: 'julie',
        text:
          'Sure. The best way is to let me collect the key details first, then I will pre-fill WhatsApp for you so you only press send.',
        actions: [
          {
            type: 'prompt',
            label: 'Start guided brief',
            value: 'Start guided project brief'
          }
        ]
      };
    }

    if (/^(hi|hey|hello|yo|how are you|sup)\b/i.test(text)) {
      return {
        id,
        role: 'julie',
        text:
          "Hey! Quick version, ask me what Tafara can do, get a project recommendation, sort out pricing or timelines, or I'll set up a WhatsApp intro. What are you working on?",
        actions: quickPrompts.slice(0, 4).map((prompt) => ({
          type: 'prompt',
          label: prompt.label,
          value: prompt.value
        }))
      };
    }

    return {
      id,
      role: 'julie',
      text:
        "I can help with services, project examples, pricing guidance, timelines, or contacting Tafara. Try one of these quick options:",
      actions: quickPrompts.slice(0, 4).map((prompt) => ({
        type: 'prompt',
        label: prompt.label,
        value: prompt.value
      }))
    };
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    const startsBrief = /^(start guided project brief|guided project brief|build my brief|create brief|project brief flow)$/i.test(trimmed);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    window.setTimeout(() => {
      const reply = briefFlow && !startsBrief ? handleBriefAnswer(trimmed) : getJulieResponse(trimmed);
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 350);
  };

  const handleAction = (action: JulieAction) => {
    if (action.type === 'prompt') {
      sendMessage(action.value);
    }
  };

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    if (isOpen) setShowNudge(false);

    if (isOpen && !hasShownIntro) {
      setHasShownIntro(true);
    }
  }, [hasShownIntro, isOpen]);

  useEffect(() => {
    if (hasShownIntro) return;

    const showTimer = window.setTimeout(() => setShowNudge(true), 2200);
    const hideTimer = window.setTimeout(() => setShowNudge(false), 9000);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [hasShownIntro]);

  return (
    <div className="julie-chat fixed bottom-5 left-4 z-50 sm:bottom-6 sm:left-6">
      {isOpen && (
        <div className="mb-3 flex h-[min(32rem,calc(100vh-7.5rem))] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white/95 shadow-2xl backdrop-blur-md supports-[height:100dvh]:h-[min(32rem,calc(100dvh-7.5rem))] dark:border-dark-border dark:bg-dark-surface/95">
          <div className="relative flex shrink-0 items-center justify-between border-b border-stone-200 bg-gradient-to-br from-sky-500/[0.08] to-transparent px-4 py-3 dark:border-dark-border dark:from-sky-400/[0.06]">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 font-bold text-white shadow-[0_6px_18px_rgba(14,165,233,0.35)]">
                  J
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-dark-surface" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-stone-900 dark:text-dark-text">Julie</p>
                <p className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-dark-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Online · usually replies instantly
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md p-2 text-stone-700 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:text-dark-text dark:hover:bg-dark-border/40 dark:focus:ring-dark-accent"
              aria-label="Close Julie chat"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="shrink-0 border-b border-stone-200 bg-stone-50/80 px-4 py-2.5 dark:border-dark-border dark:bg-dark-bg/60">
            <div className="flex items-center gap-2 text-xs font-medium text-stone-700 dark:text-dark-text">
              <Sparkles size={14} className="text-primary-600" aria-hidden="true" />
              {briefFlow
                ? `Project brief: question ${briefFlow.step + 1} of ${briefQuestions.length}`
                : 'Try: "Get my business online" or "Set up AI workflows"'}
            </div>
          </div>

          <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
                >
                  <div
                    className={
                      message.role === 'user'
                        ? 'max-w-[86%] rounded-2xl bg-stone-900 px-3 py-2 text-sm text-stone-50 dark:bg-dark-border'
                        : 'max-w-[90%] rounded-2xl bg-stone-100 px-3 py-2 text-sm text-stone-900 dark:bg-dark-bg dark:text-dark-text'
                    }
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    {message.actions && message.actions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.actions.map((action) =>
                          action.type === 'prompt' ? (
                            <button
                              key={action.label}
                              type="button"
                              onClick={() => handleAction(action)}
                              className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-800 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:hover:bg-dark-border/40"
                            >
                              {action.label}
                              <ArrowRight size={12} aria-hidden="true" />
                            </button>
                          ) : (
                            <a
                              key={action.href}
                              href={action.href}
                              target={action.href.startsWith('#') ? undefined : '_blank'}
                              rel={action.href.startsWith('#') ? undefined : 'noreferrer'}
                              className="inline-flex items-center gap-1 rounded-full bg-primary-600 px-3 py-1 text-xs font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400"
                            >
                              {action.label}
                              {action.type === 'link' && !action.href.startsWith('#') ? (
                                <ExternalLink size={12} aria-hidden="true" />
                              ) : null}
                            </a>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl bg-stone-100 px-3.5 py-3 dark:bg-dark-bg">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-stone-400 [animation-delay:-0.3s] dark:bg-dark-muted" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-stone-400 [animation-delay:-0.15s] dark:bg-dark-muted" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-stone-400 dark:bg-dark-muted" />
                  </div>
                </div>
              )}
            </div>

            {briefFlow ? (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setBriefFlow(null);
                    setMessages((prev) => [
                      ...prev,
                      {
                        id: `julie-${Date.now()}`,
                        role: 'julie',
                        text: 'No problem. I stopped the project brief flow. You can restart it anytime.'
                      }
                    ]);
                  }}
                  className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-800 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:hover:bg-dark-border/40 dark:focus:ring-dark-accent"
                >
                  Cancel brief
                </button>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {quickPrompts.slice(0, 4).map((prompt) => (
                  <button
                    key={prompt.value}
                    type="button"
                    onClick={() => sendMessage(prompt.value)}
                    className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-left text-xs font-medium text-stone-800 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:hover:bg-dark-border/40 dark:focus:ring-dark-accent"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="flex shrink-0 items-center gap-2 border-t border-stone-200 px-3 py-3 dark:border-dark-border"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={briefFlow ? 'Type your answer...' : 'Ask Julie about projects...'}
              /* 16px text stops iOS Safari from zooming the page in on focus. */
              className="h-11 w-full min-w-0 flex-1 rounded-xl border border-stone-200 bg-white px-3 text-base text-stone-900 shadow-sm outline-none focus:ring-2 focus:ring-stone-500 dark:border-dark-border dark:bg-dark-bg dark:text-dark-text dark:focus:ring-dark-accent"
              aria-label="Message input"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-stone-900 text-stone-50 shadow-sm hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-400"
              aria-label="Send message"
            >
              <Send size={18} aria-hidden="true" />
            </button>
          </form>
        </div>
      )}

      <div className="relative">
        {showNudge && !isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="absolute bottom-16 left-0 w-[calc(100vw-2rem)] max-w-[300px] rounded-2xl border border-stone-200 bg-white/95 px-3 py-2 text-left text-xs text-stone-800 shadow-xl backdrop-blur-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-stone-500 dark:border-dark-border dark:bg-dark-surface/95 dark:text-dark-text dark:hover:bg-dark-surface dark:focus:ring-dark-accent"
            aria-label="Open Julie assistant"
          >
            <span className="flex items-center gap-2 font-medium">
              <Briefcase size={14} aria-hidden="true" />
              Not sure where to start?
            </span>
            <span className="mt-0.5 block text-stone-600 dark:text-dark-muted">
              I'll help you figure out how Tafara can help, takes 30 seconds.
            </span>
            <span
              aria-hidden="true"
              className="absolute -bottom-2 left-7 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-stone-200 bg-white/95 dark:border-dark-border dark:bg-dark-surface/95"
            />
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-sm transition-transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-transparent"
          aria-label={isOpen ? 'Close Julie chat' : 'Open Julie chat'}
          title={isOpen ? 'Close Julie' : 'Chat with Julie'}
        >
          <span className="relative">
            {isOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <MessageCircle size={24} className="julie-chat-icon-pulse" aria-hidden="true" />
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default JulieChatWidget;
