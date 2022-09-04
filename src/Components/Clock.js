import { useTheme } from "@emotion/react";
import { Button, Stack } from "@mui/material";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Question from "./Question";

export default function Clock({
    state = "Work",
    isTimeRunning,
    setIsTimeRunning,
    fullTime,
    setTime,
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
            spacing={2}
            width="100%"
        >
            <h3>{state}</h3>
            <Question state={state} />
            <CountdownCircleTimer
                size="200"
                trailColor={theme.palette.secondary.dark}
                colors={theme.palette.primary.main}
                key={state}
                duration={fullTime}
                isPlaying={isTimeRunning}
                onUpdate={(remainingTime) => {
                    setTime(remainingTime);
                }}
            >
                {({ remainingTime }) => (
                    <div style={{ textAlign: "center" }}>
                        <h1>{remainingTime}</h1>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => setIsTimeRunning(!isTimeRunning)}
                        >
                            {isTimeRunning ? "Stop" : "Start"}
                        </Button>
                    </div>
                )}
            </CountdownCircleTimer>
        </Stack>
    );
}
