import { ExplanationRequest } from "@/types";

export class GeminiService {
  private apiKey: string;
  private baseURL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

  constructor() {
    this.apiKey = process.env.GOOGLE_GEMINI_API_KEY!;
    if (!this.apiKey) {
      throw new Error(
        "GOOGLE_GEMINI_API_KEY is not set in environment variables"
      );
    }
  }

  private createPrompt(request: ExplanationRequest): string {
    const { code, language, explanationStyle, includeExamples } = request;

    const styleMap = {
      detailed: "comprehensive and detailed",
      concise: "brief and to the point",
      beginner: "very simple and easy to understand for beginners",
    };

    const languageMap = {
      english: "English",
      bengali: "Bengali",
    };

    const examplesText = includeExamples
      ? "Include practical examples where relevant. "
      : "";

    return `You are an expert programming educator. Explain the following code in ${languageMap[language]} in a ${styleMap[explanationStyle]} manner.

CODE:
${code}

${examplesText}
Please structure your explanation with:
1. Overall purpose and functionality
2. Key components and their roles  
3. Step-by-step execution flow
4. Important concepts and patterns

Keep it educational, practical and easy to understand.`;
  }

  async explainCode(request: ExplanationRequest): Promise<string> {
    const prompt = this.createPrompt(request);

    const response = await fetch(`${this.baseURL}?key=${this.apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1500,
        },
      }),
    });

    if (!response.ok) {
      let errorMessage = `API request failed: ${response.status}`;

      try {
        const errorData = await response.json();
        if (errorData.error?.message) {
          errorMessage = `Gemini API Error: ${errorData.error.message}`;
        }
      } catch {
        // If JSON parsing fails
        errorMessage = `HTTP ${response.status}: ${await response.text()}`;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();

    if (
      !data.candidates ||
      !data.candidates[0] ||
      !data.candidates[0].content
    ) {
      throw new Error("Invalid response format from Gemini API");
    }

    return data.candidates[0].content.parts[0].text;
  }
}
