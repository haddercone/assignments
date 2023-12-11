const fs = require("fs");

fs.readFile('./sample.txt', (err, data) => {
    const response = data.toString();
    console.log(response);
})

let sum = 0;

for(let i = 0; i<100000000000; i++) {
    sum+=i
}
console.log(sum);
