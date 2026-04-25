# Next.js 16 Frontend Architecture

This is a modern, scalable frontend-only Next.js 16 application using the App Router.

## Directory Structure

```
src/
├── app/                    # App Router pages and layouts
│   ├── (auth)/            # Route group for auth pages
│   ├── dashboard/         # Dashboard pages
│   ├── _components/       # Shared components for app routes
│   ├── _lib/              # Shared utilities for app routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
│
├── components/            # Reusable UI components
│   ├── ui/                # Base UI components (Button, Input, etc.)
│   ├── layout/            # Layout components (Header, Sidebar, etc.)
│   └── forms/             # Form components
│
├── lib/                   # Utility libraries
│   ├── db/                # API client utilities
│   ├── validation/        # Form validation helpers
│   └── auth/              # Authentication utilities
│
├── hooks/                 # Custom React hooks
│   └── index.ts           # useAsync, useFetch, etc.
│
├── utils/                 # General utility functions
│   └── index.ts           # formatDate, cn, etc.
│
├── constants/             # Application constants
│   └── index.ts           # Routes, API endpoints, etc.
│
├── types/                 # TypeScript type definitions
│   └── index.ts           # Global types and interfaces
│
└── styles/                # Global styles
    └── globals.css        # Global CSS
```

## Key Patterns

### 1. Server Components by Default
All components in `/app` are Server Components by default. Use `'use client'` only when you need:
- Browser APIs (localStorage, window, etc.)
- Event listeners (onClick, onChange, etc.)
- React hooks (useState, useEffect, etc.)

### 2. Route Groups
Use parentheses to organize routes without affecting URLs:
```
app/(auth)/login/page.tsx    → /login
app/(auth)/signup/page.tsx   → /signup
app/dashboard/page.tsx       → /dashboard
```

### 3. Colocated Components
Keep route-specific components and utilities close to their routes:
```
app/dashboard/_components/   # Components used only in dashboard
app/dashboard/_lib/          # Utilities used only in dashboard
```

### 4. API Client
Use the `apiClient` utility in `src/lib/db/index.ts` to make requests:
```typescript
import { apiClient } from '@/lib/db';

const data = await apiClient.get('/api/users');
const result = await apiClient.post('/api/posts', { title: 'New Post' });
```

### 5. Custom Hooks
Place reusable hooks in `src/hooks/`:
```typescript
import { useAsync } from '@/hooks';

const { data, status, error } = useAsync(() => fetchUsers());
```

### 6. Type Safety
Define all types in `src/types/index.ts` and import them across the app:
```typescript
import type { User, Post } from '@/types';
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   npm start
   ```

## Best Practices

- ✅ Keep components small and focused
- ✅ Use TypeScript for type safety
- ✅ Colocate related files (components, styles, tests)
- ✅ Use route groups for URL organization
- ✅ Leverage Server Components for data fetching
- ✅ Use `'use client'` sparingly
- ✅ Centralize API calls in `lib/db`
- ✅ Define constants in `constants/`
- ✅ Use custom hooks for reusable logic
