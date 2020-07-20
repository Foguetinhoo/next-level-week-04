const User =  require('../models/User');
module.exports = {
    async create(req,res){
        const {email, name} = req.body;
        console.log(email,name)
        if(!email || !name) {
            return res.json({
            type:'error',
            message:`campos vazios`,
        });
        }
        let user  = await User.findOne({ email })
        if(!user){
            user = await User.create({
                name,
                email
            })
            return res.json({
                type:'success',
                message:`O ${user.email} foi cadastrado com sucesso`,
                user
            });
        } else{
            return res.json({type:'error', message:`O ${user.email} já existe`});
        }
    },
    async enter(req,res){
        console.log(req.body)
        const {email } = req.body;
       
        if(!email) {
            return res.json({
            type:'error',

            message:`campos vazios`,
        });
        }
        let user  = await User.findOne({ email }) 
        if(user){
            return res.status(200).json({
                type:'success', 
                message:`Seja bem vindo ${user.name}`,
                user 
            });
        }
        return res.status(200).json({
            type:'error', 
            message:'email informado não existe'
        })
    }
}