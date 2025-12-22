# AR Educational Content Viewer

A premium MERN stack application for viewing educational 3D content in Augmented Reality.

## Prerequisites

- Node.js (v14+)
- MongoDB (Local or Atlas)

## Setup

1.  **Install Dependencies**

    ```bash
    # Server
    cd server
    npm install

    # Client
    cd ../client
    npm install
    ```

2.  **Database Setup**

    Ensure MongoDB is running locally on port 27017.
    
    Seed the database:
    ```bash
    cd server
    npx ts-node src/seed.ts
    ```

3.  **Run the Application**

    Start the server:
    ```bash
    cd server
    npm run dev
    ```

    Start the client:
    ```bash
    cd client
    npm run dev
    ```

## Features

- **Interactive 3D Viewer**: Rotate, zoom, and pan 3D models.
- **Augmented Reality**: View models in your physical space (requires AR-compatible mobile device).
- **Premium UI**: Glassmorphism design, dark mode, and smooth animations.
- **Search & Filter**: Find content by category or keyword.
