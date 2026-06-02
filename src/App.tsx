import { useState, useEffect } from "react";
import { StoreProvider, useStore } from "./store";
import { Sidebar } from "./components/layout/Sidebar";
import { Landing } from "./components/dashboard/Landing";
import { EditorWorkspace } from "./components/editor/EditorWorkspace";
import { Analytics } from "./components/dashboard/Analytics";
import { Login } from "./components/auth/Login";
import { Signup } from "./components/auth/Signup";
import { PortfolioView } from "./components/portfolio/PortfolioView";
import { PortfolioData } from "./types";
import { 
  Cpu, 
  HelpCircle, 
  RefreshCw, 
  AlertCircle, 
  Globe, 
  ArrowRight, 
  Plus, 
  X
} from "lucide-react";

function AppContent() {
  const { 
    token, 
    user, 
    portfolio, 
    loading: storeLoading, 
    refetchPortfolio,
    isAuthenticated
  } = useStore();

  const [activeScreen, setActiveScreen] = useState<"landing" | "editor" | "analytics" | "public_portfolio">("landing");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");

  // Public Portfolios
  const [publicPortfolioData, setPublicPortfolioData] = useState<PortfolioData | null>(null);
  const [publicFetching, setPublicFetching] = useState(false);
  const [publicError, setPublicError] = useState("");

  // Pathname routing
  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/^\/portfolio\/([a-zA-Z0-9_-]+)/);
    
    if (match) {
      const username = match[1];
      fetchPublicPortfolio(username);
    }
  }, []);

  // Fetch published portfolio database record
  const fetchPublicPortfolio = async (username: string) => {
    setPublicFetching(true);
    setPublicError("");
    try {
      const res = await fetch(`/api/portfolio/p/${username}`);
      if (res.ok) {
        const data = await res.json();
        setPublicPortfolioData(data.portfolio);
        setActiveScreen("public_portfolio");
      } else {
        const err = await res.json();
        setPublicError(err.error || "The requested portfolio does not exist or has not been published yet.");
        setActiveScreen("public_portfolio");
      }
    } catch (e) {
      setPublicError("Network link communication failure accessing developer files.");
      setActiveScreen("public_portfolio");
    } finally {
      setPublicFetching(false);
    }
  };

  // If user signs in successfully:
  const handleAuthSuccess = async () => {
    setShowAuthModal(false);
    await refetchPortfolio();
    setActiveScreen("editor");
  };

  // Loading indicator for token validation
  if (storeLoading) {
    return (
      <div className="w-full min-h-screen bg-[#09090b] text-zinc-400 font-mono flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Cpu className="w-6 h-6 text-white animate-spin" />
        </div>
        <span className="text-xs text-zinc-500 tracking-widest uppercase">Validating authentication link...</span>
      </div>
    );
  }

  // PUBLIC PORTFOLIO FULLSCREEN RENDER LAYOUT
  if (activeScreen === "public_portfolio") {
    if (publicFetching) {
      return (
        <div className="w-full min-h-screen bg-[#070509] text-zinc-400 font-mono flex flex-col items-center justify-center space-y-3">
          <RefreshCw className="w-6 h-6 animate-spin text-cyan-400" />
          <span className="text-xs text-zinc-500 uppercase tracking-wider">Synchronizing Published Site Assets...</span>
        </div>
      );
    }

    if (publicError) {
      return (
        <div className="w-full min-h-screen bg-[#09090b] text-zinc-400 font-mono flex flex-col items-center justify-center space-y-6 px-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 animate-pulse" />
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Portfolio Node Offline</h1>
            <p className="text-xs text-zinc-600 max-w-sm leading-relaxed">
              {publicError}
            </p>
          </div>
          <a 
            href="/"
            className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-lg text-xs leading-none transition-all uppercase tracking-wide border border-zinc-800 cursor-pointer"
          >
            Create Your Platform Node
          </a>
        </div>
      );
    }

    if (publicPortfolioData) {
      return <PortfolioView data={publicPortfolioData} isPreview={false} />;
    }
  }

  return (
    <div className="w-full h-screen font-sans bg-[#09090b] text-zinc-100 flex overflow-hidden">
      {/* SaaS Sidebar navigation rail */}
      <Sidebar 
        activeScreen={activeScreen} 
        onChangeScreen={(scr) => setActiveScreen(scr)} 
        onShowAuth={() => {
          setAuthType("login");
          setShowAuthModal(true);
        }}
      />

      {/* Main Content Pane */}
      <main className="flex-1 h-full min-w-0 overflow-y-auto flex flex-col relative bg-[#09090b]">
        {/* Unified Top Dashboard Ribbon */}
        <header className="h-16 border-b border-zinc-800 shrink-0 px-8 flex justify-between items-center bg-[#09090b]">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 select-none">Platform Area:</span>
            <span className="text-xs font-bold font-mono tracking-tight text-white capitalize">{activeScreen}</span>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-500 font-mono hidden md:inline">NODE_LINK: OK</span>
                <button 
                  onClick={() => setActiveScreen("editor")}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-1.5 px-4 rounded-lg text-[11px] uppercase border border-zinc-800 cursor-pointer"
                >
                  Editor panel
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setAuthType("login");
                  setShowAuthModal(true);
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 px-4 rounded-lg text-[11px] uppercase cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>
        </header>

        {/* Dynamic Display Panels Router */}
        <div className="flex-1 min-h-0 bg-[#09090b] p-8 overflow-y-auto">
          {activeScreen === "landing" && (
            <Landing 
              onShowAuth={(type) => {
                setAuthType(type);
                setShowAuthModal(true);
              }}
              onEnterWorkspace={() => setActiveScreen("editor")}
            />
          )}

          {activeScreen === "editor" && <EditorWorkspace />}

          {activeScreen === "analytics" && <Analytics />}
        </div>
      </main>

      {/* Aesthetic Authentication modal layout */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-[#000]/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="relative w-full max-w-sm">
            {/* Close trigger button */}
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute -top-3 -right-3 p-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white rounded-full cursor-pointer z-10"
            >
              <X className="w-4 h-4" />
            </button>
            {authType === "login" ? (
              <Login 
                onSwitchToSignup={() => setAuthType("signup")} 
                onSuccess={handleAuthSuccess}
                onCancel={() => setShowAuthModal(false)}
              />
            ) : (
              <Signup 
                onSwitchToLogin={() => setAuthType("login")} 
                onSuccess={handleAuthSuccess}
                onCancel={() => setShowAuthModal(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
