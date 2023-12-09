/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */

function sleep (seconds) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), seconds*1000);
    })
}

async function call() {
    console.log("hi");
    await sleep(1);
    console.log("Call 1 seconds");
    await sleep(2)
    console.log("Call 2 seconds");
    console.log("Hello");
}

call()