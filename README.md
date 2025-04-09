# Task Management Application

A full-stack task management application built with Angular and Node.js.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)
- Angular CLI (`npm install -g @angular/cli`)
- MongoDB (running locally or have a MongoDB Atlas connection string)


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.3.
## Getting Started

1. Navigate to the frontend directory:
 cd frontend
2. Install dependencies:
 npm install

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Application Features

### Authentication

- User registration with email and password
- User login with JWT authentication
- Protected routes using Auth Guard

### Task Management

- Create new tasks
- View list of tasks
- Update existing tasks
- Delete tasks
- Mark tasks as complete/incomplete

### User Interface

- Responsive design
- Form validation
- Error handling
- Loading states
- Navigation menu

## Project Structure

### Frontend (Angular)

src/

├── auth/           # Authentication components

├── core/           # Core services and guards
├── tasks/          # Task-related components

├── navbar/         # Navigation component

└── app.module.ts   # Main application module

## Development Process

1. Start the backend server first
2. Start the Angular development server
3. Register a new account
4. Login with your credentials
5. Start managing your tasks!

## Common Issues & Troubleshooting

1. **Backend Connection Error**
   - Ensure MongoDB is running
   - Check if the correct MongoDB URI is in `.env`
   - Verify the backend is running on port 3000

2. **Frontend Issues**
   - Clear browser cache
   - Check console for errors
   - Ensure all dependencies are installed


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


