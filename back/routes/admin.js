const express = require("express");

const auth = require("../middlewares/auth");
const adminController = require("../controllers/admin");
const { check } = require("express-validator");
const admin = require("../middlewares/admin");

const router = express.Router();

router.get("/", [auth, admin], adminController.reportStats);

router.post(
  "/new",
  auth,
  [
    check("name", "Please fill out the field").trim().notEmpty(),
    check("calories", "Please fill out the field").trim().notEmpty(),
    check("published").isISO8601().toDate(),
  ],

  adminController.createFoodEntry
);

router.get("/:id", adminController.findOne);

router.post(
  "/edit/:id",
  auth,
  [
    check("title", "Please fill out the field").trim().notEmpty(),
    check("body", "Please fill out the field").trim().notEmpty(),
  ],

  adminController.update
);

router.post("/delete/:id", auth, adminController.delete);

module.exports = router;
