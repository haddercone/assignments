const fs = require("fs");

fs.readFile("./sample.txt", (err, data) => {
    let response = data.toString();
    const formattedResponse = response.replace(/\s+/g, " ");
    fs.writeFile('./sample.txt', formattedResponse, (err) => {
        if(err){
            console.log("Error writing to the file");
        }
        console.log("File was written successfully!");
    })
})

