const mongoose = require ('mongoose');
const printSchema=new mongoose.Schema({
   timestamp:Number,
   coords:{
       latitude:Number,
       longitude:Number,
       altitude:Number,
       accuracy:Number,
       heading:Number,
       speed:Number
   }
});

const trackSchema = new mongoose.Schema({
      userId:{
          type:mongoose.Schema.Types.ObjectId,
          ref: 'User' // show to mongoose that it is the instance of User
      },
      name:{
          type: String,
          default: ''
      },
      location:[printSchema]
});

mongoose.model('Track',trackSchema);