import { Fab, FormControlLabel, Stack, Switch, Tooltip } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export default function AppBar({ mode, setMode, setIsDialogOpen }) {
    return (
        <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
            width="100vw"
            spacing={2}
            margin="10px 40px 0 0 "
            sx={{ top: 0 }}
        >
            <Tooltip title={`Switch to ${mode === "light" ? "Dark" : "Light"} theme`}>
                <FormControlLabel
                    control={<Switch color="primary" />}
                    labelPlacement="start"
                    onChange={() => setMode(mode === "light" ? "dark" : "light")}
                />
            </Tooltip>
            <Tooltip title="Change color">
                <Fab size="small" color="primary" onClick={() => setIsDialogOpen(true)}>
                    <SettingsIcon />
                </Fab>
            </Tooltip>
        </Stack>
    );
}
