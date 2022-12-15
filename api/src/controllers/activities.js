const { Country, Activity } = require("../db");


async function actiNueva(req, res){
    const { name, dificult, lasting, season, id } = req.body
    try {
    const validate = await Activity.findOne({
        where: {
            name: name,
        },
    });
    if(!validate){
        const newAct = await Activity.create({
            name: name, 
            dificult: dificult,
            lasting: lasting,
            season: season,
        });
        const matching = await Country.findAll({
            where: {
                id: id,
            },
        });
        const response = await newAct.addCountries(matching);
        return res.send(response)
    }
} catch (error) {
    console.log(error)
    }
}


async function getAct(req, res) {
    try {
            const activities = await Activity.findAll({  
                    include: Country  
                })
                return res.json(activities) 
    } catch (error) {
        res.send(error)
    }
}

module.exports = { actiNueva, getAct }