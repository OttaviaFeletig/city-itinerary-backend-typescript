import mongoose, { Schema, Document } from "mongoose";

export default interface EventSchemaData extends Document {
  name: string;
  city: object;
  picture: string;
  description: string;
  place: object;
  date: Date;
  duration: number;
  cost: number;
  category: string;
}
const Event: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: Object,
    required: true
  },
  picture: {
    type: String
  },
  description: {
    type: String
  },
  place: {
    type: Object,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  cost: {
    type: Number
  },
  category: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model<EventSchemaData>("event", Event);
