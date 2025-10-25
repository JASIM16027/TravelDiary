# TravelDiary

Lightweight travel diary backend focused on secure user authentication and logging of login attempts.

## Project overview
This project implements secure authentication with:
- Rate-limited login attempts
- Password verification against hashed values
- Logging of every login attempt (email, success, IP, user agent, timestamp)
- Account lockout after excessive failed attempts

Files of interest:
- routes/auth.js — authentication routes
- middleware/auth.js — authentication middleware, rate limiting, lockout (expected)
- models/LoginAttempt.js — schema for storing login attempt logs
- tests/testLoginAttempt.js — script to test LoginAttempt persistence

## Prerequisites
- Node.js (>=16)
- npm
- A MongoDB instance (local mongod, MongoDB Atlas, or other)
- Redis (if middleware uses Redis for lockouts/rate tracking) — optional if using express-rate-limit in-memory

If your system uses ES modules, package.json contains `"type": "module"`; test and model files use ES module imports.

## Installation
1. Clone repo and install deps:
   ```
   cd /media/jasim/9327b5b8-38a4-482a-ac42-402133e96629/TravelDiary
   npm install
   ```
2. Ensure MongoDB is available. For local testing you can use:
   - system MongoDB (service named `mongodb` on some distros) or
   - MongoDB Atlas — set MONGO_URI accordingly.

3. (Optional) Start Redis if the middleware uses Redis:
   ```
   sudo service redis-server start
   ```

## Environment variables
Create a `.env` or export env vars used by your app. Typical variables:
- PORT (default 3000)
- MONGO_URI (e.g. `mongodb://127.0.0.1:27017/travel-diary`)
- REDIS_URL (if used, e.g. `redis://127.0.0.1:6379`)
- JWT_SECRET (if issuing JWTs)
- BCRYPT_SALT_ROUNDS (optional override)

## Run the server
Start your server (replace `server.js` with your main file if different):
```
node server.js
```
Or with nodemon:
```
npx nodemon server.js
```

## Endpoints
Below are the endpoints discovered in the project and their behavior. If you add more route files, open them and I can extend this documentation.

### POST /api/auth/login
- Purpose: Authenticate a user using email/username and password.
- Middleware applied:
  - Rate limiter — limits repeated requests (default configured to 5 attempts per 15 minutes).
  - authenticate middleware — verifies credentials, logs attempts, enforces lockout on too many failures.
- Request body (JSON):
  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```
- Success response (HTTP 200):
  ```json
  { "message": "Login successful" }
  ```
  - The authenticate middleware is expected to attach the authenticated user to `req.user`. In a full implementation it would usually return a session cookie or JWT.
- Failure responses:
  - 401 Unauthorized — invalid credentials
  - 423 Locked — account locked due to too many failed attempts
  - 429 Too Many Requests — global rate limiter triggered
  - 500 Internal Server Error — unexpected error
- Logging:
  - Each login attempt is recorded in `models/LoginAttempt.js` with fields:
    - email
    - success (boolean)
    - ip
    - userAgent
    - timestamp

## Models
- models/LoginAttempt.js (ES module)
  - Schema fields: email, success, ip, userAgent, timestamp
  - Used to persist login attempt history for audit/monitoring.

## Tests / utilities
- tests/testLoginAttempt.js — ES module script to connect to MongoDB and create/read LoginAttempt records.
  - Run:
    ```
    node tests/testLoginAttempt.js
    ```
  - Important: Because the project uses ES modules (`"type": "module"` in package.json), the test file uses `import` syntax. Do not run with `require`.

## Notes & troubleshooting
- If Node complains `require is not defined`, use ES module imports or rename files to `.cjs` and switch package.json `type` accordingly.
- If `mongod`/`mongod.service` is not found on your OS, either:
  - Install MongoDB from your distribution repo (`sudo apt install mongodb`) or
  - Use MongoDB Atlas and set `MONGO_URI`.
- If package installation for `mongodb-org` fails with unmet dependencies, prefer distribution packages or Atlas.

## Security considerations
- Passwords must be stored hashed (bcrypt).
- Rate limiting and account lockout are implemented to mitigate brute-force attacks.
- All login attempts are logged for monitoring and incident response.
- For production:
  - Use TLS (HTTPS)
  - Use a managed DB or secure DB access (no open firewall ports)
  - Store secrets in environment variables or secret manager
  - Monitor Redis/MongoDB resource usage and logs

## Extending the README
If you want the README to document every endpoint in the project, open other route files under `routes/` and I will add them to this README with request/response examples.
