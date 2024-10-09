import mongoose from "mongoose";
const {Schema, model} = mongoose;

const colorSchema = new Schema({
  color: String
})

const Color = model('Color', colorSchema);

export default Color;

