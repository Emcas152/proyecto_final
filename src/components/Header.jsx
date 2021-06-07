import React  from "react";
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton,Typography } from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link, useParams } from "react-router-dom";

export default function Header() {
    let { Page } = useParams();
    const [anchorEl, setAnchorEl] = React.useState(false);
    const handleClick = () => {
        setAnchorEl(true);
    };
    const handleClose = () => {
        setAnchorEl(false);
    };
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));
    const classes = useStyles();
        return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <MenuIcon>Menu</MenuIcon>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {Page}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link to={"/Inicio"} className={'LinkDeco'}><MenuItem onClick={handleClose}>Inicio</MenuItem></Link>
                <Link to={"/Regiones"} className={'LinkDeco'}><MenuItem onClick={handleClose}>Regiones</MenuItem></Link>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
}