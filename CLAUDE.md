<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->

# Staypedia Design Guidelines

## Mobile App Design Philosophy

This is a **native mobile app experience**, NOT a mobile web page. The UI should feel like a polished iOS/Android app.

### Design Principles

1. **Native Mobile Patterns**
   - Use bottom navigation bars (sticky, fixed at bottom)
   - Card-based layouts with rounded corners
   - Floating action buttons
   - Native-feeling transitions and interactions
   - Mobile-first spacing and touch targets (min 44px)

2. **Visual Style - Warm & Cozy**
   - Primary color: #dd5256 (`hsl(359 66% 59%)`) - warm reddish tone
   - NO gradients (solid colors only)
   - Font: Montserrat (all weights)
   - Pinterest-inspired aesthetic
   - Generous white space
   - Soft shadows and rounded corners

3. **Mobile App UI Elements**
   - Status cards with icons
   - Bottom sheet modals
   - Pull-to-refresh patterns
   - Swipeable cards
   - Sticky headers with blur effects
   - Icon badges and notifications
   - Avatar circles
   - Progress indicators

### Guidebook Page Structure

The guidebook page has **3 bottom navigation tabs**:
- **Home** - Welcome, property overview, quick actions
- **Essentials** - WiFi, codes, house info, emergency contacts
- **Dashboard** - Host view of analytics, settings, sharing

### Reference Apps
Study these mobile app patterns for UI inspiration:
- Delivery tracking apps (status cards, progress bars, map views)
- Fitness apps (challenge cards, progress tracking, clean layouts)
- Booking apps (property cards, category tabs, search filters)
- Cashback apps (map integration, offer cards, category icons)
