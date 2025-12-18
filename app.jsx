import React, { useState, useEffect } from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';
import { 
    Terminal, BookOpen, Cpu, Zap, Layout, Menu, X, ChevronRight, ChevronDown,
    FileText, Folder, Shield, Image as ImageIcon, Wifi, Layers, User, Hexagon, Activity, Package
} from 'https://esm.sh/lucide-react@0.292.0';

// Relative imports work with the type="module" setup in index.html
import { CORE_DATABASE } from './database.js';
import { THEME } from './theme.js';

/* --- COMPONENTS --- */

const CyberCard = ({ children, className = "", style = {} }) => (
    <div 
        className={`relative bg-slate-900 border-l-2 border-r-2 border-cyan-900/50 p-6 ${className}`}
        style={{ clipPath: THEME.shapes.bevelPrimary, ...style }}
    >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-900/30"></div>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-900/30"></div>
        {children}
    </div>
);

const CyberTable = ({ children }) => (
    <div 
        className="my-8 relative overflow-hidden bg-slate-900/50"
        style={{ clipPath: THEME.shapes.bevelAlt }}
    >
        <div className="absolute inset-0 border border-cyan-500/20 pointer-events-none"></div>
        <div className="overflow-x-auto p-[1px]">
            {children}
        </div>
    </div>
);

/* --- MAIN APP --- */

