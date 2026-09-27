# Abuhossain

This project is a personal portfolio website built with Angular 22 and Bootstrap 5. It showcases a developer's profile, education background, projects, contact information, and CV/resume in a clean and responsive layout.

## Project Overview

The application is designed as a single-page portfolio with multiple sections and routes, including:

- Home
- About
- Education
- Projects
- Contact
- CV

The content is separated from the UI so that portfolio details can be updated easily through JSON files instead of hardcoding content inside Angular components.

## Where content is added

### Application structure

- `src/app/components/` — UI components for each page section
  - `home/` — landing page
  - `about/` — personal introduction
  - `education/` — academic background
  - `projects/` — project showcase
  - `contact/` — contact details
  - `cv/` — CV/resume page
  - `loading/` — loading state
  - `nav/` — navigation bar
- `src/app/services/data.ts` — service for fetching data from JSON files or remote sources
- `src/app/model/` — TypeScript models for structured data
- `public/data/` — JSON files containing the actual portfolio content

### Routing

The routing configuration is defined in `src/app/app.routes.ts` and includes:

- `/home`
- `/about`
- `/education`
- `/projects`
- `/contact`
- `/cv`
- `/loading`

### Data files

Portfolio data is stored in the following files:

- `public/data/contact.json`
- `public/data/cv.json`
- `public/data/education.json`
- `public/data/projects.json`

These files are the main places to update information such as contact details, education history, project lists, and CV content.

## Development server

To start a local development server, run:

```bash
npm install
npm start
```

Then open your browser and visit:

```text
http://localhost:4200/
```

## Build

To build the project for production:

```bash
npm run build
```

The production build artifacts will be stored in the `dist/` directory.

## Testing

To run the unit tests:

```bash
npm test
```

## Additional Resources

For more information about Angular CLI and project setup, see the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
