"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Loader2, CheckCircle2, XCircle, AlertCircle, KeyRound, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { changePasswordSchema, ChangePasswordSchemaType } from "@/schemas/changePasswordSchema";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export const ChangePasswordForm: React.FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword") || "";

  // Live Password Validation Checks
  const passwordChecks = [
    { label: "Minimum 8 Characters", valid: newPassword.length >= 8 },
    { label: "One Uppercase Letter", valid: /[A-Z]/.test(newPassword) },
    { label: "One Lowercase Letter", valid: /[a-z]/.test(newPassword) },
    { label: "One Number", valid: /[0-9]/.test(newPassword) },
    { label: "One Special Character", valid: /[^A-Za-z0-9]/.test(newPassword) },
  ];

  const onSubmit = async (data: ChangePasswordSchemaType) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const supabase = createClient();

      // 1. Verify current password credentials by re-authenticating
      const { data: userAuth, error: authError } = await supabase.auth.getUser();
      if (authError || !userAuth.user?.email) {
        toast.error("Session Expired", {
          description: "Please log in again to change your password.",
        });
        setIsSubmitting(false);
        return;
      }

      // Re-auth check
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: userAuth.user.email,
        password: data.currentPassword,
      });

      if (signInError) {
        toast.error("Verification Failed", {
          description: "Current password is incorrect.",
        });
        setIsSubmitting(false);
        return;
      }

      // 2. Update password in Supabase Auth
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (updateError) {
        toast.error("Update Error", {
          description: updateError.message || "Failed to update password.",
        });
        setIsSubmitting(false);
        return;
      }

      toast.success("Password Updated Successfully!", {
        description: "Your administrator account password has been updated securely.",
      });

      reset();
    } catch (err: unknown) {
      console.error("Password update error:", err);
      toast.error("Security Error", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-xl mx-auto py-4"
    >
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 p-6 sm:p-10 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
            <KeyRound className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Change Account Password
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Update your QuickWay Ride administrator credentials securely.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left" noValidate>
          {/* Current Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="currentPassword"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 select-none"
            >
              Current Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••••••"
                disabled={isSubmitting}
                {...register("currentPassword")}
                className={cn(
                  "w-full pl-10 pr-10 py-2.5 bg-slate-50/50 border rounded-xl text-sm text-slate-900 font-medium placeholder:text-slate-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 select-text",
                  errors.currentPassword
                    ? "border-rose-400 focus:ring-rose-500/20 focus:border-rose-500"
                    : "border-slate-300/80 focus:ring-amber-500/20 focus:border-amber-500"
                )}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors focus:outline-none cursor-pointer"
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-xs text-rose-600 flex items-center gap-1 font-medium pt-0.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.currentPassword.message}</span>
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="newPassword"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 select-none"
            >
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••••••"
                disabled={isSubmitting}
                {...register("newPassword")}
                className={cn(
                  "w-full pl-10 pr-10 py-2.5 bg-slate-50/50 border rounded-xl text-sm text-slate-900 font-medium placeholder:text-slate-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 select-text",
                  errors.newPassword
                    ? "border-rose-400 focus:ring-rose-500/20 focus:border-rose-500"
                    : "border-slate-300/80 focus:ring-amber-500/20 focus:border-amber-500"
                )}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                aria-label={showNewPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors focus:outline-none cursor-pointer"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-rose-600 flex items-center gap-1 font-medium pt-0.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.newPassword.message}</span>
              </p>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 select-none"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••••••"
                disabled={isSubmitting}
                {...register("confirmPassword")}
                className={cn(
                  "w-full pl-10 pr-10 py-2.5 bg-slate-50/50 border rounded-xl text-sm text-slate-900 font-medium placeholder:text-slate-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 select-text",
                  errors.confirmPassword
                    ? "border-rose-400 focus:ring-rose-500/20 focus:border-rose-500"
                    : "border-slate-300/80 focus:ring-amber-500/20 focus:border-amber-500"
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors focus:outline-none cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-rose-600 flex items-center gap-1 font-medium pt-0.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.confirmPassword.message}</span>
              </p>
            )}
          </div>

          {/* Live Password Requirements Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Password Requirements
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {passwordChecks.map((check) => (
                <div key={check.label} className="flex items-center gap-2">
                  {check.valid ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-slate-300 shrink-0" />
                  )}
                  <span className={cn("font-medium", check.valid ? "text-emerald-800" : "text-slate-500")}>
                    {check.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm text-slate-950 bg-amber-500 hover:bg-amber-400 active:scale-[0.99] shadow-lg shadow-amber-500/25 border border-amber-400/50 flex items-center justify-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Update Password</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
