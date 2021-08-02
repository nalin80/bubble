import React from 'react';
import {useDispatch} from 'react-redux'
import {setAlertval,confirmAlert} from '../../actions/alert';

function Alert(props) {
    
    const dispatch = useDispatch();

    const handelCancel = ()=>{
        dispatch(setAlertval());
    }

    const handelConfirm = ()=>{
        dispatch(confirmAlert());
    }

    return (
        <div className="alert-container-body">
            <div className="alert-container">
                <div className="alert-message">
                    <h2>Are you sure to delete this?</h2>
                    <span>if you delete this you can't recover it</span>
                </div>

                <div className="alert-button-container">
                    <button className="alert-button btn-white" onClick={handelCancel}>Cancel</button>
                    <button className="alert-button btn-red" onClick={handelConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default Alert;