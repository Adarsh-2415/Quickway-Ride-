import { SITE_CONFIG } from "@/constants/siteConfig";

export interface BookingEmailData {
  booking_id: string;
  customer_name: string;
  mobile_number: string;
  email?: string | null;
  pickup_location: string;
  dropoff_location: string;
  pickup_date: string;
  pickup_time: string;
  vehicle_type: string;
  trip_type?: string | null;
  trip_schedule?: string | null;
  passengers?: string | null;
  luggage?: string | null;
  message?: string | null;
  created_at?: string | null;
}

/**
 * Reusable HTML Email Header
 */
export function renderEmailHeader(title: string): string {
  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0f172a; border-radius: 12px 12px 0 0;">
      <tr>
        <td align="center" style="padding: 24px 20px;">
          <table border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center">
                <span style="font-family: Arial, sans-serif; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                  Quick<span style="color: #f59e0b;">Way</span> Ride
                </span>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top: 6px;">
                <span style="font-family: Arial, sans-serif; font-size: 11px; font-weight: 700; color: #cbd5e1; text-transform: uppercase; letter-spacing: 1px;">
                  ${title}
                </span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

/**
 * Reusable HTML Booking Summary Table
 */
export function renderBookingSummaryTable(data: BookingEmailData): string {
  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; margin: 16px 0;">
      <tr>
        <td style="padding: 12px 16px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="font-family: Arial, sans-serif; font-size: 12px; font-weight: 800; color: #475569; text-transform: uppercase;">
                Booking ID Reference
              </td>
              <td align="right" style="font-family: Arial, sans-serif; font-size: 14px; font-weight: 800; color: #b45309; background-color: #fef3c7; padding: 4px 10px; border-radius: 6px;">
                ${data.booking_id}
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 16px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="35%" style="padding: 6px 0; font-family: Arial, sans-serif; font-size: 12px; font-weight: 700; color: #64748b;">Pickup Location:</td>
              <td style="padding: 6px 0; font-family: Arial, sans-serif; font-size: 13px; font-weight: 700; color: #0f172a;">${data.pickup_location}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-family: Arial, sans-serif; font-size: 12px; font-weight: 700; color: #64748b;">Drop Location:</td>
              <td style="padding: 6px 0; font-family: Arial, sans-serif; font-size: 13px; font-weight: 700; color: #0f172a;">${data.dropoff_location}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-family: Arial, sans-serif; font-size: 12px; font-weight: 700; color: #64748b;">Pickup Date:</td>
              <td style="padding: 6px 0; font-family: Arial, sans-serif; font-size: 13px; font-weight: 700; color: #0f172a;">${data.pickup_date}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-family: Arial, sans-serif; font-size: 12px; font-weight: 700; color: #64748b;">Pickup Time:</td>
              <td style="padding: 6px 0; font-family: Arial, sans-serif; font-size: 13px; font-weight: 700; color: #0f172a;">${data.pickup_time}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-family: Arial, sans-serif; font-size: 12px; font-weight: 700; color: #64748b;">Vehicle Type:</td>
              <td style="padding: 6px 0; font-family: Arial, sans-serif; font-size: 13px; font-weight: 700; color: #b45309;">${data.vehicle_type}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-family: Arial, sans-serif; font-size: 12px; font-weight: 700; color: #64748b;">Passengers:</td>
              <td style="padding: 6px 0; font-family: Arial, sans-serif; font-size: 13px; font-weight: 700; color: #0f172a;">${data.passengers || "1"}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

/**
 * Reusable Support Section Component
 */
export function renderSupportSection(): string {
  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-top: 16px;">
      <tr>
        <td style="padding: 16px; font-family: Arial, sans-serif;">
          <div style="font-size: 12px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 8px;">
            Need Immediate Assistance?
          </div>
          <div style="font-size: 13px; color: #334155; line-height: 1.6;">
            <strong>Dispatch Helpline:</strong> <a href="tel:${SITE_CONFIG.contact.phoneHotline}" style="color: #d97706; text-decoration: none; font-weight: bold;">${SITE_CONFIG.contact.phoneDisplay}</a><br/>
            <strong>Email Support:</strong> <a href="mailto:${SITE_CONFIG.contact.supportEmail}" style="color: #d97706; text-decoration: none; font-weight: bold;">${SITE_CONFIG.contact.supportEmail}</a>
          </div>
        </td>
      </tr>
    </table>
  `;
}

/**
 * Reusable Email Footer Component
 */
export function renderEmailFooter(): string {
  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 24px; border-top: 1px solid #e2e8f0;">
      <tr>
        <td align="center" style="padding: 20px 0; font-family: Arial, sans-serif; font-size: 11px; color: #94a3b8; line-height: 1.5;">
          QuickWay Ride — Uttarakhand's Premier Outstation & Airport Cab Service<br/>
          Safe journeys begin with us.<br/>
          <span style="color: #cbd5e1;">This is an automated email notification. Please do not reply directly.</span>
        </td>
      </tr>
    </table>
  `;
}
