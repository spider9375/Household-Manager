import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from "./routes/Root.tsx";
import Layout from "./Layout.tsx";
import Nomenclatures from "./nomenclatures/Nomenclatures.tsx";
import {createTheme, ThemeProvider} from "@mui/material";
import Fitness from './fitness/Fitness.tsx';

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
    },
    {
        path: "/nomenclatures",
        Component: Nomenclatures
    },
    {
        path: '/fitness',
        Component: Fitness
    }
]);

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#90caf9"
        }
    },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <Layout>
              <RouterProvider router={router} />
          </Layout>
      </ThemeProvider>

  </React.StrictMode>,
)
