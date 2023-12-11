const fs = require('fs');
const text = "This is a test file text"
fs.writeFile("./sample1.txt", text, (err) => {
    if(err) {
        console.error("Error writing file", err);
    }
    console.log("File written successfully!");
})