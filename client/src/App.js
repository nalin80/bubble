import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/Home';
// import PrivateRoute from './components/PrivateRoute';
import Auth from "./components/Auth";
import {LoggedInStatus} from './actions/auth';


import './App.scss';

function App() {

  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector((state)=>state.auth);


  useEffect(()=>{
    dispatch(LoggedInStatus());
  },[dispatch]);
  // const profile = JSON.parse(localStorage.getItem('profile'));
  

  return (
    <>
      <BrowserRouter>
        <Switch>
          

          {/* <PrivateRoute 
          exact path="/"
          component = {Home}
          isLoggedIn={isLoggedIn}
          />


          <Route exact path="/auth">
            {isLoggedIn? <Redirect to="/" /> : <Auth />}
          </Route> */}

          <Route exact path ="/" component={()=>(isLoggedIn?<Home/>:<Redirect to="/auth"/>)}/>
          <Route path="/auth" exact component={() => (!isLoggedIn ? <Auth /> : <Redirect to="/" />)} />


        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
