import fs from "fs";

const navbarPath = "d:/maindextora/src/components/layout/Navbar.tsx";
let content = fs.readFileSync(navbarPath, "utf8");

// Remove desktop Pricing link
const desktopPricingRegex = /\s*<Link\s+href="\/pricing"[\s\S]*?<\/Link>/;
if (desktopPricingRegex.test(content)) {
  content = content.replace(desktopPricingRegex, "");
  console.log("Removed desktop pricing link");
} else {
  console.error("Desktop pricing link not found");
}

// Remove mobile Pricing link
const mobilePricingRegex = /\s*<Link\s+href="\/pricing"[\s\S]*?<\/Link>/;
if (mobilePricingRegex.test(content)) {
  content = content.replace(mobilePricingRegex, "");
  console.log("Removed mobile pricing link");
} else {
  console.error("Mobile pricing link not found");
}

fs.writeFileSync(navbarPath, content, "utf8");
console.log("Navbar.tsx updated successfully");

