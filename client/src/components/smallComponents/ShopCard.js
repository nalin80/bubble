import React from 'react';
import { useSelector} from 'react-redux'

function ShopCard({ setCurrentId ,setshopDetails}) {

  const profile = JSON.parse(localStorage.getItem('profile'));
  const shops = useSelector((state) => state.shop.shops);
  
  const handelUpdate = (shop)=>{
    setCurrentId(shop._id);
    setshopDetails(shop);
  }

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
              <button className="card-delete">DELETE</button>
            </div>
          </div>
        </div>
        )
      })}

    </>
  );
}

export default ShopCard;