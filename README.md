# [Bloquinho.app](https://bloquinho.app) &middot; ![License: MIT](https://img.shields.io/badge/license-MIT-blue) ![PRs are welcome](https://img.shields.io/badge/PRs-welcome-brightgreen) &middot; ![Latest deploy](https://img.shields.io/github/checks-status/nidib/bloquinho/main) ![Latest release](https://img.shields.io/github/v/release/nidib/bloquinho?color=white)

A modern code snippet sharing platform that makes it easy to create, edit, and share code snippets with syntax highlighting.

## 🚀 Overview

Bloquinho is a web app that allows users to quickly create and share code snippets through simple, memorable URLs. Think of it as a lightweight code editor that's perfect for sharing code examples, debugging sessions, or quick code reviews.

### Key Features

- **Instant Creation**: Create a new snippet by simply entering a title and navigating to the URL
- **Code Editor**: Monaco Editor integration with syntax highlighting for multiple programming languages
- **Multiple Language Support**: Supports JavaScript, TypeScript, Python, Java, SQL, HTML, CSS, PHP, Go, Markdown, and plain text
- **Auto-save**: Changes are automatically saved as you type
- **Clean URLs**: Simple, shareable URLs like `bloquinho.com/my-snippet`

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with improved performance
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Monaco Editor** - VS Code's web editor for syntax highlighting
- **Radix UI** - Accessible UI components
- **React Hook Form** - Performant forms with validation
- **Zod** - TypeScript-first schema validation
- **TanStack Query** - Server state management
- **Sonner** - Toast notifications
- **Lucide React** - Beautiful icons

### Backend & Infrastructure
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Resend** - Email service

### Development Tools
- **Biome** - Fast formatter and linter
- **Docker Compose** - Local development environment
- **PostCSS** - CSS processing

## 🚀 Getting Started

### Prerequisites
- Node.js v22.11 or greater 
- Docker and Docker Compose
- MongoDB (or use Docker)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nidib/bloquinho.git
   cd bloquinho
   ```

2. **Install dependencies**
   ```bash
   cd app
   npm install
   ```

3. **Start the development environment**
   ```bash
   # Start MongoDB with Docker
   npm run infra:start
   
   # In another terminal, start the development server
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Environment Variables

Create a `.env.local` file in the `app` directory:

```env
# MongoDB
MONGODB_URI=mongodb://mongodb_username:mongodb_password@localhost:27017/main

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
RESEND_FEEDBACK_FROM=email@example.com
RESEND_FEEDBACK_TO=another_email@example.com
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run infra:start` - Start MongoDB with Docker
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run lint:fix` - Fix linting issues
- `npm run compile` - TypeScript compilation check

### Code Style

The project uses **Biome** for formatting and linting, configured in `biome.json`. Run `npm run lint:fix` to automatically format and fix issues.

## 🚀 Deployment

The application is designed to be deployed on platforms that support Next.js:


## 🤝 Contributing

1. Fork the repository
2. Create your branch following the pattern: {reason}/{package}/description
    - Eg: `feat/app/adding-a-cool-new-feature`
        - `feat` - for new features
        - `fix` - for bug fixes
        - `refactor` - for code refactoring
        - `docs` - for documentation changes
        - `test` - for test changes
        - `chore` - for other changes
3. Make your changes. Your commit message should follow the pattern: {reason}({package}): {description}
    - Eg: `feat(app): adding a cool new feature`
4. Run `npm run precommit` to check for errors
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Bloquinho** - Sharing your snippets easily ✨