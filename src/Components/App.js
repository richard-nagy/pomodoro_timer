import { useEffect, useState } from "react";
import Clock from "./Clock";
import Controller from "./Controller";

function App() {
    const [state, setState] = useState("-");
    const [numberOfBreak, setNumberOfBreak] = useState(0);
    const [isTimeRunning, setIsTimeRunning] = useState(false);
    const [workTime, setWorkTime] = useState(4);
    const [shortBreakTime, setShortBreakTime] = useState(2);
    const [longBreakTime, setLongBreakTime] = useState(8);
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (!isTimeRunning) {
            return;
        }

        const intervalId = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        if (time < 0) {
            switch (state) {
                case "Work":
                    // If we already head two short breaks, the next one will be long
                    if (numberOfBreak === 2) {
                        setState("Long Break");
                        setTime(longBreakTime);
                        break;
                    }
                    setState("Short Break");
                    setTime(shortBreakTime);
                    break;
                case "Short Break":
                    setState("Work");
                    setTime(workTime);
                    setNumberOfBreak((prevRotation) => prevRotation + 1);
                    break;
                case "Long Break":
                    setState("Work");
                    setTime(workTime);
                    setNumberOfBreak(0);
                    break;
                default:
                    setState("Work");
                    setTime(workTime);
                    break;
            }
        }

        return () => clearInterval(intervalId);
    }, [isTimeRunning, time, state, workTime, shortBreakTime, longBreakTime, numberOfBreak]);

    return (
        <div>
            <Clock
                time={time}
                state={state}
                isTimeRunning={isTimeRunning}
                setIsTimeRunning={setIsTimeRunning}
            />
            <Controller
                time={workTime}
                setTime={setWorkTime}
                state="Work"
                isTimeRunning={isTimeRunning}
            />
            <Controller
                time={shortBreakTime}
                setTime={setShortBreakTime}
                state="Short Break"
                isTimeRunning={isTimeRunning}
            />
            <Controller
                time={longBreakTime}
                setTime={setLongBreakTime}
                state="Long Break"
                isTimeRunning={isTimeRunning}
            />
        </div>
    );
}

export default App;
