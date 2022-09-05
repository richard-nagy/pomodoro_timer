import styled from "@emotion/styled";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Grid,
    IconButton,
    List,
    ListItem,
    Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import { Fragment } from "react";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";

const colors = [
    {
        main: "#f44336",
        light: "#f6685e",
        dark: "#aa2e25  ",
    },
    {
        main: "#ff5722",
        light: "#ff784e",
        dark: "#b23c17  ",
    },
    {
        main: "#ffeb3b",
        light: "#ffef62",
        dark: "#b2a429  ",
    },
    {
        main: "#4caf50",
        light: "#6fbf73",
        dark: "#357a38  ",
    },
    {
        main: "#3f51b5",
        light: "#6573c3",
        dark: "#2c387e  ",
    },
    {
        main: "#673ab7",
        light: "#8561c5",
        dark: "#482880  ",
    },
];

export default function ColorDialog({ isDialogOpen, setIsDialogOpen, setColor }) {
    const handleClose = () => {
        setIsDialogOpen(false);
    };

    const handleColorClick = (selectedColor) => {
        setColor(selectedColor);
        setIsDialogOpen(false);
    };

    return (
        <Dialog open={isDialogOpen} onClose={handleClose}>
            <DialogTitle>Choose Color</DialogTitle>
            <DialogContent>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ width: 180 }}
                >
                    {colors.map((color) => {
                        return (
                            <Grid item xs={4} sx={{ textAlign: "center" }}>
                                <IconButton onClick={() => handleColorClick(color)}>
                                    <CircleTwoToneIcon
                                        sx={{ color: color.main, fontSize: "30pt" }}
                                    />
                                </IconButton>
                            </Grid>
                        );
                    })}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
