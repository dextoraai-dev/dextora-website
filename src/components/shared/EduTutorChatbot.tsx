"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Bot, User, BookOpen, RotateCcw, ChevronDown, CheckCircle2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const PRESET_QUESTIONS = [
  {
    topic: "NCERT Class 10 Math",
    q: "Explain why sin²θ + cos²θ = 1 intuitively with a right triangle.",
    qHi: "समकोण त्रिभुज की सहायता से समझाएं कि sin²θ + cos²θ = 1 क्यों होता है?",
  },
  {
    topic: "UPSC GS-2 Polity",
    q: "What is the Doctrine of Basic Structure from the Kesavananda Bharati case?",
    qHi: "केशवानंद भारती मामले का 'मूल संरचना सिद्धांत' (Basic Structure Doctrine) क्या है?",
  },
  {
    topic: "NCERT Biology",
    q: "How does light reaction in photosynthesis produce ATP and NADPH?",
    qHi: "प्रकाश संश्लेषण में प्रकाश अभिक्रिया कैसे ATP और NADPH बनाती है?",
  },
  {
    topic: "Socratic Hint",
    q: "Give me a step-by-step hint to solve 2x² - 7x + 3 = 0 without giving away the final answer.",
    qHi: "बिना सीधा उत्तर बताए 2x² - 7x + 3 = 0 हल करने का चरणबद्ध संकेत दें।",
  },
];

export function EduTutorChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Namaste! I am your **Dextora AI Pedagogical Tutor** 🎓\n\nI specialize in **CBSE / NCERT** curriculum and **UPSC / Civil Services** preparation. Instead of rote memorization, I break down complex concepts into first principles and ask Socratic questions.\n\nTap a sample question below or type anything you are studying!",
      timestamp: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const userText = (textToSend || input).trim();
    if (!userText || isLoading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }],
        }));

      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, history, language: lang }),
      });

      const data = await res.json();
      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: data.reply || "Let's explore that step-by-step together.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content:
            "I am reviewing that concept. Let's start with first principles: What is the primary definition or theorem you are building from?",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Conversation refreshed. Ask me any question from Class 9-12 NCERT (Maths, Science, Social Sciences) or UPSC GS 1-4 syllabus!",
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#0C0E12]/90 dark:bg-white/95 text-white dark:text-[#0C0E12] shadow-2xl border border-white/10 dark:border-black/10 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-[#E05A38]/25"
            aria-label="Open AI Tutor Demo"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E05A38] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E05A38]"></span>
            </span>
            <span className="text-sm font-semibold tracking-wide flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-[#E05A38]" />
              <span>Ask AI Tutor</span>
              <span className="hidden sm:inline-block text-[11px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#E05A38]/15 text-[#E05A38] font-bold">
                Demo
              </span>
            </span>
          </button>
        )}
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[440px] max-h-[85vh] sm:max-h-[640px] h-[600px] flex flex-col rounded-2xl bg-[#F8F5EE] dark:bg-[#12151B] border border-black/10 dark:border-white/15 shadow-2xl overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="px-5 py-3.5 bg-white/80 dark:bg-[#181C24]/90 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#E05A38] to-[#059669] flex items-center justify-center text-white shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Dextora AI Tutor</h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    Live Demo
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Socratic pedagogy · CBSE & UPSC</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Language toggle */}
              <button
                onClick={() => setLang(lang === "en" ? "hi" : "en")}
                className="px-2 py-1 text-xs font-semibold rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                title="Toggle English / Hindi"
              >
                {lang === "en" ? "🇮🇳 HI" : "🇬🇧 EN"}
              </button>

              {/* Reset */}
              <button
                onClick={handleReset}
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
                title="Close Tutor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-[#E05A38]/10 text-[#E05A38] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed whitespace-pre-line text-[13px] ${
                    m.role === "user"
                      ? "bg-[#E05A38] text-white rounded-br-xs shadow-sm"
                      : "bg-white dark:bg-[#1A1E26] text-gray-800 dark:text-gray-200 border border-black/5 dark:border-white/5 rounded-bl-xs shadow-xs"
                  }`}
                >
                  {m.content}
                </div>
                {m.role === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-7 h-7 rounded-lg bg-[#E05A38]/10 text-[#E05A38] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-white dark:bg-[#1A1E26] text-gray-500 rounded-2xl px-4 py-3 border border-black/5 dark:border-white/5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E05A38] animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E05A38] animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E05A38] animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-xs ml-1 font-medium">Tutor is formulating pedagogical hint...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Preset Questions Bar */}
          <div className="px-4 py-2 bg-white/40 dark:bg-[#181C24]/50 border-t border-black/5 dark:border-white/5">
            <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-1.5 flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              <span>Sample Education Prompts</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {PRESET_QUESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(lang === "hi" ? item.qHi : item.q)}
                  disabled={isLoading}
                  className="shrink-0 text-left px-2.5 py-1 rounded-full text-[11px] font-medium bg-white dark:bg-[#202530] text-gray-700 dark:text-gray-300 border border-black/5 dark:border-white/10 hover:border-[#E05A38] dark:hover:border-[#E05A38] hover:text-[#E05A38] dark:hover:text-[#E05A38] transition whitespace-nowrap"
                >
                  {item.topic}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white dark:bg-[#181C24] border-t border-black/5 dark:border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  lang === "hi"
                    ? "कोई भी सवाल पूछें (उदा. प्रकाश संश्लेषण, पाइथागोरस प्रमेय)..."
                    : "Ask anything from NCERT / UPSC syllabus..."
                }
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-gray-100 dark:bg-[#12151B] border border-transparent focus:border-[#E05A38] dark:focus:border-[#E05A38] text-gray-900 dark:text-white outline-none transition"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-[#E05A38] text-white hover:bg-[#d04a29] disabled:opacity-40 disabled:cursor-not-allowed transition shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
