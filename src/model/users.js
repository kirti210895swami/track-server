const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema =  new mongoose.Schema({
  email:{
      type:String,
      unique:true,
      required:true
  },
  password:{
      type:String,
      required:true
  }
});
userSchema.pre('save',function(next) {   // purpose of function() is used 'this' acc to this block 
const user = this;             // if we didn't use function() this will works acc to outside
 if(!user.isModified('password')) {
     return next();
 }
   // below line to sign up with hash and salt
bcrypt.genSalt(10,(err,salt) => {
   if (err){
     return next(err);
   }

   bcrypt.hash(user.password,salt,(err,hash)=>{
      if(err){
        return next(err);
      }
      user.password=hash;
      next();
   });
});
});
// now below code is for login usin hashnalgo
userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
   const user = this;

  return new Promise((resolve,reject) => {
     bcrypt.compare(candidatePassword,user.password,(err,isMatch)=> {
       if (err){
         return reject(err);
       }
       if (!isMatch){
         return reject(false);
       }
       resolve(true);
     });
  });
}

mongoose.model('User',userSchema);


// this define the structure of data we have