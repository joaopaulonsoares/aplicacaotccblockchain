import React, { useEffect }  from 'react';
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
import TransitBoardList from './NestedLists/TransitBoardList'

import {useStyles} from './const_info'

export default function MenuDrawer(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [isTransitBoard, setIsTransitBoard] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  }; 

  useEffect(() => {
    // Create an scoped async function in the hook
    async function checkIfIsTransitBoard(){
      var authoritie = await props.authorities.filter(authoritie => authoritie.authoritieAddress ===  props.account );
      setIsTransitBoard(authoritie[0].isTransitBoard);
    }
    // Execute the created function directly
    checkIfIsTransitBoard();
  }, [isTransitBoard, props.authorities, props.account]);

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
            {isTransitBoard ? 
              <Typography component="h1" variant="h6" noWrap className={classes.title}>Olá Junta de Trânsito, {props.account}</Typography>
              : 
              <Typography component="h1" variant="h6" noWrap className={classes.title}>Olá Autoridade de Trânsito, {props.account}</Typography>
            }
          
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" classes={{paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),}} open={open}>  
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
          </div>
          <Box paddingTop={2}>
          {isTransitBoard ? 
            <TransitBoardList></TransitBoardList> 
            : <div>
                <NestedToolListUser></NestedToolListUser>
                <NestedToolInfractions></NestedToolInfractions>
              </div>
          }
            
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
