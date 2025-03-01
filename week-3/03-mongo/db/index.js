const mongoose = require('mongoose');
require('dotenv').config()
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB connection established!"))

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    courses: [mongoose.Schema.Types.ObjectId],
    username: String,
    password: String,
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description : String,
    price: Number,
    imageLink: String,
    published: Boolean,
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}