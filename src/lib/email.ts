import { Resend } from "resend";

// Initialize Resend client safely - will be null if API key is missing
let resend: Resend | null = null;

try {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.warn("⚠️ RESEND_API_KEY not found in environment variables. Email functionality will be disabled.");
  } else {
    resend = new Resend(apiKey);
  }
} catch (error) {
  console.error("Failed to initialize Resend client:", error);
  // resend remains null, allowing graceful fallback
}

export async function sendPasswordResetEmail(params: {
  to: string;
  name: string;
  resetUrl: string;
}) {
  const { to, name, resetUrl } = params;

  // Check if Resend is available
  if (!resend) {
    console.error("Resend client not initialized. Check RESEND_API_KEY in .env");
    throw new Error("Email service not available - check server logs");
  }

  const from = process.env.EMAIL_FROM ?? "Catalution <onboarding@resend.dev>";
  if (!from) {
    console.error("EMAIL_FROM not set in environment variables");
    throw new Error("Email sender not configured");
  }

  try {
    await resend.emails.send({
      from,
      to,
      subject: "Reset your Catalution admin password",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #1e1233;">Reset your password</h2>
          <p style="color: #6b7280; font-size: 14px;">
            Hi ${name}, we received a request to reset the password for your
            Catalution admin account. This link expires in 30 minutes.
          </p>
          <p style="margin: 24px 0;">
            <a href="${resetUrl}"
               style="background: #481d96; color: #fff; padding: 12px 20px;
                      border-radius: 8px; text-decoration: none; font-weight: 600;
                      display: inline-block;">
              Reset password
            </a>
          </p>
          <p style="color: #9ca3af; font-size: 12px;">
            If you didn't request this, you can safely ignore this email —
            your password won't be changed.
          </p>
        </div>
      `,
    });
    
    console.log(`Password reset email sent to ${to}`);
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw new Error("Failed to send email - check server logs");
  }
}