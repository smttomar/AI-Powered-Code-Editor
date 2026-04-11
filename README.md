# 🚀 AI Powered Code Editor

A modern **AI-powered code editor** built with Next.js that allows users to write, run, and enhance code directly in the browser with real-time AI assistance.

---

## ✨ Features

- 🧠 **AI Code Assistance**
    - Code completion
    - Bug fixing suggestions
    - Code explanations

- 💻 **In-Browser Code Editor**
    - Monaco Editor integration
    - Multi-file support
    - Syntax highlighting

- ⚡ **Live Code Execution**
    - Powered by WebContainers
    - Real-time preview & terminal

- 📁 **Template System**
    - React, Next.js, Express, Vue, Angular, Hono
    - Load starter projects instantly

- 🔐 **Authentication**
    - GitHub & Google login (NextAuth)

- 🎨 **Modern UI**
    - Dark/Light mode
    - Responsive design
    - Built with Tailwind CSS & shadcn/ui

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS
- **Editor:** Monaco Editor
- **AI Integration:** Groq(api)
- **Backend:** Next.js API Routes
- **Database:** Prisma + Mongodb
- **Auth:** NextAuth
- **Runtime:** WebContainer API
- **State Management:** Zustand

---

## 📁 Project Structure

```
app/            → Routes & pages
components/     → UI components
hooks/          → Custom hooks
lib/            → Utilities & configs
modules/        → Core features (editor, AI, etc.)
prisma/         → Database schema
public/         → Static assets & templates
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/smttomar/ai-powered-code-editor.git
cd ai-powered-code-editor
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create a `.env` file:

```env
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret

GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
```

---

### 4. Run development server

```bash
npm run dev
```

---

## 🚀 Deployment

Deployed on **Vercel**

> ⚠️ Templates are loaded dynamically to avoid build issues.

---

## 📚 Pages

- `/` → Landing Page
- `/dashboard` → User dashboard
- `/playground/[id]` → Code editor
- `/docs` → Documentation
- `/terms` → Terms of Service
- `/privacy` → Privacy Policy

---

## 🧠 How It Works

1. User selects a template
2. Template is converted into JSON structure
3. Loaded into WebContainer
4. Monaco Editor displays files
5. AI assists in real-time
6. AI chat assistance by ByteBuddy

---

## 🎯 Future Improvements

- ⚡ Faster template loading (caching)
- 🧠 Smarter AI context awareness
- 💾 Project saving & sharing
- 👥 Collaboration (real-time editing)

---

## 🤝 Contributing

Pull requests are welcome!
Feel free to open issues for suggestions or bugs.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Chandra Pratap Singh**

- GitHub: https://github.com/smttomar

---

⭐ If you like this project, give it a star!
