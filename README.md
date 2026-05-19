# JSONPlaceholder User Autocomplete

A simple React and TypeScript application that uses the Fetch API and Material UI Autocomplete to search users from the JSONPlaceholder Users endpoint and display the selected user’s name and address.

## Public GitHub Repository

Repository URL:

```txt
https://github.com/melon0102/jsonplaceholder-user-search
```

Replace `YOUR_USERNAME` with your GitHub username after pushing the project to GitHub.

## Project Objective

This project satisfies the following task requirements:

1. Use the Fetch API to retrieve users from the JSONPlaceholder Users endpoint.
2. Use the Material UI Autocomplete component for the search input.
3. Use any React framework or packages needed to build a clean and maintainable solution.
4. Display the selected user’s name and address on the page.
5. Sort autocomplete suggestions alphabetically by last name.
6. Format user suggestions as:

```txt
{Last Name} {Suffix}, {First Name} (Title)
```

The suffix and title are only displayed when they exist in the user’s name. The application does not guess, infer, or add missing titles or suffixes.

## Example Name Formatting

```txt
Jane Doe => Doe, Jane
Mr. John Doe Jr. => Doe Jr., John (Mr.)
Mr. James Von Doe III => Von Doe III, James (Mr.)
```

## Tech Stack

This project uses:

| Tool        | Purpose                                                                 |
| ----------- | ----------------------------------------------------------------------- |
| React       | UI library for building the application interface                       |
| TypeScript  | Type safety and better developer experience                             |
| Vite        | Fast React project setup, development server, and production build tool |
| Material UI | Autocomplete component and supporting UI components                     |
| Emotion     | Styling engine required by Material UI                                  |
| Fetch API   | Native browser API used to retrieve users from JSONPlaceholder          |

## API Used

The application fetches users from:

```txt
https://jsonplaceholder.typicode.com/users
```

No API key or authentication is required.

## Features

- Fetches users from the JSONPlaceholder Users endpoint
- Displays users inside a Material UI Autocomplete search input
- Sorts users alphabetically by last name
- Formats names according to the required display format
- Displays the selected user’s formatted name
- Displays the selected user’s address
- Handles loading state while users are being fetched
- Handles API errors gracefully
- Uses strict TypeScript types for API data and transformed user options
- Keeps name formatting logic isolated in a utility function

## Project Structure

```txt
jsonplaceholder-user-search
├── index.html
├── package.json
├── README.md
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── src
    ├── App.tsx
    ├── main.tsx
    ├── styles.css
    ├── types
    │   └── user.ts
    └── utils
        └── formatUserName.ts
```

## Prerequisites

Before running the project locally, ensure you have the following installed:

```txt
Node.js 18 or later
npm 9 or later
Git
```

You can confirm your local versions with:

```bash
node --version
npm --version
git --version
```

## Local Development Setup

Clone the repository:

```bash
git clone https://github.com/melon0102/jsonplaceholder-user-search.git
```

Move into the project directory:

```bash
cd jsonplaceholder-user-search
```

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Vite will start the app locally and print a local development URL in the terminal. It will usually look like this:

```txt
http://localhost:5173
```

Open that URL in your browser.

## Available Scripts

### Start the development server

```bash
npm run dev
```

Runs the application in development mode with hot reload.

### Create a production build

```bash
npm run build
```

Runs TypeScript build checks and creates an optimized production build in the `dist` directory.

### Preview the production build locally

```bash
npm run preview
```

Serves the production build locally so it can be tested before deployment.

### Run TypeScript checks

```bash
npm run lint
```

Runs TypeScript without emitting files. This verifies that the codebase has no TypeScript errors.

## How the Application Works

When the app loads, it fetches users from the JSONPlaceholder Users endpoint using the browser Fetch API.

The returned users are transformed into autocomplete options. During this transformation, each user’s name is parsed into the following optional and required parts:

```txt
title
firstName
lastName
suffix
formattedName
sortKey
```

The formatted name is used as the visible label inside the autocomplete dropdown.

The sort key is based on the user’s last name so the autocomplete options appear alphabetically by last name.

When a user is selected, the app displays:

```txt
Formatted user name
Street
Suite
City
Zip code
```

## Name Parsing Rules

The app only displays a title if the first part of the name matches a known title.

Supported titles:

```txt
Mr.
Mrs.
Ms.
Miss
Dr.
Prof.
Sir
Madam
```

The app only displays a suffix if the last part of the name matches a known suffix.

Supported suffixes:

```txt
Jr.
Jr
Sr.
Sr
II
III
IV
V
VI
VII
VIII
IX
X
```

The remaining name parts are treated as the first name and last name.

For example:

```txt
Mr. James Von Doe III
```

Becomes:

```txt
Von Doe III, James (Mr.)
```

## Important Implementation Notes

The app does not extrapolate or invent titles and suffixes. It only displays them when they are already present in the user data.

The JSONPlaceholder dataset mostly contains simple names, so most names will display in the basic format:

```txt
Last Name, First Name
```

The parsing utility is still implemented to satisfy the full task requirements and to correctly support names that include titles or suffixes.

## Testing the App Manually

To verify the app locally:

1. Run `npm install`.
2. Run `npm run dev`.
3. Open the local Vite URL in your browser.
4. Click the autocomplete input.
5. Confirm that user suggestions appear.
6. Confirm that suggestions are sorted alphabetically by last name.
7. Select a user.
8. Confirm that the selected user’s name and address appear on the page.
9. Run `npm run build` to confirm the app builds successfully.

## Deployment Notes

This application can be deployed to any static frontend hosting platform that supports Vite builds, such as:

```txt
Vercel
Netlify
GitHub Pages
Cloudflare Pages
```

For most platforms, the build settings are:

```txt
Build command: npm run build
Output directory: dist
```

## Submission

Submit the public GitHub repository link after pushing the project:

```txt
https://github.com/melon0102/jsonplaceholder-user-search
```

The repository should include:

```txt
Complete source code
README.md
Build instructions
Local development instructions
Dependency installation instructions
Available npm scripts
```
