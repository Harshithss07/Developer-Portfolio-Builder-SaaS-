import { useState, useEffect } from "react";
import { useStore } from "../../store";
import { PortfolioView } from "../portfolio/PortfolioView";
import { AvatarUploader } from "./AvatarUploader";
import { AiChatbot } from "./AiChatbot";
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Sparkles, 
  Trash2, 
  Plus, 
  ArrowUp, 
  ArrowDown, 
  Github, 
  Save, 
  Globe, 
  Settings, 
  Eye, 
  Palette, 
  FileText, 
  AlertCircle,
  HelpCircle,
  Lightbulb,
  CheckCircle,
  TrendingUp,
  Cpu,
  RefreshCw,
  GraduationCap,
  Briefcase,
  Zap
} from "lucide-react";
import { PortfolioData, Project, Skill, Experience, Education } from "../../types";

const TEMPLATE_PRESETS: Record<string, {
  name: string;
  description: string;
  hero: any;
  about: any;
  skills: any[];
  experience: any[];
  projects: any[];
  education: any[];
  contact: any;
  themeConfig: any;
}> = {
  fresh_grad: {
    name: "Fresh Graduate baseline structure",
    description: "Tailored for fresh computer science graduates. Emphasizes academic credentials, core technical skills, and software development foundations.",
    hero: {
      badgeText: "🎓 En route to full-time developer roles",
      title: "Entry-Level Systems Developer",
      subtitle: "Bridging academic theory with practical, production-ready implementation. Dedicated to building clean, robust TypeScript backends and cloud services.",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      callToActionText: "Verify Academic Accomplishments"
    },
    about: {
      bio: "CS graduate proficient in algorithm implementation, full-stack software structures, and continuous dev pipelines.",
      expandedBio: "During my undergraduate career, I concentrated on understanding the fundamentals of networking, database normalization, and runtime complexity. I developed several side projects demonstrating clean component decomposition, standard responsive typography, and localized state integrity.",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      twitterUrl: ""
    },
    skills: [
      { name: "TypeScript / JS", level: 85, category: "Frontend" },
      { name: "React / Vite", level: 80, category: "Frontend" },
      { name: "Node.js & Express", level: 75, category: "Backend" },
      { name: "PostgreSQL Databases", level: 70, category: "Backend" },
      { name: "Jest / Autotesting", level: 80, category: "Other" }
    ],
    experience: [
      {
        id: "fg-exp1",
        company: "University Dev Lab",
        role: "Full-Stack Project Intern",
        startDate: "2025-06",
        endDate: "2026-05",
        description: "Built online scheduling systems using clean Express modules. Upgraded relational schema parameters to reduce response overhead by 25%.",
        technologies: ["React", "Express", "SQLite"]
      }
    ],
    projects: [
      {
        id: "fg-proj1",
        title: "Algorithmic Sandbox",
        description: "An educational visual engine enabling students to trace sort and search loops interactively in browser frames.",
        language: "TypeScript",
        stars: 48,
        githubUrl: "https://github.com",
        url: ""
      },
      {
        id: "fg-proj2",
        title: "Campus Study Cohort Tracker",
        description: "A geolocation mapping utility pairing study group coordinators with empty study space resources.",
        language: "React",
        stars: 32,
        githubUrl: "https://github.com",
        url: ""
      }
    ],
    education: [
      {
        id: "fg-edu1",
        school: "State University of Technology",
        degree: "Bachelor of Science",
        fieldOfStudy: "Computer Science",
        startDate: "2022-09",
        endDate: "2026-05",
        description: "Class valedictorian. Specialized research on distributed system consensus models."
      }
    ],
    contact: {
      email: "graduate@example.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: ""
    },
    themeConfig: {
      type: "minimal",
      bgColor: "#fafafa",
      cardBgColor: "#ffffff",
      textColor: "#18181b",
      textColorMuted: "#71717a",
      fontFamily: "var(--font-sans)",
      accentColor: "#18181b",
      borderColor: "#e4e4e7"
    }
  },
  senior_engineer: {
    name: "Senior Architect baseline structure",
    description: "Engineered for high-performing systems architects. Features enterprise scaling achievements, lead indicators, and technical metrics.",
    hero: {
      badgeText: "🚀 Staff Architect available for full-time technical leadership",
      title: "Principal Platform Architect",
      subtitle: "Deconstructing web monoliths into concurrent services. Directing high-impact distributed environments to maximize query speed and minimize resource footprints.",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      callToActionText: "Inspect Cloud Infrastructure"
    },
    about: {
      bio: "Over 8 years of production-proven architecting experience. Expertise spans cluster container orchestration, multi-tenant databases, and modern UI performance.",
      expandedBio: "I focus on engineering highly available systems that serve millions of active web sessions with minimal cold starts. I advocate for strict compilation typing, automated CI safety checks, and telemetry logging configurations that detect system latency before they reach the interface layer.",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      twitterUrl: ""
    },
    skills: [
      { name: "System Architecture", level: 95, category: "Backend" },
      { name: "Golang / Rust", level: 92, category: "Backend" },
      { name: "K8s & Docker Clusters", level: 90, category: "Other" },
      { name: "TypeScript / NextJS", level: 85, category: "Frontend" },
      { name: "Gemini Integration", level: 80, category: "AI / Data" }
    ],
    experience: [
      {
        id: "se-exp1",
        company: "Stripe Enterprise Systems",
        role: "Staff Software Engineer",
        startDate: "2023-01",
        endDate: "Present",
        description: "Rebuilt core transactional broker pathways to scale safe ledger ingestion, reducing overall heap storage metrics during settlement hours by 40%.",
        technologies: ["Go", "Kafka", "PostgreSQL", "Kubernetes"]
      },
      {
        id: "se-exp2",
        company: "Vercel Scale Services",
        role: "Senior UX Solutions Lead",
        startDate: "2020-03",
        endDate: "2022-12",
        description: "Optimized complex static builds for continuous integration flows, accelerating production deployment cycle speeds by over 50%.",
        technologies: ["TypeScript", "Next.js", "Serverless"]
      }
    ],
    projects: [
      {
        id: "se-proj1",
        title: "Bespoke Telemetry Exporter",
        description: "Supercharged Prometheus metrics tracker filtering query latencies on large clustered storage deployments.",
        language: "Go",
        stars: 340,
        githubUrl: "https://github.com",
        url: ""
      },
      {
        id: "se-proj2",
        title: "Fast Edge Cache Interceptor",
        description: "Localized content proxies returning sub-millisecond route checks without cold storage database rounds.",
        language: "Rust",
        stars: 285,
        githubUrl: "https://github.com",
        url: ""
      }
    ],
    education: [
      {
        id: "se-edu1",
        school: "Institute of Technology",
        degree: "Master of Science",
        fieldOfStudy: "Computer Systems Engineering",
        startDate: "2015-09",
        endDate: "2017-06",
        description: "Master thesis exploring concurrent high-performance cluster databases."
      }
    ],
    contact: {
      email: "architect@example.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: ""
    },
    themeConfig: {
      type: "nothing",
      bgColor: "#09090b",
      textColor: "#ffffff",
      textColorMuted: "#71717a",
      fontFamily: "var(--font-mono)",
      accentColor: "#e11d48",
      borderColor: "#27272a"
    }
  },
  freelancer: {
    name: "Independent Consultant baseline structure",
    description: "Bespoke template for independent developers, founders, and UX consultants. Emphasizes swift delivery, client impact, and user experience.",
    hero: {
      badgeText: "⚡ Accepting custom client projects",
      title: "Full-Stack Developer & UX Consultant",
      subtitle: "Transforming ambitious startup concepts into fast, interactive production web products. Overdelivering clean responsive designs at rocket speed.",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      callToActionText: "Examine Client Portfolio"
    },
    about: {
      bio: "Agile product builder guiding founders and startups from prototyping to market-ready product launching.",
      expandedBio: "As an independent engineering contractor, I oversee web projects end to end. I assist product teams in constructing lightweight Tailwind interfaces, integrating robust serverless API microservices, and optimizing client checkout portals to maximize growth.",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      twitterUrl: ""
    },
    skills: [
      { name: "React / Next.js / Vue", level: 95, category: "Frontend" },
      { name: "Tailwind CSS & UX Layouts", level: 98, category: "Theme" },
      { name: "Serverless Gateways / AWS", level: 88, category: "Backend" },
      { name: "Stripe & Billing Systems", level: 90, category: "Other" },
      { name: "SEO / Web Vitals Optimization", level: 92, category: "Other" }
    ],
    experience: [
      {
        id: "fl-exp1",
        company: "Bespoke Dev Consultancy",
        role: "Lead Full-Stack Consultant",
        startDate: "2024-03",
        endDate: "Present",
        description: "Collaborated with three high-growth startups to launch consumer dashboards, expanding overall subscription conversion metrics by 18%.",
        technologies: ["React", "Tailwind", "Stripe", "Next.js"]
      },
      {
        id: "fl-exp2",
        company: "Nexus Product Studio",
        role: "UX Prototyping Specialist",
        startDate: "2023-05",
        endDate: "2024-02",
        description: "Built lightweight aesthetic frontend prototypes for venture capital funding pitches, securing multiple successful pre-seed rounds.",
        technologies: ["React", "Framer Motion", "Node.js"]
      }
    ],
    projects: [
      {
        id: "fl-proj1",
        title: "Modern Subscription Console",
        description: "An accessible dashboard styled to track monthly user recurring revenue, plan child churn rates, and historical invoice logs.",
        language: "TypeScript",
        stars: 125,
        githubUrl: "https://github.com",
        url: ""
      },
      {
        id: "fl-proj2",
        title: "Interactive Markdown Blueprint",
        description: "A fast, automated template generating elegant technical document assets dynamically for corporate knowledge centers.",
        language: "TypeScript",
        stars: 94,
        githubUrl: "https://github.com",
        url: ""
      }
    ],
    education: [
      {
        id: "fl-edu1",
        school: "Academy of Design & Arts",
        degree: "Associate Degree",
        fieldOfStudy: "Interactive Interaction Systems",
        startDate: "2020-09",
        endDate: "2022-06",
        description: "Concentration in responsive typography, user testing methodologies, and CSS layouts."
      }
    ],
    contact: {
      email: "consultant@example.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: ""
    },
    themeConfig: {
      type: "glassmorphism",
      bgColor: "#080c1d",
      cardBgColor: "rgba(255, 255, 255, 0.05)",
      textColor: "#f1f5f9",
      textColorMuted: "#94a3b8",
      fontFamily: "var(--font-sans)",
      accentColor: "#06b6d4",
      borderColor: "rgba(255, 255, 255, 0.1)"
    }
  }
};

