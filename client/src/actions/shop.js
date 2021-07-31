import * as api from '../api/index';

export const createShop = (formData)=>async (dispatch)=>{
      
     try {
        dispatch({type:'CREATING_STARTS'});

        const {data} = await api.createShop(formData);
        dispatch({type:'CREATE_SHOP',payload:data});

        dispatch({type:'CREATING_ENDS'});

     } catch (error) {
        dispatch({type:'CREATING_ENDS'});
        const {data} = error.response;
        console.log(data); 
     }

}

export const getShop = ()=>async (dispatch)=>{
      
    try {
       const {data} = await api.getShop();
       dispatch({type:'GET_SHOP',payload:data});

    } catch (error) {
        const {data} = error.response;
        console.log(data); 
    }

}

export const updateShop = (formData,id)=>async(dispatch)=>{
   try{
      dispatch({type:'CREATING_STARTS'});

      const {data} = await api.updateShop(formData,id);
      dispatch({type:'UPDATE_SHOP',payload:data}); 

      dispatch({type:'CREATING_ENDS'});
   }catch(error){
      dispatch({type:'CREATING_ENDS'});
      const {data} = error.response;
      console.log(data); 
   }
} 