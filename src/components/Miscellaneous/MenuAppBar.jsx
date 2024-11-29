import React from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Menu, MenuItem, } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function MenuAppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

 /* Source for code reference is https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu */

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color="success" >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Homepage
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/customer"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    Customers
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/training"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    Training
                  </Link>
                </MenuItem>
              </Menu>
              <Typography variant="h6" component="div">
                Personal Trainer
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      );
    }