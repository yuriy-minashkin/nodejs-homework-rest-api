require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;
const db = process.env.MONGODB_URI;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});

mongoose
  .connect(db)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
