import React,{useEffect,useState} from 'react';
import { useSelector,useDispatch} from 'react-redux'
import {setAlertval} from '../../actions/alert';
import {deleteShop} from '../../actions/shop';

function ShopCard({ setCurrentId ,setshopDetails}) {
  
  const dispatch =useDispatch();

  const [deleteId,setDeleteId] = useState(null);

  const profile = JSON.parse(localStorage.getItem('profile'));
  const shops = useSelector((state) => state.shop.shops);

  const isConfirmed = useSelector((state) => state.alert.isConfirmed);
  
  const handelUpdate = (shop)=>{
    setCurrentId(shop._id);
    setshopDetails(shop);
  }

  const handelDelete =(id)=>{
     dispatch(setAlertval());
     setDeleteId(id);
  }

  useEffect(()=>{

    if(isConfirmed&&deleteId){
      dispatch(deleteShop(deleteId));
      setDeleteId(null);
    }

  },[isConfirmed,deleteId,dispatch]);


  return (
    <>
      {shops.map((shop) => {
        return (
        <div key={shop._id} className="display-card shop-display-card">
          <div className="display-card-header">
            <div className="card-img">
              <img src={`http://localhost:5000${shop.shopImg}`} alt="" />
            </div>
            <h5 className="card-title">{shop.shopName}</h5>
            <span><b>Owner:&nbsp;</b>{profile?.name}</span>
          </div>
          <div className="display-card-body">
            <p className="display-card-text"><i>Deals in -</i>{shop.shopDesc}</p>
            <div className="display-card-button">
              <button className="card-update" onClick={() => handelUpdate(shop)}>UPDATE</button>
              <button className="card-delete" onClick={()=>handelDelete(shop._id)}>DELETE</button>
            </div>
          </div>
        </div>
        )
      })}

    </>
  );
}

export default ShopCard;