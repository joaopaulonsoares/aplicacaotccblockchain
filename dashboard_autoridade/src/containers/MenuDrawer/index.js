import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';

import NestedToolListUser from './NestedLists/NestedListUsers'
import NestedToolInfractions from './NestedLists/NestedListInfractions'

import {useStyles} from './const_info'

export default function MenuDrawer(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  }; 
  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon></MenuIcon>
          </IconButton>
          <Typography component="h1" variant="h6" noWrap className={classes.title}>
            Olá, {props.account}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" classes={{paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),}} open={open}>  
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
          </div>
          <Box paddingTop={2}>
            <NestedToolListUser></NestedToolListUser>
            <NestedToolInfractions></NestedToolInfractions>
          </Box>
      </Drawer>
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Box margin={1}>
          <Container maxWidth="ls" className={classes.container}>
              {props.children}
          </Container>
        </Box>
      </main>
    </div>
  );
}
