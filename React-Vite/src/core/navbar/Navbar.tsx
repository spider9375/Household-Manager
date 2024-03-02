import {FC, memo} from "react";
import {AppBar, Button, Link, Toolbar} from "@mui/material";

interface NavbarProps {

}

const Navbar: FC<NavbarProps> = ({}) => {
    return (<AppBar>
        <Toolbar>
            <Button
                fullWidth={false}
                sx={{ m: 1, color: 'white', display: 'block' }}
            >
                DASHBOARD
            </Button>
            <Button
                fullWidth={false}
                sx={{ m: 2, color: 'white', display: 'block' }}
            >
                EXPENSES
            </Button>
            <Button
                fullWidth={false}
                sx={{ m: 1, color: 'white', display: 'block' }}
            >
                INVENTORY
            </Button>
            <Button
                color="secondary"
                href={'/nomenclatures'}
            >
                Nomenclatures
            </Button>
            <Button
            color="secondary"
            href={'/fitness'}>
                Fitness
            </Button>
        </Toolbar>

    </AppBar>)
}

export default memo(Navbar);
