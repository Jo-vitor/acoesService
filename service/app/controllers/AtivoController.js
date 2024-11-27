import Ativo from "../models/Ativo.js";

const pegaAtivos = async (req, res) => {
    const {UserId, tipo} = req.body;

    try {
        let ativos;
        if(tipo === "Acao" || tipo === "Fundo imobiliario"){
            ativos = await Ativo.findAll({where: {UserId: UserId, tipo}}); 
        }else{
            ativos = await Ativo.findAll({where: {UserId: UserId}});
        }

        return res.status(200).json(ativos);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export {pegaAtivos}