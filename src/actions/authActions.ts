"use server";

import { createServerClientInstance } from "@/lib/supabase/server";
import { loginSchema, forgotPasswordSchema } from "@/schemas/auth";
import { AuthActionResult } from "@/types/auth";

/**
 * Delay helper for brute-force mitigation
 */
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

/**
 * Authenticates admin via Supabase Email + Password
 */
export async function loginAdminAction(formData: unknown): Promise<AuthActionResult> {
  // 1. Validate Form Input
  const parseResult = loginSchema.safeParse(formData);

  if (!parseResult.success) {
    return {
      success: false,
      error: parseResult.error.errors[0]?.message || "Invalid input data.",
    };
  }

  const { email, password } = parseResult.data;

  try {
    const supabase = await createServerClientInstance();

    // 2. Perform Supabase Sign In
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Brute-force protection delay on failure
      await delay(800);
      return {
        success: false,
        error: "Invalid email or password.", // Security: Generic error message
      };
    }

    if (!data.user) {
      return {
        success: false,
        error: "Authentication failed. User session not found.",
      };
    }

    return {
      success: true,
      message: "Authentication successful. Welcome back!",
      user: {
        id: data.user.id,
        email: data.user.email || email,
        lastSignInAt: data.user.last_sign_in_at,
      },
    };
  } catch (err: unknown) {
    console.error("Login Server Action Error:", err);
    await delay(500);
    return {
      success: false,
      error: "An unexpected security error occurred. Please try again.",
    };
  }
}

/**
 * Dispatches a password reset email via Supabase Auth
 */
export async function sendPasswordResetAction(formData: unknown): Promise<AuthActionResult> {
  const parseResult = forgotPasswordSchema.safeParse(formData);

  if (!parseResult.success) {
    return {
      success: false,
      error: parseResult.error.errors[0]?.message || "Invalid email address.",
    };
  }

  const { email } = parseResult.data;

  try {
    const supabase = await createServerClientInstance();
    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/admin/reset-password`,
    });

    if (error) {
      // Do not reveal email existence to unauthorized actors
      console.warn("Password reset request error:", error.message);
    }

    return {
      success: true,
      message: "If an administrator account exists with this email, password reset instructions have been dispatched.",
    };
  } catch (err: unknown) {
    console.error("Password Reset Action Error:", err);
    return {
      success: true, // Always return generic success to prevent email enumeration
      message: "If an administrator account exists with this email, password reset instructions have been dispatched.",
    };
  }
}

/**
 * Signs out the current admin user and clears cookies
 */
export async function signOutAdminAction(): Promise<AuthActionResult> {
  try {
    const supabase = await createServerClientInstance();
    await supabase.auth.signOut();
    return {
      success: true,
      message: "Signed out successfully.",
    };
  } catch (err: unknown) {
    console.error("Sign Out Action Error:", err);
    return {
      success: false,
      error: "Failed to sign out.",
    };
  }
}
