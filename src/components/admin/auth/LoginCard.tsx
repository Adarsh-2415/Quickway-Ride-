"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, ShieldAlert, ArrowRight, CheckSquare, Square } from "lucide-react";
import { toast } from "sonner";
import { loginSchema, LoginSchemaType } from "@/schemas/auth";
import { loginAdminAction } from "@/actions/authActions";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export const LoginCard: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const rememberMe = watch("rememberMe");

  // Detect Caps Lock state on keyup/keydown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.getModifierState("CapsLock")) {
      setIsCapsLockOn(true);
    } else {
      setIsCapsLockOn(false);
    }
  };

  const onSubmit = async (data: LoginSchemaType) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // 1. Execute Server Action with brute-force safety
      const result = await loginAdminAction(data);

      if (!result.success) {
        toast.error("Authentication Failed", {
          description: result.error || "Invalid email or password.",
          duration: 4000,
        });
        setIsSubmitting(false);
        return;
      }

      // 2. Also refresh browser client persistence if rememberMe is enabled
      const supabase = createClient(data.rememberMe);
      await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      toast.success("Welcome Back Admin!", {
        description: "Session authenticated securely. Redirecting to dashboard...",
        duration: 3000,
      });

      // 3. Redirect to Admin Dashboard
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: unknown) {
      console.error("Login submission error:", err);
      toast.error("Security Error", {
        description: "An unexpected error occurred during login. Please try again.",
      });
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
        
        {/* Mobile Header Logo (visible only on smaller screens) */}
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

        {/* Card Header */}
        <div className="space-y-1 text-left">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Administrator Login
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-600 uppercase tracking-wide">
              CMS v1.0
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Authorized personnel only. Enter your credentials to continue.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left" noValidate>
          
          {/* Email Address Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 select-none"
            >
              Administrator Email
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

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 select-none"
              >
                Password
              </label>
              <Link
                href="/admin/forgot-password"
                className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline transition-colors focus-visible:outline-amber-500 rounded"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••••••"
                disabled={isSubmitting}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyDown}
                {...register("password")}
                className={cn(
                  "w-full pl-10 pr-10 py-2.5 bg-slate-50/50 border rounded-xl text-sm text-slate-900 font-medium placeholder:text-slate-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 select-text",
                  errors.password
                    ? "border-rose-400 focus:ring-rose-500/20 focus:border-rose-500"
                    : "border-slate-300/80 focus:ring-amber-500/20 focus:border-amber-500"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Caps Lock Detection Badge */}
            {isCapsLockOn && (
              <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg text-xs font-semibold">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>Caps Lock is ON</span>
              </div>
            )}

            {errors.password && (
              <p className="text-xs text-rose-600 flex items-center gap-1 font-medium pt-0.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.password.message}</span>
              </p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="pt-1 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setValue("rememberMe", !rememberMe)}
              className="flex items-center gap-2 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors focus-visible:outline-amber-500 rounded select-none cursor-pointer"
            >
              {rememberMe ? (
                <CheckSquare className="w-4 h-4 text-amber-500 shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-slate-400 shrink-0" />
              )}
              <span>Remember this session on this device</span>
            </button>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full py-3 px-4 rounded-xl font-bold text-sm text-slate-950 bg-amber-500 hover:bg-amber-400 active:scale-[0.99] shadow-lg shadow-amber-500/25 border border-amber-400/50 flex items-center justify-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Authenticating Session...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </motion.div>
  );
};
