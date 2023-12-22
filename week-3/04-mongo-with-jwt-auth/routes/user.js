const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// User Routes
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }
    const user = new User({
      username: username,
      password: password,
    });
    await user.save();
    res.status(200).json({ message: "User Created successfully" });
  } catch (error) {
    console.log("Error creating admin", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  // Implement user signup logic
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username, password });
  if (!existingUser) {
    return res
      .status(409)
      .json({ message: "username or password is incorrect" });
  }
  const token = jwt.sign({ username: username }, process.env.JWT_PASS);
  res.status(200).json({ toke: token });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const { courseId } = req.params;
  const { username } = req;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { $addToSet: { courses: courseId } },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({ message: "Course purchased successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic

  const { username } = req;
  try {
    const user = await User.findOne({username});
    const courseIds = user.courses;

    const purchasedCoursses = [];
    for(const courseId of courseIds){
        const course = await Course.findById(courseId);
        if(course){
            purchasedCoursses.push(course)
        }
    }
    res.status(200).json(purchasedCoursses);

  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Internal Server Error")
  }

});
module.exports = router;
