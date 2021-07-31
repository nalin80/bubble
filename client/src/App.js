import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


import Home from './components/Home';
// import PrivateRoute from './components/PrivateRoute';
import Auth from "./components/Auth";
import { LoggedInStatus } from './actions/auth';


import './App.scss';

function App() {

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
     dispatch(LoggedInStatus());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Switch>


          {/* <Route exact path ="/" component={()=>(isLoggedIn?<Home initialIndex={1}/>:<Redirect to="/auth"/>)}/>
          <Route exact path ="/home/my-shop" component={()=>(isLoggedIn?<Home initialIndex={1}/>:<Auth/>)}/>
          <Route exact path ="/home/my-products" component={()=>(isLoggedIn?<Home initialIndex={2}/>:<Auth/>)}/> 
          <PrivateRoute isLoggedIn={isLoggedIn} initialIndex = {2} component={Home} path="/home/my-products" exact/>
          */}
          
          <Route path="/auth" exact component={() => (!isLoggedIn ? <Auth /> : <Redirect to="/" />)} />
          
          {isLoggedIn ? (
            <>
              <Route component={() => <Home initialIndex={1} />} path="/" exact />
              <Route component={() => <Home initialIndex={1} />} path="/home/my-shop" exact />
              <Route component={() => <Home initialIndex={2} />} path="/home/my-products" exact />
            </>
          ):<Redirect to="/auth" />}

        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
