const { MONGO_URL } = require("../config/config");
const mongoose = require("mongoose");
mongoose.connect(`${MONGO_URL}`).then(() => {
  console.log("connected to db");
});
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
});
const ExpenseSchema = new Schema({
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now },
  description: String,
  user: { type: ObjectId, ref: 'Users', required: true }  // Changed from userId
});
const InsightsSchema = new Schema({
  user: { type: ObjectId, ref: 'Users', required: true },
  type: String,
  data: Object,
  generatedAt: { type: Date, default: Date.now }
});
const UserModel = mongoose.model("Users", UserSchema);
const ExpenseModel = mongoose.model("Expense", ExpenseSchema);
const InsightsModel = mongoose.model("Insights", InsightsSchema);
module.exports = {
  UserModel,
  ExpenseModel,
  InsightsModel,
};
