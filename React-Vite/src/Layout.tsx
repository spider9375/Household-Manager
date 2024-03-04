import './App.css'
import {FC, memo, ReactNode} from "react";
import Navbar from './components/navbar/Navbar';
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
    <div>
        <Navbar></Navbar>
        <div style={{paddingTop: '70px'}}>{children}</div>
    </div>
  )
}

export default memo(Layout);