export function EditorWorkspace() {
  const { 
    portfolio, 
    savePortfolio, 
    publishPortfolio, 
    fetchGithubProjects, 
    generateAIChatSug, 
    updateLocalPortfolioDirectly,
    refetchPortfolio,
    user,
    token
  } = useStore();

  const [activeTab, setActiveTab] = useState<"content" | "design" | "ai">("content");
  const [viewportMode, setViewportMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [publishToggling, setPublishToggling] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // GitHub user parsing
  const [githubUser, setGithubUser] = useState(user?.username || "");
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [fetchingRepos, setFetchingRepos] = useState(false);

  // AI Assistant Specific States
  const [aiTargetField, setAiTargetField] = useState<"title" | "subtitle" | "bio">("title");
  const [aiTone, setAiTone] = useState("Apple-like premium minimalism");
  const [aiDraft, setAiDraft] = useState("");
  const [generatingAI, setGeneratingAI] = useState(false);
  const [aiPromptHistory, setAiPromptHistory] = useState<string[]>([]);

  // Deep clone of portfolio state for local editing before official REST save triggers
  const [localPort, setLocalPort] = useState<PortfolioData | null>(null);
  const [pendingTemplate, setPendingTemplate] = useState<string | null>(null);

  const confirmApplyTemplate = () => {
    if (!pendingTemplate) return;
    const preset = TEMPLATE_PRESETS[pendingTemplate];
    if (!preset) return;

    updateLocal(draft => {
      draft.hero = JSON.parse(JSON.stringify(preset.hero));
      draft.about = JSON.parse(JSON.stringify(preset.about));
      draft.skills = JSON.parse(JSON.stringify(preset.skills));
      draft.experience = JSON.parse(JSON.stringify(preset.experience));
      draft.projects = JSON.parse(JSON.stringify(preset.projects));
      draft.education = JSON.parse(JSON.stringify(preset.education));
      draft.contact = JSON.parse(JSON.stringify(preset.contact));
      draft.themeConfig = JSON.parse(JSON.stringify(preset.themeConfig));
    });
    setPendingTemplate(null);
  };

  useEffect(() => {
    if (portfolio && !localPort) {
      setLocalPort(JSON.parse(JSON.stringify(portfolio)));
    }
  }, [portfolio]);

  if (!localPort) {
    return (
      <div className="flex h-full items-center justify-center text-zinc-400 font-mono">
        <RefreshCw className="w-6 h-6 animate-spin text-blue-500 mr-2" />
        Synchonizing Local Workspace Drafts...
      </div>
    );
  }

  // Handle local state transformations easily
  const updateLocal = (updater: (draft: PortfolioData) => void) => {
    const clone = JSON.parse(JSON.stringify(localPort)) as PortfolioData;
    updater(clone);
    setLocalPort(clone);
    // Instant Preview updates!
    updateLocalPortfolioDirectly(clone);
  };

  // REST Official save handler
  const handleSave = async () => {
    setSaving(true);
    const success = await savePortfolio(localPort);
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // Toggle publish state
  const handlePublishToggle = async () => {
    setPublishToggling(true);
    const success = await publishPortfolio(!localPort.isPublished);
    setPublishToggling(false);
    if (success) {
      updateLocal(d => { d.isPublished = !d.isPublished; });
      setPublishSuccess(true);
      setTimeout(() => setPublishSuccess(false), 3000);
    }
  };

  // Fetch GitHub repos live
  const grabGithub = async () => {
    setFetchingRepos(true);
    try {
      const repos = await fetchGithubProjects(githubUser);
      setGithubRepos(repos || []);
    } catch (e) {
      console.error(e);
    } finally {
      setFetchingRepos(false);
    }
  };

  // AI contents generation
  const handleAIEngine = async () => {
    setGeneratingAI(true);
    let originalText = "";
    if (aiTargetField === "title") originalText = localPort.hero.title;
    else if (aiTargetField === "subtitle") originalText = localPort.hero.subtitle;
    else if (aiTargetField === "bio") originalText = localPort.about.bio;

    try {
      const optimized = await generateAIChatSug(
        aiTargetField === "bio" ? "bio" : "hero",
        originalText || "Senior Dev and architect",
        aiTone
      );
      setAiDraft(optimized);
      setAiPromptHistory(prev => [
        `Optimized ${aiTargetField} in ${aiTone} tone.`,
        ...prev
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingAI(false);
    }
  };

  const applyAIDraft = () => {
    if (!aiDraft) return;
    updateLocal(draft => {
      if (aiTargetField === "title") draft.hero.title = aiDraft;
      if (aiTargetField === "subtitle") draft.hero.subtitle = aiDraft;
      if (aiTargetField === "bio") draft.about.bio = aiDraft;
    });
    setAiDraft("");
  };

  // Inline dynamic add / modify actions helper
  const addProject = () => {
    updateLocal(draft => {
      draft.projects.push({
        id: "proj-" + Date.now(),
        title: "New AI Project Hub",
        description: "A fast high-performance full-stack database gateway. Integrating real-time caching parameters.",
        language: "TypeScript",
        stars: 12,
        githubUrl: "",
        url: ""
      });
    });
  };

  const removeProject = (id: string) => {
    updateLocal(draft => {
      draft.projects = draft.projects.filter(p => p.id !== id);
    });
  };

  const addExperience = () => {
    updateLocal(draft => {
      draft.experience.push({
        id: "exp-" + Date.now(),
        company: "Vercel Scale",
        role: "Senior UX Integrations Architect",
        startDate: "2025-01-01",
        endDate: "Present",
        description: "Standardized modern full stack templates using NextJS with esbuild outputs, achieving cold-start optimization rates exceeding 45%.",
        technologies: ["React", "TypeScript", "Tailwind"]
      });
    });
  };

  const removeExperience = (id: string) => {
    updateLocal(draft => {
      draft.experience = draft.experience.filter(e => e.id !== id);
    });
  };

  const addSkill = () => {
    updateLocal(draft => {
      draft.skills.push({
        name: "Next.js / NodeJS",
        level: 90,
        category: "Frontend"
      });
    });
  };

  const removeSkill = (index: number) => {
    updateLocal(draft => {
      draft.skills.splice(index, 1);
    });
  };

  // Theme Config Cards helper
  const selectThemePreset = (type: any) => {
    updateLocal(draft => {
      draft.themeConfig.type = type;
      if (type === "cyberpunk") {
        draft.themeConfig.bgColor = "#070509";
        draft.themeConfig.cardBgColor = "rgba(21, 10, 33, 0.5)";
        draft.themeConfig.textColor = "#e2e8f0";
        draft.themeConfig.textColorMuted = "#94a3b8";
        draft.themeConfig.fontFamily = "var(--font-mono)";
        draft.themeConfig.accentColor = "#00f0ff";
        draft.themeConfig.borderColor = "#3b0764";
      } else if (type === "minimal") {
        draft.themeConfig.bgColor = "#fafafa";
        draft.themeConfig.cardBgColor = "#ffffff";
        draft.themeConfig.textColor = "#18181b";
        draft.themeConfig.textColorMuted = "#71717a";
        draft.themeConfig.fontFamily = "var(--font-sans)";
        draft.themeConfig.accentColor = "#18181b";
        draft.themeConfig.borderColor = "#e4e4e7";
      } else if (type === "glassmorphism") {
        draft.themeConfig.bgColor = "#080c1d";
        draft.themeConfig.cardBgColor = "rgba(255, 255, 255, 0.05)";
        draft.themeConfig.textColor = "#f1f5f9";
        draft.themeConfig.textColorMuted = "#94a3b8";
        draft.themeConfig.fontFamily = "var(--font-sans)";
        draft.themeConfig.accentColor = "#06b6d4";
        draft.themeConfig.borderColor = "rgba(255, 255, 255, 0.1)";
      } else if (type === "retro") {
        draft.themeConfig.bgColor = "#020500";
        draft.themeConfig.cardBgColor = "rgba(0, 10, 0, 0.3)";
        draft.themeConfig.textColor = "#00ff66";
        draft.themeConfig.textColorMuted = "rgba(0, 255, 102, 0.6)";
        draft.themeConfig.fontFamily = "var(--font-mono)";
        draft.themeConfig.accentColor = "#00ff66";
        draft.themeConfig.borderColor = "#00ff66";
      } else if (type === "nothing") {
        draft.themeConfig.bgColor = "#09090b";
        draft.themeConfig.textColor = "#ffffff";
        draft.themeConfig.textColorMuted = "#71717a";
        draft.themeConfig.fontFamily = "var(--font-mono)";
        draft.themeConfig.accentColor = "#e11d48";
        draft.themeConfig.borderColor = "#27272a";
      }
    });
  };

  return (
    <div className="flex h-full min-h-0 bg-[#09090b] text-zinc-100 overflow-hidden relative">
      {/* Editor Main split controls: LEFT */}
      <section className="w-[420px] shrink-0 border-r border-zinc-800 bg-[#0c0c0e] flex flex-col h-full min-h-0">
        <div className="flex border-b border-zinc-c border-zinc-800 text-xs uppercase font-bold tracking-wider">
          <button 
            onClick={() => setActiveTab("content")}
            className={`flex-1 py-4 text-center border-b-2 transition-colors cursor-pointer ${activeTab === "content" ? "border-blue-500 text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}
          >
            Content
          </button>
          <button 
            onClick={() => setActiveTab("design")}
            className={`flex-1 py-4 text-center border-b-2 transition-colors cursor-pointer ${activeTab === "design" ? "border-blue-500 text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}
          >
            Themes Presets
          </button>
          <button 
            onClick={() => setActiveTab("ai")}
            className={`flex-1 py-4 text-center border-b-2 transition-colors cursor-pointer ${activeTab === "ai" ? "border-blue-500 text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}
          >
            Gemini GenAI
          </button>
        </div>

        {/* Tab Scroller viewport */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 min-h-0">
          {/* TAB 1: CONTENT EDIT COPIES */}
          {activeTab === "content" && (
            <div className="space-y-6">
              {/* Quick Start Templates */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-1.5 flex justify-between items-center">
                  <span>Quick Start Templates</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-mono uppercase">New</span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-normal">
                  Select a common professional baseline structure to instantly auto-populate high-quality, relevant portfolio data fields.
                </p>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPendingTemplate("fresh_grad")}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${pendingTemplate === "fresh_grad" ? "border-blue-500 bg-blue-950/20" : "border-zinc-850 bg-[#0e0c10] hover:border-zinc-700"}`}
                  >
                    <GraduationCap className="w-5 h-5 text-emerald-400 mb-1.5" />
                    <span className="text-[11px] font-bold text-white block">Fresh Grad</span>
                    <span className="text-[9px] text-zinc-500 mt-0.5">Entry Level</span>
                  </button>

                  <button
                    onClick={() => setPendingTemplate("senior_engineer")}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${pendingTemplate === "senior_engineer" ? "border-blue-500 bg-blue-950/20" : "border-zinc-850 bg-[#0e0c10] hover:border-zinc-700"}`}
                  >
                    <Briefcase className="w-5 h-5 text-amber-400 mb-1.5" />
                    <span className="text-[11px] font-bold text-white block">Senior Dev</span>
                    <span className="text-[9px] text-zinc-500 mt-0.5">Staff & Arch</span>
                  </button>

                  <button
                    onClick={() => setPendingTemplate("freelancer")}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${pendingTemplate === "freelancer" ? "border-blue-500 bg-blue-950/20" : "border-zinc-850 bg-[#0e0c10] hover:border-zinc-700"}`}
                  >
                    <Zap className="w-5 h-5 text-cyan-400 mb-1.5" />
                    <span className="text-[11px] font-bold text-white block">Freelancer</span>
                    <span className="text-[9px] text-zinc-500 mt-0.5 font-sans">Consultant</span>
                  </button>
                </div>

                {/* Overwrite Confirmation inline card */}
                {pendingTemplate && (
                  <div className="bg-blue-950/30 border border-blue-500/20 p-4 rounded-xl space-y-3 animate-in fade-in slide-in-from-top-1">
                    <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                      <span>Overwrite Current Draft?</span>
                    </div>
                    <p className="text-[11px] text-zinc-300 leading-normal font-sans">
                      This will replace your current editor draft with the <strong>{pendingTemplate === "fresh_grad" ? "Fresh Graduate" : pendingTemplate === "senior_engineer" ? "Senior Architect" : "Independent Consultant"}</strong> setup. This includes preset projects, skills, biography, and a styling layout.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={confirmApplyTemplate}
                        className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold cursor-pointer transition-all active:scale-95"
                      >
                        Apply Template
                      </button>
                      <button
                        onClick={() => setPendingTemplate(null)}
                        className="flex-1 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-xs font-semibold cursor-pointer transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile/Hero Area */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-1.5 flex justify-between items-center">
                  <span>Hero Intro Screen</span>
                  <span className="text-[10px] bg-blue-950 text-blue-400 px-2 py-0.5 rounded uppercase">Active</span>
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 mb-1 block">Recruiter Badge Status Copy</label>
                  <input 
                    type="text"
                    value={localPort.hero.badgeText}
                    onChange={(e) => updateLocal(d => { d.hero.badgeText = e.target.value; })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. Open to contract positions"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 mb-1 block">Core Display Title</label>
                  <input 
                    type="text"
                    value={localPort.hero.title}
                    onChange={(e) => updateLocal(d => { d.hero.title = e.target.value; })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    placeholder="Headline e.g. Senior Full-stack Engineer"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 mb-1 block">Sub-Headline Synopsis</label>
                  <textarea 
                    value={localPort.hero.subtitle}
                    onChange={(e) => updateLocal(d => { d.hero.subtitle = e.target.value; })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs h-20 focus:ring-1 focus:ring-blue-500 focus:outline-none resize-none"
                    placeholder="Short summary of skills, specialties, or methodologies..."
                  />
                </div>
                <div className="space-y-4">
                  <AvatarUploader 
                    currentUrl={localPort.hero.avatarUrl || ""} 
                    onChangeUrl={(url) => updateLocal(d => { d.hero.avatarUrl = url; })} 
                    token={token} 
                  />
                  <div>
                    <label className="text-[11px] text-zinc-400 mb-1 block">Or Paste Direct Image link/URL</label>
                    <input 
                      type="text"
                      value={localPort.hero.avatarUrl || ""}
                      onChange={(e) => updateLocal(d => { d.hero.avatarUrl = e.target.value; })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                  </div>
                </div>
              </div>

              {/* Bio Details */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-1.5">
                  About & Background Bio
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 mb-1 block">Abridged Brief Bio Text</label>
                  <textarea 
                    value={localPort.about.bio}
                    onChange={(e) => updateLocal(d => { d.about.bio = e.target.value; })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs h-16 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    placeholder="Short bio block (visible in top sections)..."
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 mb-1 block">Comprehensive Expanded Bio</label>
                  <textarea 
                    value={localPort.about.expandedBio}
                    onChange={(e) => updateLocal(d => { d.about.expandedBio = e.target.value; })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs h-24 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    placeholder="Tell your life journey, developer goals, workspace focus, etc..."
                  />
                </div>
              </div>

              {/* GitHub Synchronizer pipeline */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-1.5 flex justify-between items-center">
                  <span>GitHub Repository Sync</span>
                  <Github className="w-3.5 h-3.5 text-zinc-500" />
                </div>
                <p className="text-[10px] text-zinc-500 leading-normal">
                  Connect your public profile node and pull your top repository projects into your portfolio template.
                </p>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={githubUser}
                    onChange={(e) => setGithubUser(e.target.value.trim())}
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500"
                    placeholder="GitHub Username"
                  />
                  <button 
                    onClick={grabGithub}
                    disabled={fetchingRepos}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"
                  >
                    {fetchingRepos ? "Syncing..." : "Scan Repos"}
                  </button>
                </div>

                {githubRepos.length > 0 && (
                  <div className="border border-zinc-800 bg-zinc-950/50 rounded-xl p-3 max-h-56 overflow-y-auto space-y-2">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase block">Discovered Public Repos ({githubRepos.length})</span>
                    {githubRepos.map((repo) => (
                      <div key={repo.id} className="flex justify-between items-start text-[11px] border-b border-zinc-900 pb-2 last:border-0 last:pb-0">
                        <div className="pr-2">
                          <span className="font-bold text-zinc-300 block">{repo.title}</span>
                          <span className="text-[9px] text-zinc-500 leading-normal line-clamp-1">{repo.description}</span>
                        </div>
                        <button 
                          onClick={() => {
                            updateLocal(draft => {
                              draft.projects.push(repo);
                            });
                            // Remove from active options
                            setGithubRepos(prev => prev.filter(p => p.id !== repo.id));
                          }}
                          className="bg-blue-600 hover:bg-blue-500 px-2 py-1 rounded text-[9px] text-white font-bold cursor-pointer"
                        >
                          Import
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Projects List controls */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-1.5 flex justify-between items-center">
                  <span>Portfolio Projects List</span>
                  <button 
                    onClick={addProject}
                    className="p-1 px-2 border border-dashed border-zinc-700 rounded text-[10px] text-blue-400 hover:text-white hover:border-white flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Insert Project
                  </button>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                  {localPort.projects.map((proj, idx) => (
                    <div key={proj.id} className="border border-zinc-800 bg-zinc-950/40 p-4 rounded-xl space-y-3 relative group">
                      <button 
                        onClick={() => removeProject(proj.id)}
                        className="absolute top-3 right-3 text-zinc-600 hover:text-red-400 cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="inline-block bg-zinc-900 border border-zinc-800 text-[9px] px-2 py-0.5 rounded font-mono text-zinc-400">
                        PROJECT #{idx + 1}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-zinc-500 mb-1 block">Title</label>
                          <input 
                            type="text" 
                            value={proj.title}
                            onChange={(e) => {
                              const v = e.target.value;
                              updateLocal(draft => { draft.projects[idx].title = v; });
                            }}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white" 
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-zinc-500 mb-1 block">Main Language Stack</label>
                          <input 
                            type="text" 
                            value={proj.language || ""}
                            onChange={(e) => {
                              const v = e.target.value;
                              updateLocal(draft => { draft.projects[idx].language = v; });
                            }}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white" 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-zinc-500 mb-1 block">Project Summary</label>
                        <textarea 
                          value={proj.description}
                          onChange={(e) => {
                            const v = e.target.value;
                            updateLocal(draft => { draft.projects[idx].description = v; });
                          }}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-300 h-14 resize-none" 
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-zinc-500 mb-1 block">Source Github URL</label>
                          <input 
                            type="text" 
                            value={proj.githubUrl || ""}
                            onChange={(e) => {
                              const v = e.target.value;
                              updateLocal(draft => { draft.projects[idx].githubUrl = v; });
                            }}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white" 
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-zinc-500 mb-1 block">Output Live URL</label>
                          <input 
                            type="text" 
                            value={proj.url || ""}
                            onChange={(e) => {
                              const v = e.target.value;
                              updateLocal(draft => { draft.projects[idx].url = v; });
                            }}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white" 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {localPort.projects.length === 0 && (
                    <div className="text-zinc-600 text-xs border border-dashed border-zinc-950 p-4 text-center">
                      No active projects added. Pull from GitHub or insert above!
                    </div>
                  )}
                </div>
              </div>

              {/* Skills Area */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-1.5 flex justify-between items-center">
                  <span>Skills & Frameworks Slider</span>
                  <button 
                    onClick={addSkill}
                    className="p-1 border border-dashed border-zinc-700 text-blue-400 hover:text-white rounded text-[9px] flex items-center gap-1 cursor-pointer"
                  >
                    + Add Block
                  </button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {localPort.skills.map((s, index) => (
                    <div key={index} className="flex gap-2 items-center bg-zinc-950/20 border border-zinc-900 p-2 rounded-lg">
                      <input 
                        type="text"
                        value={s.name}
                        onChange={(e) => {
                          const v = e.target.value;
                          updateLocal(d => { d.skills[index].name = v; });
                        }}
                        className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-200"
                        placeholder="TypeScript"
                      />
                      <input 
                        type="number"
                        min="0"
                        max="100"
                        value={s.level}
                        onChange={(e) => {
                          const v = parseInt(e.target.value) || 0;
                          updateLocal(d => { d.skills[index].level = v; });
                        }}
                        className="w-14 bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-center text-xs text-zinc-100"
                      />
                      <select 
                        value={s.category}
                        onChange={(e) => {
                          const v = e.target.value;
                          updateLocal(d => { d.skills[index].category = v; });
                        }}
                        className="bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 p-1 font-bold"
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="AI / Data">AI Pipeline</option>
                        <option value="Other">Other</option>
                      </select>
                      <button 
                        onClick={() => removeSkill(index)}
                        className="text-zinc-600 hover:text-red-400 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience layout items */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-1.5 flex justify-between items-center">
                  <span>Job Experience chronicle</span>
                  <button 
                    onClick={addExperience}
                    className="p-1 px-2 border border-dashed border-zinc-700 rounded text-[10px] text-blue-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    + Add Experience
                  </button>
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                  {localPort.experience.map((exp, idx) => (
                    <div key={exp.id} className="border border-zinc-800 bg-zinc-950/40 p-4 rounded-xl space-y-3 relative">
                      <button 
                        onClick={() => removeExperience(exp.id)}
                        className="absolute top-3 right-3 text-zinc-600 hover:text-red-400 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="inline-block bg-zinc-900 border border-zinc-800 text-[9px] px-2 py-0.5 rounded font-mono text-zinc-400">
                        EXPERIENCE #{idx + 1}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-zinc-400 mb-1 block">Company Name</label>
                          <input 
                            type="text" 
                            value={exp.company}
                            onChange={(e) => {
                              const v = e.target.value;
                              updateLocal(d => { d.experience[idx].company = v; });
                            }}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-white" 
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-zinc-400 mb-1 block">Role / Designation</label>
                          <input 
                            type="text" 
                            value={exp.role}
                            onChange={(e) => {
                              const v = e.target.value;
                              updateLocal(d => { d.experience[idx].role = v; });
                            }}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-white" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-zinc-400 mb-1 block">Start Date</label>
                          <input 
                            type="text" 
                            value={exp.startDate}
                            onChange={(e) => {
                              const v = e.target.value;
                              updateLocal(d => { d.experience[idx].startDate = v; });
                            }}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-white" 
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-zinc-400 mb-1 block">End Date (or 'Present')</label>
                          <input 
                            type="text" 
                            value={exp.endDate}
                            onChange={(e) => {
                              const v = e.target.value;
                              updateLocal(d => { d.experience[idx].endDate = v; });
                            }}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-white" 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-zinc-400 mb-1 block">Description of responsibilities</label>
                        <textarea 
                          value={exp.description}
                          onChange={(e) => {
                            const v = e.target.value;
                            updateLocal(d => { d.experience[idx].description = v; });
                          }}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-xs text-zinc-300 h-16 resize-none focus:outline-none focus:border-red-500" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links definitions */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-1.5">
                  Universal Social Contacts
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 mb-1 block">Contact Email Address</label>
                  <input 
                    type="email"
                    value={localPort.contact.email}
                    onChange={(e) => updateLocal(d => { d.contact.email = e.target.value; })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 mb-1 block">Github Sync Link</label>
                  <input 
                    type="text"
                    value={localPort.about.githubUrl}
                    onChange={(e) => updateLocal(d => { d.about.githubUrl = e.target.value; d.contact.github = e.target.value; })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 mb-1 block">LinkedIn Address Path</label>
                  <input 
                    type="text"
                    value={localPort.about.linkedinUrl}
                    onChange={(e) => updateLocal(d => { d.about.linkedinUrl = e.target.value; d.contact.linkedin = e.target.value; })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DESIGN / THEME SELECTOR */}
          {activeTab === "design" && (
            <div className="space-y-6">
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-1.5">
                Select Active Theme
              </div>
              <p className="text-[11px] text-zinc-400 leading-normal">
                DevFolio AI incorporates five bespoke layouts styled specifically to display technical expertise elegantly. Choose one to swap stylesheets instantly:
              </p>

              <div className="space-y-4 select-none">
                {/* 1. Cyberpunk Neon */}
                <button 
                  onClick={() => selectThemePreset("cyberpunk")}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${localPort.themeConfig.type === "cyberpunk" ? "border-cyan-400 bg-purple-950/20" : "border-zinc-800 bg-[#0c0c0e] hover:border-zinc-700"}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-xs text-white">Cyberpunk Neon</span>
                    <span className="text-[8px] bg-cyan-950 text-cyan-400 border border-cyan-400/30 px-1.5 py-0.5 rounded font-black tracking-widest">NEON_ACTIVE</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-normal">
                    Luminous cyan highlighting, phosphor grid lines, retro dark layout panels.
                  </p>
                </button>

                {/* 2. Minimal Professional */}
                <button 
                  onClick={() => selectThemePreset("minimal")}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${localPort.themeConfig.type === "minimal" ? "border-zinc-200 bg-white text-black" : "border-zinc-800 bg-[#0c0c0e] hover:border-zinc-700"}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`font-bold text-xs ${localPort.themeConfig.type === "minimal" ? "text-zinc-900" : "text-white"}`}>Minimal Professional</span>
                    <span className="text-[8px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded">LIGHT STYLE</span>
                  </div>
                  <p className={`text-[10px] leading-normal ${localPort.themeConfig.type === "minimal" ? "text-zinc-500" : "text-zinc-500"}`}>
                    Pristine white layouts, clean charcoal typography, generous negative space.
                  </p>
                </button>

                {/* 3. Glassmorphism */}
                <button 
                  onClick={() => selectThemePreset("glassmorphism")}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${localPort.themeConfig.type === "glassmorphism" ? "border-cyan-500 bg-white/5" : "border-zinc-800 bg-[#0c0c0e] hover:border-zinc-700"}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-xs text-white">Glassmorphism</span>
                    <span className="text-[8px] bg-blue-950 text-blue-300 border border-blue-500/30 px-1.5 py-0.5 rounded font-bold">FROSTED FRAME</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-normal">
                    Drifting background vector halos, frosted transparent cards with blurred backing.
                  </p>
                </button>

                {/* 4. Retro Futuristic */}
                <button 
                  onClick={() => selectThemePreset("retro")}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${localPort.themeConfig.type === "retro" ? "border-[#00ff66] bg-[#001100]/20" : "border-zinc-800 bg-[#0c0c0e] hover:border-zinc-700"}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-xs text-[#00ff66]">Retro Terminal</span>
                    <span className="text-[8px] border border-[#00ff66]/40 text-[#00ff66] px-1.5 py-0.5 rounded font-mono">PHOSPHOR GREEN</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-normal">
                    Vintage green phosphor, scanlines filter, monospaced ASCII visual widgets.
                  </p>
                </button>

                {/* 5. Nothing OS */}
                <button 
                  onClick={() => selectThemePreset("nothing")}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${localPort.themeConfig.type === "nothing" ? "border-red-500 bg-zinc-900" : "border-zinc-800 bg-[#0c0c0e] hover:border-zinc-700"}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-xs text-white font-mono uppercase">Nothing OS Inspired</span>
                    <span className="text-[8px] bg-red-600 text-white px-1.5 py-0.5 rounded font-bold font-mono">N_OS_v1.0</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-normal font-mono">
                    High contrast grayscale blocks, dot-matrix backdrops, single red accent pixel.
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: GEMINI AI COPILOT */}
          {activeTab === "ai" && (
            <div className="space-y-6">
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-1.5 flex justify-between items-center">
                <span>Gemini API Copilot</span>
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              </div>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Optimize developer copy values using Google GenAI models. Refine bullet points, design headline statements, or expand background bios.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-[11px] text-zinc-400 mb-1.5 block font-bold">Select Active Target Component</label>
                  <select 
                    value={aiTargetField}
                    onChange={(e: any) => setAiTargetField(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="title">Hero Headline Title</option>
                    <option value="subtitle">Hero Subtitle Statement</option>
                    <option value="bio">Background Bio Block</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-zinc-400 mb-1.5 block font-bold">Configure Target Tone Profile</label>
                  <select 
                    value={aiTone}
                    onChange={(e) => setAiTone(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="Apple-like premium minimalism">Apple-like premium minimalism</option>
                    <option value="Brutallist systems architect">Brutallist systems architect</option>
                    <option value="Punchy series-A startup CEO">Punchy series-A startup CEO</option>
                    <option value="Casual open-source wizard">Casual open-source wizard</option>
                  </select>
                </div>

                <button 
                  onClick={handleAIEngine}
                  disabled={generatingAI}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold rounded-lg text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-blue-600/15"
                >
                  {generatingAI ? "Optimizing content with Gemini..." : "Synthesize AI suggestion"}
                  <Sparkles className="w-3.5 h-3.5" />
                </button>

                {aiDraft && (
                  <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 space-y-3 relative">
                    <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                      <Lightbulb className="w-4 h-4 text-yellow-400 shrink-0" />
                      <span>Gemini Optimizer Suggestion</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-light">
                      "{aiDraft}"
                    </p>
                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={applyAIDraft}
                        className="flex-1 py-1 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] font-bold cursor-pointer"
                      >
                        Apply Suggestion
                      </button>
                      <button 
                        onClick={() => setAiDraft("")}
                        className="flex-1 py-1 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-[11px] font-semibold cursor-pointer"
                      >
                        Discard
                      </button>
                    </div>
                  </div>
                )}

                {aiPromptHistory.length > 0 && (
                  <div className="space-y-2 pt-4">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">Copilot History logs</span>
                    {aiPromptHistory.slice(0, 3).map((hist, i) => (
                      <div key={i} className="text-[10px] text-zinc-500 bg-zinc-950 p-2 rounded border border-zinc-900 flex justify-between">
                        <span>{hist}</span>
                        <span className="text-emerald-500">COMPLETE</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Triggers footer */}
        <div className="p-4 border-t border-zinc-800 bg-[#09090b] flex flex-col gap-2">
          {saveSuccess && (
            <div className="bg-emerald-950/40 border border-emerald-500/35 text-emerald-400 p-2.5 rounded-lg text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 animate-bounce" />
              <span>Draft layout saved to persistent db.</span>
            </div>
          )}
          {publishSuccess && (
            <div className="bg-blue-950/40 border border-blue-500/35 text-blue-400 p-2.5 rounded-lg text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Publish sync is finalized successfully.</span>
            </div>
          )}
          
          <div className="flex gap-2">
            <button 
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-2.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 disabled:bg-zinc-950 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? "Storing..." : "Save Draft"}
            </button>
            <button 
              onClick={handlePublishToggle}
              disabled={publishToggling}
              className={`flex-1 py-2.5 font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer ${localPort.isPublished ? "bg-red-950/30 text-red-400 border border-red-500/20 hover:bg-red-950/50" : "bg-blue-600 hover:bg-blue-500 text-white"}`}
            >
              <Globe className="w-3.5 h-3.5" />
              {publishToggling ? "Updating..." : localPort.isPublished ? "Unpublish portfolio" : "Publish Live website"}
            </button>
          </div>
        </div>
      </section>

      {/* Editor Main split preview frame: RIGHT */}
      <section className="flex-1 bg-[#121214] p-6 md:p-8 flex flex-col items-center justify-start min-h-0 h-full">
        <header className="w-full flex justify-between items-center mb-6 max-w-4xl">
          <div className="flex items-center gap-4 text-xs font-light">
            <span className="text-zinc-500 uppercase tracking-wider font-semibold">Active Live Website Screen Preview</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all ${localPort.isPublished ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-zinc-800 text-zinc-500"}`}>
              {localPort.isPublished ? "Published" : "Draft Mode"}
            </span>
          </div>

          {/* Viewport Toggles */}
          <div className="flex bg-[#0c0c0e] rounded-xl border border-zinc-800 p-1 divide-x divide-zinc-800">
            <button 
              onClick={() => setViewportMode("desktop")}
              className={`p-2 transition-all cursor-pointer rounded-lg ${viewportMode === "desktop" ? "text-blue-400 bg-zinc-900" : "text-zinc-500 hover:text-white"}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewportMode("tablet")}
              className={`p-2 transition-all cursor-pointer rounded-lg ${viewportMode === "tablet" ? "text-blue-400 bg-zinc-900" : "text-zinc-500 hover:text-white"}`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewportMode("mobile")}
              className={`p-2 transition-all cursor-pointer rounded-lg ${viewportMode === "mobile" ? "text-blue-400 bg-zinc-900" : "text-zinc-500 hover:text-white"}`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dynamic responsive frame mockup with smooth viewport adjustments */}
        <div 
          className="flex-1 w-full bg-zinc-900 border border-zinc-800 shadow-2xl transition-all duration-300 ease-in-out relative flex flex-col items-center overflow-hidden rounded-2xl"
          style={{
            maxWidth: viewportMode === "desktop" ? "100%" : viewportMode === "tablet" ? "768px" : "380px",
          }}
        >
          {/* Framer mock browser top bar */}
          <div className="w-full bg-[#0c0c0e] border-b border-zinc-800 h-10 px-4 flex items-center justify-between text-zinc-500 shrink-0">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40"></div>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 px-6 py-0.5 rounded text-[10px] font-mono select-all flex items-center gap-1.5 max-w-sm truncate text-ellipsis">
              <Globe className="w-3 h-3 text-zinc-500 shrink-0" />
              <span>devfolio.ai/portfolio/{localPort.username}</span>
            </div>
            <div className="w-12"></div>
          </div>

          {/* Render Component directly inside scroll area */}
          <div className="w-full flex-1 overflow-y-auto bg-zinc-950">
            <PortfolioView data={localPort} isPreview={true} />
          </div>
        </div>
      </section>
      
      {/* Interactive AI Chatbot Pilot */}
      <AiChatbot portfolio={localPort} updateLocal={updateLocal} token={token} />
    </div>
  );
}
