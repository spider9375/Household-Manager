import { FC, memo } from "react";
import { AppBar, Button, Link, Toolbar } from "@mui/material";
import DarkMode from "../darkmode/Darkmode";
import classes from './Navbar.module.scss'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <div className={classes.buttons}>
          <Button
            fullWidth={false}
            sx={{ m: 1, color: "white", display: "block" }}
          >
            DASHBOARD
          </Button>
          <Button
            fullWidth={false}
            sx={{ m: 2, color: "white", display: "block" }}
          >
            EXPENSES
          </Button>
          <Button
            fullWidth={false}
            sx={{ m: 1, color: "white", display: "block" }}
          >
            INVENTORY
          </Button>
          <Button color="secondary" href={"/nomenclatures"}>
            Nomenclatures
          </Button>
          <Button color="secondary" href={"/fitness"}>
            Fitness
          </Button>
        </div>
        <div>
          <DarkMode />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Navbar);
