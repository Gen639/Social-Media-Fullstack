module.exports = {
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
    schemas: {
      user: {
        type: "object",
        properties: {
          username: {
            type: "string",
            description: "Name of the user. Requiered",
            example: "Jon",
          },
          email: {
            type: "string",
            unique: true,
            description: "Email of the user",
            example: "example@example.com",
          },
          password: {
            type: "string",
            description: "Password for the account",
            example: "password",
          },
          role: {
            type: "string",
            description: "role of the user, asigned automatically on register",
            example: "user",
          },
          tokens: {
            type: "[]",
            description: "provided on login, and erazed on logout",
            example: " number",
          },
          likedPosts: {
            type: "array",
            description:
              "the id of the post is pushed to array when the post is liked by the user",
          },
          publishedPostsIds: {
            type: "array",
            description:
              "When user publish a post, the id of the posy is beign pushed to this array",
          },
          commentedPostsIds: {
            type: "array",
            description:
              "When user comments a post the post's id is pushed to the array",
          },
        },
      },
      userInput: {
        type: "object",
        properties: {
          username: {
            type: "string",
            description: "Name of the user. Requiered",
            example: "Jon",
          },
          email: {
            type: "string",
            unique: true,
            description: "Email of the user",
            example: "example@example.com",
          },
          password: {
            type: "string",
            description: "Password for the account",
            example: "password",
          },
        },
      },
      userLogin: {
        type: "object",
        properties: {
          email: {
            type: "string",
            obligatory: true,
            description: "Email of the user",
            example: "example@example.com",
          },
          password: {
            type: "string",
            description: "Password for the account",
            example: "password",
          },
        },
      },
    },
  },
};
