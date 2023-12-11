let count = 0;
function timer(){
    setTimeout(() => {
        count++;
        console.log(count);
        timer();
    }, 1000)
}

timer();