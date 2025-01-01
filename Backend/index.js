const express = require("express");
const app = express();
const { dbConnection } = require("./config/config");
const { typeError } = require("./middlewares/errors");
const swaggerUI = require("swagger-ui-express");
const docs = require("./docs/index");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

dbConnection();
app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));
app.use("/comments", require("./routes/comments"));
app.use("/uploads", require("./routes/uploads"));

app.use(typeError);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));
app.listen(PORT, "192.168.1.72", () =>
  console.log(`Server started at port ${PORT}`)
);
