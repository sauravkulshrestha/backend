
const todoModel = require("../model/todoModel");


module.exports.getTask = async function getTask(req, res) {

    let user = await todoModel.find();
    console.log(user);
    res.json({
        status: "success",
        user: user,
    });
};

module.exports.createTask = async function createTask(req, res) {
  try {
    let data = req.body;
    data.updatedDate = getIstTime();
      console.log(data);
    let user = await todoModel.create(data);
    res.status(200).json({
      status: "success",
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: err.message,
    });
  }
};



module.exports.deleteTask = async function deleteTask(req , res) {
    try {
        let id = req.params.id;
        let user = await todoModel.findByIdAndDelete(id);
        res.status(200).json({
            status: "success",
            user: user,
        });
    } catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message,
        });
    }
}

module.exports.updateTask = async function(req , res) {
    try {
        let data = req.body;
        let id = req.params.id;
        data.updatedDate = getIstTime();
        let user = await todoModel.findByIdAndUpdate(id , data);
        res.status(200).json({
            status: "success",
            user: user,
        });
    } catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message,
        });
    }
}

function getIstTime() {

    var currentTime = new Date();

    var currentOffset = currentTime.getTimezoneOffset();

    var ISTOffset = 330;   // IST offset UTC +5:30

    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

    return ISTTime;
}
