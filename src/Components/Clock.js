import { useTheme } from "@emotion/react";
import { Button, Stack, Typography } from "@mui/material";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { ReactCountdownClock } from "react-countdown-clock";
import Question from "./Question";
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { lightTheme, darkTheme } from "../theme";

export default function Clock({
    state = "Work",
    isTimeRunning,
    setIsTimeRunning,
    fullTime,
    setTime,
    time,
}) {
    const theme = useTheme();

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
                    value={100 / (fullTime / time)}
                    strokeWidth={8}
                    styles={buildStyles({
                        textColor: theme.palette.primary.main,
                        pathColor: theme.palette.primary.main,
                        trailColor: theme.palette.secondary.dark,
                    })}
                >
                    <h1>{time}</h1>
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
