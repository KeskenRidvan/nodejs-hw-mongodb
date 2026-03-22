## Task 🎯

You are asked to make improvements to your application working with the contacts collection. Add pagination, name sorting, filtering for the contacts collection, and input data validation. ✅

### Acceptance Criteria

- The task must be completed in the `hw4-validation` branch. 🌿
- When submitting the homework, provide links to the source files on `Github` and the deployed project of this homework (branch `hw4-validation`) via [render.com](https://render.com/). 🔗
- There should be no errors when the task code is executed. 🛠️
- The application file structure specified in the course materials must be followed. 📁

## Step-by-Step Task Completion 🚶‍♂️

#### Step 1

Create the `hw4-validation` branch from the `hw3-crud` branch and perform this task in the `hw4-validation` branch. 🌳

#### Step 2

Improve the processing of input data (validation) in your application. To do this: 🛡️

1. Create a `validateBody` function that takes a validation schema as an argument and returns middleware for validating the request body.
2. Add validation to the POST `/contacts` and PATCH `/contacts/:contactId` routes. Create validation schemas as defined in the MongoDB model properties in the `/db/models/contact.js` file. Also, add a minimum length rule of 3 characters and a maximum length rule of 20 characters for string fields. 📝
3. Add the `isValidId` middleware to check the validity of the ID and apply it to all routes working with IDs. 🆔

#### Step 3

Add pagination to the GET `/contacts` route. Use the following query parameters for this: 📑

- `page` — the page number of the request (default 1)
- `perPage` — the number of items per page (default 10)

In the server response, the `data` property should include the following:

- `data` — an array of contacts on the current page
- `page` — current page number
- `perPage` — number of items per page
- `totalItems` — total number of items in the collection
- `totalPages` — total number of pages
- `hasPrevious_page` — indicates if there is a previous page
- `hasNext_page` — indicates if there is a next page

The server response should be in the following format: 📤

```json
{
  "status": 200,
  "message": "Successfully found contacts!",
  "data": {
    "data": [
      /* contacts */
    ],
    "page": 2,
    "perPage": 4,
    "totalItems": 6,
    "totalPages": 2,
    "hasPreviousPage": true,
    "hasNextPage": false
  }
}
```

#### Step 4

For the **GET** `/contacts` route, add the ability to sort contact items by name. Use the following query parameters: 🔽

- `sortBy` — determines which property to sort by
- `sortOrder` — determines the sorting order (`asc` — ascending (default) or `desc` — descending)

#### Step 5 (optional) 🌟

For the GET `/contacts` route response, add the ability to filter contacts by the `isFavourite` property. Use the following query parameters:

- `type` — indicates the contact type, the value of the `contactType` property
- `isFavourite` — indicates whether the contact is a favorite

#### Step 6

Change the branch currently deployed on [render.com](https://render.com/) to `hw4-validation`. Make sure the changes are saved successfully. 🚀

#### :bangbang: It is important to verify that your deployed application is working on [render.com](https://render.com/) before submitting your homework to your mentor. Ensure you haven't forgotten to add environmental variables (env) during deployment and that all backend routes work as expected. ⚠️

Node.js Module 4 — Homework Tips (Validation) 💡

- The homework must be in the `hw4-validation` branch.
- The branch for Homework 4 should be created from the `hw3-crud` branch (it can only be created from the `main` branch if `hw3-crud` has been merged into `main`).
- Pay attention to the application's file structure as specified in the course materials. 🏗️
- In POST and PATCH routes, always validate the `body` data using appropriate middleware.
- Query parameters for pagination must be exactly `page` and `perPage`.
- Query parameters for sorting must be exactly `sortBy` and `sortOrder`.
- Filtering by the `isFavourite` field is not mandatory, but it will be beneficial to add. The query parameter for this filtering must be exactly `isFavourite`.
- Don't forget to deploy your application on render.com; select the deployment branch (`hw4-validation`) and include the link when submitting the assignment. 🌍
