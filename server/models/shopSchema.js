const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const IMAGE_PATH = path.join('/uploads/users/images');

const shopSchema = new mongoose.Schema({
    creater_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    shopName:{
        type:String,
        required:true
    },
    shopGstNum:{
        type:String,
        required:true
    },
    contactNum:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pinCode:{
        type:String,
        required:true
    },
    shopDesc:{
        type:String,
        required:true
    },
    shopAddress:{
        type:String,
        required:true
    },
    shopImg:{
        type:String,
        required:true
    },
    shopCategories:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ProductCategories'
    }]

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

shopSchema.statics.upload = multer({storage,fileFilter}).single('shopImg');

const Shops = mongoose.model('Shops',shopSchema);
module.exports = Shops;