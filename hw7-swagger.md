# Task 📋

### Acceptance Criteria ✅

- The task must be completed in the `hw7-swagger` branch.
- The homework submission must include links to the source files on `GitHub` and the deployed project of this homework (branch `hw7-swagger`) on [render.com](https://render.com/).
- There should be no errors when running the task code. 🛠️
- The application file structure specified in the course materials has been followed during implementation.

## Step-by-Step Task Implementation 🏗️

#### Step 1

Create the `hw7-swagger` branch from the `hw6-email-and-images` branch and perform this task in the `hw7-swagger` branch.

#### Step 2

Install the `@redocly/cli` package as a Dev dependency: 📦

```bash
npm install @redocly/cli --save-dev
```

Add new commands to the scripts section in the `package.json` file: ⚙️

```json
{
  "scripts": {
    "build": "npm run build-docs",
    "build-docs": "redocly bundle --ext json -o docs/swagger.json",
    "preview-docs": "redocly preview-docs"
  }
}
```

Create a file named `redocly.yaml` and add the following content:

```yaml
# See <https://redocly.com/docs/cli/configuration/> for more information.
apis:
  sample@v1:
    root: docs/openapi.yaml
extends:
  - recommended
rules:
  no-unused-components: error
theme:
  htmlTemplate: ./docs/index.html
  colors:
    primary:
      main: '#32329f'
  generateCodeSamples:
    languages:
      - lang: curl
      - lang: Node.js
      - lang: JavaScript
```

Create a folder named `docs` in the project root, create a file named `index.html` inside it, and add the following content: 📂

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>API Reference | ReDoc</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="favicon.png" />
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
    {{{redocHead}}}
  </head>

  <body>
    {{{redocHTML}}}
  </body>
</html>
```

Create the `docs/openapi.yaml` file with the following content: 📝

```yaml
openapi: 3.1.0
info:
  version: 1.0.0
  title: <your_application_name>
  license:
    name: Apache 2.0
    url: <http://www.apache.org/licenses/LICENSE-2.0.html>
  description: >
    <your_application_description>
tags:
  # tags you will use
servers:
  - url: <http://localhost:3000>
  - url: #link to the published site
paths:
  # endpoint links will be here
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
```

You can see your changes by running the `npm run preview-docs` command. 🔍

#### Step 3

Create a folder named `swagger`. Inside this folder, add two folders named `components` and `paths`. In the `components` folder, store parts of entities such as responses or entity descriptions. In the `paths` folder, store documentation according to the path structure. For example, for the `GET /contacts/:contactId` route, the corresponding file will be `/swagger/paths/contacts/{id}/get.yaml`. 🗄️

#### Step 4

Add documentation for the `GET /contacts/:contactId` route to the relevant file. It should include:

1. **tags** — The tag this endpoint belongs to (e.g., `Contacts`).
2. **summary** — A short description of the endpoint.
3. **operationId** — A unique operation ID.
4. **description** — A more detailed description.
5. **security** — Specify that we use authentication with a Bearer token. 🔑
6. **parameters** — Request parameters (the path parameter `:contactId` for this endpoint).
7. **responses** — Response options:
   - 200 Successful response. ✅
   - 404 Not Found response. ❌

Add the link to this endpoint in the `./docs/openapi.yaml` file.

#### Step 5

Following the same principle, add documentation for the following endpoints: 🛠️

- `GET /contacts`
- `PATCH /contacts/:contactId`
- `DELETE /contacts/:contactId`
- `POST /contacts`

Don't forget the `query` parameters for `GET /contacts` and `body` descriptions for requests that contain them.

#### Step 6 (Optional)

Optionally, write documentation for authentication endpoints. 🔐

#### Step 7

Add a separate route named `/api-docs` and display the documentation using the `swagger-ui-express` package. 🖼️

#### Step 8

Change the branch for deployment on [render.com](https://render.com/) to `hw7-swagger`. Ensure that changes are successfully deployed. 🌐

This task will help you create useful and informative documentation for your API. Good luck with completing the task! 🚀

#### ‼️ Important Note:

Before submitting your homework to your mentor, it is important to verify that your deployed application is running on [render.com](https://render.com/). Make sure you haven't forgotten to add environmental variables (env) during deployment and that all backend routes are working as expected. ✅

---

### Node.js Module 7 — Homework Tips (Swagger / OpenAPI) 💡

- The homework must be in the `hw7-swagger` branch.
- The branch for Homework 7 should be created from the `hw6-email-and-images` branch (it can only be created from the `main` branch if the `hw6-email-and-images` branch has been merged into `main`).
- Don't forget to edit the `scripts` field in the `package.json` file according to the requirements.
- The content of `redocly.yaml`, `openapi.yaml`, and `index.html` files should be as specified in the task description.
- Describe query parameters for `GET /contacts` and `body` definitions for requests with content.
- Documentation for authentication routes is not mandatory; however, it is recommended to add it to reinforce your practical skills. 🎓
- Don't forget to deploy your application on [https://render.com](https://render.com); select the deployment branch (`hw7-swagger`) and include the link when submitting the homework. 🌍
