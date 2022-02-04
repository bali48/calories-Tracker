const Food = require("../models/food");
const User = require("../models/userModel");
const CustomError = require("../models/CustomError");

exports.createFoodEntry = async (req, res, next) => {
  console.log("req.body", req.body);
  if (!req.body) {
    return next(new CustomError("Body cannot be empty", 400));
  }
  try {
    let insertDate = {
      name: req.body.name,
      calories: req.body.calories,
      creator: req.uid,
    };
    if (req.body.published) {
      insertDate["published"] = req.body.published;
    }
    // published: req.published ? published
    const food = await Food.create(insertDate);

    //connected foods with the user
    const user = await User.findById(req.uid);

    if (user) {
      const foods = [...user.foods, food.id];
      await user.updateOne({ foods });

      return res.status(201).send({ success: true, food });
    }
  } catch (err) {
    console.log(err);
    next(new CustomError("Something went wrong", 500));
  }
};

exports.reportStats = async (req, res, next) => {
  try {
    console.log("reportStats", req.user);
    var lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 6);
    console.log("last week", lastWeek);
    //average of entries by per user
    const tut = await Food.aggregate([
      { $match: { published: { $gte: lastWeek } } },
      {
        $group: {
          _id: "$creator",
          total: {
            $sum: "$calories",
          },
        },
      },
      // {
      //   $project: {
      //     _id: 0,
      //     avgTime: { $avg: "$total" },
      //   },
      // },
    ]);
    const entriesCurrentWeek = await Food.count({
      published: { $gte: lastWeek },
    });
    const BeforeCurrentWeek = await Food.count({
      published: { $lte: lastWeek },
    });

    return res.status(200).send({
      success: true,
      perUserSum: tut,
      entriesCurrentWeek,
      BeforeCurrentWeek,
    });
  } catch (err) {
    console.log(err);
    next(new CustomError("Something went wrong", 500));
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const tut = await Food.findById(req.params.id);

    if (!tut) {
      return next(new CustomError("food not found", 404));
    }
    res.send({ success: true, food: tut });
  } catch (err) {
    next(new CustomError("Something went wrong", 500));
  }
};

exports.update = async (req, res, next) => {
  try {
    const editfood = await Food.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!editfood) {
      return next(new CustomError("food not found", 404));
    }

    return res.status(200).send({ success: true, food: editfood });
  } catch (err) {
    next(new CustomError("Something went wrong", 500));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return next(new CustomError("food not found", 404));
    }

    if (food.creator != req.uid) {
      return next(new CustomError("Unauthorized access to delete route", 400));
    }

    await food.findByIdAndDelete(req.params.id);
    const user = await User.findById(req.uid);

    if (user) {
      let foods = user.foods.filter((tutId) => tutId != req.params.id);
      await user.updateOne({ foods });
    }

    return res.send({ success: true, food });
  } catch (err) {
    next(new CustomError("Something went wrong", 500));
  }
};
