import React from 'react';
import {Route, Redirect } from 'react-router-dom';

function PrivateRoute({isLoggedIn,path,component:Component}) {

    return (
        <Route 
        path={path}
        render={()=>{
         return isLoggedIn?<Component/>:<Redirect to="/auth"/>
        }}
        />
    );
}

export default PrivateRoute;