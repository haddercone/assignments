const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const admin = new Admin({
    username: req.body.username,
    password: req.body.password,
  });
  await admin.save();

  res.status(200).json({ message: "Admin created successfully" });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const { title, description, price, imagelink } = req.body;
  const currId = Date.now();
  const course = new Course({
    title: title,
    description: description,
    price: price,
    imagelink: imagelink,
    published: true,
  });

  await course.save();
  res
    .status(200)
    .json({ message: "Course created successfully", courseId: course._id });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const courses = await Course.find({});
  res.status(200).json(courses);
});

module.exports = router;
