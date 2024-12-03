const express = require("express");
const z = require("zod");
const bcrypt = require("bcrypt");
const saltRounds = 5;
const { Router } = require("express");
const authRouter = Router();
const { UserModel } = require("../models/db");
const { JWT_SECRET } = require("../config/config");
const jwt = require("jsonwebtoken");
const userPayloadSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name too long')
    .refine(val => /^[a-zA-Z\s]+$/.test(val), 'Name can only contain letters and spaces'),
  email: z.string()
    .email('Invalid email format')
    .max(100, 'Email too long')
    .refine(val => !val.includes(' '), 'Email cannot contain spaces'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(14, 'Password cannot exceed 14 characters')
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain uppercase, lowercase, number and special character'
    )
});
const signinPayloadSchema = z.object({
  email: z.string()
    .email('Invalid email format')
    .max(100, 'Email too long')
    .refine(val => !val.includes(' '), 'Email cannot contain spaces'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(14, 'Password cannot exceed 14 characters')
});
authRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    const validated = userPayloadSchema.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json({
        message: validated.error.errors[0].message || "Invalid input"
      });
    }

    const duplicateEmail = await UserModel.findOne({ email });
    if (duplicateEmail) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    const hash = await bcrypt.hash(password, saltRounds);
    await UserModel.create({
      name,
      email,
      passwordHash: hash,
    });

    res.status(201).json({
      message: "User created successfully"
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ 
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});
authRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const validated = signinPayloadSchema.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json({
        message: validated.error.errors[0].message || "Invalid input"
      });
    }

    const currentUser = await UserModel.findOne({ email });
    if (!currentUser) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      currentUser.passwordHash
    );
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { userId: currentUser._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: "Login successful",
      token
    });
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ 
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});
module.exports = {
  authRouter: authRouter,
};
