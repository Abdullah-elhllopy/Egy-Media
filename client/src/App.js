import { useMemo, Suspense } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import { themeSettings } from "./theme";
import router from "router";

function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<h1></h1>}>
          <RouterProvider router={router} />
        </Suspense>
        <ToastContainer />
      </ThemeProvider>

    </div>
  );
}

export default App;
