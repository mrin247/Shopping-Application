const express = require("express");
const { requireSignin, adminMiddleware } = require("../../utill/middleware");
const { updateOrder } = require("../../controllers/admin/order");
const router = express.Router();

router.post(`/order/update`, requireSignin, adminMiddleware, updateOrder);

module.exports = router;