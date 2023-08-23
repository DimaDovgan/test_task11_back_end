"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const doctorShema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'set id for patient'],
    },
    time: {
        type: Array,
        required: [true, 'Set time for patient'],
    },
    name: {
        type: Array,
    },
    dateBirsday: {
        type: String,
    }
}, { versionKey: false, timestamps: true });
const Doctor = (0, mongoose_1.model)("Doctor", doctorShema);
exports.default = Doctor;
