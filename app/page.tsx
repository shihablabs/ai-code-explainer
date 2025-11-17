/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { AdvancedFilters } from "@/components/filters/advanced-filters";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ExplanationRequest, ExplanationResponse, FilterState } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<"english" | "bengali">("english");
  const [explanationStyle, setExplanationStyle] = useState<
    "detailed" | "concise" | "beginner"
  >("beginner");
  const [includeExamples, setIncludeExamples] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState<FilterState>({
    programmingLanguage: "auto",
    explanationDepth: "basic",
    targetAudience: "student",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleExplain = async () => {
    if (!code.trim()) {
      setError("❌ Please enter some code to explain.");
      return;
    }

    setLoading(true);
    setExplanation("");
    setError("");

    const request: ExplanationRequest = {
      code,
      language: language,
      explanationStyle: explanationStyle,
      includeExamples,
      programmingLanguage: filters.programmingLanguage,
      explanationDepth: filters.explanationDepth,
      targetAudience: filters.targetAudience,
    };

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });

      const data: ExplanationResponse = await response.json();

      if (data.explanation) {
        setExplanation(data.explanation);
        setError("");
      } else if (data.error) {
        setError(data.error);
        setExplanation("");
      } else {
        setError("❌ Unexpected error occurred. Please try again.");
        setExplanation("");
      }
    } catch (err) {
      setError("🌐 Network error. Please check your connection.");
      setExplanation("");
    } finally {
      setLoading(false);
    }
  };

  const canExplain = code.trim() && !loading;

  const codeSnippets = [
    {
      title: "React useEffect",
      code: `useEffect(() => {\n  document.title = \`You clicked \${count} times\`;\n}, [count]);`,
      language: "javascript",
    },
    {
      title: "Python Function",
      code: `def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)`,
      language: "python",
    },
    {
      title: "JavaScript Array",
      code: `const numbers = [1, 2, 3];\nconst doubled = numbers.map(n => n * 2);\nconsole.log(doubled);`,
      language: "javascript",
    },
  ];

  const insertSnippet = (snippetCode: string) => {
    setCode(snippetCode);
    setError("");
    setExplanation("");
  };

  const clearAll = () => {
    setCode("");
    setExplanation("");
    setError("");
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground">
                AI Code Explainer
              </h1>
            </div>
            <Button variant="outline" size="icon" disabled>
              <div className="h-5 w-5"></div>
            </Button>
          </div>
          <div className="h-96 flex items-center justify-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              AI Code Explainer
            </h1>
            <p className="text-muted-foreground mt-2">
              Get code explanations in simple, friendly English or Bengali
            </p>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <span>By</span>
              <a
                href="https://shihablabs.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Shihab Labs
              </a>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="shrink-0">
                  <svg
                    className="w-5 h-5 text-red-500 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-red-800 dark:text-red-200">
                    Error
                  </h3>
                  <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                    {error}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quick Start Examples</CardTitle>
            <CardDescription>
              Try these code samples to see how it works
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {codeSnippets.map((snippet, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => insertSnippet(snippet.code)}
                >
                  {snippet.title}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                className="text-red-500 border-red-200 hover:bg-red-50"
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        <AdvancedFilters
          filters={filters}
          onFiltersChange={setFilters}
          explanationStyle={explanationStyle}
          onExplanationStyleChange={(style: string) =>
            setExplanationStyle(style as "detailed" | "concise" | "beginner")
          }
          includeExamples={includeExamples}
          onIncludeExamplesChange={setIncludeExamples}
          language={language}
          onLanguageChange={(language: string) =>
            setLanguage(language as "english" | "bengali")
          }
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Your Code</span>
                {code && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAll}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    Clear
                  </Button>
                )}
              </CardTitle>
              <CardDescription>
                Paste any programming code to understand it better
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError("");
                }}
                placeholder="Paste your code here... Or try the examples above... Example: React, Python, JavaScript, HTML, CSS, etc."
                className="w-full h-80 p-4 border border-input rounded-lg font-mono text-sm focus:ring-2 focus:ring-ring focus:border-transparent resize-none bg-background"
                spellCheck="false"
              />

              <Button
                onClick={handleExplain}
                disabled={!canExplain}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Analyzing Code...
                  </>
                ) : (
                  "Explain Code"
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>AI Explanation</span>
                {explanation && !loading && (
                  <span className="text-sm font-normal text-green-600 bg-green-100 px-2 py-1 rounded">
                    Complete
                  </span>
                )}
              </CardTitle>
              <CardDescription>
                Powered by Groq AI - Fast & Friendly Responses
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-80">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">
                      AI is analyzing your code...
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Please wait a moment
                    </p>
                  </div>
                </div>
              ) : explanation ? (
                <div className="h-80 overflow-y-auto">
                  <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                    {explanation}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-80 text-muted-foreground">
                  <div className="text-center">
                    <svg
                      className="w-16 h-16 mx-auto mb-4 opacity-50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    <p>Explanation will appear here</p>
                    <p className="text-sm mt-2">
                      Enter code and click &quot;Explain Code&quot;
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center text-muted-foreground text-sm">
          <p>
            Built with ❤️ by{" "}
            <a
              href="https://shihablabs.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Shihab Labs
            </a>{" "}
            • Next.js • TypeScript • Tailwind CSS • Shadcn/ui
          </p>
        </div>
      </div>
    </div>
  );
}
