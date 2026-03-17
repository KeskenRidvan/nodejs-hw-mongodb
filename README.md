# 🚀 Node.js & MongoDB Contacts API

Hello\! 👋

Are you ready to move to the next stage? This second homework will allow you to get more practice working with **Node.js**. 💻

While completing this assignment, you will build a server that works with a collection of contacts via HTTP requests. You will initialize the project, set up the server, connect to **MongoDB**, and create routes to manage your contacts. Don't forget to **deploy** your application on [render.com](https://render.com/). 🌍

We have also prepared a step-by-step implementation guide for you this time. Each step of this task will give you new experience and help you understand how **HTTP** requests work in a **Node.js** environment.

Don't waste time — **Go practice\! 🚀**

## 🎯 Task

You need to create an application that works with a contact collection where you can retrieve data for all contacts or a specific one by its ID via HTTP requests.

**Data file to upload:**
[contacts.json](https://drive.google.com/file/d/10GhBvRyu0xVxoIHo0kyv6GR2WEYRuozV/view)

**Local copy in the repo:** `src/db/data/contacts.json`

## ✅ Acceptance Criteria

- A repository named `nodejs-hw-mongodb` must be created.
- The task must be performed in the `hw2-mongodb` branch. 🌿
- When submitting the homework, provide links to the source files on `GitHub` and the deployed project on [render.com](https://render.com/) (from the `hw2-mongodb` branch).
- There should be no errors when the project code is executed. 🛠️

---

## 🛠️ Step-by-Step Implementation

#### Step 1: Project Initialization 🏗️

Initialize the project using the `npm init -y` command.

Add `eslint` to project dependencies and configure it according to the examples in Module 1 materials.
Add `.gitignore` and `.prettierrc` files to the root of the project with appropriate content.
Install `nodemon` as a development dependency. Add a "dev" script to the `scripts` section in `package.json` to run the server with nodemon.

#### Step 2: Server Setup 🖥️

Create a folder named `src` in the root of the project.
Create a file named `server.js` in the `src` folder. This file will contain the logic for the express server.
In `src/server.js`, create a function named `setupServer` that will create the express server. This function should include:

1.  Creating the server with the `express()` call.
2.  Setting up [cors](https://www.npmjs.com/package/cors) and [pino](https://github.com/pinojs/pino-http) logger.
3.  Returning a 404 error status and an appropriate message for non-existent routes.

<!-- end list -->

```json
{
  "message": "Not found"
}
```

4.  Starting the server on the port specified via the `PORT` environment variable, or port 3000 if not specified.
5.  Printing the message `"Server is running on port {PORT}"` to the console when the server starts successfully.

Don't forget to specify the environment variable in the `.env` file. 📄
Create the `src/index.js` file. Import and call the `setupServer` function in this file.

#### Step 3: MongoDB Connection 🍃

Create your own cluster on `mongodb` and define the `initMongoConnection` function in a separate file named `src/db/initMongoConnection.js` to establish the connection.

When creating a cluster in MongoDB Atlas, remember to configure network access to allow connections from any IP address:

1.  Log in to your MongoDB Atlas account and go to your project.
2.  Select your cluster or create a new one.
3.  Go to the "Network Access" section.
4.  Click the "+ ADD IP ADDRESS" button.
5.  Select "ALLOW ACCESS FROM ANYWHERE" or enter `0.0.0.0/0` in the "Access List Entry" field.
6.  Click "Confirm". 🔓

When successfully connected to your `mongodb` database, print the message `"Mongo connection successfully established!"` to the console.

The data required for the database connection should be placed in the following environment variables:

- MONGODB_USER
- MONGODB_PASSWORD
- MONGODB_URL
- MONGODB_DB

Use the [mongoose](https://www.npmjs.com/package/mongoose) package to work with `mongodb`. Call the `initMongoConnection` function in `src/index.js`. Ensure the database connection is established before the server starts. 🔗

#### Step 4: Models and Data 🗃️

Create a contact model named `Contact` in the `src/db` folder. The model should include the following fields:

- **name** — string, required
- **phoneNumber** — string, required
- **email** — string
- **isFavourite** — boolean, default false
- **contactType** — string, enum(‘work’, ‘home’, ‘personal’), required, default ‘personal’

Use `timestamps: true` to automatically generate `createdAt` and `updatedAt` fields.

Import the base contact set from `contacts.json` into your database using any UI tool (MongoDB Compass, etc.). Ensure the collection name in your code matches the one in the visual interface.

The local seed file is stored at `src/db/data/contacts.json`. If you want to import it from the command line, you can also run `npm run import:contacts`.

#### Step 5: Routes and Controllers 🛣️

Create a GET request by defining the `/contacts` path, which returns an array of all contacts.

1.  Register the path in `src/server.js`.
2.  Define a controller for this path.
3.  Create a service in the `src/services` folder with the corresponding entity name (`contacts.js`).
4.  The server response should have a 200 status code and include an object with the following properties:

<!-- end list -->

```json
{
  "status": 200,
  "message": "Successfully found contacts!",
  "data": []
}
```

5.  Check if a contact exists with the given ID. If the contact is not found, return a 404 status code with the following object:

<!-- end list -->

```json
{
  "message": "Contact not found"
}
```

#### ‼️ At this stage, you do not need to check for an invalid MongoDB ID. It is assumed the ID is always valid.

#### Step 7: Deployment 🚀

Deploy your application from the `hw2-mongodb` branch to [render.com](https://render.com/).

#### ‼️ Before submitting to your mentor, it is very important to check that your application on [render.com] is working. Ensure you added environment variables (env) during deployment\!

---

## 💡 Tips for the Assignment

- The assignment must be on the `hw2-mongodb` branch.
- Do **not** push `node_modules` to the repository (remember `.gitignore`). 🚫
- The project structure must match the one described in the task.
- Use the `.env` file for the variables:
  - PORT, MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB.
- Follow the response structure requirements strictly.
- Don't forget to include your **Render** deployment link in your submission\! 📎
