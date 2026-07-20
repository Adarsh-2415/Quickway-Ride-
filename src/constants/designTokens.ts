/**
 * Master Design System Tokens for QuickWay Ride.
 * These correspond strictly to CSS variables in globals.css.
 */
export const DESIGN_TOKENS = {
  colors: {
    primary: "#0F172A", // Midnight Navy
    primaryHover: "#1E293B",
    primaryPressed: "#020617",

    accent: "#F59E0B", // Premium Gold
    accentHover: "#D97706",
    accentPressed: "#B45309",
    accentText: "#0F172A", // Always Midnight Navy on Gold CTA

    secondary: "#2563EB", // Royal Blue
    secondaryHover: "#1D4ED8",
    secondaryPressed: "#1E40AF",

    neutral: {
      canvas: "#FFFFFF",
      sectionSoft: "#F8FAFC",
      border: "#E2E8F0",
      textPrimary: "#0F172A",
      textSecondary: "#475569",
      textMuted: "#64748B",
    },

    tints: {
      accentSoft: "#FEF3C7", // Amber 100
      secondarySoft: "#EFF6FF", // Blue 50
      successSoft: "#DCFCE7", // Green 100
      warningSoft: "#FFEDD5", // Orange 100
      errorSoft: "#FEE2E2", // Red 100
    },

    semantic: {
      success: "#16A34A",
      warning: "#F97316",
      error: "#DC2626",
      info: "#0EA5E9",
    },
  },

  radius: {
    sm: "6px",
    md: "10px",
    lg: "14px",
    xl: "18px",
    full: "9999px",
  },

  spacing: {
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    8: "32px",
    10: "40px",
    12: "48px",
    16: "64px",
  },

  shadows: {
    sm: "0 1px 2px 0 rgba(15, 23, 42, 0.05)",
    md: "0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.05)",
    lg: "0 10px 15px -3px rgba(15, 23, 42, 0.12), 0 4px 6px -4px rgba(15, 23, 42, 0.08)",
    accentGlow: "0 10px 25px -5px rgba(245, 158, 11, 0.3)",
  },
};
