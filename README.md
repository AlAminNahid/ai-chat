# AI Chat

A chat application built with Next.js that talks to Google's Gemini API and persists conversations in Postgres via Prisma.

## Tech Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS 4**
- **Prisma 7** with the Postgres adapter (`@prisma/adapter-pg`)
- **Google Generative AI** (`@google/generative-ai`) for chat completions
- **PostgreSQL** (via Docker Compose)

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
  schema.prisma              # Conversation / Message models
docker-compose.yml            # local Postgres instance
```

## Data Model

- **Conversation** — `id`, `title`, `createdAt`, `updatedAt`, has many `messages`
- **Message** — `id`, `conversationId`, `role`, `content`, `createdAt`

## Getting Started

### 1. Start Postgres

```bash
docker-compose up -d
```

This runs Postgres 16 on `localhost:5433` with database `ai_chat`.

### 2. Configure environment variables

Create a `.env` file with:

```bash
DATABASE_URL="postgresql://admin:root@localhost:5433/ai_chat"
GEMINI_API_KEY="your-gemini-api-key"
```

### 3. Install dependencies & set up the database

```bash
npm install
npx prisma migrate dev
```

### 4. Run the dev server

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
