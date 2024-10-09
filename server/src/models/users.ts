import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    min: [3, 'First Name must be at least 6 characters long'],
    max: [28, 'First Name maximum 28 characters please!']
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    // min: 8,
    max: 12
  }
})

const User = mongoose.model('User', userSchema);
export default User;
