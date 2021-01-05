import React, { useCallback, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Button,
  Grid,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { useDispatch, useSelector } from 'react-redux';
import { pushLogout } from '../../modules/signIn/signInActions';
import routing from '../../routing/routing';
import { useHistory, useLocation } from 'react-router-dom';
import { Drawer } from './components/Drawer/Dreawer';
import {
  pushPhoto,
  resetCountPage,
  resetPhotoList,
  saveQuerySearch,
} from '../../modules/photoPixabay/photoActions';
import csx from 'classnames';
import { photoSelectors } from '../../modules/photoPixabay/photoSelectors';
import { queryNormalize } from '../../heplers/stringNormalize';
import { REQUEST } from '../../constants/constants';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '400px',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '345px',
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  userInfo: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  content: {
    padding: theme.spacing(1, 0),
  },
  sendIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0,
    cursor: 'pointer',
  },
  toolBar: {
    width: '100%',
  },
  '@global': {
    body: {
      backgroundImage: ({ query }) =>
        query ? 'url(https://source.unsplash.com/random)' : 'none',
      height: '100vh',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
    },
  },
  searchOnStartPage: {
    color: '#000',
    position: 'absolute',
    top: '40vh',
    backgroundColor: '#fff',
  },
}));

export const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const refreshToken = localStorage.getItem('refreshToken');
  const [openDrawer, setOpenDrawer] = useState(false);
  const { query } = useSelector(photoSelectors.selectActiveQuery);
  const { photoList, status } = useSelector(
    photoSelectors.selectFetchedPhotoFromApi
  );
  const showBgIMG =
    location.pathname === routing().root &&
    photoList.length === 0 &&
    status !== REQUEST;

  const classes = useStyles({ query: showBgIMG });

  const redirectToSearchResults = useCallback(() => {
    if (location.pathname !== routing().root) {
      history.push(routing().root);
    }
  }, [location.pathname]);

  const logout = useCallback(() => {
    dispatch(pushLogout(refreshToken));
    history.push(routing().login);
  }, [dispatch, history, refreshToken]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpenDrawer(open);
  };

  const handleChange = useCallback(
    ({ target }) => {
      const { value, name } = target;
      dispatch(saveQuerySearch({ value: queryNormalize(value), name }));
    },
    [dispatch]
  );

  const loadPhotoList = () => {
    if (query !== '') {
      dispatch(resetPhotoList());
      dispatch(resetCountPage());
      dispatch(pushPhoto(query));
    }
  };

  const onEnterKey = (e) => {
    if (e.key === 'Enter' && query !== '') {
      redirectToSearchResults();
      loadPhotoList();
    }
  };

  const onSearch = (e) => {
    if (query !== '') {
      redirectToSearchResults();
      loadPhotoList();
    }
  };

  return (
    <div className={classes.grow}>
      <Drawer state={openDrawer} toggleDrawer={toggleDrawer} logout={logout} />
      <AppBar position="sticky">
        <Grid container justify="space-between" alignItems="center">
          <Toolbar className={classes.toolBar}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Photo finder
            </Typography>
            <div
              className={csx(
                showBgIMG ? classes.searchOnStartPage : classes.search
              )}
            >
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onKeyPress={onEnterKey}
                value={query}
                name="query"
                onChange={handleChange}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
              <div className={classes.sendIcon} onClick={onSearch}>
                <SendIcon />
              </div>
            </div>
            <div className={classes.grow} />

            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </Grid>
      </AppBar>
      <Grid container>
        <Grid item xs={false} md={1} />
        <Grid item className={classes.content} xs={12} md={10}>
          {children}
        </Grid>
        <Grid item xs={false} md={1} />
      </Grid>
    </div>
  );
};
