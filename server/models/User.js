const mongoose = require('mongoose');
const bcrypt =require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{  type: String , unique : true , required : [ "Please enter your email address" ] },
    password: { type: String , required :[ "Please provide a password"] }   
});
//we are going to use a method called before saving the data into the database using hooks
userSchema.pre('save', async function (next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password ,10);
    }
    next();
});

const User = mongoose.model('User', userSchema);
module.exports=User;