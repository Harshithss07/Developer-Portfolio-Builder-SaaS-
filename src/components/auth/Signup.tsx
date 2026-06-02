import { useState, FormEvent } from "react";
import { useStore } from "../../store";
import { User, Sparkles, Mail, Lock, AtSign, ArrowRight } from "lucide-react";

interface SignupProps {
  onSwitchToLogin: () => void;
  onSuccess: () => void;
  onCancel: () => void;
}

export function Signup({ onSwitchToLogin, onSuccess, onCancel }: SignupProps) {
  const { signup, loginWithGoogle } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      // Connect to Google via Firebase Popup Auth
      const { triggerGooglePopup } = await import("../../lib/firebase");
      const result = await triggerGooglePopup();

      // Synchronize and register workspace on the backend local database
      const syncRes = await fetch("/api/auth/google/firebase-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: result.email,
          name: result.displayName,
          avatarUrl: result.photoURL
        })
      });

      if (!syncRes.ok) {
        const errData = await syncRes.json();
        throw new Error(errData.error || "Failed to synchronize Google workspace session.");
      }

      const syncData = await syncRes.json();

      // Persist credential session in store and redirect/execute onSuccess
      await loginWithGoogle(syncData.token, syncData.user);
      onSuccess();
    } catch (err: any) {
      console.error("Google Signup Error:", err);
      if (err.code === "auth/popup-blocked") {
        setError("Sign-in popup was blocked by your browser. Please permit pop-ups for this application to complete Google registration.");
      } else {
        setError(err.message || "An unexpected error occurred during Google registration.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate simple parameters
    if (username.trim().length < 3) {
      setError("Username must exceed 3 letters to register.");
      setLoading(false);
      return;
    }

    const regExp = /^[a-zA-Z0-9_-]+$/;
    if (!regExp.test(username.trim())) {
      setError("Username may only hold letters, numbers, hyphens or underscores.");
      setLoading(false);
      return;
    }

    try {
      const success = await signup(email, password, username, name);
      if (success) {
        onSuccess();
      } else {
        setError("Sign up failed. Username or email might already be taken.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected registration error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-[#0c0c0e] border border-zinc-800 rounded-2xl p-8 relative shadow-2xl">
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 mb-3">
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight font-sans">Boot Operator Node</h2>
        <p className="text-xs text-zinc-500 mt-1">Spin up a custom published URL instantly on registration.</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs mb-5 font-light">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-[10px] uppercase text-zinc-500 tracking-wider font-bold block mb-1.5">Your Full Name</label>
          <input 
            type="text" 
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-purple-500/50 transition-all font-light"
            placeholder="e.g. Alex Rivera"
          />
        </div>

        <div>
          <label className="text-[10px] uppercase text-zinc-500 tracking-wider font-bold block mb-1.5">Choice Username (Live URL)</label>
          <div className="relative">
            <AtSign className="w-4 h-4 text-zinc-600 absolute left-3.5 top-3.5" />
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ""))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-purple-500/50 transition-all font-mono"
              placeholder="e.g. alexdev"
            />
          </div>
          <p className="text-[9px] text-zinc-600 mt-1 font-mono">Result: devfolio.ai/portfolio/{"{"}username{"}"}</p>
        </div>

        <div>
          <label className="text-[10px] uppercase text-zinc-500 tracking-wider font-bold block mb-1.5">Email Contact</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-zinc-600 absolute left-3.5 top-3.5" />
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-purple-500/50 transition-all font-light"
              placeholder="e.g. alex@company.com"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase text-zinc-500 tracking-wider font-bold block mb-1.5">Define Passcode</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-zinc-600 absolute left-3.5 top-3.5" />
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-purple-500/50 transition-all font-light"
              placeholder="e.g. password123"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all shadow-lg shadow-purple-500/10 flex items-center justify-center gap-2 mt-6 cursor-pointer"
        >
          {loading ? "Registering Workspace..." : "Initialize Profile"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Google Signup Identity Action */}
      <div className="relative my-5 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-850"></div>
        </div>
        <span className="relative bg-[#0c0c0e] px-3.5 text-[9px] uppercase font-bold text-zinc-500 tracking-wider">or register with google</span>
      </div>

      <button 
        type="button"
        onClick={handleGoogleSignup}
        disabled={loading || googleLoading}
        className="w-full h-11 bg-zinc-900 hover:bg-zinc-850 disabled:bg-zinc-950 text-zinc-200 border border-zinc-800 rounded-xl text-xs font-semibold flex items-center justify-center transition-all cursor-pointer"
        id="google-sso-action-signup"
      >
        {googleLoading ? (
          <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin mr-2"></div>
        ) : (
          <svg className="w-4 h-4 mr-2.5" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
          </svg>
        )}
        {googleLoading ? "Connecting SSO..." : "Sign up with Google"}
      </button>

      <div className="mt-8 pt-6 border-t border-zinc-900 text-center text-xs">
        <span className="text-zinc-600 font-light">Already have an active console?</span>{" "}
        <button 
          onClick={onSwitchToLogin}
          className="text-purple-400 hover:underline font-semibold cursor-pointer"
        >
          Access Login
        </button>
      </div>

      <button 
        onClick={onCancel}
        className="text-[10px] text-zinc-600 hover:text-zinc-400 text-center w-full block mt-4 cursor-pointer"
      >
        Cancel and Return Home
      </button>
    </div>
  );
}
