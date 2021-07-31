import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';


import NavBar from './NavBar';
import MyShop from './MyShop';
import MyProduct from './MyProduct';


function Home({initialIndex}) {

    const [toggleState, setToggle] = useState(initialIndex);
    const history = useHistory();

    const handelToggel = (index) => {
        setToggle(index);
    }

    return (
        <div>
            <NavBar />
            <div className="container-fluid">
                <div className="inPageLinks">
                    <div onClick={() => {history.push('/home/my-shop'); handelToggel(1)}} className={toggleState === 1 ? "tabs active" : "tabs"}>My Shop</div>
                    <div onClick={() => {history.push('/home/my-products'); handelToggel(2)}} className={toggleState === 2 ? "tabs active" : "tabs"}>My Products</div>
                </div>

                {toggleState === 1 ? (
                    <MyShop />
                ) : toggleState === 2 ? (
                    <MyProduct />
                ) :
                    null
                }
            </div>



        </div>
    );
}

export default Home;