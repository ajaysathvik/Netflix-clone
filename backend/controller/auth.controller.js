import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generatetoken.js";

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be atleast 6 characters long",
      });
    }

    const existingUserbyemail = await User.findOne({ email });

    if (existingUserbyemail) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const existingUserbyusername = await User.findOne({ username });
    if (existingUserbyusername) {
      return res.status(400).json({
        success: false,
        message: "User with this username already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const ProfilePicture = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

    const image = ProfilePicture[Math.floor(Math.random() * 3)];

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image,
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    res.status(201).json({
      success: true,
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        image: newUser.image,
        searchHistory: newUser.searchHistory,
        _id: newUser._id,
      },
    });
  } catch (error) {
    console.log("Error in signup: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
        searchHistory: user.searchHistory,
      },
    });
  } catch (error) {
    console.log("Error in login: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function authCheck(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ success: true, user:req.user });
  } catch (error) {
    console.log("Error in authCheck: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}
