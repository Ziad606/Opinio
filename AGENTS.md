# Opinio — Agent Guidelines & Engineering Rules

These rules define the architectural boundaries, coding conventions, and design-system requirements for the Opinio frontend.

The goal is to keep the codebase maintainable, predictable, and consistent as the application grows.

---

## 1. Architecture & Responsibility

Opinio uses the following responsibility boundaries:

```text
React Components
    ↓
Feature Hooks
    ↓
TanStack Query
    ↓
Feature Services
    ↓
Axios
    ↓
Survey Basket API
```

Each layer should have a clear responsibility.

### React Components

Components are primarily responsible for:

- Rendering UI.
- Handling user interaction.
- Managing local UI state.
- Connecting UI elements to feature hooks.
- Displaying loading, error, empty, and success states.

Components should NOT:

- Call Axios directly.
- Call API services directly when the operation is server state.
- Contain API orchestration.
- Implement token refresh logic.
- Parse raw `AxiosError` objects.
- Contain reusable business/API logic.

Preferred:

```text
Component
    ↓
usePolls()
    ↓
useQuery()
    ↓
pollService.getPolls()
```

Avoid:

```text
Component
    ↓
axios.get(...)
```

and:

```text
Component
    ↓
pollService.getPolls()
```

when the operation should be managed as server state.

---

## 2. Feature Hooks

Custom hooks are the feature-level orchestration layer when they provide meaningful behavior.

Hooks may be responsible for:

- `useQuery`.
- `useMutation`.
- Query invalidation.
- Query configuration.
- Combining multiple pieces of feature state.
- UI-facing success/error behavior.
- Coordinating feature-specific logic.

Example:

```text
LoginForm
    ↓
useLogin()
    ↓
useMutation()
    ↓
authService.login()
```

Do not create hooks that merely wrap a trivial function without adding meaningful behavior.

---

## 3. Services

Services are responsible ONLY for communication with the API.

A service should:

- Build the API request.
- Call the appropriate Axios client.
- Provide request/response typing.
- Return the API result.

A service should NOT:

- Import React.
- Use React hooks.
- Show toasts.
- Navigate.
- Manipulate UI state.
- Access components.
- Contain TanStack Query logic.
- Implement cache invalidation.
- Duplicate error parsing.

Example:

```ts
export const pollService = {
    getPolls: async () => {
        const response = await apiClient.get<Poll[]>("/polls");
        return response.data;
    },
};
```

---

## 4. Axios

Axios owns HTTP-level concerns.

### Axios Clients

Use separate Axios clients when their responsibilities differ:

```text
authClient
    ├── Login
    ├── Register
    ├── Refresh token
    ├── Confirm email
    └── Password operations

apiClient
    ├── Authenticated API requests
    ├── Authorization header
    ├── 401 handling
    └── Token refresh/retry
```

The refresh request MUST use `authClient`, not `apiClient`, to prevent recursive refresh behavior.

---

## 5. Authentication & Token Refresh

Authenticated requests should follow:

```text
Component
    ↓
Feature Hook
    ↓
Service
    ↓
apiClient
    ↓
Authorization: Bearer <token>
    ↓
API
```

### Refresh Flow

When an authenticated request receives `401`:

```text
API → 401 → Axios response interceptor → refreshAccessToken() → Update Zustand → Retry original request
```

---

## 6. Zustand

Zustand owns client/application state. Use Zustand for state such as authentication state, access token, refresh token, current user.

---

## 7. TanStack Query

TanStack Query owns server state (Queries, Mutations, caching, invalidation).

---

## 8. Error Handling

All API errors follow a consistent pipeline.
Axios converts API error responses into `ApiError`. Feature hooks / components consume normalized errors. Toasts must NOT be triggered from Axios or services.

---

## 9. Forms & Validation

Use React Hook Form for form state and Zod for validation schemas.

---

## 10. Routing & Constants

React Router owns routing and navigation.

- Centralize all route paths in `src/config/constants.ts` (e.g., `routes.home`, `routes.auth.login`).
- Do NOT use magic strings for route paths anywhere in components, hooks, router configurations, or navigation actions. Use the `routes` constant instead.

---

## 11. Constants & Magic Values Policy

Avoid magic strings, magic numbers, hardcoded regular expressions (Regex), or inline values that can change and break functionality.

- Centralize all application constants (route paths, regex patterns, validation limits, API error codes, configuration strings) in `src/config/constants.ts`.
- Never define inline regex literals (e.g. `/\d/`, `/[A-Za-z]/`) inside components, hooks, or schemas. Import them from `patterns` or the constants file instead.
- If a value is subject to change or reuse across components/schemas/services, it MUST be exported as a constant.

---

## 12. Feature-Based Organization

Feature-specific logic lives inside `src/features/<feature_name>/`.

### Directory Structure Rule

**STRICT:** All feature code MUST follow this exact structure:

```text
src/features/<feature_name>/
├── api/           (API service functions only)
├── components/    (Feature-specific reusable components)
├── hooks/         (Feature hooks: useQuery, useMutation, orchestration)
├── pages/         (Full-page components for routing)
├── stores/        (Zustand stores if needed)
└── types/         (TypeScript types and Zod schemas)
```

**Rules:**

1. **Pages vs Components:**
   - `pages/` contains ONLY full-page route components (e.g., `PollManagement.tsx`, `PollsDashboard.tsx`)
   - `components/` contains ONLY reusable feature-specific components used BY pages (e.g., `PollsTable.tsx`, `StatusBadge.tsx`)
   - A component that is directly mounted as a route destination MUST live in `pages/`
   - A component that is imported and used by other components MUST live in `components/`

2. **Never mix pages and components in the same directory**

3. **Page components:**
   - Should compose smaller components from `components/` or `src/components/ui/`
   - Should NOT contain complex UI logic — extract it into feature components
   - Should use feature hooks from `hooks/`

4. **Feature components:**
   - Can be imported by pages OR other feature components
   - Should handle a single UI concern (table, card, badge, form section)
   - Should accept data via props, not fetch directly

**Example violation:**

```text
❌ src/features/polls/PollsTable.tsx (not in pages/ or components/)
❌ src/features/polls/pages/StatusBadge.tsx (component wrongly placed in pages/)
```

**Correct:**

```text
✅ src/features/polls/pages/PollManagement.tsx
✅ src/features/polls/components/PollsTable.tsx
✅ src/features/polls/components/StatusBadge.tsx
```

---

## 13. Design System Rules

- Colors: `bg-primary`, `bg-surface`, `bg-background`, `text-on-surface`, `text-on-surface-variant`, `border-border`, `bg-error`, `text-error`, etc.
- Typography: `font-display`, `font-sans`.
- Shape: `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full`.
