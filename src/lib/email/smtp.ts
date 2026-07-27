import nodemailer, { Transporter } from "nodemailer";

let cachedTransporter: Transporter | null = null;
let isVerified = false;

/**
 * Reusable SMTP Transporter Singleton with Server Startup Connection Verification
 */
export function getSmtpTransporter(): Transporter | null {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn(
      "[SMTP] Missing SMTP_USER or SMTP_PASS environment variables. Emails will be logged locally only."
    );
    return null;
  }

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
    });

    // Verify SMTP connection once on initialization
    if (!isVerified) {
      cachedTransporter.verify((error) => {
        if (error) {
          console.error("[SMTP] Transporter verification failed:", error.message);
          isVerified = false;
        } else {
          console.log("[SMTP] Transporter verified successfully. Ready to send emails.");
          isVerified = true;
        }
      });
    }
  }

  return cachedTransporter;
}

/**
 * Returns formatted sender identity for outgoing emails
 */
export function getSmtpFromAddress(): string {
  const name = process.env.SMTP_FROM_NAME || "QuickWay Ride";
  const email = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || "quickwayride@gmail.com";
  return `"${name}" <${email}>`;
}

/**
 * Returns configured Admin recipient email
 */
export function getAdminEmailAddress(): string {
  return process.env.ADMIN_EMAIL || process.env.SMTP_USER || "quickwayride@gmail.com";
}
