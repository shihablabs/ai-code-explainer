# 🤖 AI Code Explainer

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/) [![Groq API](https://img.shields.io/badge/Groq_API-llama--3.1--8b--instant-gray?style=for-the-badge&logo=openai)](https://www.groq.com/)

AI Code Explainer is a bilingual coding buddy that turns confusing code into friendly explanations. Paste any snippet, pick the tone you prefer, and get practical insights in English or Bengali—all powered by Groq’s `llama-3.1-8b-instant` model.

---

## ✨ Highlights

- **Built by [Shihab Labs](https://shihablabs.vercel.app/)** – Founder & Full-Stack Developer at Shihablabs bringing agency-grade product polish.
- **Bilingual output** – Switch between English and Bengali explanations without leaving the page.
- **Custom teaching styles** – Choose explanation depth, style (detailed, concise, beginner), target audience, and whether to include examples.
- **Quick start snippets** – One-click sample snippets help you test the flow instantly.
- **Dark/light aware** – Theme toggle with persisted preference plus responsive layout built on shadcn/ui components.
- **Helpful feedback** – Friendly loading states, validation, and actionable error messages keep the UX smooth.

---

## 🧰 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router, Route Handlers)
- **UI:** [React](https://react.dev/) 19 + [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) 4 + `tailwind-merge`
- **Icons:** [lucide-react](https://lucide.dev/)
- **AI runtime:** [Groq API](https://console.groq.com/) (`llama-3.1-8b-instant`)

---

## 🚀 Getting Started

Follow the steps below to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/en/) 18 or newer
- [pnpm](https://pnpm.io/) 9+ (or npm/yarn if you prefer)
- A Groq API key with access to `llama-3.1-8b-instant`

### Installation

```bash
git clone https://github.com/maker-shihab/ai-code-explainer.git
cd ai-code-explainer
pnpm install   # or npm install / yarn install
```

### Environment Variables

Create a `.env.local` file in the project root:

```bash
GROQ_API_KEY=your_groq_api_key
```

Optional integrations already scaffolded in `lib/` can use:

```bash
DEEPSEEK_API_KEY=optional_if_you_enable_deepseek
GOOGLE_GEMINI_API_KEY=optional_if_you_enable_gemini
HUGGING_FACE_API_KEY=optional_if_you_enable_huggingface
```

### Start the Dev Server

```bash
pnpm dev
# or: npm run dev / yarn dev
```

Then visit [http://localhost:3000](http://localhost:3000).

### Useful Scripts

- `pnpm build` – create a production build
- `pnpm start` – run the production server
- `pnpm lint` – check code quality with ESLint

---

## 🧑‍💻 How to Use It

1. Paste or type your code into the **Your Code** editor.
2. Adjust filters to match your learning needs (language, depth, style, target audience, examples).
3. Hit **Explain Code** and wait a moment while Groq generates the response.
4. Review the explanation in the **AI Explanation** panel and tweak settings if you’d like a different tone.

Tip: Use the Quick Start buttons to prefill common React/Python/JavaScript snippets for demos.

---

## 👨‍💻 About Shihab Labs

Crafted by [Shihab Labs](https://shihablabs.vercel.app/) — Founder & Full-Stack Developer at Shihablabs delivering fast, human-centered web tools.

- Python · Node.js · Express.js
- JavaScript · TypeScript
- React · Next.js
- Shopify · Liquid
- HTML5 · CSS3 · Git
- MongoDB · PostgreSQL

---

## 🏗️ Architecture Overview

- `app/page.tsx` – Client-side UI with state, validation, and user interactions.
- `components/filters/advanced-filters.tsx` – Reusable filter and preference controls.
- `app/api/explain/route.ts` – Next.js route handler that sanitizes input and proxies Groq.
- `lib/groq.ts` – GroqService wrapper that crafts bilingual prompts and calls the API.
- `types/index.ts` – Shared TypeScript contracts for requests/responses.
- `app/providers/theme-provider.tsx` & `components/ui/theme-toggle.tsx` – Theming logic with persisted preferences.

### API Contract

`POST /api/explain`

```bash
curl -X POST http://localhost:3000/api/explain \
  -H "Content-Type: application/json" \
  -d '{
        "code": "const greet = (name) => `Hello, ${name}!`;",
        "language": "english",
        "explanationStyle": "beginner",
        "includeExamples": true,
        "programmingLanguage": "auto",
        "explanationDepth": "basic",
        "targetAudience": "student"
      }'
```

---

## 🚢 Deployment

The project is optimized for [Vercel](https://vercel.com/) (default Next.js hosting), but any platform that supports Next.js 16 will work:

1. Set environment variables in your hosting dashboard (`GROQ_API_KEY` at minimum).
2. Run the production build: `pnpm build`.
3. Serve with `pnpm start` or let Vercel handle the build & deploy pipeline automatically.

---

## 📜 License

This project is licensed under the MIT License.
