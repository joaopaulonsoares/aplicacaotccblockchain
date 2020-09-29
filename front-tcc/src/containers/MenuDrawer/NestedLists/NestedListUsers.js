import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { Link } from "react-router-dom";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PeopleIcon from '@material-ui/icons/People';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import {DRIVER_REGISTER_PAGE_URL} from '../../../api_urls'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));


export default function NestedToolListUser(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <AccountCircleIcon></AccountCircleIcon>
        </ListItemIcon>
        <ListItemText primary={"Usuários"} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

        <ListItem button component={Link}  className={classes.nested}>
            <ListItemIcon>
              <Icon>
                <PeopleIcon></PeopleIcon>
              </Icon>
            </ListItemIcon>
            <ListItemText primary="Motoristas" />
        </ListItem>

          
        <ListItem button component={Link} to={DRIVER_REGISTER_PAGE_URL} className={classes.nested}>
        <ListItemIcon>
            <Icon>
            <GroupAddIcon></GroupAddIcon>
            </Icon>
        </ListItemIcon>
        <ListItemText primary="Registrar Motorista" />
        </ListItem>

        <ListItem button component={Link} className={classes.nested}>
            <ListItemIcon>
              <Icon>
                <PersonIcon></PersonIcon>
              </Icon>
            </ListItemIcon>
            <ListItemText primary="Autoridades" />
        </ListItem>

        <ListItem  button component={Link} className={classes.nested}>
            <ListItemIcon>
              <Icon>
                <PersonAddIcon></PersonAddIcon>
              </Icon>
            </ListItemIcon>
            <ListItemText primary="Registrar Autoridade" />
        </ListItem>
        
        </List>
      </Collapse>
    </List>
  );
}
