# Light & Life Academy - Frontend

A modern, responsive frontend application for Light & Life Academy, a photography education institution. Built with Next.js 16, React 19, and TypeScript, featuring smooth animations, parallax effects, and a comprehensive course management system.

## 🎯 Project Overview

This is the frontend application for Light & Life Academy, showcasing their photography programs, campus facilities, faculty, and student life. The application features a modern UI with smooth scrolling, parallax effects, and responsive design optimized for all devices.

## ✨ Features

- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Smooth Scrolling**: Enhanced user experience with Lenis smooth scroll
- **Parallax Effects**: Engaging visual effects using GSAP and Motion
- **Dynamic Navigation**: Sticky header with dropdown menus
- **Multiple Pages**: Home, About Us, Courses, Campus, and Faculty pages
- **Interactive Components**: Custom widgets and UI components
- **Modern Animations**: Framer Motion and GSAP for smooth transitions
- **Type-Safe**: Full TypeScript implementation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

First, install dependencies:

```bash
pnpm install
```

### Development

Run the development server:

```bash
pnpm dev
```

The application will be available at [http://localhost:3030](http://localhost:3030).

### Production Build

Build the application for production:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## 📜 Available Scripts

- `pnpm dev` - Start development server on port 3030
- `pnpm build` - Build the application for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome linter
- `pnpm lint:fix` - Run Biome linter and fix issues automatically
- `pnpm format` - Format code with Biome
- `pnpm upgrade` - Upgrade dependencies to latest versions

## 🏗️ Project Structure

```
lla-frontend/
├── public/                 # Static assets
│   ├── dummy.mp4          # Video assets
│   └── next.svg           # SVG assets
│
├── src/
│   ├── app/               # Next.js App Router directory
│   │   ├── about-us/      # About Us page
│   │   ├── campus/        # Campus page
│   │   ├── courses/       # Courses page
│   │   ├── faculty/       # Faculty page
│   │   ├── favicon.ico
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout component
│   │   └── page.tsx       # Home page
│   │
│   ├── assets/            # Project assets
│   │   ├── icons/         # Icon assets (SVG)
│   │   └── images/        # Image assets (logos, etc.)
│   │
│   ├── components/        # React components
│   │   ├── layouts/       # Layout components
│   │   │   ├── utils/     # Layout utilities
│   │   │   │   ├── DropdownMenu.tsx
│   │   │   │   ├── MobileMenu.tsx
│   │   │   │   ├── NavLink.tsx
│   │   │   │   └── types.ts
│   │   │   ├── WebFooter.tsx
│   │   │   └── WebHeader.tsx
│   │   ├── sections/      # Page section components
│   │   │   ├── about-us/  # About Us sections
│   │   │   └── home/      # Home page sections
│   │   │       ├── AboutSection.tsx
│   │   │       ├── CampusSection.tsx
│   │   │       ├── CourseSection.tsx
│   │   │       ├── FacultySection.tsx
│   │   │       ├── GallertSection.tsx
│   │   │       ├── HeroSection.tsx
│   │   │       ├── LifeSection.tsx
│   │   │       ├── SponsorsSection.tsx
│   │   │       ├── StudentSection.tsx
│   │   │       └── TestimonialSection.tsx
│   │   ├── ui/            # Base UI components
│   │   │   ├── button.tsx
│   │   │   ├── ripple-button.tsx
│   │   │   └── sheet.tsx
│   │   └── widgets/       # Widget components
│   │       ├── ButtonWidget.tsx
│   │       ├── ContainerWidget.tsx
│   │       ├── ImageWidget.tsx
│   │       ├── LinkWidget.tsx
│   │       ├── ParallaxWidget.tsx
│   │       ├── ScrollWidget.tsx
│   │       ├── SmoothScrollWidget.tsx
│   │       └── utils/
│   │           └── widget.ts
│   │
│   ├── helpers/           # Helper utilities
│   │   ├── AxiosHelper.ts      # HTTP client configuration
│   │   ├── ConstantHelper.ts   # Application constants
│   │   └── ImageHelper.ts      # Image utility functions
│   │
│   ├── lib/               # Library utilities
│   │   └── utils.ts      # General utility functions (cn, etc.)
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

## 📁 Folder Descriptions

### `/src/app`
Next.js App Router directory containing pages, layouts, and routing configuration. Includes pages for:
- Home (`/`)
- About Us (`/about-us`)
- Courses (`/courses`)
- Campus (`/campus`)
- Faculty (`/faculty`)

### `/src/assets`
Static assets including icons and images used throughout the application:
- **icons/**: SVG icon files
- **images/**: Logo files and other image assets

### `/src/components`
Reusable React components organized by purpose:

- **layouts/**: Layout components including header and footer with navigation
  - **utils/**: Navigation utilities (dropdown menus, mobile menu, nav links)
- **sections/**: Page section components organized by page
  - **home/**: Home page sections (Hero, Courses, Campus, Faculty, etc.)
  - **about-us/**: About Us page sections
- **ui/**: Base UI components built with shadcn/ui and Radix UI
- **widgets/**: Reusable widget components for common functionality
  - Button, Container, Image, Link widgets
  - Parallax, Scroll, and SmoothScroll widgets for animations

### `/src/helpers`
Helper modules for common functionality:
- **AxiosHelper.ts**: HTTP client configuration and utilities
- **ConstantHelper.ts**: Application constants and configuration values
- **ImageHelper.ts**: Image processing and optimization utilities

### `/src/lib`
Library utilities and shared functions, including utility functions like `cn()` for className merging.

### `/src/types`
TypeScript type definitions and interfaces for type safety across the application.

## 🛠️ Tech Stack

### Core
- **Framework**: [Next.js 16.0.3](https://nextjs.org/) - React framework with App Router
- **React**: 19.2.0 - UI library
- **TypeScript**: 5.x - Type safety

### Styling
- **Tailwind CSS**: 4.x - Utility-first CSS framework
- **PostCSS**: CSS processing
- **Custom Fonts**: Mulish and Urbanist from Google Fonts

### UI Components
- **Radix UI**: Accessible component primitives
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-slot`
- **shadcn/ui**: Pre-built component library
- **Lucide React**: Icon library

### Animation & Effects
- **Motion**: 12.23.24 (Framer Motion) - Animation library
- **GSAP**: 3.13.0 - Advanced animation library
- **Lenis**: 1.3.15 - Smooth scrolling library

### Data & State Management
- **TanStack Query**: 5.90.9 - Data fetching and caching
- **Axios**: 1.13.2 - HTTP client
- **React Hook Form**: 7.66.0 - Form management
- **Zod**: 4.1.12 - Schema validation

### Development Tools
- **Biome**: 2.3.5 - Fast linter and formatter
- **Babel React Compiler**: 1.0.0 - React compiler plugin
- **TypeScript**: Type checking

### Utilities
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className utility
- **tailwind-merge**: Merge Tailwind classes intelligently
- **tw-animate-css**: Tailwind animation utilities

## 🎨 Key Features Implementation

### Navigation
- Sticky header that changes appearance on scroll
- Dropdown menus for Courses and Campus sections
- Mobile-responsive hamburger menu
- Active route highlighting

### Animations
- Smooth scroll implementation using Lenis
- Parallax effects for visual depth
- Scroll-triggered animations
- Page transition effects

### Components
- Reusable widget system for consistent UI patterns
- Custom button components with ripple effects
- Responsive image handling
- Container components for consistent spacing

## 🔧 Configuration

### Environment Variables
The application uses environment variables configured in `next.config.ts`:
- `NEXT_APP_BASE_URL`: Base URL for API calls

### Next.js Configuration
- React Compiler enabled for optimized rendering
- Dynamic rendering mode
- Custom font optimization

## 📝 Code Quality

The project uses Biome for linting and formatting:
- Consistent code style
- Automatic formatting
- Linting rules enforcement

Run linting:
```bash
pnpm lint
```

Auto-fix issues:
```bash
pnpm lint:fix
```

Format code:
```bash
pnpm format
```

## 🤝 Contributing

1. Install dependencies: `pnpm install`
2. Create a feature branch
3. Make your changes
4. Run linting: `pnpm lint:fix`
5. Test your changes
6. Submit a pull request

## 📄 License

This project is private and proprietary.

---

Built with ❤️ for Light & Life Academy
