const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://sonalimittal282002:hello1234@cluster0.53jiltk.mongodb.net/?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
      }
    );
    console.log("Mongo DB Connected");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
module.exports = connectDB;
