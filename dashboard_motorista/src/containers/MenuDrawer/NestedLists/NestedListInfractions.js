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
import GavelIcon from '@material-ui/icons/Gavel';
import ListIcon from '@material-ui/icons/List';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import ClearIcon from '@material-ui/icons/Clear';

import {INFRACTION_TRANSFERING_PAGE_URL, INFRACTION_CANCEL_PAGE_URL, AUTHORITIE_LIST_PAGE_URL} from '../../../api_urls'

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


export default function NestedToolInfractions(props) {
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
          <GavelIcon></GavelIcon>
        </ListItemIcon>
        <ListItemText primary={"Serviços"} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>


        <ListItem button component={Link} to={INFRACTION_TRANSFERING_PAGE_URL} className={classes.nested}>
          <ListItemIcon>
              <Icon>
              <TransferWithinAStationIcon></TransferWithinAStationIcon>
              </Icon>
          </ListItemIcon>
          <ListItemText primary="Transferência de Infração"/>
        </ListItem>

        <ListItem button component={Link} to={INFRACTION_CANCEL_PAGE_URL} className={classes.nested}>
          <ListItemIcon>
              <Icon>
              <ClearIcon></ClearIcon>
              </Icon>
          </ListItemIcon>
          <ListItemText primary="Recurso de Infração"/>
        </ListItem>

        <ListItem button component={Link} to={AUTHORITIE_LIST_PAGE_URL} className={classes.nested}>
          <ListItemIcon>
              <Icon>
              <ListIcon></ListIcon>
              </Icon>
          </ListItemIcon>
          <ListItemText primary="Lista de Autoridades"/>
        </ListItem>

        </List>
      </Collapse>
    </List>
  );
}
