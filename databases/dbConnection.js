const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URL, {
        serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of hanging
    })
    .then(() => {
      console.log("✅ Database connected successfully to:", mongoose.connection.name);
    })
    .catch((error) => {
      console.log("❌ Error connecting to database!");
      console.error("Error Message:", error.message);
      console.error("Error Code:", error.code);
    });
};

module.exports = dbConnection;
