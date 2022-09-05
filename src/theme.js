import { createTheme } from "@mui/material";

const lightTheme = (colors) => {
    console.log(colors);

    return createTheme({
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
            secondary: colors,
        },
    });
};

const darkTheme = (colors) => {
    console.log(colors);

    return createTheme({
        typography: {
            fontFamily: ["Dosis", "sans-serif"].join(","),
        },
        palette: {
            mode: "dark",
            primary: colors,
            secondary: {
                main: "#212121",
                light: "#4d4d4d",
                dark: "#171717",
            },
        },
    });
};

export { lightTheme, darkTheme };
