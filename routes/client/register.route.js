const express = require("express");
const router = express.Router();

const registerController = require("../../controllers/client/register.controller");
const { registerValidates } = require("../../validates/client/register.validates");

// Hiển thị form đăng ký
router.get("/", registerController.renderRegister);

// Xử lý đăng ký
router.post("/", registerValidates, registerController.handleRegister);

module.exports = router;
