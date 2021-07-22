// import React,{useEffect} from 'react';
// import {useHistory} from 'react-router-dom';

import NavBar from './NavBar';


function Home(props) {

    // const history = useHistory();
    // const  token  = JSON.parse(localStorage.getItem('profile'));
  
    // useEffect(()=>{
    //      if(!token){
    //          history.push('/auth');
    //      }
    //     console.log('hello');
    // },[]);
  
    // console.log(token);

    return (
        <div>
            <NavBar/>
            Home
        </div>
    );
}

export default Home;