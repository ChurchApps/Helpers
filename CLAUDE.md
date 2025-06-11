# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the `@churchapps/helpers` package - a foundational TypeScript library providing framework-agnostic utilities, interfaces, and helper classes for ChurchApps church management applications. It serves as the core dependency for other ChurchApps packages (ApiHelper, AppHelper, MobileHelper).

## Development Commands

```bash
npm run clean      # Remove dist folder
npm run tsc        # TypeScript compilation only
npm run build      # Full build (clean + tsc)
npm run lint       # ESLint check
npm run lint:fix   # ESLint with auto-fix
npm run format     # Prettier formatting
```

## Local Development Workflow

```bash
# After making changes:
npm run build
npm link

# In consuming project:
npm link @churchapps/helpers

# After further changes, repeat build + link cycle
```

## Publishing

```bash
# 1. Update version in package.json
# 2. Build and publish:
npm run build
npm publish --access=public
```

## Architecture

### Core Structure

The package follows a static utility class pattern with comprehensive TypeScript interfaces:

- **Helper Classes**: Static utility classes (`ApiHelper`, `DateHelper`, `ArrayHelper`, etc.)
- **Interfaces**: Church management domain models organized by feature area
- **Zero Runtime Dependencies**: Framework-agnostic with minimal external deps

### Key Helper Categories

1. **ApiHelper**: Multi-API HTTP client with JWT auth for ChurchApps microservices
2. **Data Helpers**: Array manipulation, date/time processing, currency formatting
3. **User Management**: Multi-church user sessions, permissions, person data
4. **Business Logic**: Donation processing, file uploads, appearance theming
5. **System Utilities**: Error handling, environment config, unique ID generation

### Interface Organization

Interfaces in `src/interfaces/` are grouped by domain:
- **Access**: Authentication, users, churches, roles, permissions
- **Membership**: People, groups, households, forms, campus management  
- **Content**: Sermons, playlists, streaming, events
- **Donation**: Financial transactions, Stripe integration
- **Attendance**: Service tracking
- **Messaging**: Communication interfaces
- **Reporting**: Data analysis interfaces

### TypeScript Configuration

- Target: ES2020 with CommonJS modules
- Declaration files generated (`.d.ts`)
- Strict mode disabled for flexibility
- Supports React JSX and DOM types

### Key Dependencies

- `date-fns` & `dayjs`: Date manipulation
- `rrule`: Recurring event rules
- `react-ga4`: Analytics (peer dependency pattern)

## Important Patterns

- **Multi-tenancy**: Most entities include `churchId` for church-scoped data
- **Optional Properties**: Extensive use for flexible partial updates
- **Static Methods**: All helpers use static methods for stateless operations
- **Error Resilience**: Comprehensive error handling with graceful degradation
- **Environment Flexibility**: Works across React, Next.js, React Native platforms