## 🎯 Task

Continue developing your application working with the contacts collection. Add a collection for users and create appropriate routes: register, login, logout, and refresh. Complete the logic of existing contact routes with authentication.

### ✅ Acceptance Criteria

- The task must be completed in the `hw5-auth` branch. 🌿
- The submission must include links to the source files on `GitHub` and the deployed project on [render.com](https://render.com/) (branch `hw5-auth`). 🔗
- The code must run without errors. ❌🐞
- The application file structure specified in the course materials must be followed. 📂

---

## 🛠 Step-by-Step Implementation

#### Step 1 🌿

Create the `hw5-auth` branch from the `hw4-validation` branch and perform the task in this new branch.

#### Step 2 🏗️

1. Create a `User` model with the following fields:
   - `name` — string, required
   - `email` — string, email, unique, required
   - `password` — string, required
   - `createdAt` — creation date
   - `updatedAt` — update date

2. Create a `Session` model with the following fields:
   - `userId` — string, required
   - `accessToken` — string, required
   - `refreshToken` — string, required
   - `accessTokenValidUntil` — Date, required
   - `refreshTokenValidUntil` — Date, required

#### Step 3 📝

Create a POST `/auth/register` route for new user registration. The request body must include:

- `name` — required
- `email` — required
- `password` — required (Note: passwords must be hashed using the `bcrypt` library) 🔒

**Processing includes:**

1. Registering the route in `src/routers/auth.js`.
2. Validating incoming data. ✅
3. Defining the controller in `src/controllers/auth.js`.
4. Creating a service in `src/services/auth.js`.
5. Ensuring the email is unique; otherwise, return a 409 error with the message "Email in use". 📧
6. On success, return a **201** status with `status`, `message` ("Successfully registered a user!"), and `data` (excluding the password!).

#### Step 4 🔑

Create a POST `/auth/login` route for user authentication. Request body: `email` and `password`.

**Processing includes:**

1. Verifying credentials. If invalid, return a 401 error. ⚠️
2. If valid, create a session, save access/refresh tokens, and delete any old sessions.
3. Set lifespan: 15 minutes for access token, 30 days for refresh token. ⏳
4. Save the refresh token in cookies and return the access token in the response body.
5. On success, return a **200** status and the `accessToken`.

#### Step 5 🔄

Create a POST `/auth/refresh` route to refresh the session based on the refresh token stored in cookies.

- Delete the old session and create a new one following the login logic.
- Return a **200** status with the new `accessToken`.

#### Step 6 🚪

Create a POST `/auth/logout` route to delete the session based on the session ID and token in cookies.

- Delete the current session.
- On success, return a **204 No Content** status.

#### Step 7 🛡️

Create an `authenticate` middleware.

- It should identify the user using the Bearer token from the Authorization header and attach them to `req.user`. 👤
- If the token is expired, return a 401 error: "Access token expired".
- **Apply this middleware to all contact routes.**

#### Step 8 👥

Expand the `Contact` model with a mandatory `userId` field.

- Modify POST `/contacts` to include `req.user._id`.
- Update all contact routes so users can **only** interact with their own data using Mongoose methods like `find({ userId: ... })`.

#### Step 9 🌐

Update your deployment on [render.com](https://render.com/) to the `hw5-auth` branch.

---

### ⚠️ Important Note

Before submitting to your mentor, verify that the application works on [render.com]. Don't forget to add your environment variables (`.env`) and test all backend routes! ❗

---

### ✨ Homework Tips (Auth)

- Ensure you are working in the `hw5-auth` branch.
- Always validate `body` data using appropriate middleware. 🧪
- Handle duplicate email errors correctly.
- Strictly follow the token lifespan and storage requirements (Cookies vs. Body).
- **Mandatory:** Users must only access their own collections via `userId`. 🔐
