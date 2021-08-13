const Shop = require('../models/shopSchema');
const fs = require('fs');
const path = require('path');

/***********************************creating a new shop here*****************************************/
exports.createShop = async (req, res) => {
    try {

        const shopNum = await Shop.find({ creater_id: req.user_id });
        
        if (shopNum.length == 2) {
            return res.status(406).json({ message: 'You are created maximum number of shop' });
        }
       
        Shop.upload(req, res, async () => {

              
                const { shopName, shopGstNum, contactNum, state, city, pinCode, shopDesc, shopAddress } = req.body;
            
                if (!shopName || !shopGstNum || !contactNum || !state || !city || !pinCode || !shopDesc || !shopAddress || req.file == undefined) {
                    return res.status(406).json({ message: 'All fields are required' });
                }

                const shopImg = `/uploads/users/images/` + req.file.filename;
    
                const newShop = await Shop.create({
                    creater_id: req.user_id,shopName,shopGstNum,contactNum,state,city,pinCode,shopDesc,shopAddress,shopImg
                });

    
                return res.status(200).json(newShop);
                  

        });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }

}

/***********************************getting the information of shop here*****************************************/
exports.getShop = async (req, res) => {

    try {

        const shopDetails = await Shop.find({ creater_id: req.user_id }).populate('shopCategories');
        return res.status(200).json(shopDetails);

    } catch (error) {
        return res.status(406).json({ message: error.message });
    }

}

/***********************************deleting a shop here*****************************************/
exports.deleteShop = async (req, res) => {
    try {
        const { id } = req.params;
        const shop = await Shop.findById(id);

        if (shop.creater_id != req.user_id) {
            return res.status(401).json({ message: 'You are not a valid user to delete' });
        }

        const deleteShop = await Shop.findByIdAndDelete(id);
        
        if (deleteShop) {
            fs.unlinkSync(path.join(__dirname, '..', deleteShop.shopImg));
            return res.status(200).json({ message: 'Shop closed successfully' });
        }else{
            return res.status(406).json({ message: 'invalid input'});
        }

    } catch (error) {
        return res.status(406).json({ message: error.message });
    }
}

/***********************************updating a shop here*****************************************/
exports.updateShop = async (req, res) => {

    try {
        const { id } = req.params;
        
        const updateShop = await Shop.findById(id);
        
        if (updateShop.creater_id != req.user_id) {
            return res.status(401).json({ message: 'You are not a valid user to update' });
        }

        Shop.upload(req, res, async () => {

            const { shopName, shopGstNum, contactNum, state, city, pinCode, shopDesc, shopAddress } = req.body;

            updateShop.shopName = shopName;
            updateShop.shopGstNum = shopGstNum;
            updateShop.contactNum = contactNum;
            updateShop.state = state;
            updateShop.city = city;
            updateShop.pinCode = pinCode;
            updateShop.shopDesc = shopDesc;
            updateShop.shopAddress = shopAddress;

            if (req?.file != undefined) {
                if (updateShop.shopImg && fs.existsSync(path.join(__dirname, '..', updateShop.shopImg))) {
                    fs.unlinkSync(path.join(__dirname, '..', updateShop.shopImg));
                }
                updateShop.shopImg = `/uploads/users/images/` + req.file.filename;
            }

            updateShop.save();

            return res.status(201).json(updateShop);

        });


    } catch (error) {
        return res.status(406).json({ message: error.message });
    }


}

