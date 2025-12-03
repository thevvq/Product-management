const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/profile.controller");
const upload = require("../../middlewares/uploadAvatar.middleware");

router.get("/", controller.renderProfile);
router.post("/update", upload.single("avatar"), controller.updateProfile);

module.exports = router;
