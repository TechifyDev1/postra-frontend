# Postra — Web Frontend

Comprehensive frontend for Postra — a social blogging platform. Built with Next.js (App Router) and TypeScript, it focuses on a fast, accessible, and extensible editing and reading experience.

Table of contents
- Project overview
- Key features
- Architecture & design
- Tech stack
- Repository layout
- Local development
- Environment variables
- Styling & UI
- Editor (Tiptap)
- State management & data flow
- Testing & linting
- Deployment
- Contributing
- Acknowledgements

Project overview
The frontend renders public pages, user profiles, post viewing and editing flows. It uses Next.js App Router for performant SSR/SSG and client interactivity where needed.

Key features
- Next.js App Router architecture with React 19
- Rich text editor using Tiptap with custom image-upload node
- Modular SCSS-based styling and CSS Modules
- Responsive layout and accessible components
- Context-based global state (User, Comments, Profile counts, Toasts, Modals)

Architecture & design
- App Router (app/) contains routes, layouts and page-level modules.
- Components are organized by feature and composition level: organ (large composite components), tissue (small reusable UI pieces), cell (atomic UI bits).
- Providers wrap the app to provide contexts: user, comments, profile counts, toasts, and modal handling.
- Editor integration is encapsulated inside PostEditor and tiptap-related utilities and extensions.
- Types live under `types/` for consistent TypeScript definitions across the app.

Tech stack
- Framework: Next.js 16 (App Router)
- Language: TypeScript
- UI: React 19
- Editor: Tiptap (@tiptap/react, @tiptap/starter-kit)
- Styling: Sass/SCSS + CSS Modules
- Icons: Phosphor React
- Utilities: uuid, @floating-ui/react

Repository layout
- app/ — Next.js routes and layouts
- components/ — UI components (landing-page, main-components, tiptap primitives)
- hooks/ — custom hooks (use-user-context, use-comments, use-tiptap-editor, etc.)
- providers/ & contexts/ — React context providers used globally
- lib/ — shared utilities (tiptap utilities, etc.)
- public/ — static assets (images, icons)
- types/ — TypeScript type definitions

Local development
1. Install dependencies: npm install
2. Run dev server: npm run dev
3. Lint: npm run lint
4. Build: npm run build

Environment variables
This project talks to an API (not committed here). Create a `.env.local` with the required variables before running build/dev. Common env keys to add (verify usage in code):
- NEXT_PUBLIC_API_BASE_URL — base URL for backend API
- NEXT_PUBLIC_UPLOAD_URL — (if image uploads are separate)

Search the codebase for other process.env usage and add keys accordingly.

Styling & UI
- Uses SCSS partials and variables (`styles/_variables.scss`) and keyframe helpers.
- CSS Modules are used alongside global SCSS for component-scoped styles (e.g., .module.css files).
- Follow existing class-naming and module patterns when adding styles.

Editor (Tiptap)
- Tiptap is used for rich text editing, with custom extensions and an image-upload node located under `components/tiptap-node` and `components/tiptap-ui-*`.
- Image upload flow is encapsulated in `image-upload-node` and `image-upload-button` hooks/components.

State management & data flow
- Local component state for ephemeral UI
- Global concerns via React Context (UserContext, CommentsContext, ProfileCounts, ShowComments)
- Hooks encapsulate data fetching and mutation patterns (use-comments, useProfileCounts)

Testing & linting
- ESLint configured (eslint.config.mjs / eslint.config.mts). Run `npm run lint`.
- No automated test runner found — consider adding Jest/Playwright for unit and integration tests.

Deployment
- The app targets modern Next.js hosting (e.g., Vercel). Build with `npm run build` and `npm run start` in production.
- Ensure environment variables are configured in the hosting provider.

Contributing
- Follow TypeScript and ESLint rules used in the repo.
- Add types in `types/` when introducing new data shapes.
- Create a branch per feature and open PRs with clear descriptions.

Notes for maintainers
- Keep Tiptap extensions and image upload node decoupled to ease future migration to other editors.
- Consider adding automated tests around editor behavior and critical hooks/providers.
- Add CI (GitHub Actions) to run lint and build on PRs.

Acknowledgements
Built with Next.js, React, Tiptap, Sass and Phosphor icons.

Contact
For questions, reach the repository maintainers.
