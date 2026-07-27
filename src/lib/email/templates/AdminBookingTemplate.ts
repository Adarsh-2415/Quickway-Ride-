import {
  BookingEmailData,
  renderEmailHeader,
  renderBookingSummaryTable,
  renderSupportSection,
  renderEmailFooter,
} from "./components";

/**
 * Generates Admin Booking Notification Email (HTML & Plain Text)
 */
export function buildAdminBookingEmail(data: BookingEmailData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `🚖 New Booking Request - ${data.booking_id}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: Arial, sans-serif;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
          <tr>
            <td align="center" style="padding: 20px 10px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td>${renderEmailHeader("ADMIN DISPATCH ALERT")}</td>
                </tr>

                <!-- Content Body -->
                <tr>
                  <td style="padding: 24px;">
                    <div style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 6px;">
                      New Customer Booking Request Submitted
                    </div>
                    <div style="font-size: 13px; color: #475569; margin-bottom: 16px; line-height: 1.5;">
                      A new taxi booking request has been submitted on the QuickWay Ride portal. Please contact the rider shortly to confirm details.
                    </div>

                    <!-- Customer Contact Details Box -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 14px 16px; font-family: Arial, sans-serif;">
                          <div style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 8px;">
                            Customer Contact Information
                          </div>
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="35%" style="padding: 4px 0; font-size: 12px; font-weight: 700; color: #475569;">Name:</td>
                              <td style="padding: 4px 0; font-size: 13px; font-weight: 800; color: #0f172a;">${data.customer_name}</td>
                            </tr>
                            <tr>
                              <td style="padding: 4px 0; font-size: 12px; font-weight: 700; color: #475569;">Mobile Number:</td>
                              <td style="padding: 4px 0; font-size: 13px; font-weight: 800; color: #0f172a;">
                                <a href="tel:${data.mobile_number}" style="color: #d97706; text-decoration: none;">+91 ${data.mobile_number}</a>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 4px 0; font-size: 12px; font-weight: 700; color: #475569;">Email Address:</td>
                              <td style="padding: 4px 0; font-size: 13px; font-weight: 700; color: #0f172a;">${data.email || "Not Provided"}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Booking Summary Table -->
                    ${renderBookingSummaryTable(data)}

                    ${data.message ? `
                    <!-- Special Instructions -->
                    <div style="margin-top: 12px; padding: 12px 16px; background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px;">
                      <div style="font-size: 11px; font-weight: 800; color: #b45309; text-transform: uppercase;">Customer Instructions / Notes:</div>
                      <div style="font-size: 12px; color: #78350f; margin-top: 4px;">${data.message}</div>
                    </div>
                    ` : ""}

                    ${renderEmailFooter()}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const text = `
NEW BOOKING REQUEST ALERT
----------------------------------------
Booking ID: ${data.booking_id}
Customer Name: ${data.customer_name}
Mobile Number: +91 ${data.mobile_number}
Email: ${data.email || "N/A"}

TRIP DETAILS:
Pickup: ${data.pickup_location}
Dropoff: ${data.dropoff_location}
Date: ${data.pickup_date}
Time: ${data.pickup_time}
Vehicle: ${data.vehicle_type}
Passengers: ${data.passengers || "1"}
Instructions: ${data.message || "None"}

----------------------------------------
QuickWay Ride CMS Notification
This is an automated email.
  `.trim();

  return { subject, html, text };
}
