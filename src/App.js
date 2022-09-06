import { useEffect, useRef, useState } from "react";
import { Stack, ThemeProvider, Grid } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import Clock from "./Components/Clock";
import Controller from "./Components/Controller";
import ColorDialog from "./Components/ColorDialog";
import AppBar from "./Components/AppBar";

function App() {
    const [state, setState] = useState();
    const [time, setTime] = useState(0);
    const [mode, setMode] = useState("light");
    const [workTime, setWorkTime] = useState(15);
    const [shortBreakTime, setShortBreakTime] = useState(5);
    const [longBreakTime, setLongBreakTime] = useState(10);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAlertOn, setIsAlertOn] = useState(false);
    const [isTimeRunning, setIsTimeRunning] = useState(false);
    const [colors, setColor] = useState({
        main: "#f44336",
        light: "#f6685e",
        dark: "#aa2e25  ",
    });

    const tabHasFocus = useRef(true);
    const numberOfBreak = useRef(0);
    const fullTime = useRef(0);

    // Setup a listener, watches if the page is in focus
    useEffect(() => {
        const handleFocus = () => {
            tabHasFocus.current = true;
            setIsAlertOn(false);
            document.title = "React App";
        };

        const handleBlur = () => {
            tabHasFocus.current = false;
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
        if (tabHasFocus.current) {
            return;
        }

        if (!isAlertOn) {
            return;
        }

        const alert = setInterval(() => {
            const title1 = "⏰ Time is up!";
            const title2 = "Pomodoro App";

            document.title === title1 ? (document.title = title2) : (document.title = title1);
        }, 1000);

        return () => clearInterval(alert);
    }, [isAlertOn]);

    // Handle when time runs out
    useEffect(() => {
        const stuff = setInterval(() => {
            if (isTimeRunning) {
                setTime((prevTime) => prevTime - 1);
            }
        }, 1000);

        // When time runs out, set up the next period
        if ((time < 0 || time === undefined) && isTimeRunning) {
            const multiplier = 60;

            switch (state) {
                case "Work":
                    // If we already head two short breaks, the next one will be long
                    if (numberOfBreak.current === 2) {
                        setState("Long Break");
                        setTime(longBreakTime * multiplier);
                        fullTime.current = longBreakTime * multiplier;
                        break;
                    }
                    setState("Short Break");
                    setTime(shortBreakTime * multiplier);
                    fullTime.current = shortBreakTime * multiplier;
                    break;
                case "Short Break":
                    setState("Work");
                    setTime(workTime * multiplier);
                    fullTime.current = workTime * multiplier;
                    numberOfBreak.current++;
                    break;
                case "Long Break":
                    setState("Work");
                    setTime(workTime * multiplier);
                    fullTime.current = workTime * multiplier;
                    numberOfBreak.current = 0;
                    break;
                default:
                    setState("Work");
                    setTime(workTime * multiplier);
                    fullTime.current = workTime * multiplier;
                    break;
            }

            if (!tabHasFocus.current) {
                setIsAlertOn(true);
            }
        }

        return () => clearInterval(stuff);
    }, [time, state, workTime, shortBreakTime, longBreakTime, isTimeRunning]);

    return (
        <ThemeProvider theme={mode === "light" ? lightTheme(colors) : darkTheme(colors)}>
            <Grid
                container
                justifyContent="center"
                style={{ height: "100vh" }}
                bgcolor="secondary.main"
            >
                <AppBar mode={mode} setMode={setMode} setIsDialogOpen={setIsDialogOpen} />
                <Grid
                    item
                    bgcolor="secondary.main"
                    color={"text.primary"}
                    sx={{ fontSize: "18pt" }}
                    maxWidth="szorzo0px"
                    width="100%"
                    padding={4}
                >
                    <Stack spacing={5} justifyContent="center" alignItems="center">
                        <Clock
                            state={state}
                            isTimeRunning={isTimeRunning}
                            setIsTimeRunning={setIsTimeRunning}
                            fullTime={fullTime}
                            setTime={setTime}
                            time={time}
                        />
                        <Stack
                            justifyContent="center"
                            alignItems="center"
                            spacing={5}
                            direction={{ xs: "column", md: "row" }}
                        >
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
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
            <ColorDialog
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                setColor={setColor}
            />
        </ThemeProvider>
    );
}

export default App;
