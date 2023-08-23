import {  model, Schema } from "mongoose";
const appointmensShema = new Schema({
  idPatient: {
      type: String,
      required: [true, 'set id for doctor'],
    },
    idDoctor: {
        type: String,
        required: [true, 'set id for doctor'],
      },
    time: {
      type: String,
    },
},{versionKey:false,timestamps:true})
const Appointmens = model("appointmens", appointmensShema);
export default Appointmens;