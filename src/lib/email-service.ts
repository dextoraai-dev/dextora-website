// Email notification service interface (Resend / SMTP ready)
// Stubbed for safe development and production toggle via environment variables

export interface EmailPayload {
  to: string;
  from?: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendNotificationEmail(payload: EmailPayload): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const defaultFrom = process.env.EMAIL_FROM || "Dextora Notifications <notifications@dextora.org>";

  // If no API key is provided, log safely in dev/stub mode
  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.log("-----------------------------------------");
      console.log("[Email Service Stub] Dispatching email:");
      console.log(`To: ${payload.to}`);
      console.log(`Subject: ${payload.subject}`);
      console.log(`Reply-To: ${payload.replyTo || "None"}`);
      console.log("Body Snippet:", payload.html.slice(0, 150) + "...");
      console.log("-----------------------------------------");
    }
    return {
      success: true,
      messageId: `stub_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: payload.from || defaultFrom,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        reply_to: payload.replyTo,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Failed to deliver email via Resend",
      };
    }

    return {
      success: true,
      messageId: data.id,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error in email dispatch";
    return {
      success: false,
      error: errorMsg,
    };
  }
}
