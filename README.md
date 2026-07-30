# AI Chat

A chat application built with Next.js that talks to Google's Gemini API and persists conversations in Postgres via Prisma.

## Tech Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS 4**
- **Prisma 7** with the Postgres adapter (`@prisma/adapter-pg`)
- **Google Generative AI** (`@google/generative-ai`) for chat completions
- **PostgreSQL** hosted on [Neon](https://neon.tech)

## Project Structure

```
src/
  app/
    api/
      chat/                # POST endpoint: send a message, get an AI reply
      conversations/       # list conversations
      conversations/[id]/  # fetch/delete a single conversation
  components/
    features/chat/         # ChatContainer, MessageList, ChatInput, etc.
    layouts/                # AppShell, Sidebar
    ui/                     # Avatar, Button
  lib/
    gemini.ts               # Gemini client / reply generation
    prisma.ts               # Prisma client
    validation.ts            # request body validation
  services/
    chatService.ts          # chat data access helpers
  generated/prisma/          # generated Prisma client
prisma/
  schema.prisma              # Conversation model
```

## Data Model

- **Conversation** — `id`, `title`, `createdAt`, `updatedAt`, `messages` (JSON array of `{ role, content }`)

## Getting Started

### 1. Configure environment variables

Create a `.env` file with your [Neon](https://neon.tech) connection string:

```bash
DATABASE_URL="postgresql://<user>:<password>@<endpoint>.neon.tech/<database>?sslmode=require&channel_binding=require"
GEMINI_API_KEY="your-gemini-api-key"
```

### 2. Install dependencies & apply migrations

```bash
npm install
npx prisma migrate deploy
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the app.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## API

- `POST /api/chat` — send `{ messages, conversationId? }`, get back `{ reply, conversationId }`. Creates a new conversation if `conversationId` is omitted, saves both the user message and the AI reply.
- `GET /api/conversations` — list conversations.
- `GET/DELETE /api/conversations/[id]` — fetch or delete a single conversation.
