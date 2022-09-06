import { keyframes, TextField } from "@mui/material";

// Vibration animation for focus question
// While the long break is on
const vibrate = keyframes`
    50% { font-size: 24pt; }
`;

const Question = ({ state }) => {
    return (
        <TextField
            InputProps={{
                sx: {
                    height: 50,
                    width: 270,
                    fontSize: "20pt",
                    "& input": {
                        textAlign: "center",
                    },
                    animation: state === "Long Break" ? `${vibrate} 2s infinite` : null,
                },
            }}
            placeholder="Enter Focus Qestion"
            variant="outlined"
        />
    );
};

export default Question;
