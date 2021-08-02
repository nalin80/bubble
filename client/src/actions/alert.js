
export const setAlertval = ()=> async (dispatch)=>{
    try{
       dispatch({type:'SET_ALERT'});
    }catch(error){
        console.log(error);
    }
}

export const confirmAlert = ()=> async (dispatch)=>{
    try{
       dispatch({type:'CONFIRMED_ALERT'});
    }catch(error){
        console.log(error);
    }
}