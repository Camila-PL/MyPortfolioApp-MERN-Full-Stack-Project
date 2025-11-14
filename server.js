//import app from "./server/express.js";
//import router from "./server/assets-router.js"; 

//app.use("/src", router);

//const PORT = 3000;
//app.listen(PORT, () => {
// console.log(`Server running at http://localhost:${PORT}/`);
//});

//export default app;

import mongoose from "mongoose";
import app from "./server/express.js";
import config from "./config/config.js";

mongoose.set("strictQuery", true);

mongoose.connect(config.mongoUri)
  .then(() => {
    console.log("MongoDB connected successfully");
    const PORT = config.port || 3000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
  });

