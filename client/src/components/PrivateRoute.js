import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Route, Redirect } from 'react-router-dom';

import { LoggedInStatus } from '../actions/auth';

function PrivateRoute({component:Component,...rest}) {

    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        if(rest.path){
        dispatch(LoggedInStatus());
        }
    },[dispatch,rest.path]);
    
    const render = (props)=>{        
        if(!isLoggedIn){
            return <Redirect to ="/auth"/>
        }

        return <Component {...rest} {...props}/>
    }

    return (
        <Route  render={render}/>
    );
}

export default PrivateRoute;