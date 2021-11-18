const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String
  },
  user:{
    type: String
    // required : true
  },
  pickupcity:{
    type: String
    // required : true
  },
  dropcity:{
    type: String
    // required : true
  },
  date:{
    type: Date
    // required : true
  },
  weight:{
    type: Number
      // required: true
  },
  transemail:{
    type: String
    // required: true
  },
  truckid:{
    type: String
    // required: true
  },
  typeofgoods:{
    type: String
    // required: true
  },
  price:{
    type: String
    // required: true
  },
  Address1:{
    type: String
  },
  Address2:{
    type: String
  },
  transconfirm :{
    type: Boolean
  },
  status:{
    type : Boolean
  }
})
const Booking = mongoose.model('BOOK',bookingSchema);
module.exports = Booking;