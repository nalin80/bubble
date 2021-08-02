import React from 'react';
import {useSelector,useDispatch} from 'react-redux';

import {closeNotification} from '../../actions/notification';

function Notification(props) {

    const dispatch = useDispatch();

    const notyfi = useSelector((state)=>state.notification);
    const notyfiClass = notyfi?.show_success?'notyfi-container success-msg':'notyfi-container error-msg';

    return (
        <div className={notyfiClass}>
            <div className="notyfi-body">
                <h5>{notyfi?.show_success?'Success':'Error'}</h5>
                <span>{notyfi?.message}</span>
            </div>
            <div className="close-btn">
                <span onClick={()=>dispatch(closeNotification())}>close</span>
            </div>
        </div>
    );
}

export default Notification;