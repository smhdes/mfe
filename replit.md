# University Dashboard System - Mikro Frontend Mimarisi

## Overview

Bu proje mikro frontend mimarisi kullanarak geliştirilmiş modern bir üniversite yönetim sistemi. Module Federation teknolojisi ile React, TypeScript ve Tailwind CSS kullanarak ölçeklenebilir bir çözüm sunar. Sistem üç ayrı mikro frontend'den oluşur: Shell (Container), User Card ve Content Bar.

## System Architecture

### Mikro Frontend Mimarisi
- **Shell (Container App)**: Ana layout, routing ve orchestration (Port: 3000)
- **User Card Mikro Frontend**: Kullanıcı profili ve bildirimler (Port: 3001)
- **Content Bar Mikro Frontend**: Öğrenci listesi ve yönetimi (Port: 3002)
- **Module Federation**: Webpack 5 ile mikro frontend entegrasyonu
- **State Sharing**: Zustand store tüm mikro frontend'ler arasında paylaşılır

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Webpack 5 with Module Federation
- **Styling**: TailwindCSS for consistent design system
- **State Management**: Zustand for shared state across microfrontends
- **Development**: Hot Module Replacement per microfrontend
- **Deployment**: Independent deployment per microfrontend

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM for type-safe database operations
- **Validation**: Zod for schema validation
- **API**: RESTful endpoints for students and notifications

### UI/UX Design
- **Component System**: Radix UI primitives with shadcn/ui styling
- **Theme**: "New York" style with CSS variables for theming
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Internationalization**: Turkish language support throughout the interface

## Key Components

### Database Schema
- **Users Table**: Stores user authentication and profile information
- **Students Table**: Comprehensive student data including international status
- **Notifications Table**: System notifications with read/unread status
- **Migrations**: Drizzle-kit handles database schema migrations

### Authentication & Authorization
- Currently uses in-memory storage for development
- Designed to support role-based access control
- Session management ready for implementation

### API Structure
- RESTful endpoints for students and notifications
- Comprehensive error handling and validation
- Structured JSON responses with proper HTTP status codes

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **Server Processing**: Express routes handle requests with Zod validation
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **State Management**: Zustand stores handle client-side state updates
5. **UI Updates**: React components re-render based on state changes

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **zustand**: Lightweight state management

### Development Tools
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production
- **drizzle-kit**: Database schema management
- **vite**: Frontend build tool and development server

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with hot module replacement
- **Backend**: tsx with file watching for automatic restarts
- **Database**: Neon serverless PostgreSQL instance

### Production
- **Build Process**: Vite builds frontend assets, esbuild bundles backend
- **Static Assets**: Served from `/dist/public` directory
- **Server**: Express serves both API and static files
- **Database**: Production PostgreSQL via environment variables

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **NODE_ENV**: Environment detection for development/production modes
- **REPL_ID**: Replit-specific configuration for development tools

## Changelog

- July 05, 2025: Mikro frontend mimarisi tamamlandı
  - Module Federation ile 3 ayrı mikro frontend oluşturuldu
  - Shell (Container), User Card ve Content Bar mikro frontend'leri
  - Webpack 5 build konfigürasyonu
  - Shared state management with Zustand
  - Türkçe dil desteği ve responsive tasarım
  - Comprehensive setup documentation

- July 05, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language (Turkish support for UI).