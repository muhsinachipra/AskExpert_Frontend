# AskExpert Frontend

Welcome to the AskExpert frontend repository! This project powers the user interface of the AskExpert platform, providing an engaging and intuitive experience for connecting users with experts through real-time chat and video calls.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Deployment](#deployment)
- [License](#license)

## Getting Started

To get started with the AskExpert frontend:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/askexpert-frontend.git
   ```

2. **Navigate into the project directory:**

   ```bash
   cd askexpert-frontend
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to view the application.

## Project Structure

The project is organized as follows:

- `public/` - Static assets such as images and SVGs.
- `src/` - Source code for the application.
  - `app/` - Configuration and setup files, including Firebase configuration.
  - `assets/` - Static assets used in components.
  - `components/` - Reusable React components.
  - `constants/` - Constants used throughout the application.
  - `context/` - React context providers.
  - `hooks/` - Custom React hooks.
  - `lib/` - Utility functions.
  - `middleware/` - Custom middleware functions.
  - `pages/` - React components representing different pages in the application.
  - `routes/` - Routing configurations.
  - `slices/` - Redux slices and API slices.
  - `types/` - TypeScript types and interfaces.
  - `validation/` - Validation schemas and types.

## Environment Variables

Create a `.env` file in the root directory and set the following environment variables:

- `VITE_BASE_URL`: The base URL of your backend API.
- `VITE_GOOGLEAUTH_CLIENTID`: Your Google OAuth client ID.
- `VITE_GOOGLEAUTH_SECRET`: Your Google OAuth client secret.
- `REACT_APP_FIREBASE_API_KEY`: Your Firebase API key.
- `REACT_APP_FIREBASE_AUTH_DOMAIN`: Your Firebase Auth domain.
- `REACT_APP_FIREBASE_PROJECT_ID`: Your Firebase project ID.
- `REACT_APP_FIREBASE_STORAGE_BUCKET`: Your Firebase storage bucket.
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase messaging sender ID.
- `REACT_APP_FIREBASE_APP_ID`: Your Firebase app ID.
- `VITE_STRIPE_PUBLIC_KEY`: Your Stripe public key.
- `VITE_ZEGOCLOUD_SECRET`: Your ZEGOCLOUD secret key.
- `VITE_ZEGOCLOUD_APPID`: Your ZEGOCLOUD app ID.

## Development

- **To start the development server:**

  ```bash
  npm run dev
  ```

- **To build the application for production:**

  ```bash
  npm run build
  ```

## Deployment

The application is configured to be deployed with Vercel. For deployment instructions, check the `vercel.json` file or refer to [Vercel's documentation](https://vercel.com/docs).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
