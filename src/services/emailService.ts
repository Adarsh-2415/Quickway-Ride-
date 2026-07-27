import { getSmtpTransporter, getSmtpFromAddress, getAdminEmailAddress } from "@/lib/email/smtp";
import { BookingEmailData } from "@/lib/email/templates/components";
import { buildAdminBookingEmail } from "@/lib/email/templates/AdminBookingTemplate";
import { buildCustomerBookingEmail } from "@/lib/email/templates/CustomerBookingTemplate";

export interface EmailLogEntry {
  bookingId: string;
  recipient: string;
  emailType: "ADMIN_NOTIFICATION" | "CUSTOMER_CONFIRMATION";
  status: "SUCCESS" | "FAILED" | "TIMEOUT";
  timestamp: string;
  error?: string;
}

/**
 * Structured Server Email Logger (Improvement 3)
 */
function logEmailStatus(log: EmailLogEntry) {
  const logMessage = `[EmailLogger] ${JSON.stringify(log)}`;
  if (log.status === "SUCCESS") {
    console.log(logMessage);
  } else {
    console.error(logMessage);
  }
}

/**
 * Executes an async task with a 10-second safety timeout (Improvement 7)
 */
function withTimeout<T>(promise: Promise<T>, timeoutMs: number = 10000): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`SMTP Dispatch Timeout after ${timeoutMs}ms`));
    }, timeoutMs);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

/**
 * Main Server Email Orchestrator: Sends Admin Notification & Customer Confirmation Emails concurrently.
 * Wrapped in non-blocking try/catch and 10s safety timeout (Improvements 1, 3, 4, 7).
 */
export async function sendBookingNotificationEmails(booking: BookingEmailData): Promise<void> {
  const transporter = getSmtpTransporter();
  const fromAddress = getSmtpFromAddress();
  const adminEmail = getAdminEmailAddress();
  const timestamp = new Date().toISOString();

  if (!transporter) {
    logEmailStatus({
      bookingId: booking.booking_id,
      recipient: adminEmail,
      emailType: "ADMIN_NOTIFICATION",
      status: "FAILED",
      timestamp,
      error: "SMTP transporter not configured or disabled (missing credentials).",
    });
    return;
  }

  // 1. Build Email Payloads (HTML + Plain Text)
  const adminEmailPayload = buildAdminBookingEmail(booking);
  const customerEmailPayload = booking.email ? buildCustomerBookingEmail(booking) : null;

  // 2. Prepare Email Tasks
  const adminTask = withTimeout(
    transporter.sendMail({
      from: fromAddress,
      to: adminEmail,
      subject: adminEmailPayload.subject,
      html: adminEmailPayload.html,
      text: adminEmailPayload.text,
    })
  );

  const customerTask = customerEmailPayload
    ? withTimeout(
        transporter.sendMail({
          from: fromAddress,
          to: booking.email!,
          subject: customerEmailPayload.subject,
          html: customerEmailPayload.html,
          text: customerEmailPayload.text,
        })
      )
    : Promise.resolve(null);

  // 3. Execute Concurrently using Promise.allSettled (Improvement 1)
  const results = await Promise.allSettled([adminTask, customerTask]);

  // 4. Structured Server Logging (Improvement 3)
  const adminResult = results[0];
  if (adminResult.status === "fulfilled") {
    logEmailStatus({
      bookingId: booking.booking_id,
      recipient: adminEmail,
      emailType: "ADMIN_NOTIFICATION",
      status: "SUCCESS",
      timestamp,
    });
  } else {
    logEmailStatus({
      bookingId: booking.booking_id,
      recipient: adminEmail,
      emailType: "ADMIN_NOTIFICATION",
      status: adminResult.reason?.message?.includes("Timeout") ? "TIMEOUT" : "FAILED",
      timestamp,
      error: adminResult.reason?.message || "Admin email dispatch failed.",
    });
  }

  if (customerEmailPayload) {
    const customerResult = results[1];
    if (customerResult.status === "fulfilled") {
      logEmailStatus({
        bookingId: booking.booking_id,
        recipient: booking.email!,
        emailType: "CUSTOMER_CONFIRMATION",
        status: "SUCCESS",
        timestamp,
      });
    } else {
      logEmailStatus({
        bookingId: booking.booking_id,
        recipient: booking.email!,
        emailType: "CUSTOMER_CONFIRMATION",
        status: customerResult.reason?.message?.includes("Timeout") ? "TIMEOUT" : "FAILED",
        timestamp,
        error: customerResult.reason?.message || "Customer email dispatch failed.",
      });
    }
  }
}
