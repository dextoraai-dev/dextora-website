// ==============================================================================
// RE-EXPORT PROXY TO src/config/site.ts
// ==============================================================================
// Single point of configuration is now src/config/site.ts as requested.
// This file re-exports siteConfig and SubdomainBarConfig for backward compatibility.
// ==============================================================================

export {
  siteConfig,
  sharedSubdomainBarConfig,
  type SiteConfig,
  type SubdomainBarConfig,
} from "@/config/site";
