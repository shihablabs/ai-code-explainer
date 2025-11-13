import { ExplanationRequest } from "@/types";

export class GroqService {
  private apiKey: string;
  private baseURL = "https://api.groq.com/openai/v1/chat/completions";

  constructor() {
    this.apiKey = process.env.GROQ_API_KEY!;
    if (!this.apiKey) {
      throw new Error("GROQ_API_KEY is not set in environment variables");
    }
  }

  private createPrompt(request: ExplanationRequest): string {
    const { code, language } = request;

    if (language === "bengali") {
      return `তুমি একজন খুবই বন্ধুত্বপূর্ণ এবং সহজভাবে বুঝাতে পারা প্রোগ্রামিং শিক্ষক। নিচের কোডটি বাংলায় খুবই সহজ এবং মজাদারভাবে ব্যাখ্যা করো:

**কোড:**
\`\`\`
${code}
\`\`\**

**ব্যাখ্যার স্টাইল:**
- খুবই সহজ ভাষায়, যেন একটা ছোট বাচ্চাও বুঝতে পারে
- বন্ধুর মতো কথা বলার স্টাইলে
- বাংলাদেশি কথ্য ভাষার মতো করে
- হিউম্যানাইজড এবং এশিয়ান একসেন্ট এ
- প্রযুক্তিগত টার্মগুলো ইংরেজিতেই রাখবে (যেমন: JavaScript, HTML, function, variable ইত্যাদি)

**কাঠামো:**
১. 🎯 **এটা কি কাজ করে?** - খুব সহজভাবে মূল উদ্দেশ্য বলো
২. 🔧 **কিভাবে কাজ করে?** - স্টেপ বাই স্টেপ বুঝাও, যেন কেউ ফollow করতে পারে
৩. 📝 **মজাদার উদাহরণ দাও** - রিয়েল লাইফ example দাও
৪. 💡 **কি শিখলাম?** - গুরুত্বপূর্ণ concepts গুলো সহজভাবে বলো
৫. 🚀 **এটা দিয়ে আর কি করা যায়?** - প্র্যাকটিকাল আইডিয়া দাও

**বিশেষ নির্দেশ:**
- ভাই, ব্রো, বন্ধু -这样亲切的称呼使用 করো
- হাসিখুশি এবং এনজয়েবল ভাষা
- বাংলাদেশি কন্টেক্সট এ example দাও
- খুব ছোট ছোট বাক্যে লেখো
- ইমোজি ব্যবহার করো মজার জন্য
- কখনও জটিল করো না, সবসময় সহজ রাখো`;
    }

    return `You are a very friendly programming teacher with Asian accent English. Explain the following code in simple, humanized way:

**Code:**
\`\`\`
${code}
\`\`\`

**Explanation Style:**
- Very simple language, like explaining to a young child
- Friendly, brotherly tone
- Asian accent English - warm and approachable
- Humanized and conversational
- Keep technical terms as is

**Structure:**
1. 🎯 **What does it do?** - Simple purpose in one line
2. 🔧 **How it works?** - Step by step like teaching a friend
3. 📝 **Fun examples** - Give real-life relatable examples
4. 💡 **What we learned?** - Key concepts in simple words
5. 🚀 **What can we build?** - Practical project ideas

**Special Instructions:**
- Use "bro", "friend", "you know" - friendly terms
- Happy and enjoyable language
- Use Asian context examples
- Very short sentences
- Use emojis to make it fun
- Never make it complex, always keep it simple`;
  }

  async explainCode(request: ExplanationRequest): Promise<string> {
    const prompt = this.createPrompt(request);

    const model = "llama-3.1-8b-instant";

    const response = await fetch(this.baseURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: "system",
            content:
              request.language === "bengali"
                ? `তুমি একজন বাংলাদেশি প্রোগ্রামিং শিক্ষক। খুবই ফ্রেন্ডলি এবং সহজভাবে বুঝাও। 
               বন্ধুর মতো কথা বলো, হাসিখুশি থাকো। টেকনিক্যাল টার্মগুলো ইংরেজিতেই রাখো।
               ছোট ছোট বাক্যে লেখো, মজার উদাহরণ দাও।`
                : `You are a friendly Asian programming teacher. Explain like you're talking to a friend.
               Use warm, approachable Asian accent English. Keep it simple and enjoyable.
               Use short sentences and practical examples.`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 2000,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Groq API error: ${errorData.error?.message || "Unknown error"}`
      );
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Invalid response format from Groq API");
    }

    return data.choices[0].message.content;
  }
}
