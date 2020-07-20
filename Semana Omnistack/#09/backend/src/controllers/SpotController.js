const Spot = require('../models/Spot');
const User = require('../models/User');
module.exports = {
    async index(req, rep) {
        try {
            const { tech } = req.query;
            console.log(tech)
            const spots = await Spot.find({ technologys: tech })
            console.log(spots)
            if (spots) {
                return rep.status(200).json(spots)
            }
        } catch (err) {
            console.log(err)
            return rep.status(400).json({type:'error',message:err.message})
        }
    },
    async create(req, resp) {
        console.log(req.body, req.file)
        const {company, technologys, price } = req.body;
        const { filename } = req.file;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        console.log(user)
        if (!user) {
            return resp.status(400).json({ error: 'Usuário não existe nessa porra' })
        }
        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            technologys: technologys.split(',').map(tech => tech.trim()),
            price: price ? Number(price) : price
        })
        if (!filename || !company || !technologys) {
            return resp.status(200).json({
                type: 'error',
                message: 'campos vazios'
            })
        }
        return resp.status(201).json({
            type: 'success',
            message: 'spot criado com sucesso',
            spot
        })

    }
}