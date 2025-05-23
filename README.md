# AI Chat Assistant

An intelligent chatbot powered by Google Gemini AI, built with Next.js, React, and Zustand. This assistant provides real-time, streaming AI responses in a modern, responsive chat interface.

## 🚀 Features

- **AI-Powered Chat**: Uses Google Gemini (via `@google/genai`) for intelligent, context-aware responses
- **Streaming Responses**: Messages from the AI stream in real-time for a natural chat experience
- **Persistent Chat History**: Your chat history is saved locally using Zustand with persistence
- **Modern UI/UX**: Built with Tailwind CSS, Radix UI, and custom components for a sleek, accessible interface
- **Theme Support**: Toggle between light and dark mode
- **Chat Management**: Easily clear your chat history with a confirmation dialog
- **Notifications**: Toast notifications for actions like chat deletion
- **Responsive Design**: Works great on desktop and mobile

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun
- A Google Gemini API key (get it from [Google AI Studio](https://makersuite.google.com/app/apikey))

## 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Rohit-Singh-Rawat/cbmo_chatbot
   cd cbmo_chatbot
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and replace `your_gemini_api_key_here` with your actual Google Gemini API key:
     ```
     GOOGLE_API_KEY=your_actual_gemini_api_key
     ```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
# or
yarn build
yarn start
# or
pnpm build
pnpm start
# or
bun build
bun start
```

## 📁 Project Structure

```
cbmo_chatbot/
├── app/                    # Next.js app directory
│   ├── (chat)/            # Chat page components
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # UI components (buttons, dialogs, etc.)
│   ├── shared/           # Shared components (topbar, theme toggle)
│   └── provider/         # Context providers
├── lib/                  # Utilities and hooks
│   └── hook/            # Custom React hooks
├── store/               # Zustand store
├── public/              # Static assets
└── package.json         # Project dependencies
```

## 🔧 Configuration

### AI Model Configuration

The AI model settings can be modified in `app/api/chat/route.ts`:

```typescript
const model = await ai.models.generateContentStream({
	model: 'gemini-2.0-flash',
	config: {
		temperature: 0.7,
		topK: 40,
		topP: 0.95,
		maxOutputTokens: 1024,
	},
	// ...
});
```

### Theme Configuration

Theme settings are managed in `app/globals.css` and can be customized by modifying the CSS variables in the `:root` and `.dark` selectors.

## 🧩 Customization

### Adding New Components

1. Create your component in the `components` directory
2. Import and use it in your pages or other components
3. Style using Tailwind CSS classes

### Modifying the Chat Interface

- Chat input: `components/ChatInput.tsx`
- Chat messages: `components/Chats.tsx`
- Chat message component: `components/ChatMessage.tsx`

### State Management

The chat state is managed using Zustand in `store/chatstore.ts`. You can modify the store to add new features or change existing behavior.

## 🚀 Deployment

### Deploying to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these environment variables in your production environment:

- `GOOGLE_API_KEY`: Your Google Gemini API key

## 🐛 Troubleshooting

### Common Issues

1. **API Key Not Working**

   - Ensure your API key is correctly set in `.env`
   - Check if the API key has the necessary permissions
   - Verify the API key is active in Google AI Studio

2. **Build Errors**

   - Clear the `.next` directory: `rm -rf .next`
   - Reinstall dependencies: `npm install`
   - Rebuild: `npm run build`

3. **Runtime Errors**
   - Check the browser console for error messages
   - Verify all environment variables are set correctly
   - Ensure all dependencies are installed

## 📦 Dependencies

- **Framework**: Next.js 15.1.8
- **UI**: React 19.0.0, Tailwind CSS 4.1.7
- **State Management**: Zustand 5.0.5
- **AI**: @google/genai 1.0.1
- **UI Components**: Radix UI, Sonner
- **Icons**: @tabler/icons-react
- **Animation**: motion 12.12.1

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Google Gemini AI](https://ai.google.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
