import User from "../models/User.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import Ativo from "../models/Ativo.js";

const cadastro = async (req, res) => {
    const { nome, login, senha } = req.body;
    
    try {
        if (await User.findOne({where: { login }})) 
            return res.status(401).send("Este login já está sendo utilizado.");
        
        const cryptSenha = await bcrypt.hash(senha, 10);
        
        const user = await User.create({
            nome,
            login,
            senha: cryptSenha
        });

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const login = async (req,res) => {
    const {login, senha} = req.body;

    try {
        const user = await User.findOne({where: { login }});

        if(!(user && await bcrypt.compare(senha, user.senha)))
            return res.status(401).send("Login ou senha inválido");

        const token = jsonwebtoken.sign({user: JSON.stringify(user)}, process.env.PRIVATE_KEY, {expiresIn: "60m"} );

        res.status(200).json({
            "id": user.id,
            "nome": user.nome,
            "saldo": user.saldo,
            "investido": user.investido,
            token});
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
const rentabilidadeCarteira = async (req,res) => {
    const {id} = req.body;
    
    try {
        
        const u = await User.findByPk(id);
        
        const data = new Date(); 
        const diferencaEmMilissegundos = data - u.dataUltimaModificacaoCarteira;
        const diferencaEmDias = diferencaEmMilissegundos / (24 * 60 * 60 * 1000);

        if( diferencaEmDias >= 30 ){  
            u.carteiraUltimoMes = u.carteiraAtual;

            const a = await Ativo.findAll({where: {UserId: id}});
    
            let total = 0;
            a.forEach(item => {
                total += item.valorTotal;
            });
    
            u.carteiraAtual = total;
            u.dataUltimaModificacaoCarteira = new Date();
    
            await User.update({ carteiraUltimoMes: u.carteiraUltimoMes, carteiraAtual: u.carteiraAtual, dataUltimaModificacaoCarteira: u.dataUltimaModificacaoCarteira }, {
                where: {id}
            });
        }

        const rentabilidade = ((u.carteiraAtual-u.carteiraUltimoMes)*100)/u.carteiraUltimoMes;

        return res.status(200).json({
            carteiraAtual: u.carteiraAtual,
            carteiraUltimoMes: u.carteiraUltimoMes,
            rentabilidade,
            totalRentabilidade: u.carteiraAtual-u.carteiraUltimoMes,
            data: u.dataUltimaModificacaoCarteira
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};

export { cadastro, login, rentabilidadeCarteira }
