import Ativo from "../models/Ativo.js";
import Movimentacao from "../models/Movimentacao.js";
import User from "../models/User.js";

//compra e venda de ativos
const movimentacao = async (req,res)=> {
    const { UserId, nome, valor, tipo, tipoAtivo,  ativo, quantidade } = req.body;

    try {
        const user = await User.findByPk(UserId);        
        
        if(tipo === "Venda"){ //Venda
            const a = await Ativo.findOne({where: { UserId, ticket: ativo }});
            if(a != null){
                 
                if(a.quantidade > quantidade){
                    a.quantidade -= quantidade;
                    a.valorTotal -= valor*quantidade;

                    await Ativo.update({ quantidade: a.quantidade }, {where: {id: a.id, UserId}});
                }else if(a.quantidade == quantidade){
                    await Ativo.destroy({where: {id: a.id}});
                }else {
                    return res.status(401).send({ msg: "Quantidade insuficiente"});
                }
                
                user.saldo += valor*quantidade; 
                user.investido -= valor*quantidade;     
            }else{
                return res.status(404).send({ msg: "Você não possui esse ativo"});
            }
        }else if (tipo === "Compra"){ //Compra
            if(user.saldo >= valor*quantidade){
                const a = await Ativo.findOne({where: { UserId, ticket: ativo }});
                if(a != null){
                    a.quantidade += quantidade; 
                    a.precoUltimaCompra = valor;
                    a.valorTotal += valor*quantidade;

                    await Ativo.update({ quantidade: a.quantidade, precoUltimaCompra: a.precoUltimaCompra, valorTotal: a.valorTotal }, {where: {id: a.id, UserId}});
                }else{
                    await Ativo.create({
                        nome,
                        ticket: ativo,
                        tipo: tipoAtivo,
                        precoUltimaCompra: valor,
                        quantidade,
                        valorTotal: valor*quantidade,
                        UserId
                    });
                }
                
                user.saldo -= valor*quantidade;
                user.investido += valor*quantidade;
            } else{
                return res.status(401).send({ msg: "Saldo Insuficiente"});
            }
        }

        await User.update({ saldo: user.saldo, investido: user.investido }, {
            where: {id: UserId}
        });

        await Movimentacao.create({
            tipo,
            valor,
            ativo,
            quantidade,
            UserId
        });

        const userAtualizado = await User.findByPk(UserId); 
        return res.status(201).json(userAtualizado);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const movimentacaoExtrato = async (req, res) => {
    const {UserId} = req.body;

    try {
        const movimentacoes = await Movimentacao.findAll({where: {UserId: UserId}}); 

        return res.status(200).json(movimentacoes);
    } catch (error) {
        return res.status(500).send(error);
    }
}

const registraDividendo = async (req,res) => {
    const {UserId, ativo, quantidade, valor} = req.body;

    try {

        const user = await User.findByPk(UserId);
        const a = await Ativo.findOne({where: { UserId, ticket: ativo }});

        if(a){
            user.saldo += (valor*quantidade);
        }else {
            return res.status(404).send({ msg: "Ativo não encontrado"});
        }

        await User.update({ saldo: user.saldo }, {
            where: {id: UserId}
        });

        await Movimentacao.create({
            tipo: "Dividendo",
            valor,
            ativo,
            quantidade,
            UserId
        });

        const userAtualizado = await User.findByPk(UserId); 
        return res.status(201).json(userAtualizado);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export {movimentacao, movimentacaoExtrato, registraDividendo}