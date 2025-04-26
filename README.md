# User Authentication Parsing App

This repository contains the backend and frontend code for the User Authentication Parsing App. The application includes user authentication, registration, login, and logout functionality, with API type generation for the frontend.

## Backend Setup

### Prerequisites
- Node.js (v16 or later)
- npm (v7 or later) or yarn
- SQLite

### Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd user-auth-parsing-app/Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start:dev
   ```

### API Documentation
- API documentation is available at: `http://localhost:3001/api/docs`

---

## Frontend Setup

### Prerequisites
- Node.js (v16 or later)
- npm (v7 or later) or yarn

### Installation
1. Navigate to the `Frontend` directory:
   ```bash
   cd ../Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Generate API types:
   - Ensure the backend server is running on `http://localhost:3001`.
   - Run the following command to generate API types:
     ```bash
     openapi-generator-cli generate -i http://localhost:3001/api/docs-json -g typescript-axios -o src/api
     ```

4. Start the development server:
   ```bash
   npm run start
   ```

---

## Project Structure

### Backend
```
Backend/
├── src/
│   ├── auth/
│   ├── database/
│   ├── user/
│   └── main.ts
├── database.sqlite
├── .env
└── package.json
```

### Frontend
```
Frontend/
├── src/
│   ├── api/
│   ├── components/
│   ├── app/
│   ├── layout/
│   ├── lib/
│   ├── store/
│   └── middleware.ts
├── .env
└── package.json
```

---

## Additional Notes
- For further API customization or extending the frontend components, refer to the generated API files in `src/api`.
- For database debugging, use VS Code extensions like "SQLite Viewer" to view and manage `database.sqlite`.  

Feel free to reach out for any clarifications or issues!

