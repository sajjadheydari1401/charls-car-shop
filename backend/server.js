import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import generateToken from "./utils/generateToken.js";

colors.enable();

dotenv.config();

await connectDB();

const app = express();
app.use(express.json());

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
app.post("/api/user", async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).send("User already exists!");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Auth user & get token
// @route   POST /api/login
// @access  Public
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.password === password) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
app.get("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById({_id: id });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).send("User not found!");
  }
});

if (process.env.NODE_ENV === "development") {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
      .underline
  );
});
