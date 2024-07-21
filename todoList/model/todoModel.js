const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  task: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
  },
  status: {
    type: Boolean,
    required: true,
  },
  updatedDate: {
    type: Date,
    required: true,
  },
});

todoSchema.pre("save", function (next) {
  console.log("pre hooks for save -->" + this);
  next();
});
todoSchema.pre("create", function (next) {
  console.log("create hooks for save -->" + this);
  next();
});

const todoModel = mongoose.model("todoModel", todoSchema);
module.exports = todoModel;
