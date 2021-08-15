import React, { useState} from 'react';
import { useSelector,useDispatch} from 'react-redux'

import ShopCard from './smallComponents/ShopCard';

import upload_icon from './images/upload-icon.png';
import { createShop,updateShop} from '../actions/shop';
import {showFailNotification} from '../actions/notification';

function MyShop(props) {
  
  const shops = useSelector((state) => state.shop.shops); 
  const dispatch = useDispatch();
  const [shopDetails, setshopDetails] = useState({
    shopName: "", shopGstNum: "", contactNum: "", state: "", city: "", pinCode: "", shopDesc: "", shopAddress: "", shopImg: ""
  });

  const [currentId, setCurrentId] = useState(null);
  const isCreating = useSelector((state) => state.shop.isCreating);


  const clear = () => {
    setCurrentId(null);
    setshopDetails({
      shopName: "", shopGstNum: "", contactNum: "", state: "", city: "", pinCode: "", shopDesc: "", shopAddress: "", shopImg: ""
    });
  }

  const submitShopDetails = (e) => {
    e.preventDefault();

    const { shopName, shopGstNum, contactNum, state, city, pinCode, shopDesc, shopAddress, shopImg } = shopDetails;

    if (shopName !== "" && shopGstNum !== "" && contactNum !== "" && state !== "" && city !== "" && pinCode !== "" && shopDesc !== "" && shopAddress !== "" && shopImg !== "") {
      const formData = new FormData();
      formData.append('shopName', shopName);
      formData.append('shopGstNum', shopGstNum);
      formData.append('contactNum', contactNum);
      formData.append('state', state);
      formData.append('city', city);
      formData.append('pinCode', pinCode);
      formData.append('shopDesc', shopDesc);
      formData.append('shopAddress', shopAddress);
      formData.append('shopImg', shopImg);

      if(currentId){
        dispatch(updateShop(formData,currentId));
      }else{
        dispatch(createShop(formData));
      }

      clear();
    } else {
      //Todo show alert;
      const message = 'All fields are required';
      dispatch(showFailNotification(message));
      
    }

  }

  // useEffect(() => {
    
  //   dispatch(getShop());

  // },[dispatch]);

  const handelShopDetails = (e) => {
    setshopDetails({ ...shopDetails, [e.target.name]: e.target.value });
  }

  const handelShopProfile = (e) => {
    setshopDetails({ ...shopDetails, shopImg: e.target.files[0] });
  }

  return (

    <div className="product-container">
      <div className="content-form-container">
        <div className="product-form-container">
          <h3 className="title">Create Shop</h3>
          <form>
            <div className="input-field-container">

              <input className="inputField" type="text" name="shopName"
                value={shopDetails.shopName}
                onChange={handelShopDetails}
                placeholder="Shop Name" />

            </div>

            <div className="input-field-container">

              <input className="inputField" type="text" name="shopGstNum"
                value={shopDetails.shopGstNum}
                onChange={handelShopDetails}
                placeholder="GST Number" />

            </div>

            <div className="input-field-container">

              <input className="inputField" type="text" name="contactNum"
                value={shopDetails.contactNum}
                onChange={handelShopDetails}
                placeholder="Contact Number" />

            </div>

            <div className="input-field-container">

              <input className="inputField" type="text" name="state"
                value={shopDetails.state}
                onChange={handelShopDetails}
                placeholder="State" />

            </div>

            <div className="input-field-container">

              <input className="inputField" type="text" name="city"
                value={shopDetails.city}
                onChange={handelShopDetails}
                placeholder="City" />

            </div>

            <div className="input-field-container">

              <input className="inputField" type="text" name="pinCode"
                value={shopDetails.pinCode}
                onChange={handelShopDetails}
                placeholder="Pin Code" />

            </div>

            <div className="input-field-container">

              <textarea className="inputField" name="shopDesc"
                value={shopDetails.shopDesc}
                onChange={handelShopDetails}
                placeholder="Shop Description"></textarea>

            </div>

            <div className="input-field-container">

              <textarea className="inputField" name="shopAddress"
                value={shopDetails.shopAddress}
                onChange={handelShopDetails}
                placeholder="Shop Address"></textarea>

            </div>

            <div className="input-field-container">

              <input className="inputFile" name="shopImg" type="file"
                onChange={handelShopProfile} />
              <button className="fileButton"> <img src={upload_icon} alt="" />{shopDetails.shopImg?.name ? shopDetails.shopImg?.name : "Upload Shop Profile"}</button>

            </div>

            <div className="input-field-container">
              {currentId ?
                <button className="inputField add-submit-btn" onClick={submitShopDetails} disabled={isCreating} >{isCreating ? 'Updating Shop...' : 'Update Shop'}</button>
                :<button className="inputField add-submit-btn" onClick={submitShopDetails} disabled={isCreating} >{isCreating ? 'Creating Shop...' : 'Create Shop'}</button>
              }
            </div>

          </form>
        </div>
      </div>

      {shops.length!==0?<div className="shop-card-container">
            <ShopCard setCurrentId={setCurrentId} setshopDetails={setshopDetails}/>
      </div>:
            <h1 style={{textAligh:"center",color: "#8f8f8f"}}>Create Your First shop and Mark your online presence</h1>
      }

    </div>

  );
}

export default MyShop;