import { useStore } from "../../store";
import { 
  Home, 
  Settings, 
  Layout, 
  TrendingUp, 
  LogOut, 
  Cpu, 
  Terminal, 
  Globe, 
  Eye, 
  User as UserIcon,
  ShieldAlert,
  ArrowUpRight
} from "lucide-react";

interface SidebarProps {
  activeScreen: "landing" | "editor" | "analytics";
  onChangeScreen: (screen: "landing" | "editor" | "analytics") => void;
  onShowAuth: () => void;
}

export function Sidebar({ activeScreen, onChangeScreen, onShowAuth }: SidebarProps) {
  const { user, logout, portfolio } = useStore();

  return (
    <div className="w-64 bg-[#0c0c0e] border-r border-zinc-800 flex flex-col justify-between h-full shrink-0">
      {/* Upper Area */}
      <div className="p-6 space-y-8">
        {/* SaaS Logo Brand layout */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Cpu className="w-4.5 h-4.5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="font-bold text-white tracking-tight text-sm flex items-center gap-1.5 leading-none">
              DevFolio AI
            </h1>
            <span className="text-[10px] text-zinc-500 font-mono tracking-wide">COGNITIVE_SaaS_v1</span>
          </div>
        </div>

        {/* Navigation block */}
        <div className="space-y-1">
          <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest block mb-2 pl-3">WORKSPACE NAV</span>
          
          <button 
            onClick={() => onChangeScreen("landing")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium tracking-tight transition-all cursor-pointer ${activeScreen === "landing" ? "text-white bg-zinc-900" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            <Home className="w-4.5 h-4.5" />
            <span>SaaS Platform Hub</span>
          </button>

          {user && (
            <>
              <button 
                onClick={() => onChangeScreen("editor")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium tracking-tight transition-all cursor-pointer ${activeScreen === "editor" ? "text-white bg-zinc-900" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                <Layout className="w-4.5 h-4.5" />
                <span>Portfolio Designer</span>
                {portfolio?.isPublished && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-auto"></span>
                )}
              </button>

              <button 
                onClick={() => onChangeScreen("analytics")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium tracking-tight transition-all cursor-pointer ${activeScreen === "analytics" ? "text-white bg-zinc-900" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                <TrendingUp className="w-4.5 h-4.5" />
                <span>Auditing & Analytics</span>
              </button>
            </>
          )}
        </div>

        {/* Live Published indicators */}
        {user && portfolio?.isPublished && (
          <div className="border border-emerald-500/10 bg-emerald-950/10 p-4 rounded-xl space-y-2">
            <span className="text-[9px] bg-emerald-900 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded font-black tracking-widest uppercase block w-max">
              LIVE NETWORK LINK
            </span>
            <span className="text-[10px] text-zinc-500 leading-normal block font-mono truncate">
              portfolio/{user.username}
            </span>
            <a 
              href={`/portfolio/${user.username}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] text-zinc-300 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              Examine live <ArrowUpRight className="w-3 h-3 text-emerald-400" />
            </a>
          </div>
        )}
      </div>

      {/* Footer Operator accounts block */}
      <div className="p-4 border-t border-zinc-900 bg-[#09090b]">
        {user ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 px-2">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-300 flex items-center justify-center font-bold text-xs uppercase shadow">
                {user.name.slice(0, 2)}
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-semibold text-xs text-white block truncate leading-none mb-0.5">{user.name}</span>
                <span className="text-[10px] text-zinc-500 font-mono block truncate">@{user.username}</span>
              </div>
            </div>
            
            <button 
              onClick={logout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-zinc-500 hover:text-red-400 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-zinc-600" />
              <span>Shutdown Link</span>
            </button>
          </div>
        ) : (
          <div className="p-2 text-center space-y-2">
            <p className="text-[10px] text-zinc-500 leading-normal">
              Sign in to authenticate workspace nodes.
            </p>
            <button 
              onClick={onShowAuth}
              className="w-full py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white font-bold rounded-lg text-xs cursor-pointer"
            >
              Sign In / Rig up Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
