const Shop = require('../models/shopSchema');
const ProductCategory = require('../models/productCategorySchema');
const Products = require('../models/productSchema');

const fs = require('fs');
const path = require('path');

/********************************Adding product categories**************************************/

exports.addProductCategories = async (req,res)=>{
    try{

        // let {shop_id,category,categoryIndex} = req.body;

        // if(!shop_id||!category){
        //     return res.status(406).json({message:'All fields are required'});
        // }

        // const existingShop = await Shop.findById(shop_id); 
        
        // if(existingShop.creater_id!=req.user_id){
        //     return res.status(401).json({message:'Unauthorized'});  
        // }

        // if(existingShop){
        //     const index = existingShop.shopCategories.findIndex((val)=>{
        //          return val.toLowerCase()===category.toLowerCase();
        //     });

        //     if(index===-1){
        //         let splice_index = categoryIndex==null?0:1;
        //         categoryIndex = categoryIndex==null?0:categoryIndex;
                
        
        //         existingShop.shopCategories.splice(categoryIndex,splice_index,category);
        //         existingShop.save();
        //     }else{
        //         return res.status(406).json({message:'Category already exists'});
        //     }

        // }else{
        //     return res.status(406).json({message:'invalid shop id'});
        // }

        // return res.status(200).json(existingShop);

        let {shop_id,category,categoryIndex} = req.body;

        if(!shop_id||!category){
            return res.status(406).json({message:'All fields are required'});
        }

        const existingShop = await Shop.findById(shop_id).populate('shopCategories'); 
        
        if(existingShop){

            if(existingShop.creater_id!=req.user_id){
                return res.status(401).json({message:'Unauthorized'});  
            }

            const index = existingShop.shopCategories.findIndex((val)=>{
                 return val.category.toLowerCase()===category.toLowerCase();
            });            
            
            if(index===-1){
            let newCategory = null;
            if(categoryIndex!=null){
                newCategory = await ProductCategory.findById(categoryIndex);
                newCategory.category = category;
                newCategory.save();

                existingShop.shopCategories = existingShop.shopCategories.map((val)=>String(val._id)===String(categoryIndex)?newCategory:val);
                existingShop.save();

            }else{
                newCategory = await ProductCategory.create({
                    category
                });

                existingShop.shopCategories.push(newCategory);
                existingShop.save();
            }

            return res.status(200).json(existingShop);

           }else{
             return res.status(406).json({message:'Category already exists'});
           }

        }else{
            return res.status(406).json({message:'invalid shop id'});            
        }

    }catch(error){
         console.log(error);
         return res.status(500).json({message:'Something went wrong'});
    }
}

/************************************DELETING PRODUCT CATEGORIES*********************************/
exports.deleteCategories = async (req,res)=>{
  
   try{
       const {shop_id,index} = req.body;
       const shop = await Shop.findById(shop_id).populate('shopCategories');

       if(shop.creater_id!=req.user_id){
        return res.status(401).json({message:'Unauthorized'});  
       }
       
       let category = shop.shopCategories[index];
       await ProductCategory.findByIdAndDelete(category._id);

       shop.shopCategories = shop.shopCategories.filter((val,i)=>i !==parseInt(index));
       shop.save();

       return res.status(200).json(shop);

   }catch(error){
         return res.status(500).json({message:'Something went wrong'});
   }

}


/**************************************************************** */

exports.addProduct= async (req,res)=>{

    try{

         
        Products.upload(req,res,async()=>{
            
            const {shop_id,productName,productBrand,productCategory,productDesc} = req.body;
            const creator_id = req.user_id;

            if(!shop_id|| !productName|| !productBrand|| !productCategory|| !productDesc|| req.file==undefined){
                return res.status(406).json({ message: 'All fields are required' });
            }
    
            const shop = await Shop.findById(shop_id);
    
            if(shop.creater_id!=creator_id){
                return res.status(401).json({message:'Unauthorized'});  
            }

            const productImg = `/uploads/users/productsImages/` + req.file.filename;
            
            const newProduct = await Products.create({
                creator_id,shop_id,productName,productBrand,productCategory,productDesc,productImg
            });

            return res.status(200).json(newProduct);

        });

    }catch(error){
        console.log(error);
        return res.status(500).json({message:'Something went wrong'});     
    }

}

/******************************************************************************** */
exports.deleteProduct=async (req,res)=>{
   try{
    
    const user = req.user_id;
    const {id} = req.params;

    const product = await Products.findById(id); 

    if(user!=product.creator_id){
        return res.status(401).json({message:'Unauthorized'});           
    }

    await Products.findByIdAndDelete(id);

    if (product) {
        fs.unlinkSync(path.join(__dirname, '..', product.productImg));
        return res.status(200).json({message:'Product deleted successfully'});  
    }else{
        return res.status(406).json({ message: 'invalid input'});
    } 

   }catch(error){
    console.log(error);
    return res.status(500).json({message:'Something went wrong'});    
   }
}
/*********************************************************************************** */
exports.updateProduct = async (req,res)=>{
    try{
        const {id} = req.params;
        const updateProduct = await Products.findById(id);

        if(req.user_id!=updateProduct.creator_id){
            return res.status(401).json({message:'Unauthorized'});            
        }


        Products.upload(req,res,async()=>{

            const {productName,productBrand,productCategory,productDesc} = req.body;
            
            
            if(!productName|| !productBrand|| !productCategory|| !productDesc){
                return res.status(406).json({ message: 'All fields are required' });
            }
            
            updateProduct.productName = productName;
            updateProduct.productBrand = productBrand;
            updateProduct.productCategory = productCategory;
            updateProduct.productDesc = productDesc;
            
            if(req.file!=undefined){
                if(updateProduct.productImg&&fs.existsSync(path.join(__dirname, '..', updateProduct.productImg))){
                    fs.unlinkSync(path.join(__dirname, '..', updateProduct.productImg));
                }

                updateProduct.productImg = `/uploads/users/productsImages/` + req.file.filename;
            }
           
            updateProduct.save();

            return res.status(200).json(updateProduct);

        });


    }catch(error){
        console.log(error);
        return res.status(500).json({message:'Something went wrong'});
    }
}

/*********************************************************************************************/
exports.getProducts = async (req,res)=>{
    
    try{
        const{id} = req.params;
       
        const products = await Products.find({
            creator_id: req.user_id,
            shop_id:id
        });
        
        return res.status(200).json(products);

    }catch(error){
        console.log(error);
        return res.status(500).json({message:'Something went wrong'});        
    }

}