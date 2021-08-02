import React from 'react';

import ProductCard from './smallComponents/ProductCard';

import upload_icon from './images/upload-icon.png';

function MyProduct(props) {
    return (
        <div className="product-container">

        <div className="content-form-container">

            <div className="product-form-container">
                <h3 className="title">Search products</h3>
                <form>
                    <div className="input-field-container">
                        <input className="inputField" type="text" name="search-by-product" placeholder="Search by product"/>
                    </div>
                    <div className="input-field-container">
                        <input className="inputField" type="text" name="search-by-brand" placeholder="Search by brand"/>
                    </div>
                    <div className="input-field-container">
                    <button className="inputField submit-btn">Search Product</button>
                    </div>
                </form>
            </div>

            <div className="product-form-container">
                <h3 className="title">Add products Category</h3>
                <form>
                    <div className="input-field-container">
                        <input className="inputField" type="text" name="add-category" placeholder="Add Category"/>
                    </div>
                    <div className="input-field-container">
                    <button className="inputField submit-btn">Add Category</button>
                    </div>
                </form>
            </div>

            <div className="product-form-container">
                <h3 className="title">Add products</h3>
                <form>
                    <div className="input-field-container">
                        <input className="inputField" type="text" name="product-name" placeholder="Product Name"/>
                    </div>
                    <div className="input-field-container">
                        <input className="inputField" type="text" name="product-brand" placeholder="Product brand"/>
                    </div>
                    <div className="input-field-container">
                        <select className="inputField" name="product-category">
                            <option value="">Select Category</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                        </select>
                    </div>
                    <div className="input-field-container">
                        <textarea className="inputField" name="product-desc" placeholder="Product Description"></textarea>
                    </div>
                    <div className="input-field-container">
                        <input className="inputFile" name="product-img" type="file"/>
                        <button className="fileButton"> <img src={upload_icon} alt=""/>Upload Product Image </button>
                    </div>
                    <div className="input-field-container">
                    <button className="inputField add-submit-btn">Add Product</button>
                    </div>
                </form>
            </div>
        </div>

        <div className="card-container">

            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
                
        </div> 

    </div>
    );
}

export default MyProduct;