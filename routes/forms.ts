import express from "express"
import sendForms from ".././controllers/forms/sendForms"

 const router = express.Router();

// DB_host = mongodb+srv://Dima:BUVu1QfgRgpjb1RZ@cluster0.trx80dd.mongodb.net/db-contacts?retryWrites=true&w=majority

router.post('/sendForms' ,sendForms);
export default router