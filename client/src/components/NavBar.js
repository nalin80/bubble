import React,{useEffect} from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoggedInStatus } from '../actions/auth';

import Alert from './smallComponents/Alert';
import Notification from './smallComponents/Notification';

function NavBar(props) {
    //this will check whether alert modal is open or not
    const isAlertOpen = useSelector((state)=>state.alert.showAlert);
    const isNotificationOpen = useSelector((state)=>state.notification.close);

    const history = useHistory();
    const dispatch = useDispatch();

    //this will handel my logout functionality
    const handelLogout = () => {
        localStorage.clear();
        dispatch(LoggedInStatus());
        history.push('/auth');
    }


    //this value is comming from auth reducers;
    const profile = useSelector((state)=>state.auth.user);

    useEffect(()=>{
        isAlertOpen?document.body.classList.add('alert-body'):document.body.classList.remove('alert-body');
    },[isAlertOpen]);


    return (
        <>
            <div className="container-fluid navBar-box shadow-sm bg-body rounded">
                <div className="title">
                    <h3>Bubble</h3>
                </div>
                <div className="user-section">


                    <div className="userLogo text-center"><h4 className="title">{profile?.name.slice(0, 1)}</h4></div>
                    <h5 className="title">{profile?.name}</h5>
                    <button type="button" className="signIn-btn" onClick={handelLogout}>Log out</button>


                </div>

            </div>
            {isAlertOpen&&<Alert />}
            {!isNotificationOpen&&<Notification/>}
            
        </>
    );
}

export default NavBar;