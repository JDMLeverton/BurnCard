export const SHAPES = {
  bevelPrimary: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
  bevelAlt: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
  bevelBtn: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
};

export const THEMES = {
  "neon_city": {
    label: "NEON CITY (Default)",
    colors: {
      // Backgrounds
      bgApp: "bg-slate-950",
      bgPanel: "bg-slate-900/90",
      bgSurface: "bg-slate-800/50",
      // Text
      textHead: "text-slate-100",
      textBody: "text-slate-300",
      textDim: "text-slate-500",
      // Accents
      primary: "text-cyan-400",
      primaryBg: "bg-cyan-500",
      secondary: "text-pink-500",
      secondaryBg: "bg-pink-500",
      highlight: "text-amber-400",
      // Borders
      borderDim: "border-cyan-900/30",
      borderBright: "border-cyan-500/50",
    }
  },
  "terminal_green": {
    label: "TERMINAL (Monochrome)",
    colors: {
      bgApp: "bg-black",
      bgPanel: "bg-zinc-950",
      bgSurface: "bg-green-900/20",
      
      textHead: "text-green-400",
      textBody: "text-green-600",
      textDim: "text-green-900",
      
      primary: "text-green-500",
      primaryBg: "bg-green-500",
      secondary: "text-green-700",
      secondaryBg: "bg-green-700",
      highlight: "text-white", // Pop against green
      
      borderDim: "border-green-900/40",
      borderBright: "border-green-500",
    }
  },
  "crimson_tide": {
    label: "CRIMSON (High Contrast)",
    colors: {
      bgApp: "bg-neutral-950",
      bgPanel: "bg-neutral-900",
      bgSurface: "bg-red-950/30",
      
      textHead: "text-white",
      textBody: "text-neutral-400",
      textDim: "text-neutral-600",
      
      primary: "text-red-600",
      primaryBg: "bg-red-600",
      secondary: "text-white",
      secondaryBg: "bg-white",
      highlight: "text-red-400",
      
      borderDim: "border-red-900/20",
      borderBright: "border-red-600",
    }
  },
  "retro_amber": {
    label: "RETRO (Fallout)",
    colors: {
      bgApp: "bg-[#1a1200]", // Custom Deep Brown
      bgPanel: "bg-[#2e2000]/90",
      bgSurface: "bg-[#4a3500]/40",
      
      textHead: "text-amber-200",
      textBody: "text-amber-400/80",
      textDim: "text-amber-900",
      
      primary: "text-amber-500",
      primaryBg: "bg-amber-500",
      secondary: "text-orange-600",
      secondaryBg: "bg-orange-600",
      highlight: "text-yellow-200",
      
      borderDim: "border-amber-900/30",
      borderBright: "border-amber-500",
    }
  },
  "corp_ice": {
    label: "CORP ICE (Clean)",
    colors: {
      bgApp: "bg-slate-50",
      bgPanel: "bg-white",
      bgSurface: "bg-blue-50",
      
      textHead: "text-slate-900",
      textBody: "text-slate-600",
      textDim: "text-slate-400",
      
      primary: "text-blue-600",
      primaryBg: "bg-blue-600",
      secondary: "text-indigo-600",
      secondaryBg: "bg-indigo-600",
      highlight: "text-cyan-600",
      
      borderDim: "border-slate-200",
      borderBright: "border-blue-500",
    }
  },
  "cyber_grape": {
    label: "SYNTHWAVE (Vapor)",
    colors: {
      bgApp: "bg-indigo-950",
      bgPanel: "bg-purple-900/40",
      bgSurface: "bg-fuchsia-900/30",
      
      textHead: "text-fuchsia-100",
      textBody: "text-indigo-200",
      textDim: "text-indigo-800",
      
      primary: "text-fuchsia-400",
      primaryBg: "bg-fuchsia-400",
      secondary: "text-cyan-400",
      secondaryBg: "bg-cyan-400",
      highlight: "text-yellow-300",
      
      borderDim: "border-fuchsia-500/30",
      borderBright: "border-cyan-400",
    }
  }
};