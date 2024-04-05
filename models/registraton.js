const mongoose=require('mongoose');
const reg_form=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone_number:Number
});
const form =new mongoose.model("registration",reg_form);
module.exports=form;
