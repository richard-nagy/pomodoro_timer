import { useEffect, useState } from "react";
import Clock from "./Components/Clock";
import Controller from "./Components/Controller";

function App() {
    const [state, setState] = useState("-");
    const [numberOfBreak, setNumberOfBreak] = useState(0);
    const [isTimeRunning, setIsTimeRunning] = useState(false);
    const [workTime, setWorkTime] = useState(15);
    const [shortBreakTime, setShortBreakTime] = useState(10);
    const [longBreakTime, setLongBreakTime] = useState(15);
    const [time, setTime] = useState(0);
    const [fullTime, setFullTime] = useState(0);
    const [tabHasFocus, setTabHasFocus] = useState(true);
    const [newAlert, setNewAlert] = useState(false);

    // Setup a listener, watches if the page is in focus
    useEffect(() => {
        const handleFocus = () => {
            setTabHasFocus(true);
            document.title = "React App";
        };

        const handleBlur = () => {
            setTabHasFocus(false);
        };

        window.addEventListener("focus", handleFocus);
        window.addEventListener("blur", handleBlur);

        return () => {
            window.removeEventListener("focus", handleFocus);
            window.removeEventListener("blur", handleBlur);
        };
    }, []);

    // If a countdown is finished, and the page is out of focus
    // Start flashing the page title text
    useEffect(() => {
        if (tabHasFocus) {
            setNewAlert(false);
            return;
        }

        if (newAlert === false) {
            setNewAlert(false);

            return;
        }

        const alert = setInterval(() => {
            const title1 = "React App";
            const title2 = "🔴 Alert";

            document.title === title1 ? (document.title = title2) : (document.title = title1);
        }, 1000);

        return () => clearInterval(alert);
    }, [tabHasFocus, newAlert]);

    // Time countdown
    useEffect(() => {
        if (!isTimeRunning) {
            return;
        }

        // When time runs out, set up the next period
        if (time <= 0) {
            switch (state) {
                case "Work":
                    // If we already head two short breaks, the next one will be long
                    if (numberOfBreak === 2) {
                        setState("Long Break");
                        setTime(longBreakTime);
                        setFullTime(longBreakTime);
                        break;
                    }
                    setState("Short Break");
                    setTime(shortBreakTime);
                    setFullTime(shortBreakTime);
                    break;
                case "Short Break":
                    setState("Work");
                    setTime(workTime);
                    setFullTime(workTime);
                    setNumberOfBreak((prevRotation) => prevRotation + 1);
                    break;
                case "Long Break":
                    setState("Work");
                    setTime(workTime);
                    setFullTime(workTime);
                    setNumberOfBreak(0);
                    break;
                default:
                    setState("Work");
                    setTime(workTime);
                    setFullTime(workTime);
                    break;
            }
            setNewAlert(true);
        }
    }, [isTimeRunning, time, state, workTime, shortBreakTime, longBreakTime, numberOfBreak]);

    return (
        <div>
            <Clock
                state={state}
                isTimeRunning={isTimeRunning}
                setIsTimeRunning={setIsTimeRunning}
                fullTime={fullTime}
                setTime={setTime}
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
