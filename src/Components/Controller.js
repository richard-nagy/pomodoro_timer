export default function Controller({ time, setTime, state, isTimeRunning }) {
    return (
        <div>
            <button onClick={() => setTime(time - 1)} disabled={isTimeRunning}>
                -
            </button>
            <span> {time} </span>
            <button onClick={() => setTime(time + 1)} disabled={isTimeRunning}>
                +
            </button>
            <span>{state} </span>
        </div>
    );
}
