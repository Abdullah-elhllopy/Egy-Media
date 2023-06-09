// color design tokens export
export const colorTokens = {
    grey: {
      0: "#F7F7F7",
      10: "#fff",
      50: "#EFEFEF",
      100: "#E0E0E0",
      200: "#C2C2C2",
      300: "#A3A3A3",
      400: "#858585",
      500: "#666666",
      600: "#b7bfd2",
      700: "#2B2038",
      800: "#141725",
      900: "#110E18",
      1000: "#000000",
    },
    primary: {
      50: "#FBFBFE",
      100: "#CCF7FE",
      200: "#8b6db3",
      300: "#66E6FC",
      400: "#33DDFB",
      500: "#00D5FA",
      600: "#1573FF",
      700: "#003459",
      800: "#E0E0E0",
      900: "#001519",
      1000:"#d32f2f",
      1100 : "#4D38A2",
    },
  };
  
  // mui theme settings
  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              // palette values for dark mode
              primary: {
                dark: colorTokens.grey[600],
                main: colorTokens.grey[600],
                light: colorTokens.primary[800],
                error : colorTokens.primary[1000]
              },
              neutral: {
                dark: colorTokens.grey[100],
                main: colorTokens.grey[200],
                mediumMain: colorTokens.grey[300],
                medium: colorTokens.grey[400],
                light: colorTokens.grey[700],
              },
              background: {
                default: colorTokens.grey[900],
                alt: colorTokens.grey[800],
                custom : colorTokens.primary[1100]
              },
            }
          : {
              // palette values for light mode
              primary: {
                dark: colorTokens.primary[600],
                main: colorTokens.primary[600],
                light: colorTokens.primary[50],
                error : colorTokens.primary[1000]
              },
              neutral: {
                dark: colorTokens.grey[500],
                main: colorTokens.grey[500],
                mediumMain: colorTokens.grey[400],
                medium: colorTokens.grey[300],
                light: colorTokens.grey[50],
              },
              background: {
                default: colorTokens.grey[10],
                alt: colorTokens.grey[0],
                custom : colorTokens.primary[1100]
              },
            }),
      },
      typography: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
  };