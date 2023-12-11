/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function waitOneSecond(t) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), t * 1000);
    });
}

function waitTwoSecond(t) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), t * 1000);
    });
}

function waitThreeSecond(t) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), t * 1000);
    });
}

async function calculateTime(t1, t2, t3) {
    let start = Date.now();
    const result1 = await waitOneSecond(t1);
    const result2 = await waitOneSecond(t2);
    const result3 = await waitOneSecond(t3);

    let diff = Date.now() - start;

    return diff;
}

module.exports = calculateTime;