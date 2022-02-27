import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import Car from "./models/carModel.js";
import generateToken from "./utils/generateToken.js";
import multer from "multer";
import bodyParser from "body-parser";
import cors from "cors";

colors.enable();

dotenv.config();

const app = express();

app.use(express.static("./frontend/public"));
app.use("./frontend/public", express.static("./frontend/public"));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

await connectDB();

app.use(express.json());

// ##################### User Api #######################

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
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found!");
    }
  } catch (err) {
    res.status(404).send("User not found!");
  }
});

// ##################### Car Api #######################

const storage = multer.diskStorage({
  // destination for files
  destination(req, file, callBack) {
    callBack(null, "./backend/uploads/images");
  },

  // add the extention
  filename(req, file, callBack) {
    callBack(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

// @desc    Create a car
// @route   POST /api/car
// @access  Private/Admin
app.post("/api/car", upload.single("image"), async (req, res) => {
  const { name, model, SKU, price, userId } = req.body;
  // const path = req.file.path.replace(/\\/g, "/");
  try {
    const userObj = await User.findById({ _id: userId });

    const car = new Car({
      name: name,
      model: model,
      SKU: SKU,
      price: price,
      image: req.file.filename,
      user: userObj,
    });

    const createdCar = await car.save();
    res.status(200).json(createdCar);
  } catch (err) {
    res.status(400).send("Could not add new car!");
  }
});

// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
app.get("/api/cars", async (req, res) => {
  try {
    const cars = await Car.find({});
    res.status(200).json(cars);
  } catch (err) {
    res.status(404).send("Not found cars!");
  }
});

// @desc    Get single car by Id
// @route   GET /api/cars/:id
// @access  Public
app.get("/api/cars/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).send("Car not found!");
    }
  } catch (err) {
    res.status(404).send("Car not found!");
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
