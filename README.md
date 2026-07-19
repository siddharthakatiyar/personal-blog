# Siddhartha's Portfolio

Welcome to my personal portfolio and blog! This is a modern, interactive web application built to showcase my projects, professional experience, and technical writing. It features a unique, fully functional terminal interface that simulates a Unix-like filesystem.

[![Deployed on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsiddharthakatiyar%2Fportfolio)

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Content Management**: [Outstatic](https://outstatic.com/) (Git-based CMS)
- **Markdown & Code**: MDX, `rehype-pretty-code`, `shiki`
- **Animations**: Framer Motion

## Features

- 🖥️ **Interactive Terminal**: An interactive command-line interface that can navigate a virtual filesystem, read files, change themes, and run commands like `ls`, `cd`, `cat`, and `blog`.
- 📝 **Markdown Blog**: Full-featured blog with support for MDX, syntax highlighting, reading time, related posts, and copy-to-clipboard functionality.
- 🎨 **Theming**: Dark/Light mode support with a custom sound engine (which remembers your preferences).
- ⚙️ **CMS Integration**: Outstatic integration at `/outstatic` to manage blog content directly on the site.
- 🚀 **Performance**: Optimized for speed with Next.js Turbopack and Vercel Analytics.

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v20+ recommended).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/siddharthakatiyar/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Development Server

Start the development server using npm:

```bash
npm run dev
```

The server will start on port `8080` (as defined in `package.json`).
Open [http://localhost:8080](http://localhost:8080) in your browser to see the result.

## Project Structure

- `src/app`: Next.js App Router pages and API routes.
- `src/components`: React components (UI, Terminal, Header, etc.).
- `src/lib`: Utilities, Terminal data filesystem config, and sound engine.
- `outstatic`: Content managed by the Outstatic CMS (blog posts are in `outstatic/content/posts`).

## Usage

- **Navigating the Terminal:** Try running `help` to see the available commands. You can type `ls` to list directories, `cd projects` to navigate, and `cat jsmon.md` to read text files.
- **Toggle Sound:** You can enable or disable the retro terminal typing sounds using the volume icon in the terminal window's top right header.
- **Managing Blog Posts:** Navigate to `/outstatic` to access the CMS dashboard and create new MDX blog posts visually.
