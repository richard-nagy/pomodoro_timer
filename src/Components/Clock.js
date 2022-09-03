export default function Clock({ time, state, isTimeRunning, setIsTimeRunning }) {
    return (
        <div>
            <div>{time}</div>
            <div>{state}</div>
            <button onClick={() => setIsTimeRunning(!isTimeRunning)}>
                {isTimeRunning ? "Stop" : "Start"}
            </button>
        </div>
    );
}
