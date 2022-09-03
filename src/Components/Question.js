const Question = ({ state }) => {
    return (
        <div>
            <h2>{state === "Long Break" && "Time to reflect on the focus question"}</h2>
            <input placeholder="Focus question" />
        </div>
    );
};

export default Question;
