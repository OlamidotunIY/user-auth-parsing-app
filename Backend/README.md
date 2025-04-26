# User Authentication and Parsing Application

This is a NestJS application with SQLite as the database, providing user authentication and data parsing features. Follow the steps below to set up and run the application on your local machine.

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v16 or later)
- **npm** (v7 or later)
- **SQLite** (optional: to view or manage the SQLite database)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository_url>
cd user-auth-parsing-app/Backend
```

### 2. Install Dependencies

Run the following command to install the required packages:

```bash
npm install
```


### 3. Start the Application

To start the application in development mode, run:

```bash
npm run start:dev
```

The server should now be running on `http://localhost:3000`.

### 4. Testing the API

You can use tools like Postman or cURL to test the API endpoints. Example endpoints:

- **Register:** `POST http://localhost:3000/auth/register`
- **Login:** `POST http://localhost:3000/auth/login`
- **Logout:** `POST http://localhost:3000/auth/logout`

### 5. Managing the SQLite Database

You can use a SQLite viewer or extension to view or manage the database file (`database.sqlite`). For VS Code:

1. Install the SQLite extension ([SQLite Viewer](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite)).
2. Open the database file from the project directory.

## Scripts

- **`npm run start`**: Starts the application.
- **`npm run start:dev`**: Starts the application in development mode.

## Notes

- Ensure the `synchronize` option in `database.provider.ts` is set to `false` in production.
- For security, never expose sensitive environment variables publicly.

For any issues or questions, please contact the maintainer or open an issue in the repository.

### API Documentation
- API documentation is available at: `http://localhost:3001/api/docs`

