const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const hostname = "0.0.0.0";
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const port = 3000;
const app = express();