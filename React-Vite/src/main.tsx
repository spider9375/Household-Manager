import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from "./routes/Root.tsx";
import Layout from "./Layout.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Layout>
          <RouterProvider router={router} />
      </Layout>
  </React.StrictMode>,
)
