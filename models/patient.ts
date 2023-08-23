import {  model, Schema } from "mongoose";
const patientShema = new Schema({
  id: {
      type: String,
      required: [true, 'set id for patient'],
    },
    time: {
      type: Array,
      required: [true, 'Set time for patient'],
    },
   
    name:{
      type:Array,
    },
    dateBirsday: {
      type: String,
    }
},{versionKey:false,timestamps:true})
const Patient = model("Patient", patientShema);
export default Patient;