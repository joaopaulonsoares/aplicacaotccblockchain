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
import ReceiptIcon from '@material-ui/icons/Receipt';
import PostAddIcon from '@material-ui/icons/PostAdd';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import ClearIcon from '@material-ui/icons/Clear';

import {INFRACTION_LIST_PAGE_URL, INFRACTION_REGISTER_PAGE_URL, INFRACTION_TRANSFERING_PAGE_URL, INFRACTION_CANCEL_PAGE_URL} from '../../../api_urls'

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
        <ListItemText primary={"Infrações"} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

        <ListItem button component={Link} to={INFRACTION_LIST_PAGE_URL} className={classes.nested}>
            <ListItemIcon>
              <Icon>
                <ReceiptIcon></ReceiptIcon>
              </Icon>
            </ListItemIcon>
            <ListItemText primary="Lista Infrações" />
        </ListItem>

          
        <ListItem button component={Link} to={INFRACTION_REGISTER_PAGE_URL} className={classes.nested}>
          <ListItemIcon>
              <Icon>
              <PostAddIcon></PostAddIcon>
              </Icon>
          </ListItemIcon>
          <ListItemText primary="Registrar Infração"/>
        </ListItem>

        <ListItem button component={Link} to={INFRACTION_TRANSFERING_PAGE_URL} className={classes.nested}>
          <ListItemIcon>
              <Icon>
              <TransferWithinAStationIcon></TransferWithinAStationIcon>
              </Icon>
          </ListItemIcon>
          <ListItemText primary="Transferência de Infrações"/>
        </ListItem>

        <ListItem button component={Link} to={INFRACTION_CANCEL_PAGE_URL} className={classes.nested}>
          <ListItemIcon>
              <Icon>
              <ClearIcon></ClearIcon>
              </Icon>
          </ListItemIcon>
          <ListItemText primary="Cancelamento de Infrações"/>
        </ListItem>

        </List>
      </Collapse>
    </List>
  );
}
