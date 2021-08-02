import * as api from '../api/index';

import {LoggedInStatus} from './auth';
import {showSuccessNotification,showFailNotification} from './notification';


export const createShop = (formData)=>async (dispatch)=>{
      
     try {
        dispatch({type:'CREATING_STARTS'});

        const {data} = await api.createShop(formData);
        dispatch({type:'CREATE_SHOP',payload:data});

        dispatch({type:'CREATING_ENDS'});

     } catch (error) {
        dispatch({type:'CREATING_ENDS'});
        const {data} = error.response;
        dispatch(showFailNotification(data.message));
        
     }

}

export const getShop = ()=>async (dispatch)=>{
      
    try {
       const {data} = await api.getShop();
       dispatch({type:'GET_SHOP',payload:data});

    } catch (error) {

        dispatch(LoggedInStatus()); 
    }

}

export const updateShop = (formData,id)=>async(dispatch)=>{
   try{
      dispatch({type:'CREATING_STARTS'});

      const {data} = await api.updateShop(formData,id);
      dispatch({type:'UPDATE_SHOP',payload:data}); 

      dispatch({type:'CREATING_ENDS'});

      const message = 'Shop Updated successfully';
      dispatch(showSuccessNotification(message));

   }catch(error){
      dispatch({type:'CREATING_ENDS'});
      const {data} = error.response;

      dispatch(showFailNotification(data.message));
       
   }
} 

export const deleteShop = (id)=> async(dispatch)=>{

   try{
      const {data} = await api.deleteShop(id);
      console.log(data);
      dispatch({type:'DELETE_SHOP',payload:id});

      dispatch(showSuccessNotification(data.message));

   }catch(error){
      const {data} = error.response;
      dispatch(showFailNotification(data.message));
   }


}