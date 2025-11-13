"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            Something went wrong!
          </h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            We apologize for the inconvenience. Please try refreshing the page.
          </p>
        </div>

        <div className="space-y-4">
          <Button onClick={() => reset()}>Try Again</Button>

          <Button variant="outline" asChild>
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>

        <div className="mt-12 text-center text-muted-foreground text-sm">
          <p>If the problem persists, please contact support.</p>
        </div>
      </div>
    </div>
  );
}
