import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronDown, BookOpen, Lightbulb, Tag, ArrowLeft } from "lucide-react";
import { TERMS, CATEGORIES, type Term, type Category } from "@/data/terms";
import { useLocation } from "wouter";

// ── 高亮搜尋關鍵字 ──────────────────────────────────────────────────────────
function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} style={{ background: "oklch(0.75 0.18 290 / 0.35)", color: "inherit", borderRadius: "2px" }}>
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// ── 分類配色 ────────────────────────────────────────────────────────────────
const CAT_GRADIENTS: Record<Category, string> = {
  auth:         "linear-gradient(135deg, #7c3aed, #a855f7)",
  database:     "linear-gradient(135deg, #059669, #10b981)",
  frontend:     "linear-gradient(135deg, #d97706, #f59e0b)",
  architecture: "linear-gradient(135deg, #dc2626, #ef4444)",
  hardware:     "linear-gradient(135deg, #0284c7, #38bdf8)",
  automation:   "linear-gradient(135deg, #db2777, #f472b6)",
  file:         "linear-gradient(135deg, #65a30d, #84cc16)",
  network:      "linear-gradient(135deg, #ea580c, #fb923c)",
};

const CAT_BG: Record<Category, string> = {
  auth:         "rgba(124,58,237,0.12)",
  database:     "rgba(5,150,105,0.12)",
  frontend:     "rgba(217,119,6,0.12)",
  architecture: "rgba(220,38,38,0.12)",
  hardware:     "rgba(2,132,199,0.12)",
  automation:   "rgba(219,39,119,0.12)",
  file:         "rgba(101,163,13,0.12)",
  network:      "rgba(234,88,12,0.12)",
};

const CAT_TEXT: Record<Category, string> = {
  auth:         "#c084fc",
  database:     "#34d399",
  frontend:     "#fbbf24",
  architecture: "#f87171",
  hardware:     "#38bdf8",
  automation:   "#f472b6",
  file:         "#a3e635",
  network:      "#fb923c",
};

