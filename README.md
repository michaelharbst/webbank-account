# Bank Account Dashboard

A responsive bank account dashboard built with React, Vite and Bootstrap.

The application allows users to add, review, filter and delete income and expense transactions. Account data is stored locally in the browser.

## Live demo

[View the deployed application](https://michaelharbst.github.io/webbank-account/)

## Features

- Add income and expense transactions
- Display current and running balances
- Show total income and expenses
- Warn when the account is overdrawn
- Filter transactions by month, type and category
- Sort transactions by date
- Delete transactions with confirmation
- Validate required transaction information
- Save transactions in browser `localStorage`
- Responsive layout for desktop, tablet and mobile

## Technologies

- React
- JavaScript
- Vite
- Bootstrap
- HTML and CSS
- Browser `localStorage`
- Vitest
- React Testing Library
- Git and GitHub
- GitHub Actions
- GitHub Pages

## Running the project locally

Clone the repository:

```bash
git clone https://github.com/michaelharbst/webbank-account.git
cd webbank-account
```

Install the dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the local address displayed in the terminal. It will normally be:

```text
http://localhost:5173/
```

## Automated tests

Run the test suite once:

```bash
npm test
```

Run the tests in watch mode while developing:

```bash
npm run test:watch
```

The tests cover transaction calculations, transaction form submission, transaction table behavior, account status messages and browser storage. They include positive flows, invalid input and edge cases such as an empty account balance or malformed saved data.

GitHub Actions runs the test suite on pushes and pull requests. This is a focused regression suite; it does not currently include end-to-end browser tests or automated visual tests for responsive layouts.

## Production build

Create a production build:

```bash
npm run build
```

The generated files are placed in the `dist` folder.

Test the production build locally:

```bash
npm run preview
```

## Deployment

The application is deployed to GitHub Pages through a GitHub Actions workflow.

When a change is pushed to the `main` branch, the deployment workflow:

1. Installs the project dependencies
2. Builds the application with Vite
3. Uploads the generated `dist` folder
4. Deploys the build to GitHub Pages

## Data storage

Transactions are saved in the browser's `localStorage`.

This means that the data:

- remains after refreshing or closing the browser
- is only available in the same browser on the same device
- is not stored in a central database
- can be removed by clearing the browser's website data

The application is an educational project and should not be used for real or sensitive financial information.

## Possible future improvements

- Calculate monthly interest
- Edit existing transactions
- Export and import transactions
- Add charts and financial summaries
- Add browser-based end-to-end and responsive-layout tests
- Store data in a backend database
- Add user authentication and synchronization between devices

## Project purpose

This project was created to practise:

- React components and props
- React hooks with `useState` and `useEffect`
- Controlled forms and input validation
- Derived data and array operations
- Conditional rendering
- Responsive Bootstrap layouts
- Local browser persistence
- Unit and component testing
- Automated testing with GitHub Actions
- Automated deployment with GitHub Actions