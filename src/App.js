import { useEffect, useState } from "react";
import { Stack, ThemeProvider, Grid, FormControlLabel, Fab, Tooltip } from "@mui/material";
import Switch from "@mui/material/Switch";
import Clock from "./Components/Clock";
import Controller from "./Components/Controller";
import { lightTheme, darkTheme } from "./theme";
import SettingsIcon from "@mui/icons-material/Settings";
import ColorDialog from "./Components/ColorDialog";

function App() {
    const [state, setState] = useState();
    const [numberOfBreak, setNumberOfBreak] = useState(0);
    const [isTimeRunning, setIsTimeRunning] = useState(false);
    const [workTime, setWorkTime] = useState(15);
    const [shortBreakTime, setShortBreakTime] = useState(10);
    const [longBreakTime, setLongBreakTime] = useState(15);
    const [time, setTime] = useState(0);
    const [fullTime, setFullTime] = useState(0);
    const [tabHasFocus, setTabHasFocus] = useState(true);
    const [newAlert, setNewAlert] = useState(false);
    const [mode, setMode] = useState("light");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [colors, setColor] = useState({
        main: "#f44336",
        light: "#f6685e",
        dark: "#aa2e25  ",
    });

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

    // Handle when time runs out
    useEffect(() => {
        // When time runs out, set up the next period
        if (time <= 0 && isTimeRunning) {
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
        <ThemeProvider theme={mode === "light" ? lightTheme(colors) : darkTheme(colors)}>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: "100vh" }}
                bgcolor="secondary.main"
            >
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-start"
                    position="absolute"
                    width="100vw"
                    spacing={2}
                    margin="10px 40px 0 0 "
                    sx={{ top: 0 }}
                >
                    <Tooltip title={`Switch to ${mode === "light" ? "Dark" : "Light"} theme`}>
                        <FormControlLabel
                            control={<Switch color="primary" />}
                            labelPlacement="start"
                            onChange={() => setMode(mode === "light" ? "dark" : "light")}
                        />
                    </Tooltip>
                    <Tooltip title="Change color">
                        <Fab size="small" color="primary" onClick={() => setIsDialogOpen(true)}>
                            <SettingsIcon />
                        </Fab>
                    </Tooltip>
                </Stack>
                <Grid
                    item
                    bgcolor="secondary.main"
                    color={"text.primary"}
                    sx={{ fontSize: "18pt" }}
                    height="100vh"
                    maxWidth="500px"
                    width="100%"
                >
                    <Stack spacing={5} justifyContent="center" alignItems="center" height="100vh">
                        <Clock
                            state={state}
                            isTimeRunning={isTimeRunning}
                            setIsTimeRunning={setIsTimeRunning}
                            fullTime={fullTime}
                            setTime={setTime}
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
