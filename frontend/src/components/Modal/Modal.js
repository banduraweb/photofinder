import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 0),
  },
  close: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    right: '50%',
    cursor: 'pointer',
  },
  imgWrap: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },
  img: {
    width: '100%',
    height: '100%',
  },
}));

export const TransitionsModal = ({ open, handleClose, url }) => {
  const classes = useStyles({ url });
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.imgWrap}>
              <div className={classes.close}>
                <SettingsOverscanIcon fontSize="large" onClick={handleClose} />
              </div>
              <img src={url} className={classes.img} alt="current photo" />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
