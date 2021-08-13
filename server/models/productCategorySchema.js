const mongoose = require('mongoose');

const ProductCategorySchema = new mongoose.Schema({

    shop_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Shops'
    },
    categories:{
        type:String,
        required:true
    }
});

const ProductCategories = mongoose.model('ProductCategories',ProductCategorySchema);
module.exports = ProductCategories;