const express = require("express");

const auth = require("../middlewares/auth");
const foodController = require("../controllers/food");
const { check } = require("express-validator");

const router = express.Router();

router.get("/", auth, foodController.findAll);

router.post(
  "/new",
  auth,
  [
    check("name", "Please fill out the field").trim().notEmpty(),
    check("calories", "Please fill out the field").trim().notEmpty(),
    check("published").isISO8601().toDate(),
  ],

  foodController.createFoodEntry
);

router.get("/:id", foodController.findOne);

router.post(
  "/edit/:id",
  auth,
  [
    check("title", "Please fill out the field").trim().notEmpty(),
    check("body", "Please fill out the field").trim().notEmpty(),
  ],

  foodController.update
);

module.exports = router;
