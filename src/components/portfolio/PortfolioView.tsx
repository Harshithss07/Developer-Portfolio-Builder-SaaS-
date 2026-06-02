import { useState, FormEvent } from "react";
import { PortfolioData, Project, Skill, Experience, Education } from "../../types";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ExternalLink, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Globe, 
  Terminal, 
  Cpu, 
  Heart, 
  Check, 
  Clock, 
  Download,
  Flame,
  ArrowRight
} from "lucide-react";

interface PortfolioViewProps {
  data: PortfolioData;
  isPreview?: boolean;
}

export function PortfolioView({ data, isPreview = false }: PortfolioViewProps) {
  const { themeConfig, hero, about, skills, experience, projects, education, contact } = data;
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Theme Constants based on data.themeConfig.type
  const isCyber = themeConfig.type === "cyberpunk";
  const isMinimal = themeConfig.type === "minimal";
  const isGlass = themeConfig.type === "glassmorphism";
  const isRetro = themeConfig.type === "retro";
  const isNothing = themeConfig.type === "nothing";

  // Simulate downloading resume
  const handleDownloadResume = async () => {
    setDownloading(true);
    if (!isPreview) {
      try {
        await fetch(`/api/portfolio/p/${data.username}/download`, { method: "POST" });
      } catch (err) {
        console.error(err);
      }
    }
    setTimeout(() => {
      setDownloading(false);
      // Create and trigger mock PDF download
      const element = document.createElement("a");
      const file = new Blob([`
        RESUME SUMMARY OF ${data.hero.title || "Developer"}
        Username: @${data.username}
        Bio: ${data.about.bio}
        Skills: ${data.skills.map(s => s.name).join(", ")}
      `], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${data.username || "developer"}_resume.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1000);
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => setContactSuccess(false), 4000);
  };

  // 1. CYBERPUNK THEME RENDER
  if (isCyber) {
    return (
      <div className="w-full min-h-screen bg-[#070509] text-zinc-100 font-mono relative overflow-hidden pb-20">
        {/* Neon Cyber Grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#150a21_1px,transparent_1px),linear-gradient(to_bottom,#150a21_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-950/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Outer Frame Lines */}
        <div className="max-w-5xl mx-auto px-6 pt-12 relative z-10">
          <header className="border border-purple-900 bg-purple-950/30 p-6 rounded-lg mb-12 flex flex-col md:flex-row justify-between items-center gap-4 shadow-[0_0_15px_rgba(147,51,234,0.1)]">
            <div className="flex items-center gap-3">
              <span className="text-cyan-400 font-bold tracking-widest text-lg">&lt;{data.username.toUpperCase()} /&gt;</span>
              <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded font-black tracking-widest">NETWORK LINK OK</span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-purple-400">THEME_ACTIVE: CYBER_NEON_v2.5</span>
              <button 
                onClick={handleDownloadResume}
                className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded font-bold transition-all flex items-center gap-2 shadow-[0_0_10px_rgba(6,182,212,0.5)] cursor-pointer"
              >
                <Download className="w-4 h-4" /> {downloading ? "DOWNLOAD_SYNCING..." : "PULL_RESUME"}
              </button>
            </div>
          </header>

          {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-16 border-b border-purple-950 pb-16">
            <div className="lg:col-span-2 space-y-6">
              <div className="inline-flex items-center gap-2 bg-purple-950/70 border border-purple-500/30 px-3 py-1 rounded text-xs text-purple-300">
                <Flame className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
                <span>{hero.badgeText || "GRID_RECRUIT_PRIORITY"}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {hero.title || "SYSTEM_OPERATOR"} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 shadow-sm">&lt;{themeConfig.type.toUpperCase()}_ENG_MODE&gt;</span>
              </h1>
              <p className="text-base text-zinc-400 leading-relaxed max-w-xl">
                {hero.subtitle || "Synthesizing full stack services with pixel precision."}
              </p>
              <div className="flex gap-4">
                <a href="#projects" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white px-6 py-3 rounded font-bold text-sm tracking-widest transition-all shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                  {hero.callToActionText || "EXPLORE_GRID"}
                </a>
                <a href="#contact" className="border border-cyan-500/40 text-cyan-400 bg-cyan-950/10 hover:bg-cyan-950/30 px-6 py-3 rounded font-bold text-sm tracking-widest transition-all">
                  PING_ME
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative p-2 border border-cyan-500/40 bg-zinc-950 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 border border-black animate-ping rounded-full"></div>
                <img 
                  src={hero.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80"} 
                  alt="avatar" 
                  className="w-48 h-48 md:w-56 md:h-56 object-cover rounded filter grayscale sepia-30 accent-cyan-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-1 left-1 bg-black/80 text-[8px] text-zinc-500 p-1 rounded border border-purple-950">ID: {data.username}-SYS</div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-purple-950 pb-16">
            <div>
              <h2 className="text-xl font-bold text-pink-500 tracking-wider mb-4 uppercase shrink-0 flex items-center gap-2">
                <span className="text-xs text-cyan-400">&gt;</span> 01 // BIO
              </h2>
              <div className="text-zinc-500 text-xs">LOGGED_TAMP_STAMP: 2026-05-21</div>
            </div>
            <div className="md:col-span-2 space-y-4 text-zinc-300 text-sm leading-relaxed">
              <p className="border-l-2 border-cyan-500 pl-4 py-1 bg-cyan-950/10 rounded-r">
                {about.bio}
              </p>
              <p>{about.expandedBio}</p>
              <div className="flex gap-4 pt-4">
                {about.githubUrl && (
                  <a href={about.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 border border-purple-500/20 rounded bg-purple-950/30 text-purple-300 hover:text-cyan-400 hover:border-cyan-400 transition-all">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {about.linkedinUrl && (
                  <a href={about.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2 border border-purple-500/20 rounded bg-purple-950/30 text-purple-300 hover:text-cyan-400 hover:border-cyan-400 transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {about.twitterUrl && (
                  <a href={about.twitterUrl} target="_blank" rel="noopener noreferrer" className="p-2 border border-purple-500/20 rounded bg-purple-950/30 text-purple-300 hover:text-cyan-400 hover:border-cyan-400 transition-all">
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* Skills Grid */}
          <section className="mb-16 border-b border-purple-950 pb-16">
            <h2 className="text-xl font-bold text-pink-500 tracking-wider mb-8 uppercase flex items-center gap-2">
              <span className="text-xs text-cyan-400">&gt;</span> 02 // TECHNICAL_MODULES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((s, idx) => (
                <div key={idx} className="border border-purple-900 bg-purple-950/20 p-4 rounded hover:border-cyan-400 transition-all shadow-[0_0_8px_rgba(0,0,0,0.5)]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-zinc-300">{s.name}</span>
                    <span className="text-[10px] text-cyan-400">{s.level}%</span>
                  </div>
                  <div className="w-full bg-zinc-950 h-2 rounded overflow-hidden p-0.5 border border-purple-950">
                    <div className="bg-cyan-500 h-full rounded-sm" style={{ width: `${s.level}%` }}></div>
                  </div>
                  <span className="text-[9px] text-purple-400 block mt-2 tracking-widest">{s.category.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Experience Timeline */}
          {experience.length > 0 && (
            <section className="mb-16 border-b border-purple-950 pb-16">
              <h2 className="text-xl font-bold text-pink-500 tracking-wider mb-8 uppercase flex items-center gap-2">
                <span className="text-xs text-cyan-400">&gt;</span> 03 // DEPLOYED_CHRONICLE
              </h2>
              <div className="space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id} className="border border-purple-950 bg-zinc-950/40 p-6 rounded-lg relative hover:border-purple-500/40 transition-all">
                    <div className="absolute top-4 right-4 bg-cyan-950 text-cyan-400 text-[10px] border border-cyan-500/40 px-2 py-0.5 rounded font-bold">
                      {exp.startDate} - {exp.endDate}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 tracking-tight">{exp.role}</h3>
                    <div className="text-cyan-400 text-xs mb-3">{exp.company}</div>
                    <p className="text-zinc-400 text-xs leading-relaxed mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((t, i) => (
                        <span key={i} className="text-[9px] bg-purple-950/60 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects Area */}
          <section id="projects" className="mb-16 border-b border-purple-950 pb-16">
            <h2 className="text-xl font-bold text-pink-500 tracking-wider mb-8 uppercase flex items-center gap-2">
              <span className="text-xs text-cyan-400">&gt;</span> 04 // SOURCE_REPOSITORIES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="border border-purple-900 bg-purple-950/10 hover:bg-purple-950/20 rounded-lg p-6 flex flex-col justify-between transition-all hover:-translate-y-1 hover:border-pink-500/60 shadow-lg">
                  <div>
                    <div className="flex items-center justify-between mb-3 border-b border-purple-950 pb-2">
                      <span className="text-[9px] bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-400/20">
                        {proj.language || "TypeScript"}
                      </span>
                      {proj.stars !== undefined && (
                        <span className="text-[10px] text-yellow-400 flex items-center gap-1">★ {proj.stars}</span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{proj.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4 h-16 overflow-y-auto pr-1">{proj.description}</p>
                  </div>
                  <div className="flex gap-4 text-xs pt-2">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1 font-bold">
                        <Github className="w-3.5 h-3.5" /> CODE
                      </a>
                    )}
                    {proj.url && (
                      <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline flex items-center gap-1 font-bold">
                        <ExternalLink className="w-3.5 h-3.5" /> LIVE
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Form */}
          <section id="contact" className="max-w-2xl mx-auto border border-purple-900 bg-purple-950/20 p-8 rounded-lg shadow-xl shadow-purple-950/10 relative">
            <h2 className="text-xl font-bold text-cyan-400 tracking-wider mb-4 transition-colors uppercase select-none flex items-center gap-2">
              &gt; ESTABLISH_P2P_COMMS
            </h2>
            <p className="text-xs text-zinc-400 mb-6 font-thin leading-relaxed">
              Submit your coordinate credentials below and query active communication pathways. Response queue prioritized automatically.
            </p>
            {contactSuccess ? (
              <div className="bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 p-4 rounded text-xs">
                PING STATUS: OK. Transmission sent to Alex node successfully.
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] text-purple-400 block mb-1">EMAIL_COORDINATE</label>
                  <input type="email" required className="w-full bg-zinc-950 border border-purple-950 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400" placeholder="guest@domain.com" />
                </div>
                <div>
                  <label className="text-[10px] text-purple-400 block mb-1">Query DATA_STREAM</label>
                  <textarea required className="w-full bg-zinc-950 border border-purple-950 rounded px-3 py-2 text-xs text-white h-24 focus:outline-none focus:border-cyan-400" placeholder="Type message code..."></textarea>
                </div>
                <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold p-2.5 rounded text-xs tracking-wider transition-all cursor-pointer">
                  TRANSMIT_PACKET
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    );
  }

  // 2. RETRO FUTURISTIC THEME
  if (isRetro) {
    return (
      <div className="w-full min-h-screen bg-[#020500] text-[#00ff66] font-mono p-6 relative pb-20 leading-relaxed overflow-hidden">
        {/* Phosphorus CRT Screen effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/20 pointer-events-none opacity-30"></div>
        <header className="border-b-2 border-[#00ff66] pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="text-lg font-bold uppercase tracking-wider text-[#00ff66] animate-pulse">*** DEVFOLIO TERMINAL v1.0.1 ***</div>
            <div className="text-xs text-[#00ff66]/70">SYS OPERATOR: @{data.username}</div>
          </div>
          <button 
            onClick={handleDownloadResume}
            className="border-2 border-[#00ff66] bg-transparent hover:bg-[#00ff66]/10 px-4 py-1.5 uppercase text-xs font-bold leading-none cursor-pointer"
          >
            {downloading ? "ACCESSING RESUME..." : "DOWNLOAD RESUME"}
          </button>
        </header>

        <main className="max-w-4xl mx-auto space-y-12">
          {/* Main Hero block */}
          <div className="border-2 border-[#00ff66] p-6 rounded bg-[#010a01]">
            <div className="text-xs text-[#00ff66]/50 mb-2">[$] cat greeting.txt</div>
            <div className="inline-block bg-[#00ff66]/10 border border-[#00ff66] text-xs px-2 py-0.5 rounded mb-4">
              {hero.badgeText || "SYS_READY"}
            </div>
            <h1 className="text-3xl font-black uppercase mb-4 tracking-normal leading-tight">
              {hero.title || "SOFTWARE OPERATOR"}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed mb-4 text-[#00ff66]/90">
              {hero.subtitle || "Synthesizing reactive microstructures."}
            </p>
            <div className="text-xs flex gap-4 text-[#00ff66]/75">
              <span>AVATAR SYNCED: [{hero.avatarUrl ? "ACTIVE" : "NONE"}]</span>
            </div>
          </div>

          {/* About layout */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold border-l-4 border-[#00ff66] pl-2 uppercase">&gt; MORE_INFORMATION.TXT</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 border border-[#00ff66]/50 p-4 rounded text-xs space-y-4">
                <p className="font-semibold">{about.bio}</p>
                <p className="text-[#00ff66]/80">{about.expandedBio}</p>
              </div>
              <div className="border border-[#00ff66]/50 p-4 rounded text-xs space-y-3">
                <div className="font-bold uppercase tracking-wider border-b border-[#00ff66]/30 pb-1">COMM_CHANNELS</div>
                <div className="space-y-1">
                  <div>GITHUB: <a href={about.githubUrl} className="hover:underline">{about.githubUrl}</a></div>
                  <div>LINKEDIN: <a href={about.linkedinUrl} className="hover:underline">{about.linkedinUrl}</a></div>
                  <div>TWITTER: <a href={about.twitterUrl} className="hover:underline">{about.twitterUrl}</a></div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills module */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold border-l-4 border-[#00ff66] pl-2 uppercase">&gt; MODULE_DIAGNOSTICS.EXE</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((s, i) => (
                <div key={i} className="border border-[#00ff66]/40 p-4 rounded hover:bg-[#00ff66]/5 transition-all text-xs">
                  <div className="flex justify-between font-bold mb-1 col-span-3">
                    <span>{s.name}</span>
                    <span>{s.level}%</span>
                  </div>
                  {/* ASCII styled slider bar */}
                  <div className="font-mono text-[9px] mt-1 text-[#00ff66]/60">
                    [{Array.from({ length: 15 }).map((_, idx) => (
                      <span key={idx} className={idx < (s.level / 6.6) ? "text-[#00ff66]" : "text-zinc-900"}>=</span>
                    ))}] {s.category}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects lists */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold border-l-4 border-[#00ff66] pl-2 uppercase">&gt; PROJECTS_REPO.DB</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="border-2 border-[#00ff66]/40 p-4 rounded hover:border-[#00ff66] hover:bg-[#003300]/10 transition-all text-xs flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold underline uppercase text-sm mb-1">{proj.title}</h3>
                    <p className="text-[#00ff66]/80 text-xs mb-3">{proj.description}</p>
                    <div className="text-[#00ff66]/50 mb-3">LANGUAGE_TAG: {proj.language || "UNKNOWN"}</div>
                  </div>
                  <div className="flex gap-4 border-t border-[#00ff66]/20 pt-2 text-[#00ff66]/70">
                    {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1 font-bold">[V_CODE]</a>}
                    {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1 font-bold">[O_LINK]</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience list */}
          {experience.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold border-l-4 border-[#00ff66] pl-2 uppercase">&gt; PROFESSIONAL_STATION_FILES</h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="border border-[#00ff66]/30 p-4 rounded text-xs space-y-1">
                    <div className="flex justify-between font-bold">
                      <div>ROLE: {exp.role.toUpperCase()}</div>
                      <div className="text-[#00ff66]/60">[{exp.startDate} - {exp.endDate}]</div>
                    </div>
                    <div className="text-[#00ff66]/80 font-semibold text-[11px]">STATION: {exp.company.toUpperCase()}</div>
                    <p className="text-[#00ff66]/70 mt-2">{exp.description}</p>
                    <div className="text-[#00ff66]/40 text-[10px] pt-1">INDEXED: {exp.technologies.join(", ")}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Retro inquiry contact form */}
          <section className="border border-[#00ff66] p-6 rounded bg-[#010501] max-w-xl mx-auto">
            <h3 className="font-bold uppercase text-center mb-2">&gt;&gt; LOG_MESSAGE_TRANSMISSION &lt;&lt;</h3>
            {contactSuccess ? (
              <div className="border border-[#00ff66] text-[#00ff66] p-3 text-xs text-center animate-pulse">
                TRANSMISSION COMPLETE. OK.
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3 text-xs">
                <div>
                  <div className="mb-1 text-[#00ff66]/60">FROM: [Enter Email Name]</div>
                  <input type="email" required className="w-full bg-[#000500] border border-[#00ff66] p-2 text-[#00ff66] focus:outline-none" placeholder="recruiter@cybernet.com" />
                </div>
                <div>
                  <div className="mb-1 text-[#00ff66]/60">ENCODE STREAM BUFFER:</div>
                  <textarea required className="w-full bg-[#000500] border border-[#00ff66] p-2 text-[#00ff66] h-20 focus:outline-none" placeholder="Construct message string..."></textarea>
                </div>
                <button type="submit" className="w-full bg-[#00ff66] text-black font-bold py-2 uppercase tracking-wide hover:bg-[#00d055] transition-all cursor-pointer">
                  [EX_TRANS_PACKET]
                </button>
              </form>
            )}
          </section>
        </main>
      </div>
    );
  }

  // 3. NOTHING OS INPIRED THEME
  if (isNothing) {
    return (
      <div className="w-full min-h-screen bg-zinc-950 text-white font-mono p-6 relative pb-24 md:p-12 overflow-hidden">
        {/* Subtle matrix dots for brutalist look */}
        <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-50"></div>
        
        <header className="max-w-4xl mx-auto border-b-2 border-zinc-700 pb-6 mb-12 flex justify-between items-center relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse"></div>
            <span className="font-bold uppercase tracking-tight text-sm">@{data.username.toUpperCase()}</span>
          </div>
          <button 
            onClick={handleDownloadResume}
            className="border border-white bg-white text-black hover:bg-black hover:text-white px-4 py-2 font-bold text-xs uppercase tracking-tight transition-all cursor-pointer"
          >
            {downloading ? "WAIT" : "CURRICULUM"}
          </button>
        </header>

        <main className="max-w-4xl mx-auto space-y-12 relative z-10">
          {/* Brutalist Intro Box */}
          <div className="border-2 border-white p-8 bg-zinc-950 relative">
            <div className="absolute top-3 right-3 text-[9px] text-zinc-500 uppercase tracking-widest">N_OS // SYS_STATUS</div>
            <div className="inline-block bg-white text-black font-bold text-[10px] px-2 py-0.5 uppercase mb-6 tracking-wider">
              {hero.badgeText || "ACTIVE"}
            </div>
            <h1 className="text-3xl md:text-5xl font-black uppercase mb-4 tracking-tighter leading-none text-white">
              {hero.title || "OPERATOR"}
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
              {hero.subtitle || "Simple functional responsive software."}
            </p>
          </div>

          {/* Split block: Bio & links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-zinc-800 pt-8">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-xs uppercase font-extrabold text-red-600 tracking-widest">01 / BACKGROUND DESCRIPTION</h3>
              <p className="text-base text-zinc-300 font-sans font-light leading-relaxed">{about.bio}</p>
              <p className="text-sm text-zinc-400 font-sans font-light leading-relaxed">{about.expandedBio}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs uppercase font-extrabold text-white tracking-widest">CONNECT</h3>
              <div className="flex flex-col gap-2 text-xs">
                {about.githubUrl && <a href={about.githubUrl} target="_blank" rel="noopener noreferrer" className="border border-zinc-800 p-2 text-zinc-400 hover:text-white hover:border-white transition-all">GITHUB</a>}
                {about.linkedinUrl && <a href={about.linkedinUrl} target="_blank" rel="noopener noreferrer" className="border border-zinc-800 p-2 text-zinc-400 hover:text-white hover:border-white transition-all">LINKEDIN</a>}
                {about.twitterUrl && <a href={about.twitterUrl} target="_blank" rel="noopener noreferrer" className="border border-zinc-800 p-2 text-zinc-400 hover:text-white hover:border-white transition-all">TWITTER</a>}
              </div>
            </div>
          </div>

          {/* Skills dot matrix cards */}
          <div className="border-t border-zinc-800 pt-8 space-y-6">
            <h3 className="text-xs uppercase font-extrabold text-red-600 tracking-widest">02 / DEVELOPER COMPONENT STACKS</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.map((s, i) => (
                <div key={i} className="border border-zinc-800 p-4 bg-zinc-900/20 rounded shadow-md">
                  <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">{s.category}</div>
                  <div className="font-bold text-sm text-white mb-2">{s.name}</div>
                  {/* Digital dot array representing percent */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, dIdx) => (
                      <div key={dIdx} className={`w-1.5 h-1.5 rounded-full ${dIdx < (s.level / 20) ? "bg-white" : "bg-zinc-800"}`}></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Grid blocks */}
          {experience.length > 0 && (
            <div className="border-t border-zinc-800 pt-8 space-y-6">
              <h3 className="text-xs uppercase font-extrabold text-white tracking-widest">03 / INDEXED WORK STATIONS</h3>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="border border-zinc-800 hover:border-white p-6 bg-zinc-950/40 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-base text-white">{exp.role}</h4>
                        <div className="text-zinc-500 text-xs mt-0.5">{exp.company}</div>
                      </div>
                      <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 ">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-zinc-400 text-xs font-sans font-light leading-relaxed mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5 text-[9px] text-zinc-400">
                      {exp.technologies.map((t, idx) => <span key={idx} className="bg-zinc-900 border border-zinc-800 px-2   py-0.5">{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Brutallist projects widgets */}
          <div className="border-t border-zinc-800 pt-8 space-y-6">
            <h3 className="text-xs uppercase font-extrabold text-red-600 tracking-widest">04 / COMPILED PORTFOLIO PROJECTS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="border-2 border-zinc-800 p-6 flex flex-col justify-between bg-zinc-950">
                  <div>
                    <span className="text-[10px] text-zinc-500 block mb-2 font-bold uppercase">{proj.language || "DOCK"}</span>
                    <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-tight">{proj.title}</h4>
                    <p className="text-zinc-400 text-xs font-sans font-light leading-relaxed mb-4">{proj.description}</p>
                  </div>
                  <div className="flex gap-4 text-xs pt-4 border-t border-zinc-900 font-bold">
                    {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors uppercase">CODE</a>}
                    {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors uppercase">LIVE</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clean Contact box */}
          <div className="max-w-xl mx-auto border-2 border-white p-6 bg-zinc-950 mt-12">
            <h3 className="text-center font-extrabold text-sm uppercase mb-4 tracking-wider">SUBMIT CONTACT REQUEST PACKET</h3>
            {contactSuccess ? (
              <div className="border border-white p-3 text-center text-xs animate-pulse font-bold text-red-500">
                DISPATCHED PACKET SUCCESFULLY
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-zinc-500 uppercase block mb-1">YOUR EMAIL</label>
                  <input type="email" required className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-white focus:outline-none focus:border-white" placeholder="recruiter@nothing.tech" />
                </div>
                <div>
                  <label className="text-zinc-500 uppercase block mb-1">YOUR MESSAGE DESCRIPTION</label>
                  <textarea required className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-white h-20 focus:outline-none focus:border-white" placeholder="Type message context..."></textarea>
                </div>
                <button type="submit" className="w-full bg-white text-black hover:bg-black hover:text-white hover:border border border-white font-bold py-2.5 uppercase tracking-wide transition-all cursor-pointer">
                  DISPATCH PACKET
                </button>
              </form>
            )}
          </div>
        </main>
      </div>
    );
  }

  // 4. GLASSMORPHISM THEME
  if (isGlass) {
    return (
      <div className="w-full min-h-screen bg-[#070b19] font-sans text-slate-100 relative overflow-hidden pb-20 select-none">
        {/* Dynamic moving pastel blobs in background */}
        <div className="absolute top-24 left-1/4 w-80 h-80 bg-fuchsia-600/20 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-24 right-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
        <div className="absolute top-1/2 left-2/3 w-64 h-64 bg-cyan-500/15 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-6 pt-12 relative z-10">
          <header className="backdrop-blur-md bg-white/5 border border-white/10 p-5 rounded-2xl mb-12 flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
              <span className="font-bold tracking-tight text-base">@ {data.username}</span>
            </div>
            <button 
              onClick={handleDownloadResume}
              className="bg-white/10 hover:bg-white/20 text-white font-medium text-xs px-4 py-2 border border-white/20 rounded-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-cyan-300" /> {downloading ? "Formatting..." : "Download Resume"}
            </button>
          </header>

          {/* Hero space */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-16 border-b border-white/10 pb-16">
            <div className="lg:col-span-2 space-y-6">
              <span className="px-3.5 py-1.5 bg-cyan-500/10 text-cyan-300 text-xs font-semibold rounded-full tracking-wide inline-block border border-cyan-400/25">
                {hero.badgeText || "Active & Available for contracts"}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {hero.title || "Full Stack Engineer"}
              </h1>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl font-light">
                {hero.subtitle || "Synthesizing microservices with crisp client interfaces."}
              </p>
              <div className="flex gap-4">
                <a href="#projects" className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-medium px-6 py-3 rounded-xl text-xs transition-all shadow-md">
                  {hero.callToActionText || "Inspect Projects"}
                </a>
                <a href="#contact" className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-xl text-xs transition-all">
                  Contact Me
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative p-1 bg-white/5 border border-white/15 rounded-3xl backdrop-blur-md shadow-2xl">
                <img 
                  src={hero.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80"} 
                  alt="Avatar" 
                  className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </section>

          {/* About section frosted glass */}
          <section className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 mb-16 shadow-lg space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              About Me
            </h2>
            <p className="text-sm text-slate-200 font-light leading-relaxed border-l-2 border-indigo-400 pl-4">
              {about.bio}
            </p>
            <p className="text-xs text-slate-300 font-light leading-relaxed leading-tall">
              {about.expandedBio}
            </p>
            <div className="flex gap-4 pt-2">
              {about.githubUrl && <a href={about.githubUrl} className="text-slate-400 hover:text-white"><Github className="w-5 h-5" /></a>}
              {about.linkedinUrl && <a href={about.linkedinUrl} className="text-slate-400 hover:text-white"><Linkedin className="w-5 h-5" /></a>}
              {about.twitterUrl && <a href={about.twitterUrl} className="text-slate-400 hover:text-white"><Twitter className="w-5 h-5" /></a>}
            </div>
          </section>

          {/* Skills with glowing progress dots */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-white tracking-tight mb-8">Technical Proficiencies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {skills.map((s, idx) => (
                <div key={idx} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all shadow-md">
                  <div className="flex justify-between text-xs font-semibold text-slate-200 mb-2">
                    <span>{s.name}</span>
                    <span>{s.level}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-400 to-indigo-400 h-full rounded-full" style={{ width: `${s.level}%` }}></div>
                  </div>
                  <span className="text-[10px] text-indigo-300 block mt-2 text-right tracking-tight">{s.category}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Projects grid styled beautifully */}
          <section id="projects" className="mb-16">
            <h2 className="text-xl font-bold text-white tracking-tight mb-8">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="backdrop-blur-lg bg-white/5 border border-white/15 rounded-2xl p-6 hover:bg-white/10 transition-all flex flex-col justify-between shadow-lg hover:-translate-y-1">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] bg-indigo-500/20 text-indigo-200 px-2.5 py-0.5 rounded-full border border-indigo-400/20">
                        {proj.language || "TypeScript"}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-2">{proj.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light mb-4 h-16 overflow-y-auto pr-1">{proj.description}</p>
                  </div>
                  <div className="flex gap-4 border-t border-white/10 pt-4 text-xs font-medium">
                    {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1 font-bold">Code</a>}
                    {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline flex items-center gap-1 font-bold">Live Demo</a>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience layout if present */}
          {experience.length > 0 && (
            <section className="mb-16">
              <h2 className="text-xl font-bold text-white tracking-tight mb-8">Work History</h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-2xl shadow-md">
                    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 mb-3">
                      <div>
                        <h4 className="font-semibold text-base text-white">{exp.role}</h4>
                        <div className="text-indigo-300 text-xs">{exp.company}</div>
                      </div>
                      <span className="text-[10px] bg-white/10 text-slate-200 px-3 py-1 rounded-full">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed font-light mb-4 pr-1">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-slate-300">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Contact glass forms */}
          <section id="contact" className="max-w-xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl">
            <h3 className="font-bold text-center text-lg mb-6">Contact Me</h3>
            {contactSuccess ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 p-4 rounded-xl text-center text-xs">
                Email dispatched. I'll get back to you shortly!
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-light">
                <div>
                  <label className="text-slate-400 block mb-1">Your Email</label>
                  <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400" placeholder="recruiter@company.com" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Message Details</label>
                  <textarea required className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white h-20 focus:outline-none focus:border-cyan-400" placeholder="Hello Alex, let's connect!"></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-white font-medium py-2.5 rounded-lg text-xs transition-all uppercase tracking-wider cursor-pointer">
                  Send Message
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    );
  }

  // 5. DEFAULT: MINIMALIST PROFESSIONAL THEME (isMinimal)
  return (
    <div className="w-full min-h-screen bg-[#fafafa] text-zinc-900 font-sans p-6 pb-24 md:p-16 relative">
      <header className="max-w-4xl mx-auto border-b border-zinc-200 pb-6 mb-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-zinc-900"></div>
          <span className="font-bold tracking-tight text-sm">@{data.username || "dev"}</span>
        </div>
        <button 
          onClick={handleDownloadResume}
          className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 shadow-sm"
        >
          <Download className="w-3.5 h-3.5" /> {downloading ? "Downloading..." : "Download Resume"}
        </button>
      </header>

      <main className="max-w-4xl mx-auto space-y-12">
        {/* Simple responsive Hero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-zinc-100 pb-12">
          <div className="md:col-span-2 space-y-4">
            <div className="inline-block bg-zinc-100 text-zinc-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {hero.badgeText || "Ready for new work"}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-none">
              {hero.title || "Full Stack Software Developer"}
            </h1>
            <p className="text-sm md:text-base text-zinc-500 leading-relaxed font-light">
              {hero.subtitle || "Architecting clean interactive layouts."}
            </p>
            <div className="pt-2 flex gap-4">
              <a href="#projects" className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium px-5 py-2.5 rounded-lg text-xs transition-all shadow">
                {hero.callToActionText || "Inspect Projects"}
              </a>
              <a href="#contact" className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold px-5 py-2.5 rounded-lg text-xs transition-all">
                Contact Me
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <img 
              src={hero.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80"} 
              alt="Avatar" 
              className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full border-4 border-white shadow-md grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Crisp Bio Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          <h3 className="text-zinc-400 font-semibold text-xs tracking-wider uppercase">Background Bio</h3>
          <div className="md:col-span-2 space-y-4 text-xs font-light text-zinc-600 leading-relaxed">
            <p className="text-sm font-medium text-zinc-800 leading-relaxed">{about.bio}</p>
            <p className="leading-relaxed">{about.expandedBio}</p>
            <div className="flex gap-4 pt-2">
              {about.githubUrl && <a href={about.githubUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 border border-zinc-200 rounded-lg hover:border-zinc-400 text-zinc-500 hover:text-zinc-900 transition-colors"><Github className="w-4 h-4" /></a>}
              {about.linkedinUrl && <a href={about.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 border border-zinc-200 rounded-lg hover:border-zinc-400 text-zinc-500 hover:text-zinc-900 transition-colors"><Linkedin className="w-4 h-4" /></a>}
              {about.twitterUrl && <a href={about.twitterUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 border border-zinc-200 rounded-lg hover:border-zinc-400 text-zinc-500 hover:text-zinc-900 transition-colors"><Twitter className="w-4 h-4" /></a>}
            </div>
          </div>
        </div>

        {/* Skills Slider Module */}
        <div className="border-t border-zinc-200 pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <h3 className="text-zinc-400 font-semibold text-xs tracking-wider uppercase">Specializations</h3>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((s, idx) => (
              <div key={idx} className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="font-bold text-zinc-700">{s.name}</span>
                  <span className="text-zinc-500">{s.level}%</span>
                </div>
                <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-zinc-800 h-full rounded-full" style={{ width: `${s.level}%` }}></div>
                </div>
                <span className="text-[10px] text-zinc-400 block mt-1 tracking-tight">{s.category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Simple work history */}
        {experience.length > 0 && (
          <div className="border-t border-zinc-200 pt-2 grid grid-cols-1 md:grid-cols-3 gap-8">
            <h3 className="text-zinc-400 font-semibold text-xs tracking-wider uppercase pt-6">Experience History</h3>
            <div className="md:col-span-2 space-y-6 pt-6">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l border-zinc-300 pl-6 space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-xs text-zinc-800">{exp.role}</h4>
                      <span className="text-zinc-500 text-[11px]">{exp.company}</span>
                    </div>
                    <span className="text-[10px] bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-zinc-500 text-xs leading-relaxed font-light">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modular Minimal Grid Projects */}
        <div id="projects" className="border-t border-zinc-200 pt-8 space-y-6">
          <h3 className="text-zinc-400 font-semibold text-xs tracking-wider uppercase">Recent Codebases</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="bg-white border border-zinc-200 rounded-xl p-5 hover:border-zinc-400 transition-all flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-[10px] text-zinc-400 font-bold block uppercase mb-1">{proj.language || "Stack"}</span>
                  <h4 className="font-bold text-zinc-800 text-xs mb-2">{proj.title}</h4>
                  <p className="text-zinc-500 text-xs font-light leading-relaxed mb-4 h-16 overflow-y-auto pr-1">{proj.description}</p>
                </div>
                <div className="flex gap-4 text-xs font-semibold pt-1 border-t border-zinc-100">
                  {proj.githubUrl && <a href={proj.githubUrl} className="text-zinc-700 hover:text-black">Github</a>}
                  {proj.url && <a href={proj.url} className="text-zinc-700 hover:text-black">Demo</a>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inline Contact Area */}
        <section id="contact" className="bg-zinc-50 border border-zinc-200 rounded-xl p-8 max-w-xl mx-auto mt-12">
          <h3 className="text-center font-bold text-sm uppercase mb-4 tracking-wider">Leave a Message</h3>
          {contactSuccess ? (
            <div className="bg-[#e9fbf0] text-emerald-800 border border-emerald-200 p-3 rounded-lg text-center text-xs">
              Message logged. Success!
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-zinc-500 block mb-1 font-semibold">Your Email</label>
                <input type="email" required className="w-full bg-white border border-zinc-300 rounded px-3 py-2 text-zinc-900 focus:outline-none focus:border-zinc-800" placeholder="guest@domain.com" />
              </div>
              <div>
                <label className="text-zinc-500 block mb-1 font-semibold">Message</label>
                <textarea required className="w-full bg-white border border-zinc-300 rounded px-3 py-2 text-zinc-900 h-20 focus:outline-none focus:border-zinc-800" placeholder="Let's connect on real software..."></textarea>
              </div>
              <button type="submit" className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold p-2.5 rounded text-xs tracking-wider transition-all cursor-pointer">
                SEND MESSAGE
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}
