import fs from "fs";

const scrollWorldPath = "d:/maindextora/src/components/experience/ScrollWorld.tsx";
let content = fs.readFileSync(scrollWorldPath, "utf8");

// Remove Compass import
content = content.replace(
  'import {\n  ArrowRight,\n  ChevronRight,\n  Compass,\n  ChevronDown,\n} from "lucide-react";',
  'import {\n  ArrowRight,\n  ChevronRight,\n  ChevronDown,\n} from "lucide-react";'
);

// Update dependency array of the keydown/wheel effect
content = content.replace(
  '    return () => {\n      window.removeEventListener("wheel", handleWheel);\n      window.removeEventListener("touchstart", handleTouchStart);\n      window.removeEventListener("touchmove", handleTouchMove);\n      window.removeEventListener("keydown", handleKeyDown);\n    };\n  }, []);',
  '    return () => {\n      window.removeEventListener("wheel", handleWheel);\n      window.removeEventListener("touchstart", handleTouchStart);\n      window.removeEventListener("touchmove", handleTouchMove);\n      window.removeEventListener("keydown", handleKeyDown);\n    };\n  }, [jumpToChapter, sections.length, togglePlayContinuous]);'
);

fs.writeFileSync(scrollWorldPath, content, "utf8");
console.log("Cleaned ESLint warnings in ScrollWorld.tsx");

