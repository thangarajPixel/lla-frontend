# Light & Life Academy - Frontend

A modern, responsive frontend application for Light & Life Academy, a photography education institution. Built with Next.js 16, React 19, and TypeScript, featuring smooth animations, parallax effects, and a comprehensive course management system.

## 🎯 Project Overview

This is the frontend application for Light & Life Academy, showcasing their photography programs, campus facilities, faculty, and student life. The application features a modern UI with smooth scrolling, parallax effects, and responsive design optimized for all devices.

## ✨ Features

- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Smooth Scrolling**: Enhanced user experience with Lenis smooth scroll
- **Parallax Effects**: Engaging visual effects using GSAP and Motion
- **Dynamic Navigation**: Sticky header with dropdown menus
- **Multiple Pages**: Home, About Us, Courses, Campus, Faculty, Gallery, Admission, Blogs, Contact, FAQ, Life at LLA, and Privacy Policy pages
- **Admission Form System**: Multi-step admission form with file uploads, education details, portfolio, and preview
- **Interactive Components**: Custom widgets and UI components
- **Form Management**: React Hook Form with Zod validation for type-safe forms
- **Modern Animations**: Framer Motion and GSAP for smooth transitions
- **Type-Safe**: Full TypeScript implementation
- **Content Management**: Dynamic content rendering with HTML widgets and sanitization

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
│   │   ├── [page]/        # Dynamic page routes
│   │   ├── admission/     # Admission form pages
│   │   │   ├── [id]/      # Admission form steps
│   │   │   └── layout.tsx
│   │   ├── api/           # API routes
│   │   ├── campus/        # Campus page
│   │   ├── courses/       # Courses pages
│   │   │   ├── [slug]/    # Individual course pages
│   │   │   └── layout.tsx
│   │   ├── faculty/       # Faculty page
│   │   ├── gallery/       # Gallery page
│   │   ├── more/          # Additional pages
│   │   │   ├── about-us/  # About Us page
│   │   │   ├── blogs/     # Blogs page
│   │   │   ├── contact-us/# Contact page
│   │   │   ├── faq/       # FAQ page
│   │   │   ├── life-at-lla/# Life at LLA pages
│   │   │   └── privacy-policy/# Privacy Policy page
│   │   ├── favicon.ico
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout component
│   │   ├── not-found.tsx  # 404 page
│   │   ├── page.tsx       # Home page
│   │   └── robots.ts      # Robots.txt
│   │
│   ├── assets/            # Project assets
│   │   ├── icons/         # Icon assets (SVG)
│   │   └── images/        # Image assets (logos, etc.)
│   │
│   ├── components/        # React components
│   │   ├── form/          # Form components
│   │   │   ├── FormCheckBox.tsx
│   │   │   ├── FormFileUploadButton.tsx
│   │   │   ├── FormInput.tsx
│   │   │   ├── FormInputDatePicker.tsx
│   │   │   ├── FormInputDateRangePicker.tsx
│   │   │   ├── FormRadioGroup.tsx
│   │   │   ├── FormSelectBox.tsx
│   │   │   └── index.ts
│   │   ├── layouts/       # Layout components
│   │   │   ├── utils/     # Layout utilities
│   │   │   │   ├── AdmissionButton.tsx
│   │   │   │   ├── AdmissionRequestButton.tsx
│   │   │   │   ├── DropdownMenu.tsx
│   │   │   │   ├── MainContent.tsx
│   │   │   │   ├── MobileMenu.tsx
│   │   │   │   ├── NavLink.tsx
│   │   │   │   └── types.ts
│   │   │   ├── WebFooter.tsx
│   │   │   └── WebHeader.tsx
│   │   ├── sections/      # Page section components
│   │   │   ├── admission-form/# Admission form sections
│   │   │   │   ├── _components/# Form components
│   │   │   │   ├── _steps/    # Form steps
│   │   │   │   └── _types/    # Type definitions
│   │   │   ├── campus/    # Campus sections
│   │   │   ├── courses/   # Course sections
│   │   │   │   └── utils/ # Course utilities
│   │   │   ├── faculty/   # Faculty sections
│   │   │   │   └── utils/ # Faculty utilities
│   │   │   ├── gallery/   # Gallery sections
│   │   │   ├── home/      # Home page sections
│   │   │   │   ├── AboutSection.tsx
│   │   │   │   ├── CampusSection.tsx
│   │   │   │   ├── CourseSection.tsx
│   │   │   │   ├── FacultySection.tsx
│   │   │   │   ├── GallerySection.tsx
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── LifeSection.tsx
│   │   │   │   ├── SponsorsSection.tsx
│   │   │   │   ├── StudentSection.tsx
│   │   │   │   ├── TestimonialSection.tsx
│   │   │   │   └── utils/
│   │   │   └── more/      # Additional page sections
│   │   │       ├── about-us/
│   │   │       ├── blogs/
│   │   │       ├── contact/
│   │   │       ├── faq/
│   │   │       ├── life-at-lla/
│   │   │       └── privacy-policy/
│   │   ├── ui/            # Base UI components
│   │   │   ├── accordion.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── ripple-button.tsx
│   │   │   ├── select.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── toast.tsx
│   │   └── widgets/       # Widget components
│   │       ├── AccordionWidget.tsx
│   │       ├── BackdropWidget.tsx
│   │       ├── ButtonWidget.tsx
│   │       ├── ContainerWidget.tsx
│   │       ├── DialogWidget.tsx
│   │       ├── HTMLWidget.tsx
│   │       ├── ImageWidget.tsx
│   │       ├── LinkWidget.tsx
│   │       ├── OrangeBorderButtonWidget.tsx
│   │       ├── OrangeButtonWidget.tsx
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
## 🛠️ Tech Stack

