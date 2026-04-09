require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const dbConnection = require("./databases/dbConnection");
const globalErrorHanddle = require("./src/utils/middleware/globalErrorHanddle");
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
// Routes
const helloRoutes = require("./src/modules/hello/hello.routes");
const hiRoutes = require("./src/modules/hi/hi.routes");
const sumRoutes = require("./src/modules/sum/sum.routes");
const bodyRoutes = require("./src/modules/body/body.routes");
const categoryRoutes = require("./src/modules/categories/categories.routes");
const subCategoryRoutes = require("./src/modules/subcategories/subcategories.routes");
const brandRoutes = require("./src/modules/brands/brands.routes");
const productRoutes = require("./src/modules/products/products.routes");

app.use("/hello", helloRoutes);
app.use("/hi", hiRoutes);
app.use("/sum", sumRoutes);
app.use("/body", bodyRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/subcategory", subCategoryRoutes);
app.use("/api/v1/brand", brandRoutes);
app.use("/api/v1/product", productRoutes);

// Global Error Handler (MUST BE LAST)
app.use(globalErrorHanddle);

// Start Server
const server = app.listen(port, () => {
  console.log(`🚀 Server is listening on port ${port}`);
});

// Handle unhandled rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection! 💥 Shutting down...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
