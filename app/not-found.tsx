import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-foreground opacity-10">404</h1>
          <h2 className="text-2xl font-bold text-foreground mt-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Oops! The page you&apos;re looking for doesn&apos;t exist. It might
            have been moved or deleted.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild>
            <Link href="/">← Back to Home</Link>
          </Button>

          <div className="text-sm text-muted-foreground">
            <span>While you&apos;re here, why not try our code explainer?</span>
          </div>
        </div>

        <div className="mt-12 text-center text-muted-foreground text-sm">
          <p>
            Built with ❤️ by{" "}
            <a
              href="https://github.com/maker-shihab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Muhammad Shihab Uddin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
