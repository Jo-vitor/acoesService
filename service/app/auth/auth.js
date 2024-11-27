import jsonwebtoken from "jsonwebtoken";

const validacaoToken = (req, res, next) => {
    const [, token] = req.headers.authorization.split(" ") || [" "," "];    

    if(!token)
        return res.status(401).send("Nenhum token fornecido."); 

    try {
        const decoded = jsonwebtoken.verify(token, process.env.PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send("Token inválido."); 
        
    }
}

export { validacaoToken }