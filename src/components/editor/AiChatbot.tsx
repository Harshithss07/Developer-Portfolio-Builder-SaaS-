import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, User, Trash2, ArrowRight, Check, CheckCircle2, ChevronDown } from "lucide-react";
import { PortfolioData } from "../../types";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AiChatbotProps {
  portfolio: PortfolioData;
  updateLocal: (recipe: (draft: PortfolioData) => void) => void;
  token: string | null;
}

export function AiChatbot({ portfolio, updateLocal, token }: AiChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `**Hello! I am your DevFolio AI Co-Pilot.** 🌟

I can help you build an incredible, high-converting tech portfolio. Ask me to:
- "Optimize my Main Headline / Title"
- "Draft a professional About Bio"
- "Improve my project descriptions"

How can I help you elevate your career brand today?`
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applyTarget, setApplyTarget] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText) return;

    if (!textToSend) {
      setInput("");
    }

    const updatedMessages = [...messages, { role: "user" as const, content: queryText }];
    setMessages(updatedMessages);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          messages: updatedMessages,
          portfolio
        })
      });

      if (!response.ok) {
        throw new Error("Chat assistant backend reported an error.");
      }

      const data = await response.json();
      setMessages([...updatedMessages, { role: "assistant", content: data.text }]);
    } catch (err: any) {
      setError(err.message || "Failed to communicate with the Gemini assistant.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to extract a quoted block or suggestions
  const extractSuggestedText = (content: string): string => {
    // Look for text in markdown blockquote or search quotes
    const quoteMatches = content.match(/>\s*(?:"|'|)([^"\n>]+)(?:"|'|)/);
    if (quoteMatches && quoteMatches[1]) {
      return quoteMatches[1].trim();
    }
    const inlineQuoteMatches = content.match(/"([^"]{15,})"/);
    if (inlineQuoteMatches && inlineQuoteMatches[1]) {
      return inlineQuoteMatches[1].trim();
    }
    // Clean backup
    const lines = content.split("\n");
    const quoteLine = lines.find(l => l.startsWith(">") || l.includes("**\""));
    if (quoteLine) {
      return quoteLine.replace(/^>\s*/, "").replace(/^\s*\*\*"/, "").replace(/"\*\*\s*$/, "").trim();
    }
    return "";
  };

  const handleApply = (type: "title" | "subtitle" | "bio", suggestedText: string) => {
    if (!suggestedText) return;
    
    updateLocal(draft => {
      if (type === "title") {
        draft.hero.title = suggestedText;
      } else if (type === "subtitle") {
        draft.hero.subtitle = suggestedText;
      } else if (type === "bio") {
        draft.about.bio = suggestedText;
      }
    });

    setApplyTarget(type);
    setTimeout(() => setApplyTarget(null), 2500);
  };

  // Safe simple Markdown-to-HTML parser to style blockquotes and bullets cleanly
  const renderMessageContent = (text: string) => {
    return text.split("\n").map((line, idx) => {
      let trimmed = line.trim();
      
      // Look for blockquotes
      if (trimmed.startsWith(">")) {
        return (
          <blockquote key={idx} className="border-l-2 border-blue-500 pl-3 py-1 my-1.5 text-zinc-300 bg-blue-950/20 italic rounded-r text-[11px] font-sans">
            {trimmed.replace(/^>\s*/, "")}
          </blockquote>
        );
      }

      // Look for bullets
      if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
        return (
          <li key={idx} className="ml-3 list-disc text-zinc-300 text-[11px] leading-relaxed my-0.5">
            {trimmed.replace(/^[-*]\s*/, "")}
          </li>
        );
      }

      // Look for bold text inside backticks or strong delimiters
      const parts = line.split(/(\*\*|`)/g);
      let isBold = false;
      let isCode = false;

      const inlineElements = parts.map((part, pIdx) => {
        if (part === "**") {
          isBold = !isBold;
          return null;
        }
        if (part === "`") {
          isCode = !isCode;
          return null;
        }
        if (isCode) {
          return <code key={pIdx} className="bg-zinc-900 text-cyan-400 px-1 rounded font-mono text-[10px]">{part}</code>;
        }
        if (isBold) {
          return <strong key={pIdx} className="font-bold text-white">{part}</strong>;
        }
        return part;
      });

      return (
        <p key={idx} className="text-[11px] leading-relaxed text-zinc-350 min-h-[0.5rem] font-light">
          {inlineElements}
        </p>
      );
    });
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: `**Welcome back!** Let's customize your profile components. Ask me for a headline or summary!`
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" id="ai-chat-pilot-container">
      {/* 1. CLOSED TOGGLE BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group w-12 h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 border border-blue-400/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          title="Open AI Co-Pilot Assistant"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span className="absolute right-14 bg-zinc-950 border border-zinc-850 text-[10px] uppercase font-bold tracking-widest text-zinc-300 px-2.5 py-1 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            AI Assistant Stream
          </span>
        </button>
      )}

      {/* 2. CHAT DIALOG CONTAINER */}
      {isOpen && (
        <div className="w-[360px] h-[500px] bg-zinc-950/95 backdrop-blur-xl border border-zinc-850 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <header className="p-3 bg-[#0d0c10] border-b border-zinc-900 flex justify-between items-center bg-gradient-to-r from-zinc-950 to-blue-950/20">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <div>
                <span className="text-xs font-bold text-white block">DevFolio AI Co-Pilot</span>
                <span className="text-[9px] text-zinc-500 font-mono">Gemini 3.5 Assistant</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="p-1 hover:bg-zinc-900 rounded text-zinc-500 hover:text-zinc-300 transition-colors"
                title="Clear Chat Logs"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-zinc-900 rounded text-zinc-500 hover:text-zinc-300 transition-colors"
                title="Minimise Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Chat Bubble Logs */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950/50">
            {messages.map((msg, idx) => {
              const isAssistant = msg.role === "assistant";
              const suggestedText = isAssistant ? extractSuggestedText(msg.content) : "";

              return (
                <div key={idx} className={`flex items-start gap-2.5 ${!isAssistant && "justify-end"}`}>
                  {/* Sender Icon */}
                  {isAssistant && (
                    <div className="w-6 h-6 rounded-full bg-blue-950 border border-blue-500/20 flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                  )}

                  {/* Bubble Container */}
                  <div className="space-y-1.5 max-w-[85%]">
                    <div className={`p-3 rounded-2xl text-xs space-y-1 ${
                      isAssistant 
                        ? "bg-zinc-900 border border-zinc-850/60 rounded-tl-none text-zinc-300" 
                        : "bg-blue-600 text-white rounded-tr-none ml-auto"
                    }`}>
                      {isAssistant ? renderMessageContent(msg.content) : <p className="text-[11.5px] leading-relaxed">{msg.content}</p>}
                    </div>

                    {/* Quick Apply CTA Options for suggestions */}
                    {isAssistant && suggestedText && (
                      <div className="p-2 border border-blue-950 bg-blue-950/10 rounded-xl space-y-2 animate-in fade-in duration-200">
                        <span className="text-[9px] text-blue-400 font-bold uppercase tracking-wider block">⚡ Detected Suggestions</span>
                        <div className="grid grid-cols-3 gap-1.5">
                          <button
                            onClick={() => handleApply("title", suggestedText)}
                            className="py-1 px-1 bg-zinc-900 border border-zinc-800 hover:border-blue-500 rounded text-[9px] font-bold text-zinc-300 block hover:text-white transition-all cursor-pointer"
                          >
                            Apply Title
                          </button>
                          <button
                            onClick={() => handleApply("subtitle", suggestedText)}
                            className="py-1 px-1 bg-zinc-900 border border-zinc-800 hover:border-blue-500 rounded text-[9px] font-bold text-zinc-300 block hover:text-white transition-all cursor-pointer"
                          >
                            Apply Subtitle
                          </button>
                          <button
                            onClick={() => handleApply("bio", suggestedText)}
                            className="py-1 px-1 bg-zinc-900 border border-zinc-800 hover:border-blue-500 rounded text-[9px] font-bold text-zinc-300 block hover:text-white transition-all cursor-pointer"
                          >
                            Apply Bio
                          </button>
                        </div>
                        {applyTarget && (
                          <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 animate-pulse justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span>Injected suggestion directly!</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* User Icon */}
                  {!isAssistant && (
                    <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                      <User className="w-3.5 h-3.5 text-zinc-300" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Thinking Status */}
            {loading && (
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-blue-950 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-blue-400 animate-spin" />
                </div>
                <div className="p-3 bg-zinc-900/60 border border-zinc-850 rounded-2xl rounded-tl-none">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="p-3 bg-red-950/20 border border-red-500/25 text-red-400 rounded-xl text-[10px] leading-normal font-sans">
                {error}
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>

          {/* Quick Pillar Preset Shortcuts */}
          <div className="px-3 py-1.5 bg-zinc-950 border-t border-zinc-900 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none items-center">
            <span className="text-[9px] text-zinc-500 shrink-0 font-bold mr-1">Ask:</span>
            <button
              type="button"
              onClick={() => handleSend("Optimize my Headline Statement")}
              className="px-2.5 py-1 bg-zinc-900 border border-zinc-850 hover:border-zinc-700 hover:bg-zinc-850 text-zinc-400 hover:text-white rounded-full text-[9px] transition-all cursor-pointer font-medium"
            >
              🚀 Upgrade Headline
            </button>
            <button
              type="button"
              onClick={() => handleSend("Improve my About Bio section")}
              className="px-2.5 py-1 bg-zinc-900 border border-zinc-850 hover:border-zinc-700 hover:bg-zinc-850 text-zinc-400 hover:text-white rounded-full text-[9px] transition-all cursor-pointer font-medium"
            >
              ✍️ Write About Bio
            </button>
            <button
              type="button"
              onClick={() => handleSend("Recommend 3 technical design skills")}
              className="px-2.5 py-1 bg-zinc-900 border border-zinc-850 hover:border-zinc-700 hover:bg-zinc-850 text-zinc-400 hover:text-white rounded-full text-[9px] transition-all cursor-pointer font-medium"
            >
              💡 Suggest Core Skills
            </button>
            <button
              type="button"
              onClick={() => handleSend("How can I change the theme or visual styling of my portfolio?")}
              className="px-2.5 py-1 bg-zinc-900 border border-zinc-850 hover:border-zinc-700 hover:bg-zinc-850 text-zinc-400 hover:text-white rounded-full text-[9px] transition-all cursor-pointer font-medium"
            >
              🎨 Themes Customizer
            </button>
            <button
              type="button"
              onClick={() => handleSend("How do I publish my portfolio live and share the link?")}
              className="px-2.5 py-1 bg-zinc-900 border border-zinc-850 hover:border-zinc-700 hover:bg-zinc-850 text-zinc-400 hover:text-white rounded-full text-[9px] transition-all cursor-pointer font-medium"
            >
              🌐 Publishing Guide
            </button>
            <button
              type="button"
              onClick={() => handleSend("How do I track visitor views and monthly analytics?")}
              className="px-2.5 py-1 bg-zinc-900 border border-zinc-850 hover:border-zinc-700 hover:bg-zinc-850 text-zinc-400 hover:text-white rounded-full text-[9px] transition-all cursor-pointer font-medium"
            >
              📊 Track Analytics
            </button>
            <button
              type="button"
              onClick={() => handleSend("How does Google login sync with my profile draft?")}
              className="px-2.5 py-1 bg-zinc-900 border border-zinc-850 hover:border-zinc-700 hover:bg-zinc-850 text-zinc-400 hover:text-white rounded-full text-[9px] transition-all cursor-pointer font-medium"
            >
              🔐 Google SSO Sync
            </button>
            <button
              type="button"
              onClick={() => handleSend("How do visitors download my printable PDF resume?")}
              className="px-2.5 py-1 bg-zinc-900 border border-zinc-850 hover:border-zinc-700 hover:bg-zinc-850 text-zinc-400 hover:text-white rounded-full text-[9px] transition-all cursor-pointer font-medium"
            >
              📄 Printable Resume
            </button>
          </div>

          {/* Input Bar Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-[#0b0a0e] border-t border-zinc-900 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder="Refine copy, draft skill levels..."
              className="flex-1 bg-zinc-950 border border-zinc-850 hover:border-zinc-800 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none focus:border-blue-500 text-zinc-100 placeholder-zinc-650"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-3 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-900 text-white rounded-lg flex items-center justify-center transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
