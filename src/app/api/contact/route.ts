import { NextResponse } from "next/server";
import { z } from "zod";
import { sendNotificationEmail } from "@/lib/email-service";
import { siteConfig } from "@/data/site-config";

const ContactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  organization: z.string().optional(),
  inquiryType: z.enum([
    "general",
    "institutional-partnership",
    "dextora-learn",
    "dhyeya-ias",
    "careers",
    "press-media",
  ]),
  message: z.string().min(10, "Message must be at least 10 characters"),
  _gotcha: z.string().optional(), // Honeypot field
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = ContactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    // Bot detection check
    if (result.data._gotcha && result.data._gotcha.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    const { fullName, email, phone, organization, inquiryType, message } = result.data;

    // Send internal team notification
    await sendNotificationEmail({
      to: siteConfig.contactEmail,
      replyTo: email,
      subject: `[Dextora Hub Inquiry] ${inquiryType} from ${fullName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 24px; color: #171C1B;">
          <h2 style="color: #0E2922;">New Website Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr><td style="padding: 6px 0; font-weight: bold;">Name:</td><td>${fullName}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td>${email}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Phone:</td><td>${phone || "Not provided"}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Organization:</td><td>${organization || "Not provided"}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Category:</td><td>${inquiryType}</td></tr>
          </table>
          <h3 style="margin-top: 20px; color: #0E2922;">Message:</h3>
          <div style="background: #F8F5EE; padding: 16px; border-radius: 8px; border: 1px solid #E2DBD0; white-space: pre-wrap;">
            ${message}
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Our team will respond within 24 hours.",
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
