import { Fab, styled } from "@mui/material";
import { Stack } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const StyledFab = styled(({ ...props }) => <Fab {...props} size="small" color="primary" />)``;

export default function Controller({ time, setTime, state, isTimeRunning }) {
    return (
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 10,
                }}
            >
                <StyledFab onClick={() => setTime(time + 1)} disabled={isTimeRunning}>
                    <RemoveIcon />
                </StyledFab>
                <div> {time} </div>
                <StyledFab onClick={() => setTime(time - 1)} disabled={isTimeRunning}>
                    <AddIcon />
                </StyledFab>
            </div>
            <div>{state}</div>
        </Stack>
    );
}
