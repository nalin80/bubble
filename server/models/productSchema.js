const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const IMAGE_PATH = path.join('/uploads/users/productsImages');

const productSchema = new mongoose.Schema({
    creator_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    shop_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Shops'
    },
    productName:{
        type:String,
        required:true
    },
    productBrand:{
        type:String,
        required:true
    },
    productCategory:{
        type:String,
        required:true
    },
    productDesc:{
        type:String,
        required:true
    },
    productImg:{
        type:String,
        required:true
    },
},{
    timestamps:true
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', IMAGE_PATH));
    },
    filename: function(req, file, cb) {   
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

productSchema.statics.upload = multer({storage,fileFilter}).single('productImg');

const Products = mongoose.model('Product',productSchema);
module.exports = Products;