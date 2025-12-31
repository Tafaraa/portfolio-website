import { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

type JulieAction = {
  type: 'whatsapp';
  label: string;
  href: string;
};

type ChatMessage = {
  id: string;
  role: 'user' | 'julie';
  text: string;
  actions?: JulieAction[];
};

const WHATSAPP_NUMBER_E164 = '27606249151';

const buildWhatsAppLink = (text: string) => {
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encoded}`;
};

const normalize = (value: string) => value.toLowerCase().trim();

const JulieChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [hasShownIntro, setHasShownIntro] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const lastJokeIndexRef = useRef<number | null>(null);
  const jokePoolRef = useRef<number[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'julie-hello',
      role: 'julie',
      text: "Hi! I'm Julie — Tafara’s personal assistant. I’m still in development, but you can ask me about Tafara’s services, projects, or just chat.",
    },
  ]);

  const listRef = useRef<HTMLDivElement>(null);

  const jokes = useMemo(
    () => [
      "Why do programmers prefer dark mode? Because light attracts bugs.",
      "I told my computer I needed a break… now it won’t stop sending me KitKat ads.",
      "Why did the developer go broke? Because they used up all their cache.",
      "Why did the function return early? It had commitment issues.",
      "What do you call 8 hobbits? A hobbyte.",
      "Why did the database admin leave their partner? Too many relations.",
      "I tried to catch some fog earlier… I mist.",
      "Why did the coder get kicked out of the beach? Because they kept shouting ‘undefined!’ at the waves.",
      "Why did the JavaScript developer wear glasses? Because they couldn’t C#.",
      "I asked my laptop if it had any jokes… it said, ‘No, but I do have a lot of memory.’",
      "Why was the developer calm? Because they had good exception handling.",
      "What’s a programmer’s favorite hangout place? The Foo Bar.",
      "Why did the API go to therapy? It couldn’t handle requests.",
      "Debugging: removing the needles from the haystack.",
      "Why did the computer keep sneezing? It had a virus.",
      "Why did the developer cross the road? To refactor the other side.",
    ],
    []
  );

  const servicesText =
    "Tafara can help with: full‑stack web development (React), website creation services, Python apps/APIs, data engineering, machine learning/AI features, and general software consulting.";

  useEffect(() => {
    jokePoolRef.current = Array.from({ length: jokes.length }, (_, i) => i);
    lastJokeIndexRef.current = null;
  }, [jokes.length]);

  const getNextJoke = () => {
    if (jokes.length === 0) return "I’m out of jokes… which is suspicious for an assistant. Try again in a minute.";

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

  const getJulieResponse = (raw: string): ChatMessage => {
    const text = normalize(raw);

    const wantsContact =
      /(whatsapp|contact|reach|call|phone|number|email|hire|quote|project|work with you|work with tafara)/i.test(
        text
      );

    if (wantsContact) {
      const href = buildWhatsAppLink(
        "Hi Tafara, I came from your portfolio site. I’d like to discuss your services."
      );
      return {
        id: `julie-${Date.now()}`,
        role: 'julie',
        text: "Sure — the quickest way is WhatsApp. Tap below to start a chat with Tafara.",
        actions: [{ type: 'whatsapp', label: 'Open WhatsApp', href }],
      };
    }

    const wantsJoke = /(joke|funny|make me laugh|humou?r)/i.test(text);
    if (wantsJoke) {
      const joke = getNextJoke();
      return { id: `julie-${Date.now()}`, role: 'julie', text: joke };
    }

    const asksServices = /(service|offer|do you do|what can you do|help with|pricing|price|cost|rates)/i.test(
      text
    );
    if (asksServices) {
      const href = buildWhatsAppLink(
        "Hi Tafara, I’m interested in a project. Can we chat about your services?"
      );
      return {
        id: `julie-${Date.now()}`,
        role: 'julie',
        text: `${servicesText}\n\nIf you’d like to discuss a project, you can message Tafara on WhatsApp:`,
        actions: [{ type: 'whatsapp', label: 'Open WhatsApp', href }],
      };
    }

    const greeting = /^(hi|hey|hello|yo|how are you|sup)\b/i.test(text);
    if (greeting) {
      return {
        id: `julie-${Date.now()}`,
        role: 'julie',
        text: "Hi! I’m Julie. Ask me about Tafara’s services, or say ‘tell me a joke’, or type ‘contact’ to WhatsApp him.",
      };
    }

    return {
      id: `julie-${Date.now()}`,
      role: 'julie',
      text: "I’m still learning (in development). I can answer about services, tell a joke, or help you contact Tafara on WhatsApp. What would you like?",
    };
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    window.setTimeout(() => {
      const reply = getJulieResponse(trimmed);
      setMessages((prev) => [...prev, reply]);
    }, 250);
  };

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isOpen]);

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
    <div className="julie-chat fixed bottom-6 left-6 z-50">
      {isOpen && (
        <div className="mb-3 w-[92vw] max-w-[380px] overflow-hidden rounded-2xl border border-stone-200 bg-white/90 backdrop-blur-md shadow-2xl dark:border-dark-border dark:bg-dark-surface/90">
          <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3 dark:border-dark-border">
            <div className="min-w-0">
              <p className="font-medium text-stone-900 dark:text-dark-text">Julie</p>
              <p className="text-xs text-stone-600 dark:text-dark-muted">In development</p>
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

          <div ref={listRef} className="max-h-[55vh] overflow-y-auto px-4 py-3">
            <div className="space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={
                    m.role === 'user'
                      ? 'flex justify-end'
                      : 'flex justify-start'
                  }
                >
                  <div
                    className={
                      m.role === 'user'
                        ? 'max-w-[85%] rounded-2xl bg-stone-900 px-3 py-2 text-sm text-stone-50 dark:bg-dark-border'
                        : 'max-w-[85%] rounded-2xl bg-stone-100 px-3 py-2 text-sm text-stone-900 dark:bg-dark-bg dark:text-dark-text'
                    }
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    {m.actions && m.actions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.actions.map((a) => (
                          <a
                            key={a.href}
                            href={a.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center rounded-full bg-primary-600 px-3 py-1 text-xs font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400"
                          >
                            {a.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => sendMessage('What services do you offer?')}
                className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs text-stone-800 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:hover:bg-dark-border/40 dark:focus:ring-dark-accent"
              >
                Services
              </button>
              <button
                type="button"
                onClick={() => sendMessage('Tell me a joke')}
                className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs text-stone-800 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:hover:bg-dark-border/40 dark:focus:ring-dark-accent"
              >
                Joke
              </button>
              <button
                type="button"
                onClick={() => sendMessage('Contact Tafara on WhatsApp')}
                className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs text-stone-800 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:hover:bg-dark-border/40 dark:focus:ring-dark-accent"
              >
                Contact
              </button>
            </div>
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
              placeholder="Message Julie…"
              className="h-11 flex-1 rounded-xl border border-stone-200 bg-white px-3 text-sm text-stone-900 shadow-sm outline-none focus:ring-2 focus:ring-stone-500 dark:border-dark-border dark:bg-dark-bg dark:text-dark-text dark:focus:ring-dark-accent"
              aria-label="Message input"
            />
            <button
              type="submit"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-stone-900 text-stone-50 shadow-sm hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-400"
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
            className="absolute bottom-16 left-0 w-[calc(100vw-3rem)] max-w-[280px] rounded-2xl border border-stone-200 bg-white/95 px-3 py-2 text-left text-xs text-stone-800 shadow-xl backdrop-blur-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-stone-500 dark:border-dark-border dark:bg-dark-surface/95 dark:text-dark-text dark:hover:bg-dark-surface dark:focus:ring-dark-accent"
            aria-label="Open Julie assistant"
          >
            <span className="block font-medium">Julie (in development)</span>
            <span className="mt-0.5 block text-stone-600 dark:text-dark-muted">
              Hi, I’m Julie — Tafara’s personal assistant. Tap to chat.
            </span>
            <span
              aria-hidden="true"
              className="absolute -bottom-2 left-7 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-stone-200 bg-white/95 dark:border-dark-border dark:bg-dark-surface/95"
            />
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
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
