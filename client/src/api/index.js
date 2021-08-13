import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:5000/api'});

API.interceptors.request.use((req)=>{

   if(localStorage.getItem('profile')){
       req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile'))?.token}`;
   } 
   return req;
});

export const signIn = (formData)=>API.post('/users/signIn',formData);
export const signUp = (formData)=>API.post('/users/signUp',formData);

/*************************shop section********************/
export const createShop = (formData)=>API.post('/shop/createShop',formData);
export const getShop = ()=>API.get('/shop/getShop');
export const updateShop = (formData,id)=>API.post(`/shop/updateShop/${id}`,formData);
export const deleteShop = (id)=>API.post(`/shop/deleteShop/${id}`);
export const addShopCategories = (shop_id,category,categoryIndex)=>API.post(`/shop/products/addProductCategory`,{shop_id,category,categoryIndex});
export const deleteShopCategories = (shop_id,index)=>API.post(`/shop/products/deleteProductCategory`,{shop_id,index});

/*************************Product section********************/
export const createProduct = (formData)=>API.post(`/shop/products/addProduct`,formData);
export const getProducts = (id)=>API.get(`/shop/products/getProduct/${id}`);
export const deleteProduct = (id)=>API.post(`/shop/products/deleteProduct/${id}`);
export const updateProduct = (id,formData)=>API.post(`/shop/products/updateProduct/${id}`,formData);