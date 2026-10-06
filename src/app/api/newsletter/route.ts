import { NextResponse } from "next/server";
import { z } from "zod";
import { sendNotificationEmail } from "@/lib/email-service";

const NewsletterSchema = z.object({
  email: z.string().email("Invalid email address format"),
  _gotcha: z.string().optional(), // Honeypot
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = NewsletterSchema.safeParse(body);

    if (!result.success) {
      const issue = result.error.issues[0];
      return NextResponse.json(
        { error: issue ? issue.message : "Invalid input" },
        { status: 400 }
      );
    }

    // Bot detection check: honeypot field must be empty
    if (result.data._gotcha && result.data._gotcha.trim() !== "") {
      // Silently return success to mislead spambots
      return NextResponse.json({ success: true });
    }

    const { email } = result.data;

    // Send confirmation/notification via email service
    await sendNotificationEmail({
      to: email,
      subject: "Welcome to Dextora AI Research Briefings",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #171C1B;">
          <h2 style="color: #0E2922;">Welcome to Dextora AI Research</h2>
          <p>Thank you for subscribing to our educational AI research updates and product announcements.</p>
          <p>You'll receive quarterly dispatches on Socratic AI models, multilingual LLMs for Indian curricula, and updates from the Dextora product suite.</p>
          <hr style="border: none; border-top: 1px solid #E2DBD0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #73807D;">Dextora AI Technologies • Bengaluru & New Delhi, India</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to Dextora research briefings.",
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
