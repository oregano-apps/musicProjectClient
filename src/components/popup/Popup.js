import React from 'react'
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';

function Popup({type, message, classes}) {
    return (
        <div className={classes}>
            {type == "error" ?
              <ErrorIcon className="popupIcon"  style={{color: 'red'}} /> : type == "info" ?
              <InfoIcon className="popupIcon" style={{color: 'yellow'}} /> :
              <CheckCircleIcon className="popupIcon" style={{color: 'green'}} />}
            <h2 className="popupText">{message}</h2>
        </div>
    )
}

export default Popup
