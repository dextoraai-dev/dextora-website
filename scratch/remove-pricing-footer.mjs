import fs from "fs";

const footerPath = "d:/maindextora/src/components/layout/Footer.tsx";
let content = fs.readFileSync(footerPath, "utf8");

const footerPricingRegex = /\s*<li>\s*<Link\s+href="\/pricing"[\s\S]*?<\/Link>\s*<\/li>/;
if (footerPricingRegex.test(content)) {
  content = content.replace(footerPricingRegex, "");
  console.log("Removed footer pricing link");
} else {
  console.error("Footer pricing link not found");
}

fs.writeFileSync(footerPath, content, "utf8");
console.log("Footer.tsx updated successfully");

