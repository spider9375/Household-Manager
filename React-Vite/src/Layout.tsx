import './App.css'
import {FC, memo, ReactNode} from "react";

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({children}) => {
  return (
    <>
        {children}
    </>
  )
}

export default memo(Layout);
