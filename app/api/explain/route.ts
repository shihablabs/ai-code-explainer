/* eslint-disable @typescript-eslint/no-unused-vars */
import { GroqService } from "@/lib/groq";
import { ExplanationRequest, ExplanationResponse } from "@/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body: ExplanationRequest = await request.json();
    const { code, language } = body;

    if (!code?.trim()) {
      const errorResponse: ExplanationResponse = {
        explanation: "",
        error: "❌ Please enter some code to explain.",
      };
      return Response.json(errorResponse, { status: 400 });
    }

    if (code.length > 5000) {
      const errorResponse: ExplanationResponse = {
        explanation: "",
        error: "❌ Code is too long. Please keep it under 5,000 characters.",
      };
      return Response.json(errorResponse, { status: 400 });
    }

    const groqService = new GroqService();
    const explanation = await groqService.explainCode(body);

    const response: ExplanationResponse = { explanation };
    return Response.json(response);
  } catch (error) {
    console.error("Explanation error:", error);

    let errorMessage = "Failed to generate explanation. Please try again.";

    if (error instanceof Error) {
      if (error.message.includes("Rate limit")) {
        errorMessage =
          "📊 Rate limit exceeded. Please wait a minute and try again.";
      } else if (error.message.includes("API key")) {
        errorMessage = "🔑 Invalid API key. Please check your Groq API key.";
      } else if (error.message.includes("network")) {
        errorMessage =
          "🌐 Network error. Please check your internet connection.";
      } else {
        errorMessage = `❌ ${error.message}`;
      }
    }

    const response: ExplanationResponse = {
      explanation: "",
      error: errorMessage,
    };

    return Response.json(response, { status: 500 });
  }
}
