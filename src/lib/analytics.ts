// Provider-agnostic analytics wrapper supporting GA4, Plausible, PostHog, or custom events

export type EventName =
  | "page_view"
  | "product_launch_clicked"
  | "product_spec_viewed"
  | "contact_form_submitted"
  | "careers_application_submitted"
  | "newsletter_subscribed"
  | "language_toggled"
  | "theme_toggled";

export interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(name: EventName, properties?: EventProperties) {
  if (typeof window === "undefined") return;

  // Log in development
  if (process.env.NODE_ENV === "development") {
    // console.log(`[Analytics Event: ${name}]`, properties);
  }

  // 1. Plausible Analytics support
  // @ts-expect-error - Plausible global
  if (window.plausible) {
    // @ts-expect-error - Plausible global
    window.plausible(name, { props: properties });
  }

  // 2. Google Analytics 4 (gtag) support
  // @ts-expect-error - gtag global
  if (window.gtag && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    // @ts-expect-error - gtag global
    window.gtag("event", name, properties);
  }

  // 3. PostHog support
  // @ts-expect-error - posthog global
  if (window.posthog) {
    // @ts-expect-error - posthog global
    window.posthog.capture(name, properties);
  }
}
