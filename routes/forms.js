"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sendForms_1 = __importDefault(require(".././controllers/forms/sendForms"));
const router = express_1.default.Router();
// DB_host = mongodb+srv://Dima:BUVu1QfgRgpjb1RZ@cluster0.trx80dd.mongodb.net/db-contacts?retryWrites=true&w=majority
router.post('/sendForms', sendForms_1.default);
exports.default = router;
