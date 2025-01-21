import mongoose from "mongoose";



  
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(mongodbUri, {
      dbName: "todo-new",
    });

    console.log(`\n🌿 MongoDB connected ! 🍃\n`);

    mongoose.connection.on(
      "error",
      console.error.bind(console, "Connection error:"),
    );

    process.on("SIGINT", () => {
      // Cleanup code
      mongoose.connection.close();

      console.log("Mongoose connection closed due to application termination");
      process.exit(0);
    });
  } catch (error) {
    console.error("MONGODB connection FAILED ", error);
    process.exit(1); // Exited with error
  }
};


connectDB();