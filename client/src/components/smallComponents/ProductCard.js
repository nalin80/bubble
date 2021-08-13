import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {setAlertval} from '../../actions/alert';
import {deleteProduct} from '../../actions/product';

function ProductCard({setProducts,setEditProductId}) {
   
    const dispatch = useDispatch();
    const [productId,setProductId] = useState(null);

    const products = useSelector((state) => state.product.products);
    const isConfirmed = useSelector((state) => state.alert.isConfirmed);
    
    const handelDeleteProduct = (id)=>{
       setProductId(id);
       dispatch(setAlertval());
    }

    const handelEdit = (product)=>{
        setProducts(product);
        setEditProductId(product._id);
    }

    useEffect(()=>{
        if(isConfirmed&&productId){
          dispatch(deleteProduct(productId));
          setProductId(null);
        }

    },[productId,isConfirmed,dispatch])

    return (
        <>
            {
                products.map((product) => {
                    return (
                        <div key={product._id} className="display-card">
                            <div className="display-card-header">
                                <div className="card-img">
                                    <img src={`http://localhost:5000${product.productImg}`} alt="" />
                                </div>
                                <h5>{product.productName}</h5>
                                <span><b>By:&nbsp;</b>{product.productBrand}</span>
                            </div>
                            <div className="display-card-body">
                                <div className="display-card-button">
                                    <button className="card-update" onClick={()=>handelEdit(product)}>UPDATE</button>
                                    <button className="card-delete" onClick={()=>handelDeleteProduct(product._id)}>DELETE</button>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </>
    );
}

export default ProductCard;