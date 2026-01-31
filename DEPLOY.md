# How to Deploy VANTEXA to Vercel

There are two main ways to deploy this project to Vercel:

## Option 1: Using Git (Recommended)
This is the standard and most robust method.

1.  **Initialize Git** (if not already done):
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```

2.  **Push to GitHub/GitLab/Bitbucket**:
    Create a new repository on your preferred provider and push your code there.

3.  **Connect to Vercel**:
    *   Go to [vercel.com](https://vercel.com) and log in.
    *   Click **"Add New..."** -> **"Project"**.
    *   Select your Git repository from the list.
    *   Vercel will detect it's a **Vite** project automatically.
    *   Click **Deploy**.

## Option 2: Using Vercel CLI (Fastest)
If you want to deploy directly from your command line without pushing to Git yet.

1.  **Install Vercel CLI**:
    ```bash
    npm i -g vercel
    ```

2.  **Login**:
    ```bash
    vercel login
    ```

3.  **Deploy**:
    Run this command in the project folder:
    ```bash
    vercel
    ```
    *   Follow the prompts (Project Name? -> `vantexa`, etc.).
    *   Keep default settings (Link to existing project? No. In which directory? `./`).

## Important Note
I have already added a `vercel.json` file to your project. This ensures that if you start using React Router in the future, the pages will load correctly when you refresh them (SPA Rewrite Rules). without this, refreshing a sub-page might give a 404 error.
