import fs from "fs";

const configPath = "d:/maindextora/src/config/site.ts";
let content = fs.readFileSync(configPath, "utf8");

const navPricingRegex = /\s*\{\s*label:\s*"Pricing",\s*href:\s*"\/pricing"\s*\},?/;
if (navPricingRegex.test(content)) {
  content = content.replace(navPricingRegex, "");
  console.log("Removed pricing from navItems in site.ts");
} else {
  console.error("Pricing in navItems not found");
}

fs.writeFileSync(configPath, content, "utf8");
console.log("site.ts updated successfully");

