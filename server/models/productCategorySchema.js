const mongoose = require('mongoose');

const ProductCategorySchema = new mongoose.Schema({

    category:{
        type:String,
        required:true
    }
});

const ProductCategories = mongoose.model('ProductCategories',ProductCategorySchema);
module.exports = ProductCategories;