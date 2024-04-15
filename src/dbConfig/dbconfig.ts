import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    console.log("Db connected successfully !");
  } catch (error) {
    console.error("Error occurred while connecting DB:", error);
    process.exit(1); // Exit the process with a non-zero status code to indicate failure
  }
}

// import mongoose from "mongoose";

// export async function connecDB() {
//   try {
//     const connection = mongoose.connect(process.env.MONGO_URI!); //! specify that it exist always
//     connection.on("connected", () => {
//       console.log("Db connected sucessfully !");
//     });
//     connection.on("error", () => {
//       console.log("Error while connecting DB !");
//       process.exit();
//     });
//   } catch (error) {
//     console.log("Error occured while connecting DB !");
//   }
// }
