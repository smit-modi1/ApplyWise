# ApplyWise v2 Setup Guide

This project consists of a **Node.js/Express Backend** (`backend-v2`) and a **Next.js Frontend** (`frontend-v2`).

## Prerequisites

1.  **Node.js**: v18 or higher.
2.  **PostgreSQL**: A running database instance.
3.  **Gemini API Key**: From Google AI Studio.

## 1. Backend Setup (`backend-v2`)

1.  Navigate to the backend directory:
    ```bash
    cd backend-v2
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    -   The `.env` file has been created but contains placeholders.
    -   Open `backend-v2/.env` and **YOU MUST FILL IN**:
        -   `DATABASE_URL`: `postgresql://user:password@localhost:5432/your_database_name`
        -   `GEMINI_API_KEY`: Your key starting with `AIza...`
        -   (Optional) `GOOGLE_CLIENT_ID` & `SECRET`: For "Login with Google".
        -   `FRONTEND_URL`: Ensure this matches your frontend URL (default `http://localhost:3000`).

4.  **Database Migration**:
    Initialize the database schema:
    ```bash
    npx prisma generate
    npx prisma migrate dev --name init
    ```

5.  Start the server:
    ```bash
    npm run dev
    ```
    The backend will start on **http://localhost:3001**.
    Health check: http://localhost:3001/health

## 2. Frontend Setup (`frontend-v2`)

1.  Open a new terminal and navigate to the frontend:
    ```bash
    cd frontend-v2
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the application:
    ```bash
    npm run dev
    ```
    The frontend will start on **http://localhost:3000**.
    
    *Note: If the backend configured `FRONTEND_URL` as port 3002, please update it to 3000 in `backend-v2/.env`.*

## 3. Verification

-   Go to http://localhost:3000 in your browser.
-   Try to **Sign Up** (this tests the Database connection).
-   If configured, try the AI features (this tests the Gemini API Key).
