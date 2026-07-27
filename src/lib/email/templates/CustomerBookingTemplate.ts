import {
  BookingEmailData,
  renderEmailHeader,
  renderBookingSummaryTable,
  renderSupportSection,
  renderEmailFooter,
} from "./components";

/**
 * Generates Customer Booking Confirmation Email (HTML & Plain Text)
 */
export function buildCustomerBookingEmail(data: BookingEmailData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Booking Request Received - ${data.booking_id}`;

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
                  <td>${renderEmailHeader("BOOKING REQUEST CONFIRMATION")}</td>
                </tr>

                <!-- Content Body -->
                <tr>
                  <td style="padding: 24px;">
                    <div style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 6px;">
                      Hello ${data.customer_name},
                    </div>
                    <div style="font-size: 13px; color: #334155; margin-bottom: 16px; line-height: 1.6;">
                      Thank you for choosing <strong>QuickWay Ride</strong>.<br/><br/>
                      We have successfully received your booking request. Our team will review your request and contact you shortly via Phone / WhatsApp to confirm your trip details and final fare quote.
                    </div>

                    <!-- Booking Summary Table -->
                    ${renderBookingSummaryTable(data)}

                    <!-- Support Section -->
                    ${renderSupportSection()}

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
Hello ${data.customer_name},

Thank you for choosing QuickWay Ride.

We have successfully received your booking request. Our team will review your request and contact you shortly to confirm your trip details and final fare quote.

BOOKING SUMMARY:
Booking ID: ${data.booking_id}
Pickup: ${data.pickup_location}
Dropoff: ${data.dropoff_location}
Date: ${data.pickup_date}
Time: ${data.pickup_time}
Vehicle: ${data.vehicle_type}
Passengers: ${data.passengers || "1"}

Need assistance?
Phone: +91 8679506655
Email: info@quickwayride.com

----------------------------------------
Thank you for choosing QuickWay Ride.
Safe journeys begin with us.
  `.trim();

  return { subject, html, text };
}
