import fs from "fs";

const scrollWorldPath = "d:/maindextora/src/components/experience/ScrollWorld.tsx";
let content = fs.readFileSync(scrollWorldPath, "utf8");

// 1. Add ChevronDown to lucide-react imports if not present
if (!content.includes("ChevronDown,")) {
  content = content.replace(
    'import {\n  ArrowRight,\n  ChevronRight,\n  Compass,\n} from "lucide-react";',
    'import {\n  ArrowRight,\n  ChevronRight,\n  Compass,\n  ChevronDown,\n} from "lucide-react";'
  );
  console.log("Added ChevronDown import");
}

// 2. Add keyboard navigation listener
const oldListeners = `    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };`;

const newListeners = `    // Keyboard controls for accessible flight navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || "").toLowerCase();
      if (activeTag === "input" || activeTag === "textarea" || activeTag === "select") return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlayContinuous();
      } else if (e.code === "ArrowDown" || e.code === "PageDown") {
        const next = Math.min(sections.length - 1, activeSectionIdxRef.current + 1);
        if (next !== activeSectionIdxRef.current) {
          e.preventDefault();
          jumpToChapter(next);
        }
      } else if (e.code === "ArrowUp" || e.code === "PageUp") {
        const prev = Math.max(0, activeSectionIdxRef.current - 1);
        if (prev !== activeSectionIdxRef.current) {
          e.preventDefault();
          jumpToChapter(prev);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };`;

if (content.includes(oldListeners)) {
  content = content.replace(oldListeners, newListeners);
  console.log("Added keyboard controls");
} else {
  console.warn("Could not match oldListeners block");
}

// 3. Remove duplicate Dextora World brand pill from top-left
const duplicateLogoPill = `        {/* Brand Logo & Back to Home */}
        <div className="absolute top-5 left-4 sm:left-8 z-30 pointer-events-auto">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:border-white/30 transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[var(--brand-terracotta)] animate-spin-slow" />
            <span className="font-semibold text-xs tracking-wider uppercase font-mono">
              Dextora World
            </span>
          </Link>
        </div>`;

if (content.includes(duplicateLogoPill)) {
  content = content.replace(duplicateLogoPill, "");
  console.log("Removed duplicate Dextora World pill");
} else {
  console.warn("Could not match duplicateLogoPill block");
}

// 4. In chapter 0 (Hub Intro), add shortcut CTA to Explore Products
const oldArticleEnd = `                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {(isHi ? sec.tagsHi : sec.tags).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/10 border border-white/15 text-white/90"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTAs */}`;

const newArticleEnd = `                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {(isHi ? sec.tagsHi : sec.tags).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/10 border border-white/15 text-white/90"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Chapter 0 Quick Jump CTA */}
                    {idx === 0 && !sec.cta && (
                      <div className="flex flex-wrap items-center gap-3 pt-3">
                        <a
                          href="#products-showcase"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                          style={{ backgroundColor: sec.accent }}
                        >
                          <span>{isHi ? "उत्पाद देखें" : "Explore Products"}</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    )}

                    {/* CTAs */}`;

if (content.includes(oldArticleEnd)) {
  content = content.replace(oldArticleEnd, newArticleEnd);
  console.log("Added Chapter 0 Explore Products CTA");
} else {
  console.warn("Could not match oldArticleEnd block");
}

// 5. Replace Layer 6 status pill with interactive centered control pill and scroll hint
const oldLayer6 = `        {/* Layer 6: Subtle Play / Pause Status Indicator Pill */}
        <div className="absolute bottom-6 right-6 z-30 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white/80 shadow-xl transition-all">
          <span
            className={\`w-2 h-2 rounded-full transition-colors duration-300 \${
              isPlayingContinuous
                ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"
                : "bg-white/40"
            }\`}
          />
          <span>{isPlayingContinuous ? "Playing · Click to pause" : "Click anywhere to fly"}</span>
        </div>`;

const newLayer6 = `        {/* Scroll exploration hint at the bottom */}
        {currentTime <= 1.8 && !isPlayingContinuous && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-1 animate-bounce text-white/80 transition-opacity duration-300">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">Scroll to explore</span>
            <ChevronDown className="w-3.5 h-3.5 text-[var(--brand-terracotta)]" />
          </div>
        )}

        {/* Layer 6: Play / Pause Control Pill (Centered at bottom, interactive) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            togglePlayContinuous();
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/20 hover:border-white/40 text-xs font-mono text-white/90 shadow-2xl transition-all cursor-pointer group active:scale-95"
          aria-label={isPlayingContinuous ? "Pause continuous flight" : "Start continuous flight"}
        >
          <span
            className={\`w-2 h-2 rounded-full transition-colors duration-300 \${
              isPlayingContinuous
                ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"
                : "bg-white/40 group-hover:bg-white/70"
            }\`}
          />
          <span>{isPlayingContinuous ? "Playing Flight · Click to pause" : "Click to Fly Through World"}</span>
          <span className="hidden sm:inline-block text-[10px] text-white/50 px-1.5 py-0.5 rounded bg-white/10 ml-0.5">
            Space
          </span>
        </button>`;

if (content.includes(oldLayer6)) {
  content = content.replace(oldLayer6, newLayer6);
  console.log("Updated Layer 6 control pill");
} else {
  console.warn("Could not match oldLayer6 block");
}

fs.writeFileSync(scrollWorldPath, content, "utf8");
console.log("ScrollWorld.tsx updated successfully!");

