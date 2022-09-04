import { createTheme } from "@mui/material";

const lightTheme = createTheme({
    typography: {
        fontFamily: ["Dosis", "sans-serif"].join(","),
    },
    palette: {
        mode: "light",
        primary: {
            main: "#212121",
            light: "#4d4d4d",
            dark: "#171717",
        },
        secondary: {
            main: "#ffeb3b",
            light: "#ffef62",
            dark: "#b2a429  ",
        },
    },
});

const darkTheme = createTheme({
    typography: {
        fontFamily: ["Dosis", "sans-serif"].join(","),
    },
    palette: {
        mode: "dark",
        primary: {
            main: "#ffeb3b",
            light: "#ffef62",
            dark: "#b2a429  ",
        },
        secondary: {
            main: "#212121",
            light: "#4d4d4d",
            dark: "#171717",
        },
    },
});

export { lightTheme, darkTheme };
