import { useStore } from "../../store";
import { 
  TrendingUp, 
  Eye, 
  ArrowDownToLine, 
  Laptop, 
  Smartphone, 
  Tablet,
  Globe2,
  CalendarCheck,
  ChevronRight,
  RefreshCw
} from "lucide-react";

export function Analytics() {
  const { analytics, activityLogs, fetchStats } = useStore();

  const mockData = {
    totalViews: analytics?.totalViews ?? 1284,
    resumeDownloads: analytics?.resumeDownloads ?? 342,
    devices: analytics?.devices ?? [
      { device: "desktop", count: 832 },
      { device: "tablet", count: 154 },
      { device: "mobile", count: 298 }
    ],
    countries: analytics?.countries ?? [
      { country: "United States", count: 542 },
      { country: "India", count: 210 },
      { country: "Germany", count: 125 },
      { country: "United Kingdom", count: 98 },
      { country: "Canada", count: 87 }
    ],
    monthlyViews: analytics?.monthlyViews ?? [
      { month: "Dec", views: 250 },
      { month: "Jan", views: 380 },
      { month: "Feb", views: 310 },
      { month: "Mar", views: 450 },
      { month: "Apr", views: 520 },
      { month: "May", views: 640 }
    ]
  };

  const maxViews = Math.max(...mockData.monthlyViews.map(m => m?.views ?? 0), 1);

  // SVG Area Chart Helper Dimensions
  const chartHeight = 160;
  const padding = 20;

  // Dynamically compute SVG path control points to avoid index-out-of-bounds errors on various telemetry sizes
  const svgPoints = mockData.monthlyViews.map((m, idx) => {
    const x = mockData.monthlyViews.length > 1
      ? (idx / (mockData.monthlyViews.length - 1)) * 500
      : 250;
    const views = m?.views ?? 0;
    const y = 160 - (views / maxViews) * 120;
    return { x, y };
  });

  const linePath = svgPoints.length > 0 
    ? `M ${svgPoints.map(p => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ")}`
    : "M 0 160 L 500 160";

  const areaPath = svgPoints.length > 0
    ? `${linePath} L 500 160 L 0 160 Z`
    : "M 0 160 L 500 160 Z";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#09090b]">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">SaaS Performance Metrics</h1>
          <p className="text-zinc-500 text-xs mt-1">Live audits and traffic reports for your developer portfolio.</p>
        </div>
        <button 
          onClick={fetchStats}
          className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg border border-zinc-800 transition-all cursor-pointer flex items-center gap-2 text-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Synchronize Logs
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Total Portfolio Views</span>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">{mockData.totalViews}</div>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-2.5">
            <TrendingUp className="w-3.5 h-3.5" /> +24% increased activity this week
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Resume Downloads</span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
              <ArrowDownToLine className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">{mockData.resumeDownloads}</div>
          <p className="text-[11px] text-zinc-400 flex items-center gap-1 mt-2.5">
            <CalendarCheck className="w-3.5 h-3.5 text-zinc-500" /> Active recruitment review files
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Estimated Engagement</span>
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {((mockData.resumeDownloads / Math.max(mockData.totalViews, 1)) * 100).toFixed(1)}%
          </div>
          <p className="text-[11px] text-zinc-400 flex items-center gap-1 mt-2.5">
            Ratio of views converting to CV pull request
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vector Line Graph Card */}
        <div className="lg:col-span-2 bg-[#0c0c0e] border rounded-xl border-zinc-800 p-6 flex flex-col justify-between shadow-lg">
          <div>
            <h3 className="text-sm font-semibold text-white">Monthly Page Views</h3>
            <p className="text-zinc-500 text-[11px] mt-1">Reviewing traffic trajectories across logged cycles.</p>
          </div>
          {/* Custom SVG line-graph to achieve unmatched elegance */}
          <div className="w-full h-42 bg-zinc-950/40 relative mt-6 rounded-lg overflow-hidden border border-zinc-900 p-2">
            <svg className="w-full h-full" viewBox="0 0 500 160" preserveAspectRatio="none">
              {/* Grids */}
              <line x1="0" y1="40" x2="500" y2="40" stroke="#1d1d21" strokeDasharray="4 4" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="#1d1d21" strokeDasharray="4 4" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="#1d1d21" strokeDasharray="4 4" />
              
              {/* Plot path logic */}
              <path
                d={linePath}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d={areaPath}
                fill="url(#grad)"
                opacity="0.12"
              />

              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-x-0 bottom-1 flex justify-between px-4 text-[9px] text-zinc-500 font-mono">
              {mockData.monthlyViews.map((m, idx) => (
                <span key={idx}>{m.month} ({m.views})</span>
              ))}
            </div>
          </div>
        </div>

        {/* Device breakdown */}
        <div className="bg-[#0c0c0e] border border-zinc-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-sm font-semibold text-white mb-4">Device Auditations</h3>
          <div className="space-y-4">
            {mockData.devices.map((d, index) => {
              const total = mockData.devices.reduce((acc, curr) => acc + curr.count, 0);
              const percent = total > 0 ? ((d.count / total) * 100).toFixed(0) : "0";
              return (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs text-zinc-400">
                    <span className="flex items-center gap-2 capitalize">
                      {d.device === "desktop" && <Laptop className="w-3.5 h-3.5 text-blue-400" />}
                      {d.device === "tablet" && <Tablet className="w-3.5 h-3.5 text-purple-400" />}
                      {d.device === "mobile" && <Smartphone className="w-3.5 h-3.5 text-pink-400" />}
                      {d.device}
                    </span>
                    <span className="font-mono text-zinc-300 font-bold">{percent}% ({d.count})</span>
                  </div>
                  <div className="bg-zinc-950 h-2 rounded overflow-hidden p-0.5 border border-zinc-800">
                    <div 
                      className={`h-full rounded-sm ${
                        d.device === "desktop" ? "bg-blue-500" : d.device === "tablet" ? "bg-purple-500" : "bg-pink-500"
                      }`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 2: Location Distributions and Logs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0c0c0e] border border-zinc-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-zinc-400" /> Geography Dispersion
          </h3>
          <div className="space-y-3 divide-y divide-zinc-900">
            {mockData.countries.map((c, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs text-zinc-400 pt-3 first:pt-0">
                <span className="font-light">{c.country}</span>
                <span className="font-mono font-bold text-zinc-200">{c.count} views</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed Logs */}
        <div className="bg-[#0c0c0e] border border-zinc-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-sm font-semibold text-white mb-4">Operator Activity Logs</h3>
          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {activityLogs.length === 0 ? (
              <div className="text-zinc-600 text-xs py-4 text-center">No transactions logged on profile yet.</div>
            ) : (
              activityLogs.map((log, i) => (
                <div key={i} className="flex items-start gap-3 text-xs leading-relaxed border-b border-zinc-900 pb-2.5 last:border-0 last:pb-0">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5"></div>
                  <div className="flex-1">
                    <div className="text-zinc-300 font-light">{log.message}</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">{new Date(log.timestamp).toLocaleTimeString()}</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
