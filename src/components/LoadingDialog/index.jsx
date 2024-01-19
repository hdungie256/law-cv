import React from 'react';
import ReactDOM from 'react-dom';
import { Box } from '@mui/material';
import {CircularProgress} from '@mui/material';
import {Fade} from '@mui/material';

const LoadingDialog = ({ isShowing }) => isShowing ? ReactDOM.createPortal(
    <Fade in={isShowing} timeout={500}>
    <div>
            <React.Fragment>
            <div className="modal-overlay" />
            <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                                <CircularProgress sx={{color: 'white'}}/>
                                </Box>
            </div>
            </React.Fragment>
    </div>
    </Fade>, document.body
  ) : null;
  
  export default LoadingDialog;