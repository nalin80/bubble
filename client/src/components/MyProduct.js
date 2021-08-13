import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductCard from './smallComponents/ProductCard';
import upload_icon from './images/upload-icon.png';

import { addShopCategories, deleteShopCategories } from '../actions/shop';
import { showFailNotification } from '../actions/notification';
import { createProduct, getProducts,updateProduct} from '../actions/product';

function MyProduct(props) {


    const dispatch = useDispatch();

    const shops = useSelector((state) => state.shop.shops);
    const isCreating = useSelector((state) => state.shop.isCreating);
    const isAddingProduct = useSelector((state) => state.product.isCreating);

    const [currentShop, setCurrentShop] = useState('null');
    const [shopId, setShopId] = useState("false");
    const [addCategory, setAddCategory] = useState('');
    const [categoryIndex, setCategoryIndex] = useState(null);
    const [products, setProducts] = useState({
        productName: '',
        productBrand: '',
        productCategory: '',
        productDesc: '',
        productImg: '',
    });
    const [editProductId, setEditProductId] = useState(null);

    //this clear function will clear all input fields and set all state to its initial state;
    const clear = () => {
        setAddCategory('');
        setCategoryIndex(null);
        setProducts({
            productName: '',
            productBrand: '',
            productCategory: '',
            productDesc: '',
            productImg: '',
        });
        setEditProductId(null);
    }

    //this wiil handling the change of shop
    const handelChange = (e) => {
        setShopId(e.target.value);
        clear();
    }

    //    for adding categories
    const handelAddCategory = (e) => {
        e.preventDefault();

        if (addCategory) {
            dispatch(addShopCategories(shopId, addCategory, categoryIndex));
            setCategoryIndex(null);

        } else {
            const message = 'All fields are required';
            dispatch(showFailNotification(message));
        }
        setAddCategory('');
    }

    //for deleting category
    const handelDeleteCategory = (index) => {
        dispatch(deleteShopCategories(shopId, index));
    }

    const handelAddProductChande = (e) => {
        setProducts({ ...products, [e.target.name]: e.target.value });
    }

    const handelAddProductFile = (e) => {
        setProducts({ ...products, productImg: e.target.files[0] });
    }

    const addProductSubmit = (e) => {
        e.preventDefault();

        const { productName, productBrand, productCategory, productDesc, productImg } = products;

        if (productName !== "" && productBrand !== "" && productCategory !== "" && productDesc !== "" && productImg !== "") {
            const formData = new FormData();
            formData.append('shop_id', shopId);
            formData.append('productName', productName);
            formData.append('productBrand', productBrand);
            formData.append('productCategory', productCategory);
            formData.append('productDesc', productDesc);
            formData.append('productImg', productImg);


            if (editProductId) {
                dispatch(updateProduct(editProductId,formData));
            } else {
                dispatch(createProduct(formData));
            }

        } else {

            const message = 'All fields are required';
            dispatch(showFailNotification(message));
        }

        clear();
    }

    useEffect(() => {

        setCurrentShop(shops.filter((shop) => shop._id === shopId));
        if (shopId !== "false") {
            dispatch(getProducts(shopId));
        }
        //product state should be cleared

    }, [shopId, shops, dispatch]);



    return (
        <div className="product-container">

            <div className="content-form-container">
                {/* ************************************SELECT SHOP SECTION*******************************************/}
                <div className="product-form-container">
                    <h3 className="title">Select Shop</h3>
                    <form>
                        <div className="input-field-container">
                            <select className="inputField" name="shop_id" onChange={handelChange}>
                                <option value={false}>Select shop</option>
                                {
                                    shops.map((shop) => {
                                        return (
                                            <option key={shop._id} value={shop._id}>{shop.shopName}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                    </form>
                </div>
                {shopId !== "false" ?
                    <>
                        {/* ************************************SEARCH PRODUCT SECTION*******************************************/}
                        <div className="product-form-container">
                            <h3 className="title">Search products</h3>
                            <form>
                                <div className="input-field-container">
                                    <input className="inputField" type="text" name="search-by-product" placeholder="Search by product" />
                                </div>
                                <div className="input-field-container">
                                    <input className="inputField" type="text" name="search-by-brand" placeholder="Search by brand" />
                                </div>
                                <div className="input-field-container">
                                    <button className="inputField submit-btn">Search Product</button>
                                </div>
                            </form>
                        </div>
                        {/* ************************************ADD CATEGORY SECTION*******************************************/}
                        <div className="product-form-container">
                            <h3 className="title">Add products Category</h3>
                            <form>
                                <div className="input-field-container">
                                    <input className="inputField" type="text" name="add-category" placeholder="Add Category"
                                        onChange={(e) => setAddCategory(e.target.value)} value={addCategory} />
                                </div>
                                <div className="input-field-container">
                                    <button className="inputField submit-btn" onClick={handelAddCategory} disabled={isCreating}>
                                        {categoryIndex !== null ? 'Update Category' : 'Add Category'}
                                    </button>
                                </div>
                            </form>
                            {currentShop[0]?.shopCategories.length !== 0 &&
                                <div className="added-category-container">
                                    <h3 className="title">My Category</h3>
                                    <div className="added-category">
                                        {currentShop[0]?.shopCategories.map((value, i) => {
                                            return (
                                                <div key={value} className="item">
                                                    <span >{value}</span>
                                                    <div className="category-btn-group">
                                                        <button onClick={() => { setAddCategory(value); setCategoryIndex(i) }}>Edit</button>
                                                        <button onClick={() => handelDeleteCategory(i)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                        {/* ************************************ADD PRODUCT SECTION*******************************************/}
                        <div className="product-form-container">
                            <h3 className="title">Add products</h3>
                            <form>
                                <div className="input-field-container">
                                    <input className="inputField" type="text" name="productName"
                                        onChange={handelAddProductChande} placeholder="Product Name"
                                        value={products.productName} />
                                </div>
                                <div className="input-field-container">
                                    <input className="inputField" type="text" name="productBrand"
                                        onChange={handelAddProductChande} placeholder="Product brand"
                                        value={products.productBrand} />
                                </div>
                                <div className="input-field-container">
                                    <select className="inputField" name="productCategory" onChange={handelAddProductChande} value={products.productCategory}>
                                        <option value="">Select Category</option>
                                        {currentShop[0]?.shopCategories.map((value) => {
                                            return (
                                                <option key={value} value={value}>{value}</option>
                                            )
                                        })
                                        }
                                    </select>
                                </div>
                                <div className="input-field-container">
                                    <textarea className="inputField" name="productDesc"
                                        onChange={handelAddProductChande} placeholder="Product Description" value={products.productDesc}></textarea>
                                </div>
                                <div className="input-field-container">
                                    <input className="inputFile" name="productImg" type="file" onChange={handelAddProductFile} />
                                    <button className="fileButton"> <img src={upload_icon} alt="" />{products.productImg?.name ? products.productImg.name : 'Upload Product Image'} </button>
                                </div>
                                <div className="input-field-container">

                                    {editProductId ?
                                        <button className="inputField add-submit-btn" onClick={addProductSubmit} disabled={isAddingProduct}>
                                            {isAddingProduct ? 'Processing...' : 'Update Product'}
                                        </button> :
                                        <button className="inputField add-submit-btn" onClick={addProductSubmit} disabled={isAddingProduct}>
                                            {isAddingProduct ? 'Processing...' : 'Add Product'}
                                        </button>
                                    }

                                </div>
                            </form>
                        </div>
                    </> : null}
            </div>
            {shopId !== "false" ? <div className="card-container">

                <ProductCard setProducts={setProducts} setEditProductId={setEditProductId} />

            </div> : null}

        </div>
    );
}

export default MyProduct;