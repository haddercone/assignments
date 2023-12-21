const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");

// User Routes
router.post("/signup", async (req, res) => {
  await User.create({
    username: req.body.username,
    password: req.body.password,
  });

  res.status(200).json({ message: "User created successfully" });
  // Implement user signup logic
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});
  res.status(200).json(courses);
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  try {
    const { userId } = req;
    const { courseId } = req.params;
    const userquery = await User.findById(userId);

    const UpdatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { courses: courseId } },
      { new: true }
    );

    if (UpdatedUser) {
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
  const { userId } = req;
  const user = await User.findById(userId);
  const courseIds = user.courses;
  const coursesData = [];

  try {
    for (const courseId of courseIds) {
      const course = await Course.findById(courseId);
      if (course) {
        coursesData.push(course);
      }
    }
    res.status(200).json(coursesData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
