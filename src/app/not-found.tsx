import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/buttons/Button";
import { Home } from "lucide-react";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-slate-50 text-slate-900 py-16 px-4">
      <Container className="max-w-md mx-auto text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-500/10 text-amber-600 font-extrabold text-3xl font-heading shadow-inner border border-amber-500/20">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-slate-900">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-md mx-auto">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div>
          <Link href="/">
            <Button variant="primary" size="lg" className="font-extrabold" iconLeft={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
        </div>
      </Container>
    </main>
  );
}
