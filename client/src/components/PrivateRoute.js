import React from 'react';
import {Route, Redirect } from 'react-router-dom';

function PrivateRoute({isLoggedIn,component:Component,...rest}) {

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