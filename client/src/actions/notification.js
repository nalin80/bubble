export const showSuccessNotification = (message)=>async (dispatch)=>{

    try{

        dispatch({type:'SHOW_SUCCESS',payload:message});

    }catch(error){
      console.log(error);
    }

}

export const showFailNotification = (message)=>async (dispatch)=>{

    try{

        dispatch({type:'SHOW_FAIL',payload:message});
    
    }catch(error){
      console.log(error);
    }

}

export const closeNotification = ()=>async (dispatch)=>{

    try{

        dispatch({type:'CLOSE_NOTIFICATION'});

    }catch(error){
      console.log(error);
    }

}