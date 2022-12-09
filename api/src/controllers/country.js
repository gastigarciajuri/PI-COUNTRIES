const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Country, Activity } = require("../db");

async function getAllPais(req, res){
    const { name } = req.query;

    try {
        if(!name){
            const allPais = await Country.findAll({ include: Activity });
            res.send(allPais);
        } else{
            const queryPais = await Country.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    },
                },
                include: Activity
        });

            if(!queryPais[0]){
                console.log("error")
                return res.status(404).json({error: `No se encontro a ${name}`})
            }
            return res.send(queryPais)
        }
    } catch (error) {
        res.send(error)
    }
}

async function getPaisId(req, res) {
    try {
        const idPais = req.params.id.toUpperCase();
        console.log(idPais)
        const pais = await Country.findOne({
            where: {
                id: idPais,
            },
            include: Activity, 
        });
        return res.json(pais)
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    getAllPais,
    getPaisId
};