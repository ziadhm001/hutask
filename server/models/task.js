import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  department: {
    type: String,
  },
  service: {
    type: String,
  },
  element: {
    type: String,
  },
  reason: {
    type: String,
  },
  progress: {
    type: Number,
  },
  date: {
    type: Number,
  },
  status: {
    type: String,
  },
  assigned: [
    {
      type: mongoose.ObjectId,
      ref: "User",
    },
  ],
  creator: {
    type: mongoose.ObjectId,
    ref: "User",
  },
});

taskSchema.statics.count = async function () {
  const count = this.countDocuments({});
  return count;
};

taskSchema.statics.Mcount = async function (data) {
  const count = this.countDocuments(data);
  return count;
};

taskSchema.statics.countCompleted = async function () {
  const count = this.countDocuments({ status: "تم الانتهاء" });
  return count;
};

taskSchema.statics.McountCompleted = async function (data) {
  const count = this.countDocuments({
    status: "تم الانتهاء",
    department: data.department,
  });
  return count;
};

taskSchema.statics.countOngoing = async function () {
  const count = this.countDocuments({ status: "جاري التنفيذ" });
  return count;
};

taskSchema.statics.McountOngoing = async function (data) {
  const count = this.countDocuments({
    status: "جاري التنفيذ",
    department: data.department,
  });
  return count;
};

taskSchema.statics.assignUser = async function (task_id, user_id) {
  this.findByIdAndUpdate(
    { _id: task_id },
    {
      status: "جاري التنفيذ",
      $push: { assigned: user_id },
    },
    { returnDocument: "after" }
  ).then((document) => {
    console.log(
      `Task with _id: ${task_id} was assinged to a new user with _id: ${user_id}`
    );
  });
};

taskSchema.statics.unAssignUser = async function (task_id, user_id) {
  this.findByIdAndUpdate(
    { _id: task_id },
    { $pull: { assigned: user_id } },
    { returnDocument: "after" }
  ).then((document) => {
    console.log(
      `Task with _id: ${task_id} was unassinged from user with _id: ${user_id}`
    );
  });
};
export default mongoose.model("Task", taskSchema);
