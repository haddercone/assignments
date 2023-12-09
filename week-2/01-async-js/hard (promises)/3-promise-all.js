/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
 */


function waitOneSecond() {
    return new Promise(resolve => {
        setTimeout(() => resolve("resolve 1"), 1000);
    })
}

function waitTwoSecond() {
    return new Promise(resolve => {
        setTimeout(() => resolve("resolve 2"), 2000);
    })
}

function waitThreeSecond() {
    return new Promise(resolve => {
        setTimeout(() => resolve("resolve 3"), 3000);
    })
}


async function calculateTime() {
    const promise1 = waitOneSecond()
    const promise2 = waitTwoSecond()
    const promise3 = waitThreeSecond()
    let  start = Date.now()

    Promise.all([ promise1, promise2, promise3])
    .then(result => {
        let  end = Date.now()
        console.log("result: " + result)
        console.log("Time take to resolve: " , end - start, "milliseconds");
    })
    .catch(err => console.log(err))
    
}
calculateTime()