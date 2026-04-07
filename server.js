require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const dbConnection = require("./databases/dbConnection");

// Initialize Express app
const app = express();
const port = process.env.PORT || 8000;

// Connect to Database
dbConnection();

// Middleware
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use((err,req,res,next)=>{
  res.status(400).json(err);
})

// Routes
const helloRoutes = require("./src/modules/hello/hello.routes");
const hiRoutes = require("./src/modules/hi/hi.routes");
const sumRoutes = require("./src/modules/sum/sum.routes");
const bodyRoutes = require("./src/modules/body/body.routes");
const categoryRoutes = require("./src/modules/categories/categories.routes");
app.use("/hello", helloRoutes);
app.use("/hi", hiRoutes);
app.use("/sum", sumRoutes);
app.use("/body", bodyRoutes);
app.use("/api/v1/category", categoryRoutes);
// Start Server
app.listen(port, () => {
  console.log(`🚀 Server is listening on port ${port}`);
});
