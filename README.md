## Project Structure

```
lla-frontend/
├── public/                 # Static assets (images, icons, etc.)
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── src/
│   ├── app/               # Next.js App Router directory
│   │   ├── favicon.ico
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout component
│   │   └── page.tsx       # Home page
│   │
│   ├── assets/            # Project assets
│   │   ├── fonts/         # Custom font files
│   │   ├── icons/         # Icon assets
│   │   └── images/        # Image assets
│   │
│   ├── components/       # React components
│   │   ├── custom-hooks/  # Custom React hooks
│   │   ├── form/          # Form-related components
│   │   ├── layouts/       # Layout components
│   │   │   ├── WebFooter.tsx
│   │   │   └── WebHeader.tsx
│   │   ├── sections/      # Section components
│   │   ├── ui/            # UI components (shadcn/ui style)
│   │   │   ├── button.tsx
│   │   │   └── ripple-button.tsx
│   │   └── widgets/       # Widget components
│   │       ├── ButtonWidget.tsx
│   │       ├── ImageWidget.tsx
│   │       ├── LinkWidget.tsx
│   │       └── utils/
│   │           └── widget.ts
│   │
│   ├── helpers/           # Helper utilities
│   │   ├── AxiosHelper.ts      # HTTP client helper
│   │   ├── ConstantHelper.ts   # Constants management
│   │   └── ImageHelper.ts      # Image utility functions
│   │
│   ├── lib/               # Library utilities
│   │   └── utils.ts      # General utility functions
│   │
│   ├── store/             # State management
│   │   ├── hooks/        # Store hooks
│   │   └── services/     # API services
│   │
│   └── types/             # TypeScript type definitions
│
├── biome.json            # Biome linter/formatter configuration
├── components.json        # shadcn/ui components configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies
├── postcss.config.mjs    # PostCSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Folder Descriptions

### `/src/app`
Next.js App Router directory containing pages, layouts, and routing configuration.

### `/src/assets`
Static assets including fonts, icons, and images used throughout the application.

### `/src/components`
Reusable React components organized by purpose:
- **custom-hooks/**: Custom React hooks for shared logic
- **form/**: Form-related components and inputs
- **layouts/**: Layout components (header, footer, etc.)
- **sections/**: Page section components
- **ui/**: Base UI components (button, ripple-button, etc.)
- **widgets/**: Widget components with utility functions

### `/src/helpers`
Helper modules for common functionality:
- **AxiosHelper.ts**: HTTP client configuration and utilities
- **ConstantHelper.ts**: Application constants and configuration
- **ImageHelper.ts**: Image processing and optimization utilities

### `/src/lib`
Library utilities and shared functions.

### `/src/store`
State management directory:
- **hooks/**: Custom hooks for state management
- **services/**: API service functions

### `/src/types`
TypeScript type definitions and interfaces.

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

The application will be available at [http://localhost:3030](http://localhost:3030).

## Available Scripts

- `pnpm dev` - Start development server on port 3030
- `pnpm build` - Build the application for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome linter
- `pnpm lint:fix` - Run Biome linter and fix issues
- `pnpm format` - Format code with Biome
- `pnpm upgrade` - Upgrade dependencies

## Tech Stack

- **Framework**: Next.js 16.0.3
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4
- **Linting/Formatting**: Biome
- **UI Components**: Radix UI, shadcn/ui
- **Animation**: Motion (Framer Motion)
- **State Management**: Custom store implementation