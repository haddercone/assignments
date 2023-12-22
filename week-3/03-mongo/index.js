const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000

const app = express();

const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");
require('./db/index.js')

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
});
