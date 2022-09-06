import { useTheme } from "@emotion/react";
import { Button, Stack, Typography } from "@mui/material";
import Question from "./Question";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Clock({ state = "Work", isTimeRunning, setIsTimeRunning, fullTime, time }) {
    const theme = useTheme();

    // Turn seconds to minutes in display
    const secondsToMinutes = (time) => {
        var minute = Math.floor(time / 60);
        var testOfSeconds = time % 60;
        return minute.toString().padStart(2, "0") + ":" + testOfSeconds.toString().padStart(2, "0");
    };

    // The CountdownCircleTimer component controls the countdown:
    // - Is playing decides to start or stop the timer
    // - Duration equals the starting time
    // - OnUpdate updates the time state, every one seconds
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={5}
            width="100%"
        >
            <h3>{state}</h3>
            {state === "Long Break" && (
                <Typography sx={{ fontStyle: "italic" }}>
                    Time to reflect on your question
                </Typography>
            )}
            <Question state={state} />
            <div
                style={{
                    width: 250,
                    height: 250,
                }}
            >
                <CircularProgressbarWithChildren
                    value={100 / (fullTime.current / time)}
                    strokeWidth={8}
                    styles={buildStyles({
                        textColor: theme.palette.primary.main,
                        pathColor: theme.palette.primary.main,
                        trailColor: theme.palette.secondary.dark,
                    })}
                >
                    <h1>{secondsToMinutes(time)}</h1>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => setIsTimeRunning(!isTimeRunning)}
                    >
                        {isTimeRunning ? "Stop" : "Start"}
                    </Button>
                </CircularProgressbarWithChildren>
            </div>
        </Stack>
    );
}
