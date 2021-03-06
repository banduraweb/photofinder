import React, {FC} from 'react';
import { Img } from 'react-image';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import InfiniteScroll from 'react-infinite-scroll-component';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import csx from 'classnames';
import { TransitionsModal } from '../Modal/Modal';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    height: '100%',
  },
  gridList: {
    width: 900,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  iconActive: {
    color: 'red',
  },
  imgInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  left: {
    alignItems: 'flex-end',
    paddingRight: '5px',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
    },
  },
  right: {
    alignItems: 'baseline',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
    },
  },
  progress: {
    width: '100%',
    marginTop: theme.spacing(2),
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  imgWrap: {
    '& > img': {
      top: '50%',
      width: '100%',
      position: 'relative',
      transform: 'translateY(-50%)',
    },
  },
}));


type GridListBarProps = {
  onScroll: ()=>void,
  photoList: Array<IimageApi>,
  loading: boolean,
  successLoaded: boolean,
  handleOpenCurrentImg: (url: string)=>void,
  handleCloseCurrentImg: ()=>void,
  open: CurrentIMGOpen,
  downloadImage: (url: string)=>void,
  toggleLike: (arg: IimageApi)=>void,
  isMyLikesPage: boolean,
  query: string,
  myLikesLoading: boolean,
  successLoadedLikes: boolean
}

export const GridListBar:FC<GridListBarProps> = ({
  onScroll,
  photoList,
  loading,
  successLoaded,
  handleOpenCurrentImg,
  handleCloseCurrentImg,
  open,
  downloadImage,
  toggleLike,
  isMyLikesPage,
  query,
  myLikesLoading,
  successLoadedLikes,
}) => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');

  const cols = matches ? 2 : 1;
  const cellHeight = matches ? 280 : 380;

  return (
    <div className={classes.root}>
      {isMyLikesPage && myLikesLoading ? (
        <div className={classes.progress}>
          <LinearProgress color="secondary" />
        </div>
      ) : isMyLikesPage && successLoadedLikes && photoList.length === 0 ? (
        <Typography variant="h6">You have no liked photos yet</Typography>
      ) : null}
      <InfiniteScroll
        style={isMyLikesPage ?  { overflow: 'hidden' } :  { overflow: 'auto' }}
        dataLength={photoList.length}
        next={onScroll}
        hasMore={!isMyLikesPage && !!query}
        loader={
          <div className={classes.root}>
            {loading ? (
              <div className={classes.progress}>
                <LinearProgress color="secondary" />
              </div>
            ) : successLoaded && !photoList.length ? (
              <span style={{ color: '#F50057' }}>No photo by query</span>
            ) : (
              <span style={{ visibility: 'hidden' }}>Lets Find!</span>
            )}
          </div>
        }
      >
        <GridList
          cellHeight={cellHeight}
          className={classes.gridList}
          cols={cols}
        >
          <TransitionsModal
            open={open.isOpen}
            handleClose={handleCloseCurrentImg}
            url={open.url}
          />
          {!!photoList.length &&
            photoList.map((tile: IimageApi, i: number) => (
              <GridListTile key={tile.largeImageURL}>
                <span className={classes.imgWrap}>
                  <Img
                    src={tile.largeImageURL}
                    loader={<LinearProgress color="secondary" />}
                  />
                </span>
                <GridListTileBar
                  className={csx(
                    classes.imgInfo,
                    i % 2 === 0 ? classes.left : classes.right
                  )}
                  title={tile.tags}
                  subtitle={<span>by: {tile.user}</span>}
                  actionIcon={[
                    <IconButton
                      onClick={() => handleOpenCurrentImg(tile.largeImageURL)}
                      key={'full screen'}
                      aria-label={`info about ${tile.type}`}
                      className={classes.icon}
                    >
                      <SettingsOverscanIcon />
                    </IconButton>,
                    <IconButton
                      onClick={() =>
                        toggleLike({
                          ...tile,
                          liked: !tile.liked,
                          photoId: tile.id.toString(),
                          url: tile.largeImageURL
                        })
                      }
                      key={'fFavoriteIcon'}
                      aria-label={`info about ${tile.type}`}
                      className={csx(
                        tile.liked ? classes.iconActive : classes.icon
                      )}
                    >
                      {isMyLikesPage ? <DeleteForeverIcon /> : <FavoriteIcon />}
                    </IconButton>,
                    <IconButton
                      onClick={() => downloadImage(tile.largeImageURL)}
                      key={'SaveAltIcon'}
                      aria-label={`info about ${tile.type}`}
                      className={classes.icon}
                    >
                      <SaveAltIcon />
                    </IconButton>,
                  ]}
                />
              </GridListTile>
            ))}
        </GridList>
      </InfiniteScroll>
    </div>
  );
};