function App() {
    const [db, setDb] = useState(CORE_DATABASE);
    const [activeId, setActiveId] = useState("00_manifesto");
    const [showSidebar, setShowSidebar] = useState(true);

    useEffect(() => {
        if (window.innerWidth < 768) setShowSidebar(false);
    }, []);

    const toggleCollapse = (id, e) => {
        e.stopPropagation();
        setDb(prev => ({ ...prev, [id]: { ...prev[id], collapsed: !prev[id].collapsed } }));
    };

    const parseInline = (text) => {
        if (!text) return text;
        return text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g).map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) return <strong key={j} className="text-white font-bold tracking-wide">{part.slice(2, -2)}</strong>;
            if (part.startsWith('*') && part.endsWith('*')) return <em key={j} className="text-cyan-200">{part.slice(1, -1)}</em>;
            if (part.startsWith('`') && part.endsWith('`')) return <code key={j} className="bg-slate-950 text-pink-400 px-1.5 py-0.5 rounded-sm font-mono text-xs border border-pink-900/50">{part.slice(1, -1)}</code>;
            return part;
        });
    };

    const renderMarkdown = (text) => {
        if (!text) return null;
        const lines = text.split('\n');
        const blocks = [];
        let tableBuffer = [];

        lines.forEach((line) => {
            if (line.trim().startsWith('|')) {
                tableBuffer.push(line);
            } else {
                if (tableBuffer.length > 0) { blocks.push({ type: 'table', content: tableBuffer }); tableBuffer = []; }
                blocks.push({ type: 'line', content: line });
            }
        });
        if (tableBuffer.length > 0) blocks.push({ type: 'table', content: tableBuffer });

        return blocks.map((block, i) => {
            if (block.type === 'table') {
                const headerRow = block.content[0];
                const bodyRows = block.content.slice(1);
                return (
                    <CyberTable key={i}>
                        <table className="w-full text-left text-sm text-slate-300">
                            <thead className="bg-slate-950/80 text-cyan-400 uppercase font-mono text-[10px] md:text-xs tracking-wider">
                                <tr>{headerRow.split('|').filter(c => c.trim()).map((h, hIdx) => <th key={hIdx} className="px-6 py-4 border-b border-cyan-500/20 font-bold">{parseInline(h.trim())}</th>)}</tr>
                            </thead>
                            <tbody className="divide-y divide-cyan-900/20">
                                {bodyRows.map((row, rIdx) => {
                                    if (row.trim().match(/^\|\s*[-:]+\s*\|/)) return null;
                                    return <tr key={rIdx} className="hover:bg-cyan-900/10 transition-colors">{row.split('|').filter(c => c.trim()).map((cell, cIdx) => <td key={cIdx} className="px-6 py-3 font-mono text-xs md:text-sm text-slate-400">{parseInline(cell.trim())}</td>)}</tr>;
                                })}
                            </tbody>
                        </table>
                    </CyberTable>
                );
            }
            const line = block.content;
            if (line.startsWith('# ')) return <h1 key={i} className={`text-3xl md:text-5xl font-black ${THEME.colors.textHead} mt-12 mb-8 font-mono uppercase tracking-tighter border-b-2 border-cyan-500/50 pb-4 inline-block pr-12`}>{line.replace('# ', '')}</h1>;
            if (line.startsWith('## ')) return <h2 key={i} className={`text-xl md:text-2xl font-bold ${THEME.colors.accentSecondary} mt-10 mb-4 font-mono uppercase tracking-wide flex items-center gap-2`}><Hexagon size={16} className="fill-current"/> {line.replace('## ', '')}</h2>;
            if (line.startsWith('> ')) return <div key={i} className="relative border-l-4 border-yellow-500/80 bg-yellow-900/10 p-6 my-8 text-yellow-100/90 italic rounded-r-lg font-serif text-lg leading-relaxed shadow-[0_0_15px_rgba(234,179,8,0.1)]">{parseInline(line.replace('> ', ''))}</div>;
            if (line.startsWith('* ') || line.startsWith('- ')) return <li key={i} className="ml-4 text-slate-300 list-disc marker:text-pink-500 pl-2 mb-2 text-sm md:text-base leading-relaxed">{parseInline(line.replace(/^[*-] /, ''))}</li>;
            if (line.trim() === '') return <div key={i} className="h-4"></div>;
            return <p key={i} className={`mb-4 ${THEME.colors.textMain} leading-relaxed text-sm md:text-base max-w-prose`}>{parseInline(line)}</p>;
        });
    };

    const renderSidebarItem = (item, depth = 0) => {
        const children = Object.values(db).filter(i => i.parentId === item.id);
        const hasChildren = children.length > 0;
        
        // Icon Resolver
        const getIcon = (name) => {
            const icons = { Terminal, BookOpen, Cpu, Zap, Layout, FileText, Folder, Shield, Wifi, Layers, User, Activity, Package };
            return icons[name] || Terminal;
        };
        const TheIcon = getIcon(item.icon);

        return (
            <div key={item.id} className="select-none animate-in slide-in-from-left-2 duration-300">
                <div 
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all border-l-2 group relative overflow-hidden ${activeId === item.id ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-[inset_10px_0_20px_-10px_rgba(34,211,238,0.2)]' : 'border-transparent text-slate-500 hover:bg-slate-800/30 hover:text-cyan-100 hover:border-slate-600'}`}
                    style={{ paddingLeft: `${depth * 16 + 16}px` }}
                    onClick={() => { setActiveId(item.id); if (window.innerWidth < 768) setShowSidebar(false); }}
                >
                    <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    {hasChildren ? <button onClick={(e) => toggleCollapse(item.id, e)} className="z-10 p-1 -ml-1 hover:text-white rounded active:scale-95 transition-transform">{item.collapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}</button> : <span className="w-3.5" />}
                    <TheIcon size={16} className={`z-10 transition-colors ${activeId === item.id ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]' : 'group-hover:text-cyan-400'}`} />
                    <span className="z-10 text-sm font-mono tracking-tight truncate">{item.title}</span>
                </div>
                {!item.collapsed && children.map(child => renderSidebarItem(child, depth + 1))}
            </div>
        );
    };

    const activeContent = db[activeId];

    return (
        <div className={`flex h-screen w-full ${THEME.colors.bg} text-slate-200 overflow-hidden font-sans selection:bg-pink-500/30 selection:text-pink-200 relative`}>
            {/* FALLBACK POINTER-EVENTS-NONE INLINE just in case css fails */}
            <div className="absolute inset-0 scanlines z-50 opacity-20 pointer-events-none"></div>
            
            {showSidebar && <div className="fixed inset-0 bg-black/80 z-30 md:hidden backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowSidebar(false)} />}
            
            <div className={`fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 border-r border-cyan-900/30 flex flex-col transform transition-transform duration-300 shadow-[10px_0_30px_rgba(0,0,0,0.5)] ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
                <div className="p-8 border-b border-cyan-900/30 bg-slate-950 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <h1 className="text-3xl font-black text-white font-mono tracking-tighter relative z-10 italic">NEON<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">DECK</span><span className="text-pink-500 text-xs not-italic ml-2 align-top bg-pink-900/20 border border-pink-500/50 px-1 py-0.5 rounded">v0.13</span></h1>
                    <div className="flex items-center gap-2 mt-3 text-[10px] font-mono text-cyan-600"><span className="w-1.5 h-1.5 rounded-none bg-cyan-500 animate-ping"></span>SYSTEM STATUS: ONLINE</div>
                </div>
                <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-800">
                    {Object.values(db).filter(i => !i.parentId).map(item => renderSidebarItem(item))}
                </div>
                <div className="p-4 border-t border-cyan-900/30 bg-slate-950 text-[10px] font-mono text-slate-600 text-center">SYS.ADMIN: GEMINI // TERM_ID: 884</div>
            </div>

            <main className="flex-1 flex flex-col min-w-0 bg-slate-950 relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
                <div className="h-16 border-b border-cyan-900/30 flex items-center justify-between px-6 bg-slate-900/60 backdrop-blur shrink-0 sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-cyan-400 p-2 border border-cyan-900/50 rounded bg-cyan-950/30 active:bg-cyan-900/50" onClick={() => setShowSidebar(!showSidebar)}><Menu size={20}/></button>
                        <div className="flex flex-col"><span className="text-cyan-700 font-mono text-[10px] hidden sm:inline leading-none mb-1 tracking-widest uppercase">Directory / {activeContent?.parentId ? "Subroutine / " : "Root / "}</span><span className="font-bold text-slate-100 truncate text-sm md:text-base tracking-wide flex items-center gap-2">{activeContent?.title.toUpperCase() || "UNKNOWN"}</span></div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 border border-cyan-900/50 px-3 py-1 bg-cyan-950/20" style={{clipPath: THEME.shapes.bevelBtn}}><Shield size={12} className="text-emerald-500"/> SECURE</div>
                </div>
                <div className="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent">
                    <div className="max-w-4xl mx-auto p-6 md:p-16 pb-32 animate-in slide-in-from-bottom-4 duration-500">
                        {activeContent?.image && (
                            <div className="mb-10 relative group" style={{clipPath: THEME.shapes.bevelPrimary}}>
                                <img src={activeContent.image} alt="Section Header" className="w-full h-48 md:h-80 object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"/>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-pink-500"></div>
                                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-mono text-cyan-300 bg-black/60 px-3 py-1 backdrop-blur border-l-2 border-cyan-500"><ImageIcon size={12}/> VISUAL RECORD</div>
                            </div>
                        )}
                        <CyberCard>
                            <div className="prose prose-invert max-w-none">
                                {activeContent ? renderMarkdown(activeContent.content) : <div className="text-red-500 font-mono text-center mt-10 p-10 border border-red-900/50 bg-red-950/20 rounded">ERROR 404: DATA CORRUPTED</div>}
                            </div>
                        </CyberCard>
                        <div className="mt-16 pt-8 flex items-center justify-center gap-4 opacity-50"><div className="h-px w-12 bg-cyan-900"></div><span className="text-cyan-900 font-mono text-[10px] tracking-[0.5em]">END OF FILE</span><div className="h-px w-12 bg-cyan-900"></div></div>
                    </div>
                </div>
            </main>
        </div>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);