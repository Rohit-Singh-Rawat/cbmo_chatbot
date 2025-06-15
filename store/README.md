# Thread-Based Chat Architecture

This directory contains the new thread management system with optimistic updates and proper separation of concerns.

## Structure

```
store/
├── thread-context/         # Current thread context
│   ├── threadContext.tsx   # Core thread context
│   └── threadProvider.tsx  # Route-aware provider
├── chat-store/            # All chat data management
│   └── chatStore.ts
└── message-store/         # Current view messages
    └── messageStore.ts
```

## Data Flow

1. **Thread Context** - Manages which thread is currently active (syncs with route)
2. **Chat Store** - Handles all chat data (caching, DB operations)
3. **Message Store** - Current view's messages with optimistic updates
4. **Integration Hook** - Coordinates between all stores

## Usage

```tsx
// Auto-sync with route (recommended)
<RouteAwareThreadProvider>
	<YourChatComponent />
</RouteAwareThreadProvider>

// Manual thread ID
<ThreadProvider initialThreadId={threadId}>
	<YourChatComponent />
</ThreadProvider>

// Inside your component
const { messages, sendMessage, isLoading } = useChatIntegration();
```

## Route Integration

The system automatically detects thread ID from:

- `/[threadId]` - Existing thread
- `/` or `/new` - New thread

## Key Features

- **Optimistic Updates**: Immediate UI response with temp IDs
- **Smart Caching**: Chat store caches loaded chats
- **Route Sync**: Automatically syncs with URL parameters
- **Clean Separation**: Each store has a specific responsibility
- **Type Safety**: Full TypeScript support
- **Error Handling**: Graceful error handling with rollback
