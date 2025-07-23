# 🚀 **24Hour-AI**

Welcome to **24Hour-AI**, a robust, scalable SaaS platform that provides users subscription-based access to powerful AI models. Built with simplicity, modularity, and security in mind, 24Hour-AI ensures seamless user experience and straightforward developer maintenance.

---

## 📌 **Overview**

**24Hour-AI** offers tiered, affordable access to cutting-edge AI models like GPT-4, Anthropic Claude, Google Gemini, Mistral, and Deepseek, available in subscription intervals of 24 hours, one week, or monthly.

---

## 🛠️ **Tech Stack**

| Component                  | Technology                              |
| -------------------------- | --------------------------------------- |
| **Frontend**               | Next.js 15, React, ShadCN UI            |
| **Backend/API Layer**      | Next.js API Routes, Node.js             |
| **Authentication**         | Supabase Auth                           |
| **Database**               | Supabase PostgreSQL                     |
| **Embedding Vector Store** | Supabase pgvector                       |
| **Payments**               | Square API                              |
| **AI Integration**         | OpenAI, Anthropic, Google, Mistral APIs |
| **Deployment**             | Vercel / Google Cloud                   |
| **Dev Tools**              | Ngrok (development only)                |

---

## 🔑 **Core Features**

* **User Authentication** (Email/Password, OAuth with Supabase)
* **Secure, personalized AI chat sessions**
* **Embedding and semantic search (pgvector)**
* **Tiered subscription payments (Square)**
* **Scalable and serverless deployment (Vercel)**
* **Real-time data protection via Supabase RLS**

---

## 🚦 **Current Project Status**

The following section is exclusively maintained by an LLM. **Note to LLM: You are ONLY permitted to edit the following section. All other areas of this README must remain untouched.**

<!-- LLM-EDIT-START -->

### 🧠 **LLM-Managed Production TODO**

> The checklist below is the single source of truth for the engineering roadmap.  
> *Mark tasks complete by replacing `[ ]` with `[x]`.*

#### Authentication
- [ ] Add email verification & magic-link fallback
- [ ] Enable OAuth providers (GitHub, Google)
- [ ] Implement refresh-token rotation + silent renew
- [ ] Harden RLS for `auth.users` & related tables
- [ ] Add rate-limiting & captcha on auth routes

#### Database
- [ ] Finalise schema: `payments`, `chat_history`, `organizations`
- [ ] Write exhaustive RLS policies for every table
- [ ] Add `updated_at` trigger + soft-delete pattern
- [ ] Provide seed script for local dev (`supabase seed`)

#### Vector Store
- [ ] Store embeddings in `pgvector` with IVFFLAT index (200 lists)
- [ ] Create Supabase Edge Function for semantic search
- [ ] Schedule nightly vacuum / analyse for performance

#### Payments
- [ ] Complete Square API integration (checkout, webhooks, refunds)
- [ ] Implement subscription tiers table & periodic sync job
- [ ] Evaluate Stripe as fallback provider

#### AI Integration Layer
- [ ] Wrap OpenAI, Anthropic, Google, Mistral & DeepSeek in unified service
- [ ] Add Redis cache layer with TTL & invalidation
- [ ] Implement rate-limit & circuit-breaker middleware
- [ ] Unit tests with mocked provider responses

#### Frontend
- [ ] Finish Dashboard UI (chat, settings, billing)
- [ ] Add global error boundary & toast notifications
- [ ] Integrate TanStack Query for data fetching
- [ ] Lighthouse score ≥ 90 (mobile & desktop)

#### DevOps & Deployment
- [ ] CI (GitHub Actions): lint, test, type-check
- [ ] Preview deployments per PR (Vercel)
- [ ] Configure prod secrets in Vercel dashboard
- [ ] Automate database migrations via `supabase migrations deploy`

#### QA & Observability
- [ ] Playwright e2e tests: auth, payment, chat flows
- [ ] Sentry + Logflare aggregation
- [ ] Healthcheck endpoint & UptimeRobot monitor

#### Documentation
- [ ] Auto-generate API reference with `typedoc`
- [ ] Expand README (local dev, staging, prod)
- [ ] Publish public changelog page

### 🧠 **LLM-Managed Development Notes**

 >Below this line is where the LLM will write notes about the development process. 
 > An llm does not modify this section, but would rather add more notes to this section regarding the development process. 
 > This is considered an LLM scrap paper. 
 > Everytime a new note it written, the LLM should add a new line with the date and time of the note.

<!-- LLM-EDIT-END -->

---

## 🖥️ **Local Development Setup**

Clone repo:

```bash
git clone https://github.com/ruizTechServices/24Hour-AI.git # rewrite this to point to the correct repo
cd 24Hour-AI
npm install
```

Environment variables (`.env.local`):

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SQUARE_API_KEY=your_square_api_key
```

Run development server:

```bash
npm run dev
```

---

## 🚨 **Contributing Guidelines**

* Fork and clone the repository
* Create a new branch: `git checkout -b your-feature`
* Commit your changes clearly: `git commit -m \"Your feature or fix\"`
* Push changes: `git push origin your-feature`
* Submit a pull request clearly outlining your changes

---

## ⚖️ **License**

© 2025 Ruiz Tech Services, LLC. All rights reserved.

---

🚀 **Thank you for contributing to the `24Hour-AI` universe!**
