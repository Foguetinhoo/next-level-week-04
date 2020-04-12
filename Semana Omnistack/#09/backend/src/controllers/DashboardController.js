const  Spot =  require('../models/Spot');
const  User =  require('../models/User');
module.exports = {
    async show(req,rep) {
        const {user_id} = req.headers;
        console.log(user_id)
        const spots = await Spot.find({user:user_id})
        if(!spots){
            return rep.status(404).json({
                type:'error',
                message:'nenhum spot encontrado'
            })
        }
        return rep.status(200).json(spots)
        
    }, 
}