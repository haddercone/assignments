import { useMemo, useState } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
    const [input, setInput] = useState(0);
    const [count, setCount] = useState(1);
    // Your solution starts here
    const expensiveValue = useMemo(() => {
        console.log("Expensive calculation called");
        let factorial = 1;
        if(input === 0) {
            return factorial;
        }
        for(let i = 1; i <= input; i++) {
            factorial= factorial * i;
        }
        return factorial;
    }, [input]); 
    // Your solution ends here

    return (
        <div>
            <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(Number(e.target.value))} 
            />
            <button onClick={() => setCount(count+1)}>Count {count}</button>
            <p>Calculated Value: {expensiveValue}</p>
        </div>
    );
}