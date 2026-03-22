## Task 📋

**Acceptance Criteria**

- The task must be completed in the `hw6-email-and-images` branch. 🌿
- The homework submission must include links to the source files on `GitHub` and the deployed project on [render.com](https://render.com/) (from the `hw6-email-and-images` branch). 🔗
- No errors should occur when running the task code. ✅
- The application file structure specified in the course materials must be followed. 📂

---

## Step-by-Step Task Completion 🛠️

#### Step 1

Create the `hw6-email-and-images` branch from the `hw5-auth` branch and perform this assignment in the `hw6-email-and-images` branch.

#### Step 2

Create an account at [brevo.com](https://www.brevo.com/). This service will be used to send email messages. 📧

#### Step 3

Create the `POST /auth/send-reset-email` route. It should receive the user's email address (property `email`) in the request body. 📥

Organize the sending of an email to the user with a password reset link using the `nodemailer` package (use credentials obtained from Brevo to connect to the SMTP server). 🛰️

The link should consist of the following components:

- The domain where our frontend is located (retrieve from environment variables);
- The path to the password reset page - `/reset-password`;
- A `token` query parameter, which is a JWT token generated on the backend containing the user's email address. Set the token's expiration time to 5 minutes. ⏳

The general link will look like this:

```text
https://<your-frontend-domain>/reset-password?token=<jwt-token>
```

At this stage, all sensitive data must be moved to environment variables. 🔐
Data required for Brevo connection:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `SMTP_FROM` (the value must be the email used to register the account on Brevo)

Variable used to sign our token:

- `JWT_SECRET` (e.g., `VOQjLdrpG1TWCHhDzv3o`)

The domain where our frontend is located:

- `APP_DOMAIN` (currently "http://localhost:3000/auth" can be used)

#### ‼️ Don't forget to add these environment variables to the `.env.example` file.

Handle the following errors:

- Body validation error (use `validateBody` middleware); ❌
- User not found in the database (throw an error with a 404 status code and the message `"User not found!"` using [http-errors](https://www.npmjs.com/package/http-errors));
- Failed to send email (throw an error with a 500 status code and the message `"Failed to send the email, please try again later."`).

When the email is sent successfully, the server response should be a 200 status code with an object:

```json
{
  "status": 200,
  "message": "Reset password email has been successfully sent.",
  "data": {}
}
```

#### Step 4

Create the `POST /auth/reset-pwd` route. 🔄
It should accept the following properties in the body:

- `token` property — The JWT token sent in the password reset link from the previous step;
- `password` property — The new password.

Ensure the JWT token received in the body is valid. 🕵️‍♂️
Handle the following errors:

- Body validation error;
- User not found in the database;
- Expired or corrupted token (pass 401 status and `"Token is expired or invalid."` to `createHttpError`).

If the token is valid, for the user with the email address contained in the token:

- Update the password; 🆙
- Delete the current session for this user. 🧹

When the password is changed successfully, the server response should be a 200 status code with an object:

```json
{
  "status": 200,
  "message": "Password has been successfully reset.",
  "data": {}
}
```

#### Step 5

Register on [Cloudinary](https://cloudinary.com/). ☁️

#### Step 6

Extend the functionality with photo upload capabilities for the following routes: 📸

- `POST /contacts`
- `PATCH /contacts/:contactId`

1. Add `Content-Type: multipart/form-data` support for these endpoints.
2. Add a `photo` field of type `String` to the `Contact` model. 🖼️
3. Implement file uploading to [Cloudinary](https://cloudinary.com/). Save the photo file link received from Cloudinary into the `photo` field of the respective contact document. Ensure the photo link is retrievable in all contact-related endpoints.

#### Step 7

Change the deployment branch of your project on [render.com](https://render.com/) to `hw6-email-and-images`. Verify that the changes are deployed successfully. 🚀
This task will help you build a convenient and secure mechanism for working with user passwords and image uploads. Good luck! 🌟

#### ‼️ Important: Before submitting your homework to your mentor, verify that your deployed app is running on [render.com]. Make sure to add environment variables (env) during deployment and ensure all backend routes work as expected. ✅

---

### Node.js Module 6 — Homework Tips (Email & Images) 💡

- Homework must be in the `hw6-email-and-images` branch.
- The branch should be created from `hw5-auth`.
- Follow the application file structure specified in the course materials. 📂
- **Strictly adhere** to the naming of environment variables mentioned in the task description; this helps your mentor run your code locally. 🔑
- Don't forget to add new environment variable names to `.env.example`.
- **Always verify** the received JWT token; it must not be expired or corrupted. 🛡️
- The `Contact` model must be extended with the `photo` property.
- For images, perform file storage **only** via Cloudinary. ☁️
- Don't forget to deploy on render.com and include the link. 🌐
