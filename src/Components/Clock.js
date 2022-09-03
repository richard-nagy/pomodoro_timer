import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default function Clock({ state, isTimeRunning, setIsTimeRunning, fullTime, setTime }) {
    // The CountdownCircleTimer component controls the countdown:
    // - Is playing decides to start or stop the timer
    // - Duration equals the starting time
    // - OnUpdate updates the time state, every one seconds
    return (
        <div>
            <CountdownCircleTimer
                colors="red"
                key={state}
                duration={fullTime}
                isPlaying={isTimeRunning}
                onUpdate={(remainingTime) => {
                    setTime(remainingTime);
                }}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
            <div>{state}</div>
            <button onClick={() => setIsTimeRunning(!isTimeRunning)}>
                {isTimeRunning ? "Stop" : "Start"}
            </button>
        </div>
    );
}
