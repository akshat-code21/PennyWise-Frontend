const express = require("express");
const { Router } = require("express");
const expenseRouter = Router();
const { userMiddleWare } = require("../middlewares/user");
const { UserModel } = require("../models/db");
const { ExpenseModel } = require("../models/db");
const {z} = require('zod');
const expensePayloadSchema = z.object({
  amount : z.number(),
  category : z.string(),
  description : z.string().maxLength(20)
})
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
    const validated = expensePayloadSchema.safeParse(req.body);
    if(!validated.success)
    {
      res.status(400).json({
        message : validated.error.message
      })
      return;
    }
    await ExpenseModel.create({
      amount,
      category,
      description,
      user: req.userId,
    });
    res.status(201).json({
      message: "expense added",
    });
  } catch (error) {
    console.error(error);
    res.json({
      error: error,
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
