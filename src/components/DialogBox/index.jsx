import './index.scss'
import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Fade from '@mui/material/Fade';

const DialogBox = ({ hr, isShowing, hide, title, children, height, overflowY }) => isShowing ? ReactDOM.createPortal(
    <div>
    <React.Fragment>
      <div className="modal-overlay" />
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <Fade in={isShowing} timeout={300}>
        <div className="modal" style={{ height : height, overflowY : overflowY, overflowX:'hidden'}}>
          <div className="modal-header">
            <div className='modal-title'><p><b>{title}</b></p></div>
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
              <FontAwesomeIcon className='dialog-close-icon' icon={faXmark}/>
            </button>
          </div>
          {hr &&  <hr/>}
          {children}
        </div>
      </Fade>
      </div>
    </React.Fragment>
    </div>, document.body
  ) : null;
  
  export default DialogBox;