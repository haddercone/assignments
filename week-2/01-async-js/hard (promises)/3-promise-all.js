/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */


function waitOneSecond(t) {
    return new Promise(resolve => {
        setTimeout(() => resolve("resolve 1"), t * 1000);
    })
}

function waitTwoSecond(t) {
    return new Promise(resolve => {
        setTimeout(() => resolve("resolve 2"), t * 1000);
    })
}

function waitThreeSecond(t) {
    return new Promise(resolve => {
        setTimeout(() => resolve("resolve 3"), t * 1000);
    })
}


async function calculateTime(t1, t2, t3) {
    const promise1 = waitOneSecond(t1)
    const promise2 = waitTwoSecond(t2)
    const promise3 = waitThreeSecond(t3)
    let start = Date.now()

    return Promise.all([promise1, promise2, promise3])
        .then(result => {
            let end = Date.now()
            return end - start;
        })
        .catch(err => console.log(err))

}
// calculateTime()

module.exports = calculateTime;