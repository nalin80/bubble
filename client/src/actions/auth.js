import * as api from '../api/index';

export const signIn = (formData,history)=>async (dispatch)=>{

    try{
        
        dispatch({type:'LOGIN_START'});

        const {data} = await api.signIn(formData);
        if(data.profile){
          localStorage.setItem('profile',JSON.stringify(data.profile));
        }
        dispatch({type:'LOGIN_END'});
        dispatch(LoggedInStatus());

        history.push('/');

    }catch(error){
        const {data} =error.response; 
//to be deleted
        console.log(data);

        dispatch({type:'LOGIN_END'});
    }

} 

export const signUp = (formData,setSignUp)=>async (dispatch)=>{

   try{
    dispatch({type:'REISTRATION_START'});  

    const {data} = await api.signUp(formData);
    //to be deleted
    console.log(data);

    dispatch({type:'REISTRATION_END'});  
    setSignUp(false);
   }catch(error){
       const {data} = error.response;
       //to be deleted
       console.log(data);

       dispatch({type:'REISTRATION_END'});  
   }

} 

export const LoggedInStatus = ()=>async (dispatch)=>{
    
    const profile = JSON.parse(localStorage.getItem('profile'));
    
    if(profile?.token){
        dispatch({type:'LOGGED_IN',payload:{
            state:true,
            user:{
                id:profile?.id,
                name:profile?.name,
                email:profile?.email,
                token:profile?.token
            }
        }});
    }else{
        dispatch({type:'LOGGED_IN',payload:{
            state:false,
            user:null
        }});
    }

}
