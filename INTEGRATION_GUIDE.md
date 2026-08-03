# Redux & API Integration Guide

## Overview

This portfolio website has been updated to fetch data from your backend API using Redux Toolkit. The UI and components remain **completely unchanged** - only the data source has been updated.

## Architecture

```
Components (unchanged)
    ↓
resume.js (static exports for backward compatibility)
    ↓
DataContext (provides live data from Redux)
    ↓
Redux Store (fetches from API)
    ↓
Backend API
```

## How It Works

### 1. **Redux Store** (`src/store/`)
- **portfolioSlice.js**: Defines async thunks that fetch data from the API
- **store.js**: Configures the Redux store

### 2. **Data Context** (`src/context/DataContext.jsx`)
- Wraps the entire app and provides data to all components
- Automatically fetches data on mount
- Transforms API responses to match the original data structure

### 3. **Data Transformation** (`src/utils/dataTransform.js`)
- Maps API response fields to the format expected by components
- Ensures backward compatibility with existing component structure

### 4. **resume.js** (`src/data/resume.js`)
- Exports fallback data for backward compatibility
- Components can still import from this file
- For live data, use the `usePortfolioData()` hook

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

Dependencies added:
- `@reduxjs/toolkit` - Redux state management
- `react-redux` - React bindings for Redux
- `axios` - HTTP client for API calls

### 2. Configure API URL
Edit `.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

Replace with your actual backend API URL.

### 3. Start Development Server
```bash
npm run dev
```

## Using the Data in Components

### Option 1: Using the Hook (Recommended)
```jsx
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function MyComponent() {
  const { personalInfo, projects, skills } = usePortfolioData();
  
  return (
    <div>
      <h1>{personalInfo.name}</h1>
      {/* Use data here */}
    </div>
  );
}
```

### Option 2: Static Imports (Backward Compatible)
```jsx
import { personalInfo, projects } from '../data/resume';

export default function MyComponent() {
  return (
    <div>
      <h1>{personalInfo.name}</h1>
      {/* Will use fallback data until updated */}
    </div>
  );
}
```

## API Endpoints Expected

The backend API should provide these endpoints:

```
GET /api/personal-info
GET /api/experience
GET /api/projects
GET /api/skills
GET /api/blogs
GET /api/education
GET /api/stats
GET /api/social-links
```

Each endpoint should return data in this format:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {
    "docs": [...],
    "total": 10,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}
```

## Data Structure Mapping

### Personal Info
```javascript
{
  name: string,
  title: string,
  subtitle: string,
  location: string,
  phone: string,
  email: string,
  profileImage: string (URL),
  resumeUrl: string (URL),
  summary: string
}
```

### Experience
```javascript
{
  role: string,
  company: string,
  location: string,
  period: string,
  current: boolean,
  highlights: string[]
}
```

### Projects
```javascript
{
  name: string,
  tagline: string,
  description: string,
  stack: string[],
  category: string,
  color: string (hex),
  icon: string (emoji),
  panels: string[]
}
```

### Skills
```javascript
{
  name: string,
  category: string
}
```

### Blogs
```javascript
{
  title: string,
  category: string,
  excerpt: string,
  tags: string[],
  slug: string
}
```

### Education
```javascript
{
  degree: string,
  institution: string,
  period: string,
  cgpa: string (optional),
  location: string (optional)
}
```

### Stats
```javascript
{
  value: string,
  label: string,
  icon: string (optional)
}
```

### Social Links
```javascript
{
  platform: string,
  url: string,
  username: string (optional),
  icon: string (optional),
  color: string (optional),
  isActive: boolean
}
```

## File Structure

```
src/
├── store/
│   ├── store.js                 # Redux store configuration
│   └── slices/
│       └── portfolioSlice.js    # Portfolio data slice with async thunks
├── context/
│   └── DataContext.jsx          # Data provider context
├── utils/
│   └── dataTransform.js         # API response transformation
├── hooks/
│   └── usePortfolioData.js      # Custom hook for accessing data
├── data/
│   ├── resume.js                # Fallback exports
│   └── resumeWrapper.js         # Wrapper for backward compatibility
├── App.jsx                      # Updated with DataProvider
└── main.jsx                     # Updated with Redux Provider
```

## Troubleshooting

### Data Not Loading
1. Check if the backend API is running
2. Verify the `VITE_API_URL` in `.env` is correct
3. Check browser console for error messages
4. Ensure CORS is enabled on the backend

### Components Showing Fallback Data
- This is expected on first load while data is being fetched
- Check Redux DevTools to see the loading state
- Verify API responses match the expected format

### API Response Format Mismatch
- Check the `dataTransform.js` file
- Adjust the transformation functions to match your API response
- Ensure field names match between API and transformation

## Redux DevTools

To debug Redux state:

1. Install [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools-extension) for Chrome
2. Open DevTools → Redux tab
3. Inspect actions and state changes

## Performance Considerations

- Data is fetched once on app mount
- Transformation happens in useMemo for optimization
- No unnecessary re-renders of components
- Fallback data ensures app doesn't break if API is unavailable

## Updating Components

If you want to update components to use the hook instead of static imports:

```jsx
// Before
import { personalInfo } from '../data/resume';

// After
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Component() {
  const { personalInfo } = usePortfolioData();
  // Rest of component remains the same
}
```

However, this is **optional** - components will continue to work with static imports.

## Production Build

```bash
npm run build
```

The build will include all Redux and API integration code. Make sure to set the correct `VITE_API_URL` for your production environment.

## Support

For issues or questions about the integration, check:
1. Browser console for errors
2. Redux DevTools for state debugging
3. Network tab for API call failures
4. This guide for common issues
