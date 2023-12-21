const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt = require('jsonwebtoken')
const router = Router();
const {Admin, Course} = require('../db/index')
require('dotenv').config();

// Admin Routes
router.post('/signup',async  (req, res) => {
    // Implement admin signup logic
    const {username, password} = req.body;
    try {
        const existingUser = await Admin.findOne({username});
        if(existingUser){
            return res.status(409).json({message: "User already exists"})
        }

        const admin = new Admin({
            username: username,
            password: password
        })

        await admin.save();
        res.status(200).json({message: "Admin created successfully"})
    } catch (error) {
        console.log("Error creating admin", error);
        res.status(500).json({message: "Internal Server Error"})
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const {username, password} = req.body;
    const existingUser = await Admin.findOne({username, password});
    if(!existingUser){
        return res.status(404).json({message: "username or password is incorrect"})
    }
    const token = jwt.sign({username: username}, process.env.JWT_PASS);
    res.status(200).json({toke: token});
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const {title, description, price, imageLink} = req.body;
    try {
        const course = new Course({
            title: title,
            description: description,
            price: price,
            imageLink: imageLink
        })
        await course.save();
        res.status(200).json({message: "Course created successfully", courseId: course._id})
    } catch (error) {
        console.log("Error creating course", error);
        res.status(500).json({message: "Internal Server Error"});
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = await Course.find({});
        res.status(200).json(courses);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({message: "Internal Server Error"});
    }    
});

module.exports = router;