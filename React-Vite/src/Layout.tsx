import './App.css'
import {FC, memo, ReactNode} from "react";
import Navbar from './core/navbar/Navbar';
import {createTheme} from "@mui/material";

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({children}) => {
    const theme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#90caf9"
            }

        },
    })

  return (
    <>
        <Navbar></Navbar>
        {children}
    </>
  )
}

export default memo(Layout);
