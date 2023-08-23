"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const appointmensShema = new mongoose_1.Schema({
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
}, { versionKey: false, timestamps: true });
const Appointmens = (0, mongoose_1.model)("appointmens", appointmensShema);
exports.default = Appointmens;
