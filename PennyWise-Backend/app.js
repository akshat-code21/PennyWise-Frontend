const express = require("express");
const app = express();
const cors = require("cors");
const { authRouter } = require('./routes/auth')
const { expenseRouter } = require('./routes/expense')
const { insightsRouter } = require('./routes/insights');
app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.json({
        message : "welcome to pennywise"
    });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/expenses", expenseRouter);
app.use("/api/v1/insights", insightsRouter);
app.listen(3000, () => {
  console.log("server is up on port 3000");
});
