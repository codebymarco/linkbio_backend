const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const publicRoutes = require("./routes/publicRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/portfolio", publicRoutes);
app.use("/api/users", userRoutes);
app.use("/files", express.static("files"));

app.get('/', (req, res) => {
  console.log('Server hit');
  res.send('Server hit');
});

mongoose
  .connect(
    "mongodb+srv://miguelmarcoramcharan:miguelmarcoramcharan@marcoramcharan.ji59fop.mongodb.net/linkbio?retryWrites=true&w=majority&appName=MARCORAMCHARAN"
  )
  .then(() => {
    console.log("connected to the database");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(process.env.PORT || 5000, () => {
  console.log("server running");
});
