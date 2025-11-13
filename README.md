# Next.js 16 Boilerplate

A production-ready Next.js boilerplate with React Query, Biome, Husky, and Tailwind CSS.

## Features

- **Next.js 16** with App Router
- **React Query (TanStack Query)** for data fetching and caching
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Biome** for linting and formatting
- **Husky** for git hooks
- **Lint-staged** for pre-commit checks
- **Sample API routes** with GET, POST, PUT, DELETE operations
- **Custom hooks** for data fetching

## Getting Started

### Installation

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

\`\`\`bash
npm run build
npm start
\`\`\`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run lint:fix` - Fix linting issues with Biome
- `npm run check` - Run Biome check (lint + format)
- `npm run check:fix` - Fix all issues with Biome
- `npm run format` - Format code with Biome
- `npm run type-check` - Check TypeScript types

## Project Structure

\`\`\`
├── app/
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   ├── globals.css       # Global styles
│   └── providers.tsx     # React Query provider
├── components/           # React components
├── lib/
│   ├── api-client.ts     # Axios API client
│   ├── query-client.ts   # React Query setup
│   └── hooks/            # Custom hooks
├── .husky/               # Husky git hooks
├── biome.json            # Biome config (linting & formatting)
├── next.config.mjs       # Next.js config
├── tsconfig.json         # TypeScript config
└── package.json          # Dependencies
\`\`\`

## API Endpoints

The boilerplate includes sample API routes:

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/[id]` - Get a specific post
- `PUT /api/posts/[id]` - Update a post
- `DELETE /api/posts/[id]` - Delete a post

## React Query Hooks

Custom hooks for data fetching:

- `usePosts()` - Fetch all posts
- `usePost(id)` - Fetch a specific post
- `useCreatePost()` - Create a new post
- `useUpdatePost()` - Update a post
- `useDeletePost()` - Delete a post

## Configuration

### Environment Variables

Create a `.env.local` file:

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:3000/api
\`\`\`

### Biome

Biome is configured for linting and formatting. It replaces both ESLint and Prettier. Modify `biome.json` to customize rules and formatting options.

### Husky

Husky runs lint-staged before commits. Modify `.lintstagedrc.json` to customize.

## License

MIT
