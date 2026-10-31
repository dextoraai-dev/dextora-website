import fs from "fs";

const layoutPath = "d:/maindextora/src/app/layout.tsx";
let content = fs.readFileSync(layoutPath, "utf8");

// Import
if (!content.includes('import { BackToTop }')) {
  content = content.replace(
    'import { WhatsAppButton } from "@/components/shared/WhatsAppButton";',
    'import { WhatsAppButton } from "@/components/shared/WhatsAppButton";\nimport { BackToTop } from "@/components/shared/BackToTop";'
  );
  console.log("Added BackToTop import");
}

// JSX
if (!content.includes('<BackToTop />')) {
  content = content.replace(
    '<WhatsAppButton />',
    '<WhatsAppButton />\n            {/* Floating Back To Top button */}\n            <BackToTop />'
  );
  console.log("Added BackToTop JSX");
}

fs.writeFileSync(layoutPath, content, "utf8");
console.log("layout.tsx updated successfully");

