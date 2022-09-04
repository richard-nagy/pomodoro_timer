import { TextField } from "@mui/material";

const Question = ({ state }) => {
    return (
        <TextField
            InputProps={{
                sx: {
                    "& input": {
                        textAlign: "center",
                    },
                },
                disableUnderline: true,
            }}
            placeholder="Enter Focus Qestion"
            variant="standard"
            fullWidth
        />
    );
};

export default Question;
