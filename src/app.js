const express = require("express");
const cors = require("cors");
const hostname = "0.0.0.0";
const swaggerUi = require("swagger-ui-express");
const connectDB = require("./api/config/dbConfig");
const swaggerDocs = require("./api/config/swaggerConfig");
const port = 3000;
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, hostname, () => {
  console.log(`App connected ${port}`);
});
