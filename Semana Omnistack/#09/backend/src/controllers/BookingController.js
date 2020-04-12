const  Spot =  require('../models/Spot');
const  User =  require('../models/User');
const Booking =  require('../models/Booking')
module.exports = {
    async create(req,resp){
     const{date} = req.body;
     const{spot_id} = req.params;
     const{user_id} =  req.headers;
     console.log(spot_id)
     const booking =  await Booking.create({
         user:user_id,
         spot:spot_id,
         date
     });

     await booking.populate('spot').populate('user').execPopulate()
  
     return resp.json(booking)
    }
}