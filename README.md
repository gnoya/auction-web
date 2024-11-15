# Demo auction web

## Stack: React, Vite, Tailwind, Shadcn, Prisma and Typescript

This repository contains a demo auction web application that shows how I develop frontend and backend applications. It is intended to show my design patterns, coding style, project structure, and the tools I use.

## Getting started:

1. **Prerequisites:**

   - Ensure Docker and Docker Compose are installed on your system.

2. **Configuration:**

- **Note:**
  - The `.env` files located in the `backend` and `frontend` directories are provided for convenience and should not be used in a production environment. For production, manage environment variables securely using Docker secrets or other secure methods.

3. **Running the project:**

   - Open a terminal and navigate to the root directory of the project.
   - Execute `docker-compose up -d` to build the images, start the containers, and run the services in the background.

4. **Accessing the services:**
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:3100`

## Project Structure:

- `backend`: Contains the backend API built with Node.js and Express.
  - You will see controllers, services, repositories, test, etc
- `frontend`: Contains the frontend built with Next.js.
  - You will see components, pages, hooks, contexts, providers, layouts, etc.
- `docker-compose.yml`: Docker Compose configuration file for managing and starting the services.

## Database migration and seeding:

Database migration involves managing the database schema, which includes creating tables, modifying tables, and deleting tables. Database seeding involves populating your database with initial data, which is useful for development and testing purposes.

### Migrations and seeders are automatically run when the `backend` container is started.
