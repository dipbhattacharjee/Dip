# App Frontend

A modern React application built with Tailwind CSS and shadcn/ui components.

## Features

- React 18.2.0
- React Router DOM
- Tailwind CSS
- shadcn/ui components
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Yarn package manager

### Installation

1. Install dependencies:
```bash
yarn install
```

2. Start the development server:
```bash
yarn start
```

3. Build for production:
```bash
yarn build
```

## Project Structure

```
fontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ui/          # shadcn/ui components
│   │   ├── Footer.js
│   │   └── Navbar.js
│   ├── pages/           # Page components
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utility functions
│   ├── App.js
│   └── index.js
├── package.json
└── tailwind.config.js
```

## Available Scripts

- `yarn start` - Runs the app in development mode
- `yarn build` - Builds the app for production
- `yarn test` - Launches the test runner

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

## Technologies Used

- React
- React Router DOM
- Tailwind CSS
- shadcn/ui
- Lucide React (icons)
