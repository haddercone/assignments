function clock() {
    setInterval(() => {
        const date = new Date();

        let  hrs = date.getHours();
        let mins =  date.getMinutes();
        let secs =  date.getSeconds();

        const AMorPM = hrs > 12 ? "PM" : "AM";

        hrs = hrs >= 13 ? "0" + (hrs - 12) : hrs;
        mins = mins < 10 ? "0" + mins : mins;
        secs = secs < 10 ? "0" + secs : secs;
        
        
        console.log(`${hrs}:${mins}:${secs} ${AMorPM}`);
    }, 1000)

}
clock()