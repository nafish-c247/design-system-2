# @acme/design-system

Reusable, framework-free design system for Next.js projects.

## Architecture

- `src/tokens`: design tokens
- `src/foundations`: reset and theme
- `src/grid`: responsive grid classes
- `src/utilities`: utility classes
- `src/components`: atoms, molecules, organisms, layouts
- `src/styles.css`: style entrypoint

## Usage

Import styles once in app layout:

```tsx
import "../../packages/design-system/src/styles.css";
```

Import UI components:

```tsx
import { Button, Card, Badge } from "@acme/design-system";
```