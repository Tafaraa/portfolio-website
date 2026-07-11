import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Bot,
  Briefcase,
  ExternalLink,
  MessageCircle,
  Send,
  Sparkles,
  X
} from 'lucide-react';

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

const quickPrompts = [
  'What can Tafara do?',
  'Get my business online',
  'Set up AI workflows for me',
  'How much does this cost?',
  'Recommend a project',
  'Talk to Tafara'
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
    question: "What are the must-haves? A rough list is perfect — pages, features, whatever's in your head."
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
    question: 'Last one — what name or business should Tafara see in the WhatsApp message?'
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
        "Hey — I'm Julie, I run point on Tafara's site. Tell me what you're after: getting your business online, selling, automating the boring admin, or hiring him. I'll point you the right way or tee up a WhatsApp intro.",
      actions: [
        { type: 'prompt', label: 'What can he do?', value: 'What can Tafara do?' },
        { type: 'prompt', label: 'Build my brief', value: 'Start guided project brief' },
        { type: 'prompt', label: 'Show me examples', value: 'Recommend a project for my idea' }
      ]
    }
  ]);

  const listRef = useRef<HTMLDivElement>(null);

  const jokes = useMemo(
    () => [
      'Why do programmers prefer dark mode? Because light attracts bugs.',
      'Why did the developer go broke? Because they used up all their cache.',
      'Why was the developer calm? Because they had good exception handling.',
      'Why did the API go to therapy? It could not handle requests.',
      'Debugging: removing the needles from the haystack.',
      'Why did the developer cross the road? To refactor the other side.'
    ],
    []
  );

  const servicesText =
    'Tafara builds business websites and online stores, sets up AI workflows and automations that cut admin, builds dashboards and data tools, and trains teams to actually run it all. He also fixes up and speeds up existing sites.';

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

    if (/(price|pricing|cost|budget|rate|rates|how much)/i.test(text)) {
      return {
        id,
        role: 'julie',
        text:
          "Honest answer: it depends on scope. A simple business site is smaller than a full store, a dashboard, or an AI workflow setup. Quickest way to a real number — tell me the type of project, your deadline, and 2-3 must-haves, and I'll pass it straight to Tafara.",
        actions: [
          {
            type: 'prompt',
            label: 'Build quote brief',
            value: 'Start guided project brief'
          },
          { type: 'prompt', label: 'What details should I send?', value: 'What should I include in a project brief?' }
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
          "Yes — this is a big part of what Tafara does. He hooks up the tools you already use so the repetitive stuff (quotes, bookings, follow-ups, data entry) runs itself in the background, and he can add a smart chatbot or assistant on top. He'll also train your team so you're not dependent on him forever.",
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
          "For sure. Tafara doesn't just build and disappear — he sets the system up, then walks your team through actually running it, with a proper handover and simple docs so it sticks.",
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
          "Perfect starting point. Tafara can get you a proper online presence from scratch — a site or store that makes you look legit, shows up on Google, and actually brings in enquiries. Then he can layer on payments, bookings, and automation as you grow.",
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
          "Hey! Quick version — ask me what Tafara can do, get a project recommendation, sort out pricing or timelines, or I'll set up a WhatsApp intro. What are you working on?",
        actions: quickPrompts.slice(0, 4).map((prompt) => ({
          type: 'prompt',
          label: prompt.replace('Tafara ', ''),
          value: prompt
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
        label: prompt,
        value: prompt
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
        <div className="mb-3 w-[calc(100vw-2rem)] max-w-[400px] overflow-hidden rounded-2xl border border-stone-200 bg-white/95 backdrop-blur-md shadow-2xl dark:border-dark-border dark:bg-dark-surface/95">
          <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3 dark:border-dark-border">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white">
                <Bot size={20} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-stone-900 dark:text-dark-text">Julie</p>
                <p className="text-xs text-stone-600 dark:text-dark-muted">Here to help you get started</p>
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

          <div className="border-b border-stone-200 bg-stone-50/80 px-4 py-3 dark:border-dark-border dark:bg-dark-bg/60">
            <div className="flex items-center gap-2 text-xs font-medium text-stone-700 dark:text-dark-text">
              <Sparkles size={14} className="text-primary-600" aria-hidden="true" />
              {briefFlow
                ? `Project brief: question ${briefFlow.step + 1} of ${briefQuestions.length}`
                : 'Try: "Get my business online" or "Set up AI workflows"'}
            </div>
          </div>

          <div ref={listRef} className="max-h-[52vh] overflow-y-auto px-4 py-3">
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
                  <div className="rounded-2xl bg-stone-100 px-3 py-2 text-sm text-stone-700 dark:bg-dark-bg dark:text-dark-text">
                    Julie is thinking...
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
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-left text-xs font-medium text-stone-800 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:hover:bg-dark-border/40 dark:focus:ring-dark-accent"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="flex items-center gap-2 border-t border-stone-200 px-3 py-3 dark:border-dark-border"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={briefFlow ? 'Type your answer...' : 'Ask Julie about projects...'}
              className="h-11 flex-1 rounded-xl border border-stone-200 bg-white px-3 text-sm text-stone-900 shadow-sm outline-none focus:ring-2 focus:ring-stone-500 dark:border-dark-border dark:bg-dark-bg dark:text-dark-text dark:focus:ring-dark-accent"
              aria-label="Message input"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-stone-900 text-stone-50 shadow-sm hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-400"
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
              I'll help you figure out how Tafara can help — takes 30 seconds.
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
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-2xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400"
          aria-label={isOpen ? 'Close Julie chat' : 'Open Julie chat'}
          title={isOpen ? 'Close Julie' : 'Chat with Julie'}
        >
          <MessageCircle size={24} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default JulieChatWidget;
