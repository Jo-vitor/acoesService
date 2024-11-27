import Transacao from "../models/Transacao.js"
import User from "../models/User.js";

//saque e deposito
const transacao = async (req,res) => {
    const { valor, UserId, tipo } = req.body;

    try {
        const user = await User.findByPk(UserId);        
        
        if(tipo === "Deposito" && valor>0){
            user.saldo += valor;                        
        }else if (tipo === "Saque" && valor>0){
            if(user.saldo >= valor)
                user.saldo -= valor;
            else
                return res.status(401).send({ msg: "Saldo Insuficiente"});
        }else {
            return res.status(401).send({ msg: "Valor Insuficiente"});
        }

        await User.update({ saldo: user.saldo }, {
            where: {id: UserId}
        });

        const t = await Transacao.create({
            UserId,
            tipo,
            valor,
        })
        const userAtualizado = await User.findByPk(UserId); 
        return res.status(201).json(userAtualizado);
    } catch (error) {
        return res.status(500).send(error);
    }

}

const extrato = async (req,res) => {
    const { UserId } = req.body;

    try {
        const transacoes = await Transacao.findAll({where: {UserId: UserId}});

        return res.status(200).json(transacoes);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export { transacao, extrato }