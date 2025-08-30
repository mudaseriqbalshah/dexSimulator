# DEX Price Simulator

## Overview

A full-stack web application that simulates decentralized exchange (DEX) price movements using an automated market maker (AMM) model. The application allows users to configure trading parameters and visualize how buy/sell transactions affect token prices in a liquidity pool. Built with React/TypeScript frontend, Express.js backend, and designed for real-time trading simulation with interactive charts and comprehensive analytics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and hot reloading
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, modern UI components
- **State Management**: Custom React hooks for simulation state management with real-time updates
- **Data Visualization**: Recharts library for interactive price charts and trading analytics
- **Routing**: Wouter for lightweight client-side routing
- **Data Fetching**: TanStack Query for server state management and API interactions

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Development Setup**: Development server with Vite integration for seamless full-stack development
- **API Design**: RESTful API structure with /api prefix for all backend routes
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Logging**: Custom request logging middleware for API monitoring

### Trading Simulation Engine
- **AMM Model**: Constant product formula (x * y = k) for price calculations
- **Random Trading**: Configurable buy/sell transaction generation with randomized amounts
- **Real-time Updates**: Interval-based simulation execution with state persistence
- **Price Tracking**: Historical price data collection for chart visualization
- **Transaction Logging**: Detailed transaction history with timestamps and trade details

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (@neondatabase/serverless) for serverless PostgreSQL
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **In-Memory Storage**: Fallback memory storage implementation for development and testing
- **Session Management**: PostgreSQL-backed session storage with connect-pg-simple

### Component Architecture
- **UI Components**: Modular shadcn/ui components (cards, buttons, inputs, charts)
- **Simulation Components**: Specialized components for parameter configuration, pool status, and results display
- **Chart Components**: Interactive price charts with real-time data updates
- **Transaction Components**: Transaction log display with filtering and pagination

### Build and Development
- **Build Tool**: Vite for frontend bundling with esbuild for backend compilation
- **TypeScript**: Full TypeScript coverage with strict type checking
- **Path Aliases**: Configured imports for clean code organization (@/, @shared/, @assets/)
- **Development Tools**: Replit integration with runtime error overlay and cartographer for debugging

## External Dependencies

### Core Libraries
- **React Ecosystem**: React 18, React DOM, React Hook Form with Zod validation
- **UI Framework**: Radix UI primitives with shadcn/ui component system
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Charts**: Recharts for data visualization and interactive charts
- **Utilities**: date-fns for date manipulation, clsx for conditional styling

### Backend Dependencies
- **Database**: Drizzle ORM with PostgreSQL dialect and Neon serverless driver
- **Session Management**: Express session with PostgreSQL store (connect-pg-simple)
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Development Tools
- **Type Safety**: TypeScript with strict configuration and comprehensive type checking
- **Code Quality**: ESLint configuration for code standards and best practices
- **Build Tools**: Vite with React plugin and development optimizations
- **Replit Integration**: Specialized plugins for Replit development environment

### Validation and Forms
- **Schema Validation**: Zod for runtime type validation and form schemas
- **Form Management**: React Hook Form with Hookform resolvers for form state
- **Database Validation**: Drizzle-Zod integration for database schema validation