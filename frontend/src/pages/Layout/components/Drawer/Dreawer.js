import React from 'react';
import clsx from 'classnames';
import { makeStyles } from '@material-ui/core/styles/index';
import {
  Drawer as DrawerMUI,
  List,
  Divider,
  ListItem,
} from '@material-ui/core/index';
import ListItemIcon from '@material-ui/core/ListItemIcon/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import HistoryIcon from '@material-ui/icons/History';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { useHistory } from 'react-router-dom';

import routing from '../../../../routing/routing';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export const Drawer = ({ state, toggleDrawer, logout }) => {
  const history = useHistory();
  const classes = useStyles();
  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => history.push(routing().root)}>
          <ListItemIcon>
            <HomeIcon htmlColor="#bbdefb" />
          </ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>
        <ListItem button onClick={() => history.push(routing().profile)}>
          <ListItemIcon>
            <PersonIcon htmlColor="#90caf9" />
          </ListItemIcon>
          <ListItemText primary={'Profile'} />
        </ListItem>
        <ListItem button onClick={() => history.push(routing().keywords)}>
          <ListItemIcon>
            <HistoryIcon htmlColor="#64b5f6" />
          </ListItemIcon>
          <ListItemText primary={'History'} />
        </ListItem>
        <ListItem button onClick={() => history.push(routing().liked)}>
          <ListItemIcon>
            <FavoriteIcon htmlColor="#ff3d00" />
          </ListItemIcon>
          <ListItemText primary={'Liked'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <MeetingRoomIcon htmlColor="#9c27b0" />
          </ListItemIcon>
          <ListItemText primary={'Logout'} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <DrawerMUI open={state} onClose={toggleDrawer(false)}>
        {list()}
      </DrawerMUI>
    </div>
  );
};