// ── 術語卡片 ────────────────────────────────────────────────────────────────
function TermCard({ term, query, index }: { term: Term; query: string; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const cat = CATEGORIES[term.cat];
  const gradient = CAT_GRADIENTS[term.cat];
  const bgTint = CAT_BG[term.cat];
  const textColor = CAT_TEXT[term.cat];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.35) }}
      onClick={() => setExpanded(!expanded)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "oklch(0.17 0.05 280 / 0.8)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)",
        border: "1px solid oklch(0.30 0.06 280 / 0.4)",
        backdropFilter: "blur(12px)",
      }}
      whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
    >
      <div className="h-1 w-full" style={{ background: gradient }} />

      <div className="p-4">
        <div className="flex items-center justify-between mb-2.5">
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: bgTint, color: textColor }}
          >
            <span className="text-sm">{cat.icon}</span>
            <span>{cat.label}</span>
          </span>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ color: "oklch(0.45 0.04 280)" }}
          >
            <ChevronDown size={15} />
          </motion.div>
        </div>

        <div className="text-xs font-mono mb-0.5 truncate" style={{ color: "oklch(0.50 0.05 280)" }}>
          <HighlightText text={term.en} query={query} />
        </div>

        <h3
          className="text-base font-bold leading-snug mb-2"
          style={{ color: "oklch(0.90 0.03 280)" }}
        >
          <HighlightText text={term.zh} query={query} />
        </h3>

        <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "oklch(0.60 0.04 280)" }}>
          <HighlightText text={term.desc} query={query} />
        </p>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden"
            >
              <div
                className="mt-3 pt-3 rounded-xl p-3"
                style={{ background: bgTint, border: `1px solid ${bgTint}` }}
              >
                <div className="flex items-start gap-2 mb-3">
                  <Lightbulb size={14} className="mt-0.5 flex-shrink-0" style={{ color: textColor }} />
                  <p className="text-sm leading-relaxed" style={{ color: "oklch(0.72 0.04 280)" }}>
                    <HighlightText text={term.desc} query={query} />
                  </p>
                </div>

                <div
                  className="rounded-lg p-3 mb-3"
                  style={{ background: "oklch(0.15 0.04 280 / 0.6)", border: `1px solid ${bgTint}` }}
                >
                  <div className="text-xs font-semibold mb-1 flex items-center gap-1" style={{ color: "oklch(0.50 0.05 280)" }}>
                    <span>🏥</span> 院舍比喻
                  </div>
                  <p className="text-sm leading-relaxed italic" style={{ color: "oklch(0.75 0.05 280)" }}>
                    <HighlightText text={term.analogy} query={query} />
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <Tag size={11} className="mt-0.5" style={{ color: "oklch(0.40 0.04 280)" }} />
                  {term.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-md font-medium"
                      style={{
                        background: "oklch(0.20 0.05 280 / 0.6)",
                        color: textColor,
                        border: `1px solid ${bgTint}`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── 主頁面 ────────────────────────────────────────────────────────────────────
export default function Knowledge() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<Category | "all">("all");
  const [, navigate] = useLocation();

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return TERMS.filter((t) => {
      const matchCat = activeCat === "all" || t.cat === activeCat;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        t.en.toLowerCase().includes(q) ||
        t.zh.includes(q) ||
        t.desc.includes(q) ||
        t.analogy.includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [query, activeCat]);

  const clearSearch = useCallback(() => {
    setQuery("");
    setActiveCat("all");
  }, []);

  const catCounts = useMemo(() => {
    const counts: Record<string, number> = { all: TERMS.length };
    TERMS.forEach((t) => { counts[t.cat] = (counts[t.cat] || 0) + 1; });
    return counts;
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.10 0.04 280)" }}>

      {/* ── Header ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at top, oklch(0.18 0.07 290) 0%, oklch(0.10 0.04 280) 70%)",
          borderBottom: "1px solid oklch(0.25 0.06 280 / 0.4)",
        }}
      >
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)", transform: "translate(30%, -30%)" }} />

        <div className="container relative py-8 pb-5">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-xs mb-5 transition-colors hover:opacity-80"
            style={{ color: "oklch(0.55 0.06 280)" }}
          >
            <ArrowLeft size={14} />
            返回平台入口
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-md"
              style={{ background: "linear-gradient(135deg, #7c3aed, #0284c7)" }}
            >
              📚
            </div>
            <div>
              <div className="text-xs font-medium" style={{ color: "oklch(0.50 0.05 280)" }}>恩海居管理平台</div>
              <div className="text-sm font-bold" style={{ color: "oklch(0.85 0.05 280)" }}>IT Knowledge Base</div>
            </div>
            <div className="ml-auto">
              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{
                  background: "oklch(0.55 0.22 290 / 0.12)",
                  color: "oklch(0.75 0.15 290)",
                  border: "1px solid oklch(0.55 0.22 290 / 0.25)",
                }}
              >
                {TERMS.length} 個術語
              </span>
            </div>
          </div>

          <div className="mb-5">
            <h1
              className="text-4xl font-black mb-2 leading-tight"
              style={{
                background: "linear-gradient(135deg, oklch(0.92 0.02 280) 0%, oklch(0.75 0.18 290) 50%, oklch(0.70 0.16 220) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              IT 知識庫
            </h1>
            <p className="text-sm max-w-xl leading-relaxed" style={{ color: "oklch(0.55 0.05 280)" }}>
              系統開發術語速查，每個術語附有院舍比喻，令複雜概念一目了然。點擊卡片展開詳細解釋。
            </p>
          </div>

          {/* 搜尋框 */}
          <div className="relative max-w-2xl">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "oklch(0.50 0.05 280)" }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜尋術語、描述、標籤…（例如：NFC、登入、Excel）"
              className="w-full pl-10 pr-10 py-3.5 rounded-2xl text-sm outline-none transition-all duration-200"
              style={{
                background: "oklch(0.17 0.05 280 / 0.8)",
                border: "1.5px solid oklch(0.30 0.06 280 / 0.5)",
                color: "oklch(0.85 0.03 280)",
              }}
              onFocus={(e) => {
                e.target.style.border = "1.5px solid oklch(0.55 0.22 290 / 0.6)";
                e.target.style.boxShadow = "0 0 0 3px oklch(0.55 0.22 290 / 0.12)";
              }}
              onBlur={(e) => {
                e.target.style.border = "1.5px solid oklch(0.30 0.06 280 / 0.5)";
                e.target.style.boxShadow = "none";
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: "oklch(0.25 0.05 280)", color: "oklch(0.60 0.05 280)" }}
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── 分類篩選 ── */}
      <div
        className="sticky top-0 z-10"
        style={{
          background: "oklch(0.12 0.04 280 / 0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid oklch(0.25 0.05 280 / 0.4)",
        }}
      >
        <div className="container py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-0.5">
            <button
              onClick={() => setActiveCat("all")}
              className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
              style={
                activeCat === "all"
                  ? {
                      background: "linear-gradient(135deg, oklch(0.55 0.22 290), oklch(0.50 0.20 220))",
                      color: "#ffffff",
                      boxShadow: "0 2px 8px oklch(0.55 0.22 290 / 0.4)",
                    }
                  : {
                      background: "oklch(0.20 0.05 280 / 0.6)",
                      color: "oklch(0.60 0.05 280)",
                      border: "1px solid oklch(0.30 0.05 280 / 0.4)",
                    }
              }
            >
              <BookOpen size={12} />
              <span>全部</span>
              <span className="opacity-70">({catCounts.all})</span>
            </button>

            {(Object.entries(CATEGORIES) as [Category, typeof CATEGORIES[Category]][]).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setActiveCat(key)}
                className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                style={
                  activeCat === key
                    ? {
                        background: CAT_GRADIENTS[key],
                        color: "#ffffff",
                        boxShadow: `0 2px 8px ${CAT_TEXT[key]}55`,
                      }
                    : {
                        background: CAT_BG[key],
                        color: CAT_TEXT[key],
                        border: `1px solid ${CAT_BG[key]}`,
                      }
                }
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="opacity-70">({catCounts[key] || 0})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 主內容 ── */}
      <div className="container py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs" style={{ color: "oklch(0.50 0.04 280)" }}>
            {query || activeCat !== "all" ? (
              <>
                找到 <span className="font-semibold" style={{ color: "oklch(0.80 0.05 280)" }}>{filtered.length}</span> 個術語
                {query && <span className="ml-1" style={{ color: "oklch(0.70 0.15 290)" }}>「{query}」</span>}
              </>
            ) : (
              <>共 <span className="font-semibold" style={{ color: "oklch(0.80 0.05 280)" }}>{TERMS.length}</span> 個術語，8 個分類</>
            )}
          </div>
          {(query || activeCat !== "all") && (
            <button onClick={clearSearch} className="text-xs flex items-center gap-1" style={{ color: "oklch(0.50 0.04 280)" }}>
              <X size={11} /> 清除篩選
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((term, i) => (
                <TermCard key={term.id} term={term} query={query} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="text-5xl mb-4">🔍</div>
            <div className="text-sm mb-1" style={{ color: "oklch(0.55 0.04 280)" }}>冇搵到「{query}」相關嘅術語</div>
            <div className="text-xs mb-5" style={{ color: "oklch(0.45 0.04 280)" }}>試下用英文搜尋，或者換個關鍵字</div>
            <button
              onClick={clearSearch}
              className="text-sm px-5 py-2.5 rounded-xl font-semibold text-white"
              style={{ background: "linear-gradient(135deg, oklch(0.55 0.22 290), oklch(0.50 0.20 220))" }}
            >
              清除搜尋
            </button>
          </motion.div>
        )}
      </div>

      {/* ── 頁腳 ── */}
      <div
        className="border-t py-5 mt-8"
        style={{ borderColor: "oklch(0.25 0.05 280 / 0.4)", background: "oklch(0.12 0.04 280)" }}
      >
        <div className="container flex items-center justify-between text-xs" style={{ color: "oklch(0.40 0.04 280)" }}>
          <div className="flex items-center gap-2">
            <span>📚</span>
            <span>恩海居 IT 知識庫</span>
          </div>
          <div>由 Manus AI 協助建立 · {TERMS.length} 個術語</div>
        </div>
      </div>
    </div>
  );
}
