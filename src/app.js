const express = require("express");
const cors = require("cors");
const hostname = "0.0.0.0";
const swaggerUi = require("swagger-ui-express");
const connectDB = require("./api/config/dbConfig");

const swaggerDocs = require("./api/config/swaggerConfig");
const port = 3005;

const userRoute = require("./api/routes/user.route");
const sessionRoute = require("./api/routes/votingSession.route");
const voteRoute = require("./api/routes/vote.route");
const musicRoute = require("./api/routes/managementMusic.route");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, hostname, () => {
  console.log(`App connected ${port}`);
});

app.use("/api", userRoute, sessionRoute, voteRoute, musicRoute);
