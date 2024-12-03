const express = require("express");
const { Router } = require("express");
const expenseRouter = Router();
const { userMiddleWare } = require("../middlewares/user");
const { UserModel } = require("../models/db");
const { ExpenseModel } = require("../models/db");
const {z} = require('zod');
const expensePayloadSchema = z.object({
  amount: z.number()
    .positive('Amount must be positive')
    .max(1000000, 'Amount cannot exceed 1,000,000')
    .refine(val => !isNaN(val), 'Amount must be a valid number'),
  category: z.string()
    .min(1, 'Category is required')
    .max(20, 'Category name too long')
    .refine(
      val => ['shopping', 'health', 'travel', 'food', 'entertainment'].includes(val.toLowerCase()),
      'Invalid category'
    ),
  description: z.string()
    .min(1, 'Description is required')
    .max(100, 'Description too long')
    .refine(val => val.trim().length > 0, 'Description cannot be empty')
    .refine(val => isNaN(val) && !/^\d+$/.test(val.trim()), 'Description cannot be a number')
    .refine(val => /^[a-zA-Z0-9\s\-_.,!?@#$%^&*()]+$/.test(val), 'Description contains invalid characters')
});
expenseRouter.get("/", userMiddleWare, async (req, res) => {
  try {
    const userId = req.userId;
    const expenses = await ExpenseModel.find({
      user: userId,
    });
    res.status(200).json({
      expenses: expenses,
      message: "expenses recorded",
    });
  } catch (e) {
    res.json({
      message: e,
    });
  }
});
expenseRouter.post("/", userMiddleWare, async (req, res) => {
  try {
    const { amount, category, description } = req.body;

    // Check if all required fields are present
    if (!amount || !category || !description) {
      return res.status(400).json({
        message: "Amount, category, and description are required"
      });
    }

    // Validate the input
    const validated = expensePayloadSchema.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json({
        message: validated.error.errors[0].message || "Invalid input"
      });
    }

    await ExpenseModel.create({
      amount,
      category: category.toLowerCase(),
      description,
      user: req.userId,
    });

    res.status(201).json({
      message: "expense added",
    });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({
      message: "Failed to add expense",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});
expenseRouter.put("/:id", userMiddleWare, async (req, res) => {
  try {
    const { amount, category, description } = req.body;
    const validated = expensePayloadSchema.safeParse(req.body);
    if(!validated.success)
    {
      res.status(400).json({
        message : validated.error.message
      })
      return;
    }
    const expenseId = req.params.id;
    const expense = await ExpenseModel.updateOne(
      {
        _id: expenseId,
        user: req.userId,
      },
      {
        amount,
        category,
        description,
      }
    );
    res.status(203).json({
      message: "expense changed",
      expense,
    });
  } catch (e) {
    res.json({
      message: e,
    });
  }
});
expenseRouter.delete("/:id", userMiddleWare, async (req, res) => {
  try {
    const expenseId = req.params.id;
    await ExpenseModel.deleteOne({
      _id: expenseId,
      user: req.userId,
    });
    res.status(200).json({
      message: "expense deleted",
    });
  } catch (e) {
    res.json({
      message: e,
    });
  }
});
module.exports = {
  expenseRouter: expenseRouter,
};
