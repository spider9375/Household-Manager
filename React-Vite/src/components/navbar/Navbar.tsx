import { FC, memo } from "react";
import { AppBar, Button, Link, Toolbar } from "@mui/material";
import DarkMode from "../darkmode/Darkmode";
import classes from './Navbar.module.scss'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <AppBar color="primary">
      <Toolbar className={classes.toolbar}>
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
          <Button color="secondary" variant="contained" href={"/nomenclatures"}>
            Nomenclatures
          </Button>
          <Button color="secondary" variant="contained" href={"/fitness"}>
            Fitness
          </Button>
          <Button color="secondary" variant="contained" href={"/categories"}>
            Categories
          </Button>
        <div>
          {/* <DarkMode /> */}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Navbar);
