import React, { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';


import {signIn,signUp} from '../actions/auth';

//images
import mail from './images/mail.png';
import password_img from './images/password_img.png';


function Auth(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const {LogginStart} = useSelector((state)=>state.auth);
    const {RegistraionStart} = useSelector((state)=>state.auth);
    

    const [isSignUp, setSignUp] = useState(false);
    const [userDetails,setUserDetails] = useState({
        userName:'',
        email:'',
        password:'',
        confirm_password:''
    });

    //clear the form details when state changes or submitted

    const clear = ()=>{
        setUserDetails({
            userName:'',
            email:'',
            password:'',
            confirm_password:''
        });
    }

    //handiling the login form here
      const handelLoginForm = (e)=>{
           e.preventDefault();
           if(userDetails.email!==""&&userDetails.password!==""){
             
             dispatch(signIn(userDetails,history));
             clear();

           }
 

      }

    //handiling the sign up form here
    const handelSignUpForm = (e)=>{
        e.preventDefault();  
        if(userDetails.userName!==""&&userDetails.email!==""&&userDetails.confirm_password!==""&&userDetails.password!==""){
        
         dispatch(signUp(userDetails,setSignUp)); 
         clear();
        }  

   }      

   //this will handel the changing of input value;
   const handelChange =(e)=>{
    setUserDetails({...userDetails,[e.target.name]:e.target.value});
   }

    return (
        
        <div className="container-fluid form-container">
            <div className="form-box shadow-sm bg-body rounded">

                <div className="title">
                    <img src="https://image.flaticon.com/icons/png/512/3081/3081559.png" alt="" />
                    <h3 className="text-center mt-2">{isSignUp ? 'Create a new Account' : 'Welcome to Bubble'}</h3>
                </div>

                <form className="mt-4 ms-3 me-3" >
                    {isSignUp && (
                        <div className="form-body mb-3">
                            <input type="text" className="input-text" name="userName" value={userDetails.userName} placeholder="User Name" 
                            onChange={handelChange} required autoComplete=""/>
                            <span className="placeholder-img"><img src={mail} alt="" /></span>
                        </div>
                    )}
                    <div className="form-body mb-3">
                        <input type="email" className="input-text" name="email" value={userDetails.email} placeholder="Email Address" 
                        onChange={handelChange} required autoComplete="" />
                        <span className="placeholder-img"><img src={mail} alt="" /></span>
                    </div>

                    <div className="form-body mb-3">
                        <input type="password" className="input-text" name="password" value={userDetails.password} placeholder="Password" 
                        onChange={handelChange} required autoComplete=""/>
                        <span className="placeholder-img"><img src={password_img} alt="" /></span>
                    </div>

                    {isSignUp ? (
                        <>
                            <div className="form-body mb-3">
                                <input type="password" className="input-text" name="confirm_password" value={userDetails.confirm_password} placeholder="Verify Password" 
                                onChange={handelChange} required autoComplete=""/>
                                <span className="placeholder-img"><img src={password_img} alt="" /></span>
                            </div>
                            <button type="submit" className="mt-4 btn form-btn" onClick={handelSignUpForm} disabled={RegistraionStart}>{RegistraionStart?'PROCESSING...':'SIGN UP'}</button>
                        </>
                    ) : (
                        <button type="submit" className="mt-4 btn form-btn" onClick={handelLoginForm} disabled={LogginStart}>{LogginStart?'PROCESSING...':'SIGN IN'}</button>
                    )}


                </form>

                {!isSignUp ? (
                    <div className="sign-up-link">
                        <h5 className="text-center mt-3" onClick={() =>{clear(); setSignUp(true)}} >Don't have an Accoun? Sign Up</h5>
                    </div>
                ) : (
                    <div className="sign-up-link">
                        <h5 className="text-center mt-3" onClick={() => {clear();  setSignUp(false)}} >Have an Accoun? Sign In</h5>
                    </div>
                )}

            </div>
        </div>
    
    );
}

export default Auth;