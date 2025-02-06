# Vehicle Bidding WebApp

This is a Vue.js project configured with Vite, TypeScript, and Vitest for testing.

## Table of Contents

- [Project Setup](#project-setup)
- [Development](#development)
- [Building](#building)
- [Preview](#preview)
- [Testing](#testing)
- [License](#license)

## Project Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version >= 20.0)
- [npm](https://www.npmjs.com/) for managing dependencies.

### Install Dependencies

After cloning this repository, install the required dependencies:

```bash
npm install
```

## Development

To start the development server, use the following command:

```bash
npm run dev
```

This will launch the Vite development server, and your application will be available at `http://localhost:5175` (or whichever port Vite chooses).

## Building

To build the project for production, use:

```bash
npm run build
```

This will:
1. Run TypeScript type checking with `vue-tsc`.
2. Build the production-ready assets using `vite build`.

The generated files will be placed in the `dist/` folder.

## Preview

To preview the production build locally, run the following command:

```bash
npm run preview
```

This will start a local server to preview the built project. You can use this command to test the production build before deploying.

## Testing

This project uses **Vitest** for unit and component testing. To run tests, use:

```bash
npm run test
```

## License

This project is licensed under the MIT License
