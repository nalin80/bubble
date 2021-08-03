import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import Auth from "./components/Auth";


import './App.scss';

function App() {

  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <>
      <BrowserRouter>
        <Switch>


          {/* {isLoggedIn ? (
            <>
              <Route path="/" exact component={() => <Home initialIndex={1} />}/>
              <Route path="/home/my-shop" exact component={() => <Home initialIndex={1} />} />
              <Route path="/home/my-products" exact component={() => <Home initialIndex={2} />}/>
            </>
          ):<Redirect to="/auth" />} */}

          <Route path="/auth" exact component={() => (!isLoggedIn ? <Auth /> : <Redirect to="/" />)} />

          <PrivateRoute initialIndex={1} component={Home} path="/" exact />
          <PrivateRoute initialIndex={1} component={Home} path="/home/my-shop" exact />
          <PrivateRoute initialIndex={2} component={Home} path="/home/my-products" exact />

        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
