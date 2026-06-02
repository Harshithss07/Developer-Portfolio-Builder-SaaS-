import { useState } from "react";
import { useStore } from "../../store";
import { 
  Sparkles, 
  Github, 
  Cpu, 
  Layout, 
  TrendingUp, 
  Globe, 
  ArrowRight, 
  Monitor, 
  ShieldCheck, 
  Gauge, 
  Heart 
} from "lucide-react";

interface LandingProps {
  onShowAuth: (type: "login" | "signup") => void;
  onEnterWorkspace: () => void;
}

export function Landing({ onShowAuth, onEnterWorkspace }: LandingProps) {
  const { user, portfolio } = useStore();
  const [activeThemePreview, setActiveThemePreview] = useState<"cyberpink" | "minimal" | "retro" | "nothing">("cyberpink");

  return (
    <div className="space-y-20 pb-20 select-none">
      {/* SaaS Hero Gradient Backdrop */}
      <section className="relative pt-12 text-center max-w-4xl mx-auto space-y-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-20 left-1/3 w-[500px] h-32 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 bg-[#0c0c0e] border border-zinc-800 rounded-full px-3 py-1 text-[11px] text-zinc-400 font-mono tracking-tight shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
          <span>DEVFOLIO COGNITIVE ENGINE v1.2</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-white max-w-3xl mx-auto">
          Developer portfolios, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">synthesized with AI.</span>
        </h1>

        <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto font-light">
          An automated SaaS generator. Sync your public GitHub repositories, craft bio headlines via Gemini models, and publish in under 2 minutes.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          {user ? (
            <button 
              onClick={onEnterWorkspace}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-500/20 cursor-pointer flex items-center gap-2"
            >
              Enter Workspace Panel <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <>
              <button 
                onClick={() => onShowAuth("signup")}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-500/20 cursor-pointer flex items-center gap-2"
              >
                Sign up instantly <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onShowAuth("login")}
                className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Access Login
              </button>
            </>
          )}
        </div>
      </section>

      {/* Feature Showcase Grid (Static Mock Illustration) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6">
        {/* Card 1: Themes */}
        <div className="bg-zinc-950/40 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-64">
          <div className="absolute top-0 right-0 w-12 h-12 bg-purple-500/5 rounded-full blur-xl"></div>
          <Layout className="w-8 h-8 text-purple-400 mb-4" />
          <div>
            <h3 className="font-bold text-white text-sm mb-1">5 Bespoke Visual Themes</h3>
            <p className="text-zinc-500 text-xs leading-relaxed font-light">
              Swap stylesheets instantly between Cyberpunk Neon, Minimal Professional, retro terminals, and Nothing OS.
            </p>
          </div>
        </div>

        {/* Card 2: GitHub API */}
        <div className="bg-zinc-950/40 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-64">
          <div className="absolute top-0 right-0 w-12 h-12 bg-blue-500/5 rounded-full blur-xl"></div>
          <Github className="w-8 h-8 text-blue-400 mb-4" />
          <div>
            <h3 className="font-bold text-white text-sm mb-1">GitHub API Integration</h3>
            <p className="text-zinc-500 text-xs leading-relaxed font-light">
              Scan, query, and import your public repositories including description copy values and active language stars.
            </p>
          </div>
        </div>

        {/* Card 3: Gemini Optimizer */}
        <div className="bg-zinc-950/40 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-64">
          <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-500/5 rounded-full blur-xl"></div>
          <Sparkles className="w-8 h-8 text-indigo-400 mb-4 animate-pulse" />
          <div>
            <h3 className="font-bold text-white text-sm mb-1">Gemini AI Copywriter</h3>
            <p className="text-zinc-500 text-xs leading-relaxed font-light">
              Specify active tones (Apple premium, brutalist, startup CEO) and synthesize crisp developer subtitles instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Layout/Design Presets Interactive Visualizer Mockup */}
      <section className="bg-[#0c0c0e] border border-zinc-800 rounded-2xl max-w-4xl mx-auto p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h3 className="font-bold text-white text-base">Explore Visual Theme Previews</h3>
            <p className="text-zinc-500 text-xs mt-0.5">Toggle live preview mockups below to view CSS styling templates.</p>
          </div>
          <div className="flex gap-2">
            {(["cyberpink", "minimal", "retro", "nothing"] as const).map((t) => (
              <button 
                key={t}
                onClick={() => setActiveThemePreview(t)}
                className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-all cursor-pointer font-semibold ${activeThemePreview === t ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Live CSS Interactive Mock Card */}
        <div className="w-full bg-zinc-950/90 border border-zinc-900 rounded-xl p-6 h-48 flex flex-col justify-between transition-all duration-300">
          {activeThemePreview === "cyberpink" && (
            <div className="space-y-4 font-mono text-[#00f0ff]">
              <div className="text-xs">[SYSTEM_MODE: CYBERPUNK_ACTIVE]</div>
              <h4 className="text-xl font-bold tracking-widest text-[#ff007f]">&lt;CYBER_ENG_NODE /&gt;</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">Synthesizing full stack services inside neon grid pipelines. Response queues prioritized.</p>
            </div>
          )}
          {activeThemePreview === "minimal" && (
            <div className="space-y-4 font-sans text-zinc-900 pl-4 border-l-2 border-zinc-800">
              <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Minimal Professional</div>
              <h4 className="text-xl font-extrabold tracking-tight text-white">Alex Rivera // Bio</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">Pristine white spaces paired with crisp Inter typography for ultimate legibility.</p>
            </div>
          )}
          {activeThemePreview === "retro" && (
            <div className="space-y-4 font-mono text-[#00ff66]">
              <div className="text-xs">LOGGED TERMINAL: v1.0.1 - OK</div>
              <h4 className="text-[#00ff66] font-bold uppercase">&gt; MORE_INFORMATION.TXT</h4>
              <p className="text-xs text-[#00ff66]/80 font-mono leading-relaxed">Amber phosphor scanline CRT monitors transmitting command variables instantly.</p>
            </div>
          )}
          {activeThemePreview === "nothing" && (
            <div className="space-y-4 font-mono text-white">
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 uppercase tracking-widest">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span>Nothing OS Inspired layout</span>
              </div>
              <h4 className="text-lg font-black uppercase text-white">OPERATOR_LOG_COORDINATES</h4>
              <p className="text-xs text-zinc-400">Brutallist heavy borders, dot-matrix structures, and single pixel accenting.</p>
            </div>
          )}
        </div>
      </section>

      {/* SaaS Bottom conversion bar */}
      <section className="text-center max-w-xl mx-auto space-y-4 pt-8">
        <h3 className="font-bold text-white text-lg">Rig up your developer node today</h3>
        <p className="text-zinc-500 text-xs leading-relaxed font-light">
          No credit cards, zero server configurations. Deploy and host your beautiful portfolio dynamically on our global infrastructure.
        </p>
        <button 
          onClick={() => {
            if (user) onEnterWorkspace();
            else onShowAuth("signup");
          }}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-2"
        >
          {user ? "Access Builder Panel" : "Boot Node Draft Now"} <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
}
