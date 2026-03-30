# Work Management

A simple project work management website built with HTML, CSS, Node.js, Express, and MongoDB.

## Features

- Separate admin login and worker login pages
- Worker registration
- Admin can create projects with duration and value
- Admin can assign workers to projects
- Worker can view assigned projects, duration, and project value

## Setup

1. Copy `.env.example` to `.env`
2. Update `MONGODB_URI` and `SESSION_SECRET`
3. Install dependencies:

```bash
npm install
```

4. Start MongoDB locally
5. Run the application:

```bash
npm start
```

6. Open `http://localhost:3000`

## Notes

- The first admin login creates the admin account.
- Workers should register first so the admin can assign them to projects.
