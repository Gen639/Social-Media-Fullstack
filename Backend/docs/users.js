// users.js
module.exports = {
  paths: {
    "/": {
      post: {
        tags: {
          Users: "Post user",
        },
        description: "Posts user",
        operationId: "postUser",
        parameters: [],
        responses: {
          200: {
            description: "User was posted",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/userInput",
                },
              },
            },
          },
        },
      },
    },
    "/login": {
      post: {
        tags: {
          Users: "User login",
        },
        description: "User login",
        operationId: "loginUser",
        parameters: [],
        responses: {
          200: {
            description: "succesfully logged in",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/userLogin",
                },
              },
            },
          },
        },
      },
    },
  },
};
