import { ExplanationRequest } from "@/types";

export class HuggingFaceService {
  private apiKey: string;
  private baseURL = "https://api-inference.huggingface.co/models";

  constructor() {
    this.apiKey = process.env.HUGGING_FACE_API_KEY!;
    if (!this.apiKey) {
      throw new Error(
        "HUGGING_FACE_API_KEY is not set in environment variables"
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

    return `As a programming expert, explain this code in ${
      languageMap[language]
    } in a ${styleMap[explanationStyle]} way:

${code}

Provide a clear explanation with:
1. What the code does
2. How it works step by step  
3. Key programming concepts used
4. ${
      includeExamples
        ? "Include practical examples"
        : "Focus on the core concepts"
    }

Make it educational and easy to understand.`;
  }

  async explainCode(request: ExplanationRequest): Promise<string> {
    const prompt = this.createPrompt(request);

    try {
      // Using a good model for code explanation - Microsoft's DialoGPT or similar
      const response = await fetch(`${this.baseURL}/microsoft/DialoGPT-large`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_length: 500,
            temperature: 0.7,
            do_sample: true,
          },
        }),
      });

      if (!response.ok) {
        // If model is loading, use fallback
        if (response.status === 503) {
          return this.getFallbackExplanation(request);
        }

        let errorMessage = `Hugging Face API error: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMessage = `Hugging Face: ${errorData.error}`;
          }
        } catch {
          errorMessage = `HTTP ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Handle different response formats from Hugging Face
      if (Array.isArray(data) && data[0] && data[0].generated_text) {
        return data[0].generated_text;
      } else if (data.generated_text) {
        return data.generated_text;
      } else {
        return this.getFallbackExplanation(request);
      }
    } catch (error) {
      console.error("Hugging Face API error:", error);
      // Return fallback explanation if API fails
      return this.getFallbackExplanation(request);
    }
  }

  private getFallbackExplanation(request: ExplanationRequest): string {
    const { code, language, explanationStyle } = request;

    const languageText = language === "bengali" ? "বাংলা" : "English";
    const styleText =
      explanationStyle === "beginner" ? "simple" : explanationStyle;

    return `🤖 **AI Code Explanation** (Demo Mode)

**Language:** ${languageText}
**Style:** ${styleText}

**Code Analysis:**
${code}

**Explanation:**
This is a demonstration of the AI Code Explainer. The application is working correctly, but the AI service is currently in demo mode.

**In a full implementation, you would see:**
1. Detailed code analysis
2. Step-by-step execution flow
3. Programming concepts explained
4. Practical examples and best practices

**Technical Stack:**
- Built with Next.js 14 & TypeScript
- Styled with Tailwind CSS & Shadcn/ui
- Ready for AI API integration

*Note: Connect a live AI API for real-time code explanations.*`;
  }
}
