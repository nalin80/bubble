import React from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {LoggedInStatus} from '../actions/auth';

function NavBar(props) {
    // const [isLoggedIn, setLoggedIn] = useState(true);
    const history= useHistory();
    const dispatch = useDispatch();

    //this will handel my logout functionality
    const handelLogout = ()=>{
        localStorage.clear();
        dispatch(LoggedInStatus());
        history.push('/auth');
    }

    const profile = JSON.parse(localStorage.getItem('profile'));

    return (
        <div className="container-fluid navBar-box shadow-sm bg-body rounded">
            <div className="title">
                <h3>Bubble</h3>
            </div>
            <div className="user-section">
                
                    
                        <div className="userLogo text-center"><h4 className="title">{profile?.name.slice(0,1)}</h4></div>
                        <h5 className="title">{profile?.name}</h5>
                        <button type="button" className="signIn-btn" onClick={handelLogout}>Log out</button>
                    

            </div>

        </div>
    );
}

export default NavBar;