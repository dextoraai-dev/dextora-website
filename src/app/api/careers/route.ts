import { NextResponse } from "next/server";
import { z } from "zod";
import { sendNotificationEmail } from "@/lib/email-service";
import { siteConfig } from "@/data/site-config";

const CareerApplicationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is required"),
  roleId: z.string().min(1, "Please select a position or General Application"),
  roleTitle: z.string().min(1, "Role title is required"),
  linkedinUrl: z.string().url("Please provide a valid LinkedIn profile URL").optional().or(z.literal("")),
  portfolioUrl: z.string().url("Please provide a valid portfolio/GitHub URL").optional().or(z.literal("")),
  resumeLink: z.string().min(3, "Please provide a link to your resume or cloud document"),
  coverNote: z.string().min(15, "Please share a brief note on why you'd like to build with Dextora"),
  _gotcha: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = CareerApplicationSchema.safeParse(body);

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

    if (result.data._gotcha && result.data._gotcha.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    const app = result.data;

    // Send internal alert to hiring team
    await sendNotificationEmail({
      to: siteConfig.careersEmail,
      replyTo: app.email,
      subject: `[Job Application] ${app.roleTitle} - ${app.fullName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 24px; color: #171C1B;">
          <h2 style="color: #0E2922;">New Candidate Application</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr><td style="padding: 6px 0; font-weight: bold;">Position:</td><td>${app.roleTitle}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Applicant:</td><td>${app.fullName}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td>${app.email}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Phone:</td><td>${app.phone}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Resume Link:</td><td><a href="${app.resumeLink}">${app.resumeLink}</a></td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">LinkedIn:</td><td>${app.linkedinUrl || "N/A"}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Portfolio/Code:</td><td>${app.portfolioUrl || "N/A"}</td></tr>
          </table>
          <h3 style="margin-top: 20px; color: #0E2922;">Why Dextora:</h3>
          <div style="background: #F8F5EE; padding: 16px; border-radius: 8px; border: 1px solid #E2DBD0; white-space: pre-wrap;">
            ${app.coverNote}
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully! Our recruiting team will review your profile.",
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
