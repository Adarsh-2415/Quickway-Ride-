"use client";

import React, { Suspense } from "react";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Suspense fallback={null}>
      <NuqsAdapter>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0F172A",
              color: "#FFFFFF",
              border: "1px solid #334155",
              borderRadius: "10px",
            },
          }}
        />
      </NuqsAdapter>
    </Suspense>
  );
}
