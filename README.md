# HireFlow Frontend

Frontend application for the HireFlow Applicant Tracking System (ATS).

## Prerequisites

Before running the project, make sure you have:

* Node.js (v20 or later)
* npm (v10 or later)

Check your versions:

```bash
node -v
npm -v
```

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/hireflow-frontend.git
```

Navigate to the project directory:

```bash
cd hireflow-frontend
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://api.hireflow.ruby.ly
```

## Running the Development Server

Start the application:

```bash
npm run dev
```

The application will be available at:

```txt
http://localhost:5173
```

## Building for Production

Create a production build:

```bash
npm run build
```

The generated files will be placed inside the `dist` folder.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```txt
src/
├── api/
├── app/
├── components/
├── config/
├── features/
│   ├── auth/
│   ├── candidates/
│   ├── dashboard/
│   ├── interviews/
│   ├── jobs/
│   ├── pipeline/
│   └── users/
├── hooks/
├── providers/
├── routes/
├── types/
└── utils/
```

## Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* Shadcn/UI
* Axios
* TanStack Query
* Zustand

## API

The frontend communicates with:

```txt
https://api.hireflow.ruby.ly
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```
