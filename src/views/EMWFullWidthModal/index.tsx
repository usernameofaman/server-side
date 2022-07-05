import "./scss/index.scss";

import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import closeImg from '@material-ui/icons/Close';
import closeImg from "../../images/modal-close.svg";

import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import ReactSVG from "react-svg";

interface EMWFullWidthModalProps {
  open: any,
  handleClose: any,
  title: string,
  modalCustomClass: string,
  onSaveHandler: any,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EMWFullWidthModal: React.FC<EMWFullWidthModalProps> = props => {
  const  { children, open, handleClose ,title, modalCustomClass, onSaveHandler}=props;
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);
   return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} className={modalCustomClass ? modalCustomClass : ""}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <ReactSVG
                  path={closeImg}
                  className="modal__close"
              />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              { title }
            </Typography>
            <Button autoFocus color="inherit" onClick={onSaveHandler}>
              SAVE
            </Button>
          </Toolbar>
        </AppBar>
        { children }
      </Dialog>
    </div>
  );
}

export default EMWFullWidthModal; 
