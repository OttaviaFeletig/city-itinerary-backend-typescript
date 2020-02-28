import mongoose, { Schema, Document } from "mongoose";

export default interface CitySchemaData extends Document {
  name: string;
  country: string;
  // picture: string;
}
const City: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
  // picture: {
  //   type: String,
  //   required: true
  // }
});

module.exports = mongoose.model<CitySchemaData>("city", City);