### Core
- **Framework**: [Next.js 16.0.10](https://nextjs.org/) - React framework with App Router
- **React**: 19.2.3 - UI library
- **TypeScript**: 5.x - Type safety

### Styling
- **Tailwind CSS**: 4.x - Utility-first CSS framework
- **PostCSS**: CSS processing
- **Custom Fonts**: Mulish and Urbanist from Google Fonts

### UI Components
- **Radix UI**: Accessible component primitives
  - `@radix-ui/react-accordion`
  - `@radix-ui/react-checkbox`
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-icons`
  - `@radix-ui/react-label`
  - `@radix-ui/react-popover`
  - `@radix-ui/react-radio-group`
  - `@radix-ui/react-select`
  - `@radix-ui/react-slot`
  - `@radix-ui/react-toast`
- **shadcn/ui**: Pre-built component library
- **Lucide React**: 0.561.0 - Icon library

### Animation & Effects
- **Motion**: 12.23.26 (Framer Motion) - Animation library
- **GSAP**: 3.14.2 - Advanced animation library with ScrollTrigger plugin
- **Lenis**: 1.3.16 - Smooth scrolling library
- **Embla Carousel**: 8.6.0 - Carousel/slider component with autoplay support
- **React Responsive Masonry**: 2.7.1 - Responsive masonry grid layout
- **Yet Another React Lightbox**: 3.27.0 - Lightbox component for images

### Data & State Management
- **TanStack Query**: 5.90.12 - Data fetching and caching
- **Axios**: 1.13.2 - HTTP client
- **React Hook Form**: 7.68.0 - Form management
- **Zod**: 4.2.1 - Schema validation
- **Hookform Resolvers**: 5.2.2 - React Hook Form validation resolvers
- **Zustand**: 5.0.9 - Lightweight state management

### Development Tools
- **Biome**: 2.3.9 - Fast linter and formatter
- **Babel React Compiler**: 1.0.0 - React compiler plugin
- **TypeScript**: Type checking

### Utilities
- **class-variance-authority**: 0.7.1 - Component variant management
- **clsx**: 2.1.1 - Conditional className utility
- **tailwind-merge**: 3.4.0 - Merge Tailwind classes intelligently
- **tw-animate-css**: 1.4.0 - Tailwind animation utilities
- **date-fns**: 4.1.0 - Date utility library
- **sanitize-html**: 2.17.0 - HTML sanitization for safe content rendering
- **sonner**: 2.0.7 - Toast notification library
- **react-day-picker**: 9.12.0 - Date picker component

## 🎨 Key Features Implementation

### Widget Components

#### ParallaxWidget
- GSAP ScrollTrigger-based parallax effects
- Configurable speed, start/end points, and scrub options
- Automatic refresh on window resize for responsive behavior
- Smooth parallax scrolling for images and content

#### ScrollWidget
- Multiple animation types: fadeIn, fadeUp, fadeDown, slideLeft, slideRight, scale, rotate
- Customizable delay, duration, and easing functions
- Scroll-triggered animations with once or repeat options
- Configurable start/end trigger points
- Automatic cleanup and refresh handling

### Navigation
- Sticky header that changes appearance on scroll
- Dropdown menus for Courses and Campus sections
- Mobile-responsive hamburger menu
- Active route highlighting

### Animations
- Smooth scroll implementation using Lenis
- Parallax effects for visual depth using GSAP ScrollTrigger
- Scroll-triggered animations with multiple animation types
- Page transition effects
- Responsive animation handling (auto-refresh on resize)
- Embla Carousel for interactive carousels with autoplay

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
