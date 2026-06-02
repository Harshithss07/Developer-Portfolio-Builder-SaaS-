import { useState, FormEvent, useEffect } from "react";
import { useStore } from "../../store";
import { Mail, Lock, Sparkles, LogIn, ArrowRight } from "lucide-react";

interface LoginProps {
  onSwitchToSignup: () => void;
  onSuccess: () => void;
  onCancel: () => void;
}

export function Login({ onSwitchToSignup, onSuccess, onCancel }: LoginProps) {
  const { login, loginWithGoogle } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  // Google OAuth callback message listener
  useEffect(() => {
    const handleGoogleMessage = async (e: MessageEvent) => {
      // Validate incoming origin coordinates match current application host
      if (e.origin !== window.location.origin) {
        return;
      }

      if (e.data && e.data.type === "GOOGLE_AUTH_SUCCESS") {
        const { token: googleToken, user: googleUser } = e.data;
        if (googleToken && googleUser) {
          setGoogleLoading(true);
          try {
            await loginWithGoogle(googleToken, googleUser);
            onSuccess();
          } catch (err: any) {
            setError(err.message || "Failed to finalize Google workspace session.");
          } finally {
            setGoogleLoading(false);
          }
        }
      }
    };

    window.addEventListener("message", handleGoogleMessage);
    return () => {
      window.removeEventListener("message", handleGoogleMessage);
    };
  }, [loginWithGoogle, onSuccess]);

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      // Perform genuine client-side Google auth via Firebase Auth Popup
      const { triggerGooglePopup } = await import("../../lib/firebase");
      const result = await triggerGooglePopup();
      
      // Sync and log in user on backend local JSON db
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
      
      // Save token and update client store states
      await loginWithGoogle(syncData.token, syncData.user);
      onSuccess();
    } catch (err: any) {
      console.error("Google SSO Error:", err);
      if (err.code === "auth/popup-blocked") {
        setError("Sign-in popup was blocked by your browser. Please permit pop-ups for this application to complete Google sign-in.");
      } else {
        setError(err.message || "An unexpected error occurred during Google Sign-In via Firebase.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const success = await login(email, password);
      if (success) {
        onSuccess();
      } else {
        setError("Invalid email address or passcode.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during authenticate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-[#0c0c0e] border border-zinc-800 rounded-2xl p-8 relative shadow-2xl">
      {/* Background neon blur */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-3">
          <LogIn className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">Access Operator Console</h2>
        <p className="text-xs text-zinc-500 mt-1">Authenticate credentials to manage active port builder sessions.</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs mb-5 font-light">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-[10px] uppercase text-zinc-500 tracking-wider font-bold block mb-1.5">Email Coordinate</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-zinc-600 absolute left-3.5 top-3.5" />
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-blue-500/50 transition-all font-light"
              placeholder="e.g. test@abc.com"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase text-zinc-500 tracking-wider font-bold block mb-1.5">Passcode</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-zinc-600 absolute left-3.5 top-3.5" />
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-blue-500/50 transition-all font-light"
              placeholder="e.g. password123"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 mt-6 cursor-pointer"
        >
          {loading ? "Authenticating Session..." : "Join Console"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Google Sign-In Identity Action */}
      <div className="relative my-5 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-850"></div>
        </div>
        <span className="relative bg-[#0c0c0e] px-3.5 text-[9px] uppercase font-bold text-zinc-500 tracking-wider">or authenticate with google</span>
      </div>

      <button 
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading || googleLoading}
        className="w-full h-11 bg-zinc-900 hover:bg-zinc-850 disabled:bg-zinc-950 text-zinc-200 border border-zinc-800 rounded-xl text-xs font-semibold flex items-center justify-center transition-all cursor-pointer"
        id="google-sso-action"
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
        {googleLoading ? "Connecting SSO..." : "Sign in with Google"}
      </button>

      {/* Demo helper info box */}
      <div className="mt-6 border border-zinc-800/60 bg-zinc-950/40 rounded-xl p-3 text-[10px] text-zinc-500 text-center leading-normal">
        <span className="font-bold text-zinc-400 block mb-0.5">🚀 INSTANT DEMO ACCOUNT PRE-CONFIRED:</span>
        Email: <code className="text-blue-400">test@abc.com</code> / Passcode: <code className="text-blue-400">password123</code>
      </div>

      <div className="mt-8 pt-6 border-t border-zinc-900 text-center text-xs">
        <span className="text-zinc-600 font-light">New to builder pipeline?</span>{" "}
        <button 
          onClick={onSwitchToSignup}
          className="text-blue-400 hover:underline font-semibold cursor-pointer"
        >
          Create Account
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
