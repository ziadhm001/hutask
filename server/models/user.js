import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  assigned: [
    {
      type: mongoose.ObjectId,
      ref: "Task",
    },
  ],
  created: [
    {
      type: mongoose.ObjectId,
      ref: "Task",
    },
  ],
});

userSchema.statics.signup = async function (
  username,
  email,
  password,
  name,
  role
) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ username });

  if (exists) {
    throw Error("username already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    username,
    email,
    password: hash,
    name,
    role,
    assigned: [],
    created: [],
  });

  return user;
};

userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });
  if (!user) {
    throw Error("اسم المستخدم خاطيء");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("كلمة المرور خاطئة    ");
  }

  return user;
};

userSchema.statics.findByRole = async function (data) {
  const users = this.find(data, { name: 1, assigned: 1 });
  return users;
};

userSchema.statics.findRole = async function (data) {
  const user = this.findById(data, { role: 1 });
  return user;
};

userSchema.statics.countUnassigned = async function () {
  const count = this.countDocuments({ assigned: [], role: "employee" });
  return count;
};

userSchema.statics.addCreatedTask = async function (task_id, user_id) {
  this.findByIdAndUpdate(
    { _id: user_id },
    { $push: { created: task_id } },
    { returnDocument: "after" }
  ).then((document) => {
    console.log(
      `User with _id: ${user_id} created a new task with _id: ${task_id}`
    );
  });
};

userSchema.statics.assignTask = async function (task_id, user_id) {
  this.findByIdAndUpdate(
    { _id: user_id },
    { $push: { assigned: task_id } },
    { returnDocument: "after" }
  ).then((document) => {
    console.log(
      `User with _id: ${user_id} was assinged a new task with _id: ${task_id}`
    );
  });
};

userSchema.statics.unAssignTask = async function (task_id, user_id) {
  this.findByIdAndUpdate(
    { _id: user_id },
    { $pull: { assigned: task_id } },
    { returnDocument: "after" }
  ).then((document) => {
    console.log(
      `User with _id: ${user_id} was unassinged from task with _id: ${task_id}`
    );
  });
};
export default mongoose.model("User", userSchema);
