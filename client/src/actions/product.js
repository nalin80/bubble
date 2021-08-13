import * as api from '../api/index';

import {LoggedInStatus} from './auth';
import {showSuccessNotification,showFailNotification} from './notification';

export const createProduct = (formData)=> async (dispatch)=>{

    try {
        dispatch({type:'CREATING_STARTS'});

        const {data} = await api.createProduct(formData);
       
        dispatch({type:'ADD_PRODUCT',payload:data});

        dispatch({type:'CREATING_ENDS'});

        const message = 'Product creadted successfully';
        dispatch(showSuccessNotification(message));

    } catch (error) {
        dispatch({type:'CREATING_ENDS'});

        const {data} = error.response;
        dispatch(showFailNotification(data.message));
    }

}

export const getProducts = (id)=>async (dispatch)=>{
    try{
     
        const {data} = await api.getProducts(id);
        
        dispatch({type:'GET_PRODUCTS',payload:data});

    }catch(error){
        dispatch(LoggedInStatus());
        
    }
}

export const deleteProduct = (id)=>async (dispatch)=>{
 
    try{
        const {data} = await api.deleteProduct(id);
        console.log(data);

        dispatch({type:'DELETE_PRODUCT',payload:id});

        dispatch(showSuccessNotification(data.message));

    }catch(error){
        const {data} = error.response;
        dispatch(showFailNotification(data.message));
    }
    
}

export const updateProduct = (id,formData) =>async (dispatch)=>{
    try{
       
        const {data}=await api.updateProduct(id,formData);
        console.log(data);

        dispatch({type:'UPDATE_PRODUCT',payload:data});

        const message = 'Product Updated successfully';
        dispatch(showSuccessNotification(message));

    }catch(error){
        const {data} = error.response;
        dispatch(showFailNotification(data.message));
    }
}