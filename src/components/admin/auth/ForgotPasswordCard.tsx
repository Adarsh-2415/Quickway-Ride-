"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Loader2, AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { forgotPasswordSchema, ForgotPasswordSchemaType } from "@/schemas/auth";
import { sendPasswordResetAction } from "@/actions/authActions";
import { cn } from "@/lib/utils";

export const ForgotPasswordCard: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const result = await sendPasswordResetAction(data);

      setIsSubmittedSuccess(true);
      toast.success("Request Processed", {
        description: result.message || "Password reset instructions sent.",
      });
    } catch (err: unknown) {
      console.error("Password reset error:", err);
      toast.error("Error", {
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
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/90 p-8 sm:p-10 space-y-6">
        
        {/* Mobile Header Logo */}
        <div className="lg:hidden flex items-center justify-center pb-2">
          <Image
            src="/images/quickway-ride-logo.png"
            alt="QuickWay Ride Logo"
            width={180}
            height={54}
            className="object-contain h-10 w-auto"
            priority
          />
        </div>

        {isSubmittedSuccess ? (
          /* Success State Confirmation */
          <div className="space-y-5 text-left py-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h2 className="font-heading text-2xl font-extrabold text-slate-900">
                Reset Link Dispatched
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                If an administrator account is registered under this email, you will receive password reset instructions shortly.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-800 uppercase tracking-wide">Next Steps:</p>
              <p>1. Check your email inbox & spam folder.</p>
              <p>2. Click the secure password reset link.</p>
              <p>3. Set a new password and return to login.</p>
            </div>

            <div className="pt-2">
              <Link
                href="/admin/login"
                className="w-full py-2.5 px-4 rounded-xl font-bold text-sm text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Administrator Login</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Password Reset Request Form */
          <>
            <div className="space-y-1 text-left">
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Reset Administrator Password
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Enter your registered administrator email to receive password reset instructions.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left" noValidate>
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 select-none"
                >
                  Registered Administrator Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="admin@quickwayride.com"
                    disabled={isSubmitting}
                    {...register("email")}
                    className={cn(
                      "w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border rounded-xl text-sm text-slate-900 font-medium placeholder:text-slate-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 select-text",
                      errors.email
                        ? "border-rose-400 focus:ring-rose-500/20 focus:border-rose-500"
                        : "border-slate-300/80 focus:ring-amber-500/20 focus:border-amber-500"
                    )}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-600 flex items-center gap-1 font-medium pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email.message}</span>
                  </p>
                )}
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full py-3 px-4 rounded-xl font-bold text-sm text-slate-950 bg-amber-500 hover:bg-amber-400 active:scale-[0.99] shadow-lg shadow-amber-500/25 border border-amber-400/50 flex items-center justify-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Sending Reset Instructions...</span>
                    </>
                  ) : (
                    <span>Send Password Reset Email</span>
                  )}
                </button>

                <Link
                  href="/admin/login"
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Login</span>
                </Link>
              </div>
            </form>
          </>
        )}

      </div>
    </motion.div>
  );
};
